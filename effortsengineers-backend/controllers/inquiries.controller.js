// controllers/inquiries.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// In-memory fallback if table doesn't exist
const memoryInquiries = [
  {
    id: "EE-RFQ-1041",
    name: "Rajesh Sharma",
    company: "Apex Cold Storage Pvt Ltd",
    email: "rajesh@apexcold.in",
    phone: "+91 98230 45671",
    brand: "Grasso",
    model: "RC11",
    part_name: "Cylinder Liner & Piston Ring Set",
    quantity: 4,
    urgency: "Immediate Breakdown (24h)",
    message: "Urgent breakdown at Gujarat cold facility. Need ready stock dispatch.",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "EE-RFQ-1040",
    name: "Capt. Arvind Nair",
    company: "Oceanic Fleet Technical Services",
    email: "technical@oceanicfleet.com",
    phone: "+91 97654 11223",
    brand: "Carrier",
    model: "5H120",
    part_name: "Connecting Rod & Suction Valve Assembly",
    quantity: 6,
    urgency: "Scheduled Overhaul (3-5 days)",
    message: "Vessel calling at Nhava Sheva port next week. Need quotation with MTC certificates.",
    status: "quoted",
    created_at: new Date(Date.now() - 3600000 * 22).toISOString(),
  },
  {
    id: "EE-RFQ-1039",
    name: "Sunil Kulkarni",
    company: "Mahalaxmi Dairy Products",
    email: "s.kulkarni@mahalaxmidairy.com",
    phone: "+91 94220 89012",
    brand: "Kirloskar",
    model: "KC6",
    part_name: "Crankshaft Bush & Oil Pump Assembly",
    quantity: 2,
    urgency: "Standard Delivery",
    message: "Requirement for ammonia refrigeration plant preventive maintenance.",
    status: "completed",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export const createInquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, company, brand, model, part_name, quantity, urgency, message } = req.body;

  if (!name || (!email && !phone)) {
    throw new ApiError(400, "Name and either email or phone are required");
  }

  const rfqId = `EE-RFQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const inquiryRecord = {
    id: rfqId,
    name,
    email: email || "N/A",
    phone: phone || "N/A",
    company: company || "N/A",
    brand: brand || "Unspecified",
    model: model || "Unspecified",
    part_name: part_name || "General Spares Requirement",
    quantity: Number(quantity) || 1,
    urgency: urgency || "Standard Delivery",
    message: message || "",
    status: "new",
    created_at: new Date().toISOString(),
  };

  try {
    // Attempt database insert if table exists
    await db.query(
      `INSERT INTO inquiries (rfq_number, name, email, phone, company, brand, model, message, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [rfqId, name, email, phone, company, brand, model, message, "new"]
    );
    console.log(`[DB] Successfully inserted inquiry ${rfqId} into database table inquiries`);
  } catch (err) {
    console.error(`[DB ERROR] Failed to insert inquiry ${rfqId}:`, err.message);
    // Graceful fallback to memory store if table not yet created in PostgreSQL
    memoryInquiries.unshift(inquiryRecord);
  }

  res.status(201).json({
    success: true,
    message: "Inquiry / RFQ submitted successfully. Our engineering team will contact you within 2-4 hours.",
    rfqId,
    inquiry: inquiryRecord,
  });
});

export const listInquiries = asyncHandler(async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM inquiries ORDER BY created_at DESC");
    if (result.rows && result.rows.length > 0) {
      return res.json(result.rows);
    }
  } catch (err) {
    // table not created, return memory fallback
  }
  res.json(memoryInquiries);
});

