## 1. Card Event Filtering

- [x] 1.1 In `app.js`'s `renderList()`, update the `click` listener of the `<li>` branch card.
- [x] 1.2 Add `if (e.target.closest('.branch-address')) return;` as the first line of the `click` handler to bypass the map-fly behavior when the address text is clicked.

## 2. Selection Styling

- [x] 2.1 Update `style.css` to add `user-select: text; -webkit-user-select: text;` to `.branch-address`.
- [x] 2.2 Add `user-select: none; -webkit-user-select: none;` to the `.branch-card` container to ensure selecting the address is simple and targeted.

## 3. Verification

- [x] 3.1 Verify that clicking on the card contents (like hours or title) still centers/flies the MapLibre map on the marker.
- [x] 3.2 Verify that clicking or selecting the address text does not trigger the map fly action, allowing native iOS `<a>` auto-injections and Android text selection toolbars to function normally.
