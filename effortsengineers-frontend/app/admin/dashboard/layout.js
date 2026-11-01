import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("adminDashboard");

export default function AdminDashboardLayout({ children }) {
  return children;
}
