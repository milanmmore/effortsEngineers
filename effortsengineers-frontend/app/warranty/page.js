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
    setSerialResult({
      serial: serialQuery.toUpperCase(),
      product: "Cylinder Liner - Grasso RC11 / RC12 (Batch EE-2025-Q4)",
      dispatchDate: "14-Nov-2025",
      warrantyStatus: "Active (Covered until 14-Nov-2026)",
      coverage: "100% Zero-Defect Replacement Warranty Included",
      inspectionRef: "ISO-CMM-99412",
    });
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    setClaimSubmitted(true);
  };

  const faqs = [
    {
      q: "What does the 1-Year Zero-Defect Warranty guarantee?",
      a: "Our warranty guarantees that every compressor spare part manufactured or supplied by Efforts Engineers conforms strictly to OEM dimensional tolerances, metallurgy, surface hardness, and micro-finish. If any component exhibits manufacturing or dimensional non-conformance within 12 months, we replace it free of charge.",
    },
    {
      q: "How fast is a warranty replacement part dispatched?",
      a: "In the critical refrigeration sector, downtime cannot wait. For verified warranty claims on in-stock components, we dispatch a replacement part within 24 hours via express priority air courier without waiting for physical return inspection.",
    },
    {
      q: "What items are covered under the warranty?",
      a: "Coverage extends to all core reciprocating and screw compressor spares: cylinder liners, pistons, gudgeon pins, piston rings, connecting rods, valve plates, unloader sleeves, crankshaft bushes, and mechanical shaft seals.",
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
        <span className="eyebrow">Guaranteed Industrial Reliability</span>
        <h1 className="section-title"><b>1-Year Zero-Defect</b> Warranty & Support</h1>
        <p className="section-desc">
          Every component delivered by Efforts Engineers is backed by our full 12-month manufacturer replacement warranty and verified batch traceability.
        </p>
        <div className="separator-line" />
      </div>

      {/* 3 Core Warranty Pillars */}
      <div className="why-choose-grid" style={{ marginBottom: "60px" }}>
        <div className="why-card">
          <div className="why-icon-box">🛡️</div>
          <h4>100% Replacement Guarantee</h4>
          <p>
            Complete coverage against metallurgical defects, casting porosity, out-of-spec dimensions, and premature component fatigue under standard operating conditions.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box">⚡</div>
          <h4>24h Express Claim Dispatch</h4>
          <p>
            No weeks-long claim delays. For critical plant breakdown situations, an immediate replacement unit is dispatched within 24 hours via express air cargo.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box">🔬</div>
          <h4>CMM Verified & Traceable</h4>
          <p>
            Every part carries a laser-etched batch code cross-referenced against our factory CMM inspection database and raw material chemical test reports.
          </p>
        </div>
      </div>

      {/* Interactive Serial Warranty Check Tool */}
      <section style={{ background: "white", borderRadius: "16px", border: "1px solid var(--line)", padding: "40px", marginBottom: "60px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ maxWidth: "680px", margin: "auto", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Instant Verification</span>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Check Warranty Status by Part Serial / Invoice No.</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "25px" }}>
            Enter the laser-etched serial reference or invoice number found on your Efforts Engineers packing slip.
          </p>

          <form onSubmit={handleVerify} style={{ display: "flex", gap: "10px", maxWidth: "520px", margin: "0 auto 25px" }}>
            <input
              type="text"
              required
              placeholder="e.g. EE-2025-RC11 or INV-4491"
              value={serialQuery}
              onChange={(e) => setSerialQuery(e.target.value)}
              style={{ flex: 1, padding: "12px 16px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.92rem" }}
            />
            <button type="submit" className="btn btn-primary">
              Verify Status
            </button>
          </form>

          {serialResult && (
            <div style={{ background: "var(--bg-page)", border: "1px solid var(--line)", borderRadius: "10px", padding: "20px", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <strong style={{ fontSize: "1.1rem", color: "var(--navy)" }}>Serial: {serialResult.serial}</strong>
                <span className="badge badge-in-stock">🟢 {serialResult.warrantyStatus}</span>
              </div>
              <p style={{ margin: "4px 0", fontSize: "0.9rem" }}><strong>Component:</strong> {serialResult.product}</p>
              <p style={{ margin: "4px 0", fontSize: "0.9rem" }}><strong>Dispatch Date:</strong> {serialResult.dispatchDate}</p>
              <p style={{ margin: "4px 0", fontSize: "0.9rem" }}><strong>Metrology Inspection Ref:</strong> {serialResult.inspectionRef}</p>
              <p style={{ margin: "4px 0", fontSize: "0.9rem", color: "var(--primary)", fontWeight: 700 }}>✓ {serialResult.coverage}</p>
            </div>
          )}
        </div>
      </section>

      {/* Online Warranty Claim RMA Form */}
      <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "50px", marginBottom: "60px" }}>
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid var(--line)", padding: "35px", boxShadow: "var(--shadow-sm)" }}>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Fast Track RMA</span>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "10px" }}>Submit an Online Warranty Claim</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "25px" }}>
            If you encounter an issue with an installed spare part, submit your claim details here for expedited review.
          </p>

          {claimSubmitted ? (
            <div style={{ background: "var(--green-light)", border: "1px solid #a7f3d0", padding: "30px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", color: "#065f46", marginBottom: "12px" }}>✓</div>
              <h3 style={{ color: "#065f46", marginBottom: "8px" }}>Claim Registered: EE-RMA-8821</h3>
              <p style={{ color: "#047857", fontSize: "0.95rem" }}>
                Our quality directorate has been notified. For critical plant breakdown situations, our team will dispatch a replacement unit within 24 hours.
              </p>
              <button className="btn btn-primary" onClick={() => setClaimSubmitted(false)} style={{ marginTop: "14px" }}>
                Submit Another Claim
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
                Submit RMA Claim for Review →
              </button>
            </form>
          )}
        </div>

        {/* Quality Director Statement */}
        <div style={{ background: "var(--navy)", color: "white", borderRadius: "16px", padding: "35px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span className="eyebrow" style={{ color: "#38bdf8" }}>Our Quality Pledge</span>
            <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px" }}>
              &quot;Zero Compromise On Metallurgical Integrity.&quot;
            </h3>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "20px" }}>
              Every component supplied by Efforts Engineers is manufactured under strict ISO 9001:2015 process controls. We conduct 100% dimensional inspection, ultrasonic flaw detection, and surface hardness testing on all critical dynamic spares.
            </p>
            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.65 }}>
              Our 1-year replacement warranty is not merely a document—it is our binding operational commitment that you receive world-class performance on every compressor revolution.
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "18px", marginTop: "25px" }}>
            <strong style={{ color: "white" }}>Quality Assurance Directorate</strong>
            <p style={{ margin: "2px 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>
              Efforts Engineers Precision Manufacturing Unit, Pune
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

