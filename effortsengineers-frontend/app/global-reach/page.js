"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function GlobalReachPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: "SUPPLIER-QUALITY",
      title: "Supplier Quality Documentation",
      category: "Supplier Documentation",
      issuer: "Relevant supplier, where available",
      validity: "Availability and scope vary by supplier",
      description: "Quality-system documents may be requested for review. Certification status applies to the named supplier only and does not imply that Efforts Engineers is certified.",
    },
    {
      id: "MATERIAL-INSPECTION",
      title: "Material & Inspection Records",
      category: "Product Documentation",
      issuer: "Relevant supplier or testing provider, where applicable",
      validity: "Availability depends on the product and accepted order terms",
      description: "Material, dimensional, or test records can be discussed for a specific part. Any applicable documentation must be confirmed before ordering.",
    },
    {
      id: "WARRANTY-TERMS",
      title: "Product Warranty Terms",
      category: "Order Documentation",
      issuer: "As stated in the accepted quotation or order",
      validity: "Product- and order-specific",
      description: "Warranty coverage, period, eligibility, and remedies apply only when stated in the accepted quotation or order documents.",
    },
    {
      id: "SHIPPING-DOCUMENTS",
      title: "Shipping & Packaging Documents",
      category: "Export Documentation",
      issuer: "Prepared as applicable to the order and destination",
      validity: "Confirmed per shipment",
      description: "Required shipping and packaging records vary by destination and shipment. Packaging options and applicable documents are confirmed for each order.",
    },
  ];

  const exportDestinations = [
    { region: "Middle East & Gulf", countries: "UAE, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain", transit: "Indicative: 2 - 3 Days (Air) / 7 Days (Sea)" },
    { region: "Southeast Asia", countries: "Singapore, Malaysia, Indonesia, Vietnam, Thailand, Philippines", transit: "Indicative: 3 - 4 Days (Air) / 10 Days (Sea)" },
    { region: "Africa", countries: "Nigeria, Kenya, South Africa, Egypt, Ghana, Tanzania", transit: "Indicative: 4 - 5 Days (Air) / 14 Days (Sea)" },
    { region: "Europe", countries: "Germany, Netherlands, UK, Greece, Italy, Poland", transit: "Indicative: 3 - 5 Days (Air) / 18 Days (Sea)" },
    { region: "Americas", countries: "USA, Canada, Brazil, Mexico, Chile", transit: "Indicative: 4 - 6 Days (Air) / 24 Days (Sea)" },
  ];

  return (
    <main className="section-shell">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Worldwide Footprint & Supplier Documentation</span>
        <h1 className="section-title"><b>Global Reach</b> & Order Documentation</h1>
        <p className="section-desc">
          Sourcing compressor spares for refrigeration and marine operations across 15+ export destinations. Product documentation and shipment arrangements are confirmed by supplier, destination, and order.
        </p>
        <div className="separator-line" />
      </div>

      {/* Stats Grid */}
      <dl className="export-stats-grid">
        <div className="export-stat-box">
          <dt>15+</dt>
          <dd>Export Destinations</dd>
        </div>
        <div className="export-stat-box">
          <dt>By Order</dt>
          <dd>VCI Packaging Options</dd>
        </div>
        <div className="export-stat-box">
          <dt>Varies</dt>
          <dd>Carrier & Customs Processing</dd>
        </div>
        <div className="export-stat-box">
          <dt>Supplier</dt>
          <dd>Quality Documents (If Available)</dd>
        </div>
      </dl>

      {/* Global Export Network Table */}
      <section style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "35px", marginBottom: "60px", boxShadow: "var(--shadow-sm)" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "14px" }}>International Export & Logistics Corridors</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "25px", fontSize: "0.95rem" }}>
          Based in Pune with access to Mumbai air cargo and Nhava Sheva (JNPT) port routes. Dispatch schedules and transit depend on confirmed availability, carriers, customs, and destination.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table className="quote-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Major Export Destinations</th>
                <th>Indicative Transit Time</th>
                <th>Shipping & Packaging</th>
              </tr>
            </thead>
            <tbody>
              {exportDestinations.map((dest, idx) => (
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
          Transit times are estimates only and may exclude order processing, carrier schedules, customs clearance, and local delivery. Actual timing depends on the shipment and destination.
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
            <li>🛡️ <strong>1. Corrosion Protection:</strong> Protective coatings may be specified for suitable machined surfaces.</li>
            <li>📦 <strong>2. VCI Packaging:</strong> Available when appropriate and stated in the shipment arrangements.</li>
            <li>🌲 <strong>3. ISPM-15 Wood Packaging:</strong> Where required, treated by an approved method stated on the applicable certificate. Crating options are confirmed per shipment.</li>
          </ul>
          <button onClick={() => alert("Packaging specification guide downloaded.")} className="btn btn-outline">
            📄 Download Packaging Specs Guide (PDF)
          </button>
        </div>
        <div style={{ background: "var(--navy)", borderRadius: "16px", padding: "35px", color: "white" }}>
          <h3 style={{ color: "white", marginBottom: "12px", fontSize: "1.35rem" }}>🚢 Customs & Shipping Documents</h3>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", marginBottom: "20px" }}>
            Export documents are prepared as applicable to the order and destination:
          </p>
          <div style={{ display: "grid", gap: "10px", fontSize: "0.88rem" }}>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
              ✓ Commercial Invoice with Harmonized System (HS) Codes
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
              ✓ Certificate of Origin, where applicable
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
              ✓ Packing List with Gross/Net Weights & Dimensions
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
              ✓ Material or dimensional inspection records, where available and agreed
            </div>
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
          {certificates.map((cert) => (
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
    </main>
  );
}
