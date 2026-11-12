"use client";
import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import API from "@/lib/axiosClient";

export default function AdminInventoryPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [loadError, setLoadError] = useState("");
  const [updatingIds, setUpdatingIds] = useState([]);

  useEffect(() => {
    API.get("/inventory")
      .then(({ data }) => {
        setItems((Array.isArray(data) ? data : []).map((item) => ({
          id: item.id,
          productId: item.product_id,
          sku: item.part_number || `Inventory #${item.id}`,
          name: item.name || `Catalog product #${item.product_id}`,
          brand: item.brand || "Brand not recorded",
          quantity: Number(item.quantity) || 0,
          updatedAt: item.updated_at,
        })));
      })
      .catch((error) => {
        console.error("Failed to load inventory:", error);
        setLoadError("Inventory records are temporarily unavailable.");
      });
  }, []);

  const brands = useMemo(
    () => ["All", ...new Set(items.map(({ brand }) => brand).filter((brand) => brand !== "Brand not recorded"))],
    [items]
  );
  const filteredItems = items.filter((item) => {
    const matchesSearch = `${item.sku} ${item.name} ${item.productId}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch && (brandFilter === "All" || item.brand === brandFilter);
  });

  const adjustStock = async (item, delta) => {
    const quantity = Math.max(0, item.quantity + delta);
    setUpdatingIds((current) => [...current, item.id]);
    setLoadError("");
    try {
      await API.put(`/inventory/${item.id}`, { quantity });
      setItems((current) => current.map((entry) =>
        entry.id === item.id ? { ...entry, quantity } : entry
      ));
    } catch (error) {
      console.error("Failed to update inventory quantity:", error);
      setLoadError(`Could not update inventory record #${item.id}. Please try again.`);
    } finally {
      setUpdatingIds((current) => current.filter((id) => id !== item.id));
    }
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: "25px" }}>
        <span className="eyebrow" style={{ color: "var(--primary)" }}>Warehouse Inventory</span>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Inventory Quantities</h1>
        <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
          Quantities shown here come from inventory records. Reorder thresholds and unit prices are not recorded in this view.
        </p>
      </div>

      {loadError && <p role="alert">{loadError}</p>}

      <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid var(--line)", marginBottom: "20px", display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="search"
          aria-label="Search inventory by part number or name"
          placeholder="Search part number or name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{ flex: 1, minWidth: "240px", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
        />
        <select
          aria-label="Filter inventory by brand"
          value={brandFilter}
          onChange={(event) => setBrandFilter(event.target.value)}
          style={{ padding: "10px 14px", border: "1px solid var(--line)", borderRadius: "6px", background: "white", fontSize: "0.88rem", fontWeight: 600 }}
        >
          {brands.map((brand) => <option key={brand} value={brand}>{brand === "All" ? "All Brands" : brand}</option>)}
        </select>
        <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginLeft: "auto" }}>
          {filteredItems.length} inventory records
        </span>
      </div>

      <section aria-labelledby="inventory-records-title" style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "20px", overflowX: "auto" }}>
        <h2 id="inventory-records-title" style={{ fontSize: "1.2rem", margin: "0 0 14px" }}>Recorded Stock Quantities</h2>
        <table className="quote-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>Inventory Record</th>
              <th>Catalog Part</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Last Updated</th>
              <th style={{ textAlign: "center" }}>Adjust Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td><code>{item.sku}</code></td>
                <td><strong>{item.name}</strong></td>
                <td>{item.brand}</td>
                <td><strong>{item.quantity} units</strong></td>
                <td>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "Not recorded"}</td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                    <button type="button" className="qty-btn" disabled={item.quantity <= 0 || updatingIds.includes(item.id)} onClick={() => adjustStock(item, -1)} aria-label={`Decrease quantity for ${item.name}`}>-</button>
                    <button type="button" className="qty-btn" disabled={updatingIds.includes(item.id)} onClick={() => adjustStock(item, 1)} aria-label={`Increase quantity for ${item.name}`}>+</button>
                    <button type="button" className="qty-btn" disabled={updatingIds.includes(item.id)} onClick={() => adjustStock(item, 10)} aria-label={`Increase quantity for ${item.name} by 10`} style={{ width: "auto", padding: "0 6px", fontSize: "0.75rem" }}>+10</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && !loadError && (
              <tr><td colSpan="6">No inventory records are currently available.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </AdminLayout>
  );
}
