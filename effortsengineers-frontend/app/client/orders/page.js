"use client";
import React, { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import Link from "next/link";

export default function ClientOrdersPage() {
  const [orders] = useState([
    {
      id: "EE-ORD-9921",
      quoteRef: "EE-QT-2026-8912",
      date: "2026-02-28",
      items: "Grasso RC11 Cylinder Liners (4x), Piston Rings (4x), Valve Assemblies (4x)",
      amount: 42800,
      status: "Dispatched",
      courier: "Blue Dart Express Air",
      awb: "BLUEDART-8829104",
      estDelivery: "2026-03-02",
      destination: "Konkan Cold Storage, Ratnagiri, Maharashtra",
      warrantyCode: "WTY-EE-2026-9921",
    },
    {
      id: "EE-ORD-9844",
      quoteRef: "EE-QT-2026-8704",
      date: "2026-02-16",
      items: "Carrier 5H120 Connecting Rods (2x), Valve Discs (4x)",
      amount: 20600,
      status: "Delivered",
      courier: "DHL Priority Cargo",
      awb: "DHL-44029104",
      estDelivery: "2026-02-18",
      destination: "Marine Reefer Services, Nhava Sheva Port, Mumbai",
      warrantyCode: "WTY-EE-2026-9844",
    },
    {
      id: "EE-ORD-9710",
      quoteRef: "EE-QT-2026-8450",
      date: "2026-01-22",
      items: "Kirloskar KC6 Forged Rods (2x), Main Bushes (2x)",
      amount: 64200,
      status: "Delivered",
      courier: "Blue Dart Air",
      awb: "BLUEDART-7718902",
      estDelivery: "2026-01-24",
      destination: "Mahalaxmi Dairy Products, Kolhapur, Maharashtra",
      warrantyCode: "WTY-EE-2026-9710",
    },
  ]);

  return (
    <ClientLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Consignment Tracking</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Orders & Express Dispatches</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Monitor real-time courier dispatch status, tracking AWB references, and registered 1-year warranty codes.
          </p>
        </div>
        <Link href="/client/quotation" className="btn btn-outline">
          📄 View Quotation Invoices
        </Link>
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {orders.map((ord) => (
          <div
            key={ord.id}
            style={{
              background: "white",
              border: "1px solid var(--line)",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "var(--shadow-sm)",
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "24px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{ord.id}</h3>
                <span className={`badge ${ord.status === "Delivered" ? "badge-in-stock" : "badge-order"}`}>
                  ● {ord.status}
                </span>
              </div>
              <p style={{ margin: "2px 0 10px", fontSize: "0.82rem", color: "var(--text-dim)" }}>
                Quotation Ref: <strong>{ord.quoteRef}</strong> | Ordered on: {ord.date}
              </p>
              <p style={{ fontSize: "0.92rem", color: "var(--navy)", fontWeight: 600, margin: "0 0 10px" }}>
                {ord.items}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                📍 Destination: {ord.destination}
              </p>
            </div>

            <div style={{ background: "var(--bg-page)", padding: "18px", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Courier:</span>
                  <strong style={{ fontSize: "0.85rem" }}>{ord.courier}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Tracking Number:</span>
                  <code style={{ fontSize: "0.85rem", color: "var(--primary)" }}>{ord.awb}</code>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Est. Delivery:</span>
                  <strong style={{ fontSize: "0.85rem", color: "var(--accent-green)" }}>{ord.estDelivery}</strong>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78rem", color: "#065f46", fontWeight: 700 }}>
                  🛡️ Warranty: {ord.warrantyCode}
                </span>
                <Link href="/warranty" className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
                  Warranty Info →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ClientLayout>
  );
}

