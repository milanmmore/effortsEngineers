import ProductsClient from "./ProductsClient";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import { normalizeCatalogProducts } from "@/lib/catalogProducts";
import pageMetadata from "@/config/pageMetadata";
import brandRanges from "@/config/brandRanges";

export const metadata = pageMetadata.products;

export default async function ProductsPage() {
  let initialProducts = [];
  let initialCatalogLoaded = false;
  let initialCatalogError = "";

  try {
    const response = await fetch(`${API_BASE_URL}/catalog`, {
      cache: "force-cache",
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`Catalog request failed with HTTP ${response.status}.`);
    }

    initialProducts = normalizeCatalogProducts(await response.json());
    initialCatalogLoaded = true;
  } catch (error) {
    console.error("Failed to fetch the product catalog during static generation:", error);
    initialCatalogError =
      "The catalog could not be included in this site build. Try refreshing the catalog or contact us for current product information.";
  }

  return (
    <>
      <ProductsClient
        initialProducts={initialProducts}
        initialCatalogLoaded={initialCatalogLoaded}
        initialCatalogError={initialCatalogError}
      />
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
