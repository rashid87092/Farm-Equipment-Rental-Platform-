import { theme } from "../../styles/theme";

export function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 60 }}>
      <div
        style={{
          width: 40,
          height: 40,
          border: `4px solid ${theme.border}`,
          borderTop: `4px solid ${theme.primary}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}

export default Spinner;
