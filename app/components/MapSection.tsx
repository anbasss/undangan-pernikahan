"use client";

export default function MapSection() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="nautical-frame rounded-2xl overflow-hidden aspect-[16/9]">
        <iframe
          title="Lokasi Acara"
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.164229785526!2d106.827153!3d-6.241586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1fa4a9c0a3f%3A0x84e8d8e7a997a00!2sJakarta!5e0!3m2!1sen!2sid!4v1683878100000"
          aria-label="Peta lokasi acara"
        />
      </div>
      <p className="text-center text-blue-100 mt-3">Bingkai peta bergaya nautical</p>
    </div>
  );
}
