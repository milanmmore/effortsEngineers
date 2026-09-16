"use client";
import React from "react";
import Link from "next/link";
import CONTACT_CONFIG from "@/config/contactConfig";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-col">
            <h4>Efforts Engineers</h4>
            <p>
              Established over three decades ago in Pune, Efforts Engineers is a premier manufacturer and global exporter of high-precision replacement spare parts for industrial refrigeration, cold chain, marine HVAC, and air compressors.
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className="badge badge-in-stock" style={{ background: "#1e293b", color: "#38bdf8", border: "1px solid #334155" }}>
                ISO 9001:2015 Certified
              </span>
              <span className="badge badge-in-stock" style={{ background: "#1e293b", color: "#34d399", border: "1px solid #334155" }}>
                1-Year Zero-Defect Guarantee
              </span>
            </div>
          </div>

          {/* Column 2: Compatible Compressor Brands (Amocon style) */}
          <div className="footer-col">
            <h4>Compatible Brands</h4>
            <ul>
              <li><Link href="/products?brand=Grasso">Grasso (RC9, RC11, RC12)</Link></li>
              <li><Link href="/products?brand=Bitzer">Bitzer (4N, 4P, 4T, 6F, 4G)</Link></li>
              <li><Link href="/products?brand=Kirloskar">Kirloskar (KC, KCX, BT, TC)</Link></li>
              <li><Link href="/products?brand=Carrier">Carrier (5F, 5H, 06D, 06E)</Link></li>
              <li><Link href="/products?brand=Sabroe">Sabroe (CMO, SMC series)</Link></li>
              <li><Link href="/products?brand=Bock">Bock (F3, F4, F5, F16)</Link></li>
              <li><Link href="/products?brand=Daikin">Daikin (C55, C58, C75)</Link></li>
              <li><Link href="/products?brand=Vilter">Vilter (440, 450, 450XL)</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Portals & Certificates */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/products">Live Stock Catalog</Link></li>
              <li><Link href="/services">Consultancy & Industrial Projects</Link></li>
              <li><Link href="/global-reach">Global Reach & Logistics</Link></li>
              <li><Link href="/global-reach#certificates">Downloadable Certificates</Link></li>
              <li><Link href="/warranty">1-Year Warranty & RMA Claim</Link></li>
              <li><Link href="/about">Company Story & Timeline</Link></li>
              <li><Link href="/client/dashboard">Customer Portal & Order Tracking</Link></li>
              <li><Link href="/contact">Inquiry & RFQ Desk</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Factory Address */}
          <div className="footer-col">
            <h4>Headquarters & Plant</h4>
            <p style={{ marginBottom: "12px" }}>
              📍 <strong>Corporate Office:</strong><br />
              Efforts Engineers, Erandwane, Pune - 411004, Maharashtra, India.
            </p>
            <p style={{ marginBottom: "12px" }}>
              🏭 <strong>Manufacturing Plant:</strong><br />
              Plot 48, MIDC Bhosari Industrial Area, Pune - 411026.
            </p>
            <p style={{ margin: "4px 0" }}>
              📞 <strong>Tel:</strong> <a href={`tel:${CONTACT_CONFIG.phoneRaw}`} style={{ color: "#38bdf8" }}>{CONTACT_CONFIG.phone}</a>
            </p>
            <p style={{ margin: "4px 0" }}>
              ✉️ <strong>Email:</strong> <a href={`mailto:${CONTACT_CONFIG.primaryEmail}`} style={{ color: "#38bdf8" }}>{CONTACT_CONFIG.primaryEmail}</a>
            </p>
            <p style={{ margin: "4px 0" }}>
              💬 <strong>WhatsApp:</strong> <a href={`https://wa.me/${CONTACT_CONFIG.whatsappRaw}`} target="_blank" rel="noreferrer" style={{ color: "#34d399" }}>{CONTACT_CONFIG.whatsapp}</a>
            </p>
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
        </div>
      </div>
    </footer>
  );
}
