// config/contactConfig.js
/**
 * Single source of truth for all contact details across the website.
 * Reads from environment variables with robust defaults.
 */

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "+91 90960 01010";

export const CONTACT_CONFIG = {
  phone: whatsapp,
  phoneRaw: whatsapp.replace(/\D/g, ""),
  whatsapp,
  whatsappRaw: whatsapp.replace(/\D/g, ""),
  primaryEmail: process.env.NEXT_PUBLIC_PRIMARY_EMAIL || "sales@effortsengineers.in",
  secondaryEmail: process.env.NEXT_PUBLIC_SECONDARY_EMAIL || "info@effortsengineers.in",
  address: process.env.NEXT_PUBLIC_ADDRESS || "Shop No. 10, Shirole Park, Vetal Baba Chowk, Senapati Bapat Rd, Shivajinagar, Pune, Maharashtra – 411016",
  workshopAddress: "Shop No. 11, Shirole Park, Senapati Bapat Rd, Shivajinagar, Pune – 411016",
};

export default CONTACT_CONFIG;
