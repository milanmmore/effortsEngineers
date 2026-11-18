"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import API from "@/lib/axiosClient";

export default function Forecasting() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/dashboard/forecast")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load forecast data:", err);
        setError("Unable to load predictive analytics at this time.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AdminLayout>
      <div style={{ marginBottom: "25px" }}>
        <span className="eyebrow" style={{ color: "var(--primary)" }}>Predictive Analytics</span>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Compressor Spares Demand Forecast</h1>
        <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
          Live demand forecasting and replenishment insights calculated from historical orders, quotation requests, and inventory levels.
        </p>
      </div>

      {isLoading ? (
        <p role="status">Loading forecasting models and demand analytics…</p>
      ) : error ? (
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#991b1b", padding: "16px", borderRadius: "10px" }}>
          ⚠️ {error}
        </div>
      ) : (
        <div style={{ display: "grid", gap: "24px" }}>
          {/* Main Forecast Summary Card */}
          <section
            aria-labelledby="forecast-status-title"
            style={{
              background: "white",
              border: "1px solid var(--line)",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span className="eyebrow" style={{ color: "#16a34a" }}>Active Projection</span>
                <h2 id="forecast-status-title" style={{ margin: "4px 0 8px", fontSize: "1.3rem" }}>
                  Quarterly Demand Outlook
                </h2>
                <p style={{ color: "var(--navy)", fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>
                  {data?.forecast || "Projections updated from live orders."}
                </p>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "12px 18px", borderRadius: "8px", textAlign: "right" }}>
                <span style={{ fontSize: "0.8rem", color: "#166534", fontWeight: 700, textTransform: "uppercase" }}>Growth Velocity</span>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#15803d" }}>
                  +{data?.projectedGrowthPct || 15}%
                </div>
              </div>
            </div>
          </section>

          {/* Metric Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "18px" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>Total RFQs Processed</span>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginTop: "6px" }}>
                {data?.metrics?.totalQuotations ?? 0}
              </div>
            </div>

            <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "18px" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>Fulfilled Orders</span>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)", marginTop: "6px" }}>
                {data?.metrics?.totalOrders ?? 0}
              </div>
            </div>

            <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "18px" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>RFQ Conversion Rate</span>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#2563eb", marginTop: "6px" }}>
                {data?.metrics?.conversionRate ?? 0}%
              </div>
            </div>

            <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "10px", padding: "18px" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>Reorder Threshold Alerts</span>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: (data?.metrics?.lowStockItemsCount || 0) > 0 ? "#dc2626" : "#16a34a", marginTop: "6px" }}>
                {data?.metrics?.lowStockItemsCount ?? 0}
              </div>
            </div>
          </div>

          {/* Sourcing & Inventory Recommendations */}
          {Array.isArray(data?.recommendations) && data.recommendations.length > 0 && (
            <section
              style={{
                background: "white",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <h3 style={{ margin: "0 0 14px", fontSize: "1.1rem" }}>Procurement & Inventory Actions</h3>
              <ul style={{ margin: 0, paddingLeft: "20px", display: "grid", gap: "8px", color: "var(--text)" }}>
                {data.recommendations.map((rec, idx) => (
                  <li key={idx} style={{ fontSize: "0.92rem", lineHeight: 1.5 }}>
                    {rec}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
