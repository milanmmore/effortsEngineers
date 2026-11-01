import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("services");

export default function ServicesLayout({ children }) {
  return children;
}
