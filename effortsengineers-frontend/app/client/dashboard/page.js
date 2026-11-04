"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ClientLayout from "@/components/ClientLayout";
import { AuthContext } from "@/context/AuthContext";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";

export default function ClientDashboard() {
  const { user } = useContext(AuthContext);
  const { setIsDrawerOpen } = useContext(QuoteContext);
  const [orders, setOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    API.get("/client/dashboard")
      .then((res) => {
        setOrders(Array.isArray(res.data?.orders) ? res.data.orders : []);
        setQuotations(Array.isArray(res.data?.quotations) ? res.data.quotations : []);
      })
      .catch((error) => {
        console.error("Failed to load customer dashboard:", error);
        setLoadError("Unable to load account information. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  return (
    <ClientLayout>
      <div style={{ marginBottom: "25px" }}>
        <span className="eyebrow" style={{ color: "var(--primary)" }}>Industrial Customer Portal</span>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
          Welcome back, {user?.name || "Plant Engineer"}
        </h1>
        <p style={{ color: "var(--text-muted)", margin: 0 }}>
          Review quotation and order records linked to your account, or submit a warranty claim.
        </p>
      </div>

      {/* KPI Overview Grid */}
      {loadError && <p role="alert" className="form-error">{loadError}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "18px", marginBottom: "35px" }}>
        <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontWeight: 700, textTransform: "uppercase" }}>Quotation Records</span>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--navy)", marginTop: "6px" }}>
            {isLoading ? "…" : quotations.length}
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>From your account</span>
        </div>

        <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontWeight: 700, textTransform: "uppercase" }}>Order Records</span>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--navy)", marginTop: "6px" }}>
            {isLoading ? "…" : orders.length}
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>From your account</span>
        </div>
      </div>

      {/* Action Strip */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "35px" }}>
        <button onClick={() => setIsDrawerOpen(true)} className="btn btn-primary">
          + Request New Spares Quotation
        </button>
        <Link href="/client/quotation" className="btn btn-outline">
          📄 View Quotations
        </Link>
        <Link href="/client/orders" className="btn btn-outline">
          🚚 View Orders
        </Link>
        <Link href="/warranty" className="btn btn-outline">
          🛡️ Submit Warranty Claim
        </Link>
      </div>

      {/* Recent Quotations Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "24px", marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Recent Quotations</h3>
          <Link href="/client/quotation" style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700 }}>
            View Quotations →
          </Link>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="quote-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Quote Ref</th>
                <th>Requested Date</th>
                <th>Items Specification</th>
                <th>Quoted Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q.id}>
                  <td><strong>Record #{q.id}</strong></td>
                  <td>{q.created_at ? new Date(q.created_at).toLocaleDateString() : "—"}</td>
                  <td>{q.product_id ? `Product #${q.product_id}${q.quantity ? ` (Qty: ${q.quantity})` : ""}` : "See quotation details"}</td>
                  <td>{q.total == null || !Number.isFinite(Number(q.total)) ? "To be confirmed" : `₹${Number(q.total).toLocaleString()}`}</td>
                  <td>
                    <span className={`badge ${q.status === "approved" || q.status === "accepted" ? "badge-in-stock" : "badge-low-stock"}`}>
                      {q.status || "Status not provided"}
                    </span>
                  </td>
                  <td>
                    <Link href="/client/quotation" className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
                      View summary
                    </Link>
                  </td>
                </tr>
              ))}
              {!isLoading && quotations.length === 0 && (
                <tr><td colSpan="6">No quotations are currently linked to this account.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders Tracking */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Recent Orders</h3>
          <Link href="/client/orders" style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700 }}>
            Track All Orders →
          </Link>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="quote-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Quotation Ref</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td><strong>Record #{ord.id}</strong></td>
                  <td>{ord.quotation_id ? `Quotation record #${ord.quotation_id}` : "—"}</td>
                  <td>{ord.created_at ? new Date(ord.created_at).toLocaleDateString() : "—"}</td>
                  <td>
                    <span className={`badge ${ord.status?.toLowerCase() === "delivered" ? "badge-in-stock" : "badge-order"}`}>
                      {ord.status || "Status not provided"}
                    </span>
                  </td>
                </tr>
              ))}
              {!isLoading && orders.length === 0 && (
                <tr><td colSpan="4">No orders are currently linked to this account.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ClientLayout>
  );
}
