import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tnw_admin_auth") === "true") {
      navigate({ to: "/admin-dashboard" });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (email === "admin@travelnworld.com" && password === "Admin@2024") {
      localStorage.setItem("tnw_admin_auth", "true");
      navigate({ to: "/admin-dashboard" });
    } else {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7fa 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow:
            "0 20px 60px rgba(30, 64, 175, 0.12), 0 4px 16px rgba(0,0,0,0.08)",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img
            src="/assets/uploads/Screenshot-2026-03-12-155625-1.png"
            alt="Travel N World"
            style={{
              height: "56px",
              objectFit: "contain",
              marginBottom: "16px",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "40px",
              padding: "6px 16px",
              marginBottom: "16px",
            }}
          >
            <Shield size={14} color="#1E40AF" />
            <span
              style={{ fontSize: "12px", color: "#1E40AF", fontWeight: 600 }}
            >
              Secure Admin Access
            </span>
          </div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Admin Login
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280", marginTop: "6px" }}>
            Sign in to manage Travel N World platform
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            data-ocid="admin-login.error_state"
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#dc2626",
              fontSize: "14px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="admin-email"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Admin Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                color="#9CA3AF"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@travelnworld.com"
                required
                data-ocid="admin-login.input"
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#111827",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1E40AF";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                color="#9CA3AF"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                data-ocid="admin-login.input"
                style={{
                  width: "100%",
                  padding: "12px 44px 12px 42px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#111827",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1E40AF";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                data-ocid="admin-login.toggle"
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "#6B7280",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            data-ocid="admin-login.submit_button"
            style={{
              width: "100%",
              padding: "14px",
              background: isLoading ? "#93C5FD" : "#1E40AF",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {isLoading ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Authenticating...
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9CA3AF",
            marginTop: "24px",
            margin: "24px 0 0 0",
          }}
        >
          🔒 This panel is restricted to authorized administrators only.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
