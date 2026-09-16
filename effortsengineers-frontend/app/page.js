"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";
import { sendEmailNotification } from "@/lib/emailService";

export default function HomePage() {
  const { setIsDrawerOpen } = useContext(QuoteContext);

  // Quick Hero RFQ state
  const [rfqName, setRfqName] = useState("");
  const [rfqContact, setRfqContact] = useState("");
  const [rfqBrand, setRfqBrand] = useState("Grasso");
  const [rfqPart, setRfqPart] = useState("");
  const [rfqUrgency, setRfqUrgency] = useState("Immediate Breakdown (24h)");
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRfqId, setSubmittedRfqId] = useState("");

  const handleHeroRfq = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isEmail = rfqContact.includes("@");
    const autoRfqId = `EE-RFQ-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1. Send direct email to milanmmore@gmail.com
    sendEmailNotification({
      subject: `🚨 Urgent RFQ: ${rfqBrand} - ${rfqPart} (${rfqUrgency})`,
      from_name: rfqName || "Website Visitor",
      reply_to: isEmail ? rfqContact : "milanmmore@gmail.com",
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
              <span>★</span> ISO 9001:2015 Certified • 30+ Years Engineering • 45+ Export Countries
            </div>
            <h1 className="hero-title">
              Parts That Keep <span>Industry Moving.</span>
            </h1>
            <p className="hero-subtitle">
              OEM-standard replacement spare parts, precision overhaul services, and 24-48h ready stock delivery for industrial refrigeration, cold chain, marine HVAC, and process gas compressors.
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
            </div>

            {/* Stats Counter Strip */}
            <dl className="hero-stats-strip">
              <div className="hero-stat-item">
                <dt>10,000+</dt>
                <dd>Ready Stock Spares</dd>
              </div>
              <div className="hero-stat-item">
                <dt>45+</dt>
                <dd>Export Destinations</dd>
              </div>
              <div className="hero-stat-item">
                <dt>24-48h</dt>
                <dd>Express Dispatch</dd>
              </div>
              <div className="hero-stat-item">
                <dt>1 Year</dt>
                <dd>Zero-Defect Guarantee</dd>
              </div>
            </dl>
          </div>

          {/* Right Hero RFQ Card */}
          <div className="hero-rfq-card">
            <div className="rfq-card-header">
              <span className="eyebrow" style={{ color: "var(--primary)" }}>Fast Breakdown Assistance</span>
              <h3>Get Rapid Spares Quotation</h3>
              <p>Share your compressor details for pricing and ready stock status within 2 hours.</p>
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
                  Our sales engineer is checking live stock for <strong>{rfqBrand}</strong> spares. We will contact you at <strong>{rfqContact}</strong> immediately.
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
                      <option value="Other">Other Make</option>
                    </select>
                  </label>
                  <label>
                    Urgency Level
                    <select value={rfqUrgency} onChange={(e) => setRfqUrgency(e.target.value)}>
                      <option value="Immediate Breakdown (24h)">🚨 Breakdown (24h)</option>
                      <option value="Urgent (48h)">⚡ Urgent (48h)</option>
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
            Combining 30+ years of metallurgic expertise with modern CNC machining and express logistics to eliminate industrial plant downtime.
          </p>
          <div className="separator-line" />
        </div>

        <div className="why-choose-grid">
          <div className="why-card">
            <div className="why-icon-box">💰</div>
            <h4>Economical & Direct</h4>
            <p>
              Direct-from-manufacturer pricing without middleman margins. High-grade replacement spares engineered to OEM tolerances at up to 40% cost savings.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">⚡</div>
            <h4>Ready Stock & Express Delivery</h4>
            <p>
              Over 10,000+ line items ready in our Pune hub. Same-day dispatch with 24-hour delivery for critical plant breakdown emergencies across India & worldwide.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">🏭</div>
            <h4>In-House CNC Manufacturing</h4>
            <p>
              State-of-the-art multi-axis CNC lathes, precision cylindrical grinding, and CMM inspection ensuring micron-level dimensional accuracy and zero defect rate.
            </p>
          </div>
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
            <span className="eyebrow" style={{ color: "#38bdf8", marginBottom: "14px" }}>Express Logistics Guarantee</span>
            <h2 style={{ color: "white", fontSize: "clamp(2.2rem, 3.8vw, 3rem)", lineHeight: 1.15, marginBottom: "18px", fontWeight: 800 }}>
              Zero Downtime Dispatch Within 24-48 Hours.
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "1.18rem", lineHeight: 1.65, marginBottom: "28px" }}>
              We understand that a compressor stoppage means thousands of dollars in lost inventory and plant disruption. Our Pune central logistics hub is connected directly to major air cargo hubs, national express corridors, and Nhava Sheva (JNPT) sea port.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "14px", color: "#e2e8f0", fontSize: "1.05rem" }}>
              <li>✓ <strong>Air Express Courier:</strong> Priority air cargo partnerships for same-day/next-day plant arrival.</li>
              <li>✓ <strong>Export VCI Packaging:</strong> Anti-corrosion vacuum barrier sealing + ISPM-15 heat-treated crates.</li>
              <li>✓ <strong>Direct Port Proximity:</strong> Rapid customs clearance for ocean container freight across 45+ countries.</li>
            </ul>
            <Link href="/global-reach" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "1.02rem" }}>
              Explore Our Global Export Network →
            </Link>
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "16px", padding: "38px", backdropFilter: "blur(6px)", boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}>
            <h3 style={{ color: "white", marginBottom: "20px", fontSize: "1.4rem", fontWeight: 700 }}>📍 Guaranteed Delivery Timelines from Pune Hub</h3>
            <div style={{ display: "grid", gap: "16px", fontSize: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>Western & Central India (Mumbai, Gujarat, Pune)</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>12 - 24 Hours</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>North & South India Metro Hubs (Delhi, Chennai, BLR)</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>24 - 48 Hours</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px" }}>
                <span>Middle East & Gulf Hubs (Dubai, Dammam, Doha)</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>2 - 3 Days (Air)</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Europe, Africa & Southeast Asia</span>
                <strong style={{ color: "#38bdf8", fontWeight: 700 }}>3 - 5 Days (Air)</strong>
              </div>
            </div>
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
              &quot;During peak mango freezing season, our Grasso RC12 had a catastrophic valve and liner failure. Efforts Engineers dispatched complete replacement liners and ring sets within 18 hours. Saved us from immense product loss.&quot;
            </p>
            <div className="client-profile">
              <div className="client-avatar">RK</div>
              <div className="client-meta">
                <h5>Ramesh Kulkarni</h5>
                <span>VP Operations, Konkan Cold Storage Ltd</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="star-rating">★★★★★</div>
            <p className="testimonial-quote">
              &quot;Finding reliable connecting rods and bushes for older Carrier 5H series compressors used to take weeks. Efforts Engineers not only had them in ready stock but also provided full dimensional inspection reports and 1-year guarantee.&quot;
            </p>
            <div className="client-profile">
              <div className="client-avatar">AN</div>
              <div className="client-meta">
                <h5>Capt. Arvind Nair</h5>
                <span>Technical Superintendent, Marine Reefer Services</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="star-rating">★★★★★</div>
            <p className="testimonial-quote">
              &quot;We have been sourcing Kirloskar and Bitzer spares from Efforts Engineers for over 8 years across our chemical processing facilities. The metallurgical consistency and precision tolerances are equal to original OEM parts.&quot;
            </p>
            <div className="client-profile">
              <div className="client-avatar">SM</div>
              <div className="client-meta">
                <h5>Sanjay Mehta</h5>
                <span>Head of Maintenance, Petrochem Intermediates</span>
              </div>
            </div>
          </div>
        </div>
      </section>



    </main>
  );
}
