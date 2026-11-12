import { SITE_ORIGIN } from "@/config/siteOrigin";

export const dynamic = "force-static";

const isIndexingEnabled = process.env.ALLOW_INDEXING === "true";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      ...(isIndexingEnabled ? { allow: "/", disallow: ["/admin", "/client", "/auth"] } : { disallow: "/" }),
    },
    ...(isIndexingEnabled && {
      sitemap: new URL("/sitemap.xml", SITE_ORIGIN).toString(),
    }),
  };
}
