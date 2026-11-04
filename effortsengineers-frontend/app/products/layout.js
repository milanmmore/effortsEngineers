import { getPageMetadata } from "@/config/pageMetadata";

const pageMetadata = getPageMetadata("products");

export const metadata = {
  ...pageMetadata,
  openGraph: {
    type: "website",
    url: pageMetadata.alternates.canonical,
    title: pageMetadata.title,
    description: pageMetadata.description,
    siteName: "Efforts Engineers",
  },
};

export default function ProductsLayout({ children }) {
  return children;
}
