## Context

The map and list are synchronized: clicking on a branch card makes the map fly to the branch marker. However, this overrides native browser and OS interactions on the address text. On iOS, native address auto-linking (which wraps the address in a native `<a>` tag) is interfered with. On Android, trying to tap-and-select the address to trigger the native maps shortcut or ride-share apps triggers the card-level click event instead.

## Goals / Non-Goals

**Goals:**
- Retain the address as standard text to allow native data detectors (iOS Safari) to inject native `<a>` tags and run their native maps handlers unhindered.
- Enable frictionless text selection on the address text (Android/desktop) so that native selection popups are fully accessible.
- Avoid interrupting normal event bubbling so that native browsers can capture clicking/selection events exactly as designed.

**Non-Goals:**
- Custom routing/navigation within our application, or linking to a specific hardcoded external provider (like Google Maps).

## Decisions

- **Event Filtering**: Rather than attaching listeners to stop propagation on the `.branch-address` element (which can interfere with native bubbling handlers), we will simply make the `.branch-card`'s click listener ignore clicks originating within `.branch-address`.
  - In `app.js`, add `if (e.target.closest('.branch-address')) return;` at the beginning of the card's click handler.
- **Selection Optimization**: In `style.css`, apply `user-select: text` to `.branch-address` and `user-select: none` to the rest of the card. This makes selection targeting extremely easy on mobile devices.

## Risks / Trade-offs

- **[Risk] Hover styles on iOS**: The card has a hover styling. When clicking the address, does the hover style trigger?
  - *Mitigation*: The hover card transform is fine and provides a native card-like feel. We will keep standard flex/card styling.
