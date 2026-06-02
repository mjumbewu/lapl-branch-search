import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LAPL_URL = 'https://www.lapl.org/branches';
const SOCRATA_URL = 'https://data.lacity.org/resource/a4nt-4gca.json?$limit=200';

async function fetchSocrataData() {
    const res = await fetch(SOCRATA_URL);
    if (!res.ok) throw new Error("Failed to fetch Socrata data");
    return await res.json();
}

async function fetchLaplData() {
    const res = await fetch(LAPL_URL);
    if (!res.ok) throw new Error("Failed to fetch LAPL HTML");
    const html = await res.text();
    const $ = cheerio.load(html);
    
    const branches = {};
    $('.views-row').each((i, el) => {
        const name = $(el).find('h2 a, h3 a, .title a').first().text().trim();
        if (!name) return;
        if (name.includes('How do I')) return; // Filter out FAQ items
        
        // Amenities
        let amenitiesText = $(el).find('.views-field-field-branch-resources-services').text().trim();
        amenitiesText = amenitiesText.replace('Resources & Services:', '').trim();
        const amenities = amenitiesText ? amenitiesText.split(',').map(a => a.trim()).filter(a => a) : [];
        
        // Hours
        const hoursText = $(el).find('p.hours').not('.views-field-field-branch-resources-services').text().replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        
        // Attempt to extract days
        const hoursObj = {};
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        days.forEach(day => {
            const regex = new RegExp(`${day}:\\s*([^,]+)`);
            const match = hoursText.match(regex);
            if (match) {
                hoursObj[day] = match[1].trim();
            }
        });

        branches[name.toLowerCase()] = {
            name,
            hoursText,
            hours: hoursObj,
            amenities
        };
    });
    
    return branches;
}

function normalizeName(name) {
    return name.toLowerCase()
               .replace('branch library', '')
               .replace('regional', '')
               .replace('library', '')
               .trim();
}

async function run() {
    try {
        console.log("Fetching LAPL HTML data...");
        const laplData = await fetchLaplData();
        
        console.log("Fetching Socrata JSON data...");
        const socrataData = await fetchSocrataData();
        
        const merged = [];
        for (const record of socrataData) {
            const socrataName = record.branch_name;
            const normName = normalizeName(socrataName);
            
            // Find match in LAPL data
            let match = null;
            for (const laplKey of Object.keys(laplData)) {
                if (laplKey.includes(normName) || normName.includes(laplKey.replace('branch', '').trim())) {
                    match = laplData[laplKey];
                    break;
                }
            }
            
            // Fallback string matching logic if needed...
            
            const lat = record.location?.latitude;
            const lng = record.location?.longitude;
            
            merged.push({
                name: match ? match.name : socrataName,
                address: record.location?.human_address ? JSON.parse(record.location.human_address).address : '',
                phone: record.phone_number,
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                hoursText: match ? match.hoursText : '',
                hours: match ? match.hours : {},
                amenities: match ? match.amenities : []
            });
        }
        
        console.log(`Merged ${merged.length} libraries.`);
        
        const outputPath = path.join(__dirname, '../app/libraries.json');
        fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2));
        console.log(`Wrote data to ${outputPath}`);
        
    } catch (err) {
        console.error("Scraper error:", err);
        process.exit(1);
    }
}

run();
