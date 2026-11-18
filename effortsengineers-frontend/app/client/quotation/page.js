"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import { AuthContext } from "@/context/AuthContext";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

function formatAmount(value) {
  if (value === null || value === undefined || value === "") return "Not yet recorded";
  const amount = Number(value);
  return Number.isFinite(amount) ? `₹${amount.toLocaleString()}` : "Not yet recorded";
}

export default function QuotationPage() {
  const { user } = useContext(AuthContext);
  const { setIsDrawerOpen } = useContext(QuoteContext);
  const [quotations, setQuotations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const openQuoteBuilder = useCallback(() => setIsDrawerOpen(true), [setIsDrawerOpen]);
  const printSummary = useCallback(() => window.print(), []);
  const selectQuotation = useCallback((event) => {
    const quotationId = event.currentTarget.dataset.quotationId;
    if (quotationId) setSelectedId(quotationId);
  }, []);

  useEffect(() => {
    API.get("/client/dashboard")
      .then(({ data }) => {
        const accountQuotations = Array.isArray(data?.quotations) ? data.quotations : [];
        setQuotations(accountQuotations);

        // Check if a specific quotation was requested via URL query params (?id= or ?ref=)
        let targetId = accountQuotations[0]?.id ?? null;
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const paramId = params.get("id");
          const paramRef = params.get("ref");
          const matchedFromParam = accountQuotations.find((q) => {
            if (paramId && String(q.id) === String(paramId)) return true;
            if (paramRef && (`EE-QT-${q.id}` === paramRef || String(q.id) === paramRef.replace(/^EE-QT-/, ""))) return true;
            return false;
          });
          if (matchedFromParam) {
            targetId = matchedFromParam.id;
          }
        }
        setSelectedId(targetId);
      })
      .catch((error) => {
        console.error("Failed to load customer quotations:", error);
        setLoadError("Unable to load your quotations. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const selectedQuotation = quotations.find(({ id }) => String(id) === String(selectedId));
  const quotationItems = Array.isArray(selectedQuotation?.items) ? selectedQuotation.items : [];

  return (
    <ClientLayout>
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Customer Account</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Quotations</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            View quotation records and itemized RFQs currently linked to your account.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="button" onClick={openQuoteBuilder} className="btn btn-primary">
            Request a quotation
          </button>
          <button type="button" onClick={printSummary} className="btn btn-outline" disabled={!selectedQuotation}>
            Print / Save summary
          </button>
        </div>
      </div>

      {loadError && <p role="alert" className="form-error">{loadError}</p>}
      {isLoading ? (
        <p role="status">Loading your quotations…</p>
      ) : loadError ? null : quotations.length === 0 ? (
        <div className="why-card no-print" style={{ padding: "24px" }}>
          <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>No quotations linked to this account</h2>
          <p style={{ color: "var(--text-muted)" }}>Request a quotation or contact our team if you expected to see an existing record.</p>
          <button type="button" onClick={openQuoteBuilder} className="btn btn-primary">Request a quotation</button>
        </div>
      ) : (
        <>
          <div className="no-print" style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "12px", marginBottom: "20px" }}>
            {quotations.map((quotation) => (
              <button
                type="button"
                key={quotation.id}
                data-quotation-id={quotation.id}
                aria-pressed={String(selectedId) === String(quotation.id)}
                onClick={selectQuotation}
                className={String(selectedId) === String(quotation.id) ? "btn btn-primary" : "btn btn-outline"}
                style={{ minWidth: "180px", textAlign: "left" }}
              >
                Quotation #{quotation.id}
                <br />
                <small>{formatDate(quotation.created_at)}</small>
              </button>
            ))}
          </div>

          {selectedQuotation && (
            <section className="printable-quote-sheet" aria-labelledby="quotation-summary-title">
              <header className="quote-sheet-header">
                <div>
                  <p className="eyebrow" style={{ color: "var(--primary)", margin: 0 }}>Efforts Engineers · Industrial Refrigeration Spares</p>
                  <h2 id="quotation-summary-title" style={{ margin: "8px 0" }}>Commercial Quotation Sheet</h2>
                  <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Account / Recipient: {selectedQuotation.customer_name || user?.name || user?.email || "Valued Customer"}
                    {selectedQuotation.company && ` · ${selectedQuotation.company}`}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong style={{ fontSize: "1.1rem", color: "var(--primary)" }}>Ref: EE-QT-{selectedQuotation.id}</strong>
                  <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    Date: {formatDate(selectedQuotation.created_at)}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "0.82rem" }}>
                    Status: <span className="badge badge-order">{selectedQuotation.status || "pending"}</span>
                  </p>
                </div>
              </header>

              {/* Itemized Line Items Table */}
              {quotationItems.length > 0 ? (
                <div style={{ marginTop: "20px", overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "2px solid var(--line)" }}>
                        <th style={{ padding: "10px 12px" }}>Item #</th>
                        <th style={{ padding: "10px 12px" }}>Description / Part</th>
                        <th style={{ padding: "10px 12px", textAlign: "center" }}>Qty</th>
                        <th style={{ padding: "10px 12px", textAlign: "right" }}>Unit Price</th>
                        <th style={{ padding: "10px 12px", textAlign: "right" }}>Estimated Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationItems.map((item, idx) => {
                        const unitPrice = Number(item.unit_price) || 0;
                        const qty = Number(item.quantity) || 1;
                        const lineTotal = unitPrice * qty;
                        return (
                          <tr key={item.id || idx} style={{ borderBottom: "1px solid var(--line)" }}>
                            <td style={{ padding: "10px 12px", color: "var(--text-muted)" }}>{idx + 1}</td>
                            <td style={{ padding: "10px 12px", fontWeight: 600 }}>
                              {item.part_name || (item.product_id ? `Product #${item.product_id}` : "Compressor Spare Part")}
                            </td>
                            <td style={{ padding: "10px 12px", textAlign: "center" }}>{qty}</td>
                            <td style={{ padding: "10px 12px", textAlign: "right" }}>
                              {unitPrice > 0 ? `₹${unitPrice.toLocaleString("en-IN")}` : "Price on request"}
                            </td>
                            <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 600 }}>
                              {lineTotal > 0 ? `₹${lineTotal.toLocaleString("en-IN")}` : "To be confirmed"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr style={{ borderTop: "2px solid var(--line)", fontWeight: 700 }}>
                        <td colSpan={4} style={{ padding: "12px", textAlign: "right" }}>Estimated Quotation Total:</td>
                        <td style={{ padding: "12px", textAlign: "right", color: "var(--primary)", fontSize: "1.05rem" }}>
                          {formatAmount(selectedQuotation.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <dl className="quote-table" style={{ marginTop: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px" }}>
                    <div>
                      <dt style={{ fontWeight: 700 }}>Product reference</dt>
                      <dd style={{ margin: "4px 0 0" }}>{selectedQuotation.product_id ? `Product #${selectedQuotation.product_id}` : "Not provided"}</dd>
                    </div>
                    <div>
                      <dt style={{ fontWeight: 700 }}>Quantity</dt>
                      <dd style={{ margin: "4px 0 0" }}>{selectedQuotation.quantity ?? "Not provided"}</dd>
                    </div>
                    <div>
                      <dt style={{ fontWeight: 700 }}>Status</dt>
                      <dd style={{ margin: "4px 0 0" }}>{selectedQuotation.status || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt style={{ fontWeight: 700 }}>Recorded total</dt>
                      <dd style={{ margin: "4px 0 0" }}>{formatAmount(selectedQuotation.total)}</dd>
                    </div>
                  </div>
                </dl>
              )}

              <p style={{ marginTop: "24px", padding: "14px", background: "var(--bg-page)", borderRadius: "8px", fontSize: "0.85rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
                This is an informational quotation sheet generated from our system records. GST, customs duties, freight charges, and final commercial delivery schedules are subject to formal confirmation by Efforts Engineers at time of purchase order placement.
              </p>
            </section>
          )}
        </>
      )}
    </ClientLayout>
  );
}
