// controllers/chat.controller.js
import asyncHandler from "../utils/asyncHandler.js";

// Domain knowledge base for industrial compressors
const COMPRESSOR_KNOWLEDGE = [
  {
    keywords: ["grasso", "rc9", "rc11", "rc12"],
    response: "We can help source spares for **Grasso RC9, RC11, and RC12** compressors, including cylinder liners, pistons, piston ring sets, valve plates, and overhaul gasket kits. Please share the part reference so we can confirm compatibility, availability, pricing, and an estimated dispatch time.",
  },
  {
    keywords: ["bitzer", "4n", "4p", "4t", "6f", "4g", "6g"],
    response: "We can help source parts for **Bitzer reciprocating compressors (4N, 4P, 4T, 6F, 4G, 6G)**, including connecting rods, valve reed plates, crankshaft assemblies, and cylinder head gaskets. Compatibility, availability, specifications, and any warranty terms are confirmed for the specific part and order.",
  },
  {
    keywords: ["kirloskar", "kc", "kcx", "bt", "tc"],
    response: "We help source parts for **Kirloskar KC, KCX, BT, and TC series** ammonia/freon compressors, including cylinder liners, piston pins, crankshaft bushes, mechanical shaft seals, and valve assemblies. Please ask us to confirm current availability and dispatch estimates for your requirement.",
  },
  {
    keywords: ["carrier", "5f", "5h", "06d", "06e"],
    response: "We can help source connecting rod bearings, cylinder sleeves, oil pump gears, unloader piston assemblies, and valve plates for **Carrier 5F and 5H series** compressors. Any inspection or material documentation depends on the supplier and must be confirmed for the order.",
  },
  {
    keywords: ["sabroe", "cmo", "cmo14", "cmo28", "smc"],
    response: "We can help source replacement spares for **Sabroe CMO (14, 16, 18, 24, 26, 28) and SMC (65, 100, 180)** series, including crankshafts, piston assemblies, and discharge valve spring packs. Specifications and availability are confirmed per requirement.",
  },
  {
    keywords: ["stock", "availability", "dispatch", "delivery", "urgent", "lead time"],
    response: "Availability and dispatch estimates depend on the part, confirmed stock, order processing, carrier schedules, destination, and customs clearance. Share the part number, quantity, and destination so we can check the current options.",
  },
  {
    keywords: ["quote", "quotation", "price", "rate", "cost", "rfq"],
    response: "You can generate an instant automated quotation using our online **Quotation Builder** under the Products catalog, or share your compressor model, part number, and quantity here. You can also click the WhatsApp button to chat directly with a technical sales engineer.",
  },
  {
    keywords: ["warranty", "guarantee", "quality", "iso", "certificate", "defect"],
    response: "Warranty coverage, period, eligibility, and remedies vary by product and apply only as stated in the accepted quotation or order documents. Inspection, material, and traceability records depend on the supplier and product; please ask us to confirm what is available. Any supplier certification applies to the named supplier, not Efforts Engineers.",
  },
  {
    keywords: ["high discharge temperature", "discharge temp", "overheating"],
    response: "High discharge temperature is frequently caused by broken or leaking discharge valve plates, defective suction valve seats, high compression ratio, or inadequate superheat. We recommend inspecting the valve plate assembly and cylinder liner wear limits immediately.",
  },
  {
    keywords: ["low oil pressure", "oil pressure", "lube"],
    response: "Low oil pressure in reciprocating compressors can be linked to worn crankshaft journal bushes, worn oil pump gears, a clogged suction strainer, or refrigerant foaming in the oil sump. Ask us to confirm sourcing options for replacement oil pumps and bearing sets.",
  },
];

// Domain product catalog reference for AI responses
const CATALOG_ITEMS = [
  // Carrier Spares
  { name: "Suction & Discharge Valve Plate", brand: "Carrier", partNo: "C-VAL-101", category: "valve" },
  { name: "Discharge Valve Assembly Complete", brand: "Carrier", partNo: "C-VAL-102", category: "valve" },
  { name: "Valve Spring & Guide Pin Pack", brand: "Carrier", partNo: "C-VAL-103", category: "valve" },
  { name: "Connecting Rod - 5F / 5H", brand: "Carrier", partNo: "C-ROD-201", category: "rod" },
  { name: "Cylinder Sleeve / Liner - 5H", brand: "Carrier", partNo: "C-LIN-301", category: "liner" },
  { name: "Piston Assembly Complete", brand: "Carrier", partNo: "C-PST-401", category: "piston" },

  // Grasso Spares
  { name: "Cylinder Liner - RC11 / RC12", brand: "Grasso", partNo: "GRA-RC11-042", category: "liner" },
  { name: "Cylinder Liner - RC9", brand: "Grasso", partNo: "GRA-RC9-021", category: "liner" },
  { name: "Suction / Discharge Valve Plate Set", brand: "Grasso", partNo: "GRA-VAL-101", category: "valve" },
  { name: "Valve Spring Pack", brand: "Grasso", partNo: "GRA-VAL-102", category: "valve" },
  { name: "Piston Ring Set (PTFE & CI)", brand: "Grasso", partNo: "GRA-RNG-201", category: "ring" },
  { name: "Connecting Rod Assembly", brand: "Grasso", partNo: "GRA-ROD-301", category: "rod" },

  // Bitzer Spares
  { name: "Valve Reed Plate Set - 4N / 4P / 6F", brand: "Bitzer", partNo: "BIT-VAL-101", category: "valve" },
  { name: "Valve Spring & Retainer Set", brand: "Bitzer", partNo: "BIT-VAL-102", category: "valve" },
  { name: "Piston Ring Set - 4N / 4P / 6F", brand: "Bitzer", partNo: "BIT-4N-382", category: "ring" },
  { name: "Piston Assembly Complete - 4G / 6G", brand: "Bitzer", partNo: "BIT-4G-550", category: "piston" },
  { name: "Connecting Rod Assembly", brand: "Bitzer", partNo: "BIT-ROD-101", category: "rod" },

  // Kirloskar Spares
  { name: "Connecting Rod Assembly - KC6 / KCX", brand: "Kirloskar", partNo: "KIR-KC6-098", category: "rod" },
  { name: "Crankshaft Bush & Main Bearing Set", brand: "Kirloskar", partNo: "KIR-KC-BRG10", category: "bearing" },
  { name: "Suction & Discharge Valve Assembly", brand: "Kirloskar", partNo: "KIR-VAL-101", category: "valve" },
  { name: "Cylinder Liner - KC Series", brand: "Kirloskar", partNo: "KIR-LIN-101", category: "liner" },
  { name: "Mechanical Shaft Seal", brand: "Kirloskar", partNo: "KIR-SL-201", category: "seal" },

  // Sabroe Spares
  { name: "Overhaul Gasket & Seal Kit - CMO 14/28", brand: "Sabroe", partNo: "SAB-CMO-GSK9", category: "gasket" },
  { name: "Mechanical Shaft Seal Assembly - SMC", brand: "Sabroe", partNo: "SAB-SMC-SL22", category: "seal" },
  { name: "Suction / Discharge Valve Plate Pack", brand: "Sabroe", partNo: "SAB-VAL-101", category: "valve" },

  // Bock & Daikin Spares
  { name: "Cylinder Liner - Bock F3 / F4 / F5", brand: "Bock", partNo: "BCK-F4-441", category: "liner" },
  { name: "Valve Reed Plate Set - Daikin C75 / C58", brand: "Daikin", partNo: "DAI-C75-VLV", category: "valve" },
];

const KNOWN_BRANDS = ["carrier", "grasso", "bitzer", "kirloskar", "sabroe", "bock", "daikin", "vilter", "mycom"];

const COMPONENT_KEYWORDS = [
  { key: "valve", synonyms: ["valve", "reed", "plate", "spring"] },
  { key: "liner", synonyms: ["liner", "sleeve", "cylinder liner"] },
  { key: "piston", synonyms: ["piston", "piston pin", "gudgeon"] },
  { key: "ring", synonyms: ["ring", "piston ring"] },
  { key: "rod", synonyms: ["rod", "connecting rod", "conrod"] },
  { key: "seal", synonyms: ["seal", "gasket", "shaft seal", "o-ring"] },
  { key: "bearing", synonyms: ["bearing", "bush", "bushing", "crankshaft bush"] },
];

const containsWord = (text, word) =>
  new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(text);

// Detect a compressor make mentioned as a whole word in the message.
export const detectBrand = (message = "") => {
  const lower = message.toLowerCase();
  return KNOWN_BRANDS.find((b) => containsWord(lower, b)) || null;
};

// Detect a component category mentioned in the message.
export const detectComponent = (message = "") => {
  const lower = message.toLowerCase();
  return (
    COMPONENT_KEYWORDS.find((c) =>
      c.synonyms.some((syn) => containsWord(lower, syn))
    ) || null
  );
};

// Filter the reference catalog by optional brand/component.
export const matchCatalog = ({ brand = null, component = null } = {}) => {
  let matched = CATALOG_ITEMS.filter((item) => {
    const matchBrand = brand ? item.brand.toLowerCase() === brand.toLowerCase() : true;
    const matchComp = component ? item.category.toLowerCase() === component.toLowerCase() : true;
    return matchBrand && matchComp;
  });

  if (matched.length === 0 && brand) {
    matched = CATALOG_ITEMS.filter((item) => item.brand.toLowerCase() === brand.toLowerCase());
  }
  return matched;
};

// Look up a canned domain answer from the knowledge base.
export const findKnowledgeReply = (message = "") => {
  const lower = message.toLowerCase();
  const entry = COMPRESSOR_KNOWLEDGE.find((item) =>
    item.keywords.some((kw) => lower.includes(kw))
  );
  return entry ? entry.response : null;
};

export const processChatMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const lower = message.toLowerCase();
  const detectedBrand = detectBrand(message);
  const detectedComponent = detectComponent(message);
  const isCatalogQuery =
    detectedBrand ||
    (detectedComponent &&
      ["show", "find", "parts", "spares"].some((kw) => containsWord(lower, kw)));

  if (isCatalogQuery) {
    const matchedItems = matchCatalog({ brand: detectedBrand, component: detectedComponent?.key });

    if (matchedItems.length > 0) {
      const brandName = detectedBrand
        ? detectedBrand.charAt(0).toUpperCase() + detectedBrand.slice(1)
        : "Compressor";
      const partType = detectedComponent ? detectedComponent.key + " " : "";
      const partsList = matchedItems.map((p) => `- ${p.name} (Part #${p.partNo})`).join("\n");

      return res.json({
        reply: `Here are ${brandName} compressor ${partType}spares we supply:\n${partsList}\n\nWould you like a quotation?`,
        timestamp: new Date().toISOString(),
        suggestions: ["Request Instant Quote", "Check Ready Stock", "WhatsApp Engineer"],
      });
    }
  }

  const reply =
    findKnowledgeReply(message) ||
    "Thank you for contacting Efforts Engineers. We supply genuine-grade compatible replacement spares for all major industrial refrigeration & air compressors (Kirloskar, Grasso, Bitzer, Carrier, Sabroe, Bock, Daikin, Vilter, Mycom). Please specify your **compressor make, model, and required parts**, or click **'Request a Quote'** to submit your specifications directly.";

  res.json({
    reply,
    timestamp: new Date().toISOString(),
    suggestions: [
      "Ask About Grasso RC11 Spares",
      "Ask About Bitzer 4N / 6F Availability",
      "Ask About Kirloskar Spares",
      "Request a Quotation",
      "Talk to Engineer on WhatsApp",
    ],
  });
});
