"use client";
import { useCart } from "@/context/CartContext";
import { useSession, signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useState } from "react";

const wrap = { maxWidth: "1100px", margin: "0 auto", padding: "0 48px" };

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart, total } = useCart();
  const { data: session } = useSession();
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = async () => {
    if (!session) { signIn("google"); return; }
    if (cart.length === 0) { toast.error("Your cart is empty!"); return; }
    setPlacing(true);
    try {
      await addDoc(collection(db, "orders"), {
        items: cart,
        total,
        userId: session.user.email,
        userName: session.user.name,
        userImage: session.user.image,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      });
      clearCart();
      setOrdered(true);
      toast.success("Order placed successfully!", {
        style: { background: "#2C1810", color: "#F5ECD7" },
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
    setPlacing(false);
  };

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section style={{ background: "#2C1810", padding: "60px 0", textAlign: "center" }}>
        <div style={wrap}>
          <p style={{ color: "#D4956A", letterSpacing: "4px", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>Your order</p>
          <div style={{ background: "#D4956A", height: "1px", width: "60px", margin: "0 auto 20px" }} />
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#F5ECD7", fontSize: "52px" }}>Your Cart</h1>
        </div>
      </section>

      <section style={{ background: "#FDFAF5", padding: "60px 0" }}>
        <div style={wrap}>
          {ordered ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "72px", marginBottom: "24px" }}>🎉</div>
              <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "36px", marginBottom: "12px" }}>Order Placed!</h2>
              <p style={{ color: "#8B7355", fontSize: "15px", marginBottom: "32px", lineHeight: 1.7 }}>
                Thank you for your order! We're preparing your delicious Italian meal. 🍝
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <Link href="/menu" style={{ background: "#2C1810", color: "#D4956A", padding: "12px 28px", borderRadius: "6px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none" }}>
                  Order More
                </Link>
                <Link href="/orders" style={{ border: "1px solid #2C1810", color: "#2C1810", padding: "12px 28px", borderRadius: "6px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none" }}>
                  View Orders
                </Link>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "72px", marginBottom: "24px" }}>🛒</div>
              <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "32px", marginBottom: "12px" }}>Your cart is empty</h2>
              <p style={{ color: "#8B7355", fontSize: "15px", marginBottom: "32px" }}>Looks like you haven't added anything yet!</p>
              <Link href="/menu" style={{ background: "#2C1810", color: "#D4956A", padding: "14px 32px", borderRadius: "6px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none" }}>
                Browse Menu
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px", alignItems: "start" }}>

              {/* Cart Items */}
              <div>
                <h2 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "24px", marginBottom: "24px" }}>
                  {cart.length} {cart.length === 1 ? "Item" : "Items"}
                </h2>
                {cart.map((item) => (
                  <div key={item.id} style={{ background: "#fff", border: "1px solid #EDE0D0", borderRadius: "12px", padding: "20px", display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ fontSize: "48px", flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "18px", marginBottom: "4px" }}>{item.name}</h3>
                      <p style={{ color: "#D4956A", fontWeight: 700, fontSize: "16px" }}>₹{item.price}</p>
                    </div>
                    {/* Qty Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #EDE0D0", background: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2C1810" }}
                      >−</button>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: "#2C1810", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #EDE0D0", background: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2C1810" }}
                      >+</button>
                    </div>
                    <div style={{ textAlign: "right", minWidth: "80px" }}>
                      <p style={{ fontWeight: 700, color: "#2C1810", fontSize: "16px", marginBottom: "8px" }}>₹{item.price * item.qty}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: "none", border: "none", color: "#C0392B", fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}
                      >Remove</button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={clearCart}
                  style={{ background: "none", border: "none", color: "#8B7355", fontSize: "12px", cursor: "pointer", textDecoration: "underline", marginTop: "8px" }}
                >
                  Clear cart
                </button>
              </div>

              {/* Order Summary */}
              <div style={{ background: "#fff", border: "1px solid #EDE0D0", borderRadius: "16px", padding: "32px", position: "sticky", top: "100px" }}>
                <h3 style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "22px", marginBottom: "24px" }}>Order Summary</h3>

                {cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#8B7355", fontSize: "14px" }}>{item.name} × {item.qty}</span>
                    <span style={{ color: "#2C1810", fontSize: "14px", fontWeight: 500 }}>₹{item.price * item.qty}</span>
                  </div>
                ))}

                <div style={{ borderTop: "1px solid #EDE0D0", marginTop: "16px", paddingTop: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#8B7355", fontSize: "14px" }}>Subtotal</span>
                    <span style={{ color: "#2C1810", fontSize: "14px" }}>₹{total}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#8B7355", fontSize: "14px" }}>Taxes (5%)</span>
                    <span style={{ color: "#2C1810", fontSize: "14px" }}>₹{Math.round(total * 0.05)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#8B7355", fontSize: "14px" }}>Delivery</span>
                    <span style={{ color: "#27AE60", fontSize: "14px", fontWeight: 600 }}>Free</span>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #EDE0D0", marginTop: "16px", paddingTop: "16px", display: "flex", justifyContent: "space-between", marginBottom: "28px" }}>
                  <span style={{ fontFamily: "var(--font-playfair)", color: "#2C1810", fontSize: "20px" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-playfair)", color: "#D4956A", fontSize: "22px", fontWeight: 700 }}>₹{total + Math.round(total * 0.05)}</span>
                </div>

                {!session && (
                  <p style={{ color: "#8B7355", fontSize: "12px", textAlign: "center", marginBottom: "16px" }}>
                    You need to sign in to place an order
                  </p>
                )}

                <button
                  onClick={handleOrder}
                  disabled={placing}
                  style={{ width: "100%", background: "#2C1810", color: "#D4956A", border: "none", padding: "16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", cursor: placing ? "not-allowed" : "pointer", opacity: placing ? 0.7 : 1 }}
                >
                  {placing ? "Placing Order..." : session ? "Place Order" : "Sign in to Order"}
                </button>

                <Link href="/menu" style={{ display: "block", textAlign: "center", marginTop: "16px", color: "#8B7355", fontSize: "13px", textDecoration: "underline" }}>
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}