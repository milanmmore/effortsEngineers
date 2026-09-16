"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import API from "@/lib/axiosClient";

const DEFAULT_ORDERS = [
  { id: 301, order_ref: "EE-ORD-9921", client: "Konkan Cold Storage Ltd", items: "Grasso RC11 Liners (4x), Rings (4x)", amount: 42800, status: "Dispatched", courier: "Blue Dart Air", awb: "BLUEDART-8829104" },
  { id: 298, order_ref: "EE-ORD-9844", client: "Marine Reefer Services", items: "Carrier 5H Rods (2x), Valve Discs (4x)", amount: 20600, status: "Delivered", courier: "DHL Priority", awb: "DHL-44029104" },
  { id: 295, order_ref: "EE-ORD-9710", client: "Mahalaxmi Dairy Products", items: "Kirloskar KC6 Rods (2x), Bushes (2x)", amount: 64200, status: "Delivered", courier: "Blue Dart Air", awb: "BLUEDART-7718902" },
  { id: 292, order_ref: "EE-ORD-9650", client: "Saurashtra Chemical Plants", items: "Sabroe Valve Assembly (2x)", amount: 18400, status: "Processing", courier: "DTDC Express", awb: "PENDING" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(DEFAULT_ORDERS);

  useEffect(() => {
    API.get("/orders")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((ord, idx) => ({
            ...DEFAULT_ORDERS[idx % DEFAULT_ORDERS.length],
            id: ord.id,
            order_ref: `EE-ORD-${ord.id}`,
            status: ord.status || DEFAULT_ORDERS[idx % DEFAULT_ORDERS.length].status,
          }));
          setOrders(merged);
        }
      })
      .catch(() => {});
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    try {
      await API.put(`/orders/${id}`, { status: newStatus });
    } catch (e) {}
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Consignment Logistics</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Order Fulfillment & Dispatches</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Track orders through warehouse packing, air cargo dispatch, and customer site delivery.
          </p>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "20px", overflowX: "auto" }}>
        <table className="quote-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>Order Ref</th>
              <th>Client / Destination</th>
              <th>Spares Dispatched</th>
              <th>Total (₹)</th>
              <th>Courier & AWB</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.id}>
                <td><strong>{ord.order_ref}</strong></td>
                <td><strong>{ord.client}</strong></td>
                <td style={{ fontSize: "0.85rem", color: "var(--navy)" }}>{ord.items}</td>
                <td><strong>₹{ord.amount.toLocaleString()}</strong></td>
                <td>
                  <div style={{ fontSize: "0.85rem" }}>{ord.courier}</div>
                  <code style={{ fontSize: "0.75rem", color: "var(--primary)" }}>{ord.awb}</code>
                </td>
                <td>
                  <span className={`badge ${ord.status === "Delivered" ? "badge-in-stock" : (ord.status === "Dispatched" ? "badge-order" : "badge-low-stock")}`}>
                    ● {ord.status}
                  </span>
                </td>
                <td>
                  <select
                    value={ord.status}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                    style={{ padding: "6px 10px", border: "1px solid var(--line)", borderRadius: "4px", fontSize: "0.82rem", background: "white" }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Packed (VCI Ready)">Packed (VCI Ready)</option>
                    <option value="Dispatched">Dispatched (Air)</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
