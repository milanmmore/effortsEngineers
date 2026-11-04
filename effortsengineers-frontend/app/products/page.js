import ProductsClient from "./ProductsClient";
import brandRanges from "@/config/brandRanges";
import { SITE_ORIGIN } from "@/config/siteOrigin";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import SITE_CONFIG from "@/config/site";

export const dynamic = "force-dynamic";

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Catalog API returned ${response.status}.`);
  }
  return response.json();
}

function getProductDisplayName(product) {
  let name = product.name.trim();
  for (const prefix of [product.brand, product.series].filter(Boolean)) {
    const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    name = name.replace(new RegExp(`^${escapedPrefix}\\s*[-–—:]\\s*`, "i"), "");
  }
  return name || product.name;
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const requestedBrand = params?.brand;
  const initialBrand = SITE_CONFIG.brands.some(({ name }) => name === requestedBrand)
    ? requestedBrand
    : "All";
  const initialQuery = typeof params?.q === "string" ? params.q.slice(0, 120) : "";
  const catalogUrl = new URL(`${API_BASE_URL}/catalog`);
  catalogUrl.searchParams.set("page", "1");
  if (initialBrand !== "All") catalogUrl.searchParams.set("brand", initialBrand);
  if (initialQuery) catalogUrl.searchParams.set("q", initialQuery);

  const [catalogResult, filtersResult] = await Promise.allSettled([
    fetchJson(catalogUrl.toString()),
    fetchJson(`${API_BASE_URL}/catalog/filters`),
  ]);
  const initialCatalog = catalogResult.status === "fulfilled" ? catalogResult.value : null;
  const initialFilters = filtersResult.status === "fulfilled" ? filtersResult.value : null;
  const initialError = catalogResult.status === "rejected"
    ? "The catalog is temporarily unavailable. Please retry loading products."
    : "";
  const initialFilterWarning = filtersResult.status === "rejected"
    ? "Brand and category filters could not be loaded."
    : "";

  if (catalogResult.status === "rejected") {
    console.error("Failed to render initial product catalog:", catalogResult.reason);
  }
  if (filtersResult.status === "rejected") {
    console.error("Failed to render product catalog filters:", filtersResult.reason);
  }

  const listedProducts = initialCatalog?.products || [];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industrial Compressor Spare Parts Catalog",
    description:
      "Browse compressor spare parts and model families. Compatibility, availability, and pricing are confirmed per enquiry.",
    url: new URL("/products", SITE_ORIGIN).toString(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listedProducts.length
        ? listedProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: getProductDisplayName(product),
            description: product.description || undefined,
            category: product.category || undefined,
            brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
            mpn: product.part_number || undefined,
            image: product.image_url || undefined,
          },
        }))
        : brandRanges.map(({ brand }, index) => ({
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
      <ProductsClient
        initialCatalog={initialCatalog}
        initialBrands={initialFilters?.brands || []}
        initialCategories={initialFilters?.categories || []}
        initialBrand={initialBrand}
        initialQuery={initialQuery}
        initialError={initialError}
        initialFilterWarning={initialFilterWarning}
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
