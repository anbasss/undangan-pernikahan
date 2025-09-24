"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function IntroOverlay({ coupleNames }: { coupleNames: { bride: string; groom: string } }) {
  const params = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [playMusic, setPlayMusic] = useState(true);

  useEffect(() => {
    // Run only on client
    setMounted(true);
    const opened = typeof window !== 'undefined' ? sessionStorage.getItem("inv-opened") : null;
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
  }, []);

  useEffect(() => {
    const to = params?.get("to");
    if (to) setName(decodeURIComponent(to.replaceAll("+", " ")));
  }, [params]);

  function openInvitation() {
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
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.98, rotate: -2 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            <div aria-hidden className="absolute inset-0 -z-10 rounded-[28px] border-[10px]" style={{ borderImage: "linear-gradient(45deg,#caa969,#f3d27c,#caa969) 1" }} />
            <div className="rounded-[18px] bg-blue-900/60 backdrop-blur-md px-6 py-8 border border-blue-200/30 shadow-2xl">
              <div className="text-amber-300 text-4xl mb-2">⚓</div>
              <div className="font-[var(--font-display-serif)] text-3xl md:text-4xl foil-shimmer">
                {coupleNames.bride} & {coupleNames.groom}
              </div>
              <div className="mt-4 text-blue-100/90">Kepada Yth:</div>
              <div className="mt-1 text-xl font-semibold break-words px-2">
                {name || "Tamu Undangan"}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2 text-sm text-blue-100/90">
                <input id="music" type="checkbox" checked={playMusic} onChange={(e)=>setPlayMusic(e.target.checked)} />
                <label htmlFor="music">Putar musik saat membuka</label>
              </div>
              <button 
                onClick={openInvitation} 
                onMouseEnter={() => {
                  // Preload boat model when user hovers
                  window.dispatchEvent(new CustomEvent('preload-boat'));
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 bg-amber-400 text-blue-950 font-semibold shadow hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all duration-200"
              >
                Buka Undangan
              </button>
              <div aria-hidden className="mt-4 text-amber-400">⎯⎯⎯⛵⎯⎯⎯</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
