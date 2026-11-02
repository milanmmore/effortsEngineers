"use client";
import { useState } from "react";
import API from "@/lib/axiosClient";
import { sendEmailNotification } from "@/lib/emailService";
import CONTACT_CONFIG from "@/config/contactConfig";

const DEFAULT_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  urgency: "Standard — timing to be confirmed",
  notes: "",
};

const generateQuoteId = () => `EE-QT-${Math.floor(1000 + Math.random() * 9000)}`;

/**
 * Encapsulates the RFQ submit flow for the quotation drawer:
 * email notification, backend registration, and submitted state.
 */
export default function useQuoteSubmission({
  items,
  totalEstimated,
  hasUnpricedItems,
  clearQuote,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const sendNotification = (quoteId) =>
    sendEmailNotification({
      subject: `📋 New Formal RFQ Quote Request: ${formData.company || formData.name} (${items.length} parts)`,
      from_name: formData.name,
      reply_to: formData.email || CONTACT_CONFIG.primaryEmail,
      data: {
        quote_id: quoteId,
        customer_name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        urgency: formData.urgency,
        notes: formData.notes,
        estimated_total: hasUnpricedItems
          ? "Pricing to be confirmed"
          : `INR ₹${totalEstimated.toLocaleString("en-IN")}`,
        items_requested: items
          .map((it) => `${it.name} (Qty: ${it.quantity}, Make: ${it.brand || "OEM"})`)
          .join("; "),
        submitted_at: new Date().toLocaleString(),
      },
    }).catch((err) => console.warn("Direct quote email notice:", err));

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
    let quoteId = generateQuoteId();
    sendNotification(quoteId);

    try {
      const res = await API.post("/client/quotation", buildPayload());
      if (res.data?.id) quoteId = `EE-QT-${res.data.id}`;
    } catch (err) {
      // Keep the form state and tell the user the RFQ was not registered.
      console.error("RFQ registration failed:", err);
      setSubmitError(
        "We could not register your RFQ right now. Please try again in a moment or contact us on WhatsApp."
      );
      setIsSubmitting(false);
      return;
    }

    setSubmittedQuote({
      id: quoteId,
      date: new Date().toLocaleDateString(),
      customer: formData,
      items: [...items],
      total: totalEstimated,
    });
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
