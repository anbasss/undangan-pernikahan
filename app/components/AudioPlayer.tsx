"use client";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.play().catch(() => {
        setOn(false);
      });
    } else {
      a.pause();
    }
  }, [on]);

  useEffect(() => {
    const handler = (event: Event) => {
      const { detail } = event as CustomEvent<{ playMusic?: boolean }>;
      const shouldPlay = detail?.playMusic !== false;
      setOn(shouldPlay);
    };

    window.addEventListener("invitation-open", handler as EventListener);
    return () => {
      window.removeEventListener("invitation-open", handler as EventListener);
    };
  }, []);
  return (
    <div className="fixed z-40 bottom-4 right-4">
      <button
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
        aria-label={on ? "Matikan Musik" : "Putar Musik"}
        className="w-12 h-12 rounded-full bg-golden/90 backdrop-blur border-2 border-golden/50 text-white shadow-lg hover:bg-golden hover:shadow-xl transition-all duration-300 flex items-center justify-center text-lg"
      >
        {on ? <FaPause /> : <FaPlay />}
      </button>
      {/* Royalty-free example placeholder; replace with your own hosted track */}
      <audio ref={audioRef} src="https://drive.undanganta.id/file/Westlife-I-Wanna-Grow-Old-with-Y.mp3" loop preload="none" />
    </div>
  );
}
