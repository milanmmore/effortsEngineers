"use client";
import React, { useContext } from "react";
import { QuoteContext } from "@/context/QuoteContext";
import Link from "next/link";
import Field from "@/components/Field";
import useQuoteSubmission from "@/hooks/useQuoteSubmission";

export default function QuoteBuilderDrawer() {
  const { items, removeItem, updateQuantity, clearQuote, isDrawerOpen, setIsDrawerOpen, totalEstimated } = useContext(QuoteContext);
  const hasUnpricedItems = items.some((item) => item.price === null);
  const { formData, updateField, isSubmitting, submittedQuote, submitError, submit: handleSubmit, resetSubmission } =
    useQuoteSubmission({ items, totalEstimated, hasUnpricedItems, clearQuote });

  if (!isDrawerOpen) return null;

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
              Quotation Ref: <strong>{submittedQuote.id}</strong> has been registered. Our team will review your request and follow up; response timing depends on the inquiry and business hours.
            </p>
            <div style={{ background: "var(--bg-page)", padding: "16px", borderRadius: "8px", textAlign: "left", marginBottom: "24px" }}>
              <p style={{ margin: "4px 0", fontSize: "0.85rem" }}><strong>Client:</strong> {submittedQuote.customer.name} ({submittedQuote.customer.company || "N/A"})</p>
              <p style={{ margin: "4px 0", fontSize: "0.85rem" }}><strong>Contact:</strong> {submittedQuote.customer.email || submittedQuote.customer.phone}</p>
              <p style={{ margin: "4px 0", fontSize: "0.85rem" }}><strong>Urgency:</strong> {submittedQuote.customer.urgency}</p>
              <p style={{ margin: "4px 0", fontSize: "0.85rem" }}>
                <strong>{submittedQuote.total > 0 ? "Listed-price subtotal:" : "Pricing:"}</strong>{" "}
                {submittedQuote.total > 0 ? `₹${submittedQuote.total.toLocaleString()}` : "To be confirmed"}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Link href="/client/quotation" className="btn btn-primary" onClick={() => setIsDrawerOpen(false)}>
                View / Print Official Quote →
              </Link>
              <button className="btn btn-outline" onClick={resetSubmission}>
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
                            {item.price === null
                              ? "Price on request"
                              : `₹${item.price.toLocaleString()} / unit`}
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
                    {submitError && (
                      <p role="alert" style={{ margin: 0, padding: "9px 12px", borderRadius: "4px", background: "rgba(220, 38, 38, 0.08)", color: "var(--accent-red)", fontSize: "0.85rem" }}>
                        {submitError}
                      </p>
                    )}
                    <Field
                      type="text"
                      placeholder="Your Name *"
                      required
                      name="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                    <Field
                      type="email"
                      placeholder="Official Email *"
                      required
                      name="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <Field
                        type="tel"
                        placeholder="WhatsApp / Phone *"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                      <Field
                        type="text"
                        placeholder="Company / Facility"
                        name="company"
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                      />
                    </div>
                    <Field
                      as="select"
                      value={formData.urgency}
                      onChange={(e) => updateField("urgency", e.target.value)}
                      style={{ background: "white" }}
                    >
                      <option value="Immediate breakdown — requested priority handling">🚨 Immediate breakdown — request priority handling</option>
                      <option value="Urgent — request expedited handling">⚡ Urgent — request expedited handling</option>
                      <option value="Standard — timing to be confirmed">📅 Standard — timing to be confirmed</option>
                      <option value="Scheduled Annual Overhaul">🛠 Scheduled Annual Overhaul</option>
                    </Field>
                    <Field
                      as="textarea"
                      placeholder="Specific Compressor serial, dimensions, or application notes..."
                      rows="2"
                      value={formData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                    />
                  </form>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="drawer-footer">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    {hasUnpricedItems ? "Pricing:" : "Listed-price subtotal:"}
                  </span>
                  <strong style={{ fontSize: "1.25rem", color: "var(--navy)" }}>
                    {hasUnpricedItems ? "Confirmed in quote" : `₹${totalEstimated.toLocaleString()}`}
                  </strong>
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
