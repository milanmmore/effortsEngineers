"use client";

import { useState } from "react";

function isGenericCatalogImage(src) {
  if (!src) return true;

  try {
    return new URL(src, "https://catalog.invalid").pathname
      .toLowerCase()
      .endsWith("/components.jpeg");
  } catch {
    return true;
  }
}

export default function ProductImage({ src, alt, label }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed || isGenericCatalogImage(src)) {
    return (
      <div className="product-photo-placeholder" role="img" aria-label={`${label} photo not available`}>
        <span>Product photo on request</span>
        <strong>{label || "Compressor spare part"}</strong>
      </div>
    );
  }

  return <img src={src} alt={alt || label} onError={() => setFailed(true)} />;
}
