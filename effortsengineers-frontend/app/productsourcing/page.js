import BrandRangesSection from "@/components/BrandRangesSection";
import { getServerBrandRanges } from "@/lib/serverBrandRanges";
import ProductSourcingClient from "./ProductSourcingClient";

export const dynamic = "force-dynamic";

export default async function ProductSourcingPage() {
  const { brandRanges, loadError } = await getServerBrandRanges();

  return (
    <ProductSourcingClient
      brandRangesSection={
        <BrandRangesSection
          id="brand-ranges"
          eyebrow="Compressor Compatibility"
          title={<><b>Brands</b> and Series We Source</>}
          description="Catalog series and compatible models are shown below. Send the exact compressor model and part reference to confirm availability and compatibility."
          brandRanges={brandRanges}
          loadError={loadError}
        />
      }
    />
  );
}
