import { cleanRangeValue } from "@/lib/brandRanges";

export function normalizeCatalogProducts(data) {
  if (!Array.isArray(data)) {
    throw new Error("Catalog response was not a product list.");
  }

  return data.map((item) => {
    const stockQuantity = Number(item.stock_quantity);
    const hasStockQuantity = Number.isFinite(stockQuantity) && stockQuantity > 0;
    const stockStatus = item.stock_status?.trim() || (
      hasStockQuantity
        ? `${stockQuantity} ${stockQuantity === 1 ? "unit" : "units"} listed`
        : "Availability on request"
    );

    return {
      id: item.id,
      name: cleanRangeValue(item.name || ""),
      brand: item.brand || "",
      category: item.category || "",
      part_number: item.part_number || "",
      series: cleanRangeValue(item.series || ""),
      compatible_models: cleanRangeValue(item.compatible_models || ""),
      material_size: cleanRangeValue(item.material_size || ""),
      description: item.description || "",
      image: item.image_url || "",
      alt_text: item.alt_text || "",
      stock_status: stockStatus,
      has_explicit_stock: hasStockQuantity || Boolean(item.stock_status && !/availability on request/i.test(item.stock_status)),
      stock_type: /in stock|available/i.test(stockStatus)
        ? "in-stock"
        : /low stock/i.test(stockStatus)
          ? "low-stock"
          : "order",
    };
  });
}
