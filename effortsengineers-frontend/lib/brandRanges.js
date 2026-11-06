const BRANDS_WITHOUT_CATALOG_ITEMS = ["Bitzer", "Bock", "Daikin"];

export function buildBrandRanges(products) {
  const brands = new Map();

  for (const product of products) {
    const brand = typeof product.brand === "string" ? product.brand.trim() : "";
    if (!brand) continue;

    const key = brand.toLocaleLowerCase();
    if (!brands.has(key)) {
      brands.set(key, { brand, ranges: new Set() });
    }

    const ranges = brands.get(key).ranges;
    const series = typeof product.series === "string" ? product.series.trim() : "";
    const compatibleModels = typeof product.compatible_models === "string"
      ? product.compatible_models.trim()
      : "";

    if (series) ranges.add(`Series: ${series}`);
    if (compatibleModels) ranges.add(`Compatible models: ${compatibleModels}`);
    if (!series && !compatibleModels) {
      ranges.add("Catalog listings are available; series and compatible models are not specified.");
    }
  }

  for (const brand of BRANDS_WITHOUT_CATALOG_ITEMS) {
    const key = brand.toLocaleLowerCase();
    if (!brands.has(key)) {
      brands.set(key, {
        brand,
        ranges: new Set([
          "Share the compressor model and part reference so we can confirm the applicable range.",
        ]),
      });
    }
  }

  return [...brands.values()]
    .map(({ brand, ranges }) => ({ brand, ranges: [...ranges] }))
    .sort((left, right) => left.brand.localeCompare(right.brand));
}
