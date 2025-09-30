"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

interface InvitationCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapsUrl: string;
  delay?: number;
  backgroundImage?: string;
}

export default function InvitationCard({
  title,
  date,
  time,
  location,
  address,
  mapsUrl,
  delay = 0,
  backgroundImage
}: InvitationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Elegant Card Container */}
      <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border-2 border-golden/40 shadow-2xl group-hover:shadow-golden/20 transition-all duration-500 overflow-hidden">
        
        {/* Background Image */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 rounded-3xl"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: 'sepia(20%) hue-rotate(15deg) saturate(0.8) brightness(1.1)',
            }}
          />
        )}
        
        {/* Background Overlay to maintain readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b2a4a]/60 via-[#0b2a4a]/40 to-[#0b2a4a]/60 rounded-3xl" />
        
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-golden/50 via-golden/80 to-golden/50 z-10"></div>
        
        {/* Subtle Pattern Background */}
        <div 
          className="absolute inset-0 opacity-5 z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23caa969' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative z-20 text-center">
          {/* Dancing Script Title */}
          <div className="mb-8">
            
            <h3 
              className="text-3xl md:text-4xl text-golden mb-2 foil-shimmer"
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
            >
              {title}
            </h3>
            
          
          </div>

          {/* Date with Playfair Display */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaCalendarAlt className="text-golden/80 text-lg" />
              <span className="w-8 h-px bg-golden/40"></span>
            </div>
            <p 
              className="text-2xl md:text-3xl text-ivory font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {date}
            </p>
          </div>

          {/* Time Details with Poppins */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FaClock className="text-golden/80 text-lg" />
              <div className="text-left">
                <p className="text-golden font-semibold font-sans text-sm uppercase tracking-wide">
                  Waktu
                </p>
                <p className="text-ivory text-lg font-medium font-sans">
                  {time}
                </p>
              </div>
            </div>

            {/* Thin Divider Line */}
            <div className="flex items-center justify-center my-6">
              <span className="h-px w-24 bg-gradient-to-r from-transparent via-golden/40 to-transparent"></span>
            </div>

            {/* Location with Icon */}
            <div className="flex items-center justify-center gap-3">
              <FaMapMarkerAlt className="text-golden/80 text-xl" />
              <div className="text-left">
                <p className="text-golden font-semibold font-sans text-sm uppercase tracking-wide">
                  Lokasi
                </p>
                <p className="text-ivory text-lg font-medium font-sans leading-tight">
                  {location}
                </p>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-golden/20">
            <p className="text-ivory/90 text-sm md:text-base leading-relaxed font-sans">
              {address}
            </p>
          </div>

          {/* Google Maps Button - Rounded Navy Style */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.open(mapsUrl, '_blank');
            }}
            className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans flex items-center justify-center gap-3"
          >
            <FaMapMarkerAlt className="text-lg" />
            <span>Lihat di Google Maps</span>
          </motion.button>

          {/* Bottom Decorative Element */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-golden/40"></span>
            <span className="text-golden/60 text-xs">✦</span>
            <span className="w-4 h-px bg-golden/40"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}