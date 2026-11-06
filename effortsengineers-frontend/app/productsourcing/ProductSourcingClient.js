"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import EnquiryForm from "@/components/EnquiryForm";
import CONTACT_CONFIG from "@/config/contactConfig";
import HowItWorks from "@/components/HowItWorks";

export default function ProductSourcingClient({ brandRangesSection }) {
  const { setIsDrawerOpen } = useContext(QuoteContext);

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
              Open Quote Builder
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

      {brandRangesSection}

      <HowItWorks />
      <div style={{ marginTop: "60px" }}>
        <EnquiryForm source="Product sourcing page" title="Submit a Sourcing Requirement" />
      </div>
    </main>
  );
}
