# 🧩 Phase 4 – Integration & Role Management

## 1. Authentication
- The backend currently uses JWT bearer tokens for auth, exposed through the auth routes.
- Cookie-based auth can be added later as a security hardening step, but the current implementation does not require it.
- Keep access tokens out of `localStorage` and prefer server-side validation with signed JWTs.

## 2. Role‑based Middleware
- Restrict `/api/admin/*` routes to users with `role = admin`.
- Middleware example:
  ```javascript
  function requireRole(role) {
    return (req, res, next) => {
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  }
  ```

## 3. API Integration
- **Goal**: Connect the Next.js frontend to the Express backend in a consistent, centralized way.
- **API helper** under `lib/axiosClient.js`:
  ```javascript
  import axios from 'axios';

  const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const getCatalog = () => API.get('/api/catalog');
  export const createQuotation = (data) => API.post('/api/quotation', data);
  export const getOrders = () => API.get('/api/admin/orders');
  ```
- **Usage in a frontend component**:
  ```javascript
  import { useEffect, useState } from 'react';
  import { getCatalog } from '../lib/axiosClient';

  function CatalogPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
      getCatalog().then(res => setItems(res.data));
    }, []);

    return (
      <div>
        <h2>Product Catalog</h2>
        <ul>
          {items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>
    );
  }

  export default CatalogPage;
  ```

## 4. Data Visualization
**Goal**: Use Chart.js to display KPIs like sales trends, inventory levels, and quotation status.

- Install Chart.js and, if desired, a React wrapper:
  ```bash
  npm install chart.js react-chartjs-2
  ```
- If the React wrapper is not added immediately, use Chart.js directly in a component and keep the integration lightweight.

## 5. Supporting API Helper (`lib/axiosClient.js`)
- Centralized Axios service for admin dashboard APIs:
  ```javascript
  import axios from 'axios';

  const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  export const getOrders = () => API.get('/api/admin/orders');
  export const getInventory = () => API.get('/api/admin/inventory');
  export const getForecast = () => API.get('/api/admin/dashboard/forecast');
  ```

## 6. Admin Dashboard (Combined Example)
This dashboard integrates **Orders, Inventory, and Forecasting** into one page.

```javascript
import { useEffect, useState } from 'react';
import { getOrders } from '../lib/axiosClient';
import { getInventory } from '../lib/axiosClient';
import { getForecast } from '../lib/axiosClient';
import { Bar, Line } from 'react-chartjs-2';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getOrders().then(res => setOrders(res.data));
    getInventory().then(res => setInventory(res.data));
    getForecast().then(res => setForecast(res.data));
  }, []);

  const ordersChart = {
    labels: orders.map(o => o.id),
    datasets: [{
      label: 'Orders Value',
      data: orders.map(o => o.total),
      backgroundColor: 'rgba(255,99,132,0.6)',
    }],
  };

  const inventoryChart = {
    labels: inventory.map(i => i.name),
    datasets: [{
      label: 'Stock Levels',
      data: inventory.map(i => i.stock),
      backgroundColor: 'rgba(54,162,235,0.6)',
    }],
  };

  const forecastChart = {
    labels: forecast.map(f => f.month),
    datasets: [{
      label: 'Sales Forecast',
      data: forecast.map(f => f.value),
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    }],
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>📦 Orders Overview</h2>
        <Bar data={ordersChart} />
      </section>
      <section>
        <h2>📊 Inventory Levels</h2>
        <Bar data={inventoryChart} />
      </section>
      <section>
        <h2>📈 Sales Forecast</h2>
        <Line data={forecastChart} />
      </section>
    </div>
  );
}

export default AdminDashboard;
```

### 📸 Dashboard Screenshot
Refer to `docs/dashboard-admin.png` for a visual representation of how the charts appear together in the admin dashboard.

👉 For detailed design notes, see [Admin Dashboard Spec](../admin-dashboard-spec.md).  
👉 For all visuals and specs, visit the [Visuals Hub](../README.md).





