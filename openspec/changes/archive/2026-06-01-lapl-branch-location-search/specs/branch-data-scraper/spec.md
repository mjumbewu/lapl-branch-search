## ADDED Requirements

### Requirement: Fetch and Merge Data
The script SHALL fetch geographic data from the Socrata portal and merge it with hours and amenities scraped from the LAPL branches HTML page.

#### Scenario: Successful data merge
- **WHEN** the scraper executes successfully
- **THEN** it outputs a `libraries.json` file containing unified branch records with lat, lng, hours, and resources

### Requirement: Error handling on scrape failure
The script SHALL gracefully fail and log an error if the LAPL page structure is unrecognized.

#### Scenario: Broken HTML format
- **WHEN** the LAPL website's HTML structure for hours is missing or changed
- **THEN** the script logs a clear parsing error and exits with a non-zero status
