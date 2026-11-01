import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("clientCatalog");

export default function ClientCatalogLayout({ children }) {
  return children;
}
