import ProductsClient from "./ProductsClient";
import brandRanges from "@/config/brandRanges";
import { SITE_ORIGIN } from "@/config/siteOrigin";

export default function ProductsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industrial Compressor Spare Parts Catalog",
    description:
      "Browse compressor spare parts and model families. Compatibility, availability, and pricing are confirmed per enquiry.",
    url: new URL("/products", SITE_ORIGIN).toString(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: brandRanges.map(({ brand }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${brand} compressor spare parts`,
      })),
    },
  };
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <ProductsClient />
      <section className="section-shell" aria-labelledby="catalog-model-guide-title">
        <div className="section-header">
          <span className="eyebrow">Compressor Compatibility Guide</span>
          <h2 id="catalog-model-guide-title" className="section-title">
            <b>Browse Parts</b> by Brand and Model Family
          </h2>
          <p className="section-desc">
            Use these model families to identify your compressor when requesting replacement parts. Compatibility, product specifications, availability, and pricing are confirmed for each enquiry.
          </p>
          <div className="separator-line" />
        </div>
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {brandRanges.map(({ brand, series }) => (
            <article key={brand} className="why-card" style={{ padding: "24px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1.1rem" }}>{brand}</h3>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.9rem" }}>
                {series.map((range) => <li key={range} style={{ marginBottom: "8px" }}>{range}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
