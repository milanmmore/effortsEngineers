import { randomUUID } from "node:crypto";
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ATTACHMENT_PATTERN =
  /^\/uploads\/images\/[0-9a-f-]{36}\.(?:jpg|jpeg|png|webp|pdf|dwg)$/i;

export const createWarrantyClaim = asyncHandler(async (req, res) => {
  const {
    name,
    company,
    email,
    phone,
    invoice_reference,
    part,
    serial,
    issue,
    attachment_url,
    website,
  } = req.body;

  if (typeof website === "string" && website.trim()) {
    throw new ApiError(400, "Unable to submit warranty claim.");
  }

  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.trim().length > 100 ||
    typeof email !== "string" ||
    !EMAIL_PATTERN.test(email.trim()) ||
    (company && (typeof company !== "string" || company.length > 150)) ||
    (phone && (typeof phone !== "string" || phone.length > 50)) ||
    typeof invoice_reference !== "string" ||
    !invoice_reference.trim() ||
    invoice_reference.trim().length > 120 ||
    (part && (typeof part !== "string" || part.length > 160)) ||
    (serial && (typeof serial !== "string" || serial.length > 120)) ||
    typeof issue !== "string" ||
    !issue.trim() ||
    issue.trim().length > 3000
  ) {
    throw new ApiError(400, "Provide valid contact details, an invoice or quotation number, and an issue description.");
  }

  if (attachment_url && !ATTACHMENT_PATTERN.test(attachment_url)) {
    throw new ApiError(400, "Attachment URL must reference an uploaded file.");
  }

  const claimNumber = `EE-WC-${randomUUID().split("-")[0].toUpperCase()}`;
  const result = await db.query(
    `INSERT INTO warranty_claims
      (claim_number, name, company, email, phone, invoice_reference, part, serial, issue, attachment_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id, claim_number, status, created_at`,
    [
      claimNumber,
      name.trim(),
      company?.trim() || null,
      email.trim(),
      phone?.trim() || null,
      invoice_reference.trim(),
      part?.trim() || null,
      serial?.trim() || null,
      issue.trim(),
      attachment_url || null,
    ]
  );

  res.status(201).json({
    success: true,
    claim: result.rows[0],
  });
});
