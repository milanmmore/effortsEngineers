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

  const servicesList = [
    {
      title: "Industrial Automation",
      description: "PLC, HMI and SCADA system development and integration.",
      icon: "settings",
    },
    {
      title: "Electrical Engineering",
      description: "Electrical system design, implementation and commissioning.",
      icon: "bolt",
    },
    {
      title: "Instrumentation Solutions",
      description: "Industrial instrumentation, calibration and process control systems.",
      icon: "clipboard",
    },
    {
      title: "IIoT & Digitalization",
      description: "Smart monitoring, data analytics and connected industrial solutions.",
      icon: "box",
    },
    {
      title: "Control Panel Engineering",
      description: "Design, manufacturing and testing of industrial control panels.",
      icon: "shield",
    },
    {
      title: "Engineering Consultancy",
      description: "Technical advisory, project execution and engineering support.",
      icon: "wrench",
    },
  ];

  const whyChooseUsPoints = [
    {
      title: "Decades of Experience",
      description: "Delivering engineering solutions since 1986.",
      icon: "building",
    },
    {
      title: "Technical Expertise",
      description: "Skilled professionals across automation, electrical and instrumentation domains.",
      icon: "bolt",
    },
    {
      title: "Quality-Focused Approach",
      description: "Solutions designed and executed using proven engineering practices.",
      icon: "shield",
    },
    {
      title: "Customer-Centric Service",
      description: "Committed support throughout the project lifecycle.",
      icon: "settings",
    },
  ];

  return (
    <main>
      {/* 1. HERO BANNER */}
      <section className="hero-industrial">
        <div className="hero-container">
          {/* Left Hero Content */}
          <div>
            <div className="hero-badge-pill">
              <span>★</span> {SITE_CONFIG.tagline}
            </div>
            <h1 className="hero-title">
              Engineering Excellence <span>Since 1986</span>
            </h1>
            <p style={{ fontSize: "1.18rem", fontWeight: 600, color: "var(--amber)", marginBottom: "14px", lineHeight: 1.45 }}>
              Delivering Industrial Automation, Electrical, Instrumentation and Digital Engineering Solutions for Modern Industries.
            </p>
            <p className="hero-subtitle">
              Efforts Engineers helps industries enhance productivity, reliability and operational efficiency through innovative automation systems, engineering expertise and technology-driven solutions.
            </p>
            <div className="hero-cta-row">
              <Link href="/services" className="btn btn-primary hero-btn">
                Our Services
              </Link>
              <Link href="/contact" className="btn btn-amber hero-btn">
                Contact Us
              </Link>
            </div>

            {/* Statistics / Highlights Section */}
            <dl className="hero-stats-strip">
              <div className="hero-stat-item">
                <dt style={{ fontSize: "1.1rem", lineHeight: 1.25 }}>40+ Years</dt>
                <dd style={{ textTransform: "none", letterSpacing: "normal", fontSize: "0.78rem" }}>Industry Experience</dd>
              </div>
              <div className="hero-stat-item">
                <dt style={{ fontSize: "1.02rem", lineHeight: 1.25 }}>Automation Solutions</dt>
                <dd style={{ textTransform: "none", letterSpacing: "normal", fontSize: "0.78rem" }}>PLC, SCADA &amp; IIoT Systems</dd>
              </div>
              <div className="hero-stat-item">
                <dt style={{ fontSize: "1.02rem", lineHeight: 1.25 }}>Engineering Expertise</dt>
                <dd style={{ textTransform: "none", letterSpacing: "normal", fontSize: "0.78rem" }}>Electrical &amp; Instrumentation Services</dd>
              </div>
              <div className="hero-stat-item">
                <dt style={{ fontSize: "1.02rem", lineHeight: 1.25 }}>Customer Focused</dt>
                <dd style={{ textTransform: "none", letterSpacing: "normal", fontSize: "0.78rem" }}>Reliable Project Delivery</dd>
              </div>
            </dl>
          </div>

          {/* Right Hero Enquiry Callout */}
          <div className="hero-rfq-card">
            <div className="rfq-card-header">
              <span className="eyebrow" style={{ color: "var(--primary)" }}>Engineering Enquiries</span>
              <h2>Discuss Your Requirement</h2>
              <p>Share your technical specifications or project needs. Our engineering and technical teams will review and provide custom engineering support.</p>
            </div>
            <Link href="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Get In Touch →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ABOUT COMPANY SECTION */}
      <section className="section-shell" id="about" style={{ background: "#f8fafc" }}>
        <div className="section-header">
          <span className="eyebrow">Company Profile</span>
          <h2 className="section-title"><b>About</b> Efforts Engineers</h2>
          <div className="separator-line" />
        </div>
        <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center", fontSize: "1.08rem", lineHeight: 1.8, color: "var(--text)" }}>
          <p style={{ marginBottom: "18px" }}>
            Established in 1986, Efforts Engineers is a trusted provider of industrial automation, electrical, instrumentation and engineering solutions. Our commitment to quality, innovation and customer satisfaction enables industries to achieve greater efficiency, reliability and sustainable growth.
          </p>
          <p style={{ color: "var(--text-muted)", margin: "0 0 24px" }}>
            We partner with our customers to deliver tailored engineering solutions that meet evolving industrial requirements and operational challenges.
          </p>
          <div>
            <Link href="/about" className="btn btn-outline">
              Learn More About Our Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="section-shell" style={{ background: "#f0f9ff" }}>
        <div className="section-header">
          <span className="eyebrow">Proven Engineering Heritage</span>
          <h2 className="section-title"><b>Why Industries Trust</b> Efforts Engineers</h2>
          <p className="section-desc">
            Partnering with manufacturing, process, and industrial facilities with reliable and technology-driven engineering solutions.
          </p>
          <div className="separator-line" />
        </div>

        <div className="why-choose-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {whyChooseUsPoints.map((point, idx) => (
            <div key={idx} className="why-card">
              <div className="why-icon-box"><InterfaceIcon name={point.icon} size={24} /></div>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="section-shell" id="services">
        <div className="section-header">
          <span className="eyebrow">Comprehensive Solutions</span>
          <h2 className="section-title"><b>Our</b> Services</h2>
          <p className="section-desc">
            End-to-end industrial automation, electrical, and instrumentation services tailored to modern industrial requirements.
          </p>
          <div className="separator-line" />
        </div>

        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", marginBottom: "40px" }}>
          {servicesList.map((service, idx) => (
            <div
              key={idx}
              className="service-card"
              style={{
                padding: "30px",
                borderTop: "4px solid var(--primary)",
                background: "white",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                borderTopColor: "var(--primary)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ color: "var(--primary)", marginBottom: "16px" }}>
                <InterfaceIcon name={service.icon} size={30} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>{service.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0, flex: 1 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/services" className="btn btn-outline">
            View All Services &amp; Projects →
          </Link>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section style={{ 
        background: `
          radial-gradient(circle at 85% 30%, rgba(2, 132, 199, 0.2) 0%, transparent 55%),
          radial-gradient(circle at 15% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 45%),
          linear-gradient(135deg, #09121f 0%, #0f1a2e 50%, #152238 100%)
        `,
        color: "white", 
        padding: "70px 1rem",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 800, marginBottom: "18px" }}>
            Ready to Transform Your Industrial Operations?
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: "1.15rem", lineHeight: 1.65, marginBottom: "30px" }}>
            Partner with Efforts Engineers to implement innovative engineering and automation solutions that improve efficiency, reliability and performance.
          </p>
          <Link href="/contact" className="btn btn-amber" style={{ padding: "14px 32px", fontSize: "1.05rem", fontWeight: 700 }}>
            Get In Touch
          </Link>
        </div>
      </section>

      {/* 6. COMPATIBILITY & CATALOG (OPTIONAL IF PREVIEWED) */}
      {brandRangesSection}

      {/* 7. ENQUIRY SECTION */}
      <section id="home-enquiry" className="section-shell" style={{ background: "#f8fafc" }}>
        <div className="section-header">
          <span className="eyebrow">Engineering Enquiries</span>
          <h2 className="section-title"><b>Tell Us What</b> You Need</h2>
          <p className="section-desc">
            Share your contact details and engineering requirement. Standard, urgent, and custom automation requests are all welcome.
          </p>
          <div className="separator-line" />
        </div>
        <EnquiryForm source="Home page" title="Submit an Engineering & Automation Enquiry" />
      </section>

      <HowItWorks />
    </main>
  );
}
