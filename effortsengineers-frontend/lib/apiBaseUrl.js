const isProduction = process.env.NODE_ENV === "production";
const configuredApiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").trim();
const trustedOriginConfig = (process.env.NEXT_PUBLIC_API_TRUSTED_ORIGINS || "").trim();

function parseOrigin(value, label) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid absolute HTTP(S) URL.`);
  }

  if (!/^https?:$/.test(url.protocol) || !url.hostname) {
    throw new Error(`${label} must use HTTP or HTTPS and include a hostname.`);
  }
  if (url.username || url.password || url.search || url.hash) {
    throw new Error(`${label} must not contain credentials, a query string, or a fragment.`);
  }
  if (url.pathname !== "/" && url.pathname !== "" && url.pathname !== "/api") {
    throw new Error(`${label} must be an origin, optionally followed by /api.`);
  }

  return url;
}

const configuredUrl = parseOrigin(configuredApiUrl, "NEXT_PUBLIC_API_URL");
const apiHostname = configuredUrl.hostname.toLowerCase();
const isLoopback = apiHostname === "localhost";
const trustedHostnames = ["effortsengineers.in", "localhost"];

if (!trustedHostnames.includes(apiHostname)) {
  throw new Error("Untrusted API_BASE_URL: hostname must be localhost or effortsengineers.in.");
}

if (configuredUrl.protocol === "http:" && (!isLoopback || isProduction)) {
  throw new Error("NEXT_PUBLIC_API_URL must use HTTPS except for localhost during development.");
}
if (isProduction && isLoopback) {
  throw new Error("NEXT_PUBLIC_API_URL cannot point to localhost in production.");
}

const trustedOrigins = trustedOriginConfig
  ? trustedOriginConfig.split(",").map((value) => parseOrigin(value.trim(), "NEXT_PUBLIC_API_TRUSTED_ORIGINS").origin)
  : isProduction
    ? []
    : ["http://localhost:5000", "https://localhost:5000"];

if (isProduction && trustedOrigins.length === 0) {
  throw new Error("NEXT_PUBLIC_API_TRUSTED_ORIGINS must list the permitted backend origins in production.");
}
if (!trustedOrigins.includes(configuredUrl.origin)) {
  throw new Error("NEXT_PUBLIC_API_URL origin is not listed in NEXT_PUBLIC_API_TRUSTED_ORIGINS.");
}

configuredUrl.pathname = "/api";
export const API_BASE_URL = configuredUrl.toString().replace(/\/$/, "");

export function createApiUrl(...pathSegments) {
  const url = new URL(API_BASE_URL);
  const basePath = url.pathname.replace(/\/+$/, "");
  const encodedPath = pathSegments.map((segment) => encodeURIComponent(String(segment))).join("/");
  url.pathname = encodedPath ? `${basePath}/${encodedPath}` : basePath;
  return url;
}
