# 🧱 Phase 6 – System Architecture

This phase defines the overall architecture of the Efforts Engineers platform, showing how the client portal, admin dashboard, backend services, and database interact.

---

## 🏗️ Architecture Overview

The system follows a **modular, service-oriented architecture** built with:
- **Frontend:** React-based client portal and admin dashboard.
- **Backend:** Node.js + Express REST API.
- **Database:** PostgreSQL for structured data storage.
- **Hosting:** Render backend, managed PostgreSQL, and Vercel frontend (production); local environment (development).

---

## 🔄 Data Flow

1. **Client Portal**
   - Users browse product catalog and request quotations.
   - Communicates with backend via REST API.

2. **Admin Dashboard**
   - Admins manage orders, inventory, and forecasts.
   - Connects to backend for CRUD operations.

3. **Node.js Backend**
   - Handles authentication, business logic, and API routing.
   - Interfaces with PostgreSQL using the `pg` library, matching the installed backend dependency plan.

4. **PostgreSQL Database**
    - The checked-in schema defines catalog, client, quotation, order, inventory,
       dashboard, and user tables.
    - The corresponding business routes and database access layer are still implementation tasks.

---

## 📸 Visual References

- **Architecture Diagrams**
   - Horizontal Layout: [architecture-horizontal.png](../architecture-horizontal.png)
   - Vertical Layout: [architecture-vertical.png](../architecture-vertical.png)
   - Spec File: [architecture-spec.md](../architecture-spec.md)

---

## 🔐 Security & Scalability

- HTTPS enforced via SSL certificate.
- Role-based access control (Admin vs Client).
- Scalable backend with modular routes and middleware.
- Database indexing for faster queries.

---

## 🧩 Integration Points

- **Frontend ↔ Backend:** REST API endpoints.
- **Backend ↔ Database:** Direct SQL through the `pg` library.
- **Deployment:** GitHub → Render/Vercel with managed PostgreSQL (see Phase 5).

---

## ✅ Deliverables

- Architecture diagrams (horizontal + vertical).
- Architecture spec file (`architecture-spec.md`).
- Updated documentation references in `docs/README.md`.

## Current implementation boundary

The checked-in backend currently provides only `/` and `/health`. The catalog,
quotation, order, inventory, forecasting, and authentication APIs are planned
contracts, not available endpoints. Implement each route and its tests before
advertising it as deployed functionality.

---

_Last updated: September 2026_
