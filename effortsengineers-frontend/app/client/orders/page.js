"use client";

import React, { useEffect, useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import Link from "next/link";
import API from "@/lib/axiosClient";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

export default function ClientOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    API.get("/client/dashboard")
      .then(({ data }) => {
        setOrders(Array.isArray(data?.orders) ? data.orders : []);
      })
      .catch((error) => {
        console.error("Failed to load customer orders:", error);
        setLoadError("Unable to load your orders. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ClientLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Customer Account</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Orders</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Orders shown here are those linked to your account. Dispatch and tracking details are displayed only when provided.
          </p>
        </div>
        <Link href="/client/quotation" className="btn btn-outline">
          View Quotations
        </Link>
      </div>

      {loadError && <p role="alert" className="form-error">{loadError}</p>}
      {isLoading ? (
        <p role="status">Loading your orders…</p>
      ) : loadError ? null : orders.length === 0 ? (
        <div className="why-card" style={{ padding: "24px" }}>
          <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>No orders linked to this account</h2>
          <p style={{ color: "var(--text-muted)" }}>If you expected to see an order here, contact our team with your order reference.</p>
          <Link href="/contact" className="btn btn-primary">Contact our team</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {orders.map((order) => (
            <article key={order.id} className="why-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Order record #{order.id}</h2>
                <span className="badge badge-order">{order.status || "Status not provided"}</span>
              </div>
              <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", margin: "18px 0 0" }}>
                <div>
                  <dt style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Related quotation</dt>
                  <dd style={{ margin: "4px 0 0" }}>{order.quotation_id ? `Quotation record #${order.quotation_id}` : "Not linked"}</dd>
                </div>
                <div>
                  <dt style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Order date</dt>
                  <dd style={{ margin: "4px 0 0" }}>{formatDate(order.created_at)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </ClientLayout>
  );
}
