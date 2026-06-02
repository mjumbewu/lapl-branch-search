## 1. Package Configuration Updates

- [x] 1.1 In `scraper/package.json`, add `"type": "module"` at the top level.

## 2. Script Refactoring

- [x] 2.1 In `scraper/test-scraper.js`, replace `const cheerio = require('cheerio');` with `import * as cheerio from 'cheerio';`.
- [x] 2.2 In `scraper/index.js`, replace all `require()` statements with their equivalent `import` statements for `cheerio`, `fs`, and `path`.
- [x] 2.3 In `scraper/index.js`, update the file path generation to use ESM-compatible methods (e.g. `import { fileURLToPath } from 'url'; import { dirname } from 'path'; const __dirname = dirname(fileURLToPath(import.meta.url));`).

## 3. Verification

- [x] 3.1 Run `node index.js` inside the `scraper/` directory to verify the script executes without errors and successfully writes the `libraries.json` file.
