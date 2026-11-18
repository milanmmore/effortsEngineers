"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { QuoteContext } from "@/context/QuoteContext";
import logo from "@/images/logo.jpg";
import { BRAND_INFO } from "@/lib/siteConfig";
import TopBar from "./TopBar";
import NavItems from "./NavItems";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { items, setIsDrawerOpen } = useContext(QuoteContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Industrial Announcement Bar */}
      <TopBar />

      {/* Main Sticky Navigation */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="brand-mark">
            <div className="brand-logo-icon">
              <img src={logo.src} alt="Efforts Engineers logo" />
            </div>
            <div className="brand-text-col">
              <span className="brand-title">
                {BRAND_INFO.titlePrefix} <span>{BRAND_INFO.titleSuffix}</span>
              </span>
              <span className="brand-tagline">{BRAND_INFO.tagline}</span>
            </div>
          </Link>

          {/* Desktop & Mobile Navigation Links */}
          <div className={`nav-links ${isOpen ? "is-open" : ""}`} ref={navRef}>
            <NavItems
              pathname={pathname}
              activeDropdown={activeDropdown}
              toggleDropdown={toggleDropdown}
              closeAll={closeAll}
              user={user}
              logout={logout}
              items={items}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </div>

          {/* Action CTAs */}
          <div className="nav-actions">
            <button
              type="button"
              className="quote-counter-btn"
              onClick={() => setIsDrawerOpen(true)}
              title="Open Quote Builder"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
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
              aria-expanded={isOpen}
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

export { Header as Navbar };
