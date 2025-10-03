"use client";
import { useEffect, useState } from "react";

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamped = Math.max(0, diff);
  const s = Math.floor(clamped / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  return (
    <div className="mx-auto max-w-4xl text-center">
      <style jsx>{`
        @keyframes rotate-gear {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .rotating-gear {
          animation: rotate-gear 20s linear infinite;
        }
        
        .gear-teeth {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg 15deg,
            #cbb98a 15deg 30deg,
            transparent 30deg 45deg,
            #cbb98a 45deg 60deg,
            transparent 60deg 75deg,
            #cbb98a 75deg 90deg,
            transparent 90deg 105deg,
            #cbb98a 105deg 120deg,
            transparent 120deg 135deg,
            #cbb98a 135deg 150deg,
            transparent 150deg 165deg,
            #cbb98a 165deg 180deg,
            transparent 180deg 195deg,
            #cbb98a 195deg 210deg,
            transparent 210deg 225deg,
            #cbb98a 225deg 240deg,
            transparent 240deg 255deg,
            #cbb98a 255deg 270deg,
            transparent 270deg 285deg,
            #cbb98a 285deg 300deg,
            transparent 300deg 315deg,
            #cbb98a 315deg 330deg,
            transparent 330deg 345deg,
            #cbb98a 345deg 360deg
          );
          pointer-events: none;
        }
      `}</style>
      
      <div className="relative">
        {/* Rotating gear decoration - behind countdown */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rotating-gear relative">
            <div className="gear-teeth"></div>
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[rgba(var(--gold-rgb),0.2)] to-[rgba(var(--gold-rgb),0.1)] border-4 border-[rgba(var(--gold-rgb),0.32)]"></div>
          </div>
        </div>
        
        {/* Original countdown - unchanged */}
        <div className="wheel mx-auto relative z-10">
          <div className="wheel-inner">
            <div className="grid grid-cols-4 gap-2 text-ivory">
              {[{l:"Hari",v:days},{l:"Jam",v:hours},{l:"Menit",v:minutes},{l:"Detik",v:seconds}].map((t) => (
                <div key={t.l} className="bg-blue-900/40 border border-blue-200/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(t.v).padStart(2, "0")}</div>
                  <div className="text-xs uppercase tracking-widest text-blue-100/80">{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-blue-100">Hitung mundur menuju hari bahagia</p>
    </div>
  );
}
