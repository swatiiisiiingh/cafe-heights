import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata = {
  title: "Cafe Heights | Authentic Italian Cuisine",
  description: "Experience the finest Italian dining at Cafe Heights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable}`}>
        <SessionWrapper>
          <CartProvider>
            <Toaster position="top-center" />
            {children}
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}