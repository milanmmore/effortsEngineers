const configuredSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dev.effortsengineers.in"
).trim();
const siteOrigin = /^https?:\/\//i.test(configuredSiteUrl)
  ? configuredSiteUrl
  : `https://${configuredSiteUrl}`;

export const SITE_ORIGIN = new URL(siteOrigin).origin;
