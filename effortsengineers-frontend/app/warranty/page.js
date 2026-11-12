import WarrantyClaimForm from "@/components/WarrantyClaimForm";
import InterfaceIcon from "@/components/InterfaceIcon";
import Link from "next/link";

export default function WarrantyPage() {
  const faqs = [
    {
      q: "What warranty applies to a supplied part?",
      a: "Warranty coverage, period, eligibility, and remedies vary by product. The applicable terms are stated in the accepted quotation or order documents. Contact us with your invoice or order reference to discuss a claim.",
    },
    {
      q: "How fast is a warranty replacement part dispatched?",
      a: "Claim review, remedy, and dispatch timing depend on the accepted order terms, product availability, and carrier schedules. We will confirm next steps after reviewing the claim.",
    },
    {
      q: "What items are covered under the warranty?",
      a: "Covered products, if any, are identified in the applicable quotation or order documents. Please confirm coverage before placing an order.",
    },
    {
      q: "Are installation guidelines required to maintain warranty validity?",
      a: "Any installation, maintenance, and operating conditions relevant to warranty coverage are stated in the applicable quotation or order documents. Please contact us if you need clarification before installation.",
    },
  ];
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  const faqStructuredDataJson = JSON.stringify(faqStructuredData).replace(/</g, "\\u003c");

  return (
    <main className="section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqStructuredDataJson }} />
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Product Support</span>
        <h1 className="section-title"><b>Warranty</b> & Support</h1>
        <p className="section-desc">
          Warranty coverage, period, eligibility, and remedies are product-specific and apply only as stated in the accepted quotation or order documents.
        </p>
        <div className="separator-line" />
      </div>

      {/* 3 Core Warranty Pillars */}
      <section aria-labelledby="warranty-process-title">
      <h2 id="warranty-process-title" className="section-title">How Warranty Support Works</h2>
      <div className="why-choose-grid" style={{ marginBottom: "60px" }}>
        <div className="why-card">
          <div className="why-icon-box"><InterfaceIcon name="shield" size={24} /></div>
          <h3>Warranty Review</h3>
          <p>
            Submit the order reference and issue details. Claims are reviewed against the applicable product and order terms.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box"><InterfaceIcon name="bolt" size={24} /></div>
          <h3>Claim Handling</h3>
          <p>
            We will confirm the review process and any available remedy. Replacement availability and delivery timing depend on the claim outcome, stock, and carrier.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box">🔬</div>
          <h3>Product Documentation</h3>
          <p>
            Inspection, material, and traceability records vary by product. Please request the documentation available for your part.
          </p>
          <Link href="/global-reach#certificates">View supplier and order documentation →</Link>
        </div>
      </div>
      </section>

      <section style={{ maxWidth: "850px", margin: "0 auto 60px" }}>
        <WarrantyClaimForm />
      </section>

      <section aria-labelledby="warranty-next-steps-title" style={{ maxWidth: "850px", margin: "0 auto 60px", textAlign: "center" }}>
        <h2 id="warranty-next-steps-title">Need further assistance?</h2>
        <p>For an existing claim, include your order reference when contacting our team. For replacement parts, browse the catalog.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn btn-primary">Contact our team</Link>
          <Link href="/products" className="btn btn-outline">Browse compressor parts</Link>
        </div>
      </section>

      {/* Warranty FAQ Accordion */}
      <section id="faq" style={{ borderTop: "1px solid var(--line)", paddingTop: "60px" }}>
        <div className="section-header">
          <span className="eyebrow">Warranty Specifics</span>
          <h2 className="section-title"><b>Frequently Asked</b> Warranty Questions</h2>
          <div className="separator-line" />
        </div>

        <div className="faq-accordion">
          {faqs.map((f, idx) => (
            <details key={idx} className="faq-item">
              <summary className="faq-header">
                <span>{f.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <div className="faq-body">
                <p style={{ margin: 0 }}>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
