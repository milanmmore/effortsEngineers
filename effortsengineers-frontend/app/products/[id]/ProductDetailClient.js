"use client";

import { useContext } from "react";
import Link from "next/link";
import { QuoteContext } from "@/context/QuoteContext";
import ProductImage from "@/components/ProductImage";
import { normalizeCatalogProducts } from "@/lib/catalogProducts";

export default function ProductDetailClient({ product: rawProduct }) {
  const product = normalizeCatalogProducts([rawProduct])[0];
  const { addItem } = useContext(QuoteContext);
  const details = [
    ["Brand", product.brand],
    ["Category", product.category],
    ["Series", product.series],
    ...(product.part_number ? [["Part number", product.part_number]] : []),
    ["Compatible models", product.compatible_models],
    ["Material / size", product.material_size],
  ].filter(([, value]) => value);

  return (
    <main className="section-shell">
      <p><Link href="/products">← Back to catalog</Link></p>
      <section className="product-detail-layout" aria-labelledby="product-detail-title">
        <div className="product-detail-image">
          <ProductImage
            src={product.image}
            alt={product.alt_text || product.name}
            label={product.category || product.name}
          />
        </div>
        <div>
          <span className="eyebrow">{product.brand || "Compressor spare part"}</span>
          <h1 id="product-detail-title" className="section-title">{product.name}</h1>
          {product.description && <p className="section-desc">{product.description}</p>}
          {details.length > 0 && (
            <dl className="product-detail-list">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {!product.part_number && (
            <p className="product-detail-note">
              No part number is listed. Please share your compressor model or a sample reference so we can confirm the correct item.
            </p>
          )}
          <p className="product-detail-note">
            Current availability, pricing, and fitment are confirmed for each enquiry.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => addItem(product)}>
            Add to Quote
          </button>
        </div>
      </section>
    </main>
  );
}
