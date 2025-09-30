"use client";
import { useState } from "react";

export default function RSVPForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [showGiftModal, setShowGiftModal] = useState(false);

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
            <input id="nama" name="nama" required className="w-full rounded-md bg-blue-900/60 border border-blue-200/20 px-3 py-2 text-blue-50 placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-amber-300" placeholder="Nama lengkap" />
          </div>
          
          {/* Gift Info Section */}
          <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-200/10">
            <p className="text-blue-100 text-sm mb-2">
              Jika tidak sempat hadir, Anda dapat memberikan 
              <button 
                type="button"
                onClick={() => setShowGiftModal(true)}
                className="text-amber-300 hover:text-amber-200 font-semibold underline decoration-amber-300/50 hover:decoration-amber-200 transition-colors ml-1"
              >
                gift
              </button>
            </p>
          </div>
          
          <div>
            <label className="block text-blue-100 mb-1" htmlFor="pesan">Ucapan</label>
            <textarea id="pesan" name="pesan" rows={4} className="w-full rounded-md bg-blue-900/60 border border-blue-200/20 px-3 py-2 text-blue-50 placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-amber-300" placeholder="Tulis ucapan untuk pasangan" />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <button type="submit" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-amber-400 text-blue-950 font-semibold shadow hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400">
            <span aria-hidden>⚓</span>
            Kirim RSVP
          </button>
          {status && <p className="text-emerald-300">{status}</p>}
        </div>
      </form>

      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-blue-900/90 to-blue-800/90 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-md w-full border border-golden/30 shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-golden mb-2 font-serif foil-shimmer">
                Wedding Gift
              </h3>
              <div className="h-px w-16 bg-golden/40 mx-auto mb-6"></div>
              
              <div className="space-y-4 text-left">
                <div className="bg-white/10 rounded-lg p-4 border border-golden/20">
                  <p className="text-blue-100 text-sm font-semibold mb-1">Nama Penerima:</p>
                  <p className="text-golden font-medium">Ananda & Pasangan</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 border border-golden/20">
                  <p className="text-blue-100 text-sm font-semibold mb-1">Nomor Rekening:</p>
                  <p className="text-golden font-mono font-medium">1234567890</p>
                  <p className="text-blue-200/80 text-xs mt-1">Bank BCA</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('1234567890');
                    alert('Nomor rekening berhasil disalin!');
                  }}
                  className="flex-1 bg-golden hover:bg-golden/90 text-blue-950 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Salin Rekening
                </button>
                <button
                  onClick={() => setShowGiftModal(false)}
                  className="flex-1 bg-blue-700 hover:bg-blue-600 text-blue-100 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
