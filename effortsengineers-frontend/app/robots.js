import { SITE_ORIGIN } from "@/config/siteOrigin";

export const dynamic = "force-static";

const isIndexingEnabled = process.env.ALLOW_INDEXING === "true";

export default function robots() {
  return {
    rules: isIndexingEnabled
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/admin/", "/client", "/client/", "/auth", "/auth/", "/api", "/api/"],
        }
      : { userAgent: "*", disallow: "/" },
    ...(isIndexingEnabled && {
      sitemap: new URL("/sitemap.xml", SITE_ORIGIN).toString(),
    }),
  };
}
