"use client";
import React, { useState } from "react";
import Link from "next/link";
import CONTACT_CONFIG from "@/config/contactConfig";

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState(2026);

  const timelineEvents = [
    {
      year: 1986,
    title: "Established in Pune, India",
    description:
      "Efforts Engineers began operations in Pune, serving customers with industrial refrigeration compressor parts and related support.",
    highlight: "Our journey began in Pune in 1986.",
  },
  {
    year: "2006–2007",
    title: "Product Range Expansion (Kirloskar & Grasso)",
    description:
      "Expanded the range of Kirloskar KC and Grasso RC compatible compressor parts available through our sourcing network.",
    highlight:
      "Broadened sourcing support for Kirloskar KC and Grasso RC compressor families.",
  },
  {
    year: 2009,
    title: "Entering Global Markets",
    description:
      "Expanded into international markets, establishing export operations across Saudi Arabia, Oman and Southeast Asia.",
    highlight:
      "Established export operations across the Middle East and Southeast Asia.",
  },
  {
    year: 2019,
    title: "Scaling International Exports",
    description:
      "Strengthened our global supply capabilities, supporting export and logistics coordination for refrigeration compressor spare parts across international customer requirements.",
    highlight:
      "Supporting global export coordination for refrigeration compressor spare parts.",
  },
  {
    year: 2024,
    title: "Global Reach",
    description:
      "Expanded our international presence, supplying industrial refrigeration spare parts and components to customers across 15+ export destinations worldwide.",
    highlight:
      "Serving customers across 15+ export destinations worldwide.",
  },
  {
    year: 2026,
    title: "Digital Catalog & Customer Support Tools",
    description:
      "Added a database-backed product catalog with stock levels, RFQ creation tools, downloadable quotations, and a website chatbot for product and quotation questions.",
    highlight:
      "Online product catalog, RFQ tools, downloadable quotations, and chatbot support.",
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
        <span className="eyebrow">{CONTACT_CONFIG.yearsInBusinessText}</span>
        <h1 className="section-title"><b>Company Story</b> & Industrial Heritage</h1>
        <p className="section-desc">
          Efforts Engineers is since 1986. We have sourced industrial compressor spare parts and coordinated engineering support for customers in India and across export destinations.
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
            <strong>Efforts Engineers is since 1986.</strong> We have supplied precision-engineered Ammonia Compressor Spare Parts suitable for <strong>Grasso, Kirloskar, and Sabroe Compressors</strong>, alongside critical accessories like <strong>Ammonia Valves and Expansion Valves</strong>, to industrial and government clients across India and selected export markets.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "22px" }}>
            <strong>Efforts Engineers is since 1986.</strong> We have steadily progressed from a trusted local supplier into a sourcing partner for refrigeration compressor spares. Today, Efforts Engineers coordinates supply of <strong>Air & Gas Compressor Spare Parts & Accessories</strong> through its supplier network in Pune and beyond.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/products" className="btn btn-primary">
              Browse Our Spare Parts Catalog →
            </Link>
            <Link href="/global-reach" className="btn btn-outline">
              View Verified Certifications →
            </Link>
            <a
              href="/brochure.pdf"
              download="Efforts-Engineers-Brochure.pdf"
              className="btn btn-outline"
            >
              Download Brochure ↓
            </a>
          </div>
        </div>

        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
          <img
            src="/images/connecting-rods.jpg"
            alt="Connecting rods for compressor applications"
            style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(15,23,42,0.9), transparent)", padding: "25px", color: "white" }}>
            <h4 style={{ color: "white", margin: "0 0 6px" }}>Inspection Documentation</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#cbd5e1" }}>
              Inspection and material documentation can be confirmed with our team for the specified part and order.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Milestone Timeline */}
      <section style={{ background: "white", borderRadius: "16px", border: "1px solid var(--line)", padding: "50px 30px", marginBottom: "70px", boxShadow: "var(--shadow-sm)" }}>
        <div className="section-header" style={{ marginBottom: "35px" }}>
          <span className="eyebrow">Our Milestones</span>
          <h2 className="section-title"><b>Interactive Timeline:</b> 1986 to 2026</h2>
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
            Sourcing & Quality Coordination
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.65, fontSize: "0.95rem", marginBottom: "20px" }}>
            We coordinate product requirements with suppliers and manufacturing partners. Applicable inspection, test reports, and material documentation depend on the part and are confirmed in the quotation.
          </p>
          <Link href="/warranty" className="btn btn-amber">
            Review Warranty Terms →
          </Link>
        </div>

        <div style={{ display: "grid", gap: "12px", fontSize: "0.9rem" }}>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "8px" }}>
            🔬 <strong>Material Documentation:</strong> Availability of material reports is confirmed per part and supplier.
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "8px" }}>
            📐 <strong>Dimensional Inspection:</strong> Inspection requirements and records are confirmed for the selected component.
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "8px" }}>
            ⚙️ <strong>Partner Capabilities:</strong> Balancing and other specialist services can be discussed for specific requirements.
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "8px" }}>
            🛡️ <strong>Test Documentation:</strong> Any applicable test results are subject to supplier capability and order terms.
          </div>
        </div>
      </section>
    </main>
  );
}
