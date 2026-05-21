"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const wrap = { maxWidth: "1100px", margin: "0 auto", padding: "0 48px" };

const menuData = {
  Starters: [
    { id: "s1", name: "Bruschetta al Pomodoro", desc: "Grilled bread, fresh tomatoes, garlic, basil & olive oil", price: 280, emoji: "🍞" },
    { id: "s2", name: "Burrata Fresca", desc: "Creamy burrata, heirloom tomatoes, aged balsamic", price: 420, emoji: "🧀" },
    { id: "s3", name: "Calamari Fritti", desc: "Crispy fried squid rings, marinara dipping sauce", price: 380, emoji: "🦑" },
    { id: "s4", name: "Zuppa del Giorno", desc: "Chef's soup of the day with toasted focaccia", price: 220, emoji: "🍲" },
  ],
  Pasta: [
    { id: "p1", name: "Cacio e Pepe", desc: "Roman classic, aged pecorino & cracked black pepper", price: 480, emoji: "🍝" },
    { id: "p2", name: "Tagliatelle al Ragù", desc: "Hand-rolled tagliatelle, slow-cooked Bolognese", price: 520, emoji: "🍝" },
    { id: "p3", name: "Penne all'Arrabbiata", desc: "Spicy San Marzano tomato, garlic, chilli", price: 420, emoji: "🍝" },
    { id: "p4", name: "Pasta al Tartufo", desc: "Fresh pasta, black truffle shavings, parmesan", price: 780, emoji: "🍝" },
  ],
  Pizza: [
    { id: "pz1", name: "Margherita DOC", desc: "Buffalo mozzarella, San Marzano tomatoes, fresh basil", price: 550, emoji: "🍕" },
    { id: "pz2", name: "Diavola", desc: "Spicy salami, fior di latte, chilli oil", price: 620, emoji: "🍕" },
    { id: "pz3", name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, fontina, parmesan", price: 680, emoji: "🍕" },
    { id: "pz4", name: "Tartufo Bianco", desc: "White truffle oil, mushrooms, mozzarella, rocket", price: 820, emoji: "🍕" },
  ],
  Mains: [
    { id: "m1", name: "Osso Buco", desc: "Braised veal shank, gremolata, saffron risotto", price: 890, emoji: "🥩" },
    { id: "m2", name: "Branzino al Forno", desc: "Oven-roasted sea bass, capers, lemon, herbs", price: 950, emoji: "🐟" },
    { id: "m3", name: "Pollo alla Romana", desc: "Free-range chicken, peppers, olives, white wine", price: 680, emoji: "🍗" },
    { id: "m4", name: "Melanzane Parmigiana", desc: "Layered aubergine, tomato, basil, parmesan (V)", price: 520, emoji: "🍆" },
  ],
  Desserts: [
    { id: "d1", name: "Tiramisù", desc: "Mascarpone cream, espresso-soaked savoiardi, cocoa", price: 320, emoji: "☕" },
    { id: "d2", name: "Panna Cotta", desc: "Vanilla cream, seasonal berry compote", price: 280, emoji: "🍮" },
    { id: "d3", name: "Cannoli Siciliani", desc: "Crispy shells, ricotta cream, pistachios", price: 300, emoji: "🥐" },
    { id: "d4", name: "Gelato Artigianale", desc: "3 scoops of house-made gelato, your choice", price: 260, emoji: "🍨" },
  ],
};

const categories = Object.keys(menuData);

export default function MenuPage() {
  const [active, setActive] = useState("Starters");
  const { addToCart } = useCart();

  const handleAdd = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      style: { background: "#2C1810", color: "#F5ECD7" },
    });
  };

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section style={{ background: "#2C1810", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <p style={{ color: "#D4956A", letterSpacing: "4px", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>
            Authentic Italian
          </p>
          <div style={{ background: "#D4956A", height: "1px", width: "60px", margin: "0 auto 20px" }} />
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#F5ECD7", fontSize: "52px" }}>
            Our Menu
          </h1>
          <p style={{ color: "#C4B49A", marginTop: "12px", fontSize: "15px", fontWeight: 300 }}>
            Crafted fresh daily with the finest Italian ingredients
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ background: "#F5ECD7", borderBottom: "1px solid #EDE0D0", position: "sticky", top: "64px", zIndex: 40 }}>
        <div style={{ ...wrap, display: "flex", overflowX: "auto" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "18px 28px",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: active === cat ? 700 : 400,
                color: active === cat ? "#D4956A" : "#8B7355",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: active === cat ? "2px solid #D4956A" : "2px solid transparent",
                background: "transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Items */}
      <section style={{ background: "#FDFAF5", padding: "60px 0" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {menuData[active].map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  border: "1px solid #EDE0D0",
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ fontSize: "48px", flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "20px", marginBottom: "6px" }}>
                    {item.name}
                  </h3>
                  <p style={{ color: "#8B7355", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                    {item.desc}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "#D4956A", fontWeight: 700, fontSize: "20px" }}>₹{item.price}</span>
                    <button
                      onClick={() => handleAdd(item)}
                      style={{
                        background: "#2C1810",
                        color: "#D4956A",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        cursor: "pointer",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}