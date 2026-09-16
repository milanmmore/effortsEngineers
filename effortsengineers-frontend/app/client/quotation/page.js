"use client";
import React, { useContext, useEffect, useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import { AuthContext } from "@/context/AuthContext";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";
import CONTACT_CONFIG from "@/config/contactConfig";

const DEFAULT_QUOTES = [
  {
    id: 1042,
    rfq_number: "EE-QT-2026-8912",
    date: "2026-02-28",
    valid_until: "2026-03-30",
    customer_name: "Ramesh Kulkarni",
    company: "Konkan Cold Storage Ltd",
    email: "ramesh@konkancold.in",
    phone: "+91 98230 45671",
    status: "Approved",
    items: [
      { name: "Cylinder Liner - Grasso RC11", oem_no: "GRA-RC11-LIN", hsn: "84189900", qty: 4, rate: 6800 },
      { name: "PTFE & Cast Iron Piston Ring Set - Grasso RC11", oem_no: "GRA-RC11-RNG", hsn: "84849000", qty: 4, rate: 2200 },
      { name: "Suction & Discharge Valve Assembly", oem_no: "GRA-RC11-VLV", hsn: "84818090", qty: 4, rate: 4500 },
      { name: "Overhaul Gasket & Seal Pack (Ammonia Grade)", oem_no: "GRA-RC11-GSK", hsn: "84841000", qty: 1, rate: 3800 },
    ],
    terms: "Ex-Works Pune Warehouse • Express Air Dispatch within 24 Hours • 1-Year Zero Defect Replacement Warranty Included",
  },
  {
    id: 1038,
    rfq_number: "EE-QT-2026-8704",
    date: "2026-02-15",
    valid_until: "2026-03-15",
    customer_name: "Capt. Arvind Nair",
    company: "Marine Reefer Services",
    email: "technical@marinereefer.com",
    phone: "+91 97654 11223",
    status: "Approved",
    items: [
      { name: "Connecting Rod Assembly - Carrier 5H120", oem_no: "CAR-5H-ROD", hsn: "84189900", qty: 2, rate: 8500 },
      { name: "Swedish Steel Valve Discs Set", oem_no: "CAR-5H-VLV", hsn: "84818090", qty: 4, rate: 1800 },
    ],
    terms: "FOB Nhava Sheva (JNPT) / Delivery to Port Within 12 Hours • Material Test Reports (MTC 3.1) Attached",
  },
];

export default function QuotationPage() {
  const { user } = useContext(AuthContext);
  const { setIsDrawerOpen } = useContext(QuoteContext);
  const [quotes, setQuotes] = useState(DEFAULT_QUOTES);
  const [selectedQuote, setSelectedQuote] = useState(DEFAULT_QUOTES[0]);

  useEffect(() => {
    API.get("/quotation")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Merge API quotes with default rich structure
          const merged = res.data.map((q, idx) => ({
            ...DEFAULT_QUOTES[idx % DEFAULT_QUOTES.length],
            id: q.id,
            rfq_number: `EE-QT-2026-${q.id}`,
            status: q.status || "Approved",
            customer_name: q.customer_name || user?.name || "Industrial Client",
          }));
          setQuotes(merged);
          setSelectedQuote(merged[0]);
        }
      })
      .catch(() => {
        // use default quotes
      });
  }, [user]);

  const calculateSubtotal = (items) => {
    return items.reduce((sum, it) => sum + it.qty * it.rate, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  const subtotal = calculateSubtotal(selectedQuote.items);
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  return (
    <ClientLayout>
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Automated Quotation Automation</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Official Quotations & Download</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Select an approved quote below to view the official company letterhead and download or print the formal PDF quotation.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setIsDrawerOpen(true)} className="btn btn-primary">
            + New Quote Request
          </button>
          <button onClick={handlePrint} className="btn btn-amber">
            🖨️ Download / Print Quote PDF
          </button>
        </div>
      </div>

      {/* Quote Selector Tabs (no-print) */}
      <div className="no-print" style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "12px", marginBottom: "25px" }}>
        {quotes.map((q) => (
          <div
            key={q.id}
            onClick={() => setSelectedQuote(q)}
            style={{
              background: selectedQuote.id === q.id ? "var(--primary)" : "white",
              color: selectedQuote.id === q.id ? "white" : "var(--navy)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              padding: "12px 18px",
              cursor: "pointer",
              minWidth: "220px",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{q.rfq_number}</div>
            <div style={{ fontSize: "0.78rem", opacity: 0.9 }}>Date: {q.date}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, marginTop: "6px" }}>
              ₹{calculateSubtotal(q.items).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* FORMAL PRINTABLE QUOTATION SHEET (Letterhead + Line Items + Taxes + Warranty) */}
      <div className="printable-quote-sheet">
        {/* Company Letterhead */}
        <div className="quote-sheet-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ width: 36, height: 36, background: "var(--primary)", color: "white", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem" }}>
                EE
              </div>
              <h2 style={{ margin: 0, fontSize: "1.6rem", color: "var(--navy)" }}>
                EFFORTS <span>ENGINEERS</span>
              </h2>
            </div>
            <p style={{ margin: "2px 0", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Specialists in Industrial Refrigeration & Compressor Spare Parts
            </p>
            <p style={{ margin: "2px 0", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              📍 Plot 48, MIDC Bhosari, Pune - 411026, Maharashtra, India
            </p>
            <p style={{ margin: "2px 0", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              📞 {CONTACT_CONFIG.phone} | ✉️ {CONTACT_CONFIG.primaryEmail} | GSTIN: 27AABCE9912C1ZX
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <span className="badge badge-in-stock" style={{ marginBottom: "8px" }}>
              ISO 9001:2015 Certified
            </span>
            <h3 style={{ margin: "6px 0 0", color: "var(--primary)", fontSize: "1.4rem" }}>
              PROFORMA QUOTATION
            </h3>
            <p style={{ margin: "4px 0", fontSize: "0.85rem", fontWeight: 700 }}>
              Ref: {selectedQuote.rfq_number}
            </p>
            <p style={{ margin: "2px 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Date: {selectedQuote.date}
            </p>
            <p style={{ margin: "2px 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Validity: 30 Days (Until {selectedQuote.valid_until})
            </p>
          </div>
        </div>

        {/* Client & Consignment Info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", background: "var(--bg-page)", padding: "16px 20px", borderRadius: "8px", marginBottom: "20px" }}>
          <div>
            <span style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-dim)" }}>
              Quotation Issued To:
            </span>
            <h4 style={{ margin: "4px 0", fontSize: "1rem" }}>{selectedQuote.customer_name}</h4>
            <p style={{ margin: "2px 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>{selectedQuote.company}</p>
            <p style={{ margin: "2px 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>Email: {selectedQuote.email}</p>
            <p style={{ margin: "2px 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>Phone: {selectedQuote.phone}</p>
          </div>
          <div>
            <span style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-dim)" }}>
              Dispatch & Warranty Specifications:
            </span>
            <p style={{ margin: "4px 0", fontSize: "0.85rem" }}>
              <strong>Dispatch Hub:</strong> Pune Central Engineering Warehouse
            </p>
            <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>
              <strong>Lead Time:</strong> Ready Stock (24h Express Air Dispatch)
            </p>
            <p style={{ margin: "2px 0", fontSize: "0.85rem", color: "#065f46", fontWeight: 700 }}>
              ✓ 1-Year Zero-Defect Replacement Guarantee Included
            </p>
          </div>
        </div>

        {/* Itemized Line Items Table */}
        <table className="quote-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "45%" }}>Item Description & Compressor Compatibility</th>
              <th style={{ width: "15%" }}>HSN / SAC</th>
              <th style={{ width: "10%", textAlign: "center" }}>Qty</th>
              <th style={{ width: "12%", textAlign: "right" }}>Unit Rate (₹)</th>
              <th style={{ width: "13%", textAlign: "right" }}>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {selectedQuote.items.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Part Ref: {item.oem_no}</div>
                </td>
                <td><code>{item.hsn}</code></td>
                <td style={{ textAlign: "center" }}>{item.qty}</td>
                <td style={{ textAlign: "right" }}>{item.rate.toLocaleString()}</td>
                <td style={{ textAlign: "right", fontWeight: 700 }}>{(item.qty * item.rate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals & Taxes */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
          <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal:</span>
              <strong>₹{subtotal.toLocaleString()}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
              <span>Applicable GST (18% IGST / CGST+SGST):</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid var(--primary)", paddingTop: "8px", fontSize: "1.15rem" }}>
              <span style={{ fontWeight: 700, color: "var(--navy)" }}>Total Payable:</span>
              <strong style={{ color: "var(--primary)" }}>₹{grandTotal.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Commercial Terms & Authorized Stamp */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "20px", marginTop: "25px", display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "20px", alignItems: "flex-end" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
            <h5 style={{ margin: "0 0 6px", color: "var(--navy)", fontSize: "0.85rem" }}>Standard Terms & Conditions:</h5>
            <p style={{ margin: "2px 0" }}>1. All spares are guaranteed 100% interchangeable with OEM parts.</p>
            <p style={{ margin: "2px 0" }}>2. Full 12-month manufacturer replacement warranty against material/dimensional defect.</p>
            <p style={{ margin: "2px 0" }}>3. Consignment packed in VCI anti-corrosion barrier wrapping with wooden crating.</p>
            <p style={{ margin: "2px 0" }}>4. Payment terms: 100% against proforma / dispatch approval or authorized PO terms.</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ width: "90px", height: "90px", border: "2px dashed var(--primary)", borderRadius: "50%", margin: "0 auto 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--primary)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
              <span>Efforts</span>
              <span>Engineers</span>
              <span style={{ fontSize: "0.55rem" }}>PUNE STAMP</span>
            </div>
            <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 700 }}>Authorized Signatory</p>
            <p style={{ margin: 0, fontSize: "0.68rem", color: "var(--text-dim)" }}>Technical Sales Directorate</p>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
