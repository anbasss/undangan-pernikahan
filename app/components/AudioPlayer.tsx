"use client";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (on) a.play().catch(() => {});
    else a.pause();
  }, [on]);
  return (
    <div className="fixed z-40 bottom-4 right-4">
      <button
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
        className="rounded-full bg-blue-900/70 backdrop-blur border border-blue-200/30 text-amber-200 px-4 py-2 shadow hover:bg-blue-900/90"
      >
        {on ? "Matikan Musik" : "Putar Musik"}
      </button>
      {/* Royalty-free example placeholder; replace with your own hosted track */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2021/10/26/audio_aa7a7bb64b.mp3?filename=ocean-ambient-9902.mp3" loop preload="none" />
    </div>
  );
}
