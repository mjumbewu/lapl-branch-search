## Why

Users currently can only see a textual list of branches that match their filters. A geographic map view makes it much easier to understand the physical distribution of branches across Los Angeles and find the closest open library.

## What Changes

- Add a MapLibre GL JS map to the mobile app interface.
- The map will display markers for all LAPL branches currently loaded in `libraries.json`.
- The map will be positioned in the top half of the screen, with the results list taking up the bottom half.
- The map markers will filter dynamically, hiding or showing in sync with the list based on the selected day and amenity filters.

## Capabilities

### New Capabilities
- `branch-map-view`: Displays an interactive map of library branches that responds to user filters.

### Modified Capabilities
- `branch-search`: The layout and rendering logic will be updated to accommodate the split screen and to trigger map marker updates when filters change.

## Impact

- **UI/Layout**: The main `index.html` and `style.css` will be updated to support a flex or grid split view.
- **Dependencies**: Introduces MapLibre GL JS (CSS and JS) to the frontend.
- **Logic**: `app.js` will be expanded to manage a MapLibre map instance and its markers.
