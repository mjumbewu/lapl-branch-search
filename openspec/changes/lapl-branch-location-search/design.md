## Context

LAPL does not offer an easy mobile web experience to filter branches by days they are open, hours, and available amenities. LA County library does this, but not LAPL. The data is available but split across the Socrata portal (geodata) and LAPL's own Drupal site (hours, resources). We want a fast, mobile-friendly web app to view and filter this data without needing a dynamic backend.

## Goals / Non-Goals

**Goals:**
- Provide a responsive, mobile-first static web UI to browse and filter LAPL branches.
- Support filtering by amenities (e.g., Wi-Fi, Printing) and open days/hours.
- Create a script that can fetch data from the LAPL website and Socrata, outputting a static JSON file.

**Non-Goals:**
- Creating a backend API or database for this app.
- Incorporating LA County Libraries (strictly LAPL).
- Automating the scraper via GitHub actions immediately (this will be a follow-up task).

## Decisions

- **Architecture**: Static Site + Static Data File. The app will be pure HTML/CSS/JS. It fetches a `libraries.json` file on load. 
  - *Rationale*: Zero hosting costs, very fast, and branch data changes infrequently enough that a weekly scraper run is sufficient.
- **Scraper**: A Node.js script using DOM parsing (e.g., Cheerio) to scrape the LAPL branch pages and merge it with Socrata geodata. 
  - *Rationale*: Node.js makes sense to keep the tech stack unified with modern web development.

## Risks / Trade-offs

- **[Risk] Scraper Brittleness** → The LAPL Drupal website DOM might change, breaking the scraper.
  - *Mitigation*: Run the scraper regularly. We can fall back to the last known good `libraries.json` if parsing fails.
