"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ClientProtectedRoute from "@/components/ClientProtectedRoute";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <ClientProtectedRoute>
      <div className="portal-shell">
        <aside className="portal-sidebar portal-sidebar-client">
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Customer Workspace</span>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>Client Portal</h2>
          <nav>
            <ul className="portal-nav-list">
              <li>
                <Link href="/client/dashboard" className={isActive("/client/dashboard") ? "active" : ""}>
                  📊 Overview & KPIs
                </Link>
              </li>
              <li>
                <Link href="/client/quotation" className={isActive("/client/quotation") ? "active" : ""}>
                  📄 Download Quotes
                </Link>
              </li>
              <li>
                <Link href="/client/orders" className={isActive("/client/orders") ? "active" : ""}>
                  🚚 Orders & Dispatches
                </Link>
              </li>
              <li>
                <Link href="/products" className={isActive("/products") ? "active" : ""}>
                  📦 Browse Catalog
                </Link>
              </li>
              <li>
                <Link href="/warranty" className={isActive("/warranty") ? "active" : ""}>
                  🛡️ Warranty Check
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="portal-content">
          {children}
        </main>
      </div>
    </ClientProtectedRoute>
  );
}
