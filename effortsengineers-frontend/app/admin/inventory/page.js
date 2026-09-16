"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import API from "@/lib/axiosClient";

const DEFAULT_INVENTORY = [
  { id: 1, sku: "GRA-RC11-LIN", name: "Cylinder Liner - Grasso RC11/12", brand: "Grasso", category: "Cylinder Liners", qty: 18, min: 5, price: 6800 },
  { id: 2, sku: "GRA-RC9-LIN", name: "Cylinder Liner - Grasso RC9", brand: "Grasso", category: "Cylinder Liners", qty: 12, min: 4, price: 6200 },
  { id: 3, sku: "BIT-4N-RNG", name: "Piston Ring Set - Bitzer 4N", brand: "Bitzer", category: "Piston Rings", qty: 35, min: 10, price: 2400 },
  { id: 4, sku: "BIT-4G-PST", name: "Piston Assembly - Bitzer 4G", brand: "Bitzer", category: "Pistons", qty: 2, min: 5, price: 7800 },
  { id: 5, sku: "KIR-KC6-ROD", name: "Connecting Rod - Kirloskar KC6", brand: "Kirloskar", category: "Connecting Rods", qty: 14, min: 4, price: 8500 },
  { id: 6, sku: "KIR-KC-BRG", name: "Crankshaft Main Bush - Kirloskar", brand: "Kirloskar", category: "Bearings & Bushes", qty: 22, min: 6, price: 4900 },
  { id: 7, sku: "CAR-5H-VLV", name: "Valve Plate Assembly - Carrier 5H", brand: "Carrier", category: "Valves & Reeds", qty: 3, min: 8, price: 4200 },
  { id: 8, sku: "CAR-5F-ROD", name: "Connecting Rod - Carrier 5F", brand: "Carrier", category: "Connecting Rods", qty: 8, min: 4, price: 7600 },
  { id: 9, sku: "SAB-CMO-GSK", name: "Overhaul Gasket Kit - Sabroe CMO", brand: "Sabroe", category: "Seals & Gaskets", qty: 25, min: 8, price: 3800 },
  { id: 10, sku: "SAB-SMC-SL", name: "Shaft Seal Assembly - Sabroe SMC", brand: "Sabroe", category: "Seals & Gaskets", qty: 1, min: 4, price: 9200 },
];

export default function AdminInventoryPage() {
  const [items, setItems] = useState(DEFAULT_INVENTORY);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSku, setNewSku] = useState({
    sku: "",
    name: "",
    brand: "Grasso",
    category: "Cylinder Liners",
    qty: 10,
    min: 5,
    price: 5000,
  });

  useEffect(() => {
    API.get("/inventory")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Merge API inventory with default rich schema
          const merged = res.data.map((inv, idx) => ({
            ...DEFAULT_INVENTORY[idx % DEFAULT_INVENTORY.length],
            id: inv.id,
            qty: inv.quantity !== undefined ? inv.quantity : DEFAULT_INVENTORY[idx % DEFAULT_INVENTORY.length].qty,
          }));
          setItems(merged);
        }
      })
      .catch(() => {
        // use DEFAULT_INVENTORY
      });
  }, []);

  const adjustStock = async (id, delta) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const newQty = Math.max(0, it.qty + delta);
          // Sync with backend API
          API.put(`/inventory/${id}`, { quantity: newQty }).catch(() => {});
          return { ...it, qty: newQty };
        }
        return it;
      })
    );
  };

  const handleAddSku = (e) => {
    e.preventDefault();
    const newItem = {
      ...newSku,
      id: items.length + 1,
      qty: Number(newSku.qty),
      min: Number(newSku.min),
      price: Number(newSku.price),
    };
    setItems([newItem, ...items]);
    setIsAddModalOpen(false);
    setNewSku({ sku: "", name: "", brand: "Grasso", category: "Cylinder Liners", qty: 10, min: 5, price: 5000 });
  };

  const filteredItems = items.filter((it) => {
    const matchesSearch =
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      it.sku.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brandFilter === "All" || it.brand === brandFilter;
    return matchesSearch && matchesBrand;
  });

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Warehouse Inventory Control</span>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Stock & Catalog Management</h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0" }}>
            Maintain live ready stock quantities, reorder points, and unit pricing across all compressor product lines.
          </p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
          + Add New Product SKU
        </button>
      </div>

      {/* Filter Toolbar */}
      <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid var(--line)", marginBottom: "20px", display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="🔍 Search SKU or part name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: "240px", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
        />
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          style={{ padding: "10px 14px", border: "1px solid var(--line)", borderRadius: "6px", background: "white", fontSize: "0.88rem", fontWeight: 600 }}
        >
          <option value="All">All Brands</option>
          <option value="Grasso">Grasso</option>
          <option value="Bitzer">Bitzer</option>
          <option value="Kirloskar">Kirloskar</option>
          <option value="Carrier">Carrier</option>
          <option value="Sabroe">Sabroe</option>
        </select>
        <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginLeft: "auto" }}>
          Showing {filteredItems.length} SKUs
        </span>
      </div>

      {/* Inventory Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid var(--line)", padding: "20px", overflowX: "auto" }}>
        <table className="quote-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>SKU / Part Code</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Unit Price (₹)</th>
              <th>Current Stock</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Adjust Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => {
              const isLow = item.qty <= item.min;
              return (
                <tr key={item.id} style={{ background: isLow ? "#fff1f2" : "inherit" }}>
                  <td><code>{item.sku}</code></td>
                  <td><strong>{item.name}</strong></td>
                  <td><span className="brand-badge-card" style={{ padding: "3px 10px", fontSize: "0.75rem" }}>{item.brand}</span></td>
                  <td>₹{item.price.toLocaleString()}</td>
                  <td>
                    <strong style={{ fontSize: "1.1rem", color: isLow ? "var(--accent-red)" : "var(--navy)" }}>
                      {item.qty} units
                    </strong>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>Min Reorder: {item.min}</div>
                  </td>
                  <td>
                    <span className={`badge ${isLow ? "badge-low-stock" : "badge-in-stock"}`}>
                      {isLow ? `⚠️ Low Stock (${item.qty})` : "🟢 Optimal Stock"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                      <button className="qty-btn" onClick={() => adjustStock(item.id, -1)} title="Decrease Stock">-</button>
                      <button className="qty-btn" onClick={() => adjustStock(item.id, 1)} title="Increase Stock">+</button>
                      <button className="qty-btn" onClick={() => adjustStock(item.id, 10)} title="+10 Batch Stock" style={{ width: "auto", padding: "0 6px", fontSize: "0.75rem" }}>+10</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add New SKU Modal */}
      {isAddModalOpen && (
        <div className="drawer-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div
            style={{
              background: "white",
              maxWidth: "500px",
              width: "90%",
              margin: "auto",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "var(--shadow-xl)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Add New Compressor Part SKU</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer" }}>✕</button>
            </div>

            <form onSubmit={handleAddSku} style={{ display: "grid", gap: "14px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                Part SKU / OEM Ref *
                <input required type="text" placeholder="e.g. GRA-RC12-LIN" value={newSku.sku} onChange={(e) => setNewSku({ ...newSku, sku: e.target.value })} style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px" }} />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                Part Name / Specification *
                <input required type="text" placeholder="e.g. Cylinder Liner - Grasso RC12" value={newSku.name} onChange={(e) => setNewSku({ ...newSku, name: e.target.value })} style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px" }} />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                  Brand *
                  <select value={newSku.brand} onChange={(e) => setNewSku({ ...newSku, brand: e.target.value })} style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px", background: "white" }}>
                    <option value="Grasso">Grasso</option>
                    <option value="Bitzer">Bitzer</option>
                    <option value="Kirloskar">Kirloskar</option>
                    <option value="Carrier">Carrier</option>
                    <option value="Sabroe">Sabroe</option>
                    <option value="Bock">Bock</option>
                    <option value="Daikin">Daikin</option>
                  </select>
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                  Base Price (₹) *
                  <input required type="number" value={newSku.price} onChange={(e) => setNewSku({ ...newSku, price: e.target.value })} style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px" }} />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                  Initial Stock Quantity
                  <input required type="number" value={newSku.qty} onChange={(e) => setNewSku({ ...newSku, qty: e.target.value })} style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px" }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                  Min Reorder Threshold
                  <input required type="number" value={newSku.min} onChange={(e) => setNewSku({ ...newSku, min: e.target.value })} style={{ padding: "9px 12px", border: "1px solid var(--line)", borderRadius: "4px" }} />
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Product SKU</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
