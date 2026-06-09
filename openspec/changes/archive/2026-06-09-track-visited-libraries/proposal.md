## Why

Users want a way to track which library branches they have visited. This local history keeps a personal record of their exploration without requiring account registration, allowing them to mark branches as visited, view the date/time of their visit, and edit the timestamp if they log it after the fact.

## What Changes

- Add a "Visited" toggle/checkbox on each branch card.
- Save the visitation status and corresponding date/time stamp to local storage.
- Show a confirmation prompt when unchecking a visited library to prevent accidental data loss.
- Provide a subtle edit interface (indicated by a pencil emoji ✏️) to modify the recorded visitation date/time.
- Add search/filter capabilities to filter branches by their visitation status (e.g. showing only "Visited" or "Not Visited" libraries).

## Capabilities

### New Capabilities
- `visited-libraries`: Tracks library branch visitations, persists the data locally with timestamps, requires confirmation to remove, allows editing the visitation timestamp, and supports filtering branches by visited/unvisited status.

### Modified Capabilities
<!-- No requirement changes to existing search or scraper capabilities -->

## Impact

- **UI/UX**: Modifies the branch detail card layout inside the list view (adding toggle, timestamp, edit icon) and adds a new filter section to the filter panel for visitation status.
- **State Management**: Introduces a local storage manager to persist visited library IDs and timestamps.
- **Scripts**: Updates `app/app.js` to manage visited state, filter search results by visitation status, render the updated card UI, display confirmation prompts, and handle editing of timestamps.
- **Styles**: Updates `app/style.css` with styles for checked/unchecked states, timestamps, inline timestamp editor, and the new visited status filter buttons.
