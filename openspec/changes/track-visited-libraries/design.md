## Context

The LAPL Finder application is a single-page web app built with vanilla JavaScript, HTML5, CSS3, and MapLibre GL. It has no backend server or database; all branch details are loaded from a static `libraries.json` file. To implement the visitation tracking feature, all state must be saved and loaded directly on the user's device.

## Goals / Non-Goals

**Goals:**
- Persist visitation status and timestamps (date and time) on the local device across browser sessions.
- Update the branch cards in the list view to display a toggle/checkbox for visitation status.
- Show the recorded visitation timestamp on cards for visited libraries.
- Protect against accidental removal of visitation history by requiring confirmation before unmarking a library.
- Provide a simple, accessible way for users to edit the visitation date and time.
- Allow filtering and searching of branches based on visited status (e.g., showing only visited or only unvisited branches).

**Non-Goals:**
- Backend database sync or multi-device synchronization.
- User registration or authentication.

## Decisions

### Decision 1: Storage Layer
Use the browser's `localStorage` API to persist the visitation state.
- **Data Schema**: A JSON-serialized object stored under the key `lapl_visited_libraries`. The object maps library names (unique identifiers in `libraries.json`) to a visitation record object containing a `visitedAt` ISO 8601 timestamp string.
  ```json
  {
    "Central Library": {
      "visitedAt": "2026-06-09T13:39:01-04:00"
    },
    "Cahuenga Branch": {
      "visitedAt": "2026-06-08T10:00:00-04:00"
    }
  }
  ```
- **Rationale**: Simple key-value storage is perfect for this size of data and requires no asynchronous overhead, unlike IndexedDB.
- **Alternative considered**: IndexedDB. Rejected as unnecessary overhead for a dataset of approximately 73 library branches.

### Decision 2: Confirmation UI
Use a standard browser `confirm()` modal when a user unchecks a visited library.
- **Rationale**: `confirm()` is simple, natively supported, accessible, and blocks execution which makes handling checkbox/toggle state transitions trivial.
- **Alternative considered**: A custom HTML/CSS modal. Rejected to keep the codebase lightweight and avoid adding UI complexity for a simple warning.

### Decision 3: DateTime Editing Interface
When the edit icon (✏️) is clicked, replace the static timestamp text on the card with an inline form consisting of:
1. A datetime input element: `<input type="datetime-local">`
2. A "Save" button and a "Cancel" button.
- **Rationale**: This design is mobile-friendly (triggers native date-time scroll wheel widgets on iOS/Android), is fully responsive, and avoids the need for external date picker libraries.
- **Alternative considered**: A modal popup. Rejected because inline editing provides a smoother, context-preserving user experience on small screens.

### Decision 4: Visited Status Filter UI & Logic
Add a new filter group "Visited Status" to the filter panel `#filter-panel` with two mutually exclusive filter pills: "Visited" and "Not Visited".
- **Rationale**: Keeps UI consistency with other filters (e.g. days and amenities), which use the pill group component style. Making them mutually exclusive (selecting one deselects the other) is logical since a library cannot be both visited and not visited.
- **Alternative considered**: A single checkbox filter. Rejected because separate "Visited" and "Not Visited" pills allow explicit selection of either category, matching the existing multi-pill design.

## Risks / Trade-offs

- **[Risk] Data Loss on Cache Clear** → Clearing browser site data or using Private/Incognito mode will erase visitation data.
  - *Mitigation*: Accepted trade-off for a local-only prototype. In a future iteration, an export/import backup feature could be implemented.
- **[Risk] Date Parsing Discrepancies** → Browsers parse and format date-time strings differently based on locales.
  - *Mitigation*: Store all timestamps as ISO 8601 strings and format them for display using `Intl.DateTimeFormat` or `.toLocaleString()`.
