## Why

Currently, clicking anywhere on a branch card (including the address text) triggers the app's internal map-fly behavior. This interferes with operating system native address interactions. For instance, iOS Safari's native data detectors automatically wrap addresses in an `<a>` tag to launch Maps, and Android/desktop browsers allow text selection to summon a native map shortcut menu. We want the card-level click handler to ignore interactions inside the address area completely so that native OS address features can run unhindered.

## What Changes

- Modify the card's click handler in `app.js` to ignore clicks that originate within the `.branch-address` element.
- Ensure the address text is easily selectable by explicitly enabling text selection styles on it while keeping card-level selection disabled.

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `branch-search`: Modify list card event handling to ignore clicks on the branch address.

## Impact

- **Logic**: `app.js` will bypass the `map.flyTo` action if `e.target.closest('.branch-address')` is true.
- **UI/Layout**: `style.css` will configure standard selection properties (`user-select: text`) on `.branch-address` and keep selection disabled (`user-select: none`) on the card wrapper to make selection of the address frictionless.
