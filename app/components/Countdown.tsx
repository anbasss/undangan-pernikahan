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
            #caa969 15deg 30deg,
            transparent 30deg 45deg,
            #caa969 45deg 60deg,
            transparent 60deg 75deg,
            #caa969 75deg 90deg,
            transparent 90deg 105deg,
            #caa969 105deg 120deg,
            transparent 120deg 135deg,
            #caa969 135deg 150deg,
            transparent 150deg 165deg,
            #caa969 165deg 180deg,
            transparent 180deg 195deg,
            #caa969 195deg 210deg,
            transparent 210deg 225deg,
            #caa969 225deg 240deg,
            transparent 240deg 255deg,
            #caa969 255deg 270deg,
            transparent 270deg 285deg,
            #caa969 285deg 300deg,
            transparent 300deg 315deg,
            #caa969 315deg 330deg,
            transparent 330deg 345deg,
            #caa969 345deg 360deg
          );
          pointer-events: none;
        }
      `}</style>
      
      <div className="relative">
        {/* Rotating gear decoration - behind countdown */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rotating-gear relative">
            <div className="gear-teeth"></div>
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-golden/20 to-golden/10 border-4 border-golden/30"></div>
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
