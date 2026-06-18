import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import { WEATHER } from "../data/constants";
import { Badge } from "../components/ui/Badge";
import api from "../services/api";

const STAT_CARDS = (bookings) => {
  const completed = bookings.filter((b) => b.status === "completed").length;
  const totalSpent = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0);
  return [
    { label: "Total Bookings", value: bookings.length, icon: "📋", color: "#E8F4FD", text: "#1565C0" },
    { label: "Completed", value: completed, icon: "✅", color: "#D8F3DC", text: "#1B5E20" },
    { label: "Total Spent", value: `₹${totalSpent.toLocaleString("en-IN")}`, icon: "💰", color: "#FFF3E0", text: "#E65100" },
    { label: "Acres Farmed", value: "48 ac", icon: "🌾", color: "#F3E8FD", text: "#6A1B9A" },
  ];
};

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = api.getCurrentUser();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await api.getBookings();
        setBookings(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", padding: "32px 5%" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Welcome banner */}
        <div style={{ background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`, borderRadius: 20, padding: "28px 32px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Welcome back</p>
            <h1 style={{ margin: "0 0 6px", color: "#fff", fontSize: 26, fontWeight: 800 }}>
              नमस्ते, {user?.name || "Farmer"} 👋
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
              Manage your bookings, track spending & find equipment
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 22px", textAlign: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ color: theme.gold, fontWeight: 800, fontSize: 20 }}>Kharif Ready</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 2 }}>Season 2026</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
          {STAT_CARDS(bookings).map((stat) => (
            <div key={stat.label} style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 16, padding: "20px 18px", textAlign: "center", transition: "box-shadow 0.2s" }}>
              <div style={{ width: 48, height: 48, background: stat.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "0 auto 12px" }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: stat.text }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Weather */}
        <div style={{ background: "linear-gradient(135deg, #1565C0, #1976D2)", borderRadius: 18, padding: "22px 24px", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>☀️ Agricultural Weather — Delhi NCR</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff" }}>{WEATHER.temp}°C</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>{WEATHER.condition}</span>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                <span>💧 {WEATHER.humidity}% humidity</span>
                <span>💨 {WEATHER.wind}</span>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "16px 18px", maxWidth: 260, border: "1px solid rgba(255,255,255,0.15)" }}>
              <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 13, color: "#fff" }}>📢 Farm Advisory</p>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{WEATHER.advisory}</p>
            </div>
          </div>
        </div>

        {/* Bookings table */}
        <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.text }}>My Bookings</h2>
            <span style={{ fontSize: 13, color: theme.textMuted, background: theme.bg, padding: "4px 12px", borderRadius: 20 }}>
              {bookings.length} total
            </span>
          </div>

          {loading ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
              <p style={{ color: theme.textMuted, margin: 0 }}>Loading your bookings...</p>
            </div>
          ) : error ? (
            <div style={{ padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
              <p style={{ color: theme.danger, margin: 0 }}>{error}</p>
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <h3 style={{ margin: "0 0 8px", color: theme.text }}>No bookings yet</h3>
              <p style={{ color: theme.textMuted, margin: 0 }}>Head to the Search page to book your first piece of equipment.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: theme.bg }}>
                    {["Booking ID", "Equipment", "Date", "Amount", "Status"].map((h) => (
                      <th key={h} style={{ padding: "12px 20px", textAlign: "left", color: theme.textMuted, fontWeight: 600, fontSize: 12, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, i) => (
                    <tr key={booking.id} style={{ borderTop: `1px solid ${theme.border}`, background: i % 2 ? theme.bg : "#fff" }}>
                      <td style={{ padding: "14px 20px", fontFamily: "monospace", color: theme.primary, fontWeight: 600 }}>#{String(booking.id).slice(-6)}</td>
                      <td style={{ padding: "14px 20px", fontWeight: 500 }}>{booking.equipmentName || booking.equipment || "Equipment"}</td>
                      <td style={{ padding: "14px 20px", color: theme.textMuted }}>
                        {booking.startDate ? new Date(booking.startDate).toLocaleDateString("en-IN") : booking.date || "—"}
                      </td>
                      <td style={{ padding: "14px 20px", fontWeight: 700, color: theme.primaryDark }}>
                        ₹{Number(booking.totalAmount || booking.amount || 0).toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding: "14px 20px" }}><Badge status={booking.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
