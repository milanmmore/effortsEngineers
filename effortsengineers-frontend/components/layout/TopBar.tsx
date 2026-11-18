"use client";

import React from "react";
import InterfaceIcon from "@/components/InterfaceIcon";
import { TOP_BAR_CONFIG } from "@/lib/siteConfig";

export default function TopBar() {
  return (
    <div className="top-announcement-bar">
      <div className="announcement-inner">
        <div className="announcement-left">
          <span>
            <InterfaceIcon name="bolt" size={16} /> {TOP_BAR_CONFIG.announcement}
          </span>
        </div>
        <div className="announcement-right">
          <a href={`tel:${TOP_BAR_CONFIG.phoneRaw}`}>
            <InterfaceIcon name="phone" size={15} /> {TOP_BAR_CONFIG.phone}
          </a>
          <a href={`mailto:${TOP_BAR_CONFIG.email}`}>
            <InterfaceIcon name="mail" size={15} /> {TOP_BAR_CONFIG.email}
          </a>
        </div>
      </div>
    </div>
  );
}
