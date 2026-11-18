import React from "react";
import Link from "next/link";
import CONTACT_CONFIG from "@/config/contactConfig";

export default function PrivacyPage() {
  return (
    <main className="section-shell" style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 20px" }}>
      <div className="section-header" style={{ textAlign: "left", marginBottom: "40px" }}>
        <span className="eyebrow">Legal & Compliance</span>
        <h1 className="section-title"><b>Privacy</b> Policy</h1>
        <p className="section-desc">
          Last updated: November 2026. This Privacy Policy explains how Efforts Engineers collects, uses, and safeguards information provided through our website, parts catalog, customer portal, and RFQ forms.
        </p>
        <div className="separator-line" style={{ margin: "20px 0" }} />
      </div>

      <div style={{ display: "grid", gap: "32px", lineHeight: "1.7", color: "var(--text-main, #334155)" }}>
        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            1. Information We Collect
          </h2>
          <p>
            Efforts Engineers operates as a business-to-business (B2B) supplier network partner for industrial refrigeration and compressor replacement spare parts. We collect information necessary to process technical inquiries, prepare quotations, and coordinate fulfillment:
          </p>
          <ul style={{ paddingLeft: "24px", marginTop: "10px" }}>
            <li><strong>Contact details:</strong> Name, business email, telephone/WhatsApp number, and company or plant name.</li>
            <li><strong>Technical specifications:</strong> Compressor make, model series, part numbers, operating conditions, and destination details.</li>
            <li><strong>Attached documents:</strong> Nameplate photographs, mechanical drawings (DWG/PDF), or sample component references uploaded to support quotation feasibility.</li>
            <li><strong>Account information:</strong> Login credentials and order reference histories for registered customer portal users.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            2. How We Use Your Information
          </h2>
          <p>
            Information collected is strictly utilized for commercial and engineering coordination purposes:
          </p>
          <ul style={{ paddingLeft: "24px", marginTop: "10px" }}>
            <li>To review component compatibility and issue accurate commercial quotations.</li>
            <li>To communicate dispatch timelines, shipment tracking, and logistics updates.</li>
            <li>To coordinate warranty inquiries, technical inspection documentation, or reverse-engineering assessments with relevant partner workshops and suppliers.</li>
            <li>To comply with statutory tax, customs, and export documentation regulations.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            3. Information Sharing & Third Parties
          </h2>
          <p>
            We do not sell, rent, or trade your personal or business data. Information may only be shared with:
          </p>
          <ul style={{ paddingLeft: "24px", marginTop: "10px" }}>
            <li><strong>Manufacturing partners & suppliers:</strong> Component dimensions, drawings, and technical parameters required to verify parts availability and manufacturing feasibility.</li>
            <li><strong>Freight & logistics carriers:</strong> Consignee details, delivery addresses, and commercial invoices required for domestic transport and international customs clearance.</li>
            <li><strong>Statutory authorities:</strong> When mandated by applicable Indian or international trade and tax laws.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            4. Data Retention & Security
          </h2>
          <p>
            Technical drawings and commercial records are retained as necessary to service warranty coverage, support repeat orders, and fulfill statutory tax retention mandates. We maintain industry-standard physical and electronic controls to protect your data against unauthorized access or disclosure.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            5. Your Rights & Contact Details
          </h2>
          <p>
            You may request an update, review, or deletion of your business contact information at any time. For privacy inquiries or data requests, contact our compliance desk:
          </p>
          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid var(--line, #e2e8f0)", marginTop: "12px" }}>
            <p style={{ margin: "0 0 6px" }}><strong>Efforts Engineers</strong></p>
            <p style={{ margin: "0 0 6px" }}>{CONTACT_CONFIG.address}</p>
            <p style={{ margin: "0 0 6px" }}>Email: <a href={`mailto:${CONTACT_CONFIG.primaryEmail}`} style={{ color: "var(--primary, #0284c7)" }}>{CONTACT_CONFIG.primaryEmail}</a></p>
            <p style={{ margin: 0 }}>Phone: <a href={`tel:${CONTACT_CONFIG.phoneRaw}`} style={{ color: "var(--primary, #0284c7)" }}>{CONTACT_CONFIG.phone}</a></p>
          </div>
        </section>
      </div>

      <div style={{ marginTop: "50px", borderTop: "1px solid var(--line, #e2e8f0)", paddingTop: "24px", display: "flex", gap: "16px" }}>
        <Link href="/terms" className="btn btn-outline">
          View Terms & Conditions →
        </Link>
        <Link href="/contact" className="btn btn-primary">
          Contact Desk
        </Link>
      </div>
    </main>
  );
}
