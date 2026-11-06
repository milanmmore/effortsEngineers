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
  process.env.NEXT_PUBLIC_PRIMARY_EMAIL || "sales@effortsengineers.in";
const secondaryEmail = process.env.NEXT_PUBLIC_SECONDARY_EMAIL || "";
const emails = [primaryEmail];
const businessHours = (process.env.NEXT_PUBLIC_BUSINESS_HOURS || "").trim();
const openingHours = businessHours.split(";").map((hours) => hours.trim()).filter(Boolean);
const openingHoursPattern =
  /^(Mo|Tu|We|Th|Fr|Sa|Su)(-(Mo|Tu|We|Th|Fr|Sa|Su))? \d{2}:\d{2}-\d{2}:\d{2}$/;
const validOpeningHours = openingHours.filter((hours) => openingHoursPattern.test(hours));
if (validOpeningHours.length !== openingHours.length) {
  console.error(
    "NEXT_PUBLIC_BUSINESS_HOURS must use Schema.org format, e.g. Mo-Fr 09:00-17:00; Sa 09:00-13:00."
  );
}

function getPublicProfileUrl(value, settingName) {
  if (!value?.trim()) return null;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || !url.hostname.includes(".")) {
      throw new Error("Expected an HTTPS URL.");
    }
    return url.toString();
  } catch (error) {
    console.error(`Ignoring invalid ${settingName}:`, error.message);
    return null;
  }
}

const profileLinks = [
  {
    label: "Facebook",
    url: getPublicProfileUrl("https://www.facebook.com/effortsengg/", "Facebook profile URL"),
  },
  {
    label: "LinkedIn",
    url: getPublicProfileUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL, "LinkedIn profile URL"),
  },
  {
    label: "Google Business Profile",
    url: getPublicProfileUrl(
      process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL,
      "Google Business Profile URL"
    ),
  },
  ...(process.env.NEXT_PUBLIC_B2B_LISTING_URLS || "")
    .split(",")
    .map((url) => getPublicProfileUrl(url, "B2B listing URL"))
    .filter(Boolean)
    .map((url) => ({ label: new URL(url).hostname.replace(/^www\./, ""), url })),
].filter(({ url }) => url);
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
  businessHours,
  businessHoursLabel: businessHours || "Please contact us to confirm current business hours.",
  openingHours: validOpeningHours,
  profileLinks,
  address: businessAddress,
  workshopAddress,
  locations,
  yearsInBusinessText: "Serving industry since 1986",
  yearsInBusinessShort: "Serving industry since 1986",
};

export default CONTACT_CONFIG;
