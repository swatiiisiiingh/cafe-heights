import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const wrap = { maxWidth: "1100px", margin: "0 auto", padding: "0 48px" };

const team = [
  { emoji: "👨‍🍳", name: "Marco Rossi", role: "Executive Chef", desc: "Trained in Rome and Naples, Chef Marco brings 20 years of authentic Italian culinary tradition to every dish." },
  { emoji: "🍷", name: "Sofia Bianchi", role: "Head Sommelier", desc: "With a passion for Italian wines, Sofia curates our cellar with over 200 labels from across Italy's finest regions." },
  { emoji: "👩‍🍳", name: "Giulia Ferrari", role: "Pastry Chef", desc: "Giulia's desserts are inspired by her Sicilian grandmother's recipes — classic, soulful, and unforgettable." },
];

const milestones = [
  { year: "1987", text: "Cafe Heights founded in New Delhi by the Rossi family" },
  { year: "1995", text: "Awarded Best Italian Restaurant in Delhi for the first time" },
  { year: "2003", text: "Expanded with a private dining room and wine cellar" },
  { year: "2010", text: "Chef Marco joins and introduces the wood-fired oven" },
  { year: "2018", text: "Celebrated 30 years with a special anniversary menu" },
  { year: "2026", text: "Launched online ordering and reservations platform" },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section style={{ background: "#2C1810", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <p style={{ color: "#D4956A", letterSpacing: "4px", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>Our story</p>
          <div style={{ background: "#D4956A", height: "1px", width: "60px", margin: "0 auto 20px" }} />
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#F5ECD7", fontSize: "52px" }}>About Cafe Heights</h1>
          <p style={{ color: "#C4B49A", marginTop: "12px", fontSize: "15px", fontWeight: 300 }}>
            A love letter to Italy, served from the heart of New Delhi
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: "#FDFAF5", padding: "80px 0" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div>
              <p style={{ color: "#D4956A", letterSpacing: "3px", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>Since 1987</p>
              <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "36px", marginBottom: "24px", lineHeight: 1.3 }}>
                Born from a passion for la dolce vita
              </h2>
              <p style={{ color: "#8B7355", fontSize: "15px", lineHeight: 1.9, marginBottom: "20px" }}>
                Cafe Heights was founded in 1987 by Antonio Rossi, a Roman chef who fell in love with India but couldn't leave behind the flavours of his homeland. He opened a small trattoria in Connaught Place with a single dream — to bring the warmth of an Italian kitchen to the heart of New Delhi.
              </p>
              <p style={{ color: "#8B7355", fontSize: "15px", lineHeight: 1.9, marginBottom: "20px" }}>
                Three decades later, that same spirit lives on. Every dish we serve carries the soul of Italy — from our hand-rolled pasta made fresh each morning to our wood-fired pizzas baked in a Neapolitan oven imported from Naples.
              </p>
              <p style={{ color: "#8B7355", fontSize: "15px", lineHeight: 1.9 }}>
                We believe food is more than nourishment — it's memory, culture, and connection. Come as a guest, leave as famiglia.
              </p>
            </div>
            <div style={{ background: "#F5ECD7", borderRadius: "16px", padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: "80px", marginBottom: "24px" }}>🍝</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {[
                  { num: "37+", label: "Years of excellence" },
                  { num: "200+", label: "Wine labels" },
                  { num: "50+", label: "Menu items" },
                  { num: "10k+", label: "Happy guests yearly" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-playfair)", color: "#D4956A", fontSize: "32px", fontWeight: 700 }}>{s.num}</p>
                    <p style={{ color: "#8B7355", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "#F5ECD7", padding: "80px 0" }}>
        <div style={wrap}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ color: "#D4956A", letterSpacing: "3px", fontSize: "11px", textTransform: "uppercase", marginBottom: "8px" }}>Our journey</p>
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "36px" }}>Milestones</h2>
          </div>
          <div style={{ position: "relative" }}>
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: "flex", gap: "32px", marginBottom: "32px", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, textAlign: "right", minWidth: "60px" }}>
                  <span style={{ fontFamily: "var(--font-playfair)", color: "#D4956A", fontSize: "20px", fontWeight: 700 }}>{m.year}</span>
                </div>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#D4956A", flexShrink: 0, marginTop: "6px" }} />
                <p style={{ color: "#8B7355", fontSize: "15px", lineHeight: 1.6, paddingBottom: "32px", borderBottom: i < milestones.length - 1 ? "1px solid #EDE0D0" : "none", flex: 1 }}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "#FDFAF5", padding: "80px 0" }}>
        <div style={wrap}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ color: "#D4956A", letterSpacing: "3px", fontSize: "11px", textTransform: "uppercase", marginBottom: "8px" }}>The people behind the magic</p>
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "36px" }}>Meet Our Team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {team.map((t) => (
              <div key={t.name} style={{ background: "#fff", border: "1px solid #EDE0D0", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#F5ECD7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto 20px" }}>
                  {t.emoji}
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "22px", marginBottom: "4px" }}>{t.name}</h3>
                <p style={{ color: "#D4956A", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>{t.role}</p>
                <p style={{ color: "#8B7355", fontSize: "13px", lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#2C1810", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--font-playfair)", color: "#F5ECD7", fontSize: "36px", marginBottom: "16px" }}>Come experience it yourself</h2>
          <p style={{ color: "#C4B49A", fontSize: "14px", maxWidth: "420px", margin: "0 auto 32px", lineHeight: 1.8 }}>
            Every visit is a journey to Italy. We look forward to welcoming you.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href="/reservations" style={{ background: "#D4956A", color: "#2C1810", padding: "14px 32px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none" }}>
              Book a Table
            </Link>
            <Link href="/menu" style={{ border: "1px solid #D4956A", color: "#D4956A", padding: "14px 32px", borderRadius: "6px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none" }}>
              View Menu
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}