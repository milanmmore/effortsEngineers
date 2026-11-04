// config/contactConfig.js
/**
 * Single source of truth for contact details and approved business messaging.
 * Reads from environment variables with robust defaults.
 */

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "+91 90960 01010";
const configuredBusinessAddress = (process.env.NEXT_PUBLIC_ADDRESS || "").trim();
const businessAddress =
  configuredBusinessAddress && !configuredBusinessAddress.includes("411016")
    ? configuredBusinessAddress.replace(/,\s*India$/i, " 411016, India")
    : configuredBusinessAddress ||
      "Shop No. 10, Shirole Park, Vetal Baba Chowk, Senapati Bapat Rd, Shivajinagar, Pune, Maharashtra 411016, India";
const workshopAddress =
  "Shop No. 11, Shirole Park, Vetal Baba Chowk, Senapati Bapat Rd, Shivajinagar, Pune, Maharashtra 411016, India";
const primaryEmail =
  process.env.NEXT_PUBLIC_PRIMARY_EMAIL || "saurabh@effortsengineers.in";
const secondaryEmail =
  process.env.NEXT_PUBLIC_SECONDARY_EMAIL || "efforts.engineers@gmail.com";
const emails = [primaryEmail, secondaryEmail].filter(
  (email, index, addresses) =>
    email.trim() &&
    addresses.findIndex(
      (address) => address.trim().toLowerCase() === email.trim().toLowerCase()
    ) === index
);
const locations = [
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
];

export const CONTACT_CONFIG = {
  phone: whatsapp,
  phoneRaw: whatsapp.replace(/\D/g, ""),
  whatsapp,
  whatsappRaw: whatsapp.replace(/\D/g, ""),
  primaryEmail,
  secondaryEmail,
  emails,
  address: businessAddress,
  workshopAddress,
  locations,
  yearsInBusinessText: "Serving industry since 1986",
  yearsInBusinessShort: "Serving industry since 1986",
};

export default CONTACT_CONFIG;
