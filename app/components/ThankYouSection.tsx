"use client";
import { motion } from "framer-motion";

export default function ThankYouSection() {
  return (
    <section className="relative py-16 px-6 md:px-12 max-w-4xl mx-auto">
      {/* Background texture */}
      <div 
        aria-hidden 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Elegant border decoration */}
          <div className="absolute inset-0 rounded-3xl border-4 border-dashed border-golden/30"></div>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-golden rounded-full opacity-60"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-golden rounded-full opacity-60"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-golden rounded-full opacity-60"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-golden rounded-full opacity-60"></div>
          
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-golden/30 shadow-2xl">
            {/* Decorative lines at top */}
            <div className="flex items-center justify-center gap-4 text-golden mb-8">
              <span aria-hidden className="h-px w-16 bg-golden/40" />
              <span aria-hidden className="text-2xl">⚓</span>
              <span aria-hidden className="h-px w-16 bg-golden/40" />
            </div>
            
            {/* Thank you message */}
            <div className="space-y-6 text-ivory">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl font-sans leading-relaxed"
              >
                Kami Yang Berbahagia
              </motion.p>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="font-serif text-3xl md:text-4xl text-golden foil-shimmer"
              >
                Andi Baso Patau & Andi Amparita
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl font-sans leading-relaxed space-y-2"
              >
                <p>Atas kehadiran dan doa restunya</p>
                <p>kami ucapkan terima kasih</p>
              </motion.div>
            </div>
            
            {/* Decorative lines at bottom */}
            <div className="flex items-center justify-center gap-4 text-golden mt-8">
              <span aria-hidden className="h-px w-16 bg-golden/40" />
              <span aria-hidden className="text-2xl">⚓</span>
              <span aria-hidden className="h-px w-16 bg-golden/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}