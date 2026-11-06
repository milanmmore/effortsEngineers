const BRANDS_WITHOUT_CATALOG_ITEMS = ["Bitzer", "Bock", "Daikin"];

export function buildBrandRanges(catalogRanges) {
  const brands = new Map();

  for (const catalogRange of catalogRanges) {
    const brand = typeof catalogRange.brand === "string" ? catalogRange.brand.trim() : "";
    if (!brand) continue;

    const key = brand.toLocaleLowerCase();
    if (!brands.has(key)) {
      brands.set(key, { brand, ranges: new Set() });
    }

    const ranges = brands.get(key).ranges;
    const series = typeof catalogRange.series === "string" ? catalogRange.series.trim() : "";
    const compatibleModels = typeof catalogRange.compatible_models === "string"
      ? catalogRange.compatible_models.trim()
      : "";

    if (series) ranges.add(`Series: ${series}`);
    if (compatibleModels) ranges.add(`Compatible models: ${compatibleModels}`);
  }

  for (const { brand, ranges } of brands.values()) {
    if (ranges.size === 0) {
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
