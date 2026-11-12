"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ClientProtectedRoute from "@/components/ClientProtectedRoute";
import InterfaceIcon from "@/components/InterfaceIcon";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <ClientProtectedRoute>
      <div className="portal-shell">
        <aside className="portal-sidebar portal-sidebar-client">
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Customer Workspace</span>
          <p className="eyebrow" style={{ fontSize: "1rem", marginBottom: "20px" }}>Client Portal</p>
          <nav>
            <ul className="portal-nav-list">
              <li>
                <Link href="/client/dashboard" className={isActive("/client/dashboard") ? "active" : ""}>
                  📊 Overview & KPIs
                </Link>
              </li>
              <li>
                <Link href="/client/quotation" className={isActive("/client/quotation") ? "active" : ""}>
                  📄 Quotation Records
                </Link>
              </li>
              <li>
                <Link href="/client/orders" className={isActive("/client/orders") ? "active" : ""}>
                  🚚 Orders
                </Link>
              </li>
              <li>
                <Link href="/client/catalog" className={isActive("/client/catalog") ? "active" : ""}>
                  <InterfaceIcon name="box" size={18} /> Browse Catalog
                </Link>
              </li>
              <li>
                <Link href="/warranty" className={isActive("/warranty") ? "active" : ""}>
                  🛡️ Warranty Claims
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
