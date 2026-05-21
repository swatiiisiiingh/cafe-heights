import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#2C1810" }} className="mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: "var(--font-playfair)", color: "#D4956A" }}
              className="text-2xl italic mb-3">Cafe Heights</h3>
            <p style={{ color: "#C4B49A" }} className="text-sm leading-relaxed">
              Authentic Italian cuisine crafted with love and tradition since 1987.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: "#D4956A", letterSpacing: "2px" }}
              className="text-xs uppercase mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["/menu", "/reservations", "/events", "/about", "/contact"].map((href) => (
                <Link key={href} href={href}
                  style={{ color: "#C4B49A" }}
                  className="text-sm hover:text-[#D4956A] transition-colors capitalize">
                  {href.replace("/", "")}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#D4956A", letterSpacing: "2px" }}
              className="text-xs uppercase mb-4">Visit Us</h4>
            <div style={{ color: "#C4B49A" }} className="text-sm flex flex-col gap-2">
              <p>123 Via Roma, Connaught Place</p>
              <p>New Delhi, India</p>
              <p>+91 98765 43210</p>
              <p>hello@cafeheights.in</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #4A3728", color: "#8B7355" }}
          className="mt-10 pt-6 text-center text-xs tracking-widest uppercase">
          © 2026 Cafe Heights · All rights reserved
        </div>
      </div>
    </footer>
  );
}