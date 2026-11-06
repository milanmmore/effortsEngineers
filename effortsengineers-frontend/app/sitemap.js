import { SITE_ORIGIN } from "@/config/siteOrigin";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

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
  const url = new URL(`${API_BASE_URL}/catalog`);
  url.searchParams.set("page", String(page));
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Catalog API returned ${response.status} while generating sitemap.`);
  }
  const data = await response.json();
  if (!Array.isArray(data.products) || !Number.isInteger(data.totalPages)) {
    throw new Error("Catalog API returned invalid pagination data while generating sitemap.");
  }
  return data;
}

export default async function sitemap() {
  const lastModified = new Date();
  const firstPage = await fetchCatalogPage(1);
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(firstPage.totalPages - 1, 0) }, (_, index) =>
      fetchCatalogPage(index + 2)
    )
  );
  const catalogPages = [firstPage, ...remainingPages];
  const products = catalogPages.flatMap(({ products: pageProducts }) => pageProducts);
  const paths = publicPaths.map((path) => ({
    url: new URL(path, SITE_ORIGIN).toString(),
    lastModified,
    changeFrequency: path === "/products" ? "daily" : "monthly",
    priority: path === "/" ? 1 : path === "/products" ? 0.9 : 0.7,
  }));

  paths.push(
    ...Array.from({ length: firstPage.totalPages - 1 }, (_, index) => ({
      url: new URL(`/products?page=${index + 2}`, SITE_ORIGIN).toString(),
      lastModified,
      changeFrequency: "daily",
      priority: 0.6,
    })),
    ...products.map(({ id }) => ({
      url: new URL(`/products/${id}`, SITE_ORIGIN).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  );

  return paths;
}
