"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function WarrantyPage() {
  const [serialQuery, setSerialQuery] = useState("");
  const [serialResult, setSerialResult] = useState(null);
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!serialQuery.trim()) return;
    setSerialResult(serialQuery.trim().toUpperCase());
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    setClaimSubmitted(true);
  };

  const faqs = [
    {
      q: "What warranty applies to a supplied part?",
      a: "Warranty coverage, period, eligibility, and remedies vary by product. The applicable terms are stated in the accepted quotation or order documents. Contact us with your invoice or order reference to discuss a claim.",
    },
    {
      q: "How fast is a warranty replacement part dispatched?",
      a: "Claim review, remedy, and dispatch timing depend on the accepted order terms, product availability, and carrier schedules. We will confirm next steps after reviewing the claim.",
    },
    {
      q: "What items are covered under the warranty?",
      a: "Covered products, if any, are identified in the applicable quotation or order documents. Please confirm coverage before placing an order.",
    },
    {
      q: "Are installation guidelines required to maintain warranty validity?",
      a: "Yes. Standard industrial installation practices must be followed (e.g., proper lube oil priming, correct torque specs on cylinder head & rod bolts, and cleanliness of refrigeration piping to prevent foreign metallic debris from scoring liners).",
    },
  ];

  return (
    <main className="section-shell">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Product Support</span>
        <h1 className="section-title"><b>Warranty</b> & Support</h1>
        <p className="section-desc">
          Warranty coverage, period, eligibility, and remedies are product-specific and apply only as stated in the accepted quotation or order documents.
        </p>
        <div className="separator-line" />
      </div>

      {/* 3 Core Warranty Pillars */}
      <div className="why-choose-grid" style={{ marginBottom: "60px" }}>
        <div className="why-card">
          <div className="why-icon-box">🛡️</div>
          <h4>Warranty Review</h4>
          <p>
            Submit the order reference and issue details. Claims are reviewed against the applicable product and order terms.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box">⚡</div>
          <h4>Claim Handling</h4>
          <p>
            We will confirm the review process and any available remedy. Replacement availability and delivery timing depend on the claim outcome, stock, and carrier.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box">🔬</div>
          <h4>Product Documentation</h4>
          <p>
            Inspection, material, and traceability records vary by product. Please request the documentation available for your part.
          </p>
        </div>
      </div>

      {/* Interactive Serial Warranty Check Tool */}
      <section style={{ background: "white", borderRadius: "16px", border: "1px solid var(--line)", padding: "40px", marginBottom: "60px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ maxWidth: "680px", margin: "auto", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Warranty Inquiry</span>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Ask About Coverage by Order Reference</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "25px" }}>
            Enter your invoice, quotation, or part reference. This form does not access order records; contact our team to verify applicable terms.
          </p>

          <form onSubmit={handleVerify} style={{ display: "flex", gap: "10px", maxWidth: "520px", margin: "0 auto 25px" }}>
            <input
              type="text"
              required
              placeholder="Enter invoice, quotation, or part reference"
              value={serialQuery}
              onChange={(e) => setSerialQuery(e.target.value)}
              style={{ flex: 1, padding: "12px 16px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.92rem" }}
            />
            <button type="submit" className="btn btn-primary">
              Show Contact Instructions
            </button>
          </form>

          {serialResult && (
            <div style={{ background: "var(--bg-page)", border: "1px solid var(--line)", borderRadius: "10px", padding: "20px", textAlign: "left" }}>
              <strong style={{ fontSize: "1.1rem", color: "var(--navy)" }}>Reference: {serialResult}</strong>
              <p style={{ margin: "10px 0 0", fontSize: "0.9rem" }}>
                Coverage cannot be verified automatically here. Contact us with this reference so we can review the applicable quotation or order terms.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Online Warranty Claim RMA Form */}
      <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "50px", marginBottom: "60px" }}>
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid var(--line)", padding: "35px", boxShadow: "var(--shadow-sm)" }}>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Fast Track RMA</span>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "10px" }}>Prepare a Warranty Inquiry</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "25px" }}>
            Provide the details you will need when contacting us. This page does not submit claims to our team.
          </p>

          {claimSubmitted ? (
            <div style={{ background: "var(--green-light)", border: "1px solid #a7f3d0", padding: "30px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", color: "#065f46", marginBottom: "12px" }}>✓</div>
              <h3 style={{ color: "#065f46", marginBottom: "8px" }}>This Form Did Not Send Your Request</h3>
              <p style={{ color: "#047857", fontSize: "0.95rem" }}>
                No information from this form was saved or sent. Please contact us with your order reference; eligibility and next steps are subject to the applicable order terms.
              </p>
              <button className="btn btn-primary" onClick={() => setClaimSubmitted(false)} style={{ marginTop: "14px" }}>
                Prepare Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleClaimSubmit} style={{ display: "grid", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                  Contact Name *
                  <input required type="text" placeholder="Name" style={{ padding: "10px", border: "1px solid var(--line)", borderRadius: "4px" }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                  Phone / WhatsApp *
                  <input required type="tel" placeholder="+91 XXXXX XXXXX" style={{ padding: "10px", border: "1px solid var(--line)", borderRadius: "4px" }} />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                  Invoice / Quotation Number *
                  <input required type="text" placeholder="e.g. INV-1049" style={{ padding: "10px", border: "1px solid var(--line)", borderRadius: "4px" }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                  Part Serial / Reference
                  <input type="text" placeholder="e.g. GRA-RC11-LIN" style={{ padding: "10px", border: "1px solid var(--line)", borderRadius: "4px" }} />
                </label>
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                Observed Symptom / Defect Description *
                <textarea
                  required
                  rows="3"
                  placeholder="Describe observed clearance discrepancy, premature wear, or operating condition..."
                  style={{ padding: "10px", border: "1px solid var(--line)", borderRadius: "4px", fontFamily: "inherit" }}
                />
              </label>

              <button type="submit" className="btn btn-primary" style={{ marginTop: "6px" }}>
                Prepare Inquiry Details →
              </button>
            </form>
          )}
        </div>

        {/* Quality Director Statement */}
        <div style={{ background: "var(--navy)", color: "white", borderRadius: "16px", padding: "35px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span className="eyebrow" style={{ color: "#38bdf8" }}>Product Support</span>
            <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px" }}>
              &quot;Clear Product and Order Terms.&quot;
            </h3>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "20px" }}>
              Efforts Engineers sources products through a supplier network and does not manufacture parts in-house. Product inspection and material records depend on the supplier and are confirmed for each requirement.
            </p>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.65 }}>
              Any warranty period, coverage, eligibility, and remedy are as stated in the accepted quotation or order documents.
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "18px", marginTop: "25px" }}>
            <strong style={{ color: "white" }}>Customer Support</strong>
            <p style={{ margin: "2px 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>
              Efforts Engineers, Pune
            </p>
          </div>
        </div>
      </section>

      {/* Warranty FAQ Accordion */}
      <section id="faq" style={{ borderTop: "1px solid var(--line)", paddingTop: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Warranty Specifics</span>
          <h2 className="section-title"><b>Frequently Asked</b> Warranty Questions</h2>
          <div className="separator-line" />
        </div>

        <div className="faq-accordion">
          {faqs.map((f, idx) => (
            <div key={idx} className="faq-item">
              <div className="faq-header" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <span>{f.q}</span>
                <span className="faq-icon">{activeFaq === idx ? "−" : "+"}</span>
              </div>
              {activeFaq === idx && (
                <div className="faq-body">
                  <p style={{ margin: 0 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
