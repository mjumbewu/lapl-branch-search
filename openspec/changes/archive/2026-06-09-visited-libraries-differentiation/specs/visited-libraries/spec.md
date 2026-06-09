## ADDED Requirements

### Requirement: Distinguish Visited Map Markers
The system SHALL display visited libraries on the map with a gold star emoji (🌟) or distinct gold style to differentiate them from unvisited libraries.

#### Scenario: User views map markers
- **WHEN** a library is marked as visited
- **THEN** its map marker SHALL display a gold star emoji (🌟)

## MODIFIED Requirements

### Requirement: Display Visitation Details
For any library marked as visited, the branch card SHALL display the visitation status, the recorded date/time of the visit, and be styled with a shiny gold visual differentiation.

#### Scenario: User views a visited branch card
- **WHEN** a branch is marked as visited
- **THEN** its card SHALL display a "Visited on" label followed by the formatted date and time of the visit
- **AND** the card SHALL be styled with a shiny gold visual differentiation
