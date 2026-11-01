"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import brandRanges from "@/config/brandRanges";
import EnquiryForm from "@/components/EnquiryForm";
import CONTACT_CONFIG from "@/config/contactConfig";

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
      desc: "We review the supplied references and coordinate compatibility, dimensional, and material checks with the relevant supplier or manufacturing partner.",
    },
    {
      step: "03",
      title: "Sourcing / Partner Manufacturing",
      desc: "We check availability with our supplier network or coordinate manufacturing through a suitable partner. Lead time is confirmed in the quotation.",
    },
    {
      step: "04",
      title: "Delivery & Documentation",
      desc: "Dispatch estimates, available inspection or material records, packaging, and any applicable warranty are confirmed for the part and stated in the accepted quotation.",
    },
  ];

  return (
    <main className="section-shell">
      <div className="section-header">
        <span className="eyebrow">Custom Parts & Hard-To-Find Spares</span>
        <h1 className="section-title"><b>Specialized Product</b> Sourcing & Partner Services</h1>
        <p className="section-desc">
          Can&apos;t find the exact compressor replacement part? We can help source hard-to-find and discontinued spares and coordinate manufacturing through suitable partners.
        </p>
        <div className="separator-line" />
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center", marginBottom: "70px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Supplier & Manufacturing Partner Network</span>
          <h2 style={{ fontSize: "2rem", lineHeight: 1.2, marginBottom: "18px" }}>
            The Part You Need Is Just One Conversation Away.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "16px" }}>
            {CONTACT_CONFIG.yearsInBusinessText}. We source replacement and compatible parts through a supplier network and can coordinate partner manufacturing when required. Products are not represented as OEM-branded unless explicitly stated in the quotation.
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

      <section id="brand-ranges" style={{ marginBottom: "70px" }}>
        <div className="section-header">
          <span className="eyebrow">Compressor Compatibility</span>
          <h2 className="section-title"><b>Brands</b> and Series We Source</h2>
          <p className="section-desc">
            We source replacement parts for the compressor makes and ranges below. Send us the model and part reference to confirm availability and compatibility.
          </p>
          <div className="separator-line" />
        </div>

        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
          {brandRanges.map(({ brand, series }) => (
            <article key={brand} className="why-card" style={{ padding: "26px" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: "1.1rem" }}>{brand}</h3>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.9rem" }}>
                {series.map((range) => <li key={range} style={{ marginBottom: "8px" }}>{range}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 4 Steps Grid */}
      <section style={{ marginBottom: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Our Sourcing Process</span>
          <h2 className="section-title"><b>How We Procure</b> Your Demanding Parts</h2>
          <div className="separator-line" />
        </div>

        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
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
      <div style={{ marginTop: "60px" }}>
        <EnquiryForm source="Product sourcing page" title="Submit a Sourcing Requirement" />
      </div>
    </main>
  );
}
