import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("about");

export default function AboutLayout({ children }) {
  return children;
}
