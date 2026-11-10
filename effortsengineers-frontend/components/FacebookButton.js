"use client";

import React from "react";
import CONTACT_CONFIG from "@/config/contactConfig";

export default function FacebookButton() {
  const facebookUrl = CONTACT_CONFIG.profileLinks.find(
    ({ label }) => label === "Facebook"
  )?.url;

  if (!facebookUrl) return null;

  return (
    <a
      href={facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="facebook-trigger-btn"
      aria-label="Visit Efforts Engineers on Facebook"
      title="Visit Efforts Engineers on Facebook"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M24 12a12 12 0 1 0-13.875 11.86v-8.39H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.313 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.39A12.002 12.002 0 0 0 24 12Z" />
      </svg>
    </a>
  );
}
