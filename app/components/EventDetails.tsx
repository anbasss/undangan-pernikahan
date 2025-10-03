"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function EventDetails() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto max-w-5xl bg-blue-900/40 rounded-2xl p-6 md:p-10 border border-blue-200/20 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 flex items-center justify-center opacity-30"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
      >
        <div className="compass" />
      </motion.div>
      <h3 className="font-[var(--font-display-serif)] text-3xl md:text-4xl text-center text-ivory">Detail Acara</h3>
      <div className="mt-6 grid md:grid-cols-3 gap-6 text-blue-100">
        <div className="rope-card">
          <div className="text-golden text-2xl">⚓</div>
          <div className="mt-2 text-sm uppercase tracking-widest text-golden-soft">Tanggal</div>
          <div className="text-lg">Sabtu, 20 Desember 2025</div>
        </div>
        <div className="rope-card">
          <div className="text-golden text-2xl">🕰️</div>
          <div className="mt-2 text-sm uppercase tracking-widest text-golden-soft">Waktu</div>
          <div className="text-lg">10.00 - 13.00 WIB</div>
        </div>
        <div className="rope-card">
          <div className="text-golden text-2xl">📍</div>
          <div className="mt-2 text-sm uppercase tracking-widest text-golden-soft">Lokasi</div>
          <div className="text-lg">Pelabuhan Bahagia, Jakarta</div>
        </div>
      </div>
    </div>
  );
}
