import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import { CATEGORIES, EQUIPMENT } from "../data/constants";
import { Spinner } from "../components/ui/Spinner";
import { EquipmentCard } from "../components/equipment/EquipmentCard";
import { BookingModal } from "../components/booking/BookingModal";

export default function SearchPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [bookItem, setBookItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = EQUIPMENT
    .filter((item) => category === "All" || item.category === category)
    .filter((item) => !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "rating" ? b.rating - a.rating :
      sortBy === "price_asc" ? a.price - b.price :
      b.price - a.price
    );

  return (
    <div style={{ background: theme.bg, minHeight: "100vh" }}>

      {/* Sticky filter bar */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${theme.border}`, padding: "16px 5%", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            {/* Search input */}
            <div style={{ flex: 1, minWidth: 220, display: "flex", alignItems: "center", background: theme.bg, border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "0 14px", transition: "border-color 0.2s" }}>
              <span style={{ marginRight: 8, fontSize: 16 }}>🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or location..."
                style={{ flex: 1, border: "none", background: "transparent", outline: "none", padding: "11px 0", fontSize: 14, color: theme.text }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: theme.textMuted, fontSize: 16, padding: 0 }}>✕</button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: "11px 14px", border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, background: "#fff", cursor: "pointer", color: theme.text }}
            >
              <option value="rating">⭐ Top Rated</option>
              <option value="price_asc">💰 Price: Low to High</option>
              <option value="price_desc">💰 Price: High to Low</option>
            </select>
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 50,
                  border: `1.5px solid ${category === cat ? theme.primary : theme.border}`,
                  background: category === cat ? theme.primary : "#fff",
                  color: category === cat ? "#fff" : theme.text,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 13, color: theme.textMuted }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Results grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 5%" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
            <Spinner />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🌾</div>
            <h3 style={{ color: theme.text, margin: "0 0 8px" }}>No equipment found</h3>
            <p style={{ color: theme.textMuted, margin: "0 0 20px" }}>Try a different search term or category</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              style={{ padding: "10px 24px", background: theme.primary, color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 22 }}>
            {filtered.map((item) => (
              <EquipmentCard key={item.id} item={item} onBook={setBookItem} />
            ))}
          </div>
        )}
      </div>

      {/* Booking modal */}
      {bookItem && <BookingModal item={bookItem} onClose={() => setBookItem(null)} />}
    </div>
  );
}
