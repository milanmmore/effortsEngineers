import { createApiUrl } from "@/lib/apiBaseUrl";
import { buildBrandRanges } from "@/lib/brandRanges";

export async function getServerBrandRanges() {
  try {
    const response = await fetch(createApiUrl("catalog", "ranges"), {
      redirect: "error",
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error(`Catalog ranges API returned ${response.status}.`);
    }

    const ranges = await response.json();
    if (!Array.isArray(ranges)) {
      throw new Error("Catalog ranges API returned an invalid response.");
    }
    return { brandRanges: buildBrandRanges(ranges), loadError: "" };
  } catch (error) {
    console.error("Failed to load catalog-derived brand ranges:", error);
    return {
      brandRanges: [],
      loadError: "Brand ranges are temporarily unavailable. Please contact us with your compressor model.",
    };
  }
}
