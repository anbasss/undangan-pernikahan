"use client";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative parchment rounded-xl p-6 md:p-10 text-blue-950">
        <div aria-hidden className="absolute -left-3 top-4 h-8 w-8 rotate-12 text-amber-600">🧭</div>
        <div aria-hidden className="absolute -right-3 bottom-4 h-8 w-8 -rotate-12 text-amber-600">🦪</div>
        <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-[var(--font-display-serif)] text-3xl md:text-4xl text-center mb-4">
          Kisah Pelayaran Cinta
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="leading-relaxed text-base md:text-lg">
          Di bawah langit biru dan semilir angin laut, kami berjumpa. Ombak membawa cerita, angin membawa doa. Setelah menempuh berbagai pelayaran, kami berlabuh pada satu tujuan yang sama.
        </motion.p>
        <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm md:text-base">
          <div className="nautical-card">Pertemuan pertama di dermaga senja.</div>
          <div className="nautical-card">Janji setia di bawah bintang utara.</div>
          <div className="nautical-card">Berlayar menuju masa depan bersama.</div>
        </div>
      </div>
      <div aria-hidden className="mt-4 flex justify-center text-amber-500">⎯⎯⎯⛵⎯⎯⎯</div>
    </div>
  );
}
