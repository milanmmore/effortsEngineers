"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import API from "@/lib/axiosClient";
import { QuoteContext } from "@/context/QuoteContext";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Welcome to Efforts Engineers!\nLooking for compressor spare parts?\nAsk about catalog items or use the quote builder to send an enquiry. Current availability is confirmed by our team.",
      suggestions: [
        "Show me Carrier compressor valve spares",
        "Grasso RC11 Spares",
        "Bitzer 4N / 6F Stock",
        "Open Quote Builder",
        "WhatsApp Engineer",
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

    // If user clicks / asks to request a quote or open quote builder
    const lower = textToSend.toLowerCase();
    if (
      lower === "request instant quote" ||
      lower === "request instant quotation" ||
      lower === "open quote builder"
    ) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Opening the quotation builder. You can select catalog products or submit a custom part enquiry.",
            suggestions: ["Ask About Availability", "Talk on WhatsApp", "Supplier Documents"],
          },
        ]);
        setIsTyping(false);
        setIsDrawerOpen(true);
      }, 400);
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
          suggestions: replyData.suggestions || ["Request a Quote", "Ask About Availability", "WhatsApp Engineer"],
        },
      ]);
    } catch (err) {
      console.error("Product enquiry assistant request failed:", err);
      const fallbackReply =
        "I can help with general part enquiries, but I cannot verify live stock, confirm compatibility, or diagnose equipment here. Please use the catalog and contact our team to confirm details.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: fallbackReply,
          suggestions: ["Request a Quote", "Ask About Availability", "WhatsApp Engineer"],
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
        aria-label="Parts enquiry support"
        title="Parts enquiry support"
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
                <h4>Parts Enquiry Support</h4>
                <span>• Catalog and contact guidance</span>
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
                Preparing a response...
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
              placeholder="Ask about compressor part enquiries..."
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
