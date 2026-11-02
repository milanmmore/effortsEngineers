"use client";
import React from "react";

const FIELD_STYLE = {
  padding: "9px 12px",
  border: "1px solid var(--line)",
  borderRadius: "4px",
  fontSize: "0.88rem",
};

export default function Field({ as = "input", style, label, ...props }) {
  const Element = as;
  const mergedStyle =
    as === "textarea"
      ? { ...FIELD_STYLE, fontFamily: "inherit", ...style }
      : { ...FIELD_STYLE, ...style };
  return <Element {...props} style={mergedStyle} />;
}
