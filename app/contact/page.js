"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const wrap = { maxWidth: "1100px", margin: "0 auto", padding: "0 48px" };

const inputStyle = {
  width: "100%", padding: "12px 16px", border: "1px solid #EDE0D0",
  borderRadius: "6px", fontSize: "14px", color: "#2C1810",
  background: "#fff", outline: "none", fontFamily: "inherit",
};

const labelStyle = {
  display: "block", fontSize: "11px", textTransform: "uppercase",
  letterSpacing: "1.5px", color: "#8B7355", marginBottom: "8px",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We'll get back to you soon.", {
      style: { background: "#2C1810", color: "#F5ECD7" },
    });
  };

  return (
    <main>
      <Navbar />

      <section style={{ background: "#2C1810", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <p style={{ color: "#D4956A", letterSpacing: "4px", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>We'd love to hear from you</p>
          <div style={{ background: "#D4956A", height: "1px", width: "60px", margin: "0 auto 20px" }} />
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#F5ECD7", fontSize: "52px" }}>Contact Us</h1>
        </div>
      </section>

      <section style={{ background: "#FDFAF5", padding: "60px 0" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "48px", alignItems: "start" }}>

            {/* Info */}
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "28px", marginBottom: "32px" }}>Get in Touch</h2>
              {[
                { emoji: "📍", title: "Address", lines: ["123 Via Roma, Connaught Place", "New Delhi – 110001, India"] },
                { emoji: "🕐", title: "Hours", lines: ["Mon–Fri: 12pm–3pm, 7pm–11pm", "Sat–Sun: 12pm–11pm"] },
                { emoji: "📞", title: "Phone", lines: ["+91 98765 43210"] },
                { emoji: "📧", title: "Email", lines: ["hello@cafeheights.in", "reservations@cafeheights.in"] },
              ].map((info) => (
                <div key={info.title} style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ fontSize: "24px", flexShrink: 0 }}>{info.emoji}</div>
                  <div>
                    <h4 style={{ color: "#2C1810", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>{info.title}</h4>
                    {info.lines.map((l) => <p key={l} style={{ color: "#8B7355", fontSize: "13px", lineHeight: 1.7 }}>{l}</p>)}
                  </div>
                </div>
              ))}

              {/* Map embed */}
              <div style={{ marginTop: "8px", borderRadius: "12px", overflow: "hidden", border: "1px solid #EDE0D0" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9!2d77.2195!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzUzLjQiTiA3N8KwMTMnMTAuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="200" style={{ border: 0, display: "block" }}
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div style={{ background: "#fff", border: "1px solid #EDE0D0", borderRadius: "16px", padding: "40px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "64px", marginBottom: "20px" }}>✉️</div>
                  <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "28px", marginBottom: "12px" }}>Message Sent!</h3>
                  <p style={{ color: "#8B7355", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    style={{ background: "#2C1810", color: "#D4956A", border: "none", padding: "12px 28px", borderRadius: "6px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", cursor: "pointer" }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "24px", marginBottom: "28px" }}>Send a Message</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={inputStyle} required />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={inputStyle} required />
                    </div>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Subject</label>
                    <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="What's this about?" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: "28px" }}>
                    <label style={labelStyle}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." rows={5} style={{ ...inputStyle, resize: "vertical" }} required />
                  </div>
                  <button type="submit" style={{ width: "100%", background: "#2C1810", color: "#D4956A", border: "none", padding: "16px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", cursor: "pointer" }}>
                    Send Message
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