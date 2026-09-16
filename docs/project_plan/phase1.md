# 🧩 Phase 1 – Pre‑Requisites & Installation

## 1. System Requirements
- OS: Windows 10/11 (64‑bit)
- RAM: Minimum 8 GB (recommended 16 GB)
- Disk Space: At least 10 GB free
- Internet: Stable connection for package downloads

---

## 2. Install Core Tools

### 🟢 Node.js & npm
- Download Node.js v18 or newer.
- Run the installer and select **Add to PATH**.
- Verify installation:
  ```bash
  node -v
  npm -v
  ```

### 🟢 PostgreSQL + pgAdmin
- Download PostgreSQL.
- Install with default settings.
- Set a superuser password and keep it recorded.
- Verify:
  ```bash
  psql --version
  ```

### 🟢 Git
- Download Git.
- Install with default options.
- Verify:
  ```bash
  git --version
  ```

### 🟢 VS Code
- Download VS Code.
- Install extensions:
  - ES7+ React/Redux snippets
  - Prettier – Code formatter
  - PostgreSQL tooling
  - AI extensions:
    - GitHub Copilot + Copilot Chat
    - Claude Dev
    - Codex via API
    - Gemini Pro (see [Gemini Pro Guide](../templates/GEMINI_SETUP.md))

---

## 3. Toolkit Recommendation
- **Primary:** GitHub Copilot + Copilot Chat → best integration for daily coding
- **Secondary:** Claude Dev → reasoning-heavy QA and test generation
- **Tertiary:** Gemini Pro → QA automation workflows (see [Gemini Pro Guide](../templates/GEMINI_SETUP.md))
- **Optional:** Codex API → portfolio projects and custom AI agent workflows

