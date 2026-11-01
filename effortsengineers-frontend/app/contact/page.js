"use client";
import React, { useState, useContext } from "react";
import API from "@/lib/axiosClient";
import { QuoteContext } from "@/context/QuoteContext";
import { sendEmailNotification } from "@/lib/emailService";
import CONTACT_CONFIG from "@/config/contactConfig";

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export default function ContactPage() {
  const { setIsDrawerOpen } = useContext(QuoteContext);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    brand: "Grasso",
    model: "",
    part_name: "",
    quantity: 1,
    urgency: "Immediate breakdown — requested priority handling",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          uploadResponse.data.image.url,
          API.defaults.baseURL
        ).toString();
      }

      const inquiryResponse = await API.post("/inquiries", {
        ...formData,
        attachment_url: attachmentUrl
          ? new URL(attachmentUrl).pathname
          : "",
      });
      const rfqNumber = inquiryResponse.data?.rfqId;
      if (!rfqNumber) {
        throw new Error("The inquiry service did not return a reference number.");
      }

      const emailResult = await sendEmailNotification({
        subject: `Technical RFQ Inquiry: ${formData.brand} - ${formData.part_name || formData.model}`,
        from_name: formData.name,
        reply_to: formData.email || CONTACT_CONFIG.primaryEmail,
        data: {
          rfq_number: rfqNumber,
          customer_name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          brand: formData.brand,
          model: formData.model,
          part_name: formData.part_name,
          quantity: formData.quantity,
          urgency: formData.urgency,
          message: formData.message,
          attached_image: attachmentUrl || "None",
          submitted_at: new Date().toLocaleString(),
        },
      });
      if (!emailResult.success) {
        console.error("Inquiry email notification failed:", emailResult.error || emailResult.message);
      }

      setRfqNumber(rfqNumber);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contact inquiry:", err);
      setSubmitError(
        err.response?.data?.message ||
          err.message ||
          "Unable to submit your inquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSubmitError("");

    if (file && !ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
      setAttachmentFile(null);
      event.target.value = "";
      setSubmitError("Choose a JPEG, PNG, or WebP image.");
      return;
    }

    if (file && file.size > MAX_ATTACHMENT_SIZE) {
      setAttachmentFile(null);
      event.target.value = "";
      setSubmitError("The image must be 5 MB or smaller.");
      return;
    }

    setAttachmentFile(file);
  };

  return (
    <main className="section-shell">
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">Multi-Channel Inquiries & Technical Desk</span>
        <h1 className="section-title"><b>Contact</b> Efforts Engineers</h1>
        <p className="section-desc">
          Get in touch with our technical sales engineers for instant stock availability, customized quotations, export logistics, and breakdown support.
        </p>
        <div className="separator-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "50px", marginBottom: "60px" }}>
        {/* Left: Smart RFQ Form */}
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid var(--line)", padding: "40px", boxShadow: "var(--shadow-sm)" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "8px" }}>Send a Technical Requirement / RFQ</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "25px" }}>
            Fill out the details below. For urgent breakdown inquiries, our team aims to respond within 2 hours during business hours with price and stock status.
          </p>

          {submitted ? (
            <div style={{ background: "var(--green-light)", border: "1px solid #a7f3d0", padding: "30px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", color: "#065f46", marginBottom: "12px" }}>✓</div>
              <h3 style={{ color: "#065f46", marginBottom: "8px" }}>Inquiry Successfully Registered!</h3>
              <p style={{ color: "#047857", fontSize: "0.95rem", marginBottom: "16px" }}>
                Your RFQ Reference Number is <strong>{rfqNumber}</strong>. An engineer from our Pune technical desk is reviewing your compressor specifications and will reach out to you via phone/email shortly.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    brand: "Grasso",
                    model: "",
                    part_name: "",
                    quantity: 1,
                    urgency: "Immediate breakdown — requested priority handling",
                    message: "",
                  });
                  setAttachmentFile(null);
                  setSubmitError("");
                }}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
              {submitError && (
                <p role="alert" style={{ margin: 0, padding: "12px 14px", border: "1px solid #fca5a5", borderRadius: "6px", color: "#991b1b", background: "#fef2f2" }}>
                  {submitError}
                </p>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Contact Name *
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Deshmukh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Company / Cold Plant Name
                  <input
                    type="text"
                    placeholder="e.g. Sahyadri Agro Cold Chain"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                  />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Email Address *
                  <input
                    type="email"
                    required
                    placeholder="e.g. anand@sahyadriagro.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Phone / WhatsApp Number *
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98230 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                  />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Compressor Make *
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem", background: "white" }}
                  >
                    <option value="Grasso">Grasso (RC9, RC11, RC12)</option>
                    <option value="Bitzer">Bitzer (4N, 4P, 4T, 6F, 4G, 6G)</option>
                    <option value="Kirloskar">Kirloskar (KC, KCX, BT, TC)</option>
                    <option value="Carrier">Carrier (5F, 5H, 06D, 06E)</option>
                    <option value="Sabroe">Sabroe (CMO, SMC)</option>
                    <option value="Bock">Bock (F3, F4, F5, F16)</option>
                    <option value="Daikin">Daikin (C55, C58, C75)</option>
                    <option value="Vilter">Vilter (440, 450, 450XL)</option>
                    <option value="Mycom">Mycom (A, B, WB series)</option>
                    <option value="York">York</option>
                    <option value="Copeland">Copeland</option>
                    <option value="Trane">Trane</option>
                    <option value="Ingersoll Rand">Ingersoll Rand</option>
                    <option value="Atlas Copco">Atlas Copco</option>
                    <option value="CPT">CPT</option>
                    <option value="Accel Sabroe">Accel Sabroe</option>
                    <option value="Voltas">Voltas</option>
                    <option value="Other">Other / Bespoke Model</option>
                  </select>
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Compressor Model & Serial
                  <input
                    type="text"
                    placeholder="e.g. RC11 8-Cyl or 5H120"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                  />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "14px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Part Name / OEM Reference Number *
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cylinder Liner, Connecting Rod, Valve Plate"
                    value={formData.part_name}
                    onChange={(e) => setFormData({ ...formData, part_name: e.target.value })}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Quantity
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                  />
                </label>
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                Delivery Urgency Level *
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem", background: "white" }}
                >
                  <option value="Immediate breakdown — requested priority handling">🚨 Immediate breakdown — request priority dispatch (subject to confirmation)</option>
                  <option value="Urgent — request expedited handling">⚡ Urgent — request expedited handling</option>
                  <option value="Standard — timing to be confirmed">📅 Standard — timing to be confirmed</option>
                  <option value="Scheduled Annual Overhaul">🛠 Scheduled Annual Overhaul / Annual Rate Contract</option>
                </select>
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                Technical Requirements, Dimensions, or Drawing Notes
                <textarea
                  rows="4"
                  placeholder="Mention operating refrigerant (Ammonia R717, Freon), suction pressure, or share technical drawing links..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem", fontFamily: "inherit" }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                Attach Nameplate Photo or Part Drawing (optional)
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAttachmentChange}
                  style={{ padding: "10px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                />
                <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontWeight: 400 }}>
                  JPEG, PNG, or WebP; maximum 5 MB.
                  {attachmentFile ? ` Selected: ${attachmentFile.name}` : ""}
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ padding: "14px", fontSize: "1rem", marginTop: "8px" }}
              >
                {isSubmitting ? "Submitting Inquiry..." : "Submit Technical Inquiry / RFQ →"}
              </button>
            </form>
          )}
        </div>

        {/* Right: Direct Channels & Office Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* WhatsApp Direct Chat Card */}
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#22c55e", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                💬
              </div>
              <div>
                <h3 style={{ margin: 0, color: "#14532d", fontSize: "1.2rem" }}>Instant WhatsApp Chat</h3>
                <span style={{ fontSize: "0.78rem", color: "#16a34a", fontWeight: 700 }}>Online • Sales Engineer on Standby</span>
              </div>
            </div>
            <p style={{ color: "#15803d", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "18px" }}>
              Need an instant answer on stock availability or part interchangeability? Chat directly with our technical team on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${CONTACT_CONFIG.whatsappRaw}?text=Hello%20Efforts%20Engineers,%20I%20have%20an%20urgent%20compressor%20spare%20part%20requirement.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ background: "#22c55e", borderColor: "#16a34a", width: "100%", justifyContent: "center" }}
            >
              Start WhatsApp Conversation →
            </a>
          </div>

          {/* AI Chatbot Assistant Card */}
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "16px", padding: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                🤖
              </div>
              <div>
                <h3 style={{ margin: 0, color: "var(--navy)", fontSize: "1.2rem" }}>Efforts AI Assistant</h3>
                <span style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700 }}>24/7 Compressor Diagnostics</span>
              </div>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "18px" }}>
              Our AI chatbot is available 24/7 on the bottom right of the screen to answer technical queries and check spare part compatibility.
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="btn btn-outline"
              style={{ width: "100%", justifyContent: "center" }}
            >
              📋 Open Quotation Builder
            </button>
          </div>

          {/* Plant & Corporate Office Details */}
          <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "16px", padding: "30px", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Headquarters & Plant Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.9rem" }}>
              <div>
                <strong style={{ color: "var(--navy)" }}>📍 Corporate Headquarters:</strong>
                <p style={{ margin: "4px 0 0", color: "var(--text-muted)" }}>
                  {CONTACT_CONFIG.address}
                </p>
              </div>
              <div>
                <strong style={{ color: "var(--navy)" }}>🏭 Manufacturing & Overhaul Plant:</strong>
                <p style={{ margin: "4px 0 0", color: "var(--text-muted)" }}>
                  {CONTACT_CONFIG.workshopAddress}
                </p>
              </div>
              <div>
                <strong style={{ color: "var(--navy)" }}>👤 Contact Person:</strong>
                <p style={{ margin: "4px 0 0", color: "var(--text-muted)" }}>
                  Mr. Saurabh S Salvi
                </p>
                <p style={{ margin: "4px 0 0", color: "var(--text-muted)" }}>
                  Phone: <a href="tel:+912025678102" style={{ color: "var(--primary)", fontWeight: 700 }}>+91-20-25678102</a>
                  {" / "}
                  <a href="tel:+912025678972" style={{ color: "var(--primary)", fontWeight: 700 }}>+91-20-25678972</a><br />
                  Phone / WhatsApp: <a href={`https://wa.me/${CONTACT_CONFIG.whatsappRaw}`} style={{ color: "var(--primary)", fontWeight: 700 }}>{CONTACT_CONFIG.whatsapp}</a>
                </p>
              </div>
              <div>
                <strong style={{ color: "var(--navy)" }}>✉️ Official Inquiries:</strong>
                <p style={{ margin: "4px 0 0" }}>
                  <a href={`mailto:${CONTACT_CONFIG.primaryEmail}`} style={{ color: "var(--primary)", fontWeight: 700 }}>
                    {CONTACT_CONFIG.primaryEmail}
                  </a>
                  <span style={{ margin: "0 8px", color: "var(--text-muted)" }}>|</span>
                  <a href={`mailto:${CONTACT_CONFIG.secondaryEmail}`} style={{ color: "var(--primary)", fontWeight: 700 }}>
                    {CONTACT_CONFIG.secondaryEmail}
                  </a>
                </p>
              </div>
              <div>
                <strong style={{ color: "var(--navy)" }}>⏰ Operating Hours:</strong>
                <p style={{ margin: "4px 0 0", color: "var(--text-muted)" }}>
                  Mon - Sat: 8:30 AM – 7:30 PM IST<br />
                  <em>24/7 Breakdown Dispatch for Contracted Industrial Plants</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
