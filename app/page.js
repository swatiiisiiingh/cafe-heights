import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const wrap = { maxWidth:"1100px", margin:"0 auto", padding:"0 48px" };

export default function Home() {
  const features = [
    { icon:"🍝", title:"Fresh Pasta", desc:"Hand-rolled daily using 00 flour and farm eggs" },
    { icon:"🔥", title:"Wood-Fired", desc:"Authentic 900°F wood-burning oven, imported from Naples" },
    { icon:"🍷", title:"Italian Wines", desc:"Curated selection from Tuscany, Sicily & Piedmont" },
    { icon:"🌿", title:"Farm to Table", desc:"Seasonal ingredients sourced from local organic farms" },
  ];

  const dishes = [
    { name:"Cacio e Pepe", desc:"Roman classic with aged pecorino & cracked black pepper", price:"₹480", tag:"Chef's Pick", emoji:"🍝" },
    { name:"Margherita DOC", desc:"Buffalo mozzarella, San Marzano tomatoes, fresh basil", price:"₹550", tag:"Most Loved", emoji:"🍕" },
    { name:"Osso Buco", desc:"Braised veal shank, gremolata, saffron risotto", price:"₹890", tag:"Signature", emoji:"🥩" },
    { name:"Tiramisù", desc:"Mascarpone cream, espresso-soaked savoiardi, cocoa", price:"₹320", tag:"Dessert", emoji:"☕" },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{ background:"#2C1810", minHeight:"90vh", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", overflow:"hidden" }}>
        <div style={wrap}>
          <p style={{ color:"#D4956A", letterSpacing:"4px", fontSize:"11px", textTransform:"uppercase", marginBottom:"16px" }}>Since 1987 · Roma, Italia</p>
          <div style={{ background:"#D4956A", height:"1px", width:"60px", margin:"0 auto 32px" }} />
          <h1 style={{ fontFamily:"var(--font-playfair)", color:"#F5ECD7", lineHeight:1.2, fontSize:"clamp(36px,6vw,72px)", marginBottom:"24px" }}>
            Authentic Italian<br />
            <em style={{ color:"#D4956A" }}>crafted with amore</em>
          </h1>
          <p style={{ color:"#C4B49A", fontSize:"17px", fontWeight:300, maxWidth:"520px", margin:"0 auto 40px", lineHeight:1.8 }}>
            Fresh pasta, wood-fired pizza & timeless recipes passed down through generations. Come as a guest, leave as famiglia.
          </p>
          <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/menu" style={{ background:"#D4956A", color:"#2C1810", padding:"12px 32px", fontSize:"12px", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px", borderRadius:"4px", textDecoration:"none" }}>
              View Menu
            </Link>
            <Link href="/reservations" style={{ border:"1px solid #D4956A", color:"#D4956A", padding:"12px 32px", fontSize:"12px", textTransform:"uppercase", letterSpacing:"2px", borderRadius:"4px", textDecoration:"none" }}>
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background:"#F5ECD7", padding:"80px 0" }}>
        <div style={wrap}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <p style={{ color:"#D4956A", letterSpacing:"3px", fontSize:"11px", textTransform:"uppercase", marginBottom:"8px" }}>Why choose us</p>
            <h2 style={{ fontFamily:"var(--font-playfair)", color:"#2C1810", fontSize:"36px" }}>The Cafe Heights difference</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"32px" }}>
            {features.map((f) => (
              <div key={f.title} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"36px", marginBottom:"16px" }}>{f.icon}</div>
                <h3 style={{ fontFamily:"var(--font-playfair)", color:"#2C1810", fontSize:"20px", marginBottom:"8px" }}>{f.title}</h3>
                <p style={{ color:"#8B7355", fontSize:"14px", lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular dishes */}
      <section style={{ background:"#FDFAF5", padding:"80px 0" }}>
        <div style={wrap}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <p style={{ color:"#D4956A", letterSpacing:"3px", fontSize:"11px", textTransform:"uppercase", marginBottom:"8px" }}>From our kitchen</p>
            <h2 style={{ fontFamily:"var(--font-playfair)", color:"#2C1810", fontSize:"36px" }}>Popular dishes</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"24px" }}>
            {dishes.map((d) => (
              <div key={d.name} style={{ background:"#fff", border:"1px solid #EDE0D0", borderRadius:"12px", overflow:"hidden" }}>
                <div style={{ background:"#F5ECD7", height:"120px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"48px" }}>
                  {d.emoji}
                </div>
                <div style={{ padding:"16px" }}>
                  <span style={{ background:"#2C1810", color:"#D4956A", fontSize:"10px", padding:"3px 8px", borderRadius:"3px", textTransform:"uppercase", letterSpacing:"1px" }}>
                    {d.tag}
                  </span>
                  <h3 style={{ fontFamily:"var(--font-playfair)", color:"#2C1810", fontSize:"18px", margin:"10px 0 6px" }}>{d.name}</h3>
                  <p style={{ color:"#8B7355", fontSize:"12px", lineHeight:1.5, marginBottom:"12px" }}>{d.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ color:"#D4956A", fontWeight:700, fontSize:"18px" }}>{d.price}</span>
                    <Link href="/menu" style={{ background:"#2C1810", color:"#D4956A", fontSize:"11px", padding:"6px 12px", borderRadius:"4px", textTransform:"uppercase", letterSpacing:"1px", textDecoration:"none" }}>
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:"40px" }}>
            <Link href="/menu" style={{ border:"1px solid #2C1810", color:"#2C1810", padding:"12px 32px", fontSize:"12px", textTransform:"uppercase", letterSpacing:"2px", borderRadius:"4px", textDecoration:"none", display:"inline-block" }}>
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section style={{ background:"#2C1810", padding:"80px 0", textAlign:"center" }}>
        <div style={wrap}>
          <p style={{ color:"#D4956A", letterSpacing:"3px", fontSize:"11px", textTransform:"uppercase", marginBottom:"16px" }}>Join us tonight</p>
          <h2 style={{ fontFamily:"var(--font-playfair)", color:"#F5ECD7", fontSize:"40px", marginBottom:"16px" }}>Reserve your table</h2>
          <p style={{ color:"#C4B49A", fontSize:"14px", maxWidth:"420px", margin:"0 auto 32px", lineHeight:1.8 }}>
            Whether it's a romantic dinner or a family celebration — we have the perfect table waiting for you.
          </p>
          <Link href="/reservations" style={{ background:"#D4956A", color:"#2C1810", padding:"14px 40px", fontSize:"12px", fontWeight:700, textTransform:"uppercase", letterSpacing:"2px", borderRadius:"4px", textDecoration:"none", display:"inline-block" }}>
            Book a Table
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}