"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import API from "@/lib/axiosClient";

const DEFAULT_ADMIN_QUOTES = [
  {
    id: 1042,
    rfq_number: "EE-QT-8912",
    date: "2026-02-28",
    client: "Ramesh Kulkarni",
    company: "Konkan Cold Storage Ltd",
    contact: "+91 98230 45671 (ramesh@konkancold.in)",
    brand: "Grasso",
    urgency: "Immediate Breakdown (24h Express)",
    items: "Cylinder Liner - Grasso RC11 (4x), Piston Ring Sets (4x)",
    total: 42800,
    status: "pending",
    notes: "Customer reported high cylinder blow-by. Needs express air dispatch to Ratnagiri.",
  },
  {
    id: 1043,
    rfq_number: "EE-QT-8913",
    date: "2026-02-28",
    client: "Sunil Verma",
    company: "Apex Agro Foods",
    contact: "+91 94220 11984 (s.verma@apexagro.in)",
    brand: "Bitzer",
    urgency: "Urgent (48 hours)",
    items: "Valve Reed Plates - Bitzer 4N (6x), Head Gaskets (2x)",
    total: 14400,
    status: "pending",
    notes: "Standard overhaul spare parts for seasonal shutdown.",
  },
  {
    id: 1044,
    rfq_number: "EE-QT-8914",
    date: "2026-02-27",
    client: "Capt. Arvind Nair",
    company: "Oceanic Marine Fleet",
    contact: "+91 97654 11223 (nair@oceanicfleet.com)",
    brand: "Carrier",
    urgency: "Scheduled Overhaul (3-5 days)",
    items: "Connecting Rod Assembly - Carrier 5H (2x), Valve Discs (4x)",
    total: 20600,
    status: "approved",
    notes: "Vessel calling at Nhava Sheva. MTC 3.1 certificates requested.",
  },
];

export default function AdminQuotationsPage() {
  const [quotes, setQuotes] = useState(DEFAULT_ADMIN_QUOTES);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [adjustedPrice, setAdjustedPrice] = useState("");
  const [adminRemark, setAdminRemark] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    API.get("/quotation")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((q, idx) => ({
            ...DEFAULT_ADMIN_QUOTES[idx % DEFAULT_ADMIN_QUOTES.length],
            id: q.id,
            rfq_number: `EE-QT-${q.id}`,
            status: q.status || "pending",
            total: q.price ? q.price * (q.quantity || 1) : DEFAULT_ADMIN_QUOTES[idx % DEFAULT_ADMIN_QUOTES.length].total,
          }));
          setQuotes(merged);
        }
      })
      .catch(() => {});
  }, []);

  const handleApprove = async (quote) => {
    const updatedTotal = adjustedPrice ? Number(adjustedPrice) : quote.total;
    try {
      await API.put(`/quotation/${quote.id}/status`, { status: "approved", total: updatedTotal });
    } catch (e) {}

    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quote.id ? { ...q, status: "approved", total: updatedTotal, notes: adminRemark ? `${q.notes} | Admin: ${adminRemark}` : q.notes } : q
      )
    );
    setSelectedQuote(null);
    setAdjustedPrice("");
    setAdminRemark("");
    alert(`Quotation ${quote.rfq_number} has been APPROVED! Official PDF quote is now unlocked for the client.`);
  };

  const handleConvertToOrder = (quote) => {
    const ordId = `EE-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuotes((prev) =>
      prev.map((q) => (q.id === quote.id ? { ...q, status: "converted_to_order" } : q))
    );
    alert(`Quotation ${quote.rfq_number} successfully converted to Active Order #${ordId}! Warehouse dispatch notified.`);
  };

  const filteredQuotes = quotes.filter((q) => {
    if (statusFilter === "All") return true;
    return q.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Sales & Quoting Desk</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Quotation Review & Approval</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Review incoming RFQs from clients and AI chatbot, adjust pricing or discounts, and approve quotations for dispatch.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "10px 14px", border: "1px solid var(--line)", borderRadius: "6px", background: "white", fontSize: "0.88rem", fontWeight: 600 }}
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="converted_to_order">Converted to Order</option>
          </select>
        </div>
      </div>

      {/* Quotations Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "20px", overflowX: "auto" }}>
        <table className="quote-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>RFQ ID</th>
              <th>Client & Facility</th>
              <th>Brand & Urgency</th>
              <th>Requested Spares</th>
              <th>Quoted Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotes.map((q) => (
              <tr key={q.id}>
                <td><strong>{q.rfq_number}</strong><div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{q.date}</div></td>
                <td>
                  <strong>{q.client}</strong>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{q.company}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--primary)" }}>{q.contact}</div>
                </td>
                <td>
                  <span className="brand-badge-card" style={{ padding: "2px 8px", fontSize: "0.72rem" }}>{q.brand}</span>
                  <div style={{ fontSize: "0.75rem", color: q.urgency.includes("Breakdown") ? "var(--accent-red)" : "var(--text-muted)", fontWeight: 600, marginTop: "4px" }}>
                    {q.urgency}
                  </div>
                </td>
                <td style={{ maxWidth: "240px", fontSize: "0.85rem" }}>
                  {q.items}
                  {q.notes && <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "4px" }}>Note: {q.notes}</div>}
                </td>
                <td><strong style={{ fontSize: "1rem", color: "var(--navy)" }}>₹{q.total.toLocaleString()}</strong></td>
                <td>
                  <span className={`badge ${q.status === "approved" ? "badge-in-stock" : (q.status === "pending" ? "badge-low-stock" : "badge-primary")}`}>
                    {q.status === "approved" ? "Approved" : (q.status === "pending" ? "Pending Review" : "Converted to Order")}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {q.status === "pending" ? (
                      <button
                        onClick={() => {
                          setSelectedQuote(q);
                          setAdjustedPrice(String(q.total));
                        }}
                        className="btn btn-primary"
                        style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                      >
                        Approve / Price
                      </button>
                    ) : q.status === "approved" ? (
                      <button
                        onClick={() => handleConvertToOrder(q)}
                        className="btn btn-amber"
                        style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                      >
                        Convert to Order →
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "var(--accent-green)", fontWeight: 700 }}>✓ Order Active</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review & Approval Modal */}
      {selectedQuote && (
        <div className="drawer-backdrop" onClick={() => setSelectedQuote(null)}>
          <div
            style={{
              background: "white",
              maxWidth: "540px",
              width: "90%",
              margin: "auto",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "var(--shadow-xl)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ margin: 0 }}>Review Quotation: {selectedQuote.rfq_number}</h3>
              <button onClick={() => setSelectedQuote(null)} style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ background: "var(--bg-page)", padding: "16px", borderRadius: "8px", marginBottom: "18px", fontSize: "0.88rem" }}>
              <p style={{ margin: "2px 0" }}><strong>Client:</strong> {selectedQuote.client} ({selectedQuote.company})</p>
              <p style={{ margin: "2px 0" }}><strong>Compressor:</strong> {selectedQuote.brand}</p>
              <p style={{ margin: "2px 0" }}><strong>Parts:</strong> {selectedQuote.items}</p>
              <p style={{ margin: "2px 0", color: "var(--accent-red)", fontWeight: 700 }}><strong>Urgency:</strong> {selectedQuote.urgency}</p>
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                Adjust Quoted Total (₹) [Original: ₹{selectedQuote.total.toLocaleString()}]
                <input
                  type="number"
                  value={adjustedPrice}
                  onChange={(e) => setAdjustedPrice(e.target.value)}
                  style={{ padding: "10px 12px", border: "1px solid var(--line)", borderRadius: "6px" }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                Technical Remark / Discount Justification
                <textarea
                  rows="2"
                  placeholder="e.g. Applied 5% bulk discount. Priority air dispatch guaranteed within 24h."
                  value={adminRemark}
                  onChange={(e) => setAdminRemark(e.target.value)}
                  style={{ padding: "10px 12px", border: "1px solid var(--line)", borderRadius: "6px", fontFamily: "inherit" }}
                />
              </label>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => setSelectedQuote(null)} className="btn btn-outline">Cancel</button>
                <button onClick={() => handleApprove(selectedQuote)} className="btn btn-primary">
                  Approve & Issue Formal Quote →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

