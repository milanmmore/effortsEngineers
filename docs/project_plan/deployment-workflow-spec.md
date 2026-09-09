# 🚀 Deployment Workflow Spec

**File:** deployment-workflow.png  
**Purpose:** Show how the Efforts Engineers platform is deployed from GitHub to Render, managed PostgreSQL, and Vercel.

---

## 📋 Workflow Steps

1. **Source Control (GitHub)**
   - Codebase stored in GitHub repository.
   - Branching strategy: `main` for production, `dev` for testing.
   - GitHub Actions (optional) for CI/CD pipeline.

2. **Build & Test**
   - Run `npm run build` for frontend (React).
   - Run backend tests (Node.js + Express).
   - Ensure PostgreSQL migrations are applied locally.

3. **Deployment Targets**
   - Deploy the backend service to Render from the protected `main` branch.
   - Deploy the React production build to Vercel.
   - Set environment variables in each platform; never upload `.env` files.
   - Connect the backend to managed PostgreSQL over TLS.

4. **Domain & SSL**
   - Point application DNS records to Vercel and Render.
   - Enable HTTPS using the platform-managed certificates.
   - Verify secure connections for both frontend and backend.

5. **Monitoring**
   - Use Render and Vercel health/uptime monitoring.
   - Review platform logs and application error tracking.
   - Monitor the managed PostgreSQL service and test backup restores.

---

## 🎨 Design Notes
- **Theme:** Light background, clear arrows showing flow.
- **Icons:**
  - GitHub logo for source control.
  - React logo for frontend.
  - Node.js logo for backend.
  - PostgreSQL elephant for database.
   - Render, Vercel, and managed database service icons.
- **Layout:**
  - Left → GitHub
  - Middle → Build/Test
   - Right → Render + Vercel + managed PostgreSQL + SSL
  - Arrows showing progression.

---

## ✅ Deliverables
- Deployment workflow diagram (`deployment-workflow.png`).
- This spec file (`deployment-workflow-spec.md`).
- Updated references in `phase5.md` and `docs/README.md`.
