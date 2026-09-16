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
- Create a `.env` file in the frontend root:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```
- Add `.env` to `.gitignore` to avoid exposing secrets.

## 3. Install Dependencies
Run inside `effortsengineers-frontend`:
```bash
npm install
```

## 4. Basic Next.js Setup
- Update `app/page.js`:
  ```javascript
  export default function HomePage() {
    return <main><h1>Efforts Engineers</h1></main>;
  }
  ```
- Add pages under the matching App Router directory, for example `app/client/catalog/page.js` or `app/admin/orders/page.js`.
- Run the frontend locally:
  ```bash
  npm run dev
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
- Example usage in a component:
  ```javascript
  import { useEffect, useState } from 'react';
  import API from '../lib/axiosClient';

  function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      API.get('/api/catalog').then(res => setProducts(res.data));
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
- The current frontend project does not include a default test runner yet. When tests are added, keep them alongside the component or route they cover.
- Example using React Testing Library when configured:
  ```javascript
  import { render, screen } from '@testing-library/react';

  test('renders the home page', () => {
    expect(true).toBe(true);
  });
  ```

## 7. Toolkit Recommendation (Frontend Focus)
- **Primary**: GitHub Copilot + Copilot Chat → daily coding assistance
- **Secondary**: Claude Dev → reasoning-heavy QA test generation for UI workflows
- **Tertiary**: Gemini Pro → frontend QA automation workflows (see [Gemini Pro Guide](../templates/GEMINI_SETUP.md))
- **Optional**: Codex API → experimental UI agents