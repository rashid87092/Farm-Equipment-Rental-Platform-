import { theme } from "../../styles/theme";

export function Badge({ status }) {
  const map = {
    confirmed: { bg: "#D8F3DC", color: "#2D6A4F", label: "Confirmed" },
    completed: { bg: "#E3F2FD", color: "#1565C0", label: "Completed" },
    cancelled: { bg: "#FFEBEE", color: "#C62828", label: "Cancelled" },
    available: { bg: "#D8F3DC", color: "#2D6A4F", label: "Available" },
    booked: { bg: "#FFF3E0", color: "#E65100", label: "Booked" },
  };

  const state = map[status] || map.completed;

  return (
    <span
      style={{
        background: state.bg,
        color: state.color,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.3,
      }}
    >
      {state.label}
    </span>
  );
}

export default Badge;
