"use client";

import React from "react";
import Link from "next/link";
import InterfaceIcon from "@/components/InterfaceIcon";
import { NAV_ITEMS, NavItem } from "@/lib/siteConfig";

interface NavItemsProps {
  pathname: string;
  activeDropdown: string | null;
  toggleDropdown: (id: string) => void;
  closeAll: () => void;
  user: { role: string } | null;
  logout: () => void;
  items: unknown[];
  setIsDrawerOpen: (open: boolean) => void;
}

export default function NavItems({
  pathname,
  activeDropdown,
  toggleDropdown,
  closeAll,
  user,
  logout,
  items,
  setIsDrawerOpen,
}: NavItemsProps) {
  const isActive = (path: string) => pathname === path;

  const isDropdownActive = (item: NavItem) => {
    if (!item.dropdown) return false;
    return item.dropdown.some((sub) => pathname === sub.href);
  };

  return (
    <>
      {NAV_ITEMS.map((item) => {
        // Plain link
        if (!item.dropdown) {
          return (
            <Link
              key={item.id}
              href={item.href || "/"}
              className={isActive(item.href || "/") ? "active" : ""}
              onClick={closeAll}
            >
              {item.label}
            </Link>
          );
        }

        // Dropdown menu
        const isOpen = activeDropdown === item.id;
        const hasActiveChild = isDropdownActive(item);

        return (
          <div
            key={item.id}
            className={`nav-dropdown ${isOpen ? "is-open" : ""}`}
          >
            <button
              type="button"
              className={`nav-dropdown-trigger ${hasActiveChild ? "has-active-child" : ""}`}
              onClick={() => toggleDropdown(item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.label}</span>
              <span className="dropdown-chevron">▼</span>
            </button>
            <div className="dropdown-menu">
              {item.dropdown.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={`dropdown-item ${isActive(sub.href) ? "active" : ""}`}
                  onClick={closeAll}
                >
                  <span className="dropdown-item-icon">
                    <InterfaceIcon name={sub.icon} size={19} />
                  </span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">{sub.title}</span>
                    <span className="dropdown-item-desc">{sub.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {user?.role === "client" && (
        <Link
          href="/client/dashboard"
          className={isActive("/client/dashboard") ? "active" : ""}
          onClick={closeAll}
        >
          Client Portal
        </Link>
      )}

      {user?.role === "admin" && (
        <Link
          href="/admin/dashboard"
          className={isActive("/admin/dashboard") ? "active" : ""}
          onClick={closeAll}
        >
          Admin Panel
        </Link>
      )}

      <button
        type="button"
        className="mobile-nav-action mobile-nav-quote"
        onClick={() => {
          closeAll();
          setIsDrawerOpen(true);
        }}
      >
        Quote Builder{items.length > 0 ? ` (${items.length})` : ""}
      </button>

      {user ? (
        <button
          type="button"
          className="mobile-nav-action"
          onClick={() => {
            closeAll();
            logout();
          }}
        >
          Logout ({user.role})
        </button>
      ) : (
        <Link href="/auth/login" className="mobile-nav-action" onClick={closeAll}>
          Portal Login
        </Link>
      )}
    </>
  );
}
