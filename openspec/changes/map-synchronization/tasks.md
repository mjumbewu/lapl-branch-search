## 1. List Rendering Updates

- [ ] 1.1 In `app.js`'s `renderList()` function, assign a unique `id` to each `<li>` branch card (e.g., using a slugified version of the branch name or an index).
- [ ] 1.2 Add CSS in `style.css` for a `.highlight-flash` animation that temporarily changes the background color and fades out.

## 2. Marker Event Integration

- [ ] 2.1 In `app.js`'s `renderMapMarkers()` function, attach a `'click'` event listener to each marker.
- [ ] 2.2 In the click handler, locate the corresponding `<li>` element by its ID and call `scrollIntoView({ behavior: 'smooth', block: 'start' })`.
- [ ] 2.3 Add the `.highlight-flash` class to the `<li>` element upon clicking.
- [ ] 2.4 Use `setTimeout` to remove the `.highlight-flash` class after a couple of seconds so the animation can be re-triggered on subsequent clicks.

## 3. Verification

- [ ] 3.1 Verify that clicking a map marker successfully scrolls the list to the correct item.
- [ ] 3.2 Verify the highlight flash provides clear visual feedback without leaving permanent styling artifacts.
