# 🧩 Phase 4 – Integration & Role Management

## 1. Authentication
- **JWT Authentication** → `auth.js` route for login/register.
- Store short-lived access tokens in an HttpOnly, Secure, SameSite cookie.
- Store refresh tokens server-side, rotate them on use, and revoke them on logout.
- Do not use `localStorage` for authentication tokens.

## 2. Role‑based Middleware
- Restrict `/api/admin/*` routes to users with `role = admin`.
- Middleware example:
  ```javascript
  function roleCheck(role) {
    return (req, res, next) => {
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  }
  ```

## 3. API Integration
- **Goal**: Connect React frontend pages to Express backend APIs in a clean, centralized way.

- **API helper** under `lib/axiosClient.js`:
  ```javascript
  import axios from 'axios';

  const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Example endpoints
  export const getCatalog = () => API.get("/api/catalog");
  export const createQuotation = (data) => API.post("/api/quotation", data);
  export const getOrders = () => API.get("/api/admin/orders");
  ```
- **Usage in React Components**:
    ```javascript
    import React, { useEffect, useState } from "react";
    import { getCatalog } from "../api/catalogApi";
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
- Install Chart.js + React wrapper:
    ```bash
    npm install chart.js react-chartjs-2
    ```
- Example: Sales Trends Line Chart
    ```javascript
    import React, { useEffect, useState } from "react";
    import { Line } from "react-chartjs-2";
    import { getForecast } from "../api/forecastingApi";

    function ForecastChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getForecast().then(res => setData(res.data));
    }, []);

    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
        {
            label: "Sales Forecast",
            data: data.map(item => item.value),
            borderColor: "rgba(75,192,192,1)",
            fill: false,
        },
        ],
    };

    return (
        <div>
        <h2>Sales Forecast</h2>
        <Line data={chartData} />
        </div>
    );
    }

    export default ForecastChart;
    ```
- Example: Inventory Levels Bar Chart
    ```javascript
    import React, { useEffect, useState } from "react";
    import { Bar } from "react-chartjs-2";
    import { getInventory } from "../api/inventoryApi";

    function InventoryChart() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getInventory().then(res => setItems(res.data));
    }, []);

    const chartData = {
        labels: items.map(item => item.name),
        datasets: [
        {
            label: "Stock Levels",
            data: items.map(item => item.stock),
            backgroundColor: "rgba(54,162,235,0.6)",
        },
        ],
    };

    return (
        <div>
        <h2>Inventory Levels</h2>
        <Bar data={chartData} />
        </div>
    );
    }

    export default InventoryChart;
    ```
## 5. Supporting API Helper (`lib/axiosClient.js`)
- Centralized Axios service for Admin Dashboard APIs:

    ```javascript
    import axios from "axios";

    const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    });

    export const getOrders = () => API.get("/api/admin/orders");
    export const getInventory = () => API.get("/api/admin/inventory");
    export const getForecast = () => API.get("/api/admin/dashboard/forecast");
    ```

## 6. Admin Dashboard (Combined Example)
This dashboard integrates **Orders, Inventory, and Forecasting** into one React page.

```javascript
// AdminDashboard.js
import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";
import { getInventory } from "../api/inventoryApi";
import { getForecast } from "../api/forecastingApi";
import { Bar, Line } from "react-chartjs-2";

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
    datasets: [{ label: "Orders Value", data: orders.map(o => o.total), backgroundColor: "rgba(255,99,132,0.6)" }],
  };

  const inventoryChart = {
    labels: inventory.map(i => i.name),
    datasets: [{ label: "Stock Levels", data: inventory.map(i => i.stock), backgroundColor: "rgba(54,162,235,0.6)" }],
  };

  const forecastChart = {
    labels: forecast.map(f => f.month),
    datasets: [{ label: "Sales Forecast", data: forecast.map(f => f.value), borderColor: "rgba(75,192,192,1)", fill: false }],
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
Refer to `docs/dashboard-admin.png` for a visual representation of how the charts appear together in the Admin Dashboard.

👉 For detailed design notes, see [Admin Dashboard Spec](../admin-dashboard-spec.md).  
👉 For all visuals and specs, visit the [Visuals Hub](../README.md).





