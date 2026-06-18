import { theme } from "../../styles/theme";

const footerColumns = [
  {
    title: "For Farmers",
    links: ["Find Equipment", "How It Works", "Pricing", "Support"],
  },
  {
    title: "For Owners",
    links: ["List Equipment", "Owner Dashboard", "Revenue Calculator", "Insurance"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: theme.primaryDark, color: "rgba(255,255,255,0.75)", padding: "50px 5% 30px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>🚜</span>
              <span style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}>FarmRent</span>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 13, lineHeight: 1.8 }}>India's most trusted farm equipment rental platform. Made with ❤️ for Indian farmers.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["📱 App Store", "🤖 Google Play"].map((label) => (
                <span key={label} style={{ background: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: 8, fontSize: 12 }}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 style={{ margin: "0 0 14px", color: "#fff", fontSize: 14, fontWeight: 700 }}>{column.title}</h4>
              {column.links.map((link) => (
                <p key={link} style={{ margin: "0 0 8px", fontSize: 13, opacity: 0.75 }}>
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12, opacity: 0.6 }}>
          <span>© 2026 FarmRent Technologies Pvt. Ltd. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service · Grievance Officer</span>
        </div>
      </div>
    </footer>
  );
}
