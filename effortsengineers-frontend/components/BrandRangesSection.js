export default function BrandRangesSection({
  id,
  eyebrow,
  title,
  description,
  brandRanges,
  loadError = "",
}) {
  return (
    <section className="section-shell" id={id}>
      <div className="section-header">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{description}</p>
        <div className="separator-line" />
      </div>

      {loadError && <p role="alert">{loadError}</p>}
      {!loadError && (
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {brandRanges.map(({ brand, ranges }) => (
            <article key={brand} className="why-card" style={{ padding: "26px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1.1rem" }}>{brand}</h3>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.9rem" }}>
                {ranges.map((range) => <li key={range} style={{ marginBottom: "8px" }}>{range}</li>)}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
