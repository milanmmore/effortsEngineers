import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("clientOrders");

export default function ClientOrdersLayout({ children }) {
  return children;
}
