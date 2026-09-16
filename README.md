# Efforts Engineers — Industrial Compressor Spares & Overhaul Platform

[![Backend Test Suite](https://img.shields.io/badge/Backend%20Tests-19%20Passed%20(100%25)-success?style=flat-square&logo=jest)](docs/TEST_CASES.md)
[![Frontend Prerender](https://img.shields.io/badge/Next.js%2016-21%20Pages%20Prerendered-blue?style=flat-square&logo=next.js)](effortsengineers-frontend)
[![Quality Standard](https://img.shields.io/badge/Quality-ISO%209001%3A2015-orange?style=flat-square)](app/global-reach)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-green?style=flat-square&logo=node.js)](package.json)

---

## 📌 Executive Overview

**Efforts Engineers** (Pune, India) is an established precision engineering manufacturer and exporter specializing in replacement spare parts and overhaul services for industrial refrigeration, air, and gas compressors.

For over 40 years, Efforts Engineers has supplied high-integrity spares suitable for **Grasso, Kirloskar, Bitzer, Carrier, Sabroe, Bock, Daikin, Vilter, Mycom, and York** compressors to cold storage operators, marine fleets, and petrochemical plants across India and 45+ export nations.

This modernized platform delivers:
- **Real-Time Live Stock Visibility:** Rapid stock lookups with transparent availability tiers (*In Stock 24-48h Dispatch*, *Low Stock*, *Sourced to Order*).
- **Automated Quotation Builder:** Reactive slide-out RFQ cart calculating line items, subtotals, and commercial specifications.
- **Client & Admin Portals:** Self-service tracking, formal printable quotations (with letterhead, GSTIN, IEC, and HSN codes), and AI-driven inventory forecasting.
- **Global Compliance Hub:** One-click downloads for ISO 9001:2015, Material Test Reports (MTR 3.1), and Zero-Defect declarations.
- **24/7 Technical Assistance:** AI Chatbot domain assistant and instant WhatsApp escalation desk.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Web App** | **Next.js 16** (App Router, Turbopack, SSR/SSG), **React 18**, CSS3 Custom Design System |
| **Backend API** | **Node.js 22**, **Express 5**, **PostgreSQL (`pg` Pool)**, **JWT Authentication**, **Helmet**, **CORS** |
| **Testing & QA** | **Jest 30.5**, **Supertest 7.2**, Mock DB & Live DB Runners, Master Excel Matrix |
| **Data & Scripts** | PostgreSQL 15/16, SQL Migration Scripts (`generateDB.sql`, `seedDB.sql`) |

---

## 📂 Repository Structure

```text
EffortsEngineers/
├── effortsengineers-backend/        # Node.js + Express 5 REST API
│   ├── config/                      # Database pool (db.js) & environment loader
│   ├── controllers/                 # Auth, Catalog, Orders, Quotations controllers
│   ├── middleware/                  # JWT auth, role validation, error handling
│   ├── routes/                      # API route definitions (/api/auth, /api/catalog, etc.)
│   ├── tests/                       # Jest + Supertest test suites (19/19 passing)
│   ├── .env.example                 # Sample backend environment variables
│   └── server.js                    # Express app initialization & middleware
│
├── effortsengineers-frontend/       # Next.js 16 Web Application
│   ├── app/                         # App Router pages (/products, /services, /about, etc.)
│   │   ├── client/                  # Client portal (dashboard, orders, quotation sheet)
│   │   ├── admin/                   # Admin portal (inventory, orders, forecasting)
│   │   ├── products/                # Catalog with Suspense-wrapped search
│   │   ├── global-reach/            # Export corridors & certificate download hub
│   │   └── globals.css              # Industrial technical design system & responsive rules
│   ├── components/                  # Navbar (4-menu architecture), QuoteDrawer, AIChatbot
│   ├── context/                     # AuthContext & QuoteContext state providers
│   └── config/                      # Contact & hotline settings (contactConfig.js)
│
├── docs/                            # Comprehensive Documentation & QA Hub
│   ├── TEST_CASES.md                # Complete Backend & Frontend Test Cases Specification
│   ├── Efforts_Engineers_Master_Test_Suite.xlsx # Master QA Excel Workbook (Summary, frontend, backend)
│   ├── EffortsEngineers_TestCases.xlsx # Duplicate QA Excel Sheet
│   ├── architecture-spec.md         # System architecture specification
│   ├── admin-dashboard-spec.md      # Admin metrics & forecasting spec
│   ├── documentation-flow-spec.md   # Documentation navigation flow
│   ├── roadmap-spec.md              # Project roadmap & milestones
│   └── project_plan/                # Phase 1 through Phase 7 implementation specs
│
├── scripts/                         # Database initialization and maintenance SQL
│   ├── generateDB.sql               # Full PostgreSQL table schema & constraints
│   ├── seedDB.sql                   # Sample compressor parts, users & orders
│   ├── resetDB.sql                  # Database teardown & reset utility
│   └── generateStructure.js         # Workspace scaffolding script
│
├── Efforts_Engineers_Master_Test_Suite.xlsx # Master Test Suite Workbook (Root copy)
└── README.md                        # Master project guide
```

---

## ⚡ Quick Start & Development Setup

### 1. Prerequisites
- **Node.js**: `v20.0.0` or higher
- **PostgreSQL**: `v15` or higher (configured on port `5433` or `5432`)
- **Git**

### 2. Backend Setup (`effortsengineers-backend`)
```bash
cd effortsengineers-backend

# Install dependencies
npm install

# Configure environment variables (.env)
# Verify DB credentials and JWT secret in .env and env.test

# Run tests in mock mode (no DB required)
npm run test:mock

# Run tests against live PostgreSQL DB
npm run test:db

# Start local backend API server (http://localhost:5000)
npm run dev
```

### 3. Frontend Setup (`effortsengineers-frontend`)
```bash
cd effortsengineers-frontend

# Install dependencies
npm install

# Start local Next.js development server (http://localhost:3000)
npm run dev

# Run production build and verify all 21 pages prerender
npm run build
```

---

## 📘 Documentation Index

| Phase / Document | Title | Focus Areas |
| :--- | :--- | :--- |
| [Phase 1](docs/project_plan/phase1.md) | Project Initialization | Folder structure, dependencies, toolchain setup |
| [Phase 2](docs/project_plan/phase2.md) | Backend Architecture | Express 5, PostgreSQL schema, JWT authentication |
| [Phase 3](docs/project_plan/phase3.md) | Frontend Development | Next.js App Router, dynamic catalog, quote cart |
| [Phase 4](docs/project_plan/phase4.md) | Integration & RBAC | Role-based routing, client & admin dashboards |
| [Phase 5](docs/project_plan/phase5.md) | Deployment Strategy | Cloud deployment, SSL, database persistence |
| [Phase 6](docs/project_plan/phase6.md) | Documentation & Diagrams | System architecture diagrams & technical specs |
| [Phase 7](docs/project_plan/phase7.md) | Maintenance & Evolution | Performance monitoring, caching & future roadmap |
| [Deployment Spec](docs/project_plan/deployment-workflow-spec.md) | CI/CD & Deployment | Release pipeline, containerization, hosting flow |
| [Test Specification](docs/TEST_CASES.md) | Complete QA Test Matrix | 19 Backend tests + 32 Frontend verification scenarios |
| [Visuals & Specs](docs/README.md) | Design & Architecture Index | Hub for screenshots, architecture PNGs, and specs |

---

## 🧪 Quality Assurance & Testing

All platform endpoints and UI workflows are backed by automated and reproducible verification suites.

### Backend Automated Test Matrix (19/19 Passing)
Run via `npm run test:mock` or `npm run test:db`:
- **Server Infrastructure (`tests/server.test.js`)**: Health verification (`200 OK`) and 404 handler.
- **Authentication & Core API (`tests/api.test.js`)**: Registration validation, bcrypt password hashing, login token issuance, public catalog search, and Admin RBAC.
- **Catalog Role-Based Access (`tests/catalog-auth.test.js`)**: Enforces Admin write privileges; blocks unauthorized modifications.
- **End-to-End User Flow (`tests/integration.test.js`)**: Complete multi-actor workflow (*Register ➔ Login ➔ Create Order ➔ View Inventory*).
- **Negative Security Verification (`tests/integration-negative.test.js`)**: Duplicate email handling (`409 Conflict`), forged JWT rejection (`401`), and privilege escalation blocks (`403 Forbidden`).

### Master QA Excel Spreadsheets
Standard formatted spreadsheets with **Summary**, **frontend**, and **backend** sheets are provided at:
- 📁 [`Efforts_Engineers_Master_Test_Suite.xlsx`](Efforts_Engineers_Master_Test_Suite.xlsx) *(Root)*
- 📁 [`docs/Efforts_Engineers_Master_Test_Suite.xlsx`](docs/Efforts_Engineers_Master_Test_Suite.xlsx) *(Docs)*
- 📄 [`docs/TEST_CASES.md`](docs/TEST_CASES.md) *(Markdown Spec)*

---

## 🧩 Architectural Overview

Refer to the diagrams in `docs/` for system topology:
- **Horizontal Flow:** `docs/architecture-horizontal.png`
- **Vertical Tier Flow:** `docs/architecture-vertical.png`

```text
[ Client Browser / Mobile ] 
          │ 
          ▼
[ Next.js 16 Frontend Web App (Port 3000) ]
  ├── Public Pages (Catalog, Quotation Builder, Heritage, Global Reach)
  ├── Client Portal (Orders, Printable Quotes with HSN & GST)
  └── Admin Dashboard (Inventory Management, Demand Forecasting)
          │ 
          ▼ (REST API / Bearer JWT)
[ Express 5 Backend API (Port 5000) ]
  ├── Auth & RBAC Middleware
  ├── Catalog & Order Processing
  └── Automated RFQ Dispatch
          │
          ▼
[ PostgreSQL Database (Port 5433 / 5432) ]
  ├── users, products, orders, quotations
```

---

## 🤝 Project Ownership & License

- **Organization:** Efforts Engineers
- **Location:** Pune, Maharashtra, India
- **Contact:** `info@effortsengineers.in` | `+91 98220 31096`
- **Proprietary Notice:** This project and its contents are proprietary to Efforts Engineers. Unauthorized distribution or copying is strictly prohibited.
