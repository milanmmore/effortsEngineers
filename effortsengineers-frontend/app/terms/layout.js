import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("terms");

export default function TermsLayout({ children }) {
  return children;
}
