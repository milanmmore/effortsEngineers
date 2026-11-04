const steps = [
  {
    step: "01",
    title: "Share the Reference",
    description: "Provide the compressor make, model, part description, and any available drawing or nameplate photo.",
  },
  {
    step: "02",
    title: "Review the Requirement",
    description: "We review the references and check compatibility and availability with relevant suppliers or partners.",
  },
  {
    step: "03",
    title: "Confirm the Quotation",
    description: "Part details, price, lead time, documentation, and applicable terms are confirmed in the quotation.",
  },
  {
    step: "04",
    title: "Coordinate Dispatch",
    description: "After order confirmation, dispatch, packaging, and shipment documents are coordinated for the destination.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="section-shell" style={{ marginBottom: "60px" }}>
      <div className="section-header">
        <span className="eyebrow">From Enquiry to Dispatch</span>
        <h2 id="how-it-works-title" className="section-title"><b>How It</b> Works</h2>
        <div className="separator-line" />
      </div>
      <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {steps.map(({ step, title, description }) => (
          <article key={step} className="why-card" style={{ padding: "26px" }}>
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", fontFamily: "Space Grotesk" }}>
              {step}
            </span>
            <h3 style={{ marginTop: "12px", marginBottom: "8px" }}>{title}</h3>
            <p style={{ fontSize: "0.88rem", margin: 0 }}>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
