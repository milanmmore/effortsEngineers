"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState(2026);

  const timelineEvents = [
    {
      year: 1994,
      title: "Founding in Pune Engineering Hub",
      description: "Established as a specialized mechanical engineering workshop dedicated to servicing high-pressure industrial refrigeration compressors in Maharashtra's booming agro & dairy sectors.",
      highlight: "In-house precision boring & metallurgical honing capability.",
    },
    {
      year: 2002,
      title: "Product Line Expansion (Kirloskar & Grasso)",
      description: "Standardized our proprietary tooling for centrifugal casting of cylinder liners and forging of connecting rods compatible with Kirloskar KC and Grasso RC compressor families.",
      highlight: "Over 500+ standard spares added to ready stock.",
    },
    {
      year: 2011,
      title: "ISO 9001 Certification & Direct Exports",
      description: "Achieved ISO 9001:2015 Quality Management certification and commenced direct overseas dispatches to cold storage chains in the UAE, Saudi Arabia, Oman, and Southeast Asia.",
      highlight: "Formed dedicated international export packaging wing.",
    },
    {
      year: 2018,
      title: "Advanced CNC & 3D Reverse Engineering",
      description: "Inaugurated our modern MIDC Bhosari facility equipped with multi-axis CNC turn-mill centers, precision cylindrical grinding, and high-accuracy Coordinate Measuring Machines (CMM).",
      highlight: "Sub-micron dimensional tolerances and digital CAD/CAM profiling.",
    },
    {
      year: 2024,
      title: "Global Export Reach Across 45+ Countries",
      description: "Expanded our client base across Europe, Africa, and Latin America, establishing long-term supply agreements with leading marine fleet operators and petrochemical complexes.",
      highlight: "10,000+ line items maintained in central Pune warehouse.",
    },
    {
      year: 2026,
      title: "Digital Live Stock & AI Quoting Platform",
      description: "Launched the next-generation digital ecosystem for Efforts Engineers: featuring real-time warehouse inventory visibility, automated RFQ builder, downloadable quotes, and 24/7 AI chatbot assistance.",
      highlight: "Zero downtime customer self-service and express dispatch within 24h.",
    },
  ];

  const industries = [
    {
      icon: "❄️",
      name: "Cold Storage & Agro Freezing",
      description: "Ammonia & Freon compressor spares for multi-commodity cold stores, IQF fruit & vegetable freezers, seafood processing plants, and meat preservation facilities.",
    },
    {
      icon: "🚢",
      name: "Marine & Offshore Shipping",
      description: "High-grade components for shipboard provision reefer plants, refrigerated container vessel fleets, offshore oil platforms, and fishing trawlers.",
    },
    {
      icon: "🧪",
      name: "Chemical & Petrochemical Processing",
      description: "Corrosion-resistant alloy valves, piston rings, and cylinder sleeves for process gas compressors handling hydrocarbon gases, CO2, ammonia, and nitrogen.",
    },
    {
      icon: "🍺",
      name: "Dairy, Breweries & Beverage",
      description: "Continuous-duty compressor spares powering milk chilling centers, glycol brine chillers, CO2 recovery compressors, and brewery fermentation systems.",
    },
    {
      icon: "🏢",
      name: "Commercial HVAC & District Cooling",
      description: "Heavy reciprocating compressor spares for central chillers in airports, hospitals, IT parks, shopping malls, and industrial cleanrooms.",
    },
    {
      icon: "🏭",
      name: "Pharmaceutical & Cleanroom Plants",
      description: "Oil-free and lubricated compressor components operating under strict environmental and temperature tolerance requirements.",
    },
  ];

  return (
    <main className="section-shell">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Over Three Decades of Engineering Precision</span>
        <h1 className="section-title"><b>Company Story</b> & Industrial Heritage</h1>
        <p className="section-desc">
          How Efforts Engineers transformed from a precision Pune workshop into a global benchmark for industrial compressor spare parts and turnkey overhaul engineering.
        </p>
        <div className="separator-line" />
      </div>

      {/* Split Story Section */}
      <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "50px", alignItems: "center", marginBottom: "70px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Our Origins & Philosophy</span>
          <h2 style={{ fontSize: "2rem", lineHeight: 1.2, marginBottom: "18px" }}>
            Precision Built Around Zero Industrial Downtime.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "16px" }}>
            <strong>Efforts Engineers</strong> has supplied precision-engineered Ammonia Compressor Spare Parts suitable for <strong>Grasso, Kirloskar, and Sabroe Compressors</strong>, alongside critical accessories like <strong>Ammonia Valves and Expansion Valves</strong>, to esteemed industrial and government clients across India for over <strong>40 years</strong>, now exporting internationally.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "22px" }}>
            Over the last 30+ years, <strong>M/s Efforts Engineers</strong> has steadily progressed from a trusted local supplier into a leading exporter of refrigeration compressor spares. Today, Efforts Engineers is recognized as a prominent supplier & exporter of a wide range of <strong>Air & Gas Compressor Spare Parts & Accessories</strong>, operating from our manufacturing and warehousing facility in Pune, Maharashtra.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/products" className="btn btn-primary">
              Browse Our Spare Parts Catalog →
            </Link>
            <Link href="/global-reach" className="btn btn-outline">
              View Verified Certifications →
            </Link>
          </div>
        </div>

        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
          <img
            src="/images/connecting-rods.jpg"
            alt="Connecting rods manufacturing"
            style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(15,23,42,0.9), transparent)", padding: "25px", color: "white" }}>
            <h4 style={{ color: "white", margin: "0 0 6px" }}>In-House Precision Inspection</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#cbd5e1" }}>
              Every single component is verified using digital CMM and dynamic balancing before dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Milestone Timeline */}
      <section style={{ background: "white", borderRadius: "16px", border: "1px solid var(--line)", padding: "50px 30px", marginBottom: "70px", boxShadow: "var(--shadow-sm)" }}>
        <div className="section-header" style={{ marginBottom: "35px" }}>
          <span className="eyebrow">Our Milestones</span>
          <h2 className="section-title"><b>Interactive Timeline:</b> 1994 to 2026</h2>
          <p className="section-desc">
            Click on any milestone year below to explore key phases in our engineering evolution.
          </p>
        </div>

        {/* Year Pills Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "35px" }}>
          {timelineEvents.map((item) => (
            <button
              key={item.year}
              onClick={() => setActiveYear(item.year)}
              className="btn"
              style={{
                background: activeYear === item.year ? "var(--primary)" : "var(--surface-muted)",
                color: activeYear === item.year ? "white" : "var(--navy)",
                border: "1px solid var(--line)",
                padding: "8px 18px",
                fontSize: "0.95rem",
              }}
            >
              {item.year}
            </button>
          ))}
        </div>

        {/* Timeline Visualization */}
        <div className="timeline-container">
          {timelineEvents.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const isSelected = item.year === activeYear;
            return (
              <div
                key={item.year}
                className={`timeline-milestone ${isLeft ? "left" : "right"}`}
                style={{ opacity: isSelected ? 1 : 0.75, transition: "all 0.3s" }}
              >
                <div
                  className="timeline-marker"
                  style={{
                    background: isSelected ? "var(--amber)" : "var(--primary)",
                    boxShadow: isSelected ? "0 0 0 4px var(--amber)" : "0 0 0 3px var(--primary)",
                  }}
                />
                <div
                  className="timeline-content-card"
                  style={{
                    border: isSelected ? "2px solid var(--primary)" : "1px solid var(--line)",
                    boxShadow: isSelected ? "var(--shadow-lg)" : "var(--shadow-sm)",
                  }}
                >
                  <div className="timeline-year">{item.year}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div style={{ marginTop: "10px", fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700 }}>
                    ★ {item.highlight}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Industries Served Grid */}
      <section style={{ marginBottom: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Cross-Sector Applications</span>
          <h2 className="section-title"><b>Industries</b> We Power Worldwide</h2>
          <p className="section-desc">
            Supplying critical spares that ensure round-the-clock cooling, gas compression, and cold chain continuity.
          </p>
          <div className="separator-line" />
        </div>

        <div className="services-grid">
          {industries.map((ind, idx) => (
            <div key={idx} className="why-card" style={{ padding: "28px" }}>
              <div className="why-icon-box" style={{ fontSize: "2rem" }}>{ind.icon}</div>
              <h4>{ind.name}</h4>
              <p>{ind.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Assurance Standards Box */}
      <section style={{ background: "var(--navy)", color: "white", borderRadius: "16px", padding: "45px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
        <div>
          <span className="eyebrow" style={{ color: "#38bdf8" }}>Zero Defect Standard</span>
          <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "16px" }}>
            Precision Quality Assurance & Metallurgy Lab
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.65, fontSize: "0.95rem", marginBottom: "20px" }}>
            All replacement parts leaving our facility undergo rigorous non-destructive and dimensional testing against original OEM drawings. Our metrology room maintains controlled temperature and humidity for exact measurements.
          </p>
          <Link href="/warranty" className="btn btn-amber">
            Read Our 1-Year Zero-Defect Policy →
          </Link>
        </div>

        <div style={{ display: "grid", gap: "12px", fontSize: "0.9rem" }}>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "8px" }}>
            🔬 <strong>Spectroscopic Chemical Analysis:</strong> Ensures alloy composition matches OEM grades.
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "8px" }}>
            📐 <strong>CMM Coordinate Measuring:</strong> Verifies bore concentricity, roundness, and perpendicularity within 3 microns.
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "8px" }}>
            ⚙️ <strong>Dynamic Balancing:</strong> Crankshafts & connecting rods balanced to prevent severe high-RPM vibration.
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "8px" }}>
            🛡️ <strong>Hydraulic Pressure Testing:</strong> Liners and cylinder heads tested at 1.5x working pressure for zero porosity.
          </div>
        </div>
      </section>
    </main>
  );
}
