## Context

The LAPL mobile app currently shows a textual list of library branches. To improve usability, we want to add a geographic map view.

## Goals / Non-Goals

**Goals:**
- Integrate MapLibre GL JS to render a map in the top half of the screen.
- Show markers for all LAPL branches.
- Keep the map markers in sync with the active filters (days, amenities).

**Non-Goals:**
- Switching to a dynamic backend. We will use default OSM vector tiles with MapLibre.

## Decisions

- **Map Library**: MapLibre GL JS
  - *Rationale*: It provides smooth, hardware-accelerated vector tile rendering on mobile devices and gives us an incredibly premium feel out of the box.
- **Layout**: CSS Flexbox or Grid.
  - *Rationale*: We will adjust the main `<main>` container to flex column, giving the map 50vh or a flexible upper half, and the branch list the remaining space with `overflow-y: auto`.
- **Filtering Logic**: The `app.js` filter function will be updated to also call a `renderMapMarkers()` function, which clears existing markers and adds markers for the filtered branch array.

## Risks / Trade-offs

- **[Risk] Mobile Performance** → Rendering 73 markers on a small screen might feel cluttered.
  - *Mitigation*: We aren't doing clustering initially since 73 is manageable, but if performance suffers, we can add clustering using MapLibre's built-in GeoJSON clustering capabilities later.
