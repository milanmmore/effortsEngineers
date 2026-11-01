"use client";

import React, { useState } from "react";
import API from "@/lib/axiosClient";
import CONTACT_CONFIG from "@/config/contactConfig";
import { sendEmailNotification } from "@/lib/emailService";

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".pdf",
  ".dwg",
]);
const COMPRESSOR_MAKES = [
  "Grasso",
  "Bitzer",
  "Kirloskar",
  "Carrier",
  "Sabroe / Accel Sabroe",
  "Bock",
  "Daikin",
  "Vilter",
  "Mycom",
  "York",
  "Copeland",
  "Trane",
  "Ingersoll Rand",
  "Atlas Copco",
  "CPT",
  "Voltas",
  "Other",
];

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  brand: "Grasso",
  model: "",
  part_name: "",
  quantity: "1",
  urgency: "Standard — timing to be confirmed",
  destination_country: "",
  message: "",
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1px solid var(--line)",
  borderRadius: "6px",
  fontSize: "0.9rem",
  background: "white",
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: "0.85rem",
  fontWeight: 700,
};

export default function EnquiryForm({
  source = "Website enquiry",
  title = "Send a Technical Requirement / RFQ",
  description = "Share your compressor and part details. Availability, pricing, dispatch estimates, and applicable warranty terms are confirmed per order.",
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [rfqNumber, setRfqNumber] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSubmitError("");

    const extension = file?.name.match(/\.[^.]+$/)?.[0].toLowerCase();
    if (file && !ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) {
      setAttachmentFile(null);
      event.target.value = "";
      setSubmitError("Choose a JPEG, PNG, WebP, PDF, or DWG file.");
      return;
    }

    if (file && file.size > MAX_ATTACHMENT_SIZE) {
      setAttachmentFile(null);
      event.target.value = "";
      setSubmitError("The file must be 5 MB or smaller.");
      return;
    }

    setAttachmentFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      let attachmentUrl = "";
      if (attachmentFile) {
        const uploadData = new FormData();
        uploadData.append("image", attachmentFile);

        const uploadResponse = await API.post("/uploads/images", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        attachmentUrl = new URL(
          uploadResponse.data.file.url,
          API.defaults.baseURL
        ).toString();
      }

      const inquiryResponse = await API.post("/inquiries", {
        ...formData,
        message: [`Enquiry source: ${source}`, formData.message].filter(Boolean).join("\n\n"),
        attachment_url: attachmentUrl ? new URL(attachmentUrl).pathname : "",
      });
      const reference = inquiryResponse.data?.rfqId;
      if (!reference) {
        throw new Error("The inquiry service did not return a reference number.");
      }

      const emailResult = await sendEmailNotification({
        subject: `Technical RFQ: ${formData.brand} - ${formData.part_name || formData.model}`,
        from_name: formData.name,
        reply_to: formData.email || CONTACT_CONFIG.primaryEmail,
        data: {
          rfq_number: reference,
          source,
          customer_name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          brand: formData.brand,
          model: formData.model,
          part_name: formData.part_name,
          quantity: formData.quantity,
          urgency: formData.urgency,
          destination_country: formData.destination_country,
          message: formData.message,
          attached_file: attachmentUrl || "None",
          attached_image: attachmentUrl || "None",
          submitted_at: new Date().toLocaleString(),
        },
      });

      if (!emailResult.success) {
        console.error(
          "Inquiry email notification failed:",
          emailResult.error || emailResult.message
        );
      }
      setRfqNumber(reference);
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAttachmentFile(null);
    setSubmitError("");
    setRfqNumber("");
  };

  return (
    <section
      aria-labelledby="enquiry-form-title"
      style={{
        background: "white",
        borderRadius: "16px",
        border: "1px solid var(--line)",
        padding: "clamp(22px, 4vw, 40px)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {rfqNumber ? (
        <div role="status" style={{ textAlign: "center", padding: "24px 0" }}>
          <div style={{ fontSize: "2.5rem", color: "#065f46", marginBottom: "10px" }}>✓</div>
          <h2 id="enquiry-form-title">Enquiry received</h2>
          <p>
            Reference: <strong>{rfqNumber}</strong>. The team will review your details and follow up using the contact information provided.
          </p>
          <button type="button" className="btn btn-primary" onClick={resetForm}>
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <>
          <h2 id="enquiry-form-title" style={{ fontSize: "1.6rem", marginBottom: "8px" }}>
            {title}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "25px" }}>
            {description}
          </p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            {submitError && (
              <p role="alert" style={{ margin: 0, padding: "12px 14px", border: "1px solid #fca5a5", borderRadius: "6px", color: "#991b1b", background: "#fef2f2" }}>
                {submitError}
              </p>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
              <label style={labelStyle}>
                Contact Name *
                <input name="name" type="text" autoComplete="name" required maxLength={120} value={formData.name} onChange={updateField} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Company / Plant
                <input name="company" type="text" autoComplete="organization" maxLength={160} value={formData.company} onChange={updateField} style={inputStyle} />
              </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
              <label style={labelStyle}>
                Email Address *
                <input name="email" type="email" autoComplete="email" required maxLength={254} value={formData.email} onChange={updateField} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Phone / WhatsApp *
                <input name="phone" type="tel" autoComplete="tel" required maxLength={40} value={formData.phone} onChange={updateField} style={inputStyle} />
              </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
              <label style={labelStyle}>
                Compressor Make *
                <select name="brand" required value={formData.brand} onChange={updateField} style={inputStyle}>
                  {COMPRESSOR_MAKES.map((make) => <option key={make} value={make}>{make}</option>)}
                </select>
              </label>
              <label style={labelStyle}>
                Model / Serial
                <input name="model" type="text" maxLength={120} value={formData.model} onChange={updateField} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Part Name / Number *
                <input name="part_name" type="text" required maxLength={160} value={formData.part_name} onChange={updateField} style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Quantity
                <input name="quantity" type="number" min="1" max="100000" required value={formData.quantity} onChange={updateField} style={inputStyle} />
              </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
              <label style={labelStyle}>
                Urgency
                <select name="urgency" value={formData.urgency} onChange={updateField} style={inputStyle}>
                  <option>Standard — timing to be confirmed</option>
                  <option>Urgent — please advise options</option>
                  <option>Breakdown — priority requested</option>
                  <option>Scheduled maintenance</option>
                </select>
              </label>
              <label style={labelStyle}>
                Destination Country (if exporting)
                <input name="destination_country" type="text" maxLength={100} value={formData.destination_country} onChange={updateField} style={inputStyle} />
              </label>
            </div>

            <label style={labelStyle}>
              Technical Requirements / Notes
              <textarea name="message" rows="4" maxLength={3000} value={formData.message} onChange={updateField} style={{ ...inputStyle, fontFamily: "inherit" }} />
            </label>

            <label style={labelStyle}>
              Attach Nameplate Photo or Drawing (optional)
              <input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.dwg,image/jpeg,image/png,image/webp,application/pdf,application/acad" onChange={handleAttachmentChange} style={inputStyle} />
              <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontWeight: 400 }}>
                JPEG, PNG, WebP, PDF, or DWG; maximum 5 MB.
                {attachmentFile ? ` Selected: ${attachmentFile.name}` : ""}
              </span>
            </label>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: "14px", fontSize: "1rem" }}>
              {isSubmitting ? "Submitting Enquiry..." : "Submit Technical Enquiry / RFQ →"}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
