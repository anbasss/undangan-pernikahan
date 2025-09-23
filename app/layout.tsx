import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const displaySerif = Cinzel({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const bodySans = Inter({
  variable: "--font-body-sans",
  subsets: ["latin"],
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
  <body className={`${displaySerif.variable} ${bodySans.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
