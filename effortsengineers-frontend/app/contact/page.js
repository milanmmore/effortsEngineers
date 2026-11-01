"use client";

import React from "react";
import EnquiryForm from "@/components/EnquiryForm";
import CONTACT_CONFIG from "@/config/contactConfig";

export default function ContactPage() {
  return (
    <main className="section-shell">
      <div className="section-header">
        <span className="eyebrow">Contact & Technical Enquiries</span>
        <h1 className="section-title"><b>Contact</b> Efforts Engineers</h1>
        <p className="section-desc">
          Send compressor, spare-part, or export requirements to our team. Availability, pricing, dispatch estimates, and applicable warranty terms are confirmed per order.
        </p>
        <div className="separator-line" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(260px, 0.6fr)",
          gap: "32px",
          alignItems: "start",
          marginBottom: "60px",
        }}
      >
        <EnquiryForm source="Contact page" />

        <aside style={{ display: "grid", gap: "20px" }}>
          <section style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "26px" }}>
            <h2 style={{ margin: "0 0 10px", color: "#14532d", fontSize: "1.2rem" }}>
              Contact us on WhatsApp
            </h2>
            <p style={{ color: "#15803d", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Message us with your compressor model and part reference. We will confirm availability and next steps.
            </p>
            <a
              href={`https://wa.me/${CONTACT_CONFIG.whatsappRaw}?text=${encodeURIComponent("Hello Efforts Engineers, I have a compressor spare part requirement.")}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ background: "#22c55e", borderColor: "#16a34a", width: "100%", justifyContent: "center" }}
            >
              Message on WhatsApp
            </a>
          </section>

          <section style={{ background: "white", border: "1px solid var(--line)", borderRadius: "16px", padding: "26px", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontSize: "1.2rem", margin: "0 0 16px" }}>Business Contact</h2>
            <p style={{ margin: "0 0 12px", color: "var(--text-muted)" }}>
              <strong>Office & Workshop</strong><br />
              {CONTACT_CONFIG.address}
            </p>
            <p style={{ margin: "0 0 12px" }}>
              <strong>Phone / WhatsApp</strong><br />
              <a href={`tel:${CONTACT_CONFIG.phoneRaw}`}>{CONTACT_CONFIG.phone}</a>
            </p>
            <p style={{ margin: 0 }}>
              <strong>Email</strong><br />
              <a href={`mailto:${CONTACT_CONFIG.primaryEmail}`}>{CONTACT_CONFIG.primaryEmail}</a>
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
