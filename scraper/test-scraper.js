const cheerio = require('cheerio');
fetch('https://www.lapl.org/branches')
  .then(res => res.text())
  .then(html => {
    const $ = cheerio.load(html);
    const branch = $('.views-row').first();
    console.log("HTML:", branch.html());
  });
