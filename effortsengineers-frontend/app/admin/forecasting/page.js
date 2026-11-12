"use client";
import React from "react";
import AdminLayout from "@/components/AdminLayout";

export default function Forecasting() {
  return (
    <AdminLayout>
      <div style={{ marginBottom: "25px" }}>
        <span className="eyebrow" style={{ color: "var(--primary)" }}>Predictive Analytics</span>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Compressor Spares Demand Forecast</h1>
        <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
          Forecast calculations are not connected to live demand or inventory data yet.
        </p>
      </div>

      <section aria-labelledby="forecast-status-title" style={{ background: "white", border: "1px solid var(--line)", borderRadius: "12px", padding: "24px" }}>
        <h2 id="forecast-status-title">Forecast status</h2>
        <p role="status" style={{ marginBottom: 0, color: "var(--text-muted)" }}>
          No demand projections are currently available. Connect and validate a demand data source before using this page for reorder decisions.
        </p>
      </section>
    </AdminLayout>
  );
}
