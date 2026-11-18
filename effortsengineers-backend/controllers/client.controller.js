// controllers/client.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { sendEmailNotification } from "../utils/emailNotification.js";

// Browse catalog
export const browseCatalog = asyncHandler(async (req, res) => {
  const result = await db.query(
    "SELECT id, name, description, price, created_at FROM products ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

// Request a quotation
export const requestQuotation = asyncHandler(async (req, res) => {
  const {
    customer_name,
    email,
    phone,
    company,
    urgency,
    notes,
    items = [],
    total,
    product_id,
    quantity,
  } = req.body;
  if (!customer_name || !product_id || !quantity) {
    throw new ApiError(400, "customer_name, product_id, and quantity are required");
  }

  const userId = req.user?.id || null;
  const numTotal = total !== undefined && total !== null && !isNaN(Number(total)) ? Number(total) : null;

  let quotation;
  try {
    const result = await db.query(
      `INSERT INTO quotations (
         customer_name, email, phone, company, urgency, notes,
         product_id, quantity, total, user_id, status, created_at
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', NOW())
       RETURNING *`,
      [
        customer_name,
        email || null,
        phone || null,
        company || null,
        urgency || null,
        notes || null,
        product_id,
        quantity,
        numTotal,
        userId,
      ]
    );
    quotation = result.rows[0];
  } catch {
    // Fallback if extended columns are not yet present in schema
    const fallbackResult = await db.query(
      `INSERT INTO quotations (customer_name, product_id, quantity, status, created_at)
       VALUES ($1, $2, $3, 'pending', NOW())
       RETURNING *`,
      [customer_name, product_id, quantity]
    );
    quotation = fallbackResult.rows[0];
  }

  if (!quotation) {
    throw new ApiError(500, "Could not register quotation request");
  }

  const quoteId = quotation.id
    ? `EE-QT-${quotation.id}`
    : `EE-QT-${Math.floor(1000 + Math.random() * 9000)}`;
  const requestedItems = Array.isArray(items) ? items : [];

  // Persist per-line items to quotation_items table
  const savedItems = [];
  if (requestedItems.length > 0) {
    for (const item of requestedItems) {
      try {
        const pId = Number(item.id) || Number(item.product_id) || Number(product_id) || null;
        const qty = Number(item.quantity) || 1;
        const unitPrice = item.price ? Number(item.price) : 0;
        const partName = String(item.name || item.part_number || "Part").trim();

        const itemRes = await db.query(
          `INSERT INTO quotation_items (quotation_id, product_id, quantity, unit_price, part_name)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *`,
          [quotation.id, pId, qty, unitPrice, partName]
        );
        if (itemRes.rows[0]) {
          savedItems.push(itemRes.rows[0]);
        }
      } catch (itemErr) {
        // Safe warning if quotation_items table is unavailable or constraint differs
        console.warn("[QUOTATION] Line item persistence notice:", itemErr.message);
      }
    }
  }

  const notification = await sendEmailNotification({
    subject: `New formal RFQ: ${company || customer_name} (${requestedItems.length || 1} parts)`,
    replyTo: email,
    reference: quoteId,
    data: {
      Greeting: "Hello, we received a formal quotation request:",
      "Customer / Plant Name": customer_name,
      company: company || "Not provided",
      email: email || "Not provided",
      phone: phone || "Not provided",
      urgency: urgency || "Standard",
      notes: notes || "None",
      estimated_total:
        Number(total) > 0
          ? `INR ${Number(total).toLocaleString("en-IN")}`
          : "Pricing to be confirmed",
      items_requested: requestedItems.length
        ? requestedItems
            .map((item) =>
              `${item.name || "Part"} (Qty: ${item.quantity || 1}, Make: ${item.brand || "OEM"})`
            )
            .join("; ")
        : `Product ID ${product_id} (Qty: ${quantity})`,
    },
  });

  res.status(201).json({
    ...quotation,
    quoteId,
    items: savedItems.length ? savedItems : requestedItems,
    notification,
  });
});

// View client dashboard (orders and quotations)
export const viewClientDashboard = asyncHandler(async (req, res) => {
  if (!req.user?.email && !req.user?.id) {
    throw new ApiError(401, "Authenticated user is required");
  }

  const userEmail = req.user.email || "";
  const userId = req.user.id || null;

  let clientId = null;
  try {
    const client = await db.query(
      "SELECT id FROM clients WHERE LOWER(email) = LOWER($1) LIMIT 1",
      [userEmail]
    );
    if (client.rows.length > 0) {
      clientId = client.rows[0].id;
    }
  } catch {}

  let quotations = [];
  try {
    const qResult = await db.query(
      `SELECT q.*,
         COALESCE(
           json_agg(
             json_build_object(
               'id', qi.id,
               'product_id', qi.product_id,
               'quantity', qi.quantity,
               'unit_price', qi.unit_price,
               'part_name', qi.part_name
             )
           ) FILTER (WHERE qi.id IS NOT NULL),
           '[]'
         ) AS items
       FROM quotations q
       LEFT JOIN quotation_items qi ON qi.quotation_id = q.id
       WHERE ($1::int IS NOT NULL AND q.client_id = $1)
          OR ($2::int IS NOT NULL AND q.user_id = $2)
          OR ($3::text <> '' AND LOWER(COALESCE(q.email, '')) = LOWER($3))
       GROUP BY q.id
       ORDER BY q.created_at DESC`,
      [clientId, userId, userEmail]
    );
    quotations = qResult.rows;
  } catch {
    // Fallback if quotation_items or user_id column is not in query runner
    try {
      const qFallback = await db.query(
        clientId
          ? "SELECT * FROM quotations WHERE client_id = $1 ORDER BY created_at DESC"
          : "SELECT * FROM quotations WHERE LOWER(email) = LOWER($1) ORDER BY created_at DESC",
        [clientId || userEmail]
      );
      quotations = qFallback.rows;
    } catch {
      quotations = [];
    }
  }

  let orders = [];
  try {
    const ordersResult = await db.query(
      `SELECT DISTINCT o.*
       FROM orders o
       LEFT JOIN quotations q ON q.id = o.quotation_id
       WHERE ($1::int IS NOT NULL AND q.client_id = $1)
          OR ($2::int IS NOT NULL AND (q.user_id = $2 OR o.user_id = $2))
          OR ($3::text <> '' AND LOWER(COALESCE(q.email, '')) = LOWER($3))
       ORDER BY o.created_at DESC`,
      [clientId, userId, userEmail]
    );
    orders = ordersResult.rows;
  } catch {
    // Fallback for simple schema
    try {
      if (clientId) {
        const oFallback = await db.query(
          `SELECT orders.*
           FROM orders
           INNER JOIN quotations ON quotations.id = orders.quotation_id
           WHERE quotations.client_id = $1
           ORDER BY orders.created_at DESC`,
          [clientId]
        );
        orders = oFallback.rows;
      }
    } catch {
      orders = [];
    }
  }

  res.json({ quotations, orders });
});
