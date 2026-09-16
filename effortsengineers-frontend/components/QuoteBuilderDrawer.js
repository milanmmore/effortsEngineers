"use client";
import React, { useContext, useState } from "react";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";
import Link from "next/link";
import { sendEmailNotification } from "@/lib/emailService";

export default function QuoteBuilderDrawer() {
  const { items, removeItem, updateQuantity, clearQuote, isDrawerOpen, setIsDrawerOpen, totalEstimated } = useContext(QuoteContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    urgency: "Standard (2-3 days)",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);

  if (!isDrawerOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return alert("Please add at least one spare part to your quotation request.");
    setIsSubmitting(true);
    let quoteId = `EE-QT-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1. Send direct email to milanmmore@gmail.com
    sendEmailNotification({
      subject: `📋 New Formal RFQ Quote Request: ${formData.company || formData.name} (${items.length} parts)`,
      from_name: formData.name,
      reply_to: formData.email || "milanmmore@gmail.com",
      data: {
        quote_id: quoteId,
        customer_name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        urgency: formData.urgency,
        notes: formData.notes,
        estimated_total: `INR ₹${totalEstimated.toLocaleString("en-IN")}`,
        items_requested: items.map(it => `${it.name} (Qty: ${it.quantity}, Make: ${it.brand || 'OEM'})`).join("; "),
        submitted_at: new Date().toLocaleString(),
      },
    }).catch((err) => console.warn("Direct quote email notice:", err));

    // 2. Also try backend API
    try {
      const payload = {
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        urgency: formData.urgency,
        notes: formData.notes,
        product_id: items[0]?.id || 1,
        quantity: items.reduce((sum, it) => sum + it.quantity, 0),
        items: items,
        total: totalEstimated,
      };

      try {
        const res = await API.post("/client/quotation", payload);
        if (res.data?.id) quoteId = `EE-QT-${res.data.id}`;
      } catch (err) {
        // graceful fallback
      }

      setSubmittedQuote({
        id: quoteId,
        date: new Date().toLocaleDateString(),
        customer: formData,
        items: [...items],
        total: totalEstimated,
      });
      clearQuote();
    } catch (err) {
      alert("Submission error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3>Quotation Builder</h3>
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              {items.length} item{items.length === 1 ? "" : "s"} selected
            </span>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsDrawerOpen(false)}>
            ✕
          </button>
        </div>

        {submittedQuote ? (
          <div className="drawer-body" style={{ textAlign: "center", padding: "40px 24px" }}>
            <div style={{ fontSize: "3rem", color: "var(--accent-green)", marginBottom: "12px" }}>✓</div>
            <h3 style={{ marginBottom: "8px" }}>Quotation Generated!</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "20px" }}>
              Quotation Ref: <strong>{submittedQuote.id}</strong> has been registered. Our technical engineering desk will review and dispatch official pricing within 2 hours.
            </p>
            <div style={{ background: "var(--bg-page)", padding: "16px", borderRadius: "8px", textAlign: "left", marginBottom: "24px" }}>
              <p style={{ margin: "4px 0", fontSize: "0.85rem" }}><strong>Client:</strong> {submittedQuote.customer.name} ({submittedQuote.customer.company || "N/A"})</p>
              <p style={{ margin: "4px 0", fontSize: "0.85rem" }}><strong>Contact:</strong> {submittedQuote.customer.email || submittedQuote.customer.phone}</p>
              <p style={{ margin: "4px 0", fontSize: "0.85rem" }}><strong>Urgency:</strong> {submittedQuote.customer.urgency}</p>
              <p style={{ margin: "4px 0", fontSize: "0.85rem" }}><strong>Est. Total:</strong> ₹{submittedQuote.total.toLocaleString()}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Link href="/client/quotation" className="btn btn-primary" onClick={() => setIsDrawerOpen(false)}>
                View / Print Official Quote →
              </Link>
              <button className="btn btn-outline" onClick={() => setSubmittedQuote(null)}>
                New Request
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>📦</div>
                  <p>Your quotation list is currently empty.</p>
                  <Link href="/products" className="btn btn-outline" onClick={() => setIsDrawerOpen(false)} style={{ marginTop: "12px" }}>
                    Explore Ready Spares Catalog
                  </Link>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {items.map((item) => (
                      <div key={item.id} className="drawer-item-card">
                        <div className="drawer-item-info">
                          <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase" }}>
                            {item.brand}
                          </span>
                          <h4>{item.name}</h4>
                          <p>Ref: {item.oem_no}</p>
                          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)" }}>
                            ₹{item.price.toLocaleString()} / unit
                          </span>
                        </div>
                        <div className="drawer-item-actions">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span style={{ fontWeight: 700, minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{ background: "none", border: "none", color: "var(--accent-red)", cursor: "pointer", marginLeft: "4px" }}
                            title="Remove"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Quick RFQ details */}
                  <form id="quote-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid var(--line)", paddingTop: "18px" }}>
                    <h4 style={{ margin: 0, fontSize: "1rem" }}>Your Contact & Plant Details</h4>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px", fontSize: "0.88rem" }}
                    />
                    <input
                      type="email"
                      placeholder="Official Email *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px", fontSize: "0.88rem" }}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <input
                        type="tel"
                        placeholder="WhatsApp / Phone *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px", fontSize: "0.88rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Company / Facility"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px", fontSize: "0.88rem" }}
                      />
                    </div>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px", fontSize: "0.88rem", background: "white" }}
                    >
                      <option value="Immediate Breakdown (24h Express)">🚨 Immediate Breakdown (24h Express Dispatch)</option>
                      <option value="Urgent (48 hours)">⚡ Urgent (48 hours)</option>
                      <option value="Standard (2-3 days)">📅 Standard (2-3 days)</option>
                      <option value="Scheduled Annual Overhaul">🛠 Scheduled Annual Overhaul</option>
                    </select>
                    <textarea
                      placeholder="Specific Compressor serial, dimensions, or application notes..."
                      rows="2"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px", fontSize: "0.88rem", fontFamily: "inherit" }}
                    />
                  </form>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="drawer-footer">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Estimated Base Rate:</span>
                  <strong style={{ fontSize: "1.25rem", color: "var(--navy)" }}>₹{totalEstimated.toLocaleString()}</strong>
                </div>
                <button
                  type="submit"
                  form="quote-form"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  {isSubmitting ? "Generating Official RFQ..." : "Request Automated Quotation →"}
                </button>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-dim)" }}>
                  <span>✓ 100% Free Consultation</span>
                  <span>✓ Formal PDF with Letterhead</span>
                  <span>✓ 1-Yr Warranty Backed</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

