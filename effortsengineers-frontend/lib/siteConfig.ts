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

// ---------------------------------------------------------------------------
// 1. BRAND & IDENTITY
// ---------------------------------------------------------------------------
export const BRAND_INFO = {
  name: "Efforts Engineers",
  titlePrefix: "EFFORTS",
  titleSuffix: "ENGINEERS",
  tagline: "Compressor Spares & Service Coordination",
  establishedYear: 1986,
  yearsInBusinessText: "Established in Pune in 1986",
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
// 7. UNIFIED SITE CONFIG EXPORT
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
};

export default siteConfig;
