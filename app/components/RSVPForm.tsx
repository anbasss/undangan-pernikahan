"use client";
import { useState } from "react";

export default function RSVPForm() {
  const [status, setStatus] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // In a real app, send to API route
    console.log(Object.fromEntries(data.entries()));
    setStatus("Terima kasih! RSVP kamu sudah tercatat.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl bg-blue-900/40 rounded-2xl p-6 md:p-8 border border-blue-200/20">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-blue-100 mb-1" htmlFor="nama">Nama</label>
          <input id="nama" name="nama" required className="w-full rounded-md bg-blue-900/60 border border-blue-200/20 px-3 py-2 text-blue-50 placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-amber-300" placeholder="Nama lengkap" />
        </div>
        <div>
          <label className="block text-blue-100 mb-1" htmlFor="hadir">Kehadiran</label>
          <select id="hadir" name="hadir" className="w-full rounded-md bg-blue-900/60 border border-blue-200/20 px-3 py-2 text-blue-50 focus:outline-none focus:ring-2 focus:ring-amber-300">
            <option value="hadir">Hadir</option>
            <option value="tidak">Tidak dapat hadir</option>
          </select>
        </div>
        <div className="md:col-span-2">
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
  );
}
