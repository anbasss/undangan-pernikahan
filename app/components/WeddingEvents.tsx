"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import InvitationCard from "./InvitationCard";

export default function WeddingEvents() {
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
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-golden foil-shimmer mb-4">
          Acara Pernikahan
        </h2>
        <div className="flex items-center justify-center gap-4 text-blue-100/60">
          <span aria-hidden className="h-px w-16 bg-golden/40" />
          <span aria-hidden></span>
          <span aria-hidden className="h-px w-16 bg-golden/40" />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <InvitationCard
          title="Akad Nikah"
          date={akadDate}
          time="09:00 WITA - Selesai"
          location="Masjid Al-Ikhlas"
          address="Jl. Veteran No. 123, Makassar, Sulawesi Selatan"
          mapsUrl="https://maps.google.com/?q=Masjid+Al-Ikhlas+Makassar"
          delay={0.2}
        />

        <InvitationCard
          title="Resepsi Pernikahan"
          date={resepsiDate}
          time="11:00 WITA - 15:00 WITA"
          location="Ballroom Hotel Pantai Gapura"
          address="Jl. Pantai Losari No. 5, Makassar, Sulawesi Selatan"
          mapsUrl="https://maps.google.com/?q=Hotel+Pantai+Gapura+Makassar"
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-golden/20"
      >
        <p className="text-ivory/80 text-sm md:text-base leading-relaxed font-sans">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 text-golden">
          <span aria-hidden></span>
          <span className="text-sm font-semibold font-sans">Jazakumullahu Khairan</span>
          <span aria-hidden></span>
        </div>
      </motion.div>
    </section>
  );
}
