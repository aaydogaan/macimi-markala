"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function JourneySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F5F5F7] overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1D1D1F] tracking-tight leading-tight whitespace-pre-line">
            {t.journey.title}
          </h2>

          {/* Places list */}
          <div className="mt-10 space-y-3">
            {t.journey.places.map((place, index) => (
              <motion.p
                key={place}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-[clamp(1.05rem,1.8vw,1.35rem)] text-[#86868B]"
              >
                {place}
              </motion.p>
            ))}
          </div>

          {/* Highlight quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14"
          >
            <p className="text-[clamp(1.15rem,2vw,1.45rem)] font-semibold text-[#1D1D1F] leading-relaxed max-w-2xl mx-auto">
              {t.journey.quote}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
