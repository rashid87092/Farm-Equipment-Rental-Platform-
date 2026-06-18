import { theme } from "../../styles/theme";

export function StarRating({ rating }) {
  return (
    <span style={{ color: theme.gold, fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: theme.textMuted, marginLeft: 4, fontSize: 12 }}>{rating}</span>
    </span>
  );
}

export default StarRating;
