"use client";
import { useEffect, useRef, useState } from "react";

export default function RSVPForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  function onCopyAccount() {
    navigator.clipboard.writeText("715050405").then(() => {
      setCopied(true);
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
      copyResetRef.current = setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(false);
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // In a real app, send to API route
    console.log(Object.fromEntries(data.entries()));
    setStatus("Terima kasih! RSVP kamu sudah tercatat.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mx-auto max-w-3xl bg-blue-900/40 rounded-2xl p-6 md:p-8 border border-blue-200/20">
        <div className="grid gap-4">
          <div>
            <label className="block text-blue-100 mb-1" htmlFor="nama">Nama</label>
            <input id="nama" name="nama" required className="w-full rounded-md bg-blue-900/60 border border-blue-200/20 px-3 py-2 text-blue-50 placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-[rgba(var(--gold-rgb),0.45)]" placeholder="Nama lengkap" />
          </div>
          
          {/* Gift Info Section */}
          <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-200/10 space-y-3">
            <p className="text-blue-100 text-sm">
              Jika tidak sempat hadir, Anda dapat berbagi tanda kasih melalui rekening berikut.
            </p>
            <div className="bg-blue-900/50 rounded-lg border border-blue-200/20 p-4 space-y-3">
              <div>
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Nama Penerima</p>
                <p className="text-golden font-medium">Andi B. Patau Naga Uleng</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Nomor Rekening</p>
                  <p className="text-golden font-mono text-lg">715050405</p>
                  <p className="text-blue-200/80 text-xs">Bank BNI</p>
                </div>
                <button
                  type="button"
                  onClick={onCopyAccount}
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--gold-bright)] px-4 py-2 text-sm font-semibold text-blue-950 shadow hover:bg-[rgba(var(--gold-rgb),0.85)] focus:outline-none focus:ring-2 focus:ring-[rgba(var(--gold-rgb),0.4)] focus:ring-offset-2"
                >
                  {copied ? "Tersalin" : "Salin"}
                </button>
              </div>
              
            </div>
          </div>
          
          <div>
            <label className="block text-blue-100 mb-1" htmlFor="pesan">Ucapan</label>
            <textarea id="pesan" name="pesan" rows={4} className="w-full rounded-md bg-blue-900/60 border border-blue-200/20 px-3 py-2 text-blue-50 placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-[rgba(var(--gold-rgb),0.45)]" placeholder="Tulis ucapan untuk pasangan" />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <button type="submit" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[var(--gold-bright)] text-blue-950 font-semibold shadow hover:bg-[rgba(var(--gold-rgb),0.85)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(var(--gold-rgb),0.4)]">
            <span aria-hidden>⚓</span>
            Kirim RSVP
          </button>
          {status && <p className="text-emerald-300">{status}</p>}
        </div>
      </form>

    </>
  );
}
