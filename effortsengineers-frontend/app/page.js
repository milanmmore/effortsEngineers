"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";
import { sendEmailNotification } from "@/lib/emailService";

export default function HomePage() {
  const { addItem, setIsDrawerOpen } = useContext(QuoteContext);
  const [activeFaq, setActiveFaq] = useState(null);

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

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Featured Ready Stock Parts
  const featuredParts = [
    {
      id: "EE-PRD-101",
      name: "Cylinder Liner - Grasso RC11 / RC12",
      brand: "Grasso",
      category: "Cylinder Liners",
      oem_no: "GRA-RC11-LIN",
      price: 6800,
      stock_status: "In Stock (Express 24h)",
      stock_type: "in-stock",
      image: "/images/liners-bushes.jpg",
      description: "Centrifugally cast, precision plateau-honed bore for optimum lubrication retention and minimal ring wear.",
    },
    {
      id: "EE-PRD-102",
      name: "Piston Ring Set - Bitzer 4N / 4P / 6F",
      brand: "Bitzer",
      category: "Piston Rings",
      oem_no: "BIT-4N-RNG",
      price: 2400,
      stock_status: "In Stock (Express 24h)",
      stock_type: "in-stock",
      image: "/images/piston-rings.jpg",
      description: "Set includes compression rings and oil scraper rings with PTFE/bronze coating for heavy refrigerant duty.",
    },
    {
      id: "EE-PRD-103",
      name: "Connecting Rod Assembly - Kirloskar KC6 / KCX",
      brand: "Kirloskar",
      category: "Connecting Rods",
      oem_no: "KIR-KC6-ROD",
      price: 8500,
      stock_status: "In Stock (Express 24h)",
      stock_type: "in-stock",
      image: "/images/connecting-rods.jpg",
      description: "Forged alloy steel rod balanced to within ±2 grams, fitted with high-lead phosphor bronze small-end bushes.",
    },
    {
      id: "EE-PRD-104",
      name: "Suction & Discharge Valve Plate - Carrier 5H",
      brand: "Carrier",
      category: "Valves & Reeds",
      oem_no: "CAR-5H-VLV",
      price: 4200,
      stock_status: "Low Stock (4 units left)",
      stock_type: "low-stock",
      image: "/images/compressor-parts.jpg",
      description: "Swedish flapper steel valve discs lapped to optical flatness for zero leakage and rapid thermal dissipation.",
    },
    {
      id: "EE-PRD-105",
      name: "Complete Overhaul Gasket & O-Ring Kit - Sabroe CMO",
      brand: "Sabroe",
      category: "Seals & Gaskets",
      oem_no: "SAB-CMO-GSK",
      price: 3800,
      stock_status: "In Stock (Express 24h)",
      stock_type: "in-stock",
      image: "/images/seals-kits.jpg",
      description: "Asbestos-free high-density aramid gasket material with Viton/HNBR O-rings resistant to ammonia & synthetic oils.",
    },
    {
      id: "EE-PRD-106",
      name: "Crankshaft Main Bearing Bush - Daikin C75 / C58",
      brand: "Daikin",
      category: "Bearings & Bushes",
      oem_no: "DAI-C75-BRG",
      price: 5400,
      stock_status: "Made to Order (3-5 days)",
      stock_type: "order",
      image: "/images/compressor-parts.jpg",
      description: "Tri-metal heavy-duty sleeve bearing diamond-bored for exacting journal clearance under high suction loads.",
    },
  ];

  // FAQ items
  const faqList = [
    {
      q: "What does the 1-Year Zero-Defect Replacement Warranty cover?",
      a: "Our warranty guarantees that every spare part is free from dimensional, metallurgical, and manufacturing defects for a full 12 months from dispatch. In the rare event of an out-of-tolerance part, we provide an immediate 24-hour express replacement dispatch without waiting for warranty claim arbitration.",
    },
    {
      q: "Are Efforts Engineers spare parts 100% interchangeable with OEM parts?",
      a: "Yes. All our parts are reverse-engineered and CNC machined strictly following OEM dimensional limits, micro-finishes, and material specifications. They are direct drop-in replacements for original Kirloskar, Grasso, Bitzer, Carrier, Sabroe, Bock, and Daikin compressors.",
    },
    {
      q: "How fast is your breakdown express dispatch?",
      a: "For parts held in ready stock (over 10,000 line items), orders placed before 3:00 PM IST are dispatched the same day from our Pune logistics center via express air cargo or priority courier (Blue Dart, DHL, FedEx) with 24-48h delivery across India and major international hubs.",
    },
    {
      q: "Do you supply Material Test Reports (MTR) and inspection certificates?",
      a: "Yes. Every batch is certified under ISO 9001:2015. On request, we provide Chemical & Mechanical Material Test Reports (MTC 3.1), CMM dimensional inspection sheets, and dynamic balancing certificates.",
    },
    {
      q: "Can you manufacture obsolete or customized compressor parts from sample or drawing?",
      a: "Yes. Our engineering division specializes in precision reverse engineering. You can send us a worn sample, engineering drawing, or broken component, and our CNC machining wing will replicate the exact geometry, metallurgy, and heat treatment.",
    },
  ];

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

      {/* 4. SERVICES & APPLICATIONS GRID (Amocon-inspired) */}
      <section className="section-shell">
        <div className="section-header">
          <span className="eyebrow">Engineering Applications</span>
          <h2 className="section-title"><b>Our Product</b> Applications & Services</h2>
          <p className="section-desc">
            Powering critical refrigeration systems across heavy industries, marine fleets, and food processing plants.
          </p>
          <div className="separator-line" />
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-img-wrapper">
              <img src="/images/compressor-parts.jpg" alt="Industrial Cold Storage" />
            </div>
            <div className="service-content">
              <h3>Industrial Refrigeration & Cold Storage</h3>
              <p>Heavy ammonia and freon compressor spares for large-scale cold stores, seafood preservation, ice plants, and frozen meat processing.</p>
              <Link href="/services" className="service-link">View Engineering Scope →</Link>
            </div>
          </div>

          <div className="service-card">
            <div className="service-img-wrapper">
              <img src="/images/seals-kits.jpg" alt="Marine HVAC Compressor Spares" />
            </div>
            <div className="service-content">
              <h3>Marine & Transport HVAC</h3>
              <p>Certified replacement parts for cargo reefer containers, fishing trawlers, offshore vessels, and land-based refrigerated transport fleets.</p>
              <Link href="/services" className="service-link">View Marine Solutions →</Link>
            </div>
          </div>

          <div className="service-card">
            <div className="service-img-wrapper">
              <img src="/images/connecting-rods.jpg" alt="Process Gas" />
            </div>
            <div className="service-content">
              <h3>Petrochemical & Process Gas Compression</h3>
              <p>Specialized alloy components for hydrocarbon gas, CO2, nitrogen, and gas booster compressors operating under continuous high pressures.</p>
              <Link href="/services" className="service-link">View Industrial Projects →</Link>
            </div>
          </div>

          <div className="service-card">
            <div className="service-img-wrapper">
              <img src="/images/liners-bushes.jpg" alt="Compressor Overhaul" />
            </div>
            <div className="service-content">
              <h3>Turnkey Compressor Overhaul</h3>
              <p>Complete workshop refurbishment, crankshaft dynamic balancing, line boring, and pressure testing with guaranteed performance restoration.</p>
              <Link href="/services" className="service-link">Learn About Overhaul →</Link>
            </div>
          </div>

          <div className="service-card">
            <div className="service-img-wrapper">
              <img src="/images/piston-rings.jpg" alt="Reverse Engineering" />
            </div>
            <div className="service-content">
              <h3>Reverse Engineering of Obsolete Spares</h3>
              <p>Fabrication of out-of-production compressor spares directly from worn samples or 2D/3D CAD models with metallurgical chemical analysis.</p>
              <Link href="/productsourcing" className="service-link">Explore Sourcing Support →</Link>
            </div>
          </div>

          <div className="service-card">
            <div className="service-img-wrapper">
              <img src="/images/seals-kits.jpg" alt="Preventative Maintenance" />
            </div>
            <div className="service-content">
              <h3>Engineering Audits & Preventative Kits</h3>
              <p>Scheduled overhaul maintenance kits bundled with liners, pistons, rings, valves, and gaskets tailored to compressor running hours.</p>
              <Link href="/services" className="service-link">View Maintenance Packages →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPRESS DELIVERY & GLOBAL LOGISTICS STRIP */}
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

      {/* 8. WARRANTY FAQ ACCORDION */}
      <section id="faq" className="section-shell" style={{ background: "#f8fafc", borderTop: "1px solid var(--line)" }}>
        <div className="section-header">
          <span className="eyebrow">Clear Guarantees</span>
          <h2 className="section-title"><b>Frequently Asked</b> Questions & Warranty</h2>
          <p className="section-desc">
            Everything you need to know about our quality inspection, warranty claims, and shipping policies.
          </p>
          <div className="separator-line" />
        </div>

        <div className="faq-accordion">
          {faqList.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-header" onClick={() => toggleFaq(index)}>
                <span>{item.q}</span>
                <span className="faq-icon">{activeFaq === index ? "−" : "+"}</span>
              </div>
              {activeFaq === index && (
                <div className="faq-body">
                  <p style={{ margin: 0 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. HIGH-IMPACT RFQ CTA STRIP */}
      <section style={{ 
        background: `
          radial-gradient(circle at 80% 30%, rgba(2, 132, 199, 0.22) 0%, transparent 55%),
          radial-gradient(circle at 20% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 45%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(135deg, #09121f 0%, #0f1a2e 50%, #152238 100%)
        `,
        backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px, 100% 100%",
        color: "white", 
        padding: "80px 0.5in", 
        textAlign: "center" 
      }}>
        <div style={{ maxWidth: "880px", margin: "auto" }}>
          <span className="eyebrow" style={{ color: "#38bdf8", marginBottom: "14px" }}>Immediate Engineering Assistance</span>
          <h2 style={{ color: "white", fontSize: "clamp(2.2rem, 4vw, 3rem)", marginBottom: "18px", lineHeight: 1.15, fontWeight: 800 }}>
            Have an Urgent Compressor Spare Requirement?
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#e0f2fe", marginBottom: "35px", lineHeight: 1.7, maxWidth: "780px", margin: "0 auto 35px" }}>
            Our engineering desk is on standby. Request an instant automated quotation, browse our 10,000+ line items catalog, or connect with a technical specialist on WhatsApp.
          </p>
          <div style={{ display: "flex", gap: "18px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber" style={{ fontSize: "1.05rem", padding: "14px 28px" }}>
              📋 Open Quote Builder
            </button>
            <Link href="/contact" className="btn btn-outline-white" style={{ fontSize: "1.05rem", padding: "14px 28px" }}>
              Send Drawing or Part Ref →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
