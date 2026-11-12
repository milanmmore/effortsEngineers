"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import API from "@/lib/axiosClient";

export default function AdminQuotationsPage() {
  const [quotes, setQuotes] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [adjustedPrice, setAdjustedPrice] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    API.get("/quotation")
      .then((res) => {
        const records = Array.isArray(res.data) ? res.data : [];
        setQuotes(records.map((quote) => {
          const customerId = quote.customer_id ?? quote.client_id;
          const total = quote.total ?? quote.price;
          return {
            id: quote.id,
            rfq_number: quote.rfq_number || `EE-QT-${quote.id}`,
            date: quote.created_at ? new Date(quote.created_at).toLocaleDateString() : "Date not recorded",
            client: customerId ? `Customer #${customerId}` : "Customer details not recorded",
            company: quote.company || "",
            contact: quote.email || quote.phone || "",
            brand: quote.brand || "Not recorded",
            urgency: quote.urgency || "Not recorded",
            items: quote.product_id
              ? `Product #${quote.product_id} · Qty ${quote.quantity ?? "not recorded"}`
              : "Item details not recorded",
            total: Number.isFinite(Number(total)) ? Number(total) : null,
            status: String(quote.status || "draft").toLowerCase(),
            notes: quote.notes || "",
          };
        }));
      })
      .catch((error) => {
        console.error("Failed to load quotations:", error);
        setLoadError("Quotation records are temporarily unavailable.");
      });
  }, []);

  const handleApprove = async (quote) => {
    const updatedTotal = adjustedPrice ? Number(adjustedPrice) : quote.total;
    try {
      await API.put(`/quotation/${quote.id}/status`, { status: "sent", total: updatedTotal });
    } catch (error) {
      console.error("Failed to update quotation:", error);
      setActionError("The quotation could not be updated. Please try again.");
      return;
    }

    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quote.id ? { ...q, status: "sent", total: updatedTotal } : q
      )
    );
    setSelectedQuote(null);
    setAdjustedPrice("");
    setActionError("");
  };

  const filteredQuotes = quotes.filter((q) => {
    if (statusFilter === "All") return true;
    return q.status === statusFilter.toLowerCase();
  });

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Sales & Quoting Desk</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Quotation Review & Approval</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Review quotation records, set a quoted total, and mark quotations as sent.
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
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loadError && <p role="alert">{loadError}</p>}
      {actionError && <p role="alert">{actionError}</p>}

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
                <td><strong style={{ fontSize: "1rem", color: "var(--navy)" }}>{q.total == null ? "Not recorded" : `₹${q.total.toLocaleString()}`}</strong></td>
                <td>
                  <span className={`badge ${q.status === "sent" || q.status === "accepted" ? "badge-in-stock" : (q.status === "pending" ? "badge-low-stock" : "badge-primary")}`}>
                    {q.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {q.status === "pending" || q.status === "draft" ? (
                      <button
                        onClick={() => {
                          setSelectedQuote(q);
                          setAdjustedPrice(q.total == null ? "" : String(q.total));
                        }}
                        className="btn btn-primary"
                        style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                      >
                        Set Price / Mark Sent
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>No action available</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredQuotes.length === 0 && !loadError && (
              <tr><td colSpan="7">No quotation records are currently available.</td></tr>
            )}
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
              <h2 style={{ margin: 0 }}>Review Quotation: {selectedQuote.rfq_number}</h2>
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
                Adjust Quoted Total (₹) {selectedQuote.total == null ? "[Original total not recorded]" : `[Original: ₹${selectedQuote.total.toLocaleString()}]`}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={adjustedPrice}
                  onChange={(e) => setAdjustedPrice(e.target.value)}
                  style={{ padding: "10px 12px", border: "1px solid var(--line)", borderRadius: "6px" }}
                />
              </label>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => setSelectedQuote(null)} className="btn btn-outline">Cancel</button>
                <button onClick={() => handleApprove(selectedQuote)} className="btn btn-primary">
                  Mark Sent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
