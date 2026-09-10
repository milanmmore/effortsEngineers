# Efforts Engineers Modernization Plan

## 📌 Overview
This project revamps **effortsengineers.in** into a dual‑role platform:
- **Client Portal** → Catalog browsing, quotation requests, client dashboard.
- **Admin Dashboard** → Order management, inventory control, forecasting.

**Tech Stack:** Node.js + Express + PostgreSQL + Next.js

---

## 🧩 Phase 1 – Pre‑Requisites & Installation

### 1. System Requirements
  - OS: Windows 10/11 (64‑bit)
  - RAM: Minimum 8 GB (recommended 16 GB)
  - Disk Space: At least 10 GB free
  - Internet: Stable connection for package downloads

### 2. Install Core Tools
#### 🟢 Node.js & npm
  - Download Node.js v18+.
  - Run installer → select Add to PATH.
  - Verify installation:
    ```bash
    node -v
    npm -v
    ```
#### 🟢 PostgreSQL + pgAdmin
  - Download PostgreSQL.
  - Install with default settings.
  - Set a superuser password (note it down).
  - Verify:    
    ```bash
    psql --version
    ```
#### 🟢 Git
  - Download Git.
  - Install with default options.
  - Verify:
    ```bash
    git --version
    ```
#### 🟢 VS Code
  - Download VS Code.
  - Install extensions:
    - ES7+ React/Redux snippets
    - Prettier – Code formatter
    - PostgreSQL
    - AI extension
      - Copilot + Copilot Chat (official) 
      - Claude Dev (community)
      - Codex via API.
      - Gemini Pro for QA automation ([Gemini Pro Guide](docs/templates/GEMINI_SETUP.md))
      These tools complement each other:
      - Copilot → inline coding help.
      - Claude Dev → reasoning + QA automation design.
      - Codex API → custom AI agent workflows.
    Think of it like a toolkit: Copilot for speed, Claude for depth, Codex for flexibility. Since our focus is QA automation + web dev (Node.js, Express, PostgreSQL, React):
      Primary: GitHub Copilot + Copilot Chat (best integration, daily coding).
      Secondary: Claude Dev (for reasoning-heavy QA test generation).
      Optional: Codex API (for portfolio projects and custom AI agents).

### Tools
- Node.js (v18+)
- PostgreSQL + pgAdmin for DB management
- Git + GitHub CLI for version control
- VS Code for coding

### Knowledge Prep
- JavaScript ES6+ (async/await, modules)
- SQL basics (CRUD, joins)
- REST API fundamentals
- React components & routing

---

## ⚙️ Phase 2 – Backend Setup

### Initialize Project
  - create project folder. (effortsengineers) 
  - Open project folder in vs code &  goto Terminal window. 
  - Run following commands

```bash
mkdir effortsengineers-backend && cd effortsengineers-backend
npm init -y
npm install express pg cors body-parser nodemon bcrypt jsonwebtoken
```

### Automate Folder Structure
Run the structure script from the project root:

```Bash
node scripts/generateStructure.js
```

### Database Setup
In pgAdmin Query Tool: 
  - Right Click on postgres database & select Query Tool
  - open [scripts/generateDB.sql](scripts/generateDB.sql)
  - Execute SQL.
This will create database named effortsengineers.

---

## 💻 Phase 3 – Frontend Setup

### Create Next.js App
``` Bash
npx create-next-app@latest effortsengineers-frontend
cd effortsengineers-frontend
npm install axios bootstrap chart.js
```
### Folder Structure
  ``` Code
  app/
  ├── client/
  ├── admin/
  ├── auth/
  components/
  lib/
  styles/
  page.js
  ```

### Routing Example
``` jsx
// Next.js file-based routing
app/client/catalog/page.js       → exports <Catalog />
app/admin/orders/page.js         → exports <Orders />
app/admin/inventory/page.js      → exports <Inventory />
app/admin/forecasting/page.js    → exports <Forecasting />
```

## 📊 Phase 4 – Integration & Role Management

  - JWT Authentication → auth.js route for login/register.
  - Role‑based Middleware → restrict /api/admin/* routes.
  - Axios Integration → connect React pages to Express APIs.
  - Chart.js → visualize forecasting and KPIs.

## 🚀 Phase 5 – Deployment

| Component | Platform | Notes |
| --- | --- | --- |
| Backend | Render | Deploy `effortsengineers-backend` with `npm start` |
| Frontend | Vercel | Build `effortsengineers-frontend` with `npm run build` |
| Database | Managed PostgreSQL | Require TLS, backups, and restore tests |

## 📈 Phase 6 – Documentation & Team Visibility
### API Mapping
| Page | Endpoint | Table | Status |
| --- | --- | --- | --- |
| Catalog | /api/catalog | catalog | Planned |
| Quotation | /api/quotation | quotations | Planned |
| Orders | /api/admin/orders | orders | Planned; table and route not implemented |
| Inventory | /api/admin/inventory | catalog | Planned |
| Forecasting | /api/admin/dashboard/forecast | quotations, orders | Planned; route not implemented |

### Team Workflow
    - Backend: API development & DB schema.
    - Frontend: React components & Axios integration.
    - QA: Postman testing & UI validation.
    - Deployment: CI/CD setup & monitoring.


### 🧩 Architecture Diagram
Refer to [architecture-horizontal.png](docs/architecture-horizontal.png) and
[architecture-vertical.png](docs/architecture-vertical.png) showing:
    - Client Portal ↔ Admin Dashboard ↔ Node.js Backend ↔ PostgreSQL DB
    - Clear data flow for CRUD operations and analytics.

### 📂 Templates
Next.js role guard guidance:
- Enforce authorization in backend middleware for every `/api/admin/*` route.
- Use Next.js middleware or server components for route-level redirects.
- Never treat a client-side redirect as the authorization boundary.

Axios Example (Catalog)
``` js
import axios from "axios";

export const getCatalog = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/catalog`, {
    withCredentials: true,
  });
  return res.data;
};
```

### ✅ Summary
This plan ensures:
    - Automated backend structure creation.
    - Clean PostgreSQL schema.
    - Dual‑role React frontend.
    - Secure role‑based APIs.
    - Clear diagrams and templates for team visibility.


---

