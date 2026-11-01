import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("adminInventory");

export default function AdminInventoryLayout({ children }) {
  return children;
}
