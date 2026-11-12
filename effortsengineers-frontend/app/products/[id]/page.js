import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import { SITE_ORIGIN } from "@/config/siteOrigin";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return {
      title: "Product details | Efforts Engineers",
      description: "Compressor spare-part details.",
      robots: { index: false, follow: false },
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/catalog/${id}`, { cache: "no-store" });
    if (!response.ok) {
      return {
        title: "Product details | Efforts Engineers",
        description: "Compressor spare-part details.",
        robots: { index: false, follow: false },
      };
    }
    const product = await response.json();
    return {
      title: `${product.name} | Efforts Engineers`,
      description: product.description || `${product.name} compressor spare part details and enquiry.`,
      alternates: { canonical: new URL(`/products/${id}`, SITE_ORIGIN).toString() },
    };
  } catch (error) {
    console.error("Failed to load product metadata:", error);
    return {
      title: "Product details | Efforts Engineers",
      description: "Compressor spare-part details.",
      robots: { index: false, follow: false },
    };
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/catalog/${id}`, { cache: "no-store" });
  } catch (error) {
    console.error("Failed to load product details:", error);
    throw new Error("Unable to load product details.");
  }

  if (response.status === 404) notFound();
  if (!response.ok) {
    throw new Error(`Catalog API returned ${response.status} for product ${id}.`);
  }

  const product = await response.json();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    category: product.category || undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    mpn: product.part_number || undefined,
    image: product.image_url && !/\/components\.jpeg(?:[?#]|$)/i.test(product.image_url)
      ? product.image_url
      : undefined,
  };
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <ProductDetailClient product={product} />
    </>
  );
}
