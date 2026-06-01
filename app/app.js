let allLibraries = [];
let filteredLibraries = [];
let selectedDays = new Set();
let selectedAmenities = new Set();
let allAvailableAmenities = new Set();

const DOM = {
    loading: document.getElementById('loading'),
    noResults: document.getElementById('no-results'),
    list: document.getElementById('branch-list'),
    toggleFiltersBtn: document.getElementById('toggle-filters'),
    filterPanel: document.getElementById('filter-panel'),
    dayFilters: document.getElementById('day-filters'),
    amenityFilters: document.getElementById('amenity-filters'),
    clearFiltersBtn: document.getElementById('clear-filters'),
    applyFiltersBtn: document.getElementById('apply-filters')
};

async function init() {
    setupEventListeners();
    try {
        const response = await fetch('libraries.json');
        allLibraries = await response.json();
        
        // Extract all unique amenities
        allLibraries.forEach(lib => {
            if (lib.amenities) {
                lib.amenities.forEach(a => allAvailableAmenities.add(a));
            }
        });
        
        populateAmenityFilters();
        applyFilters();
        
    } catch (err) {
        console.error("Error loading libraries:", err);
        DOM.loading.textContent = "Failed to load branch data.";
    }
}

function setupEventListeners() {
    DOM.toggleFiltersBtn.addEventListener('click', () => {
        DOM.filterPanel.classList.toggle('hidden');
        DOM.toggleFiltersBtn.classList.toggle('active');
    });

    DOM.dayFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill')) {
            e.target.classList.toggle('selected');
        }
    });

    DOM.amenityFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill')) {
            e.target.classList.toggle('selected');
        }
    });

    DOM.clearFiltersBtn.addEventListener('click', () => {
        document.querySelectorAll('.pill.selected').forEach(el => el.classList.remove('selected'));
        applyFilters();
    });

    DOM.applyFiltersBtn.addEventListener('click', () => {
        DOM.filterPanel.classList.add('hidden');
        DOM.toggleFiltersBtn.classList.remove('active');
        applyFilters();
    });
}

function populateAmenityFilters() {
    const sorted = Array.from(allAvailableAmenities).sort();
    sorted.forEach(amenity => {
        const btn = document.createElement('button');
        btn.className = 'pill';
        btn.dataset.amenity = amenity;
        btn.textContent = amenity;
        DOM.amenityFilters.appendChild(btn);
    });
}

function applyFilters() {
    // Gather selected
    selectedDays.clear();
    document.querySelectorAll('#day-filters .pill.selected').forEach(el => {
        selectedDays.add(el.dataset.day);
    });

    selectedAmenities.clear();
    document.querySelectorAll('#amenity-filters .pill.selected').forEach(el => {
        selectedAmenities.add(el.dataset.amenity);
    });

    filteredLibraries = allLibraries.filter(lib => {
        // Filter by days open
        if (selectedDays.size > 0) {
            let isOpenOnAllSelectedDays = true;
            for (const day of selectedDays) {
                if (!lib.hours || !lib.hours[day] || lib.hours[day].toLowerCase().includes('closed')) {
                    isOpenOnAllSelectedDays = false;
                    break;
                }
            }
            if (!isOpenOnAllSelectedDays) return false;
        }

        // Filter by amenities
        if (selectedAmenities.size > 0) {
            if (!lib.amenities) return false;
            let hasAllAmenities = true;
            for (const am of selectedAmenities) {
                if (!lib.amenities.includes(am)) {
                    hasAllAmenities = false;
                    break;
                }
            }
            if (!hasAllAmenities) return false;
        }

        return true;
    });

    renderList();
}

function getTodayStr() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date().getDay()];
}

function renderList() {
    DOM.loading.classList.add('hidden');
    DOM.list.innerHTML = '';
    
    if (filteredLibraries.length === 0) {
        DOM.noResults.classList.remove('hidden');
        return;
    }
    
    DOM.noResults.classList.add('hidden');
    
    const today = getTodayStr();

    filteredLibraries.forEach(lib => {
        const li = document.createElement('li');
        li.className = 'branch-card';
        
        let hoursHtml = '';
        if (lib.hours) {
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            hoursHtml = `<div class="hours-grid">` + 
                days.map(d => lib.hours[d] ? `<div class="hour-item"><span class="day">${d}</span> <span>${lib.hours[d]}</span></div>` : '').join('') +
            `</div>`;
        }

        let amenitiesHtml = '';
        if (lib.amenities && lib.amenities.length > 0) {
            amenitiesHtml = `<div class="branch-amenities">` + 
                lib.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('') +
            `</div>`;
        }

        // basic open/closed status for today
        const todaysHours = lib.hours ? lib.hours[today] : null;
        const isClosed = !todaysHours || todaysHours.toLowerCase().includes('closed');
        const statusClass = isClosed ? 'status-closed' : 'status-open';
        const statusText = isClosed ? 'Closed Today' : 'Open Today';

        li.innerHTML = `
            <div class="branch-header">
                <h2 class="branch-name">${lib.name}</h2>
                <span class="branch-status ${statusClass}">${statusText}</span>
            </div>
            <p class="branch-address">${lib.address}</p>
            ${hoursHtml ? `<div class="branch-hours">${hoursHtml}</div>` : ''}
            ${amenitiesHtml}
        `;
        
        DOM.list.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', init);
