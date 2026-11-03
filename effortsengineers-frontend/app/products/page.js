import ProductsClient from "./ProductsClient";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import { normalizeCatalogProducts } from "@/lib/catalogProducts";
import pageMetadata from "@/config/pageMetadata";

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
    <ProductsClient
      initialProducts={initialProducts}
      initialCatalogLoaded={initialCatalogLoaded}
      initialCatalogError={initialCatalogError}
    />
  );
}
