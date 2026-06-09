## Why

Currently, visited libraries look identical to unvisited ones on both the map view and the list view. Visually distinguishing visited libraries will allow users to quickly scan the map and list to see which branches they have already visited.

## What Changes

- **Map Markers**: Visited libraries will be visually distinguished on the map with a gold star (🌟) or custom marker styling.
- **List Cards**: Visited library cards in the list view will have a shiny, gold-themed styling to make them stand out.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `visited-libraries`: Update display requirements to include visual differentiation (gold/shiny cards and custom marker styling/stars).

## Impact

- `app/app.js`: Update list item creation and marker generation logic to apply visited-specific styles/indicators.
- `app/style.css`: Add styling rules for gold/shiny cards, and custom markers or icon overlays.
