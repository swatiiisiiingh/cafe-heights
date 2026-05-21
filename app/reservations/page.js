"use client";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const wrap = { maxWidth: "1100px", margin: "0 auto", padding: "0 48px" };

export default function ReservationsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    requests: "",
  });

  const timeSlots = [
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
  ];

  const occasions = ["None", "Birthday", "Anniversary", "Date Night", "Business Dinner", "Family Gathering"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "reservations"), {
        ...form,
        userId: session?.user?.email || "guest",
        userName: session?.user?.name || form.name,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      });
      setSubmitted(true);
      toast.success("Reservation confirmed!", {
        style: { background: "#2C1810", color: "#F5ECD7" },
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #EDE0D0",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#2C1810",
    background: "#fff",
    outline: "none",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: "#8B7355",
    marginBottom: "8px",
  };

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section style={{ background: "#2C1810", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <p style={{ color: "#D4956A", letterSpacing: "4px", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>
            Join us for dinner
          </p>
          <div style={{ background: "#D4956A", height: "1px", width: "60px", margin: "0 auto 20px" }} />
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#F5ECD7", fontSize: "52px" }}>
            Reserve a Table
          </h1>
          <p style={{ color: "#C4B49A", marginTop: "12px", fontSize: "15px", fontWeight: 300 }}>
            Book your table in advance and we'll have everything ready for you
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ background: "#FDFAF5", padding: "60px 0" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "48px", alignItems: "start" }}>

            {/* Left Info */}
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "28px", marginBottom: "24px" }}>
                Restaurant Info
              </h2>
              {[
                { icon: "🕐", title: "Opening Hours", lines: ["Mon–Fri: 12pm – 3pm, 7pm – 11pm", "Sat–Sun: 12pm – 11pm"] },
                { icon: "📍", title: "Location", lines: ["123 Via Roma, Connaught Place", "New Delhi, India"] },
                { icon: "📞", title: "Phone", lines: ["+91 98765 43210"] },
                { icon: "📧", title: "Email", lines: ["reservations@cafeheights.in"] },
              ].map((info) => (
                <div key={info.title} style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ fontSize: "24px", flexShrink: 0, marginTop: "2px" }}>{info.icon}</div>
                  <div>
                    <h4 style={{ color: "#2C1810", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>{info.title}</h4>
                    {info.lines.map((l) => (
                      <p key={l} style={{ color: "#8B7355", fontSize: "13px", lineHeight: 1.6 }}>{l}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ background: "#F5ECD7", border: "1px solid #EDE0D0", borderRadius: "10px", padding: "20px", marginTop: "8px" }}>
                <p style={{ color: "#2C1810", fontSize: "13px", lineHeight: 1.7 }}>
                  🍷 For parties of <strong>8 or more</strong>, please call us directly for group reservations.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div style={{ background: "#fff", border: "1px solid #EDE0D0", borderRadius: "16px", padding: "40px" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉</div>
                  <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "28px", marginBottom: "12px" }}>
                    Reservation Confirmed!
                  </h3>
                  <p style={{ color: "#8B7355", fontSize: "14px", lineHeight: 1.7, marginBottom: "8px" }}>
                    Thank you, <strong>{form.name}</strong>!
                  </p>
                  <p style={{ color: "#8B7355", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
                    Your table for <strong>{form.guests} guests</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong> is confirmed.
                    We'll see you soon! 🍝
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2", occasion: "", requests: "" }); }}
                    style={{ background: "#2C1810", color: "#D4956A", border: "none", padding: "12px 28px", borderRadius: "6px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", cursor: "pointer" }}
                  >
                    Make Another Reservation
                  </button>
                </div>
              ) : !session ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔐</div>
                  <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "24px", marginBottom: "12px" }}>
                    Sign in to Reserve
                  </h3>
                  <p style={{ color: "#8B7355", fontSize: "14px", marginBottom: "28px", lineHeight: 1.7 }}>
                    Please sign in with your Google account to make a reservation and track your bookings.
                  </p>
                  <button
                    onClick={() => signIn("google")}
                    style={{ background: "#D4956A", color: "#2C1810", border: "none", padding: "14px 32px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", cursor: "pointer" }}
                  >
                    Sign in with Google
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "24px", marginBottom: "28px" }}>
                    Your Details
                  </h3>

                  {/* Name + Email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle} required />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} required />
                    </div>
                  </div>

                  {/* Phone + Guests */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Guests *</label>
                      <select name="guests" value={form.guests} onChange={handleChange} style={inputStyle}>
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Date + Time */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div>
                      <label style={labelStyle}>Date *</label>
                      <input name="date" type="date" value={form.date} onChange={handleChange} style={inputStyle} min={new Date().toISOString().split("T")[0]} required />
                    </div>
                    <div>
                      <label style={labelStyle}>Time *</label>
                      <select name="time" value={form.time} onChange={handleChange} style={inputStyle} required>
                        <option value="">Select time</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Occasion */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Occasion</label>
                    <select name="occasion" value={form.occasion} onChange={handleChange} style={inputStyle}>
                      {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div style={{ marginBottom: "28px" }}>
                    <label style={labelStyle}>Special Requests</label>
                    <textarea
                      name="requests"
                      value={form.requests}
                      onChange={handleChange}
                      placeholder="Allergies, dietary requirements, high chair needed..."
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", background: "#2C1810", color: "#D4956A", border: "none", padding: "16px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? "Confirming..." : "Confirm Reservation"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}