import React from "react";
import Link from "next/link";
import InterfaceIcon from "@/components/InterfaceIcon";

export default function NotFound() {
  return (
    <main className="section-shell" style={{ textAlign: "center", padding: "80px 20px", maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ display: "inline-flex", padding: "16px", background: "#f0f9ff", borderRadius: "50%", color: "var(--primary)", marginBottom: "20px" }}>
        <InterfaceIcon name="search" size={48} />
      </div>
      <span className="eyebrow">404 — Page Not Found</span>
      <h1 className="section-title" style={{ marginTop: "10px", marginBottom: "16px" }}>
        We couldn&apos;t find that page
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "30px" }}>
        The link may be outdated or the page may have moved. You can browse our compressor parts catalog or get in touch with our Pune sourcing team.
      </p>
      <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/" className="btn btn-outline">
          ← Back to Home
        </Link>
        <Link href="/products" className="btn btn-primary">
          Browse Parts Catalog
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Contact Sourcing Desk
        </Link>
      </div>
    </main>
  );
}
