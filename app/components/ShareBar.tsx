"use client";
import { useEffect, useState } from "react";

export default function ShareBar() {
  const [shareUrl, setShareUrl] = useState<string>("https://wa.me/");
  useEffect(() => {
    const url = window.location.href;
    const text = encodeURIComponent("Yuk hadir di pernikahan Andi B. Patau & Andi Amparita!");
    setShareUrl(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`);
  }, []);
  return (
    <div className="fixed z-40 bottom-4 left-4">
      <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-500 text-white px-4 py-2 shadow hover:bg-emerald-400">
        Bagikan via WhatsApp
      </a>
    </div>
  );
}
