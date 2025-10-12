"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

export default function IntroOverlay({ coupleNames }: { coupleNames: { bride: string; groom: string } }) {
  const params = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [playMusic, setPlayMusic] = useState(true);
  const [boatReady, setBoatReady] = useState(false);
  const performanceMode = usePerformanceMode();
  const [isCompact, setIsCompact] = useState(false);
  const isLowPerformance = performanceMode === "low";
  const effectiveLowMotion = isLowPerformance || isCompact;

  useEffect(() => {
    // Run only on client
    setMounted(true);
    let cleanup: (() => void) | undefined;
    if (typeof window !== "undefined") {
      const updateViewport = () => setIsCompact(window.matchMedia("(max-width: 640px)").matches);
      updateViewport();
      window.addEventListener("resize", updateViewport);
      window.addEventListener("orientationchange", updateViewport);
      cleanup = () => {
        window.removeEventListener("resize", updateViewport);
        window.removeEventListener("orientationchange", updateViewport);
      };
    }
    const opened = typeof window !== 'undefined' ? sessionStorage.getItem("inv-opened") : null;
    const boatReadyFlag = typeof window !== 'undefined' ? sessionStorage.getItem("boat-ready") : null;
    if (boatReadyFlag === "1") setBoatReady(true);
    // Always show overlay on fresh load unless explicitly hidden by user action
    if (opened === "1") {
      // Check if this might be a page refresh - if so, show overlay again
      const isRefresh = !document.referrer || document.referrer.includes(window.location.host);
      if (isRefresh) {
        sessionStorage.removeItem("inv-opened");
        setShow(true);
      } else {
        setShow(false);
      }
    }
    return cleanup;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleBoatReady = () => setBoatReady(true);
    window.addEventListener("boat-ready", handleBoatReady);
    return () => window.removeEventListener("boat-ready", handleBoatReady);
  }, []);

  useEffect(() => {
    const to = params?.get("to");
    if (to) setName(decodeURIComponent(to.replaceAll("+", " ")));
  }, [params]);

  function openInvitation() {
    if (!boatReady) return;
    // Dispatch event untuk animasi kapal dan show couple names
    const ev = new CustomEvent("invitation-open", { detail: { playMusic, inviteeName: name } });
    window.dispatchEvent(ev);
    // Hilangkan overlay dengan animasi smooth
    setShow(false);
    sessionStorage.setItem("inv-opened", "1");
  }

  if (!mounted) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative mx-4 w-full max-w-xl text-center text-ivory"
            initial={effectiveLowMotion ? { opacity: 0, y: 24 } : { y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={effectiveLowMotion ? { opacity: 0, y: -18 } : { y: -40, opacity: 0, scale: 0.98, rotate: -2 }}
            transition={effectiveLowMotion ? { duration: 0.45, ease: "easeOut" } : { type: "spring", stiffness: 140, damping: 18 }}
          >
            <div aria-hidden className="absolute inset-0 -z-10 rounded-[28px] border-[10px]" style={{ borderImage: "linear-gradient(45deg,var(--gold),var(--gold-bright),var(--gold)) 1" }} />
            <div className="rounded-[18px] bg-blue-900/60 backdrop-blur-md px-6 py-8 border border-blue-200/30 shadow-2xl">
              <div className="text-amber-300 text-4xl mb-2">⚓</div>
              <div className={`font-script ${isCompact ? "text-2xl" : "text-3xl"} sm:text-4xl md:text-5xl foil-shimmer flex flex-wrap items-center justify-center gap-x-3 gap-y-1 leading-tight`}>
                <span className="whitespace-nowrap">{coupleNames.bride}</span>
                <span className="text-2xl sm:text-3xl">&amp;</span>
                <span className="whitespace-nowrap">{coupleNames.groom}</span>
              </div>
              <div className="mt-4 text-blue-100/90">Kepada Yth:</div>
              <div className="mt-1 text-lg sm:text-xl font-semibold break-words px-2">
                {name || "Tamu Undangan"}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2 text-sm text-blue-100/90">
                <input id="music" type="checkbox" checked={playMusic} onChange={(e)=>setPlayMusic(e.target.checked)} />
                <label htmlFor="music">Putar musik saat membuka</label>
              </div>
              <div className="mt-6" style={{ minHeight: isCompact ? 52 : 60 }}>
                <AnimatePresence mode="wait">
                  {boatReady ? (
                    <motion.button
                      key="open-invite"
                      initial={effectiveLowMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={effectiveLowMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                      transition={{ duration: effectiveLowMotion ? 0.4 : 0.55, ease: "easeOut" }}
                      onClick={openInvitation}
                      onMouseEnter={() => {
                        // Preload boat model when user hovers
                        window.dispatchEvent(new CustomEvent('preload-boat'));
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 bg-amber-400 text-blue-950 font-semibold shadow hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all duration-200"
                    >
                      Buka Undangan
                    </motion.button>
                  ) : (
                    <motion.div
                      key="waiting-boat"
                      initial={effectiveLowMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: effectiveLowMotion ? 0 : -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 bg-blue-900/60 text-amber-200 border border-amber-200/40 shadow-inner"
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-amber-300 animate-pulse" aria-hidden />
                      Kapal sedang berlayar menuju dermaga...
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div aria-hidden className="mt-4 text-amber-400">⎯⎯⎯⛵⎯⎯⎯</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
