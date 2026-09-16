"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";

export default function ServicesPage() {
  const { setIsDrawerOpen } = useContext(QuoteContext);

  const consultancyServices = [
    {
      icon: "🔍",
      title: "Failure Root-Cause Analysis",
      description: "In-depth metallurgical and mechanical diagnostic analysis of compressor failures, including valve flutter fractures, cylinder wall scoring, crankshaft fatigue, and lubrication breakdown.",
    },
    {
      icon: "⚡",
      title: "Refrigeration Plant Energy Audits",
      description: "On-site thermodynamic evaluation of industrial cold stores to detect internal compressor leakage, compression ratio imbalances, and excessive discharge temperatures that drive up power bills.",
    },
    {
      icon: "⚙️",
      title: "Reverse Engineering of Discontinued Spares",
      description: "Precision 3D scanning, coordinate measuring, and metallurgical chemical spectroscopy to replicate discontinued OEM parts with identical or superior alloy grades.",
    },
    {
      icon: "🛠️",
      title: "Turnkey Workshop Compressor Overhaul",
      description: "Complete in-house remanufacturing of bare-shaft compressors including cylinder line boring, crankshaft journal micro-grinding, dynamic balancing, and nitrogen pressure leak testing.",
    },
    {
      icon: "🌊",
      title: "Marine Reefer & HVAC Overhauls",
      description: "Expedited port-side turnaround for container reefer compressors and shipboard air conditioning systems with Class-compliant spares and urgent dispatch to coastal hubs.",
    },
    {
      icon: "📋",
      title: "Preventative Maintenance Overhaul Kits",
      description: "Customized running-hour spares bundles (10,000h / 25,000h) assembled specifically for your compressor fleet to streamline scheduled plant shutdowns.",
    },
  ];

  const caseStudies = [
    {
      id: "CS-01",
      title: "600-Ton Ammonia Cold Storage Compressor Revamp",
      location: "Kutch, Gujarat • Large Seafood & Agro Freezing Facility",
      compressor: "Grasso RC11 (8-Cylinder Reciprocating)",
      problem: "Severe oil carryover into the evaporator coils, high discharge temperatures exceeding 135°C, and a 28% drop in refrigeration capacity during peak season.",
      solution: "Conducted cylinder bore ovality inspection, replaced all 8 cylinder liners with plateau-honed alloy cast sleeves, installed conformable PTFE-faced ring packs, and renewed suction/discharge valve assemblies.",
      result: "Restored volumetric capacity to 98% of design baseline, lowered operating discharge temperature to 112°C, and cut facility power consumption by 14.5% within the first month.",
    },
    {
      id: "CS-02",
      title: "Emergency Marine Reefer Compressor Replacement in Port",
      location: "Nhava Sheva (JNPT), Mumbai • Container Cargo Vessel",
      compressor: "Carrier 5H120 Marine HVAC Compressor",
      problem: "Connecting rod bearing seizure occurred 36 hours prior to container vessel departure, threatening perishable refrigerated cargo containers.",
      solution: "Efforts Engineers dispatched ready-stock forged connecting rods, crankshaft bush sets, and Swedish steel valve discs via priority courier within 6 hours. Provided technical guidance to shipboard chief engineer.",
      result: "Vessel completed compressor reassembly and trial run 8 hours ahead of departure schedule, averting costly demurrage fees.",
    },
    {
      id: "CS-03",
      title: "Reverse-Engineered Spares for Obsolete Process Compressor",
      location: "Middle East Industrial Petrochemical Complex",
      compressor: "Sabroe Vintage SMC 180 Reciprocating Gas Unit",
      problem: "OEM discontinued spare parts supply for this vintage gas compressor, causing a critical hydrogen-offgas process line shutdown.",
      solution: "Received worn valve plates and piston pin samples. Carried out spectroscopic chemical composition analysis and CNC machined 12 sets in corrosion-resistant alloy steel with certified MTC 3.1 reports.",
      result: "The reverse-engineered components achieved over 18,000 continuous operating hours with zero failure incidents.",
    },
  ];

  return (
    <main className="section-shell">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Technical Advisory & Project Delivery</span>
        <h1 className="section-title"><b>Engineering Consultancy</b> & Industrial Projects</h1>
        <p className="section-desc">
          Beyond supplying parts, our mechanical engineers diagnose compressor reliability issues, execute complex overhauls, and reverse-engineer specialized industrial spares.
        </p>
        <div className="separator-line" />
      </div>

      {/* Consultancy Services Grid */}
      <div className="services-grid" style={{ marginBottom: "70px" }}>
        {consultancyServices.map((service, idx) => (
          <div key={idx} className="service-card" style={{ padding: "30px", borderTop: "4px solid var(--primary)" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: "16px" }}>{service.icon}</div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>{service.title}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, flex: 1, margin: 0 }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* Industrial Projects & Case Studies */}
      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Proven Field Track Record</span>
          <h2 className="section-title"><b>Featured Industrial</b> Projects & Overhauls</h2>
          <p className="section-desc">
            Explore how Efforts Engineers resolved severe plant downtime and restored critical compressor efficiency.
          </p>
          <div className="separator-line" />
        </div>

        <div style={{ display: "grid", gap: "30px" }}>
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              style={{
                background: "white",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                padding: "35px",
                boxShadow: "var(--shadow-sm)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "35px",
              }}
            >
              <div>
                <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Case Study {cs.id}</span>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{cs.title}</h3>
                <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", fontWeight: 700, marginBottom: "16px" }}>
                  📍 {cs.location} | ⚙️ {cs.compressor}
                </p>
                <div style={{ background: "var(--bg-page)", padding: "16px", borderRadius: "8px", borderLeft: "4px solid var(--accent-red)", marginBottom: "14px" }}>
                  <h5 style={{ margin: "0 0 6px", color: "var(--navy)" }}>The Challenge:</h5>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>{cs.problem}</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ background: "var(--bg-page)", padding: "16px", borderRadius: "8px", borderLeft: "4px solid var(--primary)", marginBottom: "14px" }}>
                  <h5 style={{ margin: "0 0 6px", color: "var(--navy)" }}>Our Engineering Solution:</h5>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>{cs.solution}</p>
                </div>

                <div style={{ background: "var(--green-light)", padding: "16px", borderRadius: "8px", borderLeft: "4px solid var(--accent-green)" }}>
                  <h5 style={{ margin: "0 0 6px", color: "#065f46" }}>Verified Results:</h5>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#065f46", fontWeight: 600 }}>{cs.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive AI Chatbot & Consultation CTA */}
      <div style={{ marginTop: "70px", background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-card) 100%)", color: "white", borderRadius: "16px", padding: "45px", textAlign: "center" }}>
        <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "14px" }}>Have a Compressor Troubleshooting or Overhaul Query?</h2>
        <p style={{ color: "#cbd5e1", maxWidth: "700px", margin: "0 auto 28px", fontSize: "1rem", lineHeight: 1.6 }}>
          You can interact directly with our <strong>Efforts AI Spares Assistant</strong> on the bottom-right corner to diagnose common compressor symptoms (high temperature, low oil pressure, valve flutter) or schedule an engineering consultation.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber">
            📋 Request Turnkey Overhaul Quote
          </button>
          <a href="https://wa.me/919096026622" target="_blank" rel="noreferrer" className="btn btn-outline-white">
            💬 WhatsApp Engineering Desk
          </a>
        </div>
      </div>
    </main>
  );
}

