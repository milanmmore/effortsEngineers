"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import API from "@/lib/axiosClient";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState(1); // 1: enter email, 2: enter new password
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    try {
      await login(email, password);
      if (email.includes("admin")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/client/dashboard");
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setLoginError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Request Password Reset
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    setForgotSuccess("");
    try {
      const res = await API.post("/auth/forgot-password", { email: forgotEmail });
      if (res.data?.resetToken) {
        setResetToken(res.data.resetToken);
        setForgotStep(2);
        setForgotSuccess("Verification confirmed! Please set your new password below.");
      } else {
        setForgotSuccess("Instructions have been dispatched to your email address.");
      }
    } catch (err) {
      setForgotError(err.response?.data?.message || err.message);
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2: Set New Password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setForgotError("");

    if (newPassword.length < 8) {
      setForgotError("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setForgotError("Password must contain at least one uppercase letter (A-Z).");
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      setForgotError("Password must contain at least one lowercase letter (a-z).");
      return;
    }
    if (!/\d/.test(newPassword)) {
      setForgotError("Password must contain at least one number (0-9).");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>_~`/\\[\]=+-]/.test(newPassword)) {
      setForgotError("Password must contain at least one special character (!@#$%^&*...).");
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match. Please re-enter.");
      return;
    }

    setForgotLoading(true);
    try {
      await API.post("/auth/reset-password", {
        token: resetToken,
        newPassword,
      });
      setForgotSuccess("Password has been reset successfully! You can now sign in.");
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotStep(1);
        setEmail(forgotEmail);
      }, 1500);
    } catch (err) {
      setForgotError(err.response?.data?.message || err.message);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <main className="section-shell" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "65vh" }}>
      <div style={{ background: "white", width: "100%", maxWidth: "440px", padding: "40px", borderRadius: "16px", border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <span className="eyebrow" style={{ color: "var(--primary)" }}>Portal Access</span>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "6px" }}>Sign In to Portal</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Access your quotations, order tracking, and warranty records.
          </p>
        </div>

        {loginError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#991b1b", padding: "12px 16px", borderRadius: "8px", marginBottom: "18px", fontSize: "0.88rem" }}>
            ⚠️ {loginError}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} style={{ display: "grid", gap: "16px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
            Email Address *
            <input
              type="email"
              required
              placeholder="e.g. engineer@coldstorage.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "12px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.92rem" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Password *</span>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotError("");
                  setForgotSuccess("");
                  setForgotStep(1);
                  setShowForgotModal(true);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--primary)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Forgot Password?
              </button>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showLoginPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "12px 42px 12px 14px",
                  border: "1px solid var(--line)",
                  borderRadius: "6px",
                  fontSize: "0.92rem",
                  width: "100%",
                }}
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                title={showLoginPassword ? "Hide password" : "Show password"}
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
                {showLoginPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ padding: "12px", width: "100%", marginTop: "6px" }}
          >
            {isLoading ? "Signing in..." : "Sign In to Portal →"}
          </button>
        </form>

        <div style={{ marginTop: "25px", textAlign: "center", fontSize: "0.88rem", color: "var(--text-muted)", borderTop: "1px solid var(--line)", paddingTop: "18px" }}>
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/register" style={{ color: "var(--primary)", fontWeight: 700 }}>
            Register here
          </Link>
        </div>

        <div style={{ marginTop: "16px", background: "var(--bg-page)", padding: "12px", borderRadius: "6px", fontSize: "0.78rem", color: "var(--text-dim)", textAlign: "center" }}>
          Demo Admin: <code>admin@example.com</code> | Client: <code>user@example.com</code>
        </div>
      </div>

      {/* Forgot Password Modal Dialog */}
      {showForgotModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setShowForgotModal(false)}
        >
          <div
            style={{
              background: "white",
              width: "100%",
              maxWidth: "420px",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "var(--shadow-xl)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowForgotModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: "1.35rem", marginBottom: "6px", color: "var(--navy)" }}>
              {forgotStep === 1 ? "Reset Your Password" : "Set New Password"}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "18px" }}>
              {forgotStep === 1
                ? "Enter your registered email address to receive password reset instructions."
                : "Enter and confirm your new secure password."}
            </p>

            {forgotError && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#991b1b", padding: "10px 14px", borderRadius: "8px", marginBottom: "14px", fontSize: "0.84rem" }}>
                ⚠️ {forgotError}
              </div>
            )}

            {forgotSuccess && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", color: "#166534", padding: "10px 14px", borderRadius: "8px", marginBottom: "14px", fontSize: "0.84rem" }}>
                ✓ {forgotSuccess}
              </div>
            )}

            {forgotStep === 1 ? (
              <form onSubmit={handleForgotSubmit} style={{ display: "grid", gap: "14px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Registered Email Address *
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@company.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    style={{ padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem" }}
                  />
                </label>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="btn btn-primary"
                  style={{ padding: "11px", width: "100%", justifyContent: "center" }}
                >
                  {forgotLoading ? "Verifying..." : "Continue to Reset →"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} style={{ display: "grid", gap: "14px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  New Password *
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      placeholder="Min 8 chars, uppercase, number & symbol"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{ padding: "11px 40px 11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem", width: "100%" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      title={showNewPassword ? "Hide password" : "Show password"}
                      style={{
                        position: "absolute",
                        right: "10px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#64748b",
                        fontSize: "1rem",
                        padding: "2px",
                      }}
                    >
                      {showNewPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </label>

                {/* Password Validation Checklist */}
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "10px 14px", fontSize: "0.78rem" }}>
                  <div style={{ fontWeight: 700, color: "#475569", marginBottom: "6px" }}>Password Requirements:</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                    <span style={{ color: newPassword.length >= 8 ? "#16a34a" : "#64748b" }}>
                      {newPassword.length >= 8 ? "✓" : "•"} At least 8 chars
                    </span>
                    <span style={{ color: /[A-Z]/.test(newPassword) ? "#16a34a" : "#64748b" }}>
                      {/[A-Z]/.test(newPassword) ? "✓" : "•"} 1 Uppercase (A-Z)
                    </span>
                    <span style={{ color: /[a-z]/.test(newPassword) ? "#16a34a" : "#64748b" }}>
                      {/[a-z]/.test(newPassword) ? "✓" : "•"} 1 Lowercase (a-z)
                    </span>
                    <span style={{ color: /\d/.test(newPassword) ? "#16a34a" : "#64748b" }}>
                      {/\d/.test(newPassword) ? "✓" : "•"} 1 Number (0-9)
                    </span>
                    <span style={{ color: /[!@#$%^&*(),.?":{}|<>_~`/\\[\]=+-]/.test(newPassword) ? "#16a34a" : "#64748b", gridColumn: "span 2" }}>
                      {/[!@#$%^&*(),.?":{}|<>_~`/\\[\]=+-]/.test(newPassword) ? "✓" : "•"} 1 Special character (!@#$%^&*...)
                    </span>
                  </div>
                </div>

                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", fontWeight: 700 }}>
                  Confirm New Password *
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ padding: "11px 40px 11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "0.9rem", width: "100%" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      title={showConfirmPassword ? "Hide password" : "Show password"}
                      style={{
                        position: "absolute",
                        right: "10px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#64748b",
                        fontSize: "1rem",
                        padding: "2px",
                      }}
                    >
                      {showConfirmPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                  {confirmPassword && (
                    <span style={{ fontSize: "0.75rem", color: newPassword === confirmPassword ? "#16a34a" : "#dc2626" }}>
                      {newPassword === confirmPassword ? "✓ Passwords match" : "✕ Passwords do not match"}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="btn btn-primary"
                  style={{ padding: "11px", width: "100%", justifyContent: "center" }}
                >
                  {forgotLoading ? "Updating Password..." : "Save New Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
