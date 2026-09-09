# Efforts Engineers Platform

## 📌 Overview
Efforts Engineers is a modernized web platform designed to serve both:
- **Clients** → Browse product catalog, request quotations, access client dashboard.
- **Admins** → Manage orders, inventory, and forecasting dashboards.

**Tech Stack:** Node.js + Express + PostgreSQL + Next.js

---

## 📘 Documentation Index

| Phase | Title | Description |
|-------|--------|-------------|
| [Phase 1](docs/project_plan/phase1.md) | Project Initialization | Folder structure, environment setup, and toolkit overview |
| [Phase 2](docs/project_plan/phase2.md) | Backend Setup | Node.js + Express + PostgreSQL configuration |
| [Phase 3](docs/project_plan/phase3.md) |  Frontend Setup | Next.js app creation, API integration, and testing |
| [Phase 4](docs/project_plan/phase4.md) | Integration & Role Management | JWT authentication, role‑based access, Next.js routing + Chart.js integration |
| [Phase 5](docs/project_plan/phase5.md) | Deployment | Backend, frontend, and database deployment strategy |
| [Phase 6](docs/project_plan/phase6.md) | Documentation & Team Visibility | API mapping, workflow, architecture diagram, and templates |

---

## 🧩 Architecture Overview

Refer to `docs/architecture-horizontal.png` and
`docs/architecture-vertical.png` for the system flow:

 **Client Portal (Next.js) → Node.js Backend ← Admin Dashboard (Next.js protected routes)**

---

## 📸 Visuals & Specs
For detailed design references, see the dedicated visuals index:  
👉 [Visuals & Specs](docs/README.md)

---

## 🧠 Toolkit Summary
- **GitHub Copilot + Copilot Chat** → daily coding assistance  
- **Claude Dev** → reasoning‑heavy QA test generation  
- **Gemini Pro** → backend and frontend QA automation workflows  
- **Codex API** → experimental automation agents  

📂 Project Scaffolding
Project scaffolding is automated via `scripts/generateStructure.js` located in the root folder.  
Run with:
```bash
    node scripts/generateStructure.js
```
Existing files are preserved. Use `--force` only when intentionally replacing
the scaffolded files.

---

## ✅ Summary
This documentation ensures:
- Automated backend structure creation  
- Clean PostgreSQL schema  
- Unified Next.js frontend (public + admin with role‑based access)
- Secure role‑based APIs  
- Clear diagrams and templates for team visibility  

---

## 🤝 Contributing
Currently this repository is **private** for internal development.  
Future QA automation contributions will be managed in a dedicated public repo with guidelines.  

---

## 📌 License
This project is proprietary to Efforts Engineers.  
Usage is restricted to authorized collaborators only.
