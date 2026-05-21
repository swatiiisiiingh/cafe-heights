import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const wrap = { maxWidth: "1100px", margin: "0 auto", padding: "0 48px" };

const events = [
  { emoji: "🎻", title: "Live Jazz Night", date: "Every Friday", time: "8:00 PM – 11:00 PM", desc: "Enjoy authentic Italian cuisine paired with soulful live jazz performed by our resident quartet.", tag: "Weekly" },
  { emoji: "🍷", title: "Wine Tasting Evening", date: "Last Saturday of Month", time: "7:00 PM – 10:00 PM", desc: "A curated journey through Italy's finest wine regions — Tuscany, Piedmont, and Sicily — guided by our sommelier.", tag: "Monthly" },
  { emoji: "👨‍🍳", title: "Chef's Table Experience", date: "Every Sunday", time: "7:30 PM", desc: "An exclusive 7-course tasting menu crafted personally by our Executive Chef. Limited to 8 guests.", tag: "Weekly" },
  { emoji: "🍝", title: "Pasta Making Masterclass", date: "2nd Saturday of Month", time: "11:00 AM – 2:00 PM", desc: "Learn the art of hand-rolling fresh pasta from our Italian head chef. Includes lunch and wine.", tag: "Monthly" },
  { emoji: "🎂", title: "Private Dining & Events", date: "By Appointment", time: "Flexible", desc: "Host your birthday, anniversary, or corporate event in our exclusive private dining room for up to 30 guests.", tag: "Special" },
  { emoji: "🌿", title: "Seasonal Menu Launch", date: "Quarterly", time: "7:00 PM", desc: "Be the first to taste our new seasonal menu as our Chef unveils fresh creations inspired by Italian traditions.", tag: "Quarterly" },
];

export default function EventsPage() {
  return (
    <main>
      <Navbar />
      <section style={{ background: "#2C1810", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <p style={{ color: "#D4956A", letterSpacing: "4px", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>What's on</p>
          <div style={{ background: "#D4956A", height: "1px", width: "60px", margin: "0 auto 20px" }} />
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#F5ECD7", fontSize: "52px" }}>Events & Experiences</h1>
          <p style={{ color: "#C4B49A", marginTop: "12px", fontSize: "15px", fontWeight: 300 }}>
            More than a meal — an experience to remember
          </p>
        </div>
      </section>

      <section style={{ background: "#FDFAF5", padding: "60px 0" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {events.map((e) => (
              <div key={e.title} style={{ background: "#fff", border: "1px solid #EDE0D0", borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ background: "#2C1810", padding: "32px", textAlign: "center" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>{e.emoji}</div>
                  <span style={{ background: "#D4956A", color: "#2C1810", fontSize: "10px", padding: "3px 10px", borderRadius: "20px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{e.tag}</span>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "22px", marginBottom: "8px" }}>{e.title}</h3>
                  <p style={{ color: "#D4956A", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{e.date}</p>
                  <p style={{ color: "#8B7355", fontSize: "12px", marginBottom: "16px" }}>{e.time}</p>
                  <p style={{ color: "#8B7355", fontSize: "13px", lineHeight: 1.7, marginBottom: "20px" }}>{e.desc}</p>
                  <Link href="/reservations" style={{ display: "inline-block", background: "#2C1810", color: "#D4956A", padding: "10px 20px", borderRadius: "6px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", textDecoration: "none" }}>
                    Reserve a Spot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F5ECD7", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "36px", marginBottom: "16px" }}>Planning a Private Event?</h2>
          <p style={{ color: "#8B7355", fontSize: "15px", maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.7 }}>
            Our private dining room is available for birthdays, anniversaries, and corporate dinners. Contact us to discuss your requirements.
          </p>
          <Link href="/contact" style={{ background: "#2C1810", color: "#D4956A", padding: "14px 36px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none", display: "inline-block" }}>
            Get in Touch
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}