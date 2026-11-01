import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("adminOrders");

export default function AdminOrdersLayout({ children }) {
  return children;
}
