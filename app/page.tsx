"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const HeroScene = dynamic(() => import("./components/HeroScene"), { ssr: false });
const WeFoundLove = dynamic(() => import("./components/WeFoundLove"));
const WeddingEvents = dynamic(() => import("./components/WeddingEvents"));
const MapSection = dynamic(() => import("./components/MapSection"));
const RSVPForm = dynamic(() => import("./components/RSVPForm"));
const Countdown = dynamic(() => import("./components/Countdown"), { ssr: false });
const AudioPlayer = dynamic(() => import("./components/AudioPlayer"));
const ShareBar = dynamic(() => import("./components/ShareBar"), { ssr: false });
const IntroOverlay = dynamic(() => import("./components/IntroOverlay"), { ssr: false });

export default function Home() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Check if user came with proper URL parameter or if invitation was opened before
    const hasToParam = searchParams?.get("to");
    const invitationOpened = typeof window !== 'undefined' ? sessionStorage.getItem("inv-opened") : null;
    
    // If no 'to' parameter and invitation not opened, redirect to landing page
    if (!hasToParam && invitationOpened !== "1") {
      router.push("/?to=Nama%20Tamu");
      return;
    }
    
    // If user refreshes after opening invitation, reset the session to show intro again
    if (invitationOpened === "1" && typeof window !== 'undefined') {
      // Check if this is a refresh (no referrer or same page referrer)
      const isRefresh = !document.referrer || document.referrer.includes(window.location.host);
      if (isRefresh) {
        sessionStorage.removeItem("inv-opened");
        // Small delay to ensure clean state reset
        setTimeout(() => {
          window.location.reload();
        }, 100);
        return;
      }
    }
    
    setIsLoading(false);
  }, [searchParams, router]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    const onOpen = (e: any) => setAutoPlayMusic(Boolean(e.detail?.playMusic));
    window.addEventListener("invitation-open", onOpen as any);
    return () => { media.removeEventListener("change", update); window.removeEventListener("invitation-open", onOpen as any); };
  }, []);

  // Show loading while checking redirect logic
  if (isLoading) {
    return (
      <div className="min-h-screen bg-ocean flex items-center justify-center">
        <div className="text-ivory text-center">
          <div className="text-4xl mb-4">⚓</div>
          <div>Memuat undangan...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ocean text-foreground font-[var(--font-body-sans)] relative">
      {/* Floating nautical elements */}
      
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white/90 text-blue-900 px-3 py-2 rounded">
        Skip to content
      </a>
      <header aria-label="Undangan Pernikahan" className="relative">
        <HeroScene reduceMotion={reduceMotion} coupleNames={{ bride: "Andi Baso Patau", groom: "Andi Amparita" }} date="2025-11-09T10:00:00" />
        <AudioPlayer />
        <ShareBar />
      </header>
      <div id="content" className="relative z-10 space-y-24 md:space-y-32">
        <section aria-labelledby="love" className="px-4 md:px-8">
          <h2 id="love" className="sr-only">We Found Love</h2>
          <WeFoundLove />
        </section>
        <section aria-labelledby="events" className="px-4 md:px-8">
          <h2 id="events" className="sr-only">Acara Pernikahan</h2>
          <WeddingEvents />
        </section>
        <section aria-labelledby="countdown" className="px-4 md:px-8">
          <h2 id="countdown" className="sr-only">Hitung Mundur</h2>
          <Countdown targetDate={new Date("2025-11-09T09:00:00")} />
        </section>
        <section aria-labelledby="map" className="px-4 md:px-8">
          <h2 id="map" className="sr-only">Peta Lokasi</h2>
          <MapSection />
        </section>
        <section aria-labelledby="rsvp" className="px-4 md:px-8 pb-20">
          <h2 id="rsvp" className="sr-only">RSVP</h2>
          <RSVPForm />
        </section>
      </div>
      <footer className="relative z-10 text-center py-8 text-sm text-blue-100/80">
        © 2025 Andi Baso Patau & Andi Amparita — Berlayar bersama selamanya
      </footer>
    </main>
  );
}
