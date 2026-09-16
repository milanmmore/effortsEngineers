"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "@/lib/axiosClient";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Standard password validation checks
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter (A-Z).");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password must contain at least one lowercase letter (a-z).");
      return;
    }
    if (!/\d/.test(password)) {
      setErrorMessage("Password must contain at least one number (0-9).");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>_~`/\\[\]=+-]/.test(password)) {
      setErrorMessage("Password must contain at least one special character (!@#$%^&*...).");
      return;
    }

    setIsLoading(true);
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="section-shell" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "65vh" }}>
      <div style={{ background: "white", width: "100%", maxWidth: "460px", padding: "40px", borderRadius: "16px", border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Customer Registration</span>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "6px" }}>Create Client Account</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Register your industrial plant to manage quotations, tracking, and warranty records.
          </p>
        </div>

        {success && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #86efac",
              color: "#166534",
              padding: "16px 18px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              textAlign: "center",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "4px" }}>
              ✓ Account registration successful!
            </div>
            <span>You can now </span>
            <Link
              href="/auth/login"
              style={{
                color: "#0284c7",
                fontWeight: 800,
                textDecoration: "underline",
                fontSize: "1rem",
              }}
            >
              login
            </Link>
            <span> to access your dashboard.</span>
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              color: "#991b1b",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "18px",
              fontSize: "0.88rem",
            }}
          >
            ⚠️ Registration failed: {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
            Full Name *
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kulkarni"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: "12px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.92rem" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
            Company / Plant Name
            <input
              type="text"
              placeholder="e.g. Konkan Cold Storage Ltd"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{ padding: "12px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.92rem" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
            Official Email Address *
            <input
              type="email"
              required
              placeholder="e.g. ramesh@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "12px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.92rem" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
            Password *
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="At least 8 chars, uppercase, number & symbol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "12px 42px 12px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.92rem", width: "100%" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "12px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  fontSize: "1.05rem",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>
              Must include min. 8 characters, uppercase, lowercase, number, and special character.
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ padding: "12px", width: "100%", marginTop: "6px" }}
          >
            {isLoading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

        <div style={{ marginTop: "25px", textAlign: "center", fontSize: "0.88rem", color: "var(--text-muted)", borderTop: "1px solid var(--line)", paddingTop: "18px" }}>
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: "var(--primary)", fontWeight: 700 }}>
            Sign in here
          </Link>
        </div>
      </div>
    </main>
  );
}
