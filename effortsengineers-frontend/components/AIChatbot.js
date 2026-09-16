"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import API from "@/lib/axiosClient";
import { QuoteContext } from "@/context/QuoteContext";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am the **Efforts AI Spares Assistant**. How can I help with your industrial refrigeration or air compressor requirements today?",
      suggestions: [
        "Grasso RC11 Spares",
        "Bitzer 4N / 6F Stock",
        "Kirloskar Spares",
        "Request Instant Quotation",
        "Express 24h Delivery",
      ],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { setIsDrawerOpen } = useContext(QuoteContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userMsgText) => {
    const textToSend = userMsgText || inputText;
    if (!textToSend.trim()) return;

    const userMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // If user asks to quote or open quote builder
    if (textToSend.toLowerCase().includes("quote") || textToSend.toLowerCase().includes("rfq")) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Opening our **Quotation Builder** for you right away. You can select products from the catalog or submit custom compressor specifications!",
            suggestions: ["Check Ready Stock", "Talk on WhatsApp", "ISO Certificates"],
          },
        ]);
        setIsTyping(false);
        setIsDrawerOpen(true);
      }, 500);
      return;
    }

    try {
      const response = await API.post("/chat", { message: textToSend });
      const replyData = response.data;
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: replyData.reply,
          suggestions: replyData.suggestions || ["Check Other Spares", "Request Instant Quote"],
        },
      ]);
    } catch (err) {
      // Intelligent local client fallback if backend is offline
      let fallbackReply = "We stock replacement spares for **Kirloskar, Grasso, Bitzer, Carrier, Sabroe, Bock, Daikin, Vilter, and Mycom** compressors with ready inventory in Pune. Express 24-48h dispatch available worldwide.";
      const lower = textToSend.toLowerCase();

      if (lower.includes("grasso")) {
        fallbackReply = "For **Grasso RC9, RC11, and RC12** compressors, we stock precision cylinder liners, PTFE piston rings, unloader sleeves, and suction/discharge valve plates. Ready for 24-hour express dispatch.";
      } else if (lower.includes("bitzer")) {
        fallbackReply = "For **Bitzer 4N, 4P, 4T, 6F, 4G, 6G** units, we supply connecting rods, valve reed plates, and complete overhaul gasket sets with 1-year replacement guarantee.";
      } else if (lower.includes("kirloskar")) {
        fallbackReply = "For **Kirloskar KC and KCX series**, we hold ready inventory of cylinder liners, crankshaft bushes, piston assemblies, and mechanical seals.";
      } else if (lower.includes("delivery") || lower.includes("stock") || lower.includes("dispatch")) {
        fallbackReply = "Over **10,000+ line items** ready in Pune. Breakdown orders are dispatched within 24 hours via express courier/air cargo.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: fallbackReply,
          suggestions: ["Request Instant Quote", "WhatsApp Engineer", "Explore Products"],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className="chatbot-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Assistant"
        title="AI Assistant"
      >
        {isOpen ? (
          <span style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1 }}>✕</span>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A1.5 1.5 0 0 0 6 14.5 1.5 1.5 0 0 0 7.5 16 1.5 1.5 0 0 0 9 14.5 1.5 1.5 0 0 0 7.5 13m9 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5M9 18h6v-1.5H9z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-window-header">
            <div className="chat-header-info">
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
              <div>
                <h4>Efforts AI Assistant</h4>
                <span>• Active Engineer Support</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "white", fontSize: "1.2rem", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          <div className="chat-window-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${msg.sender === "ai" ? "chat-bubble-ai" : "chat-bubble-user"}`}
              >
                <div style={{ whiteSpace: "pre-line" }}>{msg.text}</div>
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="chat-chips-row">
                    {msg.suggestions.map((chip, i) => (
                      <button
                        key={i}
                        className="chat-chip"
                        onClick={() => handleSend(chip)}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble chat-bubble-ai" style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                Thinking & checking inventory...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="chat-window-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask about compressor parts, models, stock..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "8px 14px", fontSize: "0.85rem" }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

