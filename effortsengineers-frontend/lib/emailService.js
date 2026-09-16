// lib/emailService.js
import { CONTACT_CONFIG } from "@/config/contactConfig";

/**
 * Dispatch contact forms, RFQs, and quotation requests directly to target emails.
 * Uses FormSubmit.co endpoint with your unique verified token: 1779af28564bf27dc0c4ecd0f6909d7c
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
    const payload = {
      _subject: subject || "New RFQ / Inquiry from Efforts Engineers",
      _replyto: reply_to || CONTACT_CONFIG.primaryEmail,
      _cc: CONTACT_CONFIG.secondaryEmail,
      _template: "table",
      _captcha: "false",
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
