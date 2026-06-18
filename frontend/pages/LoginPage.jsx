import { useState } from "react";
import { theme } from "../styles/theme";
import api from "../services/api";

export default function LoginPage({ onLoginSuccess, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await api.login({ email, password });
      if (response?.success) {
        onLoginSuccess(response.data.user);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (loginError) {
      setError(loginError.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", padding: "40px 5%" }}>
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ margin: "0 0 8px", color: theme.primaryDark, fontSize: 32, fontWeight: 800 }}>Login</h1>
          <p style={{ margin: 0, color: theme.textMuted }}>Access your FarmRent account</p>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 16, padding: "28px 24px" }}>
          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: theme.text }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              style={{ width: "100%", boxSizing: "border-box", marginBottom: 16, border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />

            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: theme.text }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              style={{ width: "100%", boxSizing: "border-box", marginBottom: 16, border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />

            {error && <p style={{ marginTop: 0, color: theme.danger, fontSize: 13 }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", border: "none", borderRadius: 10, padding: "12px", background: theme.primary, color: "#fff", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1 }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: 16, padding: "12px", borderRadius: 10, background: theme.cream, fontSize: 12, color: theme.textMuted }}>
            Demo users are in backend/data/users.json. Use any registered email/password.
          </div>

          {/* ✅ Register link added */}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <p style={{ color: theme.textMuted, fontSize: 14, margin: 0 }}>
              Don't have an account?{" "}
              <span
                onClick={() => setPage("register")}
                style={{ color: theme.primary, fontWeight: 700, cursor: "pointer" }}
              >
                Register here
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}