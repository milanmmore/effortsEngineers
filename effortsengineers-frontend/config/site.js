import CONTACT_CONFIG from "@/config/contactConfig";

const brands = [
  { name: "Grasso", label: "Grasso" },
  { name: "Bitzer", label: "Bitzer" },
  { name: "Kirloskar", label: "Kirloskar" },
  { name: "Carrier", label: "Carrier" },
  { name: "Sabroe", label: "Sabroe" },
  { name: "Bock", label: "Bock" },
  { name: "Daikin", label: "Daikin" },
  { name: "Vilter", label: "Vilter" },
  { name: "Mycom", label: "Mycom" },
  { name: "York", label: "York" },
  { name: "Copeland", label: "Copeland" },
  { name: "Trane", label: "Trane" },
  { name: "Ingersoll Rand", label: "Ingersoll Rand" },
  { name: "Atlas Copco", label: "Atlas Copco" },
  { name: "CPT", label: "CPT" },
  { name: "Accel Sabroe", label: "Accel Sabroe" },
  { name: "Voltas", label: "Voltas" },
];

const enquiryBrands = [...brands, { name: "Other", label: "Other" }];

export const SITE_CONFIG = {
  ...CONTACT_CONFIG,
  brands,
  enquiryBrands,
  exportDestinationCount: 29,
};

export default SITE_CONFIG;
