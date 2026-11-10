"use client";
import { useState } from "react";
import API from "@/lib/axiosClient";

const DEFAULT_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  urgency: "Standard — timing to be confirmed",
  notes: "",
};

/**
 * Encapsulates the RFQ submit flow for the quotation drawer:
 * backend registration and submitted state.
 */
export default function useQuoteSubmission({
  items,
  totalEstimated,
  clearQuote,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const buildPayload = () => ({
    customer_name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    urgency: formData.urgency,
    notes: formData.notes,
    product_id: items[0]?.id || 1,
    quantity: items.reduce((sum, it) => sum + it.quantity, 0),
    items,
    total: totalEstimated,
  });

  const submit = async (event) => {
    event.preventDefault();
    if (items.length === 0) {
      return alert("Please add at least one spare part to your quotation request.");
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await API.post("/client/quotation", buildPayload());
      const quoteId = res.data?.quoteId || (res.data?.id && `EE-QT-${res.data.id}`);
      if (!quoteId) {
        throw new Error("The quotation service did not return a reference number.");
      }
      const notificationWarning = res.data?.notification?.success
        ? ""
        : "Your request was registered, but the email notification could not be confirmed. Please contact us with this reference if you need to follow up.";

      setSubmittedQuote({
        id: quoteId,
        date: new Date().toLocaleDateString(),
        customer: formData,
        items: [...items],
        total: totalEstimated,
        notificationWarning,
      });
    } catch (err) {
      // Keep the form state and tell the user the RFQ was not registered.
      console.error("RFQ registration failed:", err);
      setSubmitError(
        "We could not register your RFQ right now. Please try again in a moment or contact us on WhatsApp."
      );
      setIsSubmitting(false);
      return;
    }

    clearQuote();
    setIsSubmitting(false);
  };

  const resetSubmission = () => {
    setSubmittedQuote(null);
    setSubmitError("");
  };

  return {
    formData,
    updateField,
    isSubmitting,
    submittedQuote,
    submitError,
    submit,
    resetSubmission,
  };
}
