import { SITE_ORIGIN } from "@/config/siteOrigin";

export const dynamic = "force-static";

const publicPaths = [
  "/",
  "/about",
  "/contact",
  "/products",
  "/global-reach",
  "/productsourcing",
  "/services",
  "/warranty",
];

export default function sitemap() {
  return publicPaths.map((path) => ({
    url: new URL(path, SITE_ORIGIN).toString(),
  }));
}
