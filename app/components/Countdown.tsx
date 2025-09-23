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
      <div className="wheel mx-auto">
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
      <p className="mt-3 text-blue-100">Hitung mundur menuju hari bahagia</p>
    </div>
  );
}
