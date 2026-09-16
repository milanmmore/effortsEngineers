"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { QuoteContext } from "@/context/QuoteContext";
import logo from '../images/logo.jpg';
import CONTACT_CONFIG from "@/config/contactConfig";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { items, setIsDrawerOpen } = useContext(QuoteContext);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Top Industrial Announcement Bar (Amocon-inspired) */}
      <div className="top-announcement-bar">
        <div className="announcement-inner">
          <div className="announcement-left">
            <span className="announcement-badge">Express Dispatch</span>
            <span>⚡ Ready Stock 24-48h Delivery Across India & 45+ Export Countries | ISO 9001:2015</span>
          </div>
          <div className="announcement-right">
            <a href={`tel:${CONTACT_CONFIG.phoneRaw}`}>📞 {CONTACT_CONFIG.phone}</a>
            <a href={`mailto:${CONTACT_CONFIG.primaryEmail}`}>✉️ {CONTACT_CONFIG.primaryEmail}</a>
            <a href={`https://wa.me/${CONTACT_CONFIG.whatsappRaw}`} target="_blank" rel="noreferrer" style={{ color: "#25d366" }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="brand-mark">
            <div className="brand-logo-icon">
              <img src={logo.src} alt="Efforts Engineers logo" />
            </div>
            <div className="brand-text-col">
              <span className="brand-title">EFFORTS <span>ENGINEERS</span></span>
              <span className="brand-tagline">Compressor Spares & Overhaul</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className={`nav-links ${isOpen ? "is-open" : ""}`}>
            <Link href="/" className={isActive("/") ? "active" : ""} onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/products" className={isActive("/products") ? "active" : ""} onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link href="/services" className={isActive("/services") ? "active" : ""} onClick={() => setIsOpen(false)}>
              Services & Projects
            </Link>
            <Link href="/global-reach" className={isActive("/global-reach") ? "active" : ""} onClick={() => setIsOpen(false)}>
              Global Reach
            </Link>
            <Link href="/warranty" className={isActive("/warranty") ? "active" : ""} onClick={() => setIsOpen(false)}>
              Warranty & FAQ
            </Link>
            <Link href="/about" className={isActive("/about") ? "active" : ""} onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className={isActive("/contact") ? "active" : ""} onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            {user?.role === "client" && (
              <Link href="/client/dashboard" className={isActive("/client/dashboard") ? "active" : ""} onClick={() => setIsOpen(false)}>
                Client Portal
              </Link>
            )}

            {user?.role === "admin" && (
              <Link href="/admin/dashboard" className={isActive("/admin/dashboard") ? "active" : ""} onClick={() => setIsOpen(false)}>
                Admin Panel
              </Link>
            )}
          </div>

          {/* Action CTAs */}
          <div className="nav-actions">
            <button
              className="quote-counter-btn"
              onClick={() => setIsDrawerOpen(true)}
              title="Open Quotation Builder"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              <span>Quote Builder</span>
              {items.length > 0 && (
                <span className="quote-badge-count">{items.length}</span>
              )}
            </button>

            {user ? (
              <button onClick={logout} className="nav-btn nav-btn-outline">
                Logout ({user.role})
              </button>
            ) : (
              <Link href="/auth/login" className="nav-btn nav-btn-primary">
                Portal Login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="menu-toggle"
              aria-label="Toggle Navigation"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
