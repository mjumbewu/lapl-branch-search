## Context

We want to modernize the Node.js scraper tool to use ECMAScript Modules (ESM) instead of CommonJS. 

## Goals / Non-Goals

**Goals:**
- Add `"type": "module"` to the `package.json` in the `scraper/` directory.
- Refactor existing `.js` files in `scraper/` to use standard `import` syntax.
- Ensure the scraper script still runs correctly and successfully outputs `app/libraries.json`.

**Non-Goals:**
- We are not rewriting the core scraping logic or adding new scraping features. We are just updating the module system.

## Decisions

- **Package Config**: We'll add `"type": "module"` to `scraper/package.json`.
- **Path Resolution**: Since `__dirname` is not available natively in ESM, we will construct it using `fileURLToPath` and `dirname` from the native `url` and `path` modules to closely map to existing behavior.
- **Cheerio Import**: `cheerio` supports ESM, so we will use `import * as cheerio from 'cheerio'`.

## Risks / Trade-offs

- **[Risk] Library Compatibility**: Some older Node.js libraries don't support ESM properly.
  - *Mitigation*: We only depend on `cheerio` and built-in Node modules (`fs`, `path`), all of which have robust ESM support.
