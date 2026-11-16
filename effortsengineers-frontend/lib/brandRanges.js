const SOURCED_BRAND_RANGES = {
  Bitzer: [
    "Series: 2KC, 4KC, 4FC, 4TC, 4PC, 4NC, 4J, 4NES, 4PES, 6GE reciprocating; CSH, CSX, HSK screw",
    "Compatible models: Open-drive, semi-hermetic, and screw compressor replacement spares",
  ],
  Bock: [
    "Series: FK Series (FK20, FK40, FK50); HG Series (HG12P, HG22P, HG34P, HG44e, HG56e, HG66e, HG76e, HG88e)",
    "Compatible models: Transport refrigeration and stationary HVAC compressor spares",
  ],
  Daikin: [
    "Series: C-Series (2C58, 2C75, 4C75, 6C75, 8C75); HC-Series (4HC, 6HC)",
    "Compatible models: Marine and commercial refrigeration compressor spares",
  ],
};

const BRANDS_WITHOUT_CATALOG_ITEMS = [
  "Bitzer",
  "Bock",
  "Daikin",
];

export const cleanRangeValue = (value) => {
  if (typeof value !== "string") return "";
  return value
    .replace(/\s*\([^)]*\bto add\b[^)]*\)/gi, "")
    .replace(/\s*\b(?:other\s+)?sizes\s+to\s+add\b/gi, "")
    .replace(/\s*\bto add\b/gi, "")
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part && !/\bto add\b/i.test(part))
    .join(", ")
    .replace(/\s{2,}/g, " ")
    .replace(/^,\s*|,\s*$/g, "")
    .trim();
};

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
      const fallbackRanges = SOURCED_BRAND_RANGES[brand] || [
        "Sourced through our supplier network. Contact us with compressor nameplate, drawing, or sample part reference.",
      ];
      brands.set(key, {
        brand,
        ranges: new Set(fallbackRanges),
      });
    }
  }

  return [...brands.values()]
    .map(({ brand, ranges }) => ({ brand, ranges: [...ranges] }))
    .sort((left, right) => left.brand.localeCompare(right.brand));
}
