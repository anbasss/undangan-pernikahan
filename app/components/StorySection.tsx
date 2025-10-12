"use client";
import { motion } from "framer-motion";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

export default function StorySection() {
  const performanceMode = usePerformanceMode();
  const shouldAnimate = performanceMode !== "low";
  const headingInitial = shouldAnimate ? { opacity: 0, y: 10 } : undefined;
  const headingWhileInView = shouldAnimate ? { opacity: 1, y: 0 } : undefined;
  const textInitial = shouldAnimate ? { opacity: 0, y: 8 } : undefined;
  const textWhileInView = shouldAnimate ? { opacity: 1, y: 0 } : undefined;
  const motionTransition = shouldAnimate ? { duration: 0.7, ease: "easeOut" as const } : undefined;
  const viewportOnce = shouldAnimate ? { once: true, margin: "0px 0px -10% 0px" } : undefined;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative parchment rounded-xl p-6 md:p-10 text-blue-950">
        <div aria-hidden className="absolute -left-3 top-4 h-8 w-8 rotate-12 text-golden">🧭</div>
        <div aria-hidden className="absolute -right-3 bottom-4 h-8 w-8 -rotate-12 text-golden">🦪</div>
        <motion.h3
          initial={headingInitial}
          whileInView={headingWhileInView}
          transition={motionTransition}
          viewport={viewportOnce}
          className="font-script text-3xl md:text-4xl text-center mb-4 text-golden"
        >
          Kisah Pelayaran Cinta
        </motion.h3>
        <motion.p
          initial={textInitial}
          whileInView={textWhileInView}
          transition={motionTransition}
          viewport={viewportOnce}
          className="leading-relaxed text-base md:text-lg font-sans"
        >
          Di bawah langit biru dan semilir angin laut, kami berjumpa. Ombak membawa cerita, angin
          membawa doa. Setelah menempuh berbagai pelayaran, kami berlabuh pada satu tujuan yang
          sama.
        </motion.p>
        <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm md:text-base">
          <div className="nautical-card font-sans">Pertemuan pertama di dermaga senja.</div>
          <div className="nautical-card font-sans">Janji setia di bawah bintang utara.</div>
          <div className="nautical-card font-sans">Berlayar menuju masa depan bersama.</div>
        </div>
      </div>
      <div aria-hidden className="mt-4 flex justify-center text-golden">⎯⎯⎯⛵⎯⎯⎯</div>
    </div>
  );
}
