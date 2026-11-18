module.exports = [
["Method","Path","Auth Required","Role","Controller","Description"],
// ── System ──────────────────────────────────────────────────────────────────
["GET","/api/health","No","—","server.js","DB connectivity health check"],
// ── Auth ────────────────────────────────────────────────────────────────────
["POST","/api/auth/register","No","—","auth.controller/register","Register new client account (role always client); rate: 5/15min"],
["POST","/api/auth/login","No","—","auth.controller/login","Login with email/username + password; sets httpOnly JWT cookie; rate: 10/15min"],
["POST","/api/auth/logout","No","—","auth.controller/logout","Clears auth cookie"],
["POST","/api/auth/refresh","No","—","auth.controller/refresh","Silent token refresh via httpOnly cookie"],
["POST","/api/auth/forgot-password","No","—","auth.controller/forgotPassword","Send password reset email; rate: 5/hr"],
["POST","/api/auth/reset-password","No","—","auth.controller/resetPassword","Consume reset token and set new password; rate: 10/15min"],
["GET","/api/auth/profile","Yes","any","auth.routes inline","Return current user id/name/username/email/role"],
// ── Public Catalog ───────────────────────────────────────────────────────────
["GET","/api/catalog","No","—","catalog.controller/listCatalog","Paginated product list; filters: brand, category, q"],
["GET","/api/catalog/filters","No","—","catalog.controller/getCatalogFilters","Distinct brands & categories for filter UI"],
["GET","/api/catalog/ranges","No","—","catalog.controller/getCatalogBrandRanges","Brand + series + compatible_models for brand range section"],
["GET","/api/catalog/:id","No","—","catalog.controller/getCatalogItem","Single published product by ID"],
// ── Admin Catalog ────────────────────────────────────────────────────────────
["POST","/api/catalog","Yes","admin","catalog.controller/createCatalogItem","Create product (name + price required)"],
["PUT","/api/catalog/:id","Yes","admin","catalog.controller/updateCatalogItem","Update product fields (COALESCE patch)"],
["DELETE","/api/catalog/:id","Yes","admin","catalog.controller/deleteCatalogItem","Hard-delete product"],
// ── Client Portal ────────────────────────────────────────────────────────────
["GET","/api/client/catalog","No","—","client.controller/browseCatalog","Client-facing catalog (id, name, description, price)"],
["POST","/api/client/quotation","No","—","client.controller/requestQuotation","Submit RFQ; saves to quotations + quotation_items; sends email; rate: 10/15min"],
["GET","/api/client/dashboard","Yes","any","client.controller/viewClientDashboard","Client own quotations (with line items) and orders"],
// ── Quotations (Admin) ───────────────────────────────────────────────────────
["GET","/api/quotations","Yes","admin","quotation.controller/listQuotations","List all quotations"],
["GET","/api/quotations/:id","Yes","admin","quotation.controller/getQuotation","Single quotation by ID"],
["POST","/api/quotations","Yes","admin","quotation.controller/createQuotation","Admin create quotation"],
["PUT","/api/quotations/:id/status","Yes","admin","quotation.controller/updateQuotationStatus","Update quotation status + optional total"],
["PATCH","/api/quotations/:id","Yes","admin","quotation.controller/updateQuotationStatus","Alias for status update"],
["GET","/api/quotation","Yes","admin","quotation.controller/listQuotations","Mount alias for /api/quotations"],
["GET","/api/quotation/:id","Yes","admin","quotation.controller/getQuotation","Mount alias for /api/quotations/:id"],
// ── Orders (Admin) ───────────────────────────────────────────────────────────
["GET","/api/orders","Yes","admin","orders.controller/listOrders","List all orders"],
["GET","/api/orders/:id","Yes","admin","orders.controller/getOrder","Single order by ID"],
["POST","/api/orders","Yes","admin","orders.controller/createOrder","Create order"],
["PUT","/api/orders/:id","Yes","admin","orders.controller/updateOrder","Update order quantity + status"],
["DELETE","/api/orders/:id","Yes","admin","orders.controller/deleteOrder","Delete order"],
["GET","/api/order","Yes","admin","orders.controller/listOrders","Mount alias for /api/orders"],
// ── Inventory (Admin) ────────────────────────────────────────────────────────
["GET","/api/inventory","Yes","admin","inventory.controller/listInventory","List inventory joined with product name/brand/part_number"],
["GET","/api/inventory/:id","Yes","admin","inventory.controller/getInventoryItem","Single inventory row"],
["POST","/api/inventory","Yes","admin","inventory.controller/createInventoryItem","Create inventory entry"],
["PUT","/api/inventory/:id","Yes","admin","inventory.controller/updateInventoryItem","Update inventory quantity"],
["DELETE","/api/inventory/:id","Yes","admin","inventory.controller/deleteInventoryItem","Delete inventory entry"],
["PATCH","/api/inventory/stock","Yes","admin","inventory.controller/updateStock","Update stock by product_id"],
["GET","/api/admin/inventory","Yes","admin","inventory.controller/listInventory","Admin route alias for inventory list"],
// ── Admin Products ───────────────────────────────────────────────────────────
["GET","/api/admin/products","Yes","admin","admin/products.controller/listAdminProducts","Full product list for admin (all fields)"],
["POST","/api/admin/products/photo","Yes","admin","uploads.controller/uploadAdminProductImage","Upload product image (multipart/form-data)"],
["POST","/api/admin/products","Yes","admin","admin/products.controller/createAdminProduct","Create product via admin panel"],
["PUT","/api/admin/products/:id","Yes","admin","admin/products.controller/updateAdminProduct","Update product via admin panel"],
["DELETE","/api/admin/products/:id","Yes","admin","admin/products.controller/deleteAdminProduct","Delete product via admin panel"],
// ── Admin Dashboard ──────────────────────────────────────────────────────────
["GET","/api/dashboard/orders","Yes","admin","dashboard.controller/getOrdersOverview","Orders overview metrics from DB"],
["GET","/api/dashboard/inventory","Yes","admin","dashboard.controller/getInventoryLevels","Inventory level metrics from DB"],
["GET","/api/dashboard/forecast","Yes","admin","dashboard.controller/getSalesForecast","Sales forecast from DB with recommendations"],
// ── Inquiries ────────────────────────────────────────────────────────────────
["POST","/api/inquiries","No","—","inquiries.controller/createInquiry","Submit technical RFQ inquiry; saves to DB + email; rate: 10/15min"],
["GET","/api/inquiries","Yes","admin","inquiries.controller/listInquiries","List all inquiries"],
// ── Warranty ─────────────────────────────────────────────────────────────────
["POST","/api/warranty/claims","No","—","warranty.controller/createWarrantyClaim","Submit warranty claim; saves to DB + email; rate: 5/15min"],
// ── Chat & Uploads ───────────────────────────────────────────────────────────
["POST","/api/chat","No","—","chat.controller/processChatMessage","AI chatbot message processing"],
["POST","/api/uploads/images","No","—","uploads.controller/uploadImage","Upload image file (rate: 10/15min)"],
["GET","/uploads/images/:filename","No","—","server.js / S3 fallback","Serve uploaded product image; S3 fallback if not on disk"],
];
