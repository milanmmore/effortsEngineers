import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("login");

export default function LoginLayout({ children }) {
  return children;
}
