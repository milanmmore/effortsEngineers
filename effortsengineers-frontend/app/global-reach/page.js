"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function GlobalReachPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: "CERT-ISO-9001",
      title: "ISO 9001:2015 Quality Management",
      category: "Quality Management System",
      issuer: "TUV / International Accreditation Forum",
      validity: "Active • Audited Annually",
      description: "Certifies our adherence to rigorous quality standards in design, manufacturing, inspection, and supply of industrial compressor spares.",
      fileSize: "1.4 MB • PDF",
    },
    {
      id: "CERT-ZERO-DEFECT",
      title: "1-Year Zero-Defect Quality Guarantee",
      category: "Manufacturer Warranty Declaration",
      issuer: "Efforts Engineers Quality Directorate",
      validity: "Issued with Every Consignment",
      description: "Official declaration certifying 100% interchangeability, metallurgical equivalence, and 12-month free replacement warranty.",
      fileSize: "850 KB • PDF",
    },
    {
      id: "CERT-MTR-SAMPLE",
      title: "Material Test Report (MTR 3.1) Sample",
      category: "Chemical & Mechanical Metallurgy",
      issuer: "NABL Accredited Testing Laboratory",
      validity: "Batch Traceable",
      description: "Sample test certificate showing spectroscopic chemical composition, tensile strength, and Brinell hardness testing for cylinder liners and rods.",
      fileSize: "1.8 MB • PDF",
    },
    {
      id: "CERT-ROHS",
      title: "RoHS & Environmental Compliance",
      category: "Environmental & Hazardous Materials",
      issuer: "Bureau of Industrial Safety",
      validity: "Directive 2011/65/EU Compliant",
      description: "Confirms all gasket materials, O-rings, and metallurgical components are 100% asbestos-free and free from restricted hazardous substances.",
      fileSize: "920 KB • PDF",
    },
    {
      id: "CERT-EXPORT-ISPM",
      title: "ISPM-15 Sea-Worthy Packaging Compliance",
      category: "Export Phytosanitary & Packaging",
      issuer: "Plant Quarantine Division of India",
      validity: "Certified Treatment",
      description: "Certifies that all wooden pallets and export crates undergo certified heat treatment (HT) and methyl bromide fumigation for international sea/air freight.",
      fileSize: "1.1 MB • PDF",
    },
    {
      id: "CERT-EXPORT-CODE",
      title: "Registered Importer-Exporter Code (IEC)",
      category: "Government of India Trade Registry",
      issuer: "Directorate General of Foreign Trade (DGFT)",
      validity: "Permanent Trade Authority",
      description: "Authorizes worldwide commercial export of precision engineering machinery, compressor parts, and refrigeration accessories.",
      fileSize: "750 KB • PDF",
    },
  ];

  const exportDestinations = [
    { region: "Middle East & Gulf", countries: "UAE, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain", transit: "2 - 3 Days (Air) / 7 Days (Sea)" },
    { region: "Southeast Asia", countries: "Singapore, Malaysia, Indonesia, Vietnam, Thailand, Philippines", transit: "3 - 4 Days (Air) / 10 Days (Sea)" },
    { region: "Africa", countries: "Nigeria, Kenya, South Africa, Egypt, Ghana, Tanzania", transit: "4 - 5 Days (Air) / 14 Days (Sea)" },
    { region: "Europe", countries: "Germany, Netherlands, UK, Greece, Italy, Poland", transit: "3 - 5 Days (Air) / 18 Days (Sea)" },
    { region: "Americas", countries: "USA, Canada, Brazil, Mexico, Chile", transit: "4 - 6 Days (Air) / 24 Days (Sea)" },
  ];

  const handleDownload = (cert) => {
    alert(`Downloading verified certificate: ${cert.title} (${cert.id}.pdf)`);
  };

  return (
    <main className="section-shell">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Worldwide Footprint & Compliance</span>
        <h1 className="section-title"><b>Global Reach</b> & Downloadable Certificates</h1>
        <p className="section-desc">
          Supplying precision compressor spares to critical refrigeration and marine operations across 45+ countries. Backed by verified international quality certifications.
        </p>
        <div className="separator-line" />
      </div>

      {/* Stats Grid */}
      <dl className="export-stats-grid">
        <div className="export-stat-box">
          <dt>45+</dt>
          <dd>Export Destinations</dd>
        </div>
        <div className="export-stat-box">
          <dt>100%</dt>
          <dd>Export VCI Barrier Packaging</dd>
        </div>
        <div className="export-stat-box">
          <dt>24h</dt>
          <dd>Air Cargo Customs Turnaround</dd>
        </div>
        <div className="export-stat-box">
          <dt>ISO 9001</dt>
          <dd>Certified Quality System</dd>
        </div>
      </dl>

      {/* Global Export Network Table */}
      <section style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "35px", marginBottom: "60px", boxShadow: "var(--shadow-sm)" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "14px" }}>International Export & Logistics Corridors</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "25px", fontSize: "0.95rem" }}>
          Centrally located in Pune with direct logistical access to Mumbai Air Cargo complex and Nhava Sheva (JNPT) container port, allowing seamless expedited shipments globally.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table className="quote-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Major Export Destinations</th>
                <th>Standard Transit Time</th>
                <th>Clearance Standard</th>
              </tr>
            </thead>
            <tbody>
              {exportDestinations.map((dest, idx) => (
                <tr key={idx}>
                  <td><strong>{dest.region}</strong></td>
                  <td>{dest.countries}</td>
                  <td><span className="badge badge-primary">{dest.transit}</span></td>
                  <td>ISPM-15 Wooden Crating + VCI Sealed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Packaging & Sea-Worthy Preservation Standards */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "60px", alignItems: "center" }}>
        <div>
          <span className="eyebrow">Zero Corrosion Guarantee</span>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "16px" }}>Export Preservation & Heavy-Duty Crating</h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "18px" }}>
            Compressor spares such as cast iron cylinder liners, crankshafts, and valve plates are sensitive to atmospheric moisture during ocean transit. Efforts Engineers enforces a triple-barrier preservation method for all international shipments:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.92rem" }}>
            <li>🛡️ <strong>1. Micro-film Rust Preventative Oil:</strong> Hydrophobic anti-corrosion coating applied to all machined contact surfaces.</li>
            <li>📦 <strong>2. VCI Barrier Bag Vacuum Sealing:</strong> Vapor Corrosion Inhibitor packaging protecting metals from moisture for up to 36 months.</li>
            <li>🌲 <strong>3. ISPM-15 Heat-Treated Wooden Boxes:</strong> Fumigated, heavy-duty timber crates reinforced with steel strapping to withstand maritime handling.</li>
          </ul>
          <button onClick={() => alert("Packaging specification guide downloaded.")} className="btn btn-outline">
            📄 Download Packaging Specs Guide (PDF)
          </button>
        </div>
        <div style={{ background: "var(--navy)", borderRadius: "16px", padding: "35px", color: "white" }}>
          <h3 style={{ color: "white", marginBottom: "12px", fontSize: "1.35rem" }}>🚢 Customs & Shipping Documents Included</h3>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", marginBottom: "20px" }}>
            Every overseas consignment is accompanied by full commercial and technical compliance paperwork:
          </p>
          <div style={{ display: "grid", gap: "10px", fontSize: "0.88rem" }}>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
              ✓ Commercial Invoice with Harmonized System (HS) Codes
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
              ✓ Certificate of Origin (Chamber of Commerce Verified)
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
              ✓ Packing List with Gross/Net Weights & Dimensions
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>
              ✓ Material Test Certificate (MTC 3.1) & Dimensional Inspection
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Certificates Hub */}
      <section id="certificates" style={{ borderTop: "1px solid var(--line)", paddingTop: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Verified Compliance</span>
          <h2 className="section-title"><b>Downloadable</b> Quality & Compliance Certificates</h2>
          <p className="section-desc">
            Download our authentic certifications, standard test certificates, and environmental compliance documents.
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
                <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600 }}>{cert.fileSize}</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="btn btn-outline"
                    style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownload(cert)}
                    className="btn btn-primary"
                    style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                  >
                    Download ⬇
                  </button>
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
              <p><strong>Document Ref:</strong> {selectedCert.id}</p>
              <p><strong>Issued By:</strong> {selectedCert.issuer}</p>
              <p><strong>Validity:</strong> {selectedCert.validity}</p>
              <p style={{ margin: 0 }}><strong>Scope:</strong> {selectedCert.description}</p>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedCert(null)} className="btn btn-outline">
                Close
              </button>
              <button onClick={() => handleDownload(selectedCert)} className="btn btn-primary">
                Download PDF ({selectedCert.fileSize})
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

