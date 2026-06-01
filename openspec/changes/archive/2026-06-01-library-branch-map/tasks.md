## 1. Setup Map Dependencies

- [x] 1.1 Include MapLibre GL JS CSS and JavaScript assets in `app/index.html`

## 2. Layout Updates

- [x] 2.1 Add a `<div id="map">` container to `index.html` above the list view
- [x] 2.2 Update `style.css` to split the screen layout (e.g., flex-column with the map taking 40-50% height and the list scrolling below)

## 3. Map Implementation

- [x] 3.1 Initialize the MapLibre map in `app.js` (centered on LA with an OSM vector tile style)
- [x] 3.2 Create a `renderMapMarkers()` function in `app.js` to plot markers for the `filteredLibraries` array
- [x] 3.3 Ensure markers display the library name as a tooltip or popup

## 4. Integration

- [x] 4.1 Update the `applyFilters()` logic in `app.js` to invoke `renderMapMarkers()` whenever the filter state changes
- [x] 4.2 Verify that clicking an amenity or day filter correctly updates both the list and the map markers
