const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dev.effortsengineers.in";
const isIndexingEnabled = process.env.NEXT_PUBLIC_INDEX_SITE === "true";

const pageMetadata = {
  about: {
    path: "/about",
    title: "About Efforts Engineers | Compressor Spares Sourcing Since 1986",
    description: "Learn about Efforts Engineers, a Pune-based supplier-network partner for industrial refrigeration and compressor spare parts.",
  },
  contact: {
    path: "/contact",
    title: "Contact Efforts Engineers | Compressor Spare Parts Enquiries",
    description: "Send an industrial compressor spare-parts enquiry, attach a nameplate photo or drawing, and contact Efforts Engineers in Pune.",
  },
  products: {
    path: "/products",
    title: "Compressor Spare Parts Catalog | Efforts Engineers",
    description: "Browse industrial compressor spare parts by make, model, series, and category. Confirm availability and pricing with Efforts Engineers.",
  },
  globalReach: {
    path: "/global-reach",
    title: "Compressor Spares Export from India | Efforts Engineers",
    description: "Review export support, shipment documentation, packaging options, and destination-specific arrangements for compressor spare parts.",
  },
  productsourcing: {
    path: "/productsourcing",
    title: "Custom Compressor Parts Sourcing | Efforts Engineers",
    description: "Request sourcing support for hard-to-find and discontinued compressor parts using a model number, part reference, photo, or drawing.",
  },
  services: {
    path: "/services",
    title: "Compressor Overhaul Coordination & Engineering Support",
    description: "Explore compressor spare-parts sourcing and coordination with external engineering and manufacturing partners.",
  },
  warranty: {
    path: "/warranty",
    title: "Product Warranty Terms & Support | Efforts Engineers",
    description: "Learn how product-specific warranty coverage and claims are reviewed according to the accepted quotation or order documents.",
  },
  login: {
    path: "/auth/login",
    title: "Customer Portal Sign In | Efforts Engineers",
    description: "Sign in to the Efforts Engineers customer portal to access quotations, order information, and account services.",
  },
  register: {
    path: "/auth/register",
    title: "Register for the Customer Portal | Efforts Engineers",
    description: "Create an Efforts Engineers customer portal account to access quotation and order services.",
  },
  clientDashboard: {
    path: "/client/dashboard",
    title: "Customer Dashboard | Efforts Engineers",
    description: "View customer account information and available order and quotation services in the Efforts Engineers portal.",
  },
  clientCatalog: {
    path: "/client/catalog",
    title: "Customer Product Catalog | Efforts Engineers",
    description: "Browse compressor spare-parts catalog information available to Efforts Engineers customer portal users.",
  },
  clientOrders: {
    path: "/client/orders",
    title: "Customer Orders | Efforts Engineers",
    description: "Review order information and dispatch updates available in the Efforts Engineers customer portal.",
  },
  clientQuotation: {
    path: "/client/quotation",
    title: "Customer Quotations | Efforts Engineers",
    description: "Review and print quotation information available in the Efforts Engineers customer portal.",
  },
  adminDashboard: {
    path: "/admin/dashboard",
    title: "Administration Dashboard | Efforts Engineers",
    description: "Efforts Engineers internal administration dashboard.",
  },
  adminForecasting: {
    path: "/admin/forecasting",
    title: "Inventory Forecasting | Efforts Engineers Administration",
    description: "Efforts Engineers internal inventory forecasting dashboard.",
  },
  adminInventory: {
    path: "/admin/inventory",
    title: "Inventory Management | Efforts Engineers Administration",
    description: "Efforts Engineers internal compressor spare-parts inventory management.",
  },
  adminOrders: {
    path: "/admin/orders",
    title: "Order Management | Efforts Engineers Administration",
    description: "Efforts Engineers internal customer order management.",
  },
  adminQuotations: {
    path: "/admin/quotations",
    title: "Quotation Management | Efforts Engineers Administration",
    description: "Efforts Engineers internal RFQ and quotation management.",
  },
};

export function getPageMetadata(pageKey) {
  const page = pageMetadata[pageKey];
  if (!page) {
    throw new Error(`Missing page metadata for "${pageKey}".`);
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: new URL(page.path, siteUrl).toString(),
    },
    robots: {
      index: isIndexingEnabled,
      follow: isIndexingEnabled,
    },
  };
}

export default pageMetadata;
