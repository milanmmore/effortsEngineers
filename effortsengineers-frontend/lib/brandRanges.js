const BRANDS_WITHOUT_CATALOG_ITEMS = ["Bitzer", "Bock", "Daikin"];

const cleanRangeValue = (value) =>
  value
    .replace(/\s*\([^)]*\bto add\b[^)]*\)/gi, "")
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part && !/\bto add\b/i.test(part))
    .join(", ")
    .replace(/\s{2,}/g, " ")
    .trim();

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
    const series = typeof catalogRange.series === "string" ? cleanRangeValue(catalogRange.series) : "";
    const compatibleModels = typeof catalogRange.compatible_models === "string"
      ? cleanRangeValue(catalogRange.compatible_models)
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
          "No model range is currently listed in the catalog. Contact us with the compressor nameplate and part reference to check sourcing options.",
        ]),
      });
    }
  }

  return [...brands.values()]
    .map(({ brand, ranges }) => ({ brand, ranges: [...ranges] }))
    .sort((left, right) => left.brand.localeCompare(right.brand));
}
