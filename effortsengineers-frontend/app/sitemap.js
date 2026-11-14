import { SITE_ORIGIN } from "@/config/siteOrigin";
import { createApiUrl } from "@/lib/apiBaseUrl";

export const dynamic = "force-dynamic";

const publicPaths = [
  "/",
  "/about",
  "/contact",
  "/products",
  "/global-reach",
  "/productsourcing",
  "/services",
  "/warranty",
];

async function fetchCatalogPage(page) {
  const url = createApiUrl("catalog");
  url.searchParams.set("page", String(page));
  const response = await fetch(url, { cache: "no-store", redirect: "error" });
  if (!response.ok) {
    throw new Error(`Catalog API returned ${response.status} while generating sitemap.`);
  }
  const data = await response.json();
  if (!Array.isArray(data.products) || !Number.isInteger(data.totalPages)) {
    throw new Error("Catalog API returned invalid pagination data while generating sitemap.");
  }
  return data;
}

function getProductLastModified(product) {
  const timestamp = product.updated_at || product.created_at;
  if (!timestamp) return undefined;

  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap() {
  const paths = publicPaths.map((path) => ({
    url: new URL(path, SITE_ORIGIN).toString(),
    changeFrequency: path === "/products" ? "daily" : "monthly",
    priority: path === "/" ? 1 : path === "/products" ? 0.9 : 0.7,
  }));

  try {
    const firstPage = await fetchCatalogPage(1);
    const remainingPages = await Promise.all(
      Array.from({ length: Math.max(firstPage.totalPages - 1, 0) }, (_, index) =>
        fetchCatalogPage(index + 2)
      )
    );
    const products = [firstPage, ...remainingPages]
      .flatMap(({ products: pageProducts }) => pageProducts);
    paths.push(
      ...products.map((product) => ({
        url: new URL(`/products/${product.id}`, SITE_ORIGIN).toString(),
        ...(getProductLastModified(product) && {
          lastModified: getProductLastModified(product),
        }),
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    );
  } catch (error) {
    console.error("Catalog unavailable while building sitemap; serving public static routes only:", error);
  }

  return paths;
}
