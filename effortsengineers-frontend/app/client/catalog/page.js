"use client";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ClientLayout from "@/components/ClientLayout";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";
import SITE_CONFIG from "@/config/site";

const PAGE_SIZE = 24;

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const searchTimer = useRef(null);
  const { addItem, setIsDrawerOpen } = useContext(QuoteContext);

  const loadProducts = useCallback(async (nextPage = 1, query = "", brand = "All") => {
    setIsLoading(true);
    setLoadError("");
    try {
      const { data } = await API.get("/catalog", {
        params: {
          page: nextPage,
          ...(query.trim() && { q: query.trim() }),
          ...(brand !== "All" && { brand }),
        },
      });
      if (!Array.isArray(data.products)) {
        throw new Error("Catalog response did not contain a product page.");
      }

      setProducts(data.products.map((product) => {
        const price = product.price === null || product.price === undefined || product.price === ""
          ? null
          : Number(product.price);

        return {
          ...product,
          brand: product.brand || "",
          oem_no: product.part_number || product.oem_no || "",
          description: product.description || "",
          price: Number.isFinite(price) ? price : null,
          stock: product.stock_status || "Availability on request",
          stockType: /in stock|available/i.test(product.stock_status || "")
            ? "in-stock"
            : /low stock/i.test(product.stock_status || "")
              ? "low-stock"
              : "order",
        };
      }));
      setPage(data.page);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load client catalog:", error);
      setLoadError("Unable to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    return () => clearTimeout(searchTimer.current);
  }, [loadProducts]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    setPage(1);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadProducts(1, query, selectedBrand), 300);
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setPage(1);
    clearTimeout(searchTimer.current);
    loadProducts(1, searchTerm, brand);
  };

  return (
    <ClientLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Warehouse Inventory</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Client Spare Parts Catalog</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Search listed compressor spares and request a quotation. Availability and pricing are confirmed on enquiry.
          </p>
        </div>
        <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber">
          📋 Review Quote Builder
        </button>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          type="search"
          aria-label="Search products by name, brand, model, or part number"
          placeholder="Search name, brand, compressor model, or part number"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flex: "1 1 280px", minWidth: 0, padding: "10px 14px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)" }}
        />
        <select
          aria-label="Filter products by brand"
          value={selectedBrand}
          onChange={handleBrandChange}
          style={{ padding: "10px 14px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", background: "white" }}
        >
          <option value="All">All brands</option>
          {SITE_CONFIG.brands.map(({ name }) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
      <p aria-live="polite" style={{ color: "var(--text-muted)", marginBottom: "12px" }}>
        Showing {products.length} of {total} matching products · {PAGE_SIZE} per page
      </p>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "20px", overflowX: "auto" }}>
        {isLoading ? (
          <p role="status">Loading products...</p>
        ) : loadError ? (
          <div role="alert">
            <p>{loadError}</p>
            <button type="button" className="btn btn-outline" onClick={() => loadProducts(page, searchTerm, selectedBrand)}>
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div>
            <p>No catalog products match these filters.</p>
            <Link href={`/contact?${new URLSearchParams({
              ...(selectedBrand !== "All" && { brand: selectedBrand }),
              ...(searchTerm && { search: searchTerm }),
            }).toString()}`} className="btn btn-outline">
              Enquire about this requirement
            </Link>
          </div>
        ) : (
          <table className="quote-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Part Number</th>
                <th>Product Details</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Availability</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><code>{product.part_number || "Not listed"}</code></td>
                  <td>
                    <strong><Link href={`/products/${product.id}`}>{product.name}</Link></strong>
                    {product.description && <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{product.description}</div>}
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {[product.series, product.category, product.compatible_models]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </td>
                  <td>
                    <span className="brand-badge-card" style={{ padding: "2px 8px", fontSize: "0.75rem" }}>
                      {product.brand || "—"}
                    </span>
                  </td>
                  <td><strong>Price on request</strong></td>
                  <td><span className={`badge badge-${product.stockType}`}>{product.stock}</span></td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => addItem(product)}
                      className="btn btn-primary"
                      style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                    >
                      + Add to Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!isLoading && !loadError && totalPages > 1 && (
        <nav aria-label="Catalog pages" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "14px", marginTop: "24px" }}>
          <button type="button" className="btn btn-outline" disabled={page <= 1} onClick={() => loadProducts(page - 1, searchTerm, selectedBrand)}>
            Previous
          </button>
          <span aria-live="polite">Page {page} of {totalPages}</span>
          <button type="button" className="btn btn-outline" disabled={page >= totalPages} onClick={() => loadProducts(page + 1, searchTerm, selectedBrand)}>
            Next
          </button>
        </nav>
      )}
    </ClientLayout>
  );
}
