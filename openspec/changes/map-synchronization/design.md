## Context

The map and the list currently filter together, but they do not interact. Users who click a map marker see the branch name, but must manually scroll the list to find the branch's details (hours, address, amenities). We want map clicks to automatically scroll the corresponding list item into view.

## Goals / Non-Goals

**Goals:**
- When a user clicks a MapLibre marker, the list container scrolls smoothly to the corresponding branch card.
- Provide visual feedback (highlighting) on the branch card so the user knows which one was selected.

**Non-Goals:**
- Bi-directional synchronization (e.g., clicking a list item pans the map to the marker). We are only implementing map-to-list sync right now to keep the scope tight.

## Decisions

- **DOM Mapping**: During `renderList()`, we will assign a unique ID to each branch card (e.g., `id="branch-card-${lib.name.replace(/\s+/g, '-')}"`). When generating markers in `renderMapMarkers()`, we will add a click event listener that references this ID.
- **Scroll Behavior**: We will use `document.getElementById('...').scrollIntoView({ behavior: 'smooth', block: 'start' })`.
- **Highlighting**: We will add a CSS class `.highlight-flash` that temporarily changes the background or border color of the card, using CSS animations or transitions to fade it out.

## Risks / Trade-offs

- **[Risk] Mobile Scroll Constraints**: `scrollIntoView` might behave unexpectedly if the container overflow is set up incorrectly.
  - *Mitigation*: Our `#list-container` has a clean `overflow-y: auto` context. We will test `scrollIntoView` inside this scrollable container.
