# 🧩 Phase 2 – Backend Setup

## 1. Project Structure
- Use the existing folder: `effortsengineers-backend`
- Core folders include:
  - `config/` → PostgreSQL and environment configuration
  - `controllers/` → API handlers
  - `routes/` → route registration
  - `middleware/` → auth and validation
  - `tests/` → backend test cases
  - `scripts/` → DB schema and initialization scripts
  - `.env` → local environment values (not committed to Git)

---

## 2. Environment Configuration
- Create a `.env` file in the backend root:
  ```env
  PORT=5000
  DB_HOST=localhost
  DB_PORT=5433
  DB_USER=postgres
  DB_PASSWORD=yourpassword
  DB_NAME=effortsengineers
  JWT_SECRET=your_jwt_secret
  ```
- Add `.env` to `.gitignore` to avoid exposing secrets.

## 3. Install Dependencies
Run inside `effortsengineers-backend`:
```bash
npm install
```

## 4. Database Setup
- From the repository root, run the checked-in SQL script:
  ```bash
  psql -U postgres -h localhost -p 5433 -f scripts/generateDB.sql
  ```
- Verify the schema is present:
  ```bash
  psql -U postgres -h localhost -p 5433 -d effortsengineers -c "\dt"
  ```

## 5. Express Server
The backend entry point is `server.js`, and the project uses ESM syntax.

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
```

Start the server with:
```bash
npm run dev
```

Or run directly:
```bash
node server.js
```

Verify the health endpoint:
```bash
curl http://localhost:5000/api/health
```

## 6. Testing Setup
The backend already uses Jest, with DB-backed tests exposed via `npm run test:db` and mock-based tests via `npm run test:mock`.

Run the standard suite:
```bash
npm test
```

Run the DB-backed suite:
```bash
npm run test:db
```

The backend currently exposes `/api/health` and API route groups such as auth, catalog, quotation, orders, inventory, and admin endpoints.

## 7. Toolkit Recommendation (Backend Focus)
- **Primary**: GitHub Copilot + Copilot Chat → daily coding assistance
- **Secondary**: Claude Dev → reasoning-heavy QA and API test generation
- **Tertiary**: Gemini Pro → backend QA automation workflows (see [Gemini Pro Guide](../templates/GEMINI_SETUP.md))
- **Optional**: Codex API → experimental backend agents