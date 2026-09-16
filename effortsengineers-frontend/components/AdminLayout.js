"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <ProtectedRoute role="admin">
      <div className="portal-shell">
        <aside className="portal-sidebar portal-sidebar-admin">
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Operations Console</span>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>Admin Panel</h2>
          <nav>
            <ul className="portal-nav-list">
              <li>
                <Link href="/admin/dashboard" className={isActive("/admin/dashboard") ? "active" : ""}>
                  📊 Dashboard & KPIs
                </Link>
              </li>
              <li>
                <Link href="/admin/inventory" className={isActive("/admin/inventory") ? "active" : ""}>
                  📦 Stock & Inventory
                </Link>
              </li>
              <li>
                <Link href="/admin/quotations" className={isActive("/admin/quotations") ? "active" : ""}>
                  📋 Quotations Approval
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className={isActive("/admin/orders") ? "active" : ""}>
                  🚚 Order Fulfillment
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="portal-content">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
