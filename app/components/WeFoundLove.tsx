"use client";
import { motion } from "framer-motion";

export default function WeFoundLove() {
  return (
    <section className="relative py-16 px-6 md:px-12 max-w-6xl mx-auto">
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
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-golden foil-shimmer mb-4">
            We Found Love
          </h2>
          <div className="flex items-center justify-center gap-4 text-blue-100/60">
            <span aria-hidden className="h-px w-16 bg-golden/40" />
            <span aria-hidden className="h-px w-16 bg-golden/40" />
          </div>
        </motion.div>

        {/* Ayat Al-Quran */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 relative"
        >
          {/* Nautical border decoration */}
          <div className="absolute inset-0 rounded-3xl border-4 border-dashed border-golden/30"></div>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-golden rounded-full opacity-60"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-golden rounded-full opacity-60"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-golden rounded-full opacity-60"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-golden rounded-full opacity-60"></div>
          
          <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-golden/30 shadow-2xl">
            <div className="text-right mb-6 font-arabic text-xl md:text-2xl leading-relaxed text-golden">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </div>
            <div className="text-ivory/90 text-sm md:text-base leading-relaxed mb-4 font-sans">
              &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.&rdquo;
            </div>
            <div className="text-golden font-semibold font-sans">QS Ar Rum : 21</div>
          </div>
        </motion.div>

        {/* Bride & Groom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-golden mb-6">
            Bride & Groom
          </h3>
          <p className="text-ivory/80 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-8 font-sans">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, Kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri Resepsi Pernikahan kami
          </p>
        </motion.div>

        {/* Couple Details */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-golden/20 via-transparent to-golden/10 p-0.5">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"></div>
            </div>
            
            <div className="relative text-center p-8 border border-golden/30 rounded-3xl shadow-2xl group-hover:shadow-golden/20 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-golden/30 to-golden/10 flex items-center justify-center text-2xl">
                </div>
                <h4 className="font-serif text-3xl md:text-4xl text-golden foil-shimmer mb-2">
                  Andi Baso Patau
                </h4>
                <p className="text-ivory font-medium text-lg font-sans">
                  Putra dari
                </p>
              </div>
              <div className="text-ivory/80 text-sm leading-relaxed font-sans">
                <p className="font-semibold">Bapak [Nama Ayah] &</p>
                <p className="font-semibold">Ibu [Nama Ibu]</p>
              </div>
              
              {/* Decorative rope line */}
              <div className="mt-6 pt-4 border-t border-dashed border-golden/30 flex items-center justify-center gap-2">
                <span className="w-4 h-px bg-golden/40"></span>
                <span className="w-4 h-px bg-golden/40"></span>
              </div>
            </div>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-golden/20 via-transparent to-golden/10 p-0.5">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"></div>
            </div>
            
            <div className="relative text-center p-8 border border-golden/30 rounded-3xl shadow-2xl group-hover:shadow-golden/20 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-golden/30 to-golden/10 flex items-center justify-center text-2xl">
                </div>
                <h4 className="font-serif text-3xl md:text-4xl text-golden foil-shimmer mb-2">
                  Andi Amparita
                </h4>
                <p className="text-ivory font-medium text-lg font-sans">
                  Putri dari
                </p>
              </div>
              <div className="text-ivory/80 text-sm leading-relaxed font-sans">
                <p className="font-semibold">Bapak [Nama Ayah] &</p>
                <p className="font-semibold">Ibu [Nama Ibu]</p>
              </div>
              
              {/* Decorative rope line */}
              <div className="mt-6 pt-4 border-t border-dashed border-golden/30 flex items-center justify-center gap-2">
                <span className="w-4 h-px bg-golden/40"></span>
                <span className="w-4 h-px bg-golden/40"></span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
