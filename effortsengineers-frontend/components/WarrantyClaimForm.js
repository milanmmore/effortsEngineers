"use client";

import React, { useState } from "react";
import API from "@/lib/axiosClient";
import SITE_CONFIG from "@/config/site";
import { sendEmailNotification } from "@/lib/emailService";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const FILE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".pdf", ".dwg"]);
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

export default function WarrantyClaimForm() {
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    invoice_reference: "",
    part: "",
    serial: "",
    issue: "",
    website: "",
  });
  const [attachment, setAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [claimNumber, setClaimNumber] = useState("");
  const [notificationWarning, setNotificationWarning] = useState("");

  const updateValue = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const selectAttachment = (event) => {
    const file = event.target.files?.[0] || null;
    setError("");
    const extension = file?.name.match(/\.[^.]+$/)?.[0].toLowerCase();
    if (file && !FILE_EXTENSIONS.has(extension)) {
      setAttachment(null);
      event.target.value = "";
      setError("Choose a JPEG, PNG, WebP, PDF, or DWG file.");
      return;
    }
    if (file && file.size > MAX_FILE_SIZE) {
      setAttachment(null);
      event.target.value = "";
      setError("The file must be 5 MB or smaller.");
      return;
    }
    setAttachment(file);
  };

  const submitClaim = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      let attachmentPath = "";
      if (attachment) {
        const uploadData = new FormData();
        uploadData.append("image", attachment);
        const uploadResponse = await API.post("/uploads/images", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        attachmentPath = new URL(uploadResponse.data.file.url, API.defaults.baseURL).pathname;
      }

      const { data } = await API.post("/warranty/claims", {
        ...values,
        attachment_url: attachmentPath,
      });
      if (!data.claim?.claim_number) {
        throw new Error("The warranty service did not return a claim reference.");
      }

      const notification = await sendEmailNotification({
        subject: `Warranty claim ${data.claim.claim_number}: ${values.invoice_reference}`,
        from_name: values.name,
        reply_to: values.email || SITE_CONFIG.primaryEmail,
        data: {
          claim_number: data.claim.claim_number,
          customer_name: values.name,
          company: values.company || "Not provided",
          email: values.email,
          phone: values.phone || "Not provided",
          invoice_or_quotation_number: values.invoice_reference,
          part: values.part || "Not provided",
          serial: values.serial || "Not provided",
          issue: values.issue,
          attached_file: attachmentPath || "None",
        },
      });
      if (!notification.success) {
        console.error("Warranty claim notification failed:", notification.error || notification.message);
        setNotificationWarning(
          "Your claim was saved, but the email notification could not be confirmed. Please contact us with this reference if you need to follow up."
        );
      }
      setClaimNumber(data.claim.claim_number);
    } catch (submitError) {
      console.error("Failed to submit warranty claim:", submitError);
      setError(
        submitError.response?.data?.message ||
          submitError.message ||
          "Unable to submit your claim. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (claimNumber) {
    return (
      <section role="status" aria-live="polite" style={{ background: "white", border: "1px solid var(--line)", borderRadius: "16px", padding: "32px" }}>
        <h2>Warranty claim received</h2>
        <p>Your reference number is <strong>{claimNumber}</strong>. The claim will be reviewed against the applicable order terms.</p>
        {notificationWarning && <p role="alert">{notificationWarning}</p>}
      </section>
    );
  }

  return (
    <section aria-labelledby="warranty-claim-title" style={{ background: "white", border: "1px solid var(--line)", borderRadius: "16px", padding: "clamp(22px, 4vw, 40px)", boxShadow: "var(--shadow-sm)" }}>
      <h2 id="warranty-claim-title" className="section-title"><b>Submit a</b> Warranty Claim</h2>
      <p className="section-desc">Provide the order reference and issue details. Submission does not confirm warranty eligibility or a remedy.</p>
      <form onSubmit={submitClaim} style={{ display: "grid", gap: "16px" }}>
        <label style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
          Leave this field empty
          <input name="website" type="text" autoComplete="off" tabIndex={-1} value={values.website} onChange={updateValue} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
          <label style={labelStyle}>Name *
            <input name="name" required maxLength={100} autoComplete="name" value={values.name} onChange={updateValue} style={inputStyle} />
          </label>
          <label style={labelStyle}>Company / Plant
            <input name="company" maxLength={150} autoComplete="organization" value={values.company} onChange={updateValue} style={inputStyle} />
          </label>
          <label style={labelStyle}>Email *
            <input name="email" type="email" required maxLength={254} autoComplete="email" value={values.email} onChange={updateValue} style={inputStyle} />
          </label>
          <label style={labelStyle}>Phone
            <input name="phone" type="tel" maxLength={50} autoComplete="tel" value={values.phone} onChange={updateValue} style={inputStyle} />
          </label>
        </div>

        <label style={labelStyle}>Invoice / Quotation Number *
          <input name="invoice_reference" required maxLength={120} value={values.invoice_reference} onChange={updateValue} style={inputStyle} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
          <label style={labelStyle}>Part
            <input name="part" maxLength={160} value={values.part} onChange={updateValue} style={inputStyle} />
          </label>
          <label style={labelStyle}>Serial Number
            <input name="serial" maxLength={120} value={values.serial} onChange={updateValue} style={inputStyle} />
          </label>
        </div>

        <label style={labelStyle}>Describe the issue *
          <textarea name="issue" required maxLength={3000} rows="5" value={values.issue} onChange={updateValue} style={{ ...inputStyle, fontFamily: "inherit" }} />
        </label>

        <label style={labelStyle}>Nameplate Photo or Supporting Document
          <input name="attachment" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.dwg,image/jpeg,image/png,image/webp,application/pdf,application/acad" onChange={selectAttachment} style={inputStyle} />
          <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontWeight: 400 }}>
            JPEG, PNG, WebP, PDF, or DWG; maximum 5 MB.{attachment ? ` Selected: ${attachment.name}` : ""}
          </span>
        </label>

        {error && <p role="alert" style={{ color: "#b91c1c", margin: 0 }}>{error}</p>}
        <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: "14px", fontSize: "1rem" }}>
          {isSubmitting ? "Submitting Claim..." : "Submit Warranty Claim"}
        </button>
      </form>
    </section>
  );
}
