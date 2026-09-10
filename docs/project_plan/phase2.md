# 🧩 Phase 2 – Backend Setup

## 1. Project Structure
- Use the existing folder: `effortsengineers-backend`
- Inside, add:
    - Database scripts live at the repository root in `scripts/`.
  - `config/` → environment and database configs
  - `tests/` → backend test cases
  - `package.json` → project metadata
  - `.env` → environment variables (not committed to Git)

---

## 2. Environment Configuration
- Create `.env` file in root of backend:
  ```env
  PORT=5000
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=postgres
  DB_PASSWORD=yourpassword
  DB_NAME=effortsengineers
  ```
* Add .env to .gitignore to avoid exposing secrets.

## 3. Install Dependencies
Run inside effortsengineers-backend:
    ```bash
    npm ci
    ```

## 4. Database Setup
    - From the repository root, run the checked-in SQL script:
    ```bash
    psql -U postgres -f scripts/generateDB.sql
    ```
    - Verify schema creation in PostgreSQL:
    ```bash
    psql -U postgres -d effortsengineers -c "\dt"
    ```

## 5. Express Server
- The current entry point is `server.js`. Keep the server implementation there unless the project is deliberately migrated to `src/index.js`:
    ```javascript
    const express = require('express');
    const cors = require('cors');
    require('dotenv').config();

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
    res.send('Efforts Engineers Backend Running');
    });

        const PORT = process.env.PORT || 5000;
        module.exports = app;

        if (require.main === module) {
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        }
    ```
- Run server after adding a `dev` script to `package.json`, or use `node server.js`:
    ```bash
    node server.js
    ```
- Verify the health endpoint:
    ```bash
    curl http://localhost:5000/health
    ```

## 6. Testing Setup
- The current test command uses Node's built-in test runner. Add tests under `tests/`:
    ```javascript
        const test = require('node:test');
        const assert = require('node:assert/strict');

        test('backend module exports an HTTP app', () => {
            assert.equal(typeof require('../server').listen, 'function');
        });
    ```
- Run tests:
    ```bash
    npm test
    ```

The current server exposes only `/` and `/health`. Catalog, quotation, order,
inventory, forecasting, and authentication routes remain implementation tasks.

## 7. Toolkit Recommendation (Backend Focus)
- **Primary**: GitHub Copilot + Copilot Chat → daily coding assistance
- **Secondary**: Claude Dev → reasoning‑heavy QA test generation
- **Tertiary**: Gemini Pro → backend QA automation workflows (see [Gemini Pro Guide](../templates/GEMINI_SETUP.md))
- **Optional**: Codex API → experimental backend agents