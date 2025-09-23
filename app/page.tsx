"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./components/HeroScene"), { ssr: false });
const StorySection = dynamic(() => import("./components/StorySection"));
const EventDetails = dynamic(() => import("./components/EventDetails"));
const MapSection = dynamic(() => import("./components/MapSection"));
const RSVPForm = dynamic(() => import("./components/RSVPForm"));
const Gallery = dynamic(() => import("./components/Gallery"));
const Countdown = dynamic(() => import("./components/Countdown"), { ssr: false });
const AudioPlayer = dynamic(() => import("./components/AudioPlayer"));
const ShareBar = dynamic(() => import("./components/ShareBar"), { ssr: false });
const IntroOverlay = dynamic(() => import("./components/IntroOverlay"), { ssr: false });

export default function Home() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    const onOpen = (e: any) => setAutoPlayMusic(Boolean(e.detail?.playMusic));
    window.addEventListener("invitation-open", onOpen as any);
    return () => { media.removeEventListener("change", update); window.removeEventListener("invitation-open", onOpen as any); };
  }, []);

  return (
    <main className="min-h-screen bg-ocean text-foreground font-[var(--font-body-sans)]">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white/90 text-blue-900 px-3 py-2 rounded">
        Skip to content
      </a>
      <header aria-label="Undangan Pernikahan" className="relative">
  <IntroOverlay coupleNames={{ bride: "Andi B. Patau", groom: "Andi Amparita" }} />
  <HeroScene reduceMotion={reduceMotion} coupleNames={{ bride: "Andi B. Patau", groom: "Andi Amparita" }} date="2025-11-09T10:00:00" />
        <AudioPlayer />
        <ShareBar />
      </header>
      <div id="content" className="space-y-24 md:space-y-32">
        <section aria-labelledby="cerita" className="px-4 md:px-8">
          <h2 id="cerita" className="sr-only">Cerita Pasangan</h2>
          <StorySection />
        </section>
        <section aria-labelledby="detail" className="px-4 md:px-8">
          <h2 id="detail" className="sr-only">Detail Acara</h2>
          <EventDetails />
        </section>
        <section aria-labelledby="countdown" className="px-4 md:px-8">
          <h2 id="countdown" className="sr-only">Hitung Mundur</h2>
          <Countdown targetDate={new Date("2025-11-09T10:00:00")} />
        </section>
        <section aria-labelledby="map" className="px-4 md:px-8">
          <h2 id="map" className="sr-only">Peta Lokasi</h2>
          <MapSection />
        </section>
        <section aria-labelledby="gallery" className="px-4 md:px-8">
          <h2 id="gallery" className="sr-only">Galeri Foto</h2>
          <Gallery />
        </section>
        <section aria-labelledby="rsvp" className="px-4 md:px-8 pb-20">
          <h2 id="rsvp" className="sr-only">RSVP</h2>
          <RSVPForm />
        </section>
      </div>
      <footer className="text-center py-8 text-sm text-blue-100/80">
  © 2025 Andi B. Patau & Andi Amparita — Berlayar bersama selamanya
      </footer>
    </main>
  );
}
