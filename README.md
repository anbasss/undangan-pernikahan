<div align="center">

# 💍 Undangan Pernikahan Digital 💒

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&duration=3000&pause=1000&color=FF69B4&center=true&vCenter=true&multiline=true&width=600&height=100&lines=Welcome+to+Our+Wedding+Invitation!;Selamat+Datang+di+Undangan+Kami!" alt="Typing SVG" />

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180.0-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

### ✨ Undangan Pernikahan Digital Interaktif dengan Animasi 3D ✨

*An Interactive Digital Wedding Invitation with 3D Animations*

</div>

---

## 🌟 Tentang Proyek | About Project

Sebuah website undangan pernikahan modern yang menampilkan:
- 🎨 **Animasi 3D Interaktif** menggunakan React Three Fiber
- 💫 **Transisi Smooth** dengan Framer Motion & GSAP
- 🎵 **Pemutar Musik** otomatis
- ⏱️ **Countdown Timer** menuju hari bahagia
- 📍 **Peta Lokasi** terintegrasi
- ✉️ **Form RSVP** untuk konfirmasi kehadiran
- 📱 **Responsive Design** di semua perangkat
- 🚀 **Performance Optimized** untuk pengalaman terbaik

<div align="center">

## 🎯 Fitur Utama | Key Features

</div>

<table>
<tr>
<td width="50%">

### 💝 Fitur Pernikahan
- ⛵ Scene 3D dengan kapal (Boat Viewer)
- 💌 Kartu undangan interaktif
- 📖 Cerita cinta pasangan
- 🎊 Detail acara pernikahan
- 🗓️ Countdown menuju hari H
- 🎁 Gift & wishes section

</td>
<td width="50%">

### 🔧 Fitur Teknis
- ⚡ Next.js 15 dengan Turbopack
- 🎨 Tailwind CSS 4
- 🎬 Framer Motion animations
- 🎮 React Three Fiber (3D)
- 🎯 TypeScript untuk type safety
- 📱 Fully responsive design

</td>
</tr>
</table>

<div align="center">

## 🛠️ Tech Stack

<img src="https://skillicons.dev/icons?i=nextjs,react,typescript,threejs,tailwind,vercel&theme=dark" />

</div>

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework dengan App Router |
| **React 19** | UI library |
| **TypeScript** | Type-safe development |
| **React Three Fiber** | 3D graphics & animations |
| **@react-three/drei** | 3D helpers & utilities |
| **Framer Motion** | Smooth animations |
| **GSAP** | Advanced animations |
| **Tailwind CSS 4** | Utility-first styling |
| **React Icons** | Icon library |

---

## 🚀 Getting Started

### Prerequisites

Pastikan Anda sudah menginstall:
- Node.js 20.x atau lebih tinggi
- npm, yarn, pnpm, atau bun

### Installation

```bash
# Clone repository
git clone https://github.com/anbasss/undangan-pernikahan.git

# Masuk ke direktori project
cd undangan-pernikahan

# Install dependencies
npm install
# atau
yarn install
# atau
pnpm install
```

### Development

```bash
# Jalankan development server
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

Anda dapat mulai mengedit halaman dengan memodifikasi `app/page.tsx`. Halaman akan otomatis terupdate saat Anda mengedit file.

### Build for Production

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm start
```

### Linting

```bash
# Jalankan ESLint
npm run lint
```

---

## 📁 Struktur Proyek | Project Structure

```
undangan-pernikahan/
├── 📂 app/
│   ├── 📂 api/              # API routes
│   ├── 📂 components/       # React components
│   │   ├── AudioPlayer.tsx
│   │   ├── BoatViewer.tsx
│   │   ├── Countdown.tsx
│   │   ├── EventDetails.tsx
│   │   ├── HeroScene.tsx
│   │   ├── IntroOverlay.tsx
│   │   ├── InvitationCard.tsx
│   │   ├── MapSection.tsx
│   │   ├── RSVPForm.tsx
│   │   ├── ShareBar.tsx
│   │   ├── StorySection.tsx
│   │   ├── ThankYouSection.tsx
│   │   ├── WeddingEvents.tsx
│   │   └── WeFoundLove.tsx
│   ├── 📂 hooks/           # Custom React hooks
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── 📂 public/              # Static assets
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 next.config.ts
└── 📄 README.md
```

---

## 🎨 Customization

### Mengubah Data Pasangan

Edit file `app/page.tsx` untuk mengubah:
- Nama mempelai
- Tanggal & waktu acara
- Lokasi acara
- Foto & video
- Musik latar

### Mengubah Tema Warna

Sesuaikan warna di `app/globals.css` dan konfigurasi Tailwind CSS.

### Menambah/Mengurangi Fitur

Tambahkan atau hapus komponen di `app/components/` sesuai kebutuhan.

---

<div align="center">

## 🌐 Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anbasss/undangan-pernikahan)

Cara termudah untuk deploy aplikasi Next.js adalah menggunakan [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Lihat [dokumentasi deployment Next.js](https://nextjs.org/docs/app/building-your-application/deploying) untuk detail lebih lanjut.

</div>

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 License

Project ini dilisensikan dengan MIT License - lihat file [LICENSE](LICENSE) untuk detail.

---

<div align="center">

## 💖 Made with Love

<img src="https://user-images.githubusercontent.com/74038190/216122041-518ac897-8d92-4c6b-9b3f-ca01dcaf38ee.png" width="200" />

### ⭐ Jangan lupa beri bintang jika project ini membantu Anda!

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="500">

---

**Dibuat dengan** ❤️ **oleh** [anbasss](https://github.com/anbasss)

[![GitHub followers](https://img.shields.io/github/followers/anbasss?style=social)](https://github.com/anbasss)
[![GitHub stars](https://img.shields.io/github/stars/anbasss/undangan-pernikahan?style=social)](https://github.com/anbasss/undangan-pernikahan/stargazers)

</div>
