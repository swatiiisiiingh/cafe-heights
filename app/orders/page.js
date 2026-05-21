"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Link from "next/link";

const wrap = { maxWidth: "1100px", margin: "0 auto", padding: "0 48px" };

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("orders");

  useEffect(() => {
    if (!session) { setLoading(false); return; }
    const fetchData = async () => {
      try {
        const oSnap = await getDocs(query(collection(db, "orders"), where("userId", "==", session.user.email)));
        setOrders(oSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        const rSnap = await getDocs(query(collection(db, "reservations"), where("userId", "==", session.user.email)));
        setReservations(rSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchData();
  }, [session]);

  const tabBtn = (id, label) => (
    <button onClick={() => setTab(id)} style={{
      padding: "14px 28px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px",
      fontWeight: tab === id ? 700 : 400, color: tab === id ? "#D4956A" : "#8B7355",
      borderTop: "none", borderLeft: "none", borderRight: "none",
      borderBottom: tab === id ? "2px solid #D4956A" : "2px solid transparent",
      background: "transparent", cursor: "pointer",
    }}>{label}</button>
  );

  return (
    <main>
      <Navbar />
      <section style={{ background: "#2C1810", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <p style={{ color: "#D4956A", letterSpacing: "4px", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>My Account</p>
          <div style={{ background: "#D4956A", height: "1px", width: "60px", margin: "0 auto 20px" }} />
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#F5ECD7", fontSize: "52px" }}>My Dashboard</h1>
        </div>
      </section>

      <section style={{ background: "#F5ECD7", borderBottom: "1px solid #EDE0D0" }}>
        <div style={{ ...wrap, display: "flex" }}>
          {tabBtn("orders", "My Orders")}
          {tabBtn("reservations", "My Reservations")}
        </div>
      </section>

      <section style={{ background: "#FDFAF5", padding: "60px 0" }}>
        <div style={wrap}>
          {!session ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔐</div>
              <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "28px", marginBottom: "12px" }}>Sign in to view your account</h2>
              <p style={{ color: "#8B7355", marginBottom: "28px" }}>Track your orders and reservations in one place.</p>
              <button onClick={() => signIn("google")} style={{ background: "#D4956A", color: "#2C1810", border: "none", padding: "14px 32px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", cursor: "pointer" }}>
                Sign in with Google
              </button>
            </div>
          ) : loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#8B7355", fontSize: "16px" }}>Loading...</div>
          ) : tab === "orders" ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "28px" }}>My Orders</h2>
                <Link href="/menu" style={{ background: "#2C1810", color: "#D4956A", padding: "10px 20px", borderRadius: "6px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", textDecoration: "none" }}>Order Again</Link>
              </div>
              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "12px", border: "1px solid #EDE0D0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍝</div>
                  <p style={{ color: "#8B7355", fontSize: "15px" }}>No orders yet. Time to order something delicious!</p>
                </div>
              ) : orders.map((order) => (
                <div key={order.id} style={{ background: "#fff", border: "1px solid #EDE0D0", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div>
                      <p style={{ fontSize: "12px", color: "#8B7355", marginBottom: "4px" }}>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      <p style={{ fontSize: "12px", color: "#8B7355" }}>Order ID: #{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <span style={{ background: "#EAF7EF", color: "#27AE60", fontSize: "11px", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>
                      {order.status}
                    </span>
                  </div>
                  <div style={{ borderTop: "1px solid #EDE0D0", paddingTop: "16px" }}>
                    {order.items.map((item) => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ color: "#2C1810", fontSize: "14px" }}>{item.emoji} {item.name} × {item.qty}</span>
                        <span style={{ color: "#8B7355", fontSize: "14px" }}>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #EDE0D0", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 700, color: "#2C1810" }}>Total</span>
                      <span style={{ fontWeight: 700, color: "#D4956A", fontSize: "18px" }}>₹{order.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "28px" }}>My Reservations</h2>
                <Link href="/reservations" style={{ background: "#2C1810", color: "#D4956A", padding: "10px 20px", borderRadius: "6px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", textDecoration: "none" }}>New Reservation</Link>
              </div>
              {reservations.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "12px", border: "1px solid #EDE0D0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍷</div>
                  <p style={{ color: "#8B7355", fontSize: "15px" }}>No reservations yet. Book a table for a special evening!</p>
                </div>
              ) : reservations.map((res) => (
                <div key={res.id} style={{ background: "#fff", border: "1px solid #EDE0D0", borderRadius: "12px", padding: "24px", marginBottom: "16px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: "11px", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Date</p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#2C1810" }}>{res.date}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Time</p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#2C1810" }}>{res.time}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Guests</p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#2C1810" }}>{res.guests} guests</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ background: "#EAF7EF", color: "#27AE60", fontSize: "11px", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}