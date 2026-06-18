import { useState } from "react";
import { theme } from "../styles/theme";
import api from "../services/api";

export default function RegisterPage({ onRegisterSuccess, setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await api.register({ name, email, password });
      if (response?.success) {
        onRegisterSuccess(response.data.user);
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", padding: "40px 5%" }}>
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ margin: "0 0 8px", color: theme.primaryDark, fontSize: 32, fontWeight: 800 }}>Register</h1>
          <p style={{ margin: 0, color: theme.textMuted }}>Create your FarmRent account</p>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 16, padding: "28px 24px" }}>
          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: theme.text }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{ width: "100%", boxSizing: "border-box", marginBottom: 16, border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />

            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: theme.text }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: "100%", boxSizing: "border-box", marginBottom: 16, border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />

            <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: theme.text }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: "100%", boxSizing: "border-box", marginBottom: 16, border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />

            {error && <p style={{ color: theme.danger, fontSize: 13 }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", border: "none", borderRadius: 10, padding: "12px", background: theme.primary, color: "#fff", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1 }}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Link to Login */}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <p style={{ color: theme.textMuted, fontSize: 14 }}>
              Already have an account?{" "}
              <span
                onClick={() => setPage("login")}
                style={{ color: theme.primary, fontWeight: 700, cursor: "pointer" }}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}