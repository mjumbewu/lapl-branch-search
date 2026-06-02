## MODIFIED Requirements

### Requirement: Node Environment Standards
The scraper scripts SHALL be written using modern ECMAScript Module (ESM) syntax and standard `import` / `export` features rather than CommonJS.

#### Scenario: Developer runs the scraper
- **WHEN** a developer executes `node index.js` in the scraper directory
- **THEN** Node.js interprets the script as an ES module due to the `package.json` configuration
- **AND** the script successfully imports dependencies and writes the output JSON file
