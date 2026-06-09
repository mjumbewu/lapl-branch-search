## 1. UI Updates & Styling

- [x] 1.1 Add CSS rules in `app/style.css` for visited cards (`.card-visited`), defining a subtle gold gradient background, golden border, left vertical gold accent bar, and golden glow shadow
- [x] 1.2 Add CSS rules in `app/style.css` for custom visited map markers (`.marker-visited`) to size and position the custom star emoji container

## 2. Code Implementation

- [x] 2.1 Update `renderList()` in `app/app.js` to conditionally append the `card-visited` class to the card element (`li`) if the branch is visited
- [x] 2.2 Update `renderMapMarkers()` in `app/app.js` to instantiate a custom HTML `div` element for visited branch markers, displaying a gold star emoji (🌟), and styling it using `.marker-visited`

## 3. Verification

- [x] 3.1 Verify that marking a library as visited immediately applies the shiny gold card styling and updates its map marker to the gold star emoji (🌟)
- [x] 3.2 Verify that un-visiting a library restores the default card styling and default MapLibre map marker
