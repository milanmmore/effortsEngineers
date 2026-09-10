# 🧩 Phase 3 – Frontend Setup

## 1. Project Structure
- Use the existing Next.js App Router project in `effortsengineers-frontend`:
  - `app/` → route segments and `page.js` files
  - `app/layout.js` → required root layout and metadata
  - `components/` → reusable UI components
  - `lib/` → API and authentication helpers
  - `public/` → static assets
  - `package.json` → project metadata

---

## 2. Environment Configuration
- Create `.env` file in root of frontend:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```
* Add .env to .gitignore to avoid exposing secrets.

## 3. Install Dependencies
- Run inside effortsengineers-frontend:
  ```bash
    npm ci
  ```
## 4. Basic React Setup
- Update `app/page.js`:
    ```javascript
    export default function HomePage() {
      return <main><h1>Efforts Engineers</h1></main>;
    }
  ```
- Add pages under the matching App Router directory, for example `app/client/catalog/page.js` or `app/admin/orders/page.js`.
- Run frontend:
  ```Bash
  npm start
  ```                                     
## 5. API Integration
- Use helpers under `lib/` for API calls:
    ```javascript
    import axios from 'axios';
    const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    export default API;
    ```
- Example usage in a component should import the matching helper, for example `lib/axiosClient.js`:
    ```javascript
    import React, { useEffect, useState } from 'react';
    import { getCatalog } from '../lib/axiosClient';

    function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getCatalog().then(res => setProducts(res.data));
    }, []);

    return (
        <div>
        <h2>Product Catalog</h2>
        <ul>
            {products.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
        </div>
    );
    }

    export default Products;
    ```

## 6. Testing Setup
- Add tests alongside route or component code using the configured test runner.
    ```javascript
    import { render, screen } from '@testing-library/react';
    test('renders the home page', () => {
      expect(true).toBe(true);
    });
    ```
- Run tests:
    ```bash
    npm test
    ```

## 7. Toolkit Recommendation (Frontend Focus)

- **Primary**: GitHub Copilot + Copilot Chat → daily coding assistance
- **Secondary**: Claude Dev → reasoning‑heavy QA test generation for UI workflows
- **Tertiary**: Gemini Pro → frontend QA automation workflows (see [Gemini Pro Guide](../templates/GEMINI_SETUP.md))
- **Optional**: Codex API → experimental UI agents