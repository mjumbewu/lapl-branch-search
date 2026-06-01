# Branch Search

## Purpose
TBD: Handles mobile-friendly searching and filtering of branch locations.

## Requirements

### Requirement: Search by Amenities
The system SHALL allow users to filter the branch list by selected amenities (e.g., Wi-Fi, Printing).

#### Scenario: User filters by Wi-Fi
- **WHEN** the user selects the "Wi-Fi" filter
- **THEN** the list updates to only show branches that have Wi-Fi in their resources list
- **AND** the map updates to show only the matching branches

### Requirement: Filter by Open Status
The system SHALL allow users to filter branches based on whether they are open on specific days.

#### Scenario: User filters for Saturday opening
- **WHEN** the user selects the "Open Saturday" filter
- **THEN** the list displays branches with hours listed for Saturday
- **AND** the map updates to show only the matching branches
