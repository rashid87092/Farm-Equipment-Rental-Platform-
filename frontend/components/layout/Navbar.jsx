import { useState } from "react";
import { theme } from "../../styles/theme";

export function Navbar({ page, setPage, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  const links = [
    { id: "home", label: "Home" },
    { id: "search", label: "Find Equipment" },
    { id: "dashboard", label: "My Bookings" },
    { id: "owner", label: "Owner Hub" },
    { id: "list", label: "List Equipment" },
  ];

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${theme.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", display: "flex", alignItems: "center", height: 64 }}>
        <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: "none", marginRight: 32, background: "transparent", border: "none" }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🚜</div>
          <span style={{ fontWeight: 900, fontSize: 20, color: theme.primaryDark, letterSpacing: -0.5 }}>Farm<span style={{ color: theme.accent }}>Rent</span></span>
        </button>

        <div style={{ display: "flex", gap: 4, flex: 1, alignItems: "center" }}>
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className="nav-link"
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "none",
                background: page === link.id ? `${theme.primary}15` : "transparent",
                color: page === link.id ? theme.primary : theme.textMuted,
                fontWeight: page === link.id ? 700 : 500,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {user ? (
            <button
              onClick={onLogout}
              style={{ padding: "6px 12px", border: `1.5px solid ${theme.primary}`, borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", color: theme.primary }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setPage("login")}
              style={{ padding: "6px 12px", border: `1.5px solid ${theme.primary}`, borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", color: theme.primary }}
            >
              Login
            </button>
          )}

          <button
            onClick={() => setLang((current) => (current === "EN" ? "HI" : "EN"))}
            style={{ padding: "6px 12px", border: `1.5px solid ${theme.border}`, borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: theme.text }}
          >
            {lang === "EN" ? "🇮🇳 हिं" : "🇬🇧 EN"}
          </button>
          <button onClick={() => setPage("search")} style={{ padding: "8px 18px", background: theme.primary, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Find Equipment
          </button>
          <button onClick={() => setMenuOpen((open) => !open)} style={{ padding: "8px 10px", border: `1.5px solid ${theme.border}`, borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 18 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: "#fff", borderTop: `1px solid ${theme.border}`, padding: "12px 5%" }}>
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setPage(link.id);
                setMenuOpen(false);
              }}
              style={{ display: "block", width: "100%", padding: "12px 16px", textAlign: "left", border: "none", background: page === link.id ? `${theme.primary}12` : "transparent", color: page === link.id ? theme.primary : theme.text, fontWeight: 600, fontSize: 15, cursor: "pointer", borderRadius: 10, marginBottom: 4 }}
            >
              {link.label}
            </button>
          ))}

          {user ? (
            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              style={{ display: "block", width: "100%", padding: "12px 16px", textAlign: "left", border: "none", background: "transparent", color: theme.primary, fontWeight: 700, fontSize: 15, cursor: "pointer", borderRadius: 10, marginBottom: 4 }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setPage("login");
                setMenuOpen(false);
              }}
              style={{ display: "block", width: "100%", padding: "12px 16px", textAlign: "left", border: "none", background: "transparent", color: theme.primary, fontWeight: 700, fontSize: 15, cursor: "pointer", borderRadius: 10, marginBottom: 4 }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
