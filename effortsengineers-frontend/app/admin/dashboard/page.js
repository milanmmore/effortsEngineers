"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import API from "@/lib/axiosClient";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    monthlySales: 4850000,
    pendingQuotes: 6,
    activeOrders: 14,
    lowStockAlerts: 3,
    inventoryValue: 18200000,
  });

  const [recentQuotes, setRecentQuotes] = useState([
    { id: "EE-QT-8912", client: "Konkan Cold Storage", brand: "Grasso RC11", items: "Liners (4x), Rings (4x)", amount: 42800, status: "pending" },
    { id: "EE-QT-8913", client: "Apex Agro Foods", brand: "Bitzer 4N", items: "Valve Reed Plates (6x)", amount: 14400, status: "pending" },
    { id: "EE-QT-8914", client: "Oceanic Marine Fleet", brand: "Carrier 5H", items: "Connecting Rods (2x)", amount: 17000, status: "pending" },
  ]);

  const [criticalStock, setCriticalStock] = useState([
    { sku: "BIT-4G-550", name: "Bitzer 4G Piston Assembly", qty: 2, min: 5, brand: "Bitzer" },
    { sku: "CAR-5H-772", name: "Carrier 5H Valve Discs", qty: 3, min: 8, brand: "Carrier" },
    { sku: "SAB-SMC-SL22", name: "Sabroe Shaft Seal Assembly", qty: 1, min: 4, brand: "Sabroe" },
  ]);

  useEffect(() => {
    Promise.all([
      API.get("/dashboard/orders").catch(() => null),
      API.get("/dashboard/inventory").catch(() => null),
      API.get("/dashboard/forecast").catch(() => null),
    ]).then(([ordersRes, invRes]) => {
      if (ordersRes?.data) {
        setMetrics((prev) => ({
          ...prev,
          activeOrders: ordersRes.data.totalOrders || prev.activeOrders,
          pendingQuotes: ordersRes.data.pendingOrders || prev.pendingQuotes,
        }));
      }
      if (invRes?.data) {
        setMetrics((prev) => ({
          ...prev,
          lowStockAlerts: invRes.data.itemsLowStock || prev.lowStockAlerts,
        }));
      }
    });
  }, []);

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Executive Control Center</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Operations & Metrics Dashboard</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Real-time warehouse stock indicators, quotation approval pipeline, and dispatch fulfillment status.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/inventory" className="btn btn-primary">
            📦 Manage Inventory
          </Link>
          <Link href="/admin/quotations" className="btn btn-amber">
            📋 Review Pending Quotes ({metrics.pendingQuotes})
          </Link>
        </div>
      </div>

      {/* 4 Executive Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px", marginBottom: "35px" }}>
        <div style={{ background: "white", padding: "22px", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "4px solid var(--primary)" }}>
          <span style={{ fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-dim)" }}>
            Monthly Quote Pipeline
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--navy)", marginTop: "6px" }}>
            ₹{metrics.monthlySales.toLocaleString()}
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--accent-green)", fontWeight: 600 }}>↑ 18% vs last month</span>
        </div>

        <div style={{ background: "white", padding: "22px", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "4px solid var(--amber)" }}>
          <span style={{ fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-dim)" }}>
            Pending Quotation Reviews
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--amber-hover)", marginTop: "6px" }}>
            {metrics.pendingQuotes}
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Awaiting technical pricing</span>
        </div>

        <div style={{ background: "white", padding: "22px", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "4px solid var(--accent-green)" }}>
          <span style={{ fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-dim)" }}>
            Active Dispatches / Orders
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--navy)", marginTop: "6px" }}>
            {metrics.activeOrders}
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600 }}>4 Express Air, 10 Ground</span>
        </div>

        <div style={{ background: "white", padding: "22px", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "4px solid var(--accent-red)" }}>
          <span style={{ fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-dim)" }}>
            Low-Stock Reorder Alerts
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--accent-red)", marginTop: "6px" }}>
            {metrics.lowStockAlerts}
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--accent-red)", fontWeight: 600 }}>Below safety stock buffer</span>
        </div>
      </div>

      {/* Critical Stock Alert Banner */}
      <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: "12px", padding: "20px 24px", marginBottom: "35px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
        <div>
          <strong style={{ color: "#9f1239", fontSize: "1rem" }}>⚠️ Warehouse Stock Alert: {criticalStock.length} SKUs Below Reorder Point</strong>
          <p style={{ margin: "2px 0 0", color: "#be123c", fontSize: "0.85rem" }}>
            {criticalStock.map((s) => `${s.name} (${s.qty} left)`).join(" • ")}
          </p>
        </div>
        <Link href="/admin/inventory" className="btn btn-primary" style={{ background: "#e11d48", borderColor: "#be123c", fontSize: "0.82rem", padding: "8px 16px" }}>
          Reorder CNC Batch →
        </Link>
      </div>

      {/* Two Column Layout: Pending Quotes for Approval & Recent Dispatches */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "25px" }}>
        {/* Pending Quotations for Approval */}
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Incoming Quotes Awaiting Approval</h3>
            <Link href="/admin/quotations" style={{ color: "var(--primary)", fontSize: "0.82rem", fontWeight: 700 }}>
              Review All ({recentQuotes.length}) →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentQuotes.map((q) => (
              <div key={q.id} style={{ border: "1px solid var(--line)", borderRadius: "8px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-page)" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700 }}>{q.id} • {q.brand}</span>
                  <h4 style={{ margin: "2px 0 4px", fontSize: "0.95rem" }}>{q.client}</h4>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>{q.items}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--navy)" }}>₹{q.amount.toLocaleString()}</div>
                  <Link href="/admin/quotations" className="btn btn-primary" style={{ padding: "4px 10px", fontSize: "0.75rem", marginTop: "4px" }}>
                    Approve / Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Warehouse Metrics & Brand Popularity */}
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "24px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "1.2rem" }}>Spares Demand by Compressor Make</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>Grasso (RC11, RC12)</span>
                <strong>38% (High Demand)</strong>
              </div>
              <div style={{ height: "8px", background: "var(--line)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "38%", height: "100%", background: "var(--primary)" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>Bitzer (4N, 4P, 6F)</span>
                <strong>26%</strong>
              </div>
              <div style={{ height: "8px", background: "var(--line)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "26%", height: "100%", background: "#38bdf8" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>Kirloskar (KC, KCX)</span>
                <strong>20%</strong>
              </div>
              <div style={{ height: "8px", background: "var(--line)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "20%", height: "100%", background: "var(--amber)" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>Carrier & Sabroe</span>
                <strong>16%</strong>
              </div>
              <div style={{ height: "8px", background: "var(--line)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "16%", height: "100%", background: "var(--accent-green)" }} />
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "18px", marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Total Valuation in Warehouse:</span>
              <strong style={{ color: "var(--navy)" }}>₹{metrics.inventoryValue.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
