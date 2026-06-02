## Why

The Node.js ecosystem has largely shifted to ECMAScript Modules (ESM) which uses the standard `import`/`export` syntax rather than CommonJS `require()`. Moving our scraper scripts to ESM keeps the project modernized, aligns with frontend JavaScript standards, and ensures better compatibility with future Node.js library updates that may drop CommonJS support. It establishes a preference for standard modules for all future Node scripts in this project.

## What Changes

- Update `scraper/package.json` to define the project type as `module`.
- Refactor the scraper scripts (`index.js` and `test-scraper.js`) to use ESM `import` statements instead of `require()`.
- Replace the usage of CommonJS variables like `__dirname` with modern equivalent ESM constructs (like `import.meta.url`).

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `branch-data-scraper`: Update the scraper runtime environment and syntax to support ESM.

## Impact

- **Logic**: `scraper/index.js` and `scraper/test-scraper.js` will have their module loading syntax updated. Path resolution logic will be updated.
- **UI/Layout**: No changes to the frontend or user interface.
