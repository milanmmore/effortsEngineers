"use client";
import React from "react";
import Link from "next/link";
import CONTACT_CONFIG from "@/config/contactConfig";

const compatibleBrands = [
  { brand: "Grasso", label: "Grasso (RC9, RC11, RC12)" },
  { brand: "Bitzer", label: "Bitzer (4N, 4P, 4T, 6F, 4G)" },
  { brand: "Kirloskar", label: "Kirloskar (KC, KCX, BT, TC)" },
  { brand: "Carrier", label: "Carrier (5F, 5H, 06D, 06E)" },
  { brand: "Sabroe", label: "Sabroe (CMO, SMC series)" },
  { brand: "Bock", label: "Bock (F3, F4, F5, F16)" },
  { brand: "Daikin", label: "Daikin (C55, C58, C75)" },
  { brand: "Vilter", label: "Vilter (440, 450, 450XL)" },
  { brand: "York", label: "York" },
  { brand: "Copeland", label: "Copeland" },
  { brand: "Trane", label: "Trane" },
  { brand: "Ingersoll Rand", label: "Ingersoll Rand" },
  { brand: "Atlas Copco", label: "Atlas Copco" },
  { brand: "CPT", label: "CPT" },
  { brand: "Accel Sabroe", label: "Accel Sabroe" },
  { brand: "Voltas", label: "Voltas" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-col">
            <h4>Efforts Engineers</h4>
            <p>
              {CONTACT_CONFIG.yearsInBusinessText}. Efforts Engineers supplies replacement spare parts for industrial refrigeration, cold chain, marine HVAC, and air compressors.
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
              {compatibleBrands.map(({ brand, label }) => (
                <li key={brand}>
                  <Link href={`/products?brand=${encodeURIComponent(brand)}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Portals & Certificates */}
          <div className="footer-col">
            <h4>Quick Links</h4>
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
            {CONTACT_CONFIG.locations.map((location) => (
              <p key={location.id} style={{ marginBottom: "12px" }}>
                📍 <strong>{location.shop} · {location.role}:</strong><br />
                {location.address}
              </p>
            ))}
            <p style={{ margin: "4px 0" }}>
              📞 <strong>Phone / WhatsApp:</strong> <a href={`tel:${CONTACT_CONFIG.phoneRaw}`} style={{ color: "#38bdf8" }}>{CONTACT_CONFIG.phone}</a>
            </p>
            <p style={{ margin: "4px 0" }}>
              ✉️ <strong>Email:</strong><br />
              {CONTACT_CONFIG.emails.map((email, index) => (
                <React.Fragment key={email}>
                  {index > 0 && <br />}
                  <a href={`mailto:${email}`} style={{ color: "#38bdf8" }}>{email}</a>
                </React.Fragment>
              ))}
            </p>
            <a href={`https://wa.me/${CONTACT_CONFIG.whatsappRaw}`} target="_blank" rel="noreferrer" style={{ color: "#34d399" }}>Message us on WhatsApp</a>
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
