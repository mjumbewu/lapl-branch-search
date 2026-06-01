## 1. List Rendering Updates

- [x] 1.1 In `app.js`'s `renderList()` function, assign a unique `id` to each `<li>` branch card (e.g., using a slugified version of the branch name or an index).
- [x] 1.2 Add CSS in `style.css` for a `.highlight-flash` animation that temporarily changes the background color and fades out.

## 2. Marker Event Integration

- [x] 2.1 In `app.js`'s `renderMapMarkers()` function, attach a `'click'` event listener to each marker.
- [x] 2.2 In the click handler, locate the corresponding `<li>` element by its ID and call `scrollIntoView({ behavior: 'smooth', block: 'start' })`.
- [x] 2.3 Add the `.highlight-flash` class to the `<li>` element upon clicking.
- [x] 2.4 Use `setTimeout` to remove the `.highlight-flash` class after a couple of seconds so the animation can be re-triggered on subsequent clicks.

## 3. List Event Integration

- [x] 3.1 In `app.js`'s `renderList()` function, attach a `'click'` event listener to each `<li>` branch card.
- [x] 3.2 In the click handler, call `map.flyTo({ center: [lib.lng, lib.lat], zoom: 14 })` (or equivalent) to pan and zoom the map to the marker.
- [x] 3.3 Ensure the corresponding marker's popup opens when the list item is clicked.

## 4. Verification

- [x] 4.1 Verify that clicking a map marker successfully scrolls the list to the correct item.
- [x] 4.2 Verify the highlight flash provides clear visual feedback without leaving permanent styling artifacts.
- [x] 4.3 Verify that clicking a list item successfully flies the map to the correct marker and opens its popup.
