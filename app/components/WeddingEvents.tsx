"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import InvitationCard from "./InvitationCard";
import { FaRegHeart } from "react-icons/fa";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

export default function WeddingEvents() {
  const performanceMode = usePerformanceMode();
  const isLowPerformance = performanceMode === "low";
  const isBalancedPerformance = performanceMode === "balanced";
  const introDuration = isLowPerformance ? 0.65 : 0.8;
  const outroDuration = isLowPerformance ? 0.65 : 0.8;

  const [akadDate, setAkadDate] = useState<string>("");
  const [resepsiDate, setResepsiDate] = useState<string>("");

  useEffect(() => {
    const akad = new Date("2025-11-09T09:00:00");
    const resepsi = new Date("2025-11-09T11:00:00");
    
    setAkadDate(akad.toLocaleDateString("id-ID", { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }));
    
    setResepsiDate(resepsi.toLocaleDateString("id-ID", { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }));
  }, []);

  return (
    <section className="relative py-16 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: introDuration }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-golden foil-shimmer mb-4">
          Acara Pernikahan
        </h2>
        <div className="flex items-center justify-center gap-4 text-blue-100/60">
          <span aria-hidden className="h-px w-16 bg-[rgba(var(--gold-rgb),0.3)]" />
          <span aria-hidden></span>
          <span aria-hidden className="h-px w-16 bg-[rgba(var(--gold-rgb),0.3)]" />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <InvitationCard
          title="Akad Nikah"
          date={akadDate}
          time="09:00 WITA - Selesai"
          location="Mesjid Salokaraja"
          address="Salokaraja, Sulawesi Selatan"
          mapsUrl="https://maps.google.com/?q=Mesjid+Salokaraja"
          delay={0.2}
          backgroundImage="/gambar1.jpg"
          direction="left"
        />

        <InvitationCard
          title="Resepsi Pernikahan"
          date={resepsiDate}
          time="09:00 WITA - 17:00 WITA"
          location="CABBUE/ABEKKAE"
          address="Sebelah Utara Permandian Alam Ompo , Soppeng, Sulawesi Selatan"
          mapsUrl="https://maps.app.goo.gl/9u4NRZ6TtZ7HjMB47"
          delay={0.4}
          backgroundImage="/gambar2.jpg"
          direction="right"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: outroDuration, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-12 p-6 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm rounded-2xl border border-[rgba(var(--gold-rgb),0.25)] shadow-golden-soft"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="mb-4 flex items-center justify-center gap-3 text-golden">
          <span aria-hidden className="h-px w-8 bg-[rgba(var(--gold-rgb),0.35)]"></span>
          <FaRegHeart className="text-lg" aria-hidden />
          <span aria-hidden className="h-px w-8 bg-[rgba(var(--gold-rgb),0.35)]"></span>
        </div>
        <p className="text-ivory/85 text-sm md:text-base leading-relaxed font-sans">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 text-golden">
          <span aria-hidden className="h-px w-10 bg-[rgba(var(--gold-rgb),0.25)]"></span>
          <span className="text-sm font-semibold font-sans">Jazakumullahu Khairan</span>
          <span aria-hidden className="h-px w-10 bg-[rgba(var(--gold-rgb),0.25)]"></span>
        </div>
      </motion.div>
    </section>
  );
}
