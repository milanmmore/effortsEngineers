# Railway Deployment Workflow

**File:** deployment-workflow.png  
**Purpose:** Describe how GitHub Actions deploys the frontend and backend services to Railway.

---

## 📋 Workflow Steps

1. **Source Control (GitHub)**
   - Codebase stored in GitHub repository.
   - A push to `main` or a manual workflow dispatch starts `.github/workflows/deploy.yml`.

2. **GitHub Actions Configuration**
   - Configure the `RAILWAY_TOKEN` repository secret.
   - Configure `RAILWAY_PROJECT_ID`, `RAILWAY_ENVIRONMENT_ID`, `RAILWAY_FRONTEND_SERVICE_ID`, and `RAILWAY_BACKEND_SERVICE_ID` repository variables.
   - The workflow deploys the backend first and the frontend second using Railway CLI.

3. **Railway Services & Configuration**
   - Create separate Railway services for `effortsengineers-backend` and `effortsengineers-frontend`.
   - Deploy each service from its corresponding repository directory.
   - The backend starts with `npm start` (`node server.js`); the frontend starts with `npm start` (`next start`).
   - Set service-specific runtime variables in Railway; never upload `.env` files.
   - Configure `DATABASE_URL` on the backend service pointing to the managed Railway PostgreSQL instance.
   - Configure `FRONTEND_URL` on the backend service (e.g. `https://effortsengineers.com` or Railway frontend domain) for CORS and write origin authorization.
   - Configure `FORMSUBMIT_TOKEN` on the backend service so that enquiries, warranty claims, and password reset notification emails are delivered.
   - **Database Schema & Migrations**:
     - The backend automatically verifies and provisions essential tables (such as `password_reset_tokens`) on server boot.
     - For full database schema updates, run `npm run db:migrate` (runs `scripts/migrate.js` applying `scripts/schema_new.sql` against `DATABASE_URL`).
   - **Persistent Storage for Uploaded Images (`/uploads/images`)**:
     - Railway container filesystems are ephemeral. Product photos, inquiries, and warranty claim attachments must persist across redeployments.
     - **Option A (Railway Volume - Recommended)**: In Railway backend service settings, attach a persistent volume mounted at `/data`. The backend automatically detects `/data` or `RAILWAY_VOLUME_MOUNT_PATH` and stores images under `/data/images`. Alternatively, set `IMAGE_UPLOAD_DIR=/data/images`.
     - **Option B (AWS S3 / S3-compatible Object Storage)**: Configure `S3_BUCKET`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` in Railway service variables. Uploads will automatically persist to S3 and stream to users even without a local volume.

4. **Domain & SSL**
   - Attach the appropriate frontend and backend domains to the Railway services.
   - Configure DNS and verify Railway-managed HTTPS for each domain.
   - Confirm the frontend can reach the backend through its configured API URL.

5. **Monitoring**
   - Use Railway deployment logs and health checks.
   - Review platform logs and application error tracking.
   - Monitor the Railway PostgreSQL service and test backup restores.

The workflow deploys code but does not apply database migrations or verify live email delivery, DNS, search indexing, or customer data. Run tests before deployment and validate those external services separately.

---

## 🎨 Design Notes
- **Theme:** Light background, clear arrows showing flow.
- **Icons:**
  - GitHub logo for source control.
  - Next.js logo for frontend.
  - Node.js logo for backend.
  - PostgreSQL elephant for database.
  - Railway service and managed database icons.
- **Layout:**
  - Left → GitHub
  - Middle → GitHub Actions / Railway CLI
  - Right → Railway frontend + backend + PostgreSQL + SSL
  - Arrows showing progression.

---

## ✅ Deliverables
- Deployment workflow diagram (`deployment-workflow.png`).
- This spec file (`deployment-workflow-spec.md`).
- Updated references in `phase5.md` and `docs/README.md`.
