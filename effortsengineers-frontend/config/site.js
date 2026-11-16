import CONTACT_CONFIG from "@/config/contactConfig";

// Canonical list of compressor brands with catalog products.
// This is the single source of truth shared between the /products filter and the footer brand list.
export const CATALOG_BRANDS = [
  { name: "Carrier", label: "Carrier" },
  { name: "Grasso", label: "Grasso" },
  { name: "Kirloskar", label: "Kirloskar" },
  { name: "Mycom", label: "Mycom" },
  { name: "Sabroe", label: "Sabroe" },
  { name: "Vilter", label: "Vilter" },
];

export const OTHER_SOURCED_BRANDS = [
  { name: "Bitzer", label: "Bitzer" },
  { name: "Bock", label: "Bock" },
  { name: "Daikin", label: "Daikin" },
  { name: "York", label: "York" },
  { name: "Copeland", label: "Copeland" },
  { name: "Trane", label: "Trane" },
  { name: "Ingersoll Rand", label: "Ingersoll Rand" },
  { name: "Atlas Copco", label: "Atlas Copco" },
  { name: "CPT", label: "CPT" },
  { name: "Accel Sabroe", label: "Accel Sabroe" },
  { name: "Voltas", label: "Voltas" },
];

export const ALL_BRANDS = [
  ...CATALOG_BRANDS,
  ...OTHER_SOURCED_BRANDS,
];

const brands = ALL_BRANDS;

const enquiryBrands = [
  ...ALL_BRANDS,
  { name: "Other", label: "Other Make" },
];

export const SITE_CONFIG = {
  ...CONTACT_CONFIG,
  brands,
  catalogBrands: CATALOG_BRANDS,
  otherSourcedBrands: OTHER_SOURCED_BRANDS,
  enquiryBrands,
  exportDestinationCount: 29,
};

export default SITE_CONFIG;
