/**
 * lib/siteConfig.ts
 *
 * Single source of truth for:
 * - Nav text & links
 * - Top announcement bar
 * - Footer brands & quick links
 * - Company contact details & Pune locations
 *
 * All pages and components import from here to prevent drift.
 */

export interface NavDropdownItem {
  title: string;
  href: string;
  desc: string;
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  dropdown?: NavDropdownItem[];
}

export interface BrandItem {
  name: string;
  label: string;
}

export interface LocationItem {
  id: string;
  shop: string;
  role: string;
  address: string;
  mapUrl: string;
}

export interface ProfileLink {
  label: string;
  url: string;
}

export interface ExportDestination {
  region: string;
  countries: string;
  transit: string;
}

export interface ExportCertificate {
  id: string;
  title: string;
  category: string;
  issuer: string;
  validity: string;
  description: string;
}

export interface PackagingStandard {
  icon: string;
  title: string;
  description: string;
}

export interface ExportStat {
  value: string | number;
  label: string;
}

export interface ExportLogistics {
  hubOrigin: string;
  transitDisclaimer: string;
}

export interface GlobalReachConfig {
  destinations: ExportDestination[];
  certificates: ExportCertificate[];
  packagingStandards: PackagingStandard[];
  customsDocuments: string[];
  stats: ExportStat[];
  logistics: ExportLogistics;
}

// ---------------------------------------------------------------------------
// 1. BRAND & IDENTITY
// ---------------------------------------------------------------------------
export const BRAND_INFO = {
  name: "Efforts Engineers",
  titlePrefix: "EFFORTS",
  titleSuffix: "ENGINEERS",
  tagline: "Efforts Engineers - Engineering Excellence Since 1986",
  taglineSecondary: "Delivering Industrial Automation & Engineering Solutions Since 1986",
  establishedYear: 1986,
  yearsInBusinessText: "Delivering Industrial Automation & Engineering Solutions Since 1986",
  yearsInBusinessShort: "Since 1986",
};

// ---------------------------------------------------------------------------
// 2. CONTACT DETAILS & LOCATIONS
// ---------------------------------------------------------------------------
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "+91 90960 01010";
const rawPhone = whatsappNumber.replace(/\D/g, "");

const businessAddress =
  (process.env.NEXT_PUBLIC_ADDRESS || "").trim() ||
  "Shop No. 10, Shirole Park, Vetal Baba Chowk, Senapati Bapat Rd, Shivajinagar, Pune, Maharashtra 411016, India";

const workshopAddress =
  "Shop No. 11, Shirole Park, Vetal Baba Chowk, Senapati Bapat Rd, Shivajinagar, Pune, Maharashtra 411016, India";

const primaryEmail =
  process.env.NEXT_PUBLIC_PRIMARY_EMAIL || "sales@effortsengineers.in";
const secondaryEmail =
  process.env.NEXT_PUBLIC_SECONDARY_EMAIL || "saurabh@effortsengineers.in";

const defaultBusinessHours = "Mon – Sat: 09:30 – 18:30 IST (Closed on Sundays)";
const businessHours = (process.env.NEXT_PUBLIC_BUSINESS_HOURS || defaultBusinessHours).trim();

export const CONTACT_DETAILS = {
  phone: whatsappNumber,
  phoneRaw: rawPhone,
  whatsapp: whatsappNumber,
  whatsappRaw: rawPhone,
  primaryEmail,
  secondaryEmail,
  emails: [primaryEmail, secondaryEmail].filter(Boolean),
  businessHours,
  businessHoursLabel: businessHours,
  openingHours: ["Mo-Sa 09:30-18:30"],
  address: businessAddress,
  workshopAddress,
  locations: [
    {
      id: "office",
      shop: "Shop No. 10",
      role: "Office",
      address: businessAddress,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress)}`,
    },
    {
      id: "workshop",
      shop: "Shop No. 11",
      role: "Workshop & Sourcing Coordination",
      address: workshopAddress,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workshopAddress)}`,
    },
  ] as LocationItem[],
  profileLinks: [
    {
      label: "Facebook",
      url: "https://www.facebook.com/effortsengg/",
    },
    ...(process.env.NEXT_PUBLIC_LINKEDIN_URL
      ? [{ label: "LinkedIn", url: process.env.NEXT_PUBLIC_LINKEDIN_URL }]
      : []),
    ...(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL
      ? [{ label: "Google Business Profile", url: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL }]
      : []),
  ] as ProfileLink[],
  exportDestinationCount: 29,
};

// ---------------------------------------------------------------------------
// 3. TOP ANNOUNCEMENT BAR
// ---------------------------------------------------------------------------
export const TOP_BAR_CONFIG = {
  announcement: "Availability and dispatch estimates are confirmed per order",
  phone: CONTACT_DETAILS.phone,
  phoneRaw: CONTACT_DETAILS.phoneRaw,
  email: CONTACT_DETAILS.primaryEmail,
};

// ---------------------------------------------------------------------------
// 4. NAVIGATION ITEMS & LABELS
// ---------------------------------------------------------------------------
export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "solutions",
    label: "Solutions & Spares",
    dropdown: [
      {
        title: "Products & Catalog",
        href: "/products",
        desc: "Ammonia, Freon, Air & Gas compressor spares",
        icon: "box",
      },
      {
        title: "Services & Projects",
        href: "/services",
        desc: "Service coordination through external partners",
        icon: "settings",
      },
      {
        title: "Custom Sourcing",
        href: "/productsourcing",
        desc: "Hard-to-find spares & reverse engineering",
        icon: "search",
      },
    ],
  },
  {
    id: "global-reach",
    label: "Global Reach",
    href: "/global-reach",
  },
  {
    id: "company",
    label: "Company & Support",
    dropdown: [
      {
        title: "About Us",
        href: "/about",
        desc: `${BRAND_INFO.yearsInBusinessText} · Compressor-parts sourcing`,
        icon: "building",
      },
      {
        title: "Warranty & FAQ",
        href: "/warranty",
        desc: "Order-specific warranty terms & claim enquiries",
        icon: "shield",
      },
      {
        title: "Contact Us",
        href: "/contact",
        desc: "Direct RFQs, sourcing coordination & contact details",
        icon: "phone",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 5. BRANDS LIST (SHARED BETWEEN CATALOG FILTER & FOOTER)
// ---------------------------------------------------------------------------
export const CATALOG_BRANDS: BrandItem[] = [
  { name: "Carrier", label: "Carrier" },
  { name: "Grasso", label: "Grasso" },
  { name: "Kirloskar", label: "Kirloskar" },
  { name: "Mycom", label: "Mycom" },
  { name: "Sabroe", label: "Sabroe" },
  { name: "Vilter", label: "Vilter" },
];

export const OTHER_SOURCED_BRANDS: BrandItem[] = [
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

export const ALL_BRANDS: BrandItem[] = [
  ...CATALOG_BRANDS,
  ...OTHER_SOURCED_BRANDS,
];

export const ENQUIRY_BRANDS: BrandItem[] = [
  ...ALL_BRANDS,
  { name: "Other", label: "Other Make" },
];

// ---------------------------------------------------------------------------
// 6. FOOTER QUICK LINKS
// ---------------------------------------------------------------------------
export const FOOTER_QUICK_LINKS = [
  { href: "/products", label: "Product Catalog" },
  { href: "/services", label: "Consultancy & Industrial Projects" },
  { href: "/global-reach", label: "Global Reach & Logistics" },
  { href: "/global-reach#certificates", label: "Request Order Documentation" },
  { href: "/warranty", label: "Warranty Terms & Support" },
  { href: "/about", label: "Company Story & Timeline" },
  { href: "/client/dashboard", label: "Customer Portal & Order Tracking" },
  { href: "/contact", label: "Inquiry & RFQ Desk" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

// ---------------------------------------------------------------------------
// 7. GLOBAL REACH & EXPORT LOGISTICS CONFIGURATION
// ---------------------------------------------------------------------------
export const EXPORT_DESTINATIONS: ExportDestination[] = [
  { region: "Middle East & Gulf", countries: "UAE, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain", transit: "Indicative: 2 - 3 Days (Air) / 7 Days (Sea)" },
  { region: "Southeast Asia", countries: "Singapore, Malaysia, Indonesia, Vietnam, Thailand, Philippines", transit: "Indicative: 3 - 4 Days (Air) / 10 Days (Sea)" },
  { region: "Africa", countries: "Nigeria, Kenya, South Africa, Egypt, Ghana, Tanzania", transit: "Indicative: 4 - 5 Days (Air) / 14 Days (Sea)" },
  { region: "Europe", countries: "Germany, Netherlands, UK, Greece, Italy, Poland", transit: "Indicative: 3 - 5 Days (Air) / 18 Days (Sea)" },
  { region: "Americas", countries: "USA, Canada, Brazil, Mexico, Chile", transit: "Indicative: 4 - 6 Days (Air) / 24 Days (Sea)" },
];

export const EXPORT_CERTIFICATES: ExportCertificate[] = [
  {
    id: "SUPPLIER-QUALITY",
    title: "Supplier Quality Documentation",
    category: "Supplier Documentation",
    issuer: "Relevant supplier, where available",
    validity: "Availability and scope vary by supplier",
    description: "Quality-system documents may be requested for review. Certification status applies to the named supplier only and does not imply that Efforts Engineers is certified.",
  },
  {
    id: "MATERIAL-INSPECTION",
    title: "Material & Inspection Records",
    category: "Product Documentation",
    issuer: "Relevant supplier or testing provider, where applicable",
    validity: "Availability depends on the product and accepted order terms",
    description: "Material, dimensional, or test records can be discussed for a specific part. Any applicable documentation must be confirmed before ordering.",
  },
  {
    id: "WARRANTY-TERMS",
    title: "Product Warranty Terms",
    category: "Order Documentation",
    issuer: "As stated in the accepted quotation or order",
    validity: "Product- and order-specific",
    description: "Warranty coverage, period, eligibility, and remedies apply only when stated in the accepted quotation or order documents.",
  },
  {
    id: "SHIPPING-DOCUMENTS",
    title: "Shipping & Packaging Documents",
    category: "Export Documentation",
    issuer: "Prepared as applicable to the order and destination",
    validity: "Confirmed per shipment",
    description: "Required shipping and packaging records vary by destination and shipment. Packaging options and applicable documents are confirmed for each order.",
  },
];

export const PACKAGING_STANDARDS: PackagingStandard[] = [
  {
    icon: "🛡️",
    title: "Corrosion Protection",
    description: "Protective coatings may be specified for suitable machined surfaces.",
  },
  {
    icon: "📦",
    title: "VCI Packaging",
    description: "Available when appropriate and stated in the shipment arrangements.",
  },
  {
    icon: "🌲",
    title: "ISPM-15 Wood Packaging",
    description: "Where required, treated by an approved method stated on the applicable certificate. Crating options are confirmed per shipment.",
  },
];

export const CUSTOMS_DOCUMENTS: string[] = [
  "Commercial Invoice with Harmonized System (HS) Codes",
  "Certificate of Origin, where applicable",
  "Packing List with Gross/Net Weights & Dimensions",
  "Material or dimensional inspection records, where available and agreed",
];

export const EXPORT_STATS: ExportStat[] = [
  {
    value: CONTACT_DETAILS.exportDestinationCount,
    label: "Potential Destination Countries",
  },
  {
    value: "Per Shipment",
    label: "Packaging arrangements confirmed",
  },
  {
    value: "Per Destination",
    label: "Transit estimate checked",
  },
  {
    value: "On Request",
    label: "Supplier documents checked for availability",
  },
];

export const EXPORT_LOGISTICS: ExportLogistics = {
  hubOrigin: "Based in Pune with access to Mumbai air cargo and Nhava Sheva (JNPT) port routes. Dispatch schedules and transit depend on confirmed availability, carriers, customs, and destination.",
  transitDisclaimer: "Transit times are estimates only and may exclude order processing, carrier schedules, customs clearance, and local delivery. Actual timing depends on the shipment and destination.",
};

export const GLOBAL_REACH_CONFIG: GlobalReachConfig = {
  destinations: EXPORT_DESTINATIONS,
  certificates: EXPORT_CERTIFICATES,
  packagingStandards: PACKAGING_STANDARDS,
  customsDocuments: CUSTOMS_DOCUMENTS,
  stats: EXPORT_STATS,
  logistics: EXPORT_LOGISTICS,
};

// ---------------------------------------------------------------------------
// 8. UNIFIED SITE CONFIG EXPORT
// ---------------------------------------------------------------------------
export const siteConfig = {
  ...BRAND_INFO,
  ...CONTACT_DETAILS,
  topBar: TOP_BAR_CONFIG,
  navItems: NAV_ITEMS,
  catalogBrands: CATALOG_BRANDS,
  otherSourcedBrands: OTHER_SOURCED_BRANDS,
  brands: ALL_BRANDS,
  enquiryBrands: ENQUIRY_BRANDS,
  quickLinks: FOOTER_QUICK_LINKS,
  exportDestinations: EXPORT_DESTINATIONS,
  exportCertificates: EXPORT_CERTIFICATES,
  packagingStandards: PACKAGING_STANDARDS,
  customsDocuments: CUSTOMS_DOCUMENTS,
  exportStats: EXPORT_STATS,
  exportLogistics: EXPORT_LOGISTICS,
  globalReach: GLOBAL_REACH_CONFIG,
};

export default siteConfig;
