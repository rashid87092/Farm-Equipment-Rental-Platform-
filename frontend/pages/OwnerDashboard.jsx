import { useState } from "react";
import { theme } from "../styles/theme";

const earnings = [
  { month: "Feb", amount: 12400 },
  { month: "Mar", amount: 18200 },
  { month: "Apr", amount: 24800 },
  { month: "May", amount: 19600 },
];

const initialRequests = [
  { id: 1, farmer: "Rajveer Yadav", equipment: "John Deere 5075E", date: "25 May 2026", hours: 6, amount: 5100, status: "pending" },
  { id: 2, farmer: "Priya Malhotra", equipment: "John Deere 5075E", date: "27 May 2026", hours: 4, amount: 3400, status: "pending" },
  { id: 3, farmer: "Akram Khan", equipment: "Rotavator MB-135", date: "28 May 2026", hours: 8, amount: 3200, status: "pending" },
];

const maxEarning = Math.max(...earnings.map((e) => e.amount));

export default function OwnerDashboard() {
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: action } : r)
    );
  };

  const pending = requests.filter((r) => r.status === "pending");
  const thisMonth = earnings[earnings.length - 1].amount;

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", padding: "32px 5%" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", borderRadius: 20, padding: "26px 28px", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>Owner Dashboard</p>
              <h1 style={{ margin: "0 0 4px", color: "#fff", fontSize: 24, fontWeight: 800 }}>🚜 My Equipment Hub</h1>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: 13 }}>Manage listings, track earnings & respond to bookings</p>
            </div>
            {pending.length > 0 && (
              <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 18px", textAlign: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ color: "#FFD700", fontWeight: 800, fontSize: 28 }}>{pending.length}</div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>Requests pending</div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { label: "This Month", value: `₹${thisMonth.toLocaleString("en-IN")}`, icon: "💰", color: "#FFF3E0", text: "#E65100", sub: "+12% vs last month" },
            { label: "Active Listings", value: "3", icon: "📋", color: "#E8F4FD", text: "#1565C0", sub: "All verified" },
            { label: "Pending Requests", value: pending.length, icon: "🔔", color: "#FFF8E1", text: "#F57F17", sub: "Action needed" },
            { label: "Avg. Rating", value: "4.8 ⭐", icon: "🌟", color: "#D8F3DC", text: "#1B5E20", sub: "Top 5% owners" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 16, padding: "18px 16px" }}>
              <div style={{ width: 44, height: 44, background: stat.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>
                {stat.icon}
              </div>
              <div style={{ fontWeight: 800, fontSize: 20, color: stat.text }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: "#4CAF50", marginTop: 4, fontWeight: 600 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Earnings chart */}
        <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${theme.border}`, padding: "24px", marginBottom: 24 }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 700, color: theme.text }}>Monthly Earnings</h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 140 }}>
            {earnings.map((entry) => (
              <div key={entry.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: theme.primary }}>
                  ₹{(entry.amount / 1000).toFixed(1)}k
                </span>
                <div
                  style={{
                    width: "100%",
                    background: `linear-gradient(to top, ${theme.primary}, ${theme.primaryLight})`,
                    borderRadius: "6px 6px 0 0",
                    height: `${Math.round((entry.amount / maxEarning) * 110)}px`,
                    transition: "height 0.5s ease",
                  }}
                />
                <span style={{ fontSize: 13, color: theme.textMuted }}>{entry.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking requests */}
        <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: theme.text }}>🔔 Booking Requests</h2>
            <span style={{ fontSize: 13, color: theme.textMuted, background: theme.bg, padding: "4px 12px", borderRadius: 20 }}>
              {pending.length} pending
            </span>
          </div>

          {requests.length === 0 ? (
            <div style={{ padding: "40px 24px", textAlign: "center" }}>
              <p style={{ color: theme.textMuted }}>No booking requests yet.</p>
            </div>
          ) : (
            requests.map((req, i) => (
              <div
                key={req.id}
                style={{
                  padding: "18px 24px",
                  borderBottom: i < requests.length - 1 ? `1px solid ${theme.border}` : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                  background: req.status !== "pending" ? theme.bg : "#fff",
                  opacity: req.status !== "pending" ? 0.65 : 1,
                  transition: "all 0.3s",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: theme.text }}>{req.farmer}</div>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 2 }}>
                    {req.equipment} · {req.date} · {req.hours} hrs
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontWeight: 800, fontSize: 16, color: theme.primary }}>
                    ₹{req.amount.toLocaleString("en-IN")}
                  </span>
                  {req.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(req.id, "accepted")}
                        style={{ padding: "8px 18px", background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                      >
                        ✓ Accept
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "declined")}
                        style={{ padding: "8px 14px", background: "#fff", color: theme.danger, border: `1.5px solid ${theme.danger}`, borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                      >
                        ✗ Decline
                      </button>
                    </>
                  ) : (
                    <span style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                      background: req.status === "accepted" ? "#D8F3DC" : "#FFEBEE",
                      color: req.status === "accepted" ? "#1B5E20" : "#B71C1C",
                    }}>
                      {req.status === "accepted" ? "✓ Accepted" : "✗ Declined"}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
