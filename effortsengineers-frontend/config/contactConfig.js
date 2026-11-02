// config/contactConfig.js
/**
 * Single source of truth for contact details and approved business messaging.
 * Reads from environment variables with robust defaults.
 */

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "+91 90960 01010";
const yearsInBusinessText = "Serving industry since 1986";
const businessAddress =
  process.env.NEXT_PUBLIC_ADDRESS ||
  "Shop No. 10, Shirole Park, Vetal Baba Chowk, Senapati Bapat Rd, Shivajinagar, Pune, Maharashtra, India";
const workshopAddress =
  "Shop No. 11, Shirole Park, Vetal Baba Chowk, Senapati Bapat Rd, Shivajinagar, Pune, Maharashtra, India";
const primaryEmail =
  process.env.NEXT_PUBLIC_PRIMARY_EMAIL || "sales@effortsengineers.in";
const secondaryEmail = process.env.NEXT_PUBLIC_SECONDARY_EMAIL || primaryEmail;
const emails = [primaryEmail, secondaryEmail].filter(
  (email, index, addresses) =>
    email.trim() &&
    addresses.findIndex(
      (address) => address.trim().toLowerCase() === email.trim().toLowerCase()
    ) === index
);

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
  yearsInBusinessText,
  yearsInBusinessShort: yearsInBusinessText,
};

export default CONTACT_CONFIG;
