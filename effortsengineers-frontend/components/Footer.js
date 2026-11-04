"use client";
import React from "react";
import Link from "next/link";
import SITE_CONFIG from "@/config/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-col">
            <h4>Efforts Engineers</h4>
            <p>
              {SITE_CONFIG.yearsInBusinessText}. Efforts Engineers supplies replacement spare parts for industrial refrigeration, cold chain, marine HVAC, and air compressors.
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className="badge badge-in-stock" style={{ background: "#1e293b", color: "#38bdf8", border: "1px solid #334155" }}>
                Supplier documentation available on request
              </span>
              <span className="badge badge-in-stock" style={{ background: "#1e293b", color: "#34d399", border: "1px solid #334155" }}>
                Warranty terms as stated in the accepted quotation
              </span>
            </div>
          </div>

          {/* Column 2: Compatible Compressor Brands (Amocon style) */}
          <div className="footer-col">
            <h4>Compatible Brands</h4>
            <ul>
              {SITE_CONFIG.brands.map(({ name, label }) => (
                <li key={name}>
                  <Link href={`/products?brand=${encodeURIComponent(name)}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Documentation */}
          <div className="footer-col">
            <h4>Quick Links &amp; Documentation</h4>
            <ul>
              <li><Link href="/products">Product Catalog</Link></li>
              <li><Link href="/services">Consultancy & Industrial Projects</Link></li>
              <li><Link href="/global-reach">Global Reach & Logistics</Link></li>
              <li><Link href="/contact">Request Order Documentation</Link></li>
              <li><Link href="/warranty">Warranty Terms & Support</Link></li>
              <li><Link href="/about">Company Story & Timeline</Link></li>
              <li><Link href="/client/dashboard">Customer Portal & Order Tracking</Link></li>
              <li><Link href="/contact">Inquiry & RFQ Desk</Link></li>
            </ul>
          </div>

          {/* Column 4: Pune Locations & Contact */}
          <div className="footer-col">
            <h4>Pune Locations &amp; Contact</h4>
            {SITE_CONFIG.locations.map((location) => (
              <p key={location.id} style={{ marginBottom: "12px" }}>
                📍 <strong>{location.shop} · {location.role}:</strong><br />
                {location.address}<br />
                <a href={location.mapUrl} target="_blank" rel="noreferrer" style={{ color: "#38bdf8" }}>View on Google Maps</a>
              </p>
            ))}
            <p style={{ margin: "4px 0" }}>
              📞 <strong>Phone / WhatsApp:</strong> <a href={`tel:${SITE_CONFIG.phoneRaw}`} style={{ color: "#38bdf8" }}>{SITE_CONFIG.phone}</a>
            </p>
            <p style={{ margin: "4px 0" }}>
              ✉️ <strong>Email:</strong><br />
              {SITE_CONFIG.emails.map((email, index) => (
                <React.Fragment key={email}>
                  {index > 0 && <br />}
                  <a href={`mailto:${email}`} style={{ color: "#38bdf8" }}>{email}</a>
                </React.Fragment>
              ))}
            </p>
            <a href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`} target="_blank" rel="noreferrer" style={{ color: "#34d399" }}>Message us on WhatsApp</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Efforts Engineers. All rights reserved. Designed for industrial reliability.
          </div>
          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
            *Disclaimer: All manufacturer names, symbols, numbers, and descriptions are used solely for reference and identification purposes.
          </div>
          <a
            href="https://www.facebook.com/effortsengg/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Efforts Engineers on Facebook"
            style={{ color: "#38bdf8", fontWeight: 600 }}
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
