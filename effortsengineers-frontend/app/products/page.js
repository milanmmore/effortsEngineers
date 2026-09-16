"use client";
import React, { useContext, useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QuoteContext } from "@/context/QuoteContext";
import API from "@/lib/axiosClient";

const ALL_PRODUCTS = [
  {
    id: "EE-PRD-01",
    name: "Cylinder Liner - Grasso RC11 / RC12",
    brand: "Grasso",
    category: "Cylinder Liners",
    oem_no: "GRA-RC11-042",
    price: 6800,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 18,
    image: "/images/liners-bushes.jpg",
    description: "Centrifugally cast alloy iron liner with plateau-honed bore for optimal oil film retention and low blow-by.",
  },
  {
    id: "EE-PRD-02",
    name: "Cylinder Liner - Grasso RC9",
    brand: "Grasso",
    category: "Cylinder Liners",
    oem_no: "GRA-RC9-021",
    price: 6200,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 12,
    image: "/images/liners-bushes.jpg",
    description: "Centrifugally cast sleeve diamond-turned for precision fit into cylinder jacket under deep freeze thermal cycles.",
  },
  {
    id: "EE-PRD-03",
    name: "Piston Ring Set - Bitzer 4N / 4P / 6F",
    brand: "Bitzer",
    category: "Piston Rings",
    oem_no: "BIT-4N-382",
    price: 2400,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 35,
    image: "/images/piston-rings.jpg",
    description: "Includes high-ductility compression rings and conformable oil scraper rings with spring expanders.",
  },
  {
    id: "EE-PRD-04",
    name: "Piston Assembly Complete - Bitzer 4G / 6G",
    brand: "Bitzer",
    category: "Pistons",
    oem_no: "BIT-4G-550",
    price: 7800,
    stock_status: "Low Stock (3 units left)",
    stock_type: "low-stock",
    stock_qty: 3,
    image: "/images/compressor-parts.jpg",
    description: "Low-expansion eutectic silicon aluminium alloy piston with precision gudgeon pin and circlips.",
  },
  {
    id: "EE-PRD-05",
    name: "Connecting Rod Assembly - Kirloskar KC6 / KCX",
    brand: "Kirloskar",
    category: "Connecting Rods",
    oem_no: "KIR-KC6-098",
    price: 8500,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 14,
    image: "/images/connecting-rods.jpg",
    description: "Drop-forged high-tensile steel rod balanced end-to-end, pre-fitted with leaded bronze small-end bushing.",
  },
  {
    id: "EE-PRD-06",
    name: "Crankshaft Bush & Main Bearing Set - Kirloskar KC",
    brand: "Kirloskar",
    category: "Bearings & Bushes",
    oem_no: "KIR-KC-BRG10",
    price: 4900,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 22,
    image: "/images/liners-bushes.jpg",
    description: "Centrifugally cast phosphor bronze main journal bush machined to exacting running clearance.",
  },
  {
    id: "EE-PRD-07",
    name: "Suction & Discharge Valve Plate - Carrier 5H",
    brand: "Carrier",
    category: "Valves & Reeds",
    oem_no: "CAR-5H-772",
    price: 4200,
    stock_status: "Low Stock (4 units left)",
    stock_type: "low-stock",
    stock_qty: 4,
    image: "/images/compressor-parts.jpg",
    description: "Manufactured from hardened Swedish flapper steel lapped flat to within 2 light bands for zero gas blowback.",
  },
  {
    id: "EE-PRD-08",
    name: "Connecting Rod - Carrier 5F",
    brand: "Carrier",
    category: "Connecting Rods",
    oem_no: "CAR-5F-114",
    price: 7600,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 8,
    image: "/images/connecting-rods.jpg",
    description: "High-integrity marine reefer connecting rod with precision ground crankpin journal bore.",
  },
  {
    id: "EE-PRD-09",
    name: "Complete Overhaul Gasket & Seal Kit - Sabroe CMO 14/28",
    brand: "Sabroe",
    category: "Seals & Gaskets",
    oem_no: "SAB-CMO-GSK9",
    price: 3800,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 25,
    image: "/images/seals-kits.jpg",
    description: "100% non-asbestos composite head gaskets, suction/discharge manifold seals, and oil sump gaskets.",
  },
  {
    id: "EE-PRD-10",
    name: "Mechanical Shaft Seal Assembly - Sabroe SMC",
    brand: "Sabroe",
    category: "Seals & Gaskets",
    oem_no: "SAB-SMC-SL22",
    price: 9200,
    stock_status: "Made to Order (3-5 days)",
    stock_type: "order",
    stock_qty: 0,
    image: "/images/seals-kits.jpg",
    description: "Bellows-type carbon against tungsten carbide faces for zero refrigerant loss under high backpressure.",
  },
  {
    id: "EE-PRD-11",
    name: "Cylinder Liner - Bock F3 / F4 / F5",
    brand: "Bock",
    category: "Cylinder Liners",
    oem_no: "BCK-F4-441",
    price: 5900,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 11,
    image: "/images/liners-bushes.jpg",
    description: "Close-grained pearlitic cast iron sleeve with uniform wall thickness and fine honed internal bore.",
  },
  {
    id: "EE-PRD-12",
    name: "Valve Reed Plate Set - Daikin C75 / C58",
    brand: "Daikin",
    category: "Valves & Reeds",
    oem_no: "DAI-C75-VLV",
    price: 3600,
    stock_status: "In Stock (Ready for 24h Dispatch)",
    stock_type: "in-stock",
    stock_qty: 15,
    image: "/images/compressor-parts.jpg",
    description: "Fatigue-resistant stainless spring steel reeds designed for high-cycle marine air conditioning duty.",
  },
];

function ProductsContent() {
  const { addItem, setIsDrawerOpen } = useContext(QuoteContext);
  const searchParams = useSearchParams();
  const initialBrand = searchParams?.get("brand") || "All";

  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch from backend API if available, fallback to rich catalog
  useEffect(() => {
    API.get("/catalog")
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          // Merge with rich product visual details
          const merged = res.data.map((item, idx) => ({
            ...ALL_PRODUCTS[idx % ALL_PRODUCTS.length],
            ...item,
            stock_status: item.stock_quantity > 5 ? "In Stock (Ready for 24h Dispatch)" : (item.stock_quantity > 0 ? "Low Stock" : "Sourced to Order"),
            stock_type: item.stock_quantity > 5 ? "in-stock" : (item.stock_quantity > 0 ? "low-stock" : "order"),
          }));
          setProducts(merged);
        }
      })
      .catch(() => {
        // Keep default ALL_PRODUCTS
      });
  }, []);

  const brandsList = ["All", "Grasso", "Bitzer", "Kirloskar", "Carrier", "Sabroe", "Bock", "Daikin"];
  const categoryList = ["All", "Cylinder Liners", "Piston Rings", "Pistons", "Connecting Rods", "Valves & Reeds", "Seals & Gaskets", "Bearings & Bushes"];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.oem_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBrand = selectedBrand === "All" || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchSearch && matchBrand && matchCategory;
    });
  }, [products, searchTerm, selectedBrand, selectedCategory]);

  return (
    <main className="section-shell">
      {/* Page Header */}
      <div className="section-header">
        <span className="eyebrow">Inventory Catalog</span>
        <h1 className="section-title"><b>Live Stock</b> Compressor Spare Parts</h1>
        <p className="section-desc">
          Browse real-time ready stock of precision engineered parts compatible with leading industrial compressors. Add parts directly to your automated quotation builder.
        </p>
        <div className="separator-line" />
      </div>

      {/* Toolbar: Search + Filters */}
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
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            {brandsList.map((b) => (
              <option key={b} value={b}>Brand: {b}</option>
            ))}
          </select>

          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categoryList.map((c) => (
              <option key={c} value={c}>Category: {c}</option>
            ))}
          </select>

          <button onClick={() => setIsDrawerOpen(true)} className="btn btn-amber" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
            📋 Open Quotation Cart
          </button>
        </div>
      </div>

      {/* Stock Legend Bar */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "25px", fontSize: "0.85rem", alignItems: "center" }}>
        <span style={{ fontWeight: 700, color: "var(--navy)" }}>Live Stock Status:</span>
        <span className="badge badge-in-stock">🟢 In Stock (Same-Day / 24h Dispatch)</span>
        <span className="badge badge-low-stock">🟡 Low Stock (1-4 Units Remaining)</span>
        <span className="badge badge-order">🔵 Sourced to Order (3-5 Days)</span>
        <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontWeight: 600 }}>
          Showing {filteredProducts.length} of {products.length} parts
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <h3>No matching spare parts found.</h3>
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
                <span className="brand-floating-tag">{item.brand}</span>
              </div>
              <div className="product-info">
                <span className="product-oem-no">REF: {item.oem_no}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="product-card-bottom">
                  <div className="product-price-est">
                    ₹{item.price.toLocaleString()} <span>/ est. unit</span>
                  </div>
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

      {/* Bottom Sourcing Banner */}
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
