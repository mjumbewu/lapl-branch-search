## Why

Users who interact with the map currently see a popup with the branch name, but they cannot easily read the branch's full hours or amenities because they have to manually scroll through the list to find it. Synchronizing map marker clicks to scroll the corresponding list item into view will provide a seamless and intuitive user experience.

## What Changes

- When a map marker is clicked, the application will automatically scroll the list container so that the selected branch's card is visible.
- The selected branch card in the list will be visually highlighted (e.g., via a CSS animation or border change) to draw the user's attention.

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `branch-map-view`: Add a requirement for map marker interactions to trigger list scrolling and highlighting.

## Impact

- **Logic**: `app.js` will be updated to add event listeners to map markers. It will need a way to map each marker back to its corresponding list `<li>` element to invoke `scrollIntoView()`.
- **UI/Layout**: `style.css` will be updated with a `.highlight` state for branch cards to provide visual feedback.
