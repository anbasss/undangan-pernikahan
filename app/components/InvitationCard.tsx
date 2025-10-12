"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

interface InvitationCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapsUrl: string;
  delay?: number;
  backgroundImage?: string;
  direction?: "left" | "right" | "up";
}

export default function InvitationCard({
  title,
  date,
  time,
  location,
  address,
  mapsUrl,
  delay = 0,
  backgroundImage,
  direction = "up",
}: InvitationCardProps) {
  const performanceMode = usePerformanceMode();
  const isLowPerformance = performanceMode === "low";
  const isBalancedPerformance = performanceMode === "balanced";
  const shouldAnimate = !isLowPerformance;

  const motionInitial =
    direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : { opacity: 0, y: 30 };

  const motionDuration = isLowPerformance ? 0.6 : isBalancedPerformance ? 0.75 : 0.9;
  const hoverScale = isLowPerformance ? 1.015 : 1.03;
  const containerBlur = isLowPerformance ? "backdrop-blur-sm" : "backdrop-blur-md";
  const containerShadow = isLowPerformance
    ? "group-hover:shadow-[0_10px_24px_rgba(var(--gold-rgb),0.16)]"
    : "group-hover:shadow-[0_18px_40px_rgba(var(--gold-rgb),0.22)]";
  const containerClassName = `relative bg-gradient-to-br from-white/15 to-white/5 ${containerBlur} rounded-3xl p-8 border-2 border-[rgba(var(--gold-rgb),0.35)] shadow-2xl ${containerShadow} transition-all duration-500 overflow-hidden`;
  const buttonSpring = {
    type: "spring" as const,
    stiffness: isLowPerformance ? 180 : isBalancedPerformance ? 200 : 220,
    damping: isLowPerformance ? 18 : 16,
    delay: delay + 0.4,
  };

  return (
    <motion.div
      initial={shouldAnimate ? motionInitial : undefined}
      whileInView={shouldAnimate ? { opacity: 1, y: 0, x: 0 } : undefined}
      transition={shouldAnimate ? { duration: motionDuration, delay, ease: "easeOut" } : undefined}
      viewport={shouldAnimate ? { once: true, margin: "0px 0px -12% 0px" } : undefined}
      className="relative group"
      style={shouldAnimate ? undefined : { opacity: 1 }}
    >
      {/* Elegant Card Container */}
      <div className={containerClassName} style={{ willChange: "transform, box-shadow" }}>
        {/* Background Image */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              opacity: 0.6,
              filter: "sepia(6%) hue-rotate(6deg) saturate(1) brightness(1) contrast(1)",
            }}
          />
        )}

        {/* Background Overlay to maintain readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e34]/65 via-[#0b2a4a]/48 to-[#0f2d4d]/38 rounded-3xl" />

        {/* Radial vignette to keep text legible while revealing photo */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(11,42,74,0.18) 0%, rgba(11,42,74,0.4) 75%, rgba(9,24,42,0.55) 100%)",
          }}
        />

        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgba(var(--gold-rgb),0.45)] via-[rgba(var(--gold-rgb),0.7)] to-[rgba(var(--gold-rgb),0.45)] z-10"></div>

        {/* Subtle Pattern Background */}
        <div
          className="absolute inset-0 opacity-5 z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cbb98a' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-20 text-center">
          {/* Dancing Script Title */}
          <div className="mb-8">
            <h3
              className="text-3xl md:text-4xl text-golden mb-2 foil-shimmer font-script font-bold"
            >
              {title}
            </h3>

            <div className="flex items-center justify-center gap-3 text-golden-soft">
              <span
                aria-hidden
                className="h-px w-12 bg-gradient-to-r from-transparent via-[rgba(var(--gold-rgb),0.5)] to-transparent"
              />
              <span aria-hidden className="text-sm">✶</span>
              <span
                aria-hidden
                className="h-px w-12 bg-gradient-to-r from-transparent via-[rgba(var(--gold-rgb),0.5)] to-transparent"
              />
            </div>
          </div>

          {/* Date with Playfair Display */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaCalendarAlt className="text-golden-muted text-lg" />
              <span className="w-8 h-px bg-[rgba(var(--gold-rgb),0.35)]"></span>
            </div>
            <p
              className="text-2xl md:text-3xl text-ivory font-bold leading-tight font-display"
            >
              {date}
            </p>
          </div>

          {/* Time Details with Poppins */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FaClock className="text-golden-muted text-lg" />
              <div className="text-left">
                <p className="text-golden font-semibold font-sans text-sm uppercase tracking-wide">
                  Waktu
                </p>
                <p className="text-ivory text-lg font-medium font-sans">{time}</p>
              </div>
            </div>

            {/* Thin Divider Line */}
            <div className="flex items-center justify-center my-6">
              <span className="h-px w-24 bg-gradient-to-r from-transparent via-[rgba(var(--gold-rgb),0.3)] to-transparent"></span>
            </div>

            {/* Location with Icon */}
            <div className="flex items-center justify-center gap-3">
              <FaMapMarkerAlt className="text-golden-muted text-xl" />
              <div className="text-left">
                <p className="text-golden font-semibold font-sans text-sm uppercase tracking-wide">
                  Lokasi
                </p>
                <p className="text-ivory text-lg font-medium font-sans leading-tight">{location}</p>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-[rgba(var(--gold-rgb),0.25)]">
            <p className="text-ivory/90 text-sm md:text-base leading-relaxed font-sans">{address}</p>
          </div>

          {/* Google Maps Button - Rounded Navy Style */}
          <motion.button
            initial={shouldAnimate ? { opacity: 0, y: 18, scale: 0.95 } : undefined}
            whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
            viewport={shouldAnimate ? { once: true } : undefined}
            transition={shouldAnimate ? buttonSpring : undefined}
            whileHover={{ scale: hoverScale, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              window.open(mapsUrl, "_blank");
            }}
            className="w-full bg-gradient-to-r from-[#0b1e34] via-[#123c67] to-[rgba(var(--gold-rgb),0.78)] hover:via-[rgba(var(--gold-rgb),0.85)] text-ivory font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-[0_14px_30px_rgba(var(--gold-rgb),0.25)] transition-all duration-500 font-sans flex items-center justify-center gap-3 border border-[rgba(var(--gold-rgb),0.35)]"
          >
            <FaMapMarkerAlt className="text-lg" />
            <span>Lihat di Google Maps</span>
          </motion.button>

          {/* Bottom Decorative Element */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-[rgba(var(--gold-rgb),0.35)]"></span>
            <span className="text-golden-soft text-xs">✦</span>
            <span className="w-4 h-px bg-[rgba(var(--gold-rgb),0.35)]"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}