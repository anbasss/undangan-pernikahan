"use client";
import dynamic from "next/dynamic";
import { MotionConfig, motion, useInView } from "framer-motion";
import { type ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const HeroScene = dynamic(() => import("./components/HeroScene"), { ssr: false });
const WeFoundLove = dynamic(() => import("./components/WeFoundLove"));
const WeddingEvents = dynamic(() => import("./components/WeddingEvents"));
const MapSection = dynamic(() => import("./components/MapSection"));
const RSVPForm = dynamic(() => import("./components/RSVPForm"));
const ThankYouSection = dynamic(() => import("./components/ThankYouSection"));
const Countdown = dynamic(() => import("./components/Countdown"), { ssr: false });
const AudioPlayer = dynamic(() => import("./components/AudioPlayer"));
const ShareBar = dynamic(() => import("./components/ShareBar"), { ssr: false });

type RevealSectionProps = {
  id?: string;
  ariaLabelledBy: string;
  className?: string;
  reduceMotion: boolean;
  delay?: number;
  children: ReactNode;
};

const revealVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function RevealSection({
  id,
  ariaLabelledBy,
  className,
  reduceMotion,
  delay = 0,
  children,
}: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -15% 0px",
  });
  const shouldAnimate = !reduceMotion;

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={className}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={shouldAnimate ? (inView ? "visible" : "hidden") : "visible"}
      variants={shouldAnimate ? revealVariants : { visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
      transition={shouldAnimate ? { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay } : undefined}
    >
      {children}
    </motion.section>
  );
}

// Component that uses useSearchParams wrapped in Suspense
function HomeContent() {
  const [reduceMotion, setReduceMotion] = useState(false);
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
    return () => { media.removeEventListener("change", update); };
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
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"} transition={{ type: "tween", ease: "easeOut" }}>
      <main className="min-h-screen bg-ocean text-foreground font-[var(--font-body-sans)] relative">
      {/* Floating nautical elements */}
      
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white/90 text-blue-900 px-3 py-2 rounded">
        Skip to content
      </a>
      <header aria-label="Undangan Pernikahan" className="relative">
  <HeroScene reduceMotion={reduceMotion} coupleNames={{ bride: "Andi B. Patau Naga Uleng", groom: "Andi Amparita Said, S.Pd, Gr" }} date="2025-11-09T10:00:00" />
        <AudioPlayer />
        <ShareBar />
      </header>
      <div id="content" className="relative z-10 space-y-24 md:space-y-32">
        <RevealSection ariaLabelledBy="love" className="px-4 md:px-8" reduceMotion={reduceMotion}>
          <h2 id="love" className="sr-only">We Found Love</h2>
          <WeFoundLove />
        </RevealSection>
        <RevealSection ariaLabelledBy="events" className="px-4 md:px-8" reduceMotion={reduceMotion} delay={0.05}>
          <h2 id="events" className="sr-only">Acara Pernikahan</h2>
          <WeddingEvents />
        </RevealSection>
        <RevealSection ariaLabelledBy="countdown" className="px-4 md:px-8" reduceMotion={reduceMotion} delay={0.1}>
          <h2 id="countdown" className="sr-only">Hitung Mundur</h2>
          <Countdown targetDate={new Date("2025-11-09T09:00:00")} />
        </RevealSection>
        <RevealSection ariaLabelledBy="map" className="px-4 md:px-8" reduceMotion={reduceMotion} delay={0.15}>
          <h2 id="map" className="sr-only">Peta Lokasi</h2>
          <MapSection />
        </RevealSection>
        <RevealSection ariaLabelledBy="rsvp" className="px-4 md:px-8" reduceMotion={reduceMotion} delay={0.2}>
          <h2 id="rsvp" className="sr-only">RSVP</h2>
          <RSVPForm />
        </RevealSection>
        <RevealSection ariaLabelledBy="thankyou" className="px-4 md:px-8 pb-20" reduceMotion={reduceMotion} delay={0.25}>
          <h2 id="thankyou" className="sr-only">Ucapan Terima Kasih</h2>
          <ThankYouSection />
        </RevealSection>
      </div>
      <footer className="relative z-10 text-center py-8 text-sm text-blue-100/80">
  © 2025 Andi B. Patau Naga Uleng & Andi Amparita Said, S.Pd, Gr — Berlayar bersama selamanya
      </footer>
      </main>
    </MotionConfig>
  );
}

// Loading fallback component
function HomeLoading() {
  return (
    <div className="min-h-screen bg-ocean flex items-center justify-center">
      <div className="text-ivory text-center">
        <div className="text-4xl mb-4">⚓</div>
        <div>Memuat undangan...</div>
      </div>
    </div>
  );
}

// Main export with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}
