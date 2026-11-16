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

const CATEGORY_IMAGE_MAP = {
  "cylinder liner": "/images/liners-bushes.jpg",
  "main bearing and bush": "/images/liners-bushes.jpg",
  "gudgeon pin and bush": "/images/liners-bushes.jpg",
  "piston ring set": "/images/piston-rings.jpg",
  "connecting rod": "/images/connecting-rods.jpg",
  "gasket and overhaul kit": "/images/seals-kits.jpg",
  "shaft seal": "/images/seals-kits.jpg",
};

export function getRepresentativeCategoryImageUrl(category) {
  if (!category || typeof category !== "string") return "/images/compressor-parts.jpg";
  const normalized = category.toLowerCase().trim();
  return CATEGORY_IMAGE_MAP[normalized] || "/images/compressor-parts.jpg";
}

export default function ProductImage({ src, alt, label, category }) {
  const [failed, setFailed] = useState(false);

  const effectiveSrc = (!src || isGenericCatalogImage(src))
    ? getRepresentativeCategoryImageUrl(category || label)
    : src;

  if (failed) {
    return (
      <div className="product-photo-placeholder" role="img" aria-label={`${label} photo available on request`}>
        <span>Product photo on request</span>
        <strong>{label || "Compressor spare part"}</strong>
      </div>
    );
  }

  return (
    <img
      src={effectiveSrc}
      alt={alt || `${label || "Compressor spare"} representative component`}
      onError={() => setFailed(true)}
    />
  );
}
