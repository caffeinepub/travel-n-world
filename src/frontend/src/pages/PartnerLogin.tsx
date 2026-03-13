import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";

const DEMO_PARTNERS = [
  {
    email: "rajesh@horizontravels.in",
    password: "Partner@2024",
    company: "Horizon Travels",
    name: "Rajesh Sharma",
  },
  {
    email: "priya@skywingtours.in",
    password: "Partner@2024",
    company: "SkyWing Tours",
    name: "Priya Mehta",
  },
  {
    email: "aman@travelease.in",
    password: "Partner@2024",
    company: "TravelEase India",
    name: "Aman Gupta",
  },
];

export default function PartnerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const partner = DEMO_PARTNERS.find(
        (p) => p.email === email.trim() && p.password === password,
      );
      if (partner) {
        localStorage.setItem(
          "partner_logged_in",
          JSON.stringify({
            email: partner.email,
            company: partner.company,
            name: partner.name,
          }),
        );
        navigate({ to: "/partner-dashboard" });
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "24px",
              color: "#1e40af",
            }}
          >
            Travel N World
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px" }}>
            Partner Portal Login
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="pl-email"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              id="pl-email"
              data-ocid="partner_login.email.input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "Inter, sans-serif",
              }}
            />
          </div>
          <div style={{ marginBottom: "24px", position: "relative" }}>
            <label
              htmlFor="pl-password"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              id="pl-password"
              data-ocid="partner_login.password.input"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px 40px 12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{
                position: "absolute",
                right: "12px",
                top: "36px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9ca3af",
              }}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div
              data-ocid="partner_login.error_state"
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          <button
            data-ocid="partner_login.submit_button"
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: loading ? "#93c5fd" : "#1e40af",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontFamily: "Poppins, sans-serif",
              transition: "background 0.2s",
            }}
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            background: "#f8fafc",
            borderRadius: "10px",
            padding: "14px 16px",
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          <div
            style={{ fontWeight: 600, marginBottom: "6px", color: "#374151" }}
          >
            Demo Credentials:
          </div>
          <div>Email: rajesh@horizontravels.in</div>
          <div>Password: Partner@2024</div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "13px",
            color: "#9ca3af",
          }}
        >
          Admin?{" "}
          <a
            href="/admin-login"
            style={{
              color: "#1e40af",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Admin Login
          </a>
        </div>
      </div>
    </div>
  );
}
