const DEFAULT_ORIGIN = "https://dev.effortsengineers.in";

if (process.env.NODE_ENV === "production" && !process.env.BASE_URL?.trim()) {
  throw new Error("BASE_URL must be set to the public website origin in production.");
}

// Keep only the first whitespace-separated token, so a stray second line
// (or trailing text) in the env variable can never leak into the URL.
const configuredBaseUrl = (process.env.BASE_URL || DEFAULT_ORIGIN)
  .trim()
  .split(/\s+/)[0];

const withProtocol = /^https?:\/\//i.test(configuredBaseUrl)
  ? configuredBaseUrl
  : `https://${configuredBaseUrl}`;

function toOrigin(value) {
  try {
    const url = new URL(value);
    // A real hostname contains only letters, digits, dots and hyphens.
    if (!/^[a-z0-9.-]+$/i.test(url.hostname)) {
      throw new Error("Invalid hostname");
    }
    return url.origin;
  } catch {
    console.error(`Invalid BASE_URL "${process.env.BASE_URL}", using default.`);
    return DEFAULT_ORIGIN;
  }
}

export const SITE_ORIGIN = toOrigin(withProtocol);
