"use client";
import React, { createContext, useState, useEffect } from "react";

export const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load quote items from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ee_quote_items");
      if (saved) {
        const savedItems = JSON.parse(saved);
        if (!Array.isArray(savedItems)) {
          throw new Error("Saved quote items are not a list.");
        }
        setItems(savedItems.map((item) => ({
          ...item,
          oem_no: /^EE-PART-\d+$/i.test(item.oem_no || "") ? "" : item.oem_no || "",
        })));
      }
    } catch (e) {
      console.error("Failed to load quote cart", e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ee_quote_items", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save quote cart", e);
    }
  }, [items]);

  const addItem = (product) => {
    const price = Number(product.price);
    const listedPrice = product.price === null || product.price === undefined || product.price === ""
      ? null
      : Number.isFinite(price)
        ? price
        : null;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                name: product.name,
                brand: product.brand || "Industrial Grade",
                oem_no: product.part_number || product.oem_no || "",
                price: listedPrice,
                stock_status: product.stock_status || "Availability on request",
                quantity: item.quantity + 1,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand || "Industrial Grade",
          oem_no: product.part_number || product.oem_no || "",
          price: listedPrice,
          quantity: 1,
          stock_status: product.stock_status || "Availability on request",
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalEstimated = items.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
    0
  );

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearQuote,
        isDrawerOpen,
        setIsDrawerOpen,
        totalEstimated,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
