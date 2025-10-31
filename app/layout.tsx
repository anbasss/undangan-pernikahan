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

const siteOrigin = "https://pernikahanandibasodanandiamprita.vercel.app";
const defaultShareUrl = `${siteOrigin}/`;
const shareImageUrl = `${siteOrigin}/gambar1.jpg`;
const shareImageSquareUrl = `${siteOrigin}/gambar1-square.jpg`;
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "A.Baso & A.Ampa — Undangan Pernikahan",
  description:
    "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud berbagi kabar bahagia dalam hidup kami.",
  openGraph: {
    type: "website",
    title: "A.Baso & A.Ampa — Undangan Pernikahan",
    description:
    "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud berbagi kabar bahagia dalam hidup kami.",
    url: defaultShareUrl,
    siteName: "A.Baso & A.Ampa — Undangan Pernikahan",
    images: [
      {
        url: shareImageUrl,
        secureUrl: shareImageUrl,
        width: 1200,
        height: 630,
        alt: "Foto mempelai Andi Baso Patau dan Andi Amparita",
        type: "image/jpeg",
      },
      {
        // Smaller fallback to satisfy WhatsApp's stricter limits.
        url: shareImageSquareUrl,
        secureUrl: shareImageSquareUrl,
        width: 400,
        height: 400,
        alt: "Foto mempelai Andi Baso Patau dan Andi Amparita",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.Baso & A.Ampa — Undangan Pernikahan",
    description:
    "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud berbagi kabar bahagia dalam hidup kami.",
    images: [shareImageUrl, shareImageSquareUrl],
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
