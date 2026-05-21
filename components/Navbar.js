"use client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav style={{ background: "#2C1810" }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" style={{ fontFamily: "var(--font-playfair)", color: "#D4956A" }}
          className="text-2xl italic tracking-wide">
          Cafe Heights
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              style={{ color: "#F5ECD7", letterSpacing: "1.5px" }}
              className="text-xs uppercase hover:text-[#D4956A] transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} color="#F5ECD7" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4956A] text-[#2C1810]
                text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {session ? (
            <div className="relative">
              <button onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2">
                <img src={session.user.image} alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-[#D4956A]" />
                <ChevronDown size={14} color="#F5ECD7" />
              </button>
              {userOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg overflow-hidden shadow-xl"
                  style={{ background: "#F5ECD7" }}>
                  <div className="px-4 py-3 border-b border-[#EDE0D0]">
                    <p className="text-xs font-bold text-[#2C1810] truncate">{session.user.name}</p>
                    <p className="text-xs text-[#8B7355] truncate">{session.user.email}</p>
                  </div>
                  <Link href="/orders" onClick={() => setUserOpen(false)}
                    className="block px-4 py-2 text-xs text-[#2C1810] hover:bg-[#EDE0D0]">
                    My Orders
                  </Link>
                  <Link href="/reservations" onClick={() => setUserOpen(false)}
                    className="block px-4 py-2 text-xs text-[#2C1810] hover:bg-[#EDE0D0]">
                    My Reservations
                  </Link>
                  <button onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-[#EDE0D0]">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => signIn("google")}
              style={{ background: "#D4956A", color: "#2C1810" }}
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded">
              Sign In
            </button>
          )}

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} color="#F5ECD7" /> : <Menu size={22} color="#F5ECD7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#3D2218" }} className="md:hidden px-6 pb-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: "#F5ECD7", letterSpacing: "1.5px" }}
              className="text-xs uppercase py-2 border-b border-[#4A3728]">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}