"use client";
import React from "react";
import CONTACT_CONFIG from "@/config/contactConfig";

export default function WhatsAppButton() {
  const whatsappNumber = CONTACT_CONFIG.whatsappRaw;
  const defaultMessage = encodeURIComponent(
    "Hello Efforts Engineers! I have an urgent inquiry for compressor spare parts. Please share availability & quotation."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-trigger-btn"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp with Technical Sales"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.05 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.43 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.63 13.48 14.47 13.44 14.3 13.69C14.14 13.94 13.67 14.49 13.53 14.65C13.38 14.82 13.24 14.84 12.99 14.71C12.74 14.59 11.94 14.33 10.99 13.48C10.25 12.82 9.75 12.01 9.6 11.76C9.46 11.51 9.59 11.38 9.71 11.26C9.82 11.15 9.96 10.97 10.08 10.83C10.21 10.68 10.25 10.58 10.33 10.42C10.41 10.25 10.37 10.11 10.31 9.98C10.25 9.86 9.75 8.63 9.55 8.12C9.35 7.62 9.14 7.69 8.99 7.68C8.84 7.67 8.68 7.67 8.51 7.67C8.35 7.67 8.08 7.73 7.86 7.98C7.63 8.22 7 8.82 7 10.03C7 11.24 7.88 12.41 8.01 12.57C8.13 12.74 9.75 15.24 12.23 16.31C12.82 16.57 13.28 16.72 13.64 16.83C14.23 17.02 14.77 16.99 15.2 16.93C15.68 16.86 16.67 16.33 16.88 15.75C17.08 15.17 17.08 14.68 17.02 14.58C16.96 14.47 16.81 14.42 16.56 14.37Z" />
      </svg>
    </a>
  );
}

