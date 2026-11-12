import BrandRangesSection from "@/components/BrandRangesSection";
import HomePageClient from "./HomePageClient";
import { getServerBrandRanges } from "@/lib/serverBrandRanges";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { brandRanges, loadError } = await getServerBrandRanges();

  return (
    <HomePageClient
      brandRangesSection={
        <BrandRangesSection
          id="brand-ranges"
          eyebrow="Compressor Compatibility"
          title={<><b>Published Catalog</b> Model Ranges</>}
          description="These are the compressor ranges represented by current catalog listings. Other brands shown on the site are handled as sourcing enquiries; compatibility is confirmed against the exact model and part reference."
          brandRanges={brandRanges}
          loadError={loadError}
        />
      }
    />
  );
}
