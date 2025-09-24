import type { Metadata } from "next";
import { Playfair_Display, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";

const displaySerif = Playfair_Display({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const bodySans = Poppins({
  variable: "--font-body-sans", 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const scriptFont = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nautical Wedding Invitation",
  description:
    "Undangan pernikahan bertema pelaut dengan animasi scroll 3D yang elegan dan romantis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body className={`${displaySerif.variable} ${bodySans.variable} ${scriptFont.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
