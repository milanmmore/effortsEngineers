const XLSX = require("xlsx");
const { backlog, endpoints, schema, routes } = require("./wb_data.js");

const roles = [
  ["Role","How Assigned","Auth Method","Accessible Routes","API Access","Notes"],
  ["guest","Default — no login","None","All public pages","Public GET endpoints; POST /api/client/quotation; POST /api/inquiries; POST /api/warranty/claims","No JWT required for RFQ submission"],
  ["client","Self-registration via /auth/register","JWT (httpOnly cookie)","All public + /client/*","GET /api/auth/profile; GET /api/client/dashboard; GET /api/client/catalog","Role always set to client on registration; cannot self-elevate"],
  ["admin","Set via environment variable (ADMIN_EMAIL / ADMIN_PASSWORD)","JWT (httpOnly cookie) — env-managed account","All public + /client/* + /admin/*","All endpoints including admin-only write operations","Credentials managed by env vars; upserted into users table on each login; password reset disabled for managed accounts"],
];

const portal = [
  ["Portal","Page / Feature","Description","API Calls","Status"],
  ["Public","Home (/)","Hero, brand ranges section, how-it-works, AI chatbot, WhatsApp button","None (static)","Live"],
  ["Public","Products (/products)","Paginated catalog; brand + category filter dropdowns; keyword search; Suspense-wrapped","GET /api/catalog?brand=&category=&q=&page=","Live"],
  ["Public","Product Detail (/products/[id])","Full product spec, compatible models, add-to-quote button","GET /api/catalog/:id","Live"],
  ["Public","Product Sourcing (/productsourcing)","Sourcing process explanation","None","Live"],
  ["Public","Services (/services)","Service offerings overview","None","Live"],
  ["Public","Contact (/contact)","Inquiry form: name, email, phone, company, brand, model, part, urgency, message, file upload","POST /api/inquiries; POST /api/uploads/images","Live"],
  ["Public","Global Reach (/global-reach)","Export corridors, supplier documentation request","None","Live"],
  ["Public","Warranty (/warranty)","Warranty claim form: invoice ref, part, serial, issue, attachment","POST /api/warranty/claims; POST /api/uploads/images","Live"],
  ["Public","AI Chatbot","Slide-out chatbot for technical assistance","POST /api/chat","Live"],
  ["Public","Quote Builder Drawer","Slide-out RFQ cart: add/remove/qty parts, contact form, submit RFQ","POST /api/client/quotation","Live"],
  ["Auth","Login (/auth/login)","Email or username + password login; password reset token handling","POST /api/auth/login; POST /api/auth/reset-password","Live"],
  ["Auth","Register (/auth/register)","New client registration with password strength validation","POST /api/auth/register","Live"],
  ["Client","Dashboard (/client/dashboard)","Client quotation history and order list","GET /api/client/dashboard","Live (needs real data)"],
  ["Client","Catalog (/client/catalog)","Authenticated product browse","GET /api/client/catalog","Live"],
  ["Client","Orders (/client/orders)","Client order history","GET /api/orders (needs auth filter)","Partial — needs API filter"],
  ["Client","Quotation Sheet (/client/quotation)","Printable formal quotation with letterhead, GSTIN, IEC, HSN codes","Reads QuoteContext (needs live fetch by ref ID)","Partial — context-only"],
  ["Admin","Dashboard (/admin/dashboard)","Orders overview, inventory levels, sales forecast metrics","GET /api/dashboard/orders|inventory|forecast","Partial — mock data"],
  ["Admin","Inventory (/admin/inventory)","View and update stock levels per product","GET /api/inventory; PATCH /api/inventory/stock","Live"],
  ["Admin","Orders (/admin/orders)","View, update, delete orders","GET /api/orders; PUT /api/orders/:id; DELETE /api/orders/:id","Live"],
  ["Admin","Products (/admin/products)","Full CRUD for product catalog; image upload","GET|POST|PUT|DELETE /api/admin/products; POST /api/admin/products/photo","Live"],
  ["Admin","Quotations (/admin/quotations)","View quotations, update status","GET /api/quotations; PUT /api/quotations/:id/status","Live"],
  ["Admin","Forecasting (/admin/forecasting)","AI-driven demand forecasting charts","GET /api/dashboard/forecast","Partial — mock data"],
];

const rfq = [
  ["Step","Actor","Action","Detail","File / Endpoint"],
  ["1","User","Browse catalog","Products page or product detail page","GET /api/catalog"],
  ["2","User","Add to Quote","addItem() called; item stored in QuoteContext state + localStorage (ee_quote_items)","QuoteContext.js / addItem"],
  ["2a","System","Drawer opens","isDrawerOpen set to true automatically on addItem","QuoteContext.js"],
  ["2b","System","Duplicate handling","If product already in cart, quantity incremented instead of new row added","QuoteContext.js / addItem"],
  ["3","User","Review cart","QuoteBuilderDrawer shows line items with +/- qty controls and remove button","QuoteBuilderDrawer.js"],
  ["3a","System","Subtotal calculation","totalEstimated = sum of (price * qty) for priced items only; null-price items show Price on request","QuoteContext.js / totalEstimated"],
  ["4","User","Fill contact form","Name (required), Official Email (required), Phone (required), Company, Urgency, Notes","QuoteBuilderDrawer.js"],
  ["4a","—","Urgency options","Immediate breakdown | Urgent | Standard | Scheduled Annual Overhaul","QuoteBuilderDrawer.js"],
  ["5","User","Submit RFQ","Click Request Automated Quotation; form submit triggers useQuoteSubmission.submit()","useQuoteSubmission.js"],
  ["6","Frontend","Build payload","{ customer_name, email, phone, company, urgency, notes, product_id: items[0].id, quantity: sum, items[], total }","useQuoteSubmission.js / buildPayload"],
  ["7","Frontend","POST to backend","axios POST /api/client/quotation with payload","useQuoteSubmission.js"],
  ["8","Backend","Validate","Requires: customer_name, product_id, quantity","client.controller.js / requestQuotation"],
  ["9","Backend","Insert to DB","INSERT INTO quotations (customer_name, product_id, quantity, status=pending, created_at)","client.controller.js"],
  ["10","Backend","Generate ref ID","quoteId = EE-QT-{db_id}","client.controller.js"],
  ["11","Backend","Send email notification","sendEmailNotification with full item list, urgency, contact details via FORMSUBMIT_TOKEN","emailNotification.js"],
  ["11a","System","Email failure handling","Email failure does NOT roll back DB insert; notification.success=false returned to frontend","client.controller.js"],
  ["12","Backend","Return response","{ ...quotation, quoteId, notification: { success: bool } }","client.controller.js"],
  ["13","Frontend","Handle success","setSubmittedQuote with ref ID, customer summary, total; clearQuote() empties cart","useQuoteSubmission.js"],
  ["13a","Frontend","Handle failure","setSubmitError shown in drawer; cart NOT cleared; user can retry","useQuoteSubmission.js"],
  ["14","Frontend","Show confirmation","Drawer switches to confirmation screen: ref ID, customer name, company, urgency, total","QuoteBuilderDrawer.js"],
  ["14a","System","Email warning banner","If notification.success=false, warning banner shown to user","QuoteBuilderDrawer.js"],
  ["15","User","Next action","View / Print Official Quote -> /client/quotation  OR  New Request -> resets form","QuoteBuilderDrawer.js"],
  ["16","Admin","Manage quotation","Admin updates status via PUT /api/quotations/:id/status","quotation.controller.js"],
  ["16a","—","Valid statuses","draft -> pending -> sent -> accepted | rejected | expired","quotation.controller.js"],
  ["—","Note","Multi-item limitation","Full item array sent in email only; DB quotations row stores only first product_id — no quotation_items table yet (see BE-001)","—"],
];

const railway = [
  ["#","Category","Item","Detail"],
  ["1","Trigger","Push to main branch","GitHub Actions workflow at .github/workflows/deploy.yml fires automatically"],
  ["1b","Trigger","Manual dispatch","workflow_dispatch trigger available in GitHub Actions UI"],
  ["2","CI Config","Node.js version","24.13.0 (actions/setup-node@v4)"],
  ["3","CI Config","Railway CLI","Installed globally: npm install --global @railway/cli"],
  ["4","CI Config","Concurrency group","railway-production; cancel-in-progress: false (no mid-deploy cancellation)"],
  ["5","GitHub Secret","RAILWAY_TOKEN","Railway API token — stored as GitHub Actions Secret (encrypted)"],
  ["6","GitHub Variable","RAILWAY_PROJECT_ID","Railway project ID — stored as GitHub Actions Variable"],
  ["7","GitHub Variable","RAILWAY_ENVIRONMENT_ID","Railway environment ID (e.g. production) — GitHub Actions Variable"],
  ["8","GitHub Variable","RAILWAY_BACKEND_SERVICE_ID","Railway service ID for backend — GitHub Actions Variable"],
  ["9","GitHub Variable","RAILWAY_FRONTEND_SERVICE_ID","Railway service ID for frontend — GitHub Actions Variable"],
  ["10","Deploy Order","Backend first","railway up ./effortsengineers-backend deploys before frontend"],
  ["11","Deploy Order","Frontend second","railway up ./effortsengineers-frontend deploys after backend succeeds"],
  ["12","Backend Env Vars","DATABASE_URL","Railway managed PostgreSQL connection string — set in Railway service variables"],
  ["13","Backend Env Vars","JWT_SECRET","Strong random secret for JWT signing — set in Railway service variables"],
  ["14","Backend Env Vars","PORT","Railway injects automatically; defaults to 5000 in code"],
  ["15","Backend Env Vars","FRONTEND_URL","Comma-separated frontend origin(s) — REQUIRED in production or server throws"],
  ["16","Backend Env Vars","FORMSUBMIT_TOKEN","FormSubmit.co token for email notifications — set in Railway service variables"],
  ["17","Backend Env Vars","EMAIL_NOTIFICATION_CC","Optional CC address for notification emails"],
  ["18","Backend Env Vars","EMAIL_REPLY_TO","Optional reply-to override for notification emails"],
  ["19","Backend Env Vars","ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_USERNAME","Portal admin credentials managed via env vars; upserted to users table on login"],
  ["20","Frontend Env Vars","NEXT_PUBLIC_API_URL","Backend API base URL — e.g. https://api.effortsengineers.in"],
  ["21","Frontend Env Vars","BASE_URL","Canonical frontend URL for sitemap.js and robots.js"],
  ["22","Frontend Env Vars","ALLOW_INDEXING","Set to true to enable search engine indexing in production"],
  ["23","Database Setup","Initial schema","Run effortsengineers-backend/scripts/schema_new.sql against Railway PostgreSQL after first deploy"],
  ["24","Database Setup","Seed data","Optionally run scripts/seedDB.sql for sample products and users"],
  ["25","Database Setup","Connection","Railway PostgreSQL default port 5432; local dev uses 5433 (configurable via DB_PORT)"],
  ["26","Post-Deploy Check","Health endpoint","GET https://{backend-domain}/api/health -> { status: ok, db: connected }"],
  ["27","Post-Deploy Check","Frontend build","npm run build must complete with all 21 pages prerendered (0 errors)"],
  ["28","Post-Deploy Check","CORS","Verify POST from frontend origin succeeds; check FRONTEND_URL matches deployed frontend URL exactly"],
  ["29","Known Issue","Image uploads","Railway ephemeral filesystem — /uploads/images lost on redeploy; needs Railway Volume or S3 (see INFRA-005)"],
  ["30","Known Issue","Test step missing","deploy.yml does not run npm run test:mock before deploying (see INFRA-004)"],
];

// ── Build workbook ────────────────────────────────────────────────────────────
const wb = XLSX.utils.book_new();

function addSheet(name, data) {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const range = XLSX.utils.decode_range(ws["!ref"]);
  ws["!cols"] = Array.from({ length: range.e.c + 1 }, (_, ci) => {
    let max = 10;
    for (let r = range.s.r; r <= range.e.r; r++) {
      const cell = ws[XLSX.utils.encode_cell({ r, c: ci })];
      if (cell && cell.v) max = Math.min(80, Math.max(max, String(cell.v).length + 2));
    }
    return { wch: max };
  });
  XLSX.utils.book_append_sheet(wb, ws, name);
}

addSheet("1_Product_Backlog", backlog);
addSheet("2_API_Endpoints", endpoints);
addSheet("3_DB_Schema", schema);
addSheet("4_Route_List", routes);
addSheet("5_User_Roles", roles);
addSheet("6_Portal_Functionality", portal);
addSheet("7_RFQ_Workflow", rfq);
addSheet("8_Railway_Deployment", railway);

const outPaths = [
  "docs/EffortsEngineers_Platform_Workbook.xlsx",
  "docs/review_docs/phase2/EffortsEngineers_Platform_Workbook.xlsx",
];
for (const p of outPaths) {
  XLSX.writeFile(wb, p);
  console.log("Workbook written to", p);
}
