import ProductsClient from "./ProductsClient";
import BrandRangesSection from "@/components/BrandRangesSection";
import { SITE_ORIGIN } from "@/config/siteOrigin";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import SITE_CONFIG from "@/config/site";
import { getServerBrandRanges } from "@/lib/serverBrandRanges";

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
  const requestedCategory = typeof params?.category === "string" ? params.category.slice(0, 100) : "";
  const requestedPage = Number(params?.page);
  const initialPage = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;
  const initialBrand = SITE_CONFIG.brands.some(({ name }) => name === requestedBrand)
    ? requestedBrand
    : "All";
  const initialCategory = requestedCategory || "All";
  const initialQuery = typeof params?.q === "string" ? params.q.slice(0, 120) : "";
  const catalogUrl = new URL(`${API_BASE_URL}/catalog`);
  catalogUrl.searchParams.set("page", String(initialPage));
  if (initialBrand !== "All") catalogUrl.searchParams.set("brand", initialBrand);
  if (initialCategory !== "All") catalogUrl.searchParams.set("category", initialCategory);
  if (initialQuery) catalogUrl.searchParams.set("q", initialQuery);

  const [[catalogOutcome, filtersOutcome], brandRangesResult] = await Promise.all([
    Promise.allSettled([
      fetchJson(catalogUrl.toString()),
      fetchJson(`${API_BASE_URL}/catalog/filters`),
    ]),
    getServerBrandRanges(),
  ]);
  const initialCatalog = catalogOutcome.status === "fulfilled" ? catalogOutcome.value : null;
  const initialFilters = filtersOutcome.status === "fulfilled" ? filtersOutcome.value : null;
  const initialError = catalogOutcome.status === "rejected"
    ? "The catalog is temporarily unavailable. Please retry loading products."
    : "";
  const initialFilterWarning = filtersOutcome.status === "rejected"
    ? "Brand and category filters could not be loaded."
    : "";

  if (catalogOutcome.status === "rejected") {
    console.error("Failed to render initial product catalog:", catalogOutcome.reason);
  }
  if (filtersOutcome.status === "rejected") {
    console.error("Failed to render product catalog filters:", filtersOutcome.reason);
  }

  const listedProducts = initialCatalog?.products || [];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industrial Compressor Spare Parts Catalog",
    description:
      "Browse compressor spare parts and model families. Compatibility, availability, and pricing are confirmed per enquiry.",
    url: new URL(
      initialPage === 1 ? "/products" : `/products?page=${initialPage}`,
      SITE_ORIGIN
    ).toString(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listedProducts.length
        ? listedProducts.map((product, index) => ({
          "@type": "ListItem",
          position: ((initialCatalog?.page || 1) - 1) * (initialCatalog?.pageSize || listedProducts.length) + index + 1,
          item: {
            "@type": "Product",
            url: new URL(`/products/${product.id}`, SITE_ORIGIN).toString(),
            name: getProductDisplayName(product),
            description: product.description || undefined,
            category: product.category || undefined,
            brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
            mpn: product.part_number || undefined,
            image: product.image_url && !/\/components\.jpeg(?:[?#]|$)/i.test(product.image_url)
              ? product.image_url
              : undefined,
          },
        }))
        : [],
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
        initialCategory={initialCategory}
        initialQuery={initialQuery}
        initialError={initialError}
        initialFilterWarning={initialFilterWarning}
      />
      <BrandRangesSection
        id="catalog-model-guide-title"
        eyebrow="Compressor Compatibility Guide"
        title={<><b>Browse Parts</b> by Brand and Model Family</>}
        description="Model series and compatible models are shown from catalog listings. Compatibility, specifications, availability, and pricing are confirmed for each enquiry."
        brandRanges={brandRangesResult.brandRanges}
        loadError={brandRangesResult.loadError}
      />
    </>
  );
}
