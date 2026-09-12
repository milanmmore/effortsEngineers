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

export const processChatMessage = asyncHandler(async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const lower = message.toLowerCase();

  // Find best match in knowledge base
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

