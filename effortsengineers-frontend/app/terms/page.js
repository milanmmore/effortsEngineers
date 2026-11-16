import React from "react";
import Link from "next/link";
import CONTACT_CONFIG from "@/config/contactConfig";

export default function TermsPage() {
  return (
    <main className="section-shell" style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 20px" }}>
      <div className="section-header" style={{ textAlign: "left", marginBottom: "40px" }}>
        <span className="eyebrow">Legal & Commercial Terms</span>
        <h1 className="section-title"><b>Terms &</b> Conditions</h1>
        <p className="section-desc">
          Last updated: November 2026. These Terms & Conditions govern quotations, orders, supply of replacement compressor spare parts, and coordination services provided by Efforts Engineers.
        </p>
        <div className="separator-line" style={{ margin: "20px 0" }} />
      </div>

      <div style={{ display: "grid", gap: "32px", lineHeight: "1.7", color: "var(--text-main, #334155)" }}>
        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            1. Nature of Business & Product Representation
          </h2>
          <p>
            Efforts Engineers is a supplier-network partner and distributor specializing in replacement spare parts for industrial refrigeration, cold chain, marine HVAC, and air compressors.
          </p>
          <ul style={{ paddingLeft: "24px", marginTop: "10px" }}>
            <li><strong>Non-OEM Representation:</strong> Unless explicitly stated in a formal quotation or order confirmation, parts supplied are aftermarket replacement components sourced through manufacturing partners and supplier networks. They are not represented as original equipment manufacturer (OEM) parts.</li>
            <li><strong>Trademarks & Reference Numbers:</strong> All manufacturer names (e.g. Carrier, Grasso, Kirloskar, Sabroe, Mycom, Vilter, Bitzer, Bock, Daikin), model numbers, series designations, and part numbers are used solely for identification and compatibility cross-reference. All trademarks remain the property of their respective owners.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            2. Quotations, Pricing & Order Acceptance
          </h2>
          <p>
            Catalog listings, online pricing indicators, and stock indications are indicative guides and subject to written quotation.
          </p>
          <ul style={{ paddingLeft: "24px", marginTop: "10px" }}>
            <li>A quotation is valid for the duration specified on the quotation document. If unstated, quotations remain valid for 15 calendar days from the date of issuance.</li>
            <li>Orders become binding only upon written acceptance by Efforts Engineers and receipt of agreed commercial terms or advance payment.</li>
            <li>Taxes (including GST), freight, insurance, customs duties, port handling charges, and destination clearing fees are extra unless expressly quoted on a DDP/CIF basis.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            3. Dispatch, Delivery & Transit Estimates
          </h2>
          <p>
            Delivery timeframes and dispatch dates communicated via website, email, or quotation are indicative estimates based on current supplier stock and carrier schedules:
          </p>
          <ul style={{ paddingLeft: "24px", marginTop: "10px" }}>
            <li>Actual transit time depends on manufacturing lead times, third-party freight carriers, customs clearance, port congestion, and force majeure events.</li>
            <li>Risk of loss or damage in transit passes to the purchaser according to the agreed Incoterms (defaulting to Ex-Works / FCA Pune unless agreed otherwise).</li>
            <li>Export packaging (e.g., VCI barrier bags, ISPM-15 heat-treated wooden crates) is provided as agreed per shipment specification.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            4. Warranty Terms & Claim Procedure
          </h2>
          <p>
            Warranty coverage, eligibility, period, and remedies are product-specific and governed exclusively by the accepted quotation or invoice documents:
          </p>
          <ul style={{ paddingLeft: "24px", marginTop: "10px" }}>
            <li>Where warranty applies, claims must be submitted in writing accompanied by the original invoice number, compressor operating logs, running hours, and clear photographs of the failed component.</li>
            <li>Warranty does not cover normal wear and tear, improper lubrication, foreign particle contamination, liquid slugging, electrical imbalances, or incorrect installation.</li>
            <li>Our liability under warranty is strictly limited, at our discretion, to replacement of the defective component or credit of the purchase price.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            5. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted under applicable law, Efforts Engineers shall not be liable for any indirect, incidental, punitive, or consequential damages, including plant downtime, loss of refrigerants, product spoilage, loss of production, demurrage, or loss of profits arising out of parts supply or service coordination.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "var(--navy, #0f172a)" }}>
            6. Governing Law & Jurisdiction
          </h2>
          <p>
            These terms and any commercial transactions between the parties shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra, India.
          </p>
        </section>
      </div>

      <div style={{ marginTop: "50px", borderTop: "1px solid var(--line, #e2e8f0)", paddingTop: "24px", display: "flex", gap: "16px" }}>
        <Link href="/privacy" className="btn btn-outline">
          View Privacy Policy →
        </Link>
        <Link href="/contact" className="btn btn-primary">
          Contact Desk
        </Link>
      </div>
    </main>
  );
}
