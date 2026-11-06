"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axiosClient";
import { buildBrandRanges } from "@/lib/brandRanges";

export default function BrandRangesSection({ id, eyebrow, title, description }) {
  const [brandRanges, setBrandRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadBrandRanges() {
      try {
        const firstResponse = await API.get("/catalog", {
          timeout: 30000,
          params: { page: 1 },
        });
        const firstPage = firstResponse.data;
        if (!Array.isArray(firstPage.products) || !Number.isInteger(firstPage.totalPages)) {
          throw new Error("Catalog returned invalid pagination data.");
        }

        const remainingPages = [];
        for (let page = 2; page <= firstPage.totalPages; page += 1) {
          remainingPages.push(page);
        }

        const productPages = [firstPage.products];
        for (let index = 0; index < remainingPages.length; index += 5) {
          const batch = remainingPages.slice(index, index + 5);
          const responses = await Promise.all(
            batch.map((page) => API.get("/catalog", {
              timeout: 30000,
              params: { page },
            }))
          );
          productPages.push(...responses.map(({ data }) => {
            if (!Array.isArray(data.products)) {
              throw new Error("Catalog returned an invalid product page.");
            }
            return data.products;
          }));
        }

        if (isActive) setBrandRanges(buildBrandRanges(productPages.flat()));
      } catch (error) {
        console.error("Failed to load catalog-derived brand ranges:", error);
        if (isActive) setLoadError("Brand ranges could not be loaded from the catalog.");
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadBrandRanges();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="section-shell" id={id}>
      <div className="section-header">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{description}</p>
        <div className="separator-line" />
      </div>

      {isLoading && <p role="status">Loading compressor ranges from the catalog…</p>}
      {loadError && <p role="alert">{loadError}</p>}
      {!isLoading && !loadError && (
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {brandRanges.map(({ brand, ranges }) => (
            <article key={brand} className="why-card" style={{ padding: "26px" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1.1rem" }}>{brand}</h3>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.9rem" }}>
                {ranges.map((range) => <li key={range} style={{ marginBottom: "8px" }}>{range}</li>)}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
