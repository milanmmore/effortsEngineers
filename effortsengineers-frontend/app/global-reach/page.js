"use client";
import React, { useState } from "react";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import SITE_CONFIG, {
  EXPORT_DESTINATIONS,
  EXPORT_CERTIFICATES,
  PACKAGING_STANDARDS,
  CUSTOMS_DOCUMENTS,
  EXPORT_STATS,
  EXPORT_LOGISTICS,
} from "@/config/site";

export default function GlobalReachPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <main className="section-shell">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Potential Destinations & Supplier Documentation</span>
        <h1 className="section-title"><b>Global Reach</b> & Order Documentation</h1>
        <p className="section-desc">
          We can discuss sourcing and shipment arrangements for refrigeration and marine compressor spares to {SITE_CONFIG.exportDestinationCount} listed potential destination countries. Product documentation, route availability, and shipment terms are confirmed for each order.
        </p>
        <div className="separator-line" />
      </div>

      {/* Stats Grid */}
      <dl className="export-stats-grid">
        {EXPORT_STATS.map((stat, idx) => (
          <div key={idx} className="export-stat-box">
            <dt>{stat.value}</dt>
            <dd>{stat.label}</dd>
          </div>
        ))}
      </dl>

      {/* Global Export Network Table */}
      <section style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "35px", marginBottom: "60px", boxShadow: "var(--shadow-sm)" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "14px" }}>International Export & Logistics Corridors</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "25px", fontSize: "0.95rem" }}>
          {EXPORT_LOGISTICS.hubOrigin}
        </p>

        <div style={{ overflowX: "auto" }}>
          <table className="quote-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Potential Export Destinations</th>
                <th>Indicative Transit Time</th>
                <th>Shipping & Packaging</th>
              </tr>
            </thead>
            <tbody>
              {EXPORT_DESTINATIONS.map((dest, idx) => (
                <tr key={idx}>
                  <td><strong>{dest.region}</strong></td>
                  <td>{dest.countries}</td>
                  <td><span className="badge badge-primary">{dest.transit}</span></td>
                  <td>Packaging as Confirmed per Shipment</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "12px" }}>
          {EXPORT_LOGISTICS.transitDisclaimer}
        </p>
      </section>

      {/* Packaging & Sea-Worthy Preservation Standards */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "60px", alignItems: "center" }}>
        <div>
          <span className="eyebrow">Export Preservation Options</span>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "16px" }}>Export Preservation & Heavy-Duty Crating</h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "18px" }}>
            Compressor spares such as cast iron cylinder liners, crankshafts, and valve plates can be sensitive to atmospheric moisture during ocean transit. Packaging and preservation requirements are confirmed for each shipment:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.92rem" }}>
            {PACKAGING_STANDARDS.map((std, idx) => (
              <li key={idx}>
                {std.icon} <strong>{idx + 1}. {std.title}:</strong> {std.description}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-outline">
            📄 Ask About Packaging Documentation
          </Link>
        </div>
        <div style={{ background: "var(--navy)", borderRadius: "16px", padding: "35px", color: "white" }}>
          <h3 style={{ color: "white", marginBottom: "12px", fontSize: "1.35rem" }}>🚢 Customs & Shipping Documents</h3>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", marginBottom: "20px" }}>
            Export documents are prepared as applicable to the order and destination:
          </p>
          <div style={{ display: "grid", gap: "10px", fontSize: "0.88rem" }}>
            {CUSTOMS_DOCUMENTS.map((doc, idx) => (
              <div key={idx} style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
                ✓ {doc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier and order documentation */}
      <section id="certificates" style={{ borderTop: "1px solid var(--line)", paddingTop: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Order-Specific Documentation</span>
          <h2 className="section-title"><b>Supplier & Export</b> Documentation</h2>
          <p className="section-desc">
            Documentation availability and scope vary by supplier, product, and destination. Contact us to confirm what is available for a specific order.
          </p>
          <div className="separator-line" />
        </div>

        <div className="cert-grid">
          {EXPORT_CERTIFICATES.map((cert) => (
            <div key={cert.id} className="cert-card">
              <span className="badge badge-primary cert-badge-pill">{cert.category}</span>
              <h3>{cert.title}</h3>
              <p>{cert.description}</p>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px", marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600 }}>Availability varies</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="btn btn-outline"
                    style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                  >
                    View details
                  </button>
                  <Link href="/contact" className="btn btn-primary" style={{ padding: "6px 12px", fontSize: "0.78rem" }}>
                    Ask about availability
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <div className="drawer-backdrop" onClick={() => setSelectedCert(null)}>
          <div
            style={{
              background: "white",
              maxWidth: "600px",
              width: "90%",
              margin: "auto",
              borderRadius: "16px",
              padding: "35px",
              boxShadow: "var(--shadow-xl)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--primary)" }}>{selectedCert.category}</span>
                <h3 style={{ margin: 0 }}>{selectedCert.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: "var(--bg-page)", border: "1px solid var(--line)", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
              <p><strong>Document Type:</strong> {selectedCert.title}</p>
              <p><strong>Issued By:</strong> {selectedCert.issuer}</p>
              <p><strong>Validity:</strong> {selectedCert.validity}</p>
              <p style={{ margin: 0 }}><strong>Scope:</strong> {selectedCert.description}</p>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedCert(null)} className="btn btn-outline">
                Close
              </button>
              <Link href="/contact" className="btn btn-primary">
                Ask about availability
              </Link>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginTop: "60px" }}>
        <EnquiryForm source="Global reach page" title="Ask About an Export Requirement" />
      </div>
    </main>
  );
}
