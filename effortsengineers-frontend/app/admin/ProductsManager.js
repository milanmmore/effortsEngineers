"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import API from "@/lib/axiosClient";
import AdminLayout from "@/components/AdminLayout";

const TEXT_FIELDS = [
  ["brand", "Brand"],
  ["series", "Series"],
  ["category", "Part Category"],
  ["part_number", "Part Number"],
  ["description", "Part Description"],
  ["oem_no", "OEM Number"],
  ["compatible_models", "Compatible models", "models"],
  ["material_size", "Material / size"],
  ["photo_id", "Photo ID"],
  ["file_name", "Filename", "photo"],
  ["photo_source", "Photo Source", "select", ["Own photo", "Supplier photo", "Customer photo"]],
  ["photo_status", "Photo Status", "select", ["To Shoot", "Shot", "Edited", "Uploaded", "Not Applicable"]],
  ["photo_view", "Photo View", "select", ["Front", "Angled", "Top", "Set / Kit", "With ruler"]],
  ["stock_status", "Stock Status", "select", ["In Stock", "On Order", "Enquire"]],
  ["image_url", "Image URL"],
  ["remarks", "Remarks", "textarea"],
];
const EMPTY_PRODUCT = {
  ...Object.fromEntries(TEXT_FIELDS.map(([field]) => [field, ""])),
  name: "",
  price: "",
  stock_quantity: "0",
  is_published: false,
};

function productToForm(product) {
  return {
    ...EMPTY_PRODUCT,
    ...Object.fromEntries(
      TEXT_FIELDS.map(([field]) => [field, product[field] ?? ""])
    ),
    name: product.name ?? "",
    price: product.price ?? "",
    stock_quantity: product.stock_quantity ?? 0,
    is_published: Boolean(product.is_published),
  };
}

function splitCompatibleModels(value) {
  return value.split(",").map((model) => model.trim()).filter(Boolean);
}

function normalizeSeriesOptions(filters, products, brands) {
  const options = [];
  const addOption = (brand, series) => {
    if (typeof brand === "string" && typeof series === "string" && brand.trim() && series.trim()) {
      options.push({ brand: brand.trim(), series: series.trim() });
    }
  };
  const inferBrand = (series) => brands
    .filter((brand) => series.toLocaleLowerCase().startsWith(`${brand.trim().toLocaleLowerCase()} `))
    .sort((first, second) => second.length - first.length)[0];

  if (Array.isArray(filters?.series)) {
    for (const option of filters.series) {
      if (typeof option === "string") {
        addOption(inferBrand(option), option);
      } else if (option && typeof option === "object") {
        addOption(
          option.brand ?? option.brand_name,
          option.series ?? option.series_name ?? option.name
        );
      }
    }
  } else if (filters?.series && typeof filters.series === "object") {
    for (const [brand, seriesList] of Object.entries(filters.series)) {
      if (Array.isArray(seriesList)) {
        seriesList.forEach((series) => addOption(brand, series));
      }
    }
  }
  for (const [brand, seriesList] of Object.entries(filters?.seriesByBrand || {})) {
    if (Array.isArray(seriesList)) {
      seriesList.forEach((series) => addOption(brand, series));
    }
  }
  for (const product of products) {
    addOption(product.brand, product.series);
  }

  const seen = new Set();
  return options.filter(({ brand, series }) => {
    const key = `${brand.toLocaleLowerCase()}\0${series.toLocaleLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ photoId: "", brand: "", category: "" });
  const [activeFilters, setActiveFilters] = useState(filters);
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    series: [],
    categories: [],
    modelsBySeries: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoMissing, setPhotoMissing] = useState(false);
  const photoInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const loadProducts = useCallback(async (nextPage = 1, query = activeFilters) => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await API.get("/admin/products", {
        params: {
          page: nextPage,
          ...(query.photoId.trim() && { photoId: query.photoId.trim() }),
          ...(query.brand && { brand: query.brand }),
          ...(query.category && { category: query.category }),
        },
      });
      let catalogRanges = [];
      try {
        const { data: rangesData } = await API.get("/catalog/ranges");
        catalogRanges = Array.isArray(rangesData) ? rangesData : [];
      } catch (rangesError) {
        console.error("Failed to load catalog brand and series options:", rangesError);
      }
      setProducts(data.products);
      setPage(data.page);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      const brands = data.filters?.brands || [];
      setFilterOptions({
        brands,
        series: normalizeSeriesOptions(
          data.filters,
          [...(data.products || []), ...catalogRanges],
          brands
        ),
        categories: data.filters?.categories || [],
        modelsBySeries: data.filters?.modelsBySeries || {},
      });
    } catch (requestError) {
      console.error("Failed to load admin products:", requestError);
      setError(
        requestError.response?.data?.message ||
          "Unable to load product records. Check the connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeFilters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const startNewProduct = useCallback(() => {
    setEditingProduct(null);
    setForm(EMPTY_PRODUCT);
    setPhotoFile(null);
    setPhotoPreview("");
    setPhotoMissing(false);
    setIsProductFormOpen(true);
    setNotice("");
    setError("");
  }, []);

  const startEditProduct = useCallback((product) => {
    setEditingProduct(product.id);
    setForm(productToForm(product));
    setPhotoFile(null);
    setPhotoPreview("");
    setPhotoMissing(false);
    setIsProductFormOpen(true);
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const closeProductForm = () => {
    setEditingProduct(null);
    setForm(EMPTY_PRODUCT);
    setPhotoFile(null);
    setPhotoPreview("");
    setPhotoMissing(false);
    setIsProductFormOpen(false);
    setError("");
  };

  const handleFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBrandFormChange = (event) => {
    setForm((current) => ({
      ...current,
      brand: event.target.value,
      series: "",
      compatible_models: "",
    }));
  };

  const handleSeriesFormChange = (event) => {
    setForm((current) => ({
      ...current,
      series: event.target.value,
      compatible_models: "",
    }));
  };

  const handleModelToggle = (model, checked) => {
    const selectedModels = new Set(splitCompatibleModels(form.compatible_models));
    if (checked) selectedModels.add(model);
    else selectedModels.delete(model);
    setForm((current) => ({
      ...current,
      compatible_models: [...selectedModels].join(", "),
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoMissing(false);
    setForm((current) => ({ ...current, file_name: file.name }));
  };

  const handleBrowsePhoto = useCallback(() => {
    photoInputRef.current?.click();
  }, []);

  const handlePhotoPreviewError = useCallback((event) => {
    const fallback = event.currentTarget.dataset.fallback;
    if (!photoPreview && fallback && event.currentTarget.src !== fallback) {
      event.currentTarget.src = fallback;
    } else {
      setPhotoMissing(true);
    }
  }, [photoPreview]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = { ...filters, photoId: filters.photoId.trim() };
    setActiveFilters(query);
    setNotice("");
  };

  const normalizeOption = (value) => value.trim().toLocaleLowerCase();
  const availableFormSeries = filterOptions.series
    .filter(({ brand }) => normalizeOption(brand) === normalizeOption(form.brand))
    .map(({ series }) => series);
  const availableFormModels = filterOptions.modelsBySeries[form.series] || [];
  const selectedFormModels = new Set(splitCompatibleModels(form.compatible_models));

  const handleBrandChange = (event) => {
    setFilters((current) => ({ ...current, brand: event.target.value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setNotice("");
    try {
      let imageUrl = form.image_url;
      let fileName = form.file_name;
      if (photoFile) {
        const uploadData = new FormData();
        uploadData.append("image", photoFile);
        const uploadResponse = await API.post("/admin/products/photo", uploadData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-File-Name": encodeURIComponent(fileName || photoFile.name),
          },
        });
        imageUrl = uploadResponse.data.file.url;
        fileName = uploadResponse.data.file.filename;
        setForm((current) => ({ ...current, file_name: fileName, image_url: imageUrl }));
        setPhotoFile(null);
      }
      const payload = {
        ...form,
        name: editingProduct
          ? form.name
          : [form.series || form.brand, form.category].filter(Boolean).join(" ") ||
            form.part_number ||
            "Product record",
        file_name: fileName,
        image_url: imageUrl,
        price: form.price === "" ? null : Number(form.price),
        stock_quantity: Number(form.stock_quantity),
      };
      if (editingProduct) {
        await API.put(`/admin/products/${editingProduct}`, payload);
        setNotice("Product record updated.");
      } else {
        await API.post("/admin/products", payload);
        setNotice("Product record added.");
      }
      setEditingProduct(null);
      setForm(EMPTY_PRODUCT);
      setPhotoFile(null);
      setPhotoPreview("");
      setPhotoMissing(false);
      setIsProductFormOpen(false);
      await loadProducts(page);
    } catch (requestError) {
      console.error("Failed to save admin product:", requestError);
      setError(
        requestError.response?.data?.message ||
          "Unable to save this product record. Check the fields and try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = useCallback(async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setError("");
    setNotice("");
    try {
      await API.delete(`/admin/products/${product.id}`);
      setNotice(`Deleted "${product.name}".`);
      await loadProducts(products.length === 1 && page > 1 ? page - 1 : page);
    } catch (requestError) {
      console.error("Failed to delete admin product:", requestError);
      setError(
        requestError.response?.data?.message ||
          "Unable to delete this product record."
      );
    }
  }, [loadProducts, page, products.length]);

  const handleEditProductClick = useCallback((event) => {
    const product = products.find(({ id }) => String(id) === event.currentTarget.dataset.productId);
    if (product) startEditProduct(product);
  }, [products, startEditProduct]);

  const handleDeleteProductClick = useCallback((event) => {
    const product = products.find(({ id }) => String(id) === event.currentTarget.dataset.productId);
    if (product) void handleDelete(product);
  }, [handleDelete, products]);

  return (
    <AdminLayout>
      <div className="admin-products-header">
        <div>
          <span className="eyebrow">Admin catalog</span>
          <h1>Parts Photo Master</h1>
          <p>Manage product, photo, model compatibility, stock, and publishing details in the live catalog database.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={startNewProduct}>
          + Add product
        </button>
      </div>

      <p className="admin-products-summary">
        {total.toLocaleString()} product records in the database
      </p>

      {(error || notice) && (
        <p className={error ? "admin-products-message error" : "admin-products-message"} role={error ? "alert" : "status"}>
          {error || notice}
        </p>
      )}

      {isProductFormOpen && <section className="admin-product-form">
        <h2>{editingProduct ? `Edit ${form.name || "product"}` : "Add a product record"}</h2>
        <p>Changes are saved to the catalog database and do not require the Excel workbook.</p>
        <form onSubmit={handleSave}>
          <div className="admin-product-fields">
            {TEXT_FIELDS.map(([field, label, kind, options]) => {
              if (field === "image_url") return null;

              if (kind === "models") {
                return (
                  <fieldset key={field} className="admin-product-models">
                    <legend>{label}</legend>
                    {!form.series ? (
                      <p>Select a brand and series to view compatible models.</p>
                    ) : availableFormModels.length === 0 ? (
                      <p>No models are available for this series.</p>
                    ) : (
                      <div className="admin-product-model-options">
                        {availableFormModels.map((model) => (
                          <label key={model}>
                            <input
                              type="checkbox"
                              checked={selectedFormModels.has(model)}
                              onChange={(event) => handleModelToggle(model, event.target.checked)}
                            />
                            {model}
                          </label>
                        ))}
                      </div>
                    )}
                  </fieldset>
                );
              }

              return (
                <label key={field} className={kind === "textarea" || kind === "photo" ? "wide" : ""}>
                  {label}
                  {field === "brand" ? (
                    <select name={field} value={form[field]} onChange={handleBrandFormChange}>
                      <option value="">Select a brand</option>
                      {filterOptions.brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  ) : field === "series" ? (
                    <select
                      name={field}
                      value={form[field]}
                      onChange={handleSeriesFormChange}
                      disabled={!form.brand}
                    >
                      <option value="">
                        {form.brand
                          ? availableFormSeries.length
                            ? "Select a series"
                            : "No series available for this brand"
                          : "Select a brand first"}
                      </option>
                      {availableFormSeries.map((series) => (
                        <option key={series} value={series}>{series}</option>
                      ))}
                    </select>
                  ) : field === "category" ? (
                    <select name={field} value={form[field]} onChange={handleFormChange}>
                      <option value="">Select a category</option>
                      {filterOptions.categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  ) : kind === "photo" ? (
                    <>
                      <input
                        type="text"
                        value={form.file_name}
                        readOnly
                        aria-label="Filename"
                      />
                      <input
                        type="file"
                        ref={photoInputRef}
                        className="admin-product-file-input"
                        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                        aria-label="Browse photo"
                        onChange={handlePhotoChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline admin-product-browse-button"
                        onClick={handleBrowsePhoto}
                      >
                        Browse
                      </button>
                      {photoPreview || form.file_name || form.image_url ? (
                        photoMissing ? (
                          <img
                            className="admin-product-photo-preview"
                            src="/images/components.jpeg"
                            alt="Default product image shown because the product photo is missing"
                          />
                        ) : (
                          <img
                            className="admin-product-photo-preview"
                            src={
                              photoPreview ||
                              (form.file_name
                                ? new URL(`/uploads/images/${encodeURIComponent(form.file_name)}`, API.defaults.baseURL).toString()
                                : new URL(form.image_url, API.defaults.baseURL).toString())
                            }
                            data-fallback={form.image_url ? new URL(form.image_url, API.defaults.baseURL).toString() : ""}
                            alt={`Preview of ${form.file_name || "selected photo"}`}
                            onError={handlePhotoPreviewError}
                          />
                        )
                      ) : null}
                      {photoPreview && (
                        <span>{form.file_name}</span>
                      )}
                    </>
                  ) : kind === "select" ? (
                    <select name={field} value={form[field]} onChange={handleFormChange}>
                      <option value="">Select {label.toLowerCase()}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : kind === "textarea" ? (
                    <textarea
                      name={field}
                      value={form[field]}
                      onChange={handleFormChange}
                      required={field === "name"}
                      rows={field === "remarks" ? 3 : 2}
                    />
                  ) : (
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleFormChange}
                      required={field === "name"}
                      maxLength={field === "name" ? 100 : undefined}
                    />
                  )}
                </label>
              );
            })}
            <label>
              Price (optional)
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Stock quantity
              <input
                name="stock_quantity"
                type="number"
                min="0"
                step="1"
                value={form.stock_quantity}
                onChange={handleFormChange}
              />
            </label>
            <label className="admin-product-publish">
              <input
                name="is_published"
                type="checkbox"
                checked={form.is_published}
                onChange={handleFormChange}
              />
              Publish on the public catalog
            </label>
          </div>
          <div className="admin-product-form-actions">
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : editingProduct ? "Save changes" : "Add product"}
            </button>
            <button type="button" className="btn btn-outline" onClick={closeProductForm}>
              Cancel
            </button>
          </div>
        </form>
      </section>}

      <section className="admin-product-list" aria-label="Product search results">
        <div className="admin-product-list-header">
          <form onSubmit={handleSearch}>
            <label className="admin-product-filter admin-product-filter-photo-id">
              <span>Photo ID</span>
              <input
                type="search"
                aria-label="Photo ID"
                placeholder="Photo ID"
                value={filters.photoId}
                onChange={(event) => setFilters((current) => ({ ...current, photoId: event.target.value }))}
              />
            </label>
            <label className="admin-product-filter">
              <span>Brand</span>
              <select aria-label="Brand" value={filters.brand} onChange={handleBrandChange}>
                <option value="">ALL</option>
                {filterOptions.brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </label>
            <label className="admin-product-filter">
              <span>Category</span>
              <select
                aria-label="Category"
                value={filters.category}
                onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
              >
                <option value="">ALL</option>
                {filterOptions.categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn admin-product-search-button">Search</button>
          </form>
        </div>

        {isLoading ? (
          <p role="status">Loading product records...</p>
        ) : products.length === 0 ? (
          <p>No product records match this search.</p>
        ) : (
          <div className="admin-product-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Photo ID</th>
                  <th>Product / part</th>
                  <th>Brand / series</th>
                  <th>Compatible models</th>
                  <th>Photo status</th>
                  <th>Catalog visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.photo_id || "—"}</td>
                    <td>
                      <strong>{product.category || "—"}</strong>
                      <small>{product.part_number || "No part number"}</small>
                    </td>
                    <td>{[product.brand, product.series].filter(Boolean).join(" / ") || "—"}</td>
                    <td>{product.compatible_models || "—"}</td>
                    <td>{product.photo_status || "—"}</td>
                    <td>{product.is_published ? "Published" : "Draft"}</td>
                    <td>
                      <div className="admin-product-actions">
                        <button type="button" className="btn btn-outline" data-product-id={product.id} onClick={handleEditProductClick}>
                          Edit
                        </button>
                        <button type="button" className="btn btn-danger" data-product-id={product.id} onClick={handleDeleteProductClick}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="admin-product-pagination">
            <button type="button" className="btn btn-outline" disabled={page <= 1 || isLoading} onClick={() => loadProducts(page - 1)}>
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button type="button" className="btn btn-outline" disabled={page >= totalPages || isLoading} onClick={() => loadProducts(page + 1)}>
              Next
            </button>
          </div>
        )}
      </section>
    </AdminLayout>
  );
}
