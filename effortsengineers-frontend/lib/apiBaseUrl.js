const configuredApiUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).trim();
let apiUrl = configuredApiUrl;
if (apiUrl.startsWith("//")) {
  apiUrl = `https:${apiUrl}`;
} else if (!/^https?:\/\//i.test(apiUrl)) {
  const protocol = /^(localhost|127(?:\.\d{1,3}){3})(:\d+)?(?:\/|$)/i.test(apiUrl)
    ? "http"
    : "https";
  apiUrl = `${protocol}://${apiUrl}`;
}

export const API_BASE_URL = `${apiUrl.replace(/\/+$/, "")}/api`;
