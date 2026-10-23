"use client";
import React, { useContext, useEffect, useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const { addItem, setIsDrawerOpen } = useContext(QuoteContext);

  useEffect(() => {
    API.get("/catalog")
      .then(({ data }) => {
        if (!Array.isArray(data)) {
          throw new Error("Catalog response was not a product list.");
        }
        setProducts(data.map((product) => {
          const stockQuantity = Number(product.stock_quantity) || 0;
          const stock = stockQuantity > 4
            ? `In Stock (${stockQuantity} units)`
            : stockQuantity > 0
              ? `Low Stock (${stockQuantity} ${stockQuantity === 1 ? "unit" : "units"})`
              : "Sourced to Order";
          const stockType = stockQuantity > 4
            ? "in-stock"
            : stockQuantity > 0
              ? "low-stock"
              : "order";

          return {
            ...product,
            brand: product.brand || "",
            oem_no: product.oem_no || "",
            description: product.description || "",
            price: Number(product.price) || 0,
            stock,
            stockType,
          };
        }));
      })
      .catch((error) => {
        console.error("Failed to load client catalog:", error);
        setLoadError("Unable to load products. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ClientLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Warehouse Inventory</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Client Spare Parts Catalog</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Add standard replacement compressor spares directly to your quotation cart.
          </p>
        </div>
        <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber">
          📋 Review Quotation Cart
        </button>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "20px", overflowX: "auto" }}>
        {isLoading ? (
          <p role="status">Loading products...</p>
        ) : loadError ? (
          <p role="alert">{loadError}</p>
        ) : products.length === 0 ? (
          <p>No products are available yet.</p>
        ) : (
          <table className="quote-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Part Reference</th>
                <th>Description</th>
                <th>Brand</th>
                <th>Base Rate</th>
                <th>Warehouse Stock</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><code>{product.oem_no || `EE-PART-${product.id}`}</code></td>
                  <td>
                    <strong>{product.name}</strong>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{product.description}</div>
                  </td>
                  <td>
                    <span className="brand-badge-card" style={{ padding: "2px 8px", fontSize: "0.75rem" }}>
                      {product.brand || "—"}
                    </span>
                  </td>
                  <td><strong>₹{product.price.toLocaleString()}</strong></td>
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
    </ClientLayout>
  );
}
