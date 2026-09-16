// controllers/chat.controller.js
import asyncHandler from "../utils/asyncHandler.js";

// Domain knowledge base for industrial compressors
const COMPRESSOR_KNOWLEDGE = [
  {
    keywords: ["grasso", "rc9", "rc11", "rc12"],
    response: "We stock ready spares for **Grasso RC9, RC11, and RC12** compressors. Components include precision honed cylinder liners, alloy cast pistons, PTFE & cast iron piston ring sets, suction/discharge valve plates, and complete overhaul gasket kits. Ready for express dispatch within 24-48 hours.",
  },
  {
    keywords: ["bitzer", "4n", "4p", "4t", "6f", "4g", "6g"],
    response: "Full range available for **Bitzer reciprocating compressors (4N, 4P, 4T, 6F, 4G, 6G)**. We supply connecting rods with pre-fitted bushes, high-grade valve reed plates, crankshaft assemblies, and cylinder head gaskets. All manufactured to tight OEM tolerances with 1-year replacement warranty.",
  },
  {
    keywords: ["kirloskar", "kc", "kcx", "bt", "tc"],
    response: "As a Pune-based engineering firm, we maintain deep ready inventory for **Kirloskar KC, KCX, BT, and TC series** ammonia/freon compressors. In stock: cylinder liners, piston pins, crankshaft bushes, mechanical shaft seals, and valve assemblies with instant local & export dispatch.",
  },
  {
    keywords: ["carrier", "5f", "5h", "06d", "06e"],
    response: "For **Carrier 5F and 5H series** industrial refrigeration & marine HVAC compressors, we offer connecting rod bearings, cylinder sleeves, oil pump gears, unloader piston assemblies, and valve plates with Class-standard metallurgical test certificates.",
  },
  {
    keywords: ["sabroe", "cmo", "cmo14", "cmo28", "smc"],
    response: "We supply zero-defect replacement spares for **Sabroe CMO (14, 16, 18, 24, 26, 28) and SMC (65, 100, 180)** series: hardened crankshafts, precision machined piston assemblies, and discharge valve spring packs.",
  },
  {
    keywords: ["stock", "availability", "dispatch", "delivery", "urgent", "lead time"],
    response: "Over **10,000+ line items** are held in ready stock at our Pune central warehouse. Critical breakdown orders are dispatched within **24 hours via express air cargo / courier** across India and to 45+ export destinations worldwide.",
  },
  {
    keywords: ["quote", "quotation", "price", "rate", "cost", "rfq"],
    response: "You can generate an instant automated quotation using our online **Quotation Builder** under the Products catalog, or share your compressor model, part number, and quantity here. You can also click the WhatsApp button to chat directly with a technical sales engineer.",
  },
  {
    keywords: ["warranty", "guarantee", "quality", "iso", "certificate", "defect"],
    response: "All Efforts Engineers spares are backed by our **1-Year Zero-Defect Replacement Warranty** and manufactured under ISO 9001:2015 quality standards. Every batch comes with dimensional inspection reports and 100% material traceability.",
  },
  {
    keywords: ["high discharge temperature", "discharge temp", "overheating"],
    response: "High discharge temperature is frequently caused by broken or leaking discharge valve plates, defective suction valve seats, high compression ratio, or inadequate superheat. We recommend inspecting the valve plate assembly and cylinder liner wear limits immediately.",
  },
  {
    keywords: ["low oil pressure", "oil pressure", "lube"],
    response: "Low oil pressure in reciprocating compressors is commonly linked to worn crankshaft journal bushes, worn oil pump gears, clogged suction strainer, or refrigerant foaming in the oil sump. We keep replacement oil pumps and bearing sets in ready stock.",
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

export const processChatMessage = asyncHandler(async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const lower = message.toLowerCase();

  // 1. Detect Brand and Component type for Catalog Search
  const brands = ["carrier", "grasso", "bitzer", "kirloskar", "sabroe", "bock", "daikin", "vilter", "mycom"];
  const detectedBrand = brands.find((b) => lower.includes(b));

  const componentKeywords = [
    { key: "valve", synonyms: ["valve", "reed", "plate", "spring"] },
    { key: "liner", synonyms: ["liner", "sleeve", "cylinder liner"] },
    { key: "piston", synonyms: ["piston", "piston pin", "gudgeon"] },
    { key: "ring", synonyms: ["ring", "piston ring"] },
    { key: "rod", synonyms: ["rod", "connecting rod", "conrod"] },
    { key: "seal", synonyms: ["seal", "gasket", "shaft seal", "o-ring"] },
    { key: "bearing", synonyms: ["bearing", "bush", "bushing", "crankshaft bush"] },
  ];

  const detectedComponent = componentKeywords.find((c) =>
    c.synonyms.some((syn) => lower.includes(syn))
  );

  // If user is inquiring about specific brand/part catalog items
  if (detectedBrand || (detectedComponent && (lower.includes("show") || lower.includes("find") || lower.includes("parts") || lower.includes("spares")))) {
    let matchedItems = CATALOG_ITEMS.filter((item) => {
      const matchBrand = detectedBrand ? item.brand.toLowerCase() === detectedBrand : true;
      const matchComp = detectedComponent ? item.category === detectedComponent.key : true;
      return matchBrand && matchComp;
    });

    // Fallback if brand matched but no specific component type matched
    if (matchedItems.length === 0 && detectedBrand) {
      matchedItems = CATALOG_ITEMS.filter((item) => item.brand.toLowerCase() === detectedBrand);
    }

    if (matchedItems.length > 0) {
      const brandName = detectedBrand ? detectedBrand.charAt(0).toUpperCase() + detectedBrand.slice(1) : "Compressor";
      const partType = detectedComponent ? detectedComponent.key + " " : "";

      const partsList = matchedItems
        .map((p) => `- ${p.name} (Part #${p.partNo})`)
        .join("\n");

      const replyText = `Here are ${brandName} compressor ${partType}spares we supply:\n${partsList}\n\nWould you like a quotation?`;

      return res.json({
        reply: replyText,
        timestamp: new Date().toISOString(),
        suggestions: [
          "Request Instant Quote",
          "Check Ready Stock",
          "WhatsApp Engineer",
        ],
      });
    }
  }

  // 2. Fall back to domain knowledge base
  let matchedResponse = null;
  for (const item of COMPRESSOR_KNOWLEDGE) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      matchedResponse = item.response;
      break;
    }
  }

  if (!matchedResponse) {
    matchedResponse =
      "Thank you for contacting Efforts Engineers. We supply genuine-grade compatible replacement spares for all major industrial refrigeration & air compressors (Kirloskar, Grasso, Bitzer, Carrier, Sabroe, Bock, Daikin, Vilter, Mycom). Please specify your **compressor make, model, and required parts**, or click **'Request a Quote'** to submit your specifications directly.";
  }

  res.json({
    reply: matchedResponse,
    timestamp: new Date().toISOString(),
    suggestions: [
      "Check Grasso RC11 Spares",
      "Bitzer 4N / 6F Availability",
      "Kirloskar Spares Stock",
      "Request Instant Quotation",
      "Talk to Engineer on WhatsApp",
    ],
  });
});

