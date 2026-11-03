"use client";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";
import { normalizeCatalogProducts } from "@/lib/catalogProducts";
import { CONTACT_CONFIG } from "@/config/contactConfig";
import EnquiryForm from "@/components/EnquiryForm";

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

function ProductsContent({ initialProducts, initialCatalogLoaded, initialCatalogError }) {
  const { addItem, setIsDrawerOpen } = useContext(QuoteContext);

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(!initialCatalogLoaded);
  const [loadError, setLoadError] = useState(initialCatalogError);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const { data } = await API.get("/catalog", { timeout: 30000 });
      setProducts(normalizeCatalogProducts(data));
    } catch (error) {
      console.error("Failed to load product catalog:", error);
      setLoadError(
        error.code === "ECONNABORTED"
          ? "The catalog request timed out. Check your connection and try again."
          : "Unable to load products. Check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const requestedBrand = new URLSearchParams(window.location.search).get("brand");
    if (requestedBrand) setSelectedBrand(requestedBrand);
  }, []);

  useEffect(() => {
    if (!initialCatalogLoaded) loadProducts();
  }, [initialCatalogLoaded, loadProducts]);

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
        item.part_number.toLowerCase().includes(normalizedSearch) ||
        item.series.toLowerCase().includes(normalizedSearch) ||
        item.compatible_models.toLowerCase().includes(normalizedSearch) ||
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
        <h1 className="section-title"><b>Product</b> Catalog</h1>
        <p className="section-desc">
          Browse compressor spare parts and compatibility details from our catalog. Contact us to confirm current availability and pricing.
        </p>
        <div className="separator-line" />
      </div>

      <section aria-labelledby="shop-locations-title" style={{ marginBottom: "32px" }}>
        <h2 id="shop-locations-title" style={{ fontSize: "1.35rem", marginBottom: "8px" }}>
          Pune Locations
        </h2>
        <p style={{ color: "var(--text-muted)", margin: "0 0 16px" }}>
          Browse our shared product catalog and contact the right location for your enquiry.
        </p>
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {CONTACT_CONFIG.locations.map((location) => (
            <article key={location.id} className="why-card" style={{ padding: "22px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.05rem" }}>
                {location.shop} · {location.role}
              </h3>
              <p style={{ margin: 0 }}>{location.address}</p>
            </article>
          ))}
        </div>
      </section>

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
        <span style={{ fontWeight: 700, color: "var(--navy)" }}>
          Availability and pricing are confirmed on request.
        </span>
        <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontWeight: 600 }}>
          Showing {filteredProducts.length} of {products.length} products
        </span>
      </div>

      {isLoading ? (
        <p role="status" style={{ textAlign: "center", padding: "40px" }}>Loading products...</p>
      ) : loadError ? (
        <div role="alert" style={{ textAlign: "center", padding: "40px" }}>
          <p>{loadError}</p>
          <button type="button" className="btn btn-primary" onClick={loadProducts}>
            Retry loading catalog
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <h3>{products.length === 0 ? "No products are available yet." : "No matching spare parts found."}</h3>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "10px auto 20px" }}>
            Our team can source a wide range of components that may not all be listed online. Send your compressor drawing or sample reference for assistance.
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
                <img src={item.image} alt={item.alt_text || item.name} />
                <span className={`badge badge-${item.stock_type} stock-floating-pill`}>
                  {item.stock_status}
                </span>
                {item.brand && <span className="brand-floating-tag">{item.brand}</span>}
              </div>
              <div className="product-info">
                {(item.part_number || item.oem_no) && (
                  <span className="product-oem-no">PART NO: {item.part_number || item.oem_no}</span>
                )}
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
                {(item.series || item.category || item.compatible_models || item.material_size) && (
                  <dl style={{ margin: "0 0 16px", fontSize: "0.85rem" }}>
                    {item.series && (
                      <div><dt style={{ display: "inline", fontWeight: 700 }}>Series: </dt><dd style={{ display: "inline", margin: 0 }}>{item.series}</dd></div>
                    )}
                    {item.category && (
                      <div><dt style={{ display: "inline", fontWeight: 700 }}>Category: </dt><dd style={{ display: "inline", margin: 0 }}>{item.category}</dd></div>
                    )}
                    {item.compatible_models && (
                      <div><dt style={{ display: "inline", fontWeight: 700 }}>Compatible models: </dt><dd style={{ display: "inline", margin: 0 }}>{item.compatible_models}</dd></div>
                    )}
                    {item.material_size && (
                      <div><dt style={{ display: "inline", fontWeight: 700 }}>Material / size: </dt><dd style={{ display: "inline", margin: 0 }}>{item.material_size}</dd></div>
                    )}
                  </dl>
                )}
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
            Share drawings, photographs, or worn-sample details for an enquiry. Feasibility, supplier or partner capability, and scope are confirmed before quotation.
          </p>
        </div>
        <Link href="/contact" className="btn btn-amber">
          Contact Our Sourcing Team →
        </Link>
      </div>
      <div style={{ marginTop: "60px" }}>
        <EnquiryForm source="Product catalog" title="Ask About a Compressor Spare Part" />
      </div>
    </main>
  );
}

export default function ProductsClient(props) {
  return <ProductsContent {...props} />;
}
