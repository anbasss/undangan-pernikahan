"use client";
import { useEffect, useRef, useState } from "react";

export default function MapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;
    if ("IntersectionObserver" in window === false) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <div ref={containerRef} className="nautical-frame rounded-2xl overflow-hidden aspect-[16/9]">
        {isVisible ? (
          <iframe
            title="Lokasi Acara"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1989.2249648119323!2d119.90684528481212!3d-4.326271207169601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d95f7187f4b08f1%3A0x86c1628b533e028e!2sMesjid%20salokaraja!5e0!3m2!1sen!2sid!4v1758762962421!5m2!1sen!2sid"
            aria-label="Peta lokasi Mesjid Salokaraja"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full grid place-items-center bg-[rgba(11,42,74,0.85)] text-blue-100 text-sm">
            Memuat Peta...
          </div>
        )}
      </div>
      <p className="text-center text-blue-100 mt-3">Lokasi: Di Belakang Mesjid Salokaraja</p>
    </div>
  );
}
