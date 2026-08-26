"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function StorySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white" id="nasil-calisiyor">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1D1D1F] tracking-tight leading-tight">
            {t.story.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-[#F5F5F7] rounded-3xl p-8 sm:p-12 md:p-14 space-y-6 text-center max-w-3xl mx-auto border border-black/[0.04]"
        >
          <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-[#1D1D1F]/80 leading-relaxed">
            {t.story.p1}
          </p>
          <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-[#1D1D1F]/80 leading-relaxed">
            {t.story.p2}
          </p>
          <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-[#1D1D1F]/80 leading-relaxed">
            {t.story.p3}
          </p>
          <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-[#1D1D1F]/80 leading-relaxed">
            {t.story.p4}
          </p>
          <div className="pt-2">
            <p className="text-[clamp(1.15rem,2vw,1.4rem)] font-semibold text-[#1D1D1F] leading-relaxed">
              {t.story.p5}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
