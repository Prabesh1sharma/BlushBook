import type { Metadata } from "next";
import { Dancing_Script, Poppins } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blush Book",
  description: "Discover the true meaning of love and share your heart this Valentine's Day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} ${poppins.variable} antialiased`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Floating Hearts Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className="floating-heart animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                fontSize: `${1 + Math.random() * 2}rem`,
                opacity: 0.2 + Math.random() * 0.3,
              }}
            >
              {['💕', '💖', '💗', '💓', '❤️', '🌸', '✨'][Math.floor(Math.random() * 7)]}
            </span>
          ))}
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
