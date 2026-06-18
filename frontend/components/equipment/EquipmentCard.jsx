import { useState } from "react";
import { theme } from "../../styles/theme";
import { Badge } from "../ui/Badge";
import { StarRating } from "../ui/StarRating";

export function EquipmentCard({ item, onBook }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: theme.cardBg,
        border: `1.5px solid ${hovered ? theme.primaryLight : theme.border}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 32px rgba(45,106,79,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "pointer",
      }}
    >
      <div style={{ background: `linear-gradient(135deg, ${theme.primaryDark}, ${theme.primary})`, padding: "28px 20px", textAlign: "center", position: "relative" }}>
        <div style={{ fontSize: 52 }}>{item.img}</div>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <Badge status={item.available ? "available" : "booked"} />
        </div>
        <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.15)", color: "#fff", padding: "3px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600 }}>
          {item.category}
        </div>
      </div>

      <div style={{ padding: "16px 18px" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: theme.text, lineHeight: 1.3 }}>{item.name}</h3>
        <p style={{ margin: "0 0 8px", fontSize: 13, color: theme.textMuted }}>📍 {item.location} · {item.distance}</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {item.features.map((feature) => (
            <span key={feature} style={{ background: theme.cream, color: theme.primaryDark, padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 500 }}>
              {feature}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: theme.primary }}>₹{item.price.toLocaleString()}</span>
            <span style={{ fontSize: 13, color: theme.textMuted }}>/{item.unit}</span>
          </div>
          <StarRating rating={item.rating} />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onBook(item)}
            disabled={!item.available}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 10,
              border: "none",
              background: item.available ? theme.primary : "#ccc",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: item.available ? "pointer" : "not-allowed",
              transition: "background 0.2s",
            }}
          >
            {item.available ? "Book Now" : "Unavailable"}
          </button>
          <button style={{ padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${theme.border}`, background: "transparent", color: theme.text, fontSize: 14, cursor: "pointer" }}>
            📞
          </button>
        </div>

        <p style={{ margin: "10px 0 0", fontSize: 12, color: theme.textMuted, textAlign: "center" }}>
          👤 {item.owner} · {item.reviews} reviews · {item.power}
        </p>
      </div>
    </div>
  );
}

export default EquipmentCard;
