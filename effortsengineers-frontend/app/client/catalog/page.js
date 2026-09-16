"use client";
import React, { useContext, useEffect, useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";

const DEFAULT_CLIENT_PRODUCTS = [
  { id: "EE-PRD-01", name: "Cylinder Liner - Grasso RC11/12", brand: "Grasso", oem_no: "GRA-RC11-042", price: 6800, stock: "In Stock (24h Dispatch)", description: "Centrifugally cast, plateau honed for maximum ring life." },
  { id: "EE-PRD-03", name: "Piston Ring Set - Bitzer 4N", brand: "Bitzer", oem_no: "BIT-4N-382", price: 2400, stock: "In Stock (24h Dispatch)", description: "High-grade PTFE/cast-iron compression and conformable oil rings." },
  { id: "EE-PRD-05", name: "Connecting Rod - Kirloskar KC6", brand: "Kirloskar", oem_no: "KIR-KC6-098", price: 8500, stock: "In Stock (24h Dispatch)", description: "Drop forged high-tensile alloy steel with pre-fitted bronze bushes." },
  { id: "EE-PRD-07", name: "Valve Plate Assembly - Carrier 5H", brand: "Carrier", oem_no: "CAR-5H-772", price: 4200, stock: "Low Stock (4 units)", description: "Swedish flapper steel valve discs lapped to optical flatness." },
  { id: "EE-PRD-09", name: "Overhaul Gasket & Seal Kit - Sabroe CMO", brand: "Sabroe", oem_no: "SAB-CMO-GSK", price: 3800, stock: "In Stock (24h Dispatch)", description: "100% non-asbestos composite gaskets and ammonia-grade O-rings." },
];

export default function CatalogPage() {
  const [products, setProducts] = useState(DEFAULT_CLIENT_PRODUCTS);
  const { addItem, setIsDrawerOpen } = useContext(QuoteContext);

  useEffect(() => {
    API.get("/catalog")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((p, idx) => ({
            ...DEFAULT_CLIENT_PRODUCTS[idx % DEFAULT_CLIENT_PRODUCTS.length],
            id: p.id,
            name: p.name,
            price: Number(p.price) || DEFAULT_CLIENT_PRODUCTS[idx % DEFAULT_CLIENT_PRODUCTS.length].price,
            description: p.description || DEFAULT_CLIENT_PRODUCTS[idx % DEFAULT_CLIENT_PRODUCTS.length].description,
          }));
          setProducts(merged);
        }
      })
      .catch(() => {});
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
            {products.map((p) => (
              <tr key={p.id}>
                <td><code>{p.oem_no || `EE-PART-${p.id}`}</code></td>
                <td>
                  <strong>{p.name}</strong>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{p.description}</div>
                </td>
                <td>
                  <span className="brand-badge-card" style={{ padding: "2px 8px", fontSize: "0.75rem" }}>
                    {p.brand}
                  </span>
                </td>
                <td><strong>₹{p.price.toLocaleString()}</strong></td>
                <td>
                  <span className="badge badge-in-stock">
                    {p.stock}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => addItem(p)}
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
      </div>
    </ClientLayout>
  );
}
