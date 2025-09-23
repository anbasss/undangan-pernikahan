"use client";
import { useRef, useState } from "react";

const sampleImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=60",
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const total = sampleImages.length;
  function prev() { setIndex((i) => (i - 1 + total) % total); }
  function next() { setIndex((i) => (i + 1) % total); }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="bg-blue-900/40 border border-blue-200/20 rounded-2xl p-4 md:p-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl grid place-items-center">
          <div className="porthole">
            <img src={sampleImages[index]} alt={`Foto ${index + 1}`} className="object-cover w-full h-full" />
          </div>
          <button aria-label="Sebelumnya" onClick={prev} className="nav-btn left-3">‹</button>
          <button aria-label="Berikutnya" onClick={next} className="nav-btn right-3">›</button>
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {sampleImages.map((_, i) => (
            <button key={i} aria-label={`Pilih foto ${i + 1}`} onClick={() => setIndex(i)} className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-amber-400" : "bg-blue-300/40"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
