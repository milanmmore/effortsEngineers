"use client";
import React, { useContext, useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";

const ADDITIONAL_PRODUCT_CATEGORIES = [
  {
    name: "A.C. & Refrigeration Accessories",
    examples: "Solenoid valves, cutouts, safety valves, and gauges.",
  },
  {
    name: "Hardware Material",
    examples: "Bolts, nuts, hosepipes, and springs.",
  },
];

function ProductsContent() {
  const { addItem, setIsDrawerOpen } = useContext(QuoteContext);
  const searchParams = useSearchParams();
  const initialBrand = searchParams?.get("brand") || "All";

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    API.get("/catalog")
      .then(({ data }) => {
        if (!Array.isArray(data)) {
          throw new Error("Catalog response was not a product list.");
        }

        setProducts(data.map((item) => {
          const stockQuantity = Number(item.stock_quantity) || 0;
          const stockStatus = stockQuantity > 4
            ? "In Stock (Ready for 24h Dispatch)"
            : stockQuantity > 0
              ? `Low Stock (${stockQuantity} ${stockQuantity === 1 ? "unit" : "units"} left)`
              : "Sourced to Order (3-5 days)";

          return {
            ...item,
            brand: item.brand || "",
            category: item.category || "",
            oem_no: item.oem_no || "",
            description: item.description || "",
            image: item.image_url || "/images/compressor-parts.jpg",
            stock_qty: stockQuantity,
            stock_status: stockStatus,
            stock_type: stockQuantity > 4
              ? "in-stock"
              : stockQuantity > 0
                ? "low-stock"
                : "order",
          };
        }));
      })
      .catch((error) => {
        console.error("Failed to load product catalog:", error);
        setLoadError("Unable to load products. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const brandsList = useMemo(
    () => ["All", ...new Set(products.map((item) => item.brand).filter(Boolean))],
    [products]
  );
  const categoryList = useMemo(
    () => [
      "All",
      ...new Set([
        ...products.map((item) => item.category).filter(Boolean),
        ...ADDITIONAL_PRODUCT_CATEGORIES.map(({ name }) => name),
      ]),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    return products.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.oem_no.toLowerCase().includes(normalizedSearch) ||
        item.brand.toLowerCase().includes(normalizedSearch);
      const matchBrand = selectedBrand === "All" || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchSearch && matchBrand && matchCategory;
    });
  }, [products, searchTerm, selectedBrand, selectedCategory]);

  return (
    <main className="section-shell">
      <div className="section-header">
        <span className="eyebrow">Inventory Catalog</span>
        <h1 className="section-title"><b>Live Stock</b> Compressor Spare Parts</h1>
        <p className="section-desc">
          Browse real-time ready stock of precision engineered parts compatible with leading industrial compressors. Add parts directly to your automated quotation builder.
        </p>
        <div className="separator-line" />
      </div>

      <section aria-labelledby="additional-categories-title" style={{ marginBottom: "32px" }}>
        <h2 id="additional-categories-title" style={{ fontSize: "1.35rem", marginBottom: "16px" }}>
          Accessories & Hardware
        </h2>
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {ADDITIONAL_PRODUCT_CATEGORIES.map(({ name, examples }) => (
            <article key={name} className="why-card" style={{ padding: "22px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.05rem" }}>{name}</h3>
              <p style={{ margin: "0 0 14px" }}>{examples}</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedCategory(name)}
              >
                Browse this category →
              </button>
            </article>
          ))}
        </div>
      </section>

      <div className="catalog-toolbar">
        <div className="search-input-wrap">
          <input
            type="text"
            placeholder="🔍 Search by part name, compressor model, or OEM ref (e.g. Grasso RC11, Bitzer 4N)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-selects">
          <select value={brandsList.includes(selectedBrand) ? selectedBrand : "All"} onChange={(e) => setSelectedBrand(e.target.value)}>
            {brandsList.map((brand) => (
              <option key={brand} value={brand}>Brand: {brand}</option>
            ))}
          </select>

          <select value={categoryList.includes(selectedCategory) ? selectedCategory : "All"} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categoryList.map((category) => (
              <option key={category} value={category}>Category: {category}</option>
            ))}
          </select>

          <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
            📋 Open Quotation Cart
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "25px", fontSize: "0.85rem", alignItems: "center" }}>
        <span style={{ fontWeight: 700, color: "var(--navy)" }}>Live Stock Status:</span>
        <span className="badge badge-in-stock">🟢 In Stock (Same-Day / 24h Dispatch)</span>
        <span className="badge badge-low-stock">🟡 Low Stock (1-4 Units Remaining)</span>
        <span className="badge badge-order">🔵 Sourced to Order (3-5 Days)</span>
        <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontWeight: 600 }}>
          Showing {filteredProducts.length} of {products.length} parts
        </span>
      </div>

      {isLoading ? (
        <p role="status" style={{ textAlign: "center", padding: "40px" }}>Loading products...</p>
      ) : loadError ? (
        <p role="alert" style={{ textAlign: "center", padding: "40px" }}>{loadError}</p>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <h3>{products.length === 0 ? "No products are available yet." : "No matching spare parts found."}</h3>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "10px auto 20px" }}>
            We stock over 10,000 components that may not all be listed online. Send your compressor drawing or sample reference for rapid sourcing.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Submit Custom Part Requirement →
          </Link>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredProducts.map((item) => (
            <div key={item.id} className="product-card-modern">
              <div className="product-thumb">
                <img src={item.image} alt={item.name} />
                <span className={`badge badge-${item.stock_type} stock-floating-pill`}>
                  {item.stock_status}
                </span>
                {item.brand && <span className="brand-floating-tag">{item.brand}</span>}
              </div>
              <div className="product-info">
                {item.oem_no && <span className="product-oem-no">REF: {item.oem_no}</span>}
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="product-card-bottom">
                  <button
                    onClick={() => addItem(item)}
                    className="btn btn-primary"
                    style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                  >
                    + Add to Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "60px", background: "var(--navy)", color: "white", borderRadius: "16px", padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h3 style={{ color: "white", marginBottom: "8px" }}>Looking For an Obsolete or Hard-To-Find Component?</h3>
          <p style={{ color: "#cbd5e1", margin: 0, fontSize: "0.95rem" }}>
            Our Pune engineering wing can reverse engineer or procure any non-standard compressor part from technical drawings or worn samples.
          </p>
        </div>
        <Link href="/contact" className="btn btn-amber">
          Talk to a Sourcing Engineer →
        </Link>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="section-shell" style={{ padding: "40px", textAlign: "center" }}>Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
