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
          title={<><b>Brands and Detailed</b> Model Ranges</>}
          description="Browse the makes and model ranges listed in our catalog. Availability and compatibility are confirmed against the exact model and part reference."
          brandRanges={brandRanges}
          loadError={loadError}
        />
      }
    />
  );
}
