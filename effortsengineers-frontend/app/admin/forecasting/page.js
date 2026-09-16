"use client";
import React from "react";
import AdminLayout from "@/components/AdminLayout";

export default function Forecasting() {
  const forecasts = [
    { period: "Q2 2026 (Summer Harvest & Freezing)", demand: "+35% Surge", driver: "Mango & Agro Cold Storage seasonal overhaul", topParts: "Grasso RC11/12 Liners, Bitzer Ring Sets" },
    { period: "Q3 2026 (Monsoon Marine Overhaul)", demand: "+22% Steady", driver: "West Coast fishing trawler and coastal vessel drydocking", topParts: "Carrier 5H Rods, Sabroe Valve Assemblies" },
    { period: "Q4 2026 (Dairy & Beverage Peak)", demand: "+18% Increase", driver: "Milk chilling plants & brewery plant preventative shutdown", topParts: "Kirloskar KC Main Bushes, Gasket Kits" },
    { period: "Q1 2027 (Industrial Process Expansion)", demand: "+25% Growth", driver: "Export orders to Middle East petrochemical refineries", topParts: "Specialized Alloy Liners, Shaft Seals" },
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: "25px" }}>
        <span className="eyebrow" style={{ color: "var(--primary)" }}>Predictive Analytics</span>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Compressor Spares Demand Forecast</h1>
        <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
          Predictive reorder recommendations based on historical 30-year seasonal overhaul cycles and live RFQ inquiries.
        </p>
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {forecasts.map((f, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              border: "1px solid var(--line)",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "var(--shadow-sm)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div>
              <span className="badge badge-primary" style={{ marginBottom: "8px" }}>Forecast Window</span>
              <h3 style={{ margin: "4px 0 6px", fontSize: "1.2rem" }}>{f.period}</h3>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>
                Key Seasonal Driver: {f.driver}
              </p>
            </div>

            <div style={{ background: "var(--bg-page)", padding: "16px", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Projected Demand:</span>
                <strong style={{ fontSize: "1rem", color: "var(--accent-green)" }}>{f.demand}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Critical Reorder SKUs:</span>
                <strong style={{ fontSize: "0.85rem", color: "var(--navy)" }}>{f.topParts}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
