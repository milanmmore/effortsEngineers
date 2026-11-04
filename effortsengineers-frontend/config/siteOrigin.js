const configuredBaseUrl = (process.env.BASE_URL || "https://dev.effortsengineers.in").trim();
const siteOrigin = /^https?:\/\//i.test(configuredBaseUrl)
  ? configuredBaseUrl
  : `https://${configuredBaseUrl}`;

export const SITE_ORIGIN = new URL(siteOrigin).origin;
