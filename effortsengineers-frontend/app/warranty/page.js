"use client";
import React, { useState } from "react";
import EnquiryForm from "@/components/EnquiryForm";

export default function WarrantyPage() {
  const [activeFaq, setActiveFaq] = useState(null);

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
      a: "Any installation, maintenance, and operating conditions relevant to warranty coverage are stated in the applicable quotation or order documents. Please contact us if you need clarification before installation.",
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

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", marginBottom: "60px" }}>
        <div style={{ background: "var(--navy)", color: "white", borderRadius: "16px", padding: "35px" }}>
          <span className="eyebrow" style={{ color: "#38bdf8" }}>Request a Warranty Review</span>
          <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px" }}>
            Share Your Order and Product Details
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.65, margin: 0 }}>
            Include the invoice or quotation reference, part details, and a description of the issue. Our team will review your enquiry against the applicable order terms. Submitting an enquiry does not confirm warranty eligibility or a remedy.
          </p>
        </div>
        <EnquiryForm
          source="Warranty page"
          title="Submit a Warranty Enquiry"
          description="Include your invoice or quotation reference, part details, and a description of the issue. Warranty eligibility and any remedy depend on the accepted order terms."
        />
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
