import { useState } from "react";
import { theme } from "../styles/theme";

export default function ListEquipmentPage() {
  const [form, setForm] = useState({ name: "", category: "Tractor", price: "", unit: "hour", location: "", phone: "", power: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const validate = () => {
    const nextErrors = {};
    if (!form.name) nextErrors.name = "Required";
    if (!form.price || Number.isNaN(Number(form.price))) nextErrors.price = "Enter valid price";
    if (!form.location) nextErrors.location = "Required";
    if (!form.phone || form.phone.length < 10) nextErrors.phone = "Valid phone required";
    return nextErrors;
  };

  const submit = () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
        <h2 style={{ color: theme.primary, fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>Equipment Listed Successfully!</h2>
        <p style={{ color: theme.textMuted, fontSize: 16, maxWidth: 400 }}>Your <strong>{form.name}</strong> is now live on FarmRent. You'll start receiving booking requests soon.</p>
        <div style={{ background: theme.cream, borderRadius: 14, padding: "18px 24px", marginTop: 24, fontSize: 14 }}>
          <p style={{ margin: "0 0 8px", fontWeight: 700 }}>📊 Earning Potential</p>
          <p style={{ margin: 0, color: theme.textMuted }}>At ₹{form.price}/{form.unit}, you could earn <strong style={{ color: theme.primary }}>₹{(Number(form.price) * 200).toLocaleString()}</strong> this season!</p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", category: "Tractor", price: "", unit: "hour", location: "", phone: "", power: "", desc: "" });
          }}
          style={{ marginTop: 24, padding: "12px 32px", background: theme.primary, color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15 }}
        >
          List Another Equipment
        </button>
      </div>
    );
  }

  const Field = ({ label, keyName, type = "text", placeholder, options }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: theme.text, marginBottom: 6 }}>{label}</label>
      {options ? (
        <select value={form[keyName]} onChange={(event) => update(keyName, event.target.value)} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${errors[keyName] ? theme.danger : theme.border}`, borderRadius: 10, fontSize: 14, boxSizing: "border-box" }}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input type={type} value={form[keyName]} onChange={(event) => update(keyName, event.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${errors[keyName] ? theme.danger : theme.border}`, borderRadius: 10, fontSize: 14, boxSizing: "border-box", outline: "none" }} />
      )}
      {errors[keyName] && <p style={{ margin: "4px 0 0", color: theme.danger, fontSize: 12 }}>{errors[keyName]}</p>} 
    </div>
  );

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", padding: "36px 5%" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ margin: "0 0 8px", fontSize: 30, fontWeight: 800, color: theme.text }}>List Your Equipment</h1>
          <p style={{ color: theme.textMuted, fontSize: 15 }}>Start earning from your idle equipment today — listing is free!</p>
        </div>

        <div style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`, borderRadius: 16, padding: "20px 24px", marginBottom: 28, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ margin: "0 0 4px", opacity: 0.8, fontSize: 13 }}>💡 Average owner earns</p>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>₹65,000/season</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0 0 4px", opacity: 0.8, fontSize: 13 }}>🌟 Verification included</p>
            <p style={{ margin: 0, fontWeight: 700 }}>Free listing & insurance support</p>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, border: `1px solid ${theme.border}`, padding: "32px 28px" }}>
          <h3 style={{ margin: "0 0 20px", color: theme.primaryDark, fontSize: 16 }}>Equipment Details</h3>
          <Field label="Equipment Name *" keyName="name" placeholder="e.g. John Deere 5075E Tractor" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Category *" keyName="category" options={["Tractor", "Harvester", "Implement", "Pump Set", "Other"]} />
            <Field label="Engine Power" keyName="power" placeholder="e.g. 75 HP" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Your Price (₹) *" keyName="price" type="number" placeholder="e.g. 800" />
            <Field label="Per" keyName="unit" options={["hour", "acre", "day"]} />
          </div>
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 20, marginTop: 4, marginBottom: 20 }}>
            <h3 style={{ margin: "0 0 20px", color: theme.primaryDark, fontSize: 16 }}>Contact & Location</h3>
          </div>
          <Field label="Village / Town / District *" keyName="location" placeholder="e.g. Panipat, Haryana" />
          <Field label="WhatsApp Number *" keyName="phone" type="tel" placeholder="e.g. 9876543210" />
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: theme.text, marginBottom: 6 }}>Description (optional)</label>
            <textarea value={form.desc} onChange={(event) => update("desc", event.target.value)} placeholder="Any extra details about your equipment..." rows={3} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, boxSizing: "border-box", resize: "vertical" }} />
          </div>
          <button onClick={submit} style={{ width: "100%", padding: "15px", background: theme.primary, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800 }}>
            🚜 List My Equipment — FREE
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: theme.textMuted, marginTop: 12 }}>By listing, you agree to our Terms of Service. Your phone number is only shared with confirmed bookers.</p>
        </div>
      </div>
    </div>
  );
}
