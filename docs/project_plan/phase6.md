# 🧱 Phase 6 – System Architecture

This phase defines the overall architecture of the Efforts Engineers platform, showing how the client portal, admin dashboard, backend services, and database interact.

---

## 🏗️ Architecture Overview

The system follows a modular service-oriented architecture built with:
- **Frontend:** Next.js + React client portal and admin dashboard
- **Backend:** Node.js + Express REST API
- **Database:** PostgreSQL for structured data storage
- **Hosting:** Render backend, managed PostgreSQL, and Vercel frontend for production; local environment for development

---

## 🔄 Data Flow

1. **Client Portal**
   - Users browse the product catalog and request quotations.
   - Communicates with the backend through REST API requests.

2. **Admin Dashboard**
   - Admins manage orders, inventory, and forecast data.
   - Connects to the backend for CRUD and reporting operations.

3. **Node.js Backend**
   - Handles authentication, business logic, and API routing.
   - Interfaces with PostgreSQL through the `pg` library.

4. **PostgreSQL Database**
   - The checked-in schema defines catalog, client, quotation, order, inventory, dashboard, and user tables.
   - The current implementation includes working API routes and DB access patterns aligned to these domains.

---

## 📸 Visual References

- **Architecture Diagrams**
  - Horizontal Layout: [architecture-horizontal.png](../architecture-horizontal.png)
  - Vertical Layout: [architecture-vertical.png](../architecture-vertical.png)
  - Spec File: [architecture-spec.md](../architecture-spec.md)

---

## 🔐 Security & Scalability

- HTTPS enforced via SSL certificates in production.
- Role-based access control (Admin vs Client).
- Scalable backend with modular routes and middleware.
- Database indexing and schema design for faster queries.

---

## 🧩 Integration Points

- **Frontend ↔ Backend:** REST API endpoints
- **Backend ↔ Database:** Direct SQL through the `pg` library
- **Deployment:** GitHub → Render/Vercel with managed PostgreSQL (see Phase 5)

---

## ✅ Deliverables

- Architecture diagrams (horizontal + vertical)
- Architecture spec file (`architecture-spec.md`)
- Updated documentation references in `docs/README.md`

## Current implementation status

The project currently exposes `/api/health` and route groups for auth, catalog, quotation, orders, inventory, and admin operations. The route contracts and DB layer are active implementation points, not just future placeholders.

---

_Last updated: September 2026_
