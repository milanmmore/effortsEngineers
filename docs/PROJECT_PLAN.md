# Efforts Engineers — Master Modernization Project Plan

[![Backend Tests](https://img.shields.io/badge/Backend%20Tests-19%20Passed%20(100%25)-success?style=flat-square&logo=jest)](docs/TEST_CASES.md)
[![Frontend Status](https://img.shields.io/badge/Next.js%2016-21%20Pages%20Prerendered-blue?style=flat-square&logo=next.js)](effortsengineers-frontend)
[![Quality Standard](https://img.shields.io/badge/Quality-ISO%209001%3A2015-orange?style=flat-square)](app/global-reach)
[![Document Version](https://img.shields.io/badge/Version-v2.4.0--Production-indigo?style=flat-square)](docs/TEST_CASES.md)

---

## 📌 Executive Overview

This master project plan outlines the complete engineering modernization of **effortsengineers.in** from a static corporate catalog into an industrial-grade digital commerce and engineering hub inspired by **amocon.com**.

The platform is architected for dual-role workflows:
- **Public Engineering Catalog & Client Portal:** Real-time live stock visibility, 4-menu navigation, interactive quotation builder drawer, downloadable formal quotations (with GSTIN, IEC, and HSN codes), consignment tracking, and 24/7 AI chatbot technical assistance.
- **Admin Command & Operations Portal:** Live inventory control, customer RFQ review, order tracking, and AI-assisted demand forecasting.

**Primary Tech Stack:** Node.js 22 (ES Modules) + Express 5 + PostgreSQL (Pool) + Next.js 16 (App Router & Turbopack) + React 18.

---

## 📘 Phases & Documentation Index

| Phase | Specification Document | Focus Area & Deliverables | Status |
| :--- | :--- | :--- | :---: |
| **Phase 1** | [Phase 1: Project Initialization](docs/project_plan/phase1.md) | System requirements, Node.js 20+, PostgreSQL, and AI toolchain setup | ✅ Completed |
| **Phase 2** | [Phase 2: Backend Architecture](docs/project_plan/phase2.md) | Express 5, PostgreSQL pool (`config/db.js`), JWT authentication, CRUD APIs | ✅ Completed |
| **Phase 3** | [Phase 3: Frontend Development](docs/project_plan/phase3.md) | Next.js 16 App Router, Amocon technical design system, live stock catalog | ✅ Completed |
| **Phase 4** | [Phase 4: Integration & RBAC](docs/project_plan/phase4.md) | Role-based routing, JWT client/admin guards, Chart.js forecasting | ✅ Completed |
| **Phase 5** | [Phase 5: Deployment Strategy](docs/project_plan/phase5.md) | Cloud hosting (Render/Vercel), managed PostgreSQL, SSL enforcement | ✅ Completed |
| **Phase 6** | [Phase 6: Documentation & Specs](docs/project_plan/phase6.md) | System architecture diagrams (horizontal/vertical), API mapping | ✅ Completed |
| **Phase 7** | [Phase 7: Roadmap & Evolution](docs/project_plan/phase7.md) | 1–1.5 month demo delivery, quality verification, milestone roadmap | ✅ Completed |
| **Deployment** | [Deployment Workflow Spec](docs/project_plan/deployment-workflow-spec.md) | Release pipeline, build verification, and deployment topology | ✅ Completed |
| **Testing Hub** | [Comprehensive Test Cases](docs/TEST_CASES.md) | 19 Backend tests + 32 Frontend verification scenarios (100% Pass) | ✅ Completed |
| **Master QA** | [Master Test Suite Excel](Efforts_Engineers_Master_Test_Suite.xlsx) | Formatted Excel workbook with `Summary`, `frontend`, `backend` | ✅ Completed |

---

## 🧩 Phase 1 – Pre-Requisites & Toolchain Setup

### 1. System Requirements
- **Operating System:** Windows 10/11 (64-bit), macOS, or Linux
- **RAM:** Minimum 8 GB (16 GB recommended for concurrent Next.js Turbo + Express + PostgreSQL)
- **Storage:** Minimum 10 GB free disk space

### 2. Core Dependencies
- **Node.js:** `v20.0.0+` (LTS) — Verify with `node -v`
- **npm:** `v10.0.0+` — Verify with `npm -v`
- **PostgreSQL:** `v15` or `v16` (Default port `5433` or `5432`)
- **Git:** `v2.40+`

### 3. Engineering Toolkit
- **VS Code** with recommended extensions:
  - ESLint & Prettier
  - ES7+ React/Redux snippets
  - PostgreSQL client extension
- **AI-Assisted Pair Programming System:**
  - Gemini Pro / Antigravity Agent for full-stack autonomous coding, refactoring, and test verification.
  - GitHub Copilot for inline autocompletion.
  - Claude / Codex for architectural analysis and reasoning-heavy QA generation.

---

## ⚙️ Phase 2 – Backend Setup (`effortsengineers-backend`)

### 1. Architecture & Packages
- Built as a **Node.js ES Module** (`"type": "module"` in `package.json`).
- Uses **Express 5** (`express@^5.2.1`) for async error handling and routing.
- **PostgreSQL Client:** `pg@^8.23.0` with connection pooling and local SSL autodetection in `config/db.js`.
- **Security Middleware:** `bcryptjs` (cross-platform password hashing), `jsonwebtoken` (signed JWT tokens), `cors`, and `helmet`.

```bash
cd effortsengineers-backend
npm install
```

### 2. Database Schema & Migration
Execute SQL scripts in `scripts/`:
- [`scripts/generateDB.sql`](scripts/generateDB.sql): Creates tables (`users`, `products`, `orders`, `quotations`, `inquiries`) with constraints and indexing.
- [`scripts/seedDB.sql`](scripts/seedDB.sql): Seeds ready-stock compressor spares (Grasso, Bitzer, Kirloskar, Carrier, Sabroe), initial admin account, and demo customer orders.
- [`scripts/resetDB.sql`](scripts/resetDB.sql): Safe teardown and rebuild utility.

### 3. Environment Configuration
Configured in `effortsengineers-backend/.env` and `effortsengineers-backend/env.test`:
```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5433
DB_NAME=effortsengineers
DATABASE_URL=postgres://postgres:postgres@localhost:5433/effortsengineers
JWT_SECRET=supersecretkey123_effortsengineers_2026
```

---

## 💻 Phase 3 – Frontend Architecture (`effortsengineers-frontend`)

### 1. Core Framework & Design System
- Built on **Next.js 16** (App Router & Turbopack) with **React 18**.
- **Amocon-Inspired Industrial Design System (`app/globals.css`):**
  - High-trust industrial palette: Deep Navy (`#0f172a`), Technical Ocean Blue (`#0284c7`), Ice Slate (`#f8fafc`), and Safety Amber (`#f59e0b`).
  - Mobile-responsive navigation, fluid typography, and interactive hover bridges.

### 2. Delivered Feature Modules
1. **4-Menu Dropdown Architecture (`components/Navbar.js`):**
   - `Home` (`/`)
   - `Solutions & Spares ▾` (`/products`, `/services`, `/productsourcing`)
   - `Global Reach` (`/global-reach`)
   - `Company & Support ▾` (`/about`, `/warranty`, `/contact`)
   - Plus action triggers: `Quote Builder` drawer & `Portal Login`.
2. **Live Stock Catalog (`app/products/page.js`):**
   - Real-time stock status pills: `🟢 In Stock (24-48h Dispatch)`, `🟡 Low Stock`, `🔵 Sourced to Order`.
   - Multi-criteria filtering by Brand (Grasso, Bitzer, Kirloskar, Carrier, Sabroe, Bock, Daikin) and Category.
   - Wrapped in `<Suspense>` boundary to guarantee zero CSR bailout during static prerendering.
3. **Automated Quotation Builder Drawer (`components/QuoteBuilderDrawer.js`):**
   - Slide-out RFQ cart backed by persistent `QuoteContext`.
   - Real-time quantity adjustment, subtotal computation, and commercial inquiry dispatch.
4. **Customer Portal (`app/client/*`):**
   - Formal Printable Quotation Sheet (`/client/quotation`) with official letterhead, GSTIN, IEC code, HSN/SAC codes, 18% GST calculation, and authorized Pune factory seal.
   - Live consignment courier tracking (`/client/orders`) with Blue Dart and DHL AWB references.
5. **AI Assistant & Multi-Channel Help:**
   - 24/7 AI Chatbot (`components/AIChatbot.js`) with compressor domain matching.
   - Floating direct WhatsApp desk (`components/WhatsAppButton.js`).

---

## 📊 Phase 4 – Integration & Role Management

### 1. Authentication & Role Guards
- Standardized JWT payload: `{ id, email, role: 'client' | 'admin' }`.
- Route protection handled via higher-order components and backend middleware:
  - `components/ProtectedRoute.js` & `components/ClientProtectedRoute.js`.
  - Backend `middleware/auth.js` validating tokens and verifying roles before route execution.

### 2. API Communication
- Centralized Axios client (`lib/axiosClient.js`) configured with base URL, timeout handling, and automatic Authorization Bearer header injection.

### 3. Admin Forecasting & Metrics
- Interactive dashboards (`app/admin/*`) utilizing `chart.js` and `react-chartjs-2` for inventory reorder tracking and automated 30-day demand forecasting.

---

## 🚀 Phase 5 – Deployment & Cloud Topology

| Component | Target Platform | Build Command | Runtime Configuration |
| :--- | :--- | :--- | :--- |
| **Backend API** | Render / AWS EC2 / Container | `npm install` | `npm start` (Node.js 22, Port 5000) |
| **Frontend Web App** | Vercel / Netlify / Node SSR | `npm run build` | Next.js 16 Turbopack (Port 3000) |
| **Database** | Supabase / Neon / AWS RDS | SQL migration scripts | PostgreSQL 15/16 with TLS/SSL |

Refer to [`docs/project_plan/deployment-workflow-spec.md`](docs/project_plan/deployment-workflow-spec.md) for CI/CD pipeline and automated deployment workflows.

---

## 📈 Phase 6 – API Mapping & Architecture Traceability

### Backend API Status Matrix (All Implemented & Tested)
| Method | Endpoint | Primary Purpose | Table | Current Status |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | System health check | N/A | ✅ **Implemented & Passing** |
| `POST` | `/api/auth/register` | User registration & JWT generation | `users` | ✅ **Implemented & Passing** |
| `POST` | `/api/auth/login` | User login & token authentication | `users` | ✅ **Implemented & Passing** |
| `GET` | `/api/catalog` | Public product catalog fetch | `products` | ✅ **Implemented & Passing** |
| `POST` | `/api/catalog` | Admin product creation | `products` | ✅ **Implemented & Passing** |
| `GET` | `/api/quotations` | Admin fetch of customer RFQs | `quotations` | ✅ **Implemented & Passing** |
| `POST` | `/api/quotation` | Submit quotation request | `quotations` | ✅ **Implemented & Passing** |
| `POST` | `/api/orders` | Place new customer order | `orders` | ✅ **Implemented & Passing** |
| `GET` | `/api/admin/inventory` | Live inventory stock review | `products` | ✅ **Implemented & Passing** |
| `GET` | `/api/admin/dashboard/forecast` | AI demand forecasting stats | `quotations`, `orders` | ✅ **Implemented & Passing** |

### System Architecture Visuals
- Horizontal Topology: [`docs/architecture-horizontal.png`](docs/architecture-horizontal.png)
- Vertical Tier Spec: [`docs/architecture-vertical.png`](docs/architecture-vertical.png)
- Architecture Specification Document: [`docs/architecture-spec.md`](docs/architecture-spec.md)

---

## 🏁 Phase 7 – Fast-Track Roadmap & Quality Sign-Off

### Execution & Verification Summary
- **Backend Automated Test Matrix:**
  - Runner: `npm run test:mock` and `npm run test:db` (in `effortsengineers-backend`).
  - **Results:** 5 Test Suites passed, **19 of 19 Tests passed (100% Pass rate)** in 2.2s.
- **Frontend Static Prerender Matrix:**
  - Runner: `npm run build` (in `effortsengineers-frontend`).
  - **Results:** All **21 pages prerendered cleanly** with static optimization.
- **Master QA Deliverables:**
  - Specification Document: [`docs/TEST_CASES.md`](docs/TEST_CASES.md).
  - Excel Master Test Suite: [`Efforts_Engineers_Master_Test_Suite.xlsx`](Efforts_Engineers_Master_Test_Suite.xlsx) with sheets `Summary`, `frontend`, `backend`.

---

## 🎯 Verification Commands

```bash
# 1. Run backend tests (Mock DB)
cd effortsengineers-backend
npm run test:mock

# 2. Run backend tests (Live PostgreSQL DB)
npm run test:db

# 3. Build & verify frontend (All 21 static pages)
cd ../effortsengineers-frontend
npm run build
```
