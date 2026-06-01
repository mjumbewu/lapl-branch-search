## 1. Setup Map Dependencies

- [ ] 1.1 Include MapLibre GL JS CSS and JavaScript assets in `app/index.html`

## 2. Layout Updates

- [ ] 2.1 Add a `<div id="map">` container to `index.html` above the list view
- [ ] 2.2 Update `style.css` to split the screen layout (e.g., flex-column with the map taking 40-50% height and the list scrolling below)

## 3. Map Implementation

- [ ] 3.1 Initialize the MapLibre map in `app.js` (centered on LA with an OSM vector tile style)
- [ ] 3.2 Create a `renderMapMarkers()` function in `app.js` to plot markers for the `filteredLibraries` array
- [ ] 3.3 Ensure markers display the library name as a tooltip or popup

## 4. Integration

- [ ] 4.1 Update the `applyFilters()` logic in `app.js` to invoke `renderMapMarkers()` whenever the filter state changes
- [ ] 4.2 Verify that clicking an amenity or day filter correctly updates both the list and the map markers
