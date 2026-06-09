## Context

Currently, visited branches are marked via a simple checkbox on the card, but their physical card layout and their map markers remain identical to unvisited ones. We want to provide a prominent visual indicator for visited libraries.

## Goals / Non-Goals

**Goals:**
- Visually differentiate visited and unvisited libraries on the map.
- Stylize visited branch cards in the list view to feel premium and "shiny gold".

**Non-Goals:**
- Importing heavy external graphic assets or installing icon libraries. All styles must use CSS, standard HTML elements, and emojis.

## Decisions

### Decision 1: Custom HTML Map Markers
To display a gold star (🌟) on the map, we will replace the default MapLibre marker element for visited branches with a custom HTML element.
- **Unvisited Branches**: Keep using the default MapLibre GL marker.
- **Visited Branches**: Create a custom `div` element with a `marker-visited` CSS class containing a gold star emoji (🌟).

### Decision 2: Shiny Gold Card Layout
We will add a `.card-visited` modifier class to visited branch cards.
- **Background**: Apply a subtle gold gradient (`linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)`).
- **Border**: Set a gold/amber border (`#fbbf24`).
- **Accent**: Add a vertical gold accent bar on the left edge of the card using a `::before` pseudo-element.
- **Shadow**: Use a golden glow box-shadow (`rgba(251, 191, 36, 0.2)`).

## Risks / Trade-offs

- **Custom Marker Alignment**: Custom HTML elements for MapLibre markers are positioned relative to their coordinates. We need to set the proper transform/anchor behavior in CSS to ensure the star emoji aligns accurately with the branch location.
  - *Mitigation*: Style the custom marker to center the emoji and set an anchor point if needed.
