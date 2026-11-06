// lib/emailService.js
import { CONTACT_CONFIG } from "@/config/contactConfig";

/**
 * Dispatch contact forms, RFQs, and quotation requests directly to target emails.
 * Uses the configured FormSubmit endpoint to notify the sales desk and acknowledge the sender.
 */

const FORMSUBMIT_TOKEN = "1779af28564bf27dc0c4ecd0f6909d7c";


export async function sendEmailNotification({
  subject,
  from_name,
  reply_to,
  data = {},
}) {
  try {
    const sender = from_name || "Website Inquirer";
    const reference = data.rfq_number || data.claim_number;
    const payload = {
      _subject: subject || "New RFQ / Inquiry from Efforts Engineers",
      _replyto: reply_to || CONTACT_CONFIG.primaryEmail,
      ...(CONTACT_CONFIG.secondaryEmail && { _cc: CONTACT_CONFIG.secondaryEmail }),
      _template: "table",
      _autoresponse:
        `Thank you for contacting Efforts Engineers${reference ? ` (reference: ${reference})` : ""}.\n\n` +
        "We have received your enquiry. Our team will review it and follow up using the contact details provided. " +
        "Availability, pricing, dispatch estimates, and any warranty coverage are confirmed per order.\n\n" +
        "This automated acknowledgement does not confirm availability, pricing, or warranty eligibility.",
      "Greeting": "Hello, Received an enquiry with below details:",
      "Customer / Plant Name": sender,
      ...data,
      "Closing": `Thank you,\n${sender}`,
      "Submission Time": new Date().toLocaleString(),
    };

    const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return {
      success: result.success === "true" || result.success === true,
      message: result.message || "Email sent successfully",
    };
  } catch (error) {
    console.warn("Direct email dispatch note:", error);
    return { success: false, error: error.message };
  }
}
