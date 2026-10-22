// config/contactConfig.js
/**
 * Single source of truth for all contact details across the website.
 * Reads from environment variables with robust defaults.
 */

export const CONTACT_CONFIG = {
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 20 2567 8102",
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW || "912025678102",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+91 90960 01010",
  whatsappRaw: process.env.NEXT_PUBLIC_WHATSAPP_RAW || "919096001010",
  primaryEmail: process.env.NEXT_PUBLIC_PRIMARY_EMAIL || "efforts.engineers@hotmail.com",
  secondaryEmail: process.env.NEXT_PUBLIC_SECONDARY_EMAIL || "saurabh@effortsengineers.in",
  address: process.env.NEXT_PUBLIC_ADDRESS || "Shop No. 10, Shirole Park, Vetal Baba Chowk, Senapati Bapat Rd, Shivajinagar, Pune, Maharashtra, India",
};

export default CONTACT_CONFIG;

