"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import SITE_CONFIG from "@/config/site";
import EnquiryForm from "@/components/EnquiryForm";
import HowItWorks from "@/components/HowItWorks";
import InterfaceIcon from "@/components/InterfaceIcon";

export default function HomePageClient({ brandRangesSection }) {
  const { setIsDrawerOpen } = useContext(QuoteContext);

  return (
    <main>
      {/* 1. HERO BANNER (Amocon-inspired) */}
      <section className="hero-industrial">
        <div className="hero-container">
          {/* Left Hero Content */}
          <div>
            <div className="hero-badge-pill">
              <span>★</span> Supplier Network • Compressor Parts Sourcing • Export Coordination
            </div>
            <h1 className="hero-title">
              Parts That Keep <span>Industry Moving.</span>
            </h1>
            <p className="hero-subtitle">
              Replacement spare parts and coordinated overhaul services for industrial refrigeration, cold chain, marine HVAC, and process gas compressors. Availability and dispatch estimates are confirmed per order.
            </p>
            <div className="hero-cta-row">
              <Link href="/products" className="btn btn-primary hero-btn">
                Browse Stock Catalog →
              </Link>
              <button type="button" onClick={() => setIsDrawerOpen(true)} className="btn btn-amber hero-btn">
                📋 Open Quote Builder
              </button>
            </div>

            {/* Stats Counter Strip */}
            <dl className="hero-stats-strip">
              <div className="hero-stat-item">
                <dt>{SITE_CONFIG.brands.length}</dt>
                <dd>Compressor Brands Listed</dd>
              </div>
              <div className="hero-stat-item">
                <dt>{SITE_CONFIG.exportDestinationCount}</dt>
                <dd>Potential Export Destinations</dd>
              </div>
              <div className="hero-stat-item">
                <dt>Since 1986</dt>
                <dd>Serving Industry</dd>
              </div>
            </dl>
          </div>

          {/* Right Hero Enquiry Callout */}
          <div className="hero-rfq-card">
            <div className="rfq-card-header">
              <span className="eyebrow" style={{ color: "var(--primary)" }}>Parts Enquiries</span>
              <h2>Need a Compressor Spare?</h2>
              <p>Share the make, model, and part reference. We&apos;ll review your request and confirm availability, pricing, and dispatch estimates.</p>
            </div>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>Use the catalog or Quote Builder to start an enquiry.</p>
          </div>
        </div>
      </section>

      <section id="home-enquiry" className="section-shell" style={{ background: "#f8fafc" }}>
        <div className="section-header">
          <span className="eyebrow">Parts Enquiry</span>
          <h2 className="section-title"><b>Tell Us What</b> You Need</h2>
          <p className="section-desc">
            Share your contact details and compressor requirement. Standard, urgent, breakdown, and planned-overhaul requests are all welcome.
          </p>
          <div className="separator-line" />
        </div>
        <EnquiryForm source="Home page" title="Submit a Compressor Parts Enquiry" />
      </section>

      {/* 2. WHY CHOOSE US (AMOCON STYLE 3-COLUMN BADGES) */}
      <section className="section-shell" style={{ background: "#f0f9ff" }}>
        <div className="section-header">
          <h2 className="section-title"><b>Why Choose</b> Efforts Engineers?</h2>
          <p className="section-desc">
            We source compressor spares and coordinate logistics for industrial plant requirements.
          </p>
          <div className="separator-line" />
        </div>

        <div className="why-choose-grid">
          <div className="why-card">
            <div className="why-icon-box">💰</div>
            <h3>Competitive Quotations</h3>
            <p>
              We source replacement spares through our supplier network and quote per requirement. Pricing depends on the part specification, availability and quantity.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box"><InterfaceIcon name="bolt" size={24} /></div>
            <h3>Availability & Dispatch Estimates</h3>
            <p>
              Ask us to confirm current availability and dispatch options. Delivery estimates depend on stock, order confirmation, carrier schedules, destination, and customs.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">🏭</div>
            <h3>Sourcing Through Partners</h3>
            <p>
              We coordinate with manufacturing partners for suitable CNC machining and inspection. Capabilities and inspection documentation are confirmed for each requirement.
            </p>
          </div>
        </div>
      </section>

      {brandRangesSection}
      <section className="section-shell">
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link href="/productsourcing#brand-ranges" className="btn btn-outline">
            View Sourcing & Compatibility Details →
          </Link>
        </div>
      </section>

      <section className="section-shell" id="annual-supply-contract" style={{ background: "#f0f9ff" }}>
        <div className="section-header">
          <span className="eyebrow">Long-Term Compressor Spares Supply</span>
          <h2 className="section-title"><b>Annual Supply</b> Contracts</h2>
          <p className="section-desc">
            Need a dependable supply partner for your compressor fleet? We can discuss an annual contract for compressor spares tailored to your requirements.
          </p>
          <div className="separator-line" />
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/contact" className="btn btn-primary">
            Enquire About an Annual Supply Contract →
          </Link>
        </div>
      </section>

      <HowItWorks />

      {/* 3. EXPRESS DELIVERY & GLOBAL LOGISTICS STRIP */}
      <section style={{ 
        background: `
          radial-gradient(circle at 85% 30%, rgba(2, 132, 199, 0.2) 0%, transparent 55%),
          radial-gradient(circle at 15% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 45%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(135deg, #09121f 0%, #0f1a2e 50%, #152238 100%)
        `,
        backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px, 100% 100%",
        color: "white", 
        padding: "80px 0.5in" 
      }}>
        <div className="home-logistics-grid" style={{ maxWidth: "100%", margin: "auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "50px", alignItems: "center" }}>
          <div>
            <span className="eyebrow" style={{ color: "#38bdf8", marginBottom: "14px" }}>Express Logistics</span>
            <h2 style={{ color: "white", fontSize: "clamp(2.2rem, 3.8vw, 3rem)", lineHeight: 1.15, marginBottom: "18px", fontWeight: 800 }}>
              Dispatch Options for Urgent Requirements.
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "1.18rem", lineHeight: 1.65, marginBottom: "28px" }}>
              Our Pune base works with courier and freight partners for air, road and sea dispatch, including Mumbai air cargo and Nhava Sheva (JNPT) port.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "14px", color: "#e2e8f0", fontSize: "1.05rem" }}>
              <li>✓ <strong>Air Express Courier:</strong> Priority options may be available; dispatch and arrival depend on stock, carrier schedules, and destination.</li>
              <li>✓ <strong>Export Packaging:</strong> VCI packaging and ISPM-15 heat-treated crates can be arranged where required; options are confirmed per shipment.</li>
              <li>✓ <strong>Export Routes:</strong> Pune has road access to Mumbai air cargo and Nhava Sheva (JNPT) port. Shipping mode, customs clearance and transit time are confirmed per shipment and destination.</li>
            </ul>
            <Link href="/global-reach" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "1.02rem" }}>
              View Potential Export Destinations →
            </Link>
          </div>
          <div className="home-logistics-estimates" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "16px", padding: "38px", backdropFilter: "blur(6px)", boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}>
            <h3 style={{ color: "white", marginBottom: "20px", fontSize: "1.4rem", fontWeight: 700 }}>📍 Dispatch &amp; Transit Estimates</h3>
            <div style={{ display: "grid", gap: "16px", fontSize: "1rem" }}>
              <div className="home-logistics-estimate-row" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>India — all destinations</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Confirmed per order</strong>
              </div>
              <div className="home-logistics-estimate-row" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>Middle East & Gulf Hubs (Dubai, Dammam, Doha)</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Estimate: 2 - 3 Days (Air)</strong>
              </div>
              <div className="home-logistics-estimate-row" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Europe, Africa & Southeast Asia</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Estimate: 3 - 5 Days (Air)</strong>
              </div>
            </div>
            <p style={{ color: "#cbd5e1", fontSize: "0.8rem", margin: "16px 0 0" }}>
              Estimates are not guarantees and may exclude order processing, carrier delays, customs clearance, and local delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Sourcing and documentation information */}
      <section className="section-shell">
        <div className="section-header">
          <span className="eyebrow">Sourcing Information</span>
          <h2 className="section-title"><b>Documentation &amp;</b> Business Details</h2>
          <p className="section-desc">
            Product compatibility and availability are confirmed for each enquiry. Documentation depends on the product source and order.
          </p>
          <div className="separator-line" />
        </div>
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
          <article className="why-card">
            <h3>Model and part verification</h3>
            <p>Share the compressor nameplate and part reference so we can check the requirement before quotation.</p>
          </article>
          <article className="why-card">
            <h3>Supplier documentation</h3>
            <p>Request applicable supplier certificates, inspection records, and order documents for your specific requirement.</p>
            <Link href="/global-reach#certificates">View documentation information →</Link>
          </article>
          <article className="why-card">
            <h3>Business registration</h3>
            <p>Request GST and business registration details for vendor onboarding or quotation records.</p>
            <Link href="/contact">Contact our team →</Link>
          </article>
          <article className="why-card">
            <h3>Find our Pune office</h3>
            <p>View the office location and contact details.</p>
            <a
              href={CONTACT_CONFIG.profileLinks.find(({ label }) => label === "Google Business Profile")?.url || CONTACT_CONFIG.locations[0].mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              {CONTACT_CONFIG.profileLinks.some(({ label }) => label === "Google Business Profile")
                ? "Google Business Profile →"
                : "Find us on Google Maps →"}
            </a>
          </article>
        </div>
      </section>



    </main>
  );
}
