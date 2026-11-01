import { getPageMetadata } from "@/config/pageMetadata";

export const metadata = getPageMetadata("clientDashboard");

export default function ClientDashboardLayout({ children }) {
  return children;
}
