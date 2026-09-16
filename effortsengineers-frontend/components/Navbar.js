"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();
  const navRef = useRef(null);

  const isActive = (path) => pathname === path;
  const isSolutionsActive = ["/products", "/services", "/productsourcing"].includes(pathname);
  const isCompanyActive = ["/about", "/warranty", "/contact"].includes(pathname);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile nav and dropdowns on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

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

          {/* Desktop & Mobile Navigation Links */}
          <div className={`nav-links ${isOpen ? "is-open" : ""}`} ref={navRef}>
            {/* 1. Home */}
            <Link href="/" className={isActive("/") ? "active" : ""} onClick={closeAll}>
              Home
            </Link>

            {/* 2. Solutions & Spares Dropdown */}
            <div className={`nav-dropdown ${activeDropdown === "solutions" ? "is-open" : ""}`}>
              <button
                type="button"
                className={`nav-dropdown-trigger ${isSolutionsActive ? "has-active-child" : ""}`}
                onClick={() => toggleDropdown("solutions")}
                aria-expanded={activeDropdown === "solutions"}
              >
                <span>Solutions &amp; Spares</span>
                <span className="dropdown-chevron">▼</span>
              </button>
              <div className="dropdown-menu">
                <Link
                  href="/products"
                  className={`dropdown-item ${isActive("/products") ? "active" : ""}`}
                  onClick={closeAll}
                >
                  <span className="dropdown-item-icon">📦</span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">Products &amp; Catalog</span>
                    <span className="dropdown-item-desc">Ammonia, Freon, Air &amp; Gas compressor spares</span>
                  </div>
                </Link>
                <Link
                  href="/services"
                  className={`dropdown-item ${isActive("/services") ? "active" : ""}`}
                  onClick={closeAll}
                >
                  <span className="dropdown-item-icon">⚙️</span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">Services &amp; Projects</span>
                    <span className="dropdown-item-desc">Compressor overhaul, retrofitting &amp; repair</span>
                  </div>
                </Link>
                <Link
                  href="/productsourcing"
                  className={`dropdown-item ${isActive("/productsourcing") ? "active" : ""}`}
                  onClick={closeAll}
                >
                  <span className="dropdown-item-icon">🔍</span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">Custom Sourcing</span>
                    <span className="dropdown-item-desc">Hard-to-find spares &amp; reverse engineering</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* 3. Global Reach */}
            <Link href="/global-reach" className={isActive("/global-reach") ? "active" : ""} onClick={closeAll}>
              Global Reach
            </Link>

            {/* 4. Company & Support Dropdown */}
            <div className={`nav-dropdown ${activeDropdown === "company" ? "is-open" : ""}`}>
              <button
                type="button"
                className={`nav-dropdown-trigger ${isCompanyActive ? "has-active-child" : ""}`}
                onClick={() => toggleDropdown("company")}
                aria-expanded={activeDropdown === "company"}
              >
                <span>Company &amp; Support</span>
                <span className="dropdown-chevron">▼</span>
              </button>
              <div className="dropdown-menu">
                <Link
                  href="/about"
                  className={`dropdown-item ${isActive("/about") ? "active" : ""}`}
                  onClick={closeAll}
                >
                  <span className="dropdown-item-icon">🏢</span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">About Us</span>
                    <span className="dropdown-item-desc">40+ years heritage, plant &amp; certifications</span>
                  </div>
                </Link>
                <Link
                  href="/warranty"
                  className={`dropdown-item ${isActive("/warranty") ? "active" : ""}`}
                  onClick={closeAll}
                >
                  <span className="dropdown-item-icon">🛡️</span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">Warranty &amp; FAQ</span>
                    <span className="dropdown-item-desc">OEM standards, warranty terms &amp; answers</span>
                  </div>
                </Link>
                <Link
                  href="/contact"
                  className={`dropdown-item ${isActive("/contact") ? "active" : ""}`}
                  onClick={closeAll}
                >
                  <span className="dropdown-item-icon">📞</span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">Contact Us</span>
                    <span className="dropdown-item-desc">Direct RFQs, plant visits &amp; 24/7 hotline</span>
                  </div>
                </Link>
              </div>
            </div>

            {user?.role === "client" && (
              <Link href="/client/dashboard" className={isActive("/client/dashboard") ? "active" : ""} onClick={closeAll}>
                Client Portal
              </Link>
            )}

            {user?.role === "admin" && (
              <Link href="/admin/dashboard" className={isActive("/admin/dashboard") ? "active" : ""} onClick={closeAll}>
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
