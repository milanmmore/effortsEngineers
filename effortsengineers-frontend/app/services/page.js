"use client";
import React, { useContext } from "react";
import { QuoteContext } from "@/context/QuoteContext";
import CONTACT_CONFIG from "@/config/contactConfig";
import EnquiryForm from "@/components/EnquiryForm";

export default function ServicesPage() {
  const { setIsDrawerOpen } = useContext(QuoteContext);

  const consultancyServices = [
    {
      icon: "🔍",
      title: "Failure Assessment Coordination",
      description: "Share failure symptoms and operating details for review. Where suitable, we can coordinate an assessment with an external specialist; methods, scope, and reporting depend on partner availability and are agreed before engagement.",
    },
    {
      icon: "⚡",
      title: "Refrigeration Energy Assessment Coordination",
      description: "We can discuss an energy or operating assessment and, where available, coordinate suitable external specialists. Site visits, measurements, scope, and fees are confirmed before any engagement.",
    },
    {
      icon: "⚙️",
      title: "Reverse Engineering of Discontinued Spares",
      description: "We help document discontinued part requirements and coordinate suitable reverse-engineering or manufacturing services through external specialists.",
    },
    {
      icon: "🛠️",
      title: "Compressor Overhaul Coordination",
      description: "We can help scope overhaul requirements and coordinate suitable external workshop services. Scope, capability, and schedule are confirmed per project.",
    },
    {
      icon: "🌊",
      title: "Marine Refrigeration Spare-Parts Sourcing",
      description: "We can review marine refrigeration spare-part requirements and coordinate supplier enquiries. Availability, any classification requirements, and shipping schedules must be confirmed for each order.",
    },
    {
      icon: "📋",
      title: "Planned Maintenance Spare-Parts Enquiries",
      description: "Share your compressor models and planned maintenance requirements for a parts enquiry. Compatibility, availability, and any proposed supply scope are confirmed in the quotation.",
    },
    {
      icon: "📦",
      title: "Recurring Compressor Spares Enquiries",
      description: "Discuss recurring supply requirements. Supported makes, quantities, commercial terms, and availability are confirmed for each quotation.",
    },
  ];

  const coordinationExamples = [
    {
      id: "01",
      title: "Cold-storage compressor parts",
      requirement: "A request for replacement parts for an industrial refrigeration compressor.",
      coordination: "Review the model and part references, then check compatibility and availability with relevant suppliers.",
    },
    {
      id: "02",
      title: "Marine refrigeration spares",
      requirement: "A request for compressor spares for a marine refrigeration application.",
      coordination: "Check supplier availability and discuss any stated classification or shipping requirements for the order.",
    },
    {
      id: "03",
      title: "Hard-to-find or discontinued parts",
      requirement: "A request for a part that is no longer readily available from the original source.",
      coordination: "Review drawings, photographs, and dimensions, then discuss possible supplier or external manufacturing-partner options. Feasibility is confirmed before quotation.",
    },
  ];

  return (
    <main className="section-shell">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Service Coordination</span>
        <h1 className="section-title"><b>Compressor Services</b> & Coordination</h1>
        <p className="section-desc">
          In addition to sourcing parts, we help customers assess compressor requirements and coordinate specialist services through external engineering and manufacturing partners.
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

      <section aria-labelledby="shop-locations-title" style={{ marginBottom: "60px" }}>
        <h2 id="shop-locations-title" style={{ fontSize: "1.35rem", marginBottom: "16px" }}>
          Pune Locations
        </h2>
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {CONTACT_CONFIG.locations.map((location) => (
            <article key={location.id} className="why-card" style={{ padding: "22px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.05rem" }}>
                {location.shop} · {location.role}
              </h3>
              <p style={{ margin: 0 }}>{location.address}</p>
            </article>
          ))}
        </div>
      </section>

      <div style={{ marginBottom: "70px" }}>
        <EnquiryForm source="Services page" title="Enquire About Compressor Services" />
      </div>

      {/* Illustrative coordination examples */}
      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Illustrative Enquiries</span>
          <h2 className="section-title"><b>Typical Sourcing</b> & Coordination Scenarios</h2>
          <p className="section-desc">
            These examples describe enquiry types, not completed customer projects. Supplier availability, partner capability, scope, and outcomes are confirmed individually; no past project result is represented here.
          </p>
          <div className="separator-line" />
        </div>

        <div style={{ display: "grid", gap: "30px" }}>
          {coordinationExamples.map((example) => (
            <div
              key={example.id}
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
                <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Enquiry example {example.id}</span>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{example.title}</h3>
                <div style={{ background: "var(--bg-page)", padding: "16px", borderRadius: "8px", borderLeft: "4px solid var(--accent-red)", marginBottom: "14px" }}>
                  <h5 style={{ margin: "0 0 6px", color: "var(--navy)" }}>Example requirement:</h5>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>{example.requirement}</p>
                </div>
              </div>

              <div style={{ background: "var(--bg-page)", padding: "16px", borderRadius: "8px", borderLeft: "4px solid var(--primary)", alignSelf: "start" }}>
                <h5 style={{ margin: "0 0 6px", color: "var(--navy)" }}>Potential coordination:</h5>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-muted)" }}>{example.coordination}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation CTA */}
      <div style={{ marginTop: "70px", background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-card) 100%)", color: "white", borderRadius: "16px", padding: "45px", textAlign: "center" }}>
        <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "14px" }}>Have a Compressor Troubleshooting or Overhaul Query?</h2>
        <p style={{ color: "#cbd5e1", maxWidth: "700px", margin: "0 auto 28px", fontSize: "1rem", lineHeight: 1.6 }}>
          Share the compressor model, symptoms, and available part references through the enquiry form. Any assessment or specialist service is discussed and scoped before engagement.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber">
            📋 Enquire About Service Coordination
          </button>
          <a href={`https://wa.me/${CONTACT_CONFIG.whatsappRaw}`} target="_blank" rel="noreferrer" className="btn btn-outline-white">
            💬 WhatsApp Engineering Desk
          </a>
        </div>
      </div>
    </main>
  );
}
