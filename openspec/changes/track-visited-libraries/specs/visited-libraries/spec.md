## ADDED Requirements

### Requirement: Toggle Visited Status
The system SHALL display a toggle or checkbox on each branch card to mark the branch as visited.

#### Scenario: User marks a library as visited
- **WHEN** the user checks the visited toggle on a branch card
- **THEN** the system SHALL mark the branch as visited
- **AND** record the current date and time as the visitation timestamp
- **AND** store the visitation state in the device's local storage

#### Scenario: User unchecks a visited library and cancels
- **WHEN** the user unchecks the visited toggle on a branch card
- **THEN** the system SHALL prompt the user for confirmation to remove the visitation record
- **WHEN** the user cancels the confirmation prompt
- **THEN** the system SHALL keep the branch marked as visited and retain the visitation record in local storage

#### Scenario: User unchecks a visited library and confirms
- **WHEN** the user unchecks the visited toggle on a branch card
- **THEN** the system SHALL prompt the user for confirmation to remove the visitation record
- **WHEN** the user confirms the prompt
- **THEN** the system SHALL remove the visitation record from local storage
- **AND** update the UI to show the branch as unvisited

### Requirement: Display Visitation Details
For any library marked as visited, the branch card SHALL display the visitation status and the recorded date/time of the visit.

#### Scenario: User views a visited branch card
- **WHEN** a branch is marked as visited
- **THEN** its card SHALL display a "Visited on" label followed by the formatted date and time of the visit

### Requirement: Edit Visitation Date/Time
The system SHALL allow the user to modify the date and time of an existing visitation.

#### Scenario: User clicks the edit icon
- **WHEN** the user clicks the edit control (✏️) next to the visitation date/time on a visited branch card
- **THEN** the system SHALL display a date/time input field pre-filled with the current visitation timestamp
- **AND** display "Save" and "Cancel" controls

#### Scenario: User saves an edited visitation timestamp
- **WHEN** the user enters a new date and time and clicks "Save"
- **THEN** the system SHALL update the visitation timestamp in local storage
- **AND** update the branch card display to reflect the new timestamp
- **AND** hide the input field and actions

#### Scenario: User cancels editing a visitation timestamp
- **WHEN** the user clicks "Cancel" during editing
- **THEN** the system SHALL hide the input field and actions without modifying the stored timestamp

### Requirement: Filter by Visited Status
The system SHALL allow users to filter the branch list and map by their visitation status.

#### Scenario: User filters for Visited libraries
- **WHEN** the user selects the "Visited" filter
- **THEN** the list and map SHALL only display branches that have been marked as visited

#### Scenario: User filters for Not Visited libraries
- **WHEN** the user selects the "Not Visited" filter
- **THEN** the list and map SHALL only display branches that have not been marked as visited

#### Scenario: User clears visitation status filter
- **WHEN** the user clears or deselects the visitation filters
- **THEN** the list and map SHALL display branches regardless of their visited status
