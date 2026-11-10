const EMAIL_TIMEOUT_MS = 10_000;

export async function sendEmailNotification({
  subject,
  replyTo,
  reference,
  data = {},
}) {
  const token = process.env.FORMSUBMIT_TOKEN?.trim();
  if (!token) {
    return {
      success: false,
      message: "Email delivery is not configured on the backend.",
    };
  }

  const cc = process.env.EMAIL_NOTIFICATION_CC?.trim();
  const autoresponse =
    `Thank you for contacting Efforts Engineers${reference ? ` (reference: ${reference})` : ""}.\n\n` +
    "We have received your enquiry. Our team will review your details and follow up using the contact information provided. " +
    "Availability, pricing, dispatch estimates, and any warranty coverage are confirmed per order.\n\n" +
    "This automated acknowledgement does not confirm availability, pricing, or warranty eligibility.";
  const safeSubject =
    (typeof subject === "string" ? subject : "")
      .replace(/[\r\n\t]+/g, " ")
      .trim()
      .slice(0, 180) || "New enquiry from Efforts Engineers";
  const fallbackReplyTo =
    process.env.EMAIL_REPLY_TO?.trim() || "sales@effortsengineers.in";
  const safeReplyTo =
    typeof replyTo === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo.trim())
      ? replyTo.trim()
      : fallbackReplyTo;
  const payload = {
    ...(cc && { _cc: cc }),
    _subject: safeSubject,
    _replyto: safeReplyTo,
    _template: "table",
    _autoresponse: autoresponse,
    Greeting: "Hello, we received an enquiry with the following details:",
    ...data,
    Closing: "Thank you,\nEfforts Engineers",
    "Submission Time": new Date().toISOString(),
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(token)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });

    let result;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    const success =
      response.ok && (result?.success === "true" || result?.success === true);
    if (!success) {
      console.error("Email provider rejected notification:", {
        status: response.status,
        message: result?.message || "Provider returned an unsuccessful response.",
      });
    }
    return {
      success,
      message: success
        ? result?.message || "Email sent successfully."
        : result?.message || "Email provider did not confirm delivery.",
    };
  } catch (error) {
    console.error("Email provider request failed:", {
      name: error.name,
    });
    return {
      success: false,
      message:
        error.name === "TimeoutError" || error.name === "AbortError"
          ? "Email provider request timed out."
          : "Email provider could not be reached.",
    };
  }
}
