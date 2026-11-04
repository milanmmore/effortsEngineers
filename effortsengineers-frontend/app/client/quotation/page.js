"use client";

import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    API.get("/client/dashboard")
      .then(({ data }) => {
        const accountQuotations = Array.isArray(data?.quotations) ? data.quotations : [];
        setQuotations(accountQuotations);
        setSelectedId(accountQuotations[0]?.id ?? null);
      })
      .catch((error) => {
        console.error("Failed to load customer quotations:", error);
        setLoadError("Unable to load your quotations. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const selectedQuotation = quotations.find(({ id }) => id === selectedId);

  return (
    <ClientLayout>
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Customer Account</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Quotations</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            View quotation records currently linked to your account. Official commercial terms must be confirmed by Efforts Engineers.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsDrawerOpen(true)} className="btn btn-primary">
            Request a quotation
          </button>
          <button type="button" onClick={() => window.print()} className="btn btn-outline" disabled={!selectedQuotation}>
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
          <button type="button" onClick={() => setIsDrawerOpen(true)} className="btn btn-primary">Request a quotation</button>
        </div>
      ) : (
        <>
          <div className="no-print" style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "12px", marginBottom: "20px" }}>
            {quotations.map((quotation) => (
              <button
                type="button"
                key={quotation.id}
                aria-pressed={selectedId === quotation.id}
                onClick={() => setSelectedId(quotation.id)}
                className={selectedId === quotation.id ? "btn btn-primary" : "btn btn-outline"}
                style={{ minWidth: "180px", textAlign: "left" }}
              >
                Quotation record #{quotation.id}
                <br />
                <small>{formatDate(quotation.created_at)}</small>
              </button>
            ))}
          </div>

          {selectedQuotation && (
            <section className="printable-quote-sheet" aria-labelledby="quotation-summary-title">
              <header className="quote-sheet-header">
                <div>
                  <p className="eyebrow" style={{ color: "var(--primary)", margin: 0 }}>Efforts Engineers · Customer Portal</p>
                  <h2 id="quotation-summary-title" style={{ margin: "8px 0" }}>Quotation record summary</h2>
                  <p style={{ margin: 0, color: "var(--text-muted)" }}>
                    Account: {user?.name || user?.email || "Authenticated customer"}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong>Quotation record #{selectedQuotation.id}</strong>
                  <p style={{ margin: "6px 0 0", color: "var(--text-muted)" }}>
                    Created: {formatDate(selectedQuotation.created_at)}
                  </p>
                </div>
              </header>

              <dl className="quote-table">
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

              <p style={{ marginTop: "24px", padding: "14px", background: "var(--bg-page)", borderRadius: "8px", fontSize: "0.88rem", lineHeight: 1.5 }}>
                This is an informational summary of data currently linked to your portal account. It is not an issued quotation, proforma invoice, tax invoice, acceptance, price-validity commitment, or confirmation of availability. Request an official quotation from our team for confirmed commercial terms.
              </p>
            </section>
          )}
        </>
      )}
    </ClientLayout>
  );
}
