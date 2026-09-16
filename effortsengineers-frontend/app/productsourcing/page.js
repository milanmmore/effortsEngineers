"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";

export default function ProductSourcingPage() {
  const { setIsDrawerOpen } = useContext(QuoteContext);

  const steps = [
    {
      step: "01",
      title: "Share The Reference",
      desc: "Provide the compressor manufacturer name, model number, part description, or upload a technical drawing / sample photograph.",
    },
    {
      step: "02",
      title: "Engineering Verification",
      desc: "Our Pune metrology team verifies dimensional limits, metallurgy, and compatibility with original OEM clearances.",
    },
    {
      step: "03",
      title: "Rapid Sourcing / CNC Fabrication",
      desc: "We either dispatch directly from our 10,000+ ready stock inventory or manufacture the part in our CNC turn-mill center within 3-5 days.",
    },
    {
      step: "04",
      title: "Expedited Global Delivery",
      desc: "Receive the certified component with MTC 3.1 chemical/mechanical test reports and a full 1-Year Zero-Defect Warranty.",
    },
  ];

  return (
    <main className="section-shell">
      <div className="section-header">
        <span className="eyebrow">Custom Parts & Hard-To-Find Spares</span>
        <h1 className="section-title"><b>Specialized Product</b> Sourcing & Fabrication</h1>
        <p className="section-desc">
          Can&apos;t find the exact compressor replacement part? Our Pune engineering wing sources and fabricates hard-to-find and discontinued spares for industrial plants worldwide.
        </p>
        <div className="separator-line" />
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center", marginBottom: "70px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>End-to-End Sourcing Network</span>
          <h2 style={{ fontSize: "2rem", lineHeight: 1.2, marginBottom: "18px" }}>
            The Part You Need Is Just One Conversation Away.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "16px" }}>
            Over decades of operation, many older refrigeration and air compressors lose OEM spare support. Efforts Engineers bridges this gap. We procure and manufacture precision replacements to exact running clearances.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "25px" }}>
            <Link href="/contact" className="btn btn-primary">
              Submit Sourcing Requirement →
            </Link>
            <button onClick={() => setIsDrawerOpen(true)} className="btn btn-outline">
              Open Quotation Builder
            </button>
          </div>
        </div>

        <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
          <img
            src="/images/seals-kits.jpg"
            alt="Compressor sealing kits and bespoke parts"
            style={{ width: "100%", height: "380px", objectFit: "cover", display: "block" }}
          />
        </div>
      </section>

      {/* 4 Steps Grid */}
      <section style={{ marginBottom: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Our Sourcing Process</span>
          <h2 className="section-title"><b>How We Procure</b> Your Demanding Parts</h2>
          <div className="separator-line" />
        </div>

        <div className="services-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {steps.map((s, idx) => (
            <div key={idx} className="why-card" style={{ padding: "26px" }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", fontFamily: "Space Grotesk" }}>
                {s.step}
              </span>
              <h4 style={{ marginTop: "12px", marginBottom: "8px" }}>{s.title}</h4>
              <p style={{ fontSize: "0.88rem", margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
