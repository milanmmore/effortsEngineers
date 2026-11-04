"use client";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";
import { normalizeCatalogProducts } from "@/lib/catalogProducts";
import { CONTACT_CONFIG } from "@/config/contactConfig";
import SITE_CONFIG from "@/config/site";
import EnquiryForm from "@/components/EnquiryForm";

function getProductDisplayName(item) {
  let name = item.name.trim();
  for (const prefix of [item.brand, item.series].filter(Boolean)) {
    const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    name = name.replace(new RegExp(`^${escapedPrefix}\\s*[-–—:]\\s*`, "i"), "");
  }
  return name || item.name;
}

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

function ProductsContent({
  initialCatalog,
  initialBrands = [],
  initialCategories = [],
  initialBrand = "All",
  initialQuery = "",
  initialError = "",
  initialFilterWarning = "",
}) {
  const { addItem, setIsDrawerOpen } = useContext(QuoteContext);

  const [products, setProducts] = useState(
    normalizeCatalogProducts(initialCatalog?.products || [])
  );
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [brands, setBrands] = useState(initialBrands);
  const [categories, setCategories] = useState(initialCategories);
  const [page, setPage] = useState(initialCatalog?.page || 1);
  const [total, setTotal] = useState(initialCatalog?.total || 0);
  const [totalPages, setTotalPages] = useState(initialCatalog?.totalPages || 0);
  const [isLoading, setIsLoading] = useState(!initialCatalog && !initialError);
  const [loadError, setLoadError] = useState(initialError);
  const [filterWarning, setFilterWarning] = useState(initialFilterWarning);
  const searchTimer = useRef(null);

  const loadProducts = useCallback(async (brand = "All", category = "All", nextPage = 1, query = "") => {
    setIsLoading(true);
    setLoadError("");
    try {
      const { data } = await API.get("/catalog", {
        timeout: 30000,
        params: {
          page: nextPage,
          ...(brand !== "All" && { brand }),
          ...(category !== "All" && { category }),
          ...(query.trim() && { q: query.trim() }),
        },
      });
      setProducts(normalizeCatalogProducts(data.products));
      setPage(data.page);
      setTotal(data.total);
      setTotalPages(data.totalPages);
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

  useEffect(() => () => clearTimeout(searchTimer.current), []);

  useEffect(() => {
    if (initialCatalog || initialError) return;
    const requestedBrand = new URLSearchParams(window.location.search).get("brand");
    const brand = SITE_CONFIG.brands.some(({ name }) => name === requestedBrand)
      ? requestedBrand
      : "All";
    const category = "All";
    setSelectedBrand(brand);
    setSelectedCategory(category);
    const loadFiltersAndProducts = async () => {
      try {
        const { data } = await API.get("/catalog/filters");
        setBrands(data.brands);
        setCategories(data.categories);
        setFilterWarning("");
      } catch (error) {
        console.error("Failed to load catalog filters:", error);
        setFilterWarning("Brand and category filters could not be loaded.");
      }
      await loadProducts(brand, category);
    };
    loadFiltersAndProducts();
  }, [initialCatalog, initialError, loadProducts]);

  const brandsList = useMemo(
    () => ["All", ...new Set([
      ...(brands.length ? brands : SITE_CONFIG.brands.map(({ name }) => name)),
      ...(selectedBrand !== "All" ? [selectedBrand] : []),
    ])],
    [brands, selectedBrand]
  );
  const categoryList = useMemo(
    () => ["All", ...new Set(categories)],
    [categories]
  );

  const handleFiltersChange = (brand, category) => {
    clearTimeout(searchTimer.current);
    setSelectedBrand(brand);
    setSelectedCategory(category);
    setPage(1);
    const url = new URL(window.location.href);
    if (brand === "All") url.searchParams.delete("brand");
    else url.searchParams.set("brand", brand);
    window.history.replaceState({}, "", url);
    loadProducts(brand, category, 1, searchTerm);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(
      () => loadProducts(selectedBrand, selectedCategory, 1, query),
      300
    );
  };

  const unavailableBrands = SITE_CONFIG.brands.filter(
    ({ name }) => !brands.some((availableBrand) => availableBrand.toLowerCase() === name.toLowerCase())
  );
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
              <p style={{ margin: 0 }}>
                {location.address}<br />
                <a href={location.mapUrl} target="_blank" rel="noreferrer">View on Google Maps</a>
              </p>
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
              <Link className="btn btn-outline" href={`/contact?category=${encodeURIComponent(name)}`}>
                  Enquire about this category →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className="catalog-toolbar">
        <div className="search-input-wrap">
          <input
            type="text"
            placeholder="🔍 Search by part name, compressor model, or part number..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {filterWarning && <p role="status" style={{ color: "var(--text-muted)" }}>{filterWarning}</p>}

        <div className="filter-selects">
          <select
            value={brandsList.includes(selectedBrand) ? selectedBrand : "All"}
            onChange={(event) => handleFiltersChange(event.target.value, "All")}
          >
            {brandsList.map((brand) => (
              <option key={brand} value={brand}>Brand: {brand}</option>
            ))}
          </select>

          <select
            value={categoryList.includes(selectedCategory) ? selectedCategory : "All"}
            onChange={(event) => handleFiltersChange(selectedBrand, event.target.value)}
          >
            {categoryList.map((category) => (
              <option key={category} value={category}>Category: {category}</option>
            ))}
          </select>

          <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
            📋 Open Quote Builder
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "25px", fontSize: "0.85rem", alignItems: "center" }}>
        <span style={{ fontWeight: 700, color: "var(--navy)" }}>
          Availability and pricing are confirmed on request.
        </span>
        <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontWeight: 600 }}>
          Showing {products.length} on this page of {total} matching products
        </span>
      </div>

      {!isLoading && !loadError && selectedBrand === "All" && unavailableBrands.length > 0 && (
        <section aria-labelledby="enquire-about-make-title" style={{ marginBottom: "28px" }}>
          <h2 id="enquire-about-make-title" style={{ fontSize: "1.25rem" }}>Enquire About Other Makes</h2>
          <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {unavailableBrands.map(({ name }) => (
              <article key={name} className="why-card" style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 8px" }}>{name}</h3>
                <p style={{ margin: "0 0 12px" }}>No catalog items are currently listed for this make. Ask our team about a specific model or part.</p>
                <Link className="btn btn-outline" href={`/contact?brand=${encodeURIComponent(name)}`}>
                  Enquire about {name}
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {isLoading ? (
        <p role="status" style={{ textAlign: "center", padding: "40px" }}>Loading products...</p>
      ) : loadError ? (
        <div role="alert" style={{ textAlign: "center", padding: "40px" }}>
          <p>{loadError}</p>
          <button type="button" className="btn btn-primary" onClick={() => loadProducts(selectedBrand, selectedCategory, page, searchTerm)}>
            Retry loading catalog
          </button>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <h3>{selectedBrand !== "All" ? `No listed products found for ${selectedBrand}.` : "No matching spare parts found."}</h3>
          <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "10px auto 20px" }}>
            Our team can source a wide range of components that may not all be listed online. Send your compressor drawing or sample reference for assistance.
          </p>
          <Link
            href={`/contact?${new URLSearchParams({
              ...(selectedBrand !== "All" && { brand: selectedBrand }),
              ...(selectedCategory !== "All" && { category: selectedCategory }),
              ...(searchTerm && { search: searchTerm }),
            }).toString()}`}
            className="btn btn-primary"
          >
            {selectedBrand !== "All" ? `Enquire about ${selectedBrand}` : "Submit Custom Part Requirement"} →
          </Link>
        </div>
      ) : (
        <div className="catalog-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card-modern">
              <div className="product-thumb">
                {item.image && <img src={item.image} alt={item.alt_text || item.name} />}
                <span className={`badge badge-${item.stock_type} stock-floating-pill`}>
                  {item.stock_status}
                </span>
                {item.brand && <span className="brand-floating-tag">{item.brand}</span>}
              </div>
              <div className="product-info">
                {item.part_number && (
                  <span className="product-oem-no">PART NO: {item.part_number}</span>
                )}
                <h3>{getProductDisplayName(item)}</h3>
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

      {!isLoading && !loadError && totalPages > 1 && (
        <nav aria-label="Catalog pages" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "14px", marginTop: "28px" }}>
          <button
            type="button"
            className="btn btn-outline"
            disabled={page <= 1}
            onClick={() => loadProducts(selectedBrand, selectedCategory, page - 1, searchTerm)}
          >
            Previous
          </button>
          <span aria-live="polite">Page {page} of {totalPages}</span>
          <button
            type="button"
            className="btn btn-outline"
            disabled={page >= totalPages}
            onClick={() => loadProducts(selectedBrand, selectedCategory, page + 1, searchTerm)}
          >
            Next
          </button>
        </nav>
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
