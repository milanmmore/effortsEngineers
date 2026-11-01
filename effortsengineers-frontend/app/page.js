"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";
import { sendEmailNotification } from "@/lib/emailService";
import brandRanges from "@/config/brandRanges";
import CONTACT_CONFIG from "@/config/contactConfig";

export default function HomePage() {
  const { setIsDrawerOpen } = useContext(QuoteContext);

  // Quick Hero RFQ state
  const [rfqName, setRfqName] = useState("");
  const [rfqContact, setRfqContact] = useState("");
  const [rfqBrand, setRfqBrand] = useState("Grasso");
  const [rfqPart, setRfqPart] = useState("");
  const [rfqUrgency, setRfqUrgency] = useState("Breakdown — priority requested");
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRfqId, setSubmittedRfqId] = useState("");

  const handleHeroRfq = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isEmail = rfqContact.includes("@");
    const autoRfqId = `EE-RFQ-${Math.floor(1000 + Math.random() * 9000)}`;

    sendEmailNotification({
      subject: `🚨 Urgent RFQ: ${rfqBrand} - ${rfqPart} (${rfqUrgency})`,
      from_name: rfqName || "Website Visitor",
      reply_to: isEmail ? rfqContact : CONTACT_CONFIG.primaryEmail,
      data: {
        rfq_id: autoRfqId,
        customer_or_plant_name: rfqName,
        contact_detail: rfqContact,
        compressor_make: rfqBrand,
        part_required: rfqPart,
        urgency: rfqUrgency,
        submitted_at: new Date().toLocaleString(),
      },
    }).catch((err) => console.warn("Direct email dispatch note:", err));

    // 2. Also try backend API if available
    try {
      const res = await API.post("/inquiries", {
        name: rfqName,
        email: isEmail ? rfqContact : "",
        phone: !isEmail ? rfqContact : "",
        brand: rfqBrand,
        part_name: rfqPart,
        urgency: rfqUrgency,
        message: `Hero Fast RFQ: Make ${rfqBrand}, Part: ${rfqPart}, Urgency: ${rfqUrgency}`,
      });
      setSubmittedRfqId(res.data?.rfqId || autoRfqId);
      setRfqSubmitted(true);
    } catch (err) {
      console.warn("Backend API not reachable or error:", err.message);
      setSubmittedRfqId(autoRfqId);
      setRfqSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* 1. HERO BANNER (Amocon-inspired) */}
      <section className="hero-industrial">
        <div className="hero-container">
          {/* Left Hero Content */}
          <div>
            <div className="hero-badge-pill">
              <span>★</span> Supplier Network • {CONTACT_CONFIG.yearsInBusinessText} • 15+ Export Destinations
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
                <dd>Compressor Spares Sourcing</dd>
              </div>
              <div className="hero-stat-item">
                <dt>15+</dt>
                <dd>Export Destinations</dd>
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

          {/* Right Hero RFQ Card */}
          <div className="hero-rfq-card">
            <div className="rfq-card-header">
              <span className="eyebrow" style={{ color: "var(--primary)" }}>Fast Breakdown Assistance</span>
              <h3>Get Rapid Spares Quotation</h3>
              <p>Share your compressor details and our team will review pricing and availability. Response timing depends on inquiry details and business hours.</p>
            </div>

            {rfqSubmitted ? (
              <div style={{ padding: "20px 0", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", color: "var(--accent-green)", marginBottom: "10px" }}>✓</div>
                <h4>Requirement Received!</h4>
                {submittedRfqId && (
                  <div style={{ display: "inline-block", background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 700, margin: "8px 0" }}>
                    Reference: {submittedRfqId}
                  </div>
                )}
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Our team will review availability for <strong>{rfqBrand}</strong> spares and follow up at <strong>{rfqContact}</strong>.
                </p>
                <button className="btn btn-outline" onClick={() => setRfqSubmitted(false)} style={{ marginTop: "10px" }}>
                  Submit Another Part
                </button>
              </div>
            ) : (
              <form onSubmit={handleHeroRfq} className="rfq-form-compact">
                <label>
                  Your Name / Plant Name *
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel (Gujarat Cold Chain)"
                    value={rfqName}
                    onChange={(e) => setRfqName(e.target.value)}
                  />
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <label>
                    Compressor Make *
                    <select value={rfqBrand} onChange={(e) => setRfqBrand(e.target.value)}>
                      <option value="Grasso">Grasso (RC9, 11, 12)</option>
                      <option value="Bitzer">Bitzer (4N, 4P, 6F)</option>
                      <option value="Kirloskar">Kirloskar (KC, KCX)</option>
                      <option value="Carrier">Carrier (5F, 5H)</option>
                      <option value="Sabroe">Sabroe (CMO, SMC)</option>
                      <option value="Bock">Bock (F3, F4, F5)</option>
                      <option value="Daikin">Daikin (C55, C75)</option>
                      <option value="Vilter">Vilter (440, 450)</option>
                      <option value="Mycom">Mycom</option>
                      <option value="York">York</option>
                      <option value="Copeland">Copeland</option>
                      <option value="Trane">Trane</option>
                      <option value="Ingersoll Rand">Ingersoll Rand</option>
                      <option value="Atlas Copco">Atlas Copco</option>
                      <option value="CPT">CPT</option>
                      <option value="Accel Sabroe">Accel Sabroe</option>
                      <option value="Voltas">Voltas</option>
                      <option value="Other">Other Make</option>
                    </select>
                  </label>
                  <label>
                    Urgency Level
                    <select value={rfqUrgency} onChange={(e) => setRfqUrgency(e.target.value)}>
                      <option value="Breakdown — priority requested">🚨 Breakdown — request priority handling</option>
                      <option value="Urgent — expedited handling requested">⚡ Urgent — request expedited handling</option>
                      <option value="Planned Maintenance">📅 Planned Overhaul</option>
                    </select>
                  </label>
                </div>
                <label>
                  Part Name / OEM Reference *
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cylinder Liner, Piston Rings, Valve Discs"
                    value={rfqPart}
                    onChange={(e) => setRfqPart(e.target.value)}
                  />
                </label>
                <label>
                  Phone / WhatsApp / Email *
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98230 XXXXX or email@company.com"
                    value={rfqContact}
                    onChange={(e) => setRfqContact(e.target.value)}
                  />
                </label>
                <button type="submit" className="btn btn-primary" style={{ marginTop: "6px" }} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "⚡ Submit Urgent RFQ →"}
                </button>
              </form>
            )}
          </div>
        </div>
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
            <h4>Economical & Direct</h4>
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
            <h4>Manufacturing Through Partners</h4>
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
              <li>✓ <strong>Export VCI Packaging:</strong> Anti-corrosion vacuum barrier sealing + ISPM-15 heat-treated crates.</li>
              <li>✓ <strong>Direct Port Proximity:</strong> Rapid customs clearance for ocean container freight to 15+ export destinations.</li>
            </ul>
            <Link href="/global-reach" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "1.02rem" }}>
              Explore Our Global Export Network →
            </Link>
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "16px", padding: "38px", backdropFilter: "blur(6px)", boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}>
            <h3 style={{ color: "white", marginBottom: "20px", fontSize: "1.4rem", fontWeight: 700 }}>📍 Indicative Transit Estimates from Pune</h3>
            <div style={{ display: "grid", gap: "16px", fontSize: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>Western & Central India (Mumbai, Gujarat, Pune)</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Estimate: 24 - 48 Hours</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>North & South India Metro Hubs (Delhi, Chennai, BLR)</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Estimate: 24 - 48 Hours</strong>
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
              &quot; We regularly procure Sabroe SMC 116 and SMC 108 compressor parts from Efforts Engineers. It is always a pleasure to contact Mr. Saurabh Salvi, who understands the requirement quickly and consistently helps us find the right solution. He is truly a problem solver when it comes to compressor spares&quot;
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
