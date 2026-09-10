# 🧩 Architecture Diagram Spec

**Files:** docs/architecture-horizontal.png, docs/architecture-vertical.png  
**Format:** PNG, 1920×1080 (horizontal and vertical versions)  
**Style:** Clean system flow diagram, light theme (Next.js frontend)

---

## Components
- **Client Portal (Next.js):** Browse Catalog, Request Quotations
- **Admin Dashboard (Next.js protected routes):** Manage Orders, Inventory, Forecasting
- **Node.js Backend:** APIs & Logic
- **PostgreSQL Database:** Data Storage

---

## Connections
- Client Portal (Next.js) → Backend → Database
- Admin Dashboard (Next.js protected routes) → Backend → Database
- Arrows labeled: HTTP / REST API, APIs & Logic, SQL Queries, Data Sync
- Colors: Blue for PostgreSQL, Green for Node.js, Gray for client/admin
- Font: Roboto / Open Sans

---

## Layout
- **Horizontal version:** Left‑to‑right flow (Client Portal → Backend → Database)
- **Vertical version:** Top‑to‑bottom flow for compact documentation

---

## Theme Notes
- Light background with consistent icon sizing
- Clear arrows showing progression
- Icons: Laptop/User (Client), Charts (Admin), Node.js logo, PostgreSQL elephant

---

## ✅ Deliverables
- Architecture diagrams (`architecture-horizontal.png`, `architecture-vertical.png`)
- This spec file (`architecture-spec.md`)
- References updated in `phase6.md` and `docs/README.md`
