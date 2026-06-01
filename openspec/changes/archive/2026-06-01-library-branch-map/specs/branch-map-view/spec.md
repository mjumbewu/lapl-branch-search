## ADDED Requirements

### Requirement: Display Map and Markers
The system SHALL display an interactive map with markers corresponding to the available library branches.

#### Scenario: User opens the app
- **WHEN** the app loads and parses `libraries.json`
- **THEN** it renders a map centered on Los Angeles with a marker for each library

### Requirement: Sync Map with Filters
The map markers SHALL dynamically update to reflect the currently filtered list of libraries.

#### Scenario: User applies a filter
- **WHEN** the user filters by an amenity or open day
- **THEN** the map removes markers for branches that do not meet the criteria, leaving only matching branches visible
