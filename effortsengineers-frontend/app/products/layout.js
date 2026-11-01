import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("products");

export default function ProductsLayout({ children }) {
  return children;
}
