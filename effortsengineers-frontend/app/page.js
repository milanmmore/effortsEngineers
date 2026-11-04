"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import brandRanges from "@/config/brandRanges";
import CONTACT_CONFIG from "@/config/contactConfig";
import EnquiryForm from "@/components/EnquiryForm";

export default function HomePage() {
  const { setIsDrawerOpen } = useContext(QuoteContext);

  return (
    <main>
      {/* 1. HERO BANNER (Amocon-inspired) */}
      <section className="hero-industrial">
        <div className="hero-container">
          {/* Left Hero Content */}
          <div>
            <div className="hero-badge-pill">
              <span>★</span> Supplier Network • {CONTACT_CONFIG.yearsInBusinessText} • Export Coordination
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
              <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber hero-btn">
                📋 Open Quote Builder
              </button>
              <Link href="/contact" className="btn btn-outline-white hero-btn">
                Send Drawing or Part Ref →
              </Link>
              <a
                href="/brochure.pdf"
                download="Efforts-Engineers-Brochure.pdf"
                className="btn btn-outline-white hero-btn"
              >
                Download Brochure ↓
              </a>
            </div>

            {/* Stats Counter Strip */}
            <dl className="hero-stats-strip">
              <div className="hero-stat-item">
                <dt>{CONTACT_CONFIG.yearsInBusinessShort}</dt>
                <dd>Company History</dd>
              </div>
              <div className="hero-stat-item">
                <dt>Export</dt>
                <dd>Coordination by Order</dd>
              </div>
              <div className="hero-stat-item">
                <dt>By Order</dt>
                <dd>Dispatch Estimate</dd>
              </div>
              <div className="hero-stat-item">
                <dt>Warranty</dt>
                <dd>Terms Per Quotation</dd>
              </div>
            </dl>
          </div>

          {/* Right Hero Enquiry Callout */}
          <div className="hero-rfq-card">
            <div className="rfq-card-header">
              <span className="eyebrow" style={{ color: "var(--primary)" }}>Parts Enquiries</span>
              <h3>Need a Compressor Spare?</h3>
              <p>Share the make, model, and part reference. We&apos;ll review your request and confirm availability, pricing, and dispatch estimates.</p>
            </div>
            <Link href="#home-enquiry" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Send a Parts Enquiry →
            </Link>
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
            {CONTACT_CONFIG.yearsInBusinessText}. We source compressor spares and coordinate logistics for industrial plant requirements.
          </p>
          <div className="separator-line" />
        </div>

        <div className="why-choose-grid">
          <div className="why-card">
            <div className="why-icon-box">💰</div>
            <h4>Sourcing Through Our Network</h4>
            <p>
              We source replacement spares through our supplier network. Pricing and any cost savings depend on the part specification, availability, and quotation.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">⚡</div>
            <h4>Availability & Dispatch Estimates</h4>
            <p>
              Ask us to confirm current availability and dispatch options. Delivery estimates depend on stock, order confirmation, carrier schedules, destination, and customs.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">🏭</div>
            <h4>Sourcing Through Partners</h4>
            <p>
              We coordinate with manufacturing partners for suitable CNC machining and inspection. Capabilities and inspection documentation are confirmed for each requirement.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell" id="brand-ranges">
        <div className="section-header">
          <span className="eyebrow">Compressor Compatibility</span>
          <h2 className="section-title"><b>Brands and Detailed</b> Model Ranges</h2>
          <p className="section-desc">
            Browse the compressor makes and models we support. For availability and compatibility, send us the exact model and part reference.
          </p>
          <div className="separator-line" />
        </div>
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {brandRanges.map(({ brand, series }) => (
            <article key={brand} className="why-card" style={{ padding: "26px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1.1rem" }}>{brand}</h3>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.9rem" }}>
                {series.map((range) => <li key={range} style={{ marginBottom: "8px" }}>{range}</li>)}
              </ul>
            </article>
          ))}
        </div>
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
        <div style={{ maxWidth: "100%", margin: "auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "50px", alignItems: "center" }}>
          <div>
            <span className="eyebrow" style={{ color: "#38bdf8", marginBottom: "14px" }}>Express Logistics</span>
            <h2 style={{ color: "white", fontSize: "clamp(2.2rem, 3.8vw, 3rem)", lineHeight: 1.15, marginBottom: "18px", fontWeight: 800 }}>
              Dispatch Options for Urgent Requirements.
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "1.18rem", lineHeight: 1.65, marginBottom: "28px" }}>
              We understand that a compressor stoppage means thousands of dollars in lost inventory and plant disruption. Our Pune central logistics hub is connected directly to major air cargo hubs, national express corridors, and Nhava Sheva (JNPT) sea port.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "14px", color: "#e2e8f0", fontSize: "1.05rem" }}>
              <li>✓ <strong>Air Express Courier:</strong> Priority options may be available; dispatch and arrival depend on stock, carrier schedules, and destination.</li>
              <li>✓ <strong>Export Packaging Options:</strong> VCI and ISPM-15 wood packaging can be discussed where suitable and required; options are confirmed per shipment.</li>
              <li>✓ <strong>Export Logistics Coordination:</strong> Shipping routes, customs documentation, and timing are confirmed for each destination and order.</li>
            </ul>
            <Link href="/global-reach" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "1.02rem" }}>
              Explore Our Global Export Network →
            </Link>
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "16px", padding: "38px", backdropFilter: "blur(6px)", boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}>
            <h3 style={{ color: "white", marginBottom: "20px", fontSize: "1.4rem", fontWeight: 700 }}>📍 Dispatch &amp; Transit Estimates</h3>
            <div style={{ display: "grid", gap: "16px", fontSize: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>India — all destinations</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Confirmed per order</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>Middle East & Gulf Hubs (Dubai, Dammam, Doha)</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Estimate: 2 - 3 Days (Air)</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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

      {/* 7. TESTIMONIALS & CLIENT VERIFICATION */}
      <section className="section-shell">
        <div className="section-header">
          <span className="eyebrow">Customer Trust</span>
          <h2 className="section-title"><b>What Our</b> Clients Say</h2>
          <p className="section-desc">
            Read how engineering supervisors and plant heads rely on Efforts Engineers to maintain non-stop compressor operation.
          </p>
          <div className="separator-line" />
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="star-rating">★★★★★</div>
            <p className="testimonial-quote">
              &quot;We procured a KC 93 crankshaft and bearing set from Efforts Engineers, and the parts performed extremely well in our compressor. The quality and fit were excellent, and the entire experience was smooth. Efforts Engineers is now our go-to source for compressor spare parts.&quot;
            </p>
            <div className="client-profile">
              <div className="client-avatar">VC</div>
              <div className="client-meta">
                <h5>Mr. Vijaykumar Chavan </h5>
                <span>Fisheries Refrigeration HOD</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="star-rating">★★★★★</div>
            <p className="testimonial-quote">
              &quot;We regularly procure Sabroe SMC 116 and SMC 108 compressor parts from Efforts Engineers. It is always a pleasure to contact Mr. Saurabh Salvi, who understands the requirement quickly and consistently helps us find the right solution. He is truly a problem solver when it comes to compressor spares&quot;
            </p>
            <div className="client-profile">
              <div className="client-avatar">AK</div>
              <div className="client-meta">
                <h5>Mr. Ashish Kumbhare </h5>
                <span>Dairy & Ice Cream Division Utility Head </span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="star-rating">★★★★</div>
            <p className="testimonial-quote">
              &quot;We contact Efforts Engineers for all our Carrier compressor spares. Their product knowledge, responsiveness and commitment to delivery are impressive. Most importantly, they understand the urgency of our requirements and deliver critical compressor spares in record time. A dependable partner we can count on.&quot;
            </p>
            <div className="client-profile">
              <div className="client-avatar">MJ</div>
              <div className="client-meta">
                <h5>Mr. Manoj Jogi </h5>
                <span>Ice Cream Plant Maintenance Head</span>
              </div>
            </div>
          </div>
        </div>
      </section>



    </main>
  );
}
