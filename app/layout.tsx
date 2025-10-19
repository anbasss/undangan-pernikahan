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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nautical Wedding Invitation",
  description:
    "Undangan pernikahan Andi Baso & Andi Amparita",
  openGraph: {
    type: "website",
    title: "Nautical Wedding Invitation",
    description:
    "Undangan pernikahan Andi Baso & Andi Amparita",
    url: siteUrl,
    siteName: "Nautical Wedding Invitation",
    images: [
      {
        url: "/gambar2.jpg",
        width: 1200,
        height: 630,
        alt: "Foto mempelai Andi Baso Patau dan Andi Amparita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nautical Wedding Invitation",
    description:
    "Undangan pernikahan Andi Baso & Andi Amparita",
    images: ["/gambar2.jpg"],
  },
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
