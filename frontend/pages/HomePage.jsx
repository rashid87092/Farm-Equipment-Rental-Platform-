import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import { EQUIPMENT, STATS, TESTIMONIALS } from "../data/constants";
import { EquipmentCard } from "../components/equipment/EquipmentCard";
import { StarRating } from "../components/ui/StarRating";

export default function HomePage({ setPage }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 60%, ${theme.primaryLight} 100%)`, minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 5% 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -40, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

        <div style={{ maxWidth: 700, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🌾</span>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 500 }}>India's #1 Farm Equipment Rental Platform</span>
          </div>
          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: -1 }}>
            Khet pe aao,
            <br />
            <span style={{ color: theme.gold }}>Equipment le jao.</span>
          </h1>
          <p style={{ margin: "0 0 36px", fontSize: 18, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, maxWidth: 520 }}>
            Book tractors, harvesters & implements from verified owners near you. Pay per hour or per acre. No hidden charges.
          </p>

          <div style={{ display: "flex", gap: 0, background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", maxWidth: 560 }}>
            <div style={{ padding: "0 16px", display: "flex", alignItems: "center", color: theme.textMuted, fontSize: 18 }}>📍</div>
            <input placeholder="Enter village, tehsil or district..." style={{ flex: 1, border: "none", outline: "none", padding: "16px 0", fontSize: 15, color: theme.text }} />
            <button onClick={() => setPage("search")} style={{ padding: "14px 28px", background: theme.accent, border: "none", color: "#fff", fontWeight: 700, fontSize: 15 }}>
              Search 🔍
            </button>
          </div>

          {/* ✅ Login / Register Buttons Added */}
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("login")}
              style={{ padding: "12px 28px", background: "#fff", color: theme.primaryDark, border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}
            >
              🔐 Login
            </button>
            <button
              onClick={() => setPage("register")}
              style={{ padding: "12px 28px", background: theme.gold, color: theme.primaryDark, border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}
            >
              Register Free 🌾
            </button>
          </div>

          <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
            {["🚜 Tractors", "🌾 Harvesters", "⚙️ Rotavators", "📐 Levellers"].map((tag) => (
              <button key={tag} onClick={() => setPage("search")} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 50, padding: "7px 18px", fontSize: 13, fontWeight: 500 }}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12, opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.5s" }}>
          {[
            { v: "₹850", l: "From / hour", icon: "💰" },
            { v: "4.8★", l: "Avg. Rating", icon: "⭐" },
            { v: "< 5 km", l: "Avg. Distance", icon: "📍" },
          ].map((card) => (
            <div key={card.l} style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", borderRadius: 14, padding: "14px 18px", minWidth: 140, border: "1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{card.icon}</div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>{card.v}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>{card.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: theme.primaryDark, padding: "24px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ color: theme.gold, fontWeight: 800, fontSize: 24 }}>{stat.value}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "70px 5%", background: theme.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ background: "#D8F3DC", color: theme.primary, padding: "5px 14px", borderRadius: 50, fontSize: 13, fontWeight: 600 }}>Simple Process</span>
            <h2 style={{ margin: "14px 0 8px", fontSize: 34, fontWeight: 800, color: theme.text }}>How FarmRent Works</h2>
            <p style={{ color: theme.textMuted, fontSize: 16 }}>Get equipment on your farm in 3 easy steps</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { step: "01", title: "Search Nearby", desc: "Enter your location to find available equipment within 20 km radius", icon: "🔍", color: "#E8F4FD" },
              { step: "02", title: "Book Instantly", desc: "Choose date, duration and book with a single click. Get WhatsApp confirmation.", icon: "📲", color: "#D8F3DC" },
              { step: "03", title: "Farm & Pay", desc: "Equipment arrives at your field. Pay after the work is done. Rate your experience.", icon: "✅", color: "#FFF3E0" },
            ].map((item) => (
              <div key={item.step} style={{ background: "#fff", borderRadius: 18, padding: "28px 24px", border: `1px solid ${theme.border}`, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, background: item.color, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 18px" }}>{item.icon}</div>
                <div style={{ color: theme.primaryLight, fontWeight: 800, fontSize: 12, letterSpacing: 2, marginBottom: 8 }}>STEP {item.step}</div>
                <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 700, color: theme.text }}>{item.title}</h3>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "60px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ margin: "0 0 6px", fontSize: 30, fontWeight: 800, color: theme.text }}>Featured Equipment</h2>
              <p style={{ margin: 0, color: theme.textMuted }}>Top-rated equipment near Delhi NCR</p>
            </div>
            <button onClick={() => setPage("search")} style={{ padding: "10px 20px", background: theme.primary, color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 14 }}>
              View All →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {EQUIPMENT.slice(0, 4).map((item) => (
              <EquipmentCard key={item.id} item={item} onBook={() => setPage("search")} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "70px 5%", background: theme.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 34, fontWeight: 800, color: theme.text }}>Trusted by Farmers Across India</h2>
            <p style={{ color: theme.textMuted, fontSize: 16 }}>Real stories from real farmers</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} style={{ background: "#fff", borderRadius: 18, padding: "28px 24px", border: `1px solid ${theme.border}` }}>
                <div style={{ fontSize: 40, color: theme.primaryLight, lineHeight: 1, marginBottom: 14, fontFamily: "Georgia, serif" }}>{">"}</div>
                <p style={{ margin: "0 0 20px", color: theme.text, fontSize: 15, lineHeight: 1.75, fontStyle: "italic" }}>{testimonial.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${theme.border}`, paddingTop: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: theme.text }}>{testimonial.name}</div>
                    <div style={{ fontSize: 12, color: theme.textMuted }}>{testimonial.crop} · {testimonial.location}</div>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${theme.primaryDark}, ${theme.primary})`, padding: "70px 5%", textAlign: "center" }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 36, fontWeight: 900, color: "#fff" }}>Own farm equipment? Start earning today!</h2>
        <p style={{ margin: "0 0 32px", color: "rgba(255,255,255,0.78)", fontSize: 17 }}>List your equipment for free and earn up to ₹80,000 extra every season</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("list")} style={{ padding: "15px 36px", background: theme.gold, color: theme.primaryDark, border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16 }}>
            List Your Equipment Free →
          </button>
          <button onClick={() => setPage("search")} style={{ padding: "15px 36px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
            Browse Equipment
          </button>
        </div>
      </div>
    </div>
  );
}