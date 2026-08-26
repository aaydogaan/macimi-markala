"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white" id="sss">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1D1D1F] tracking-tight leading-tight">
            {t.faq.title}
          </h2>
        </motion.div>

        <div className="space-y-0 divide-y divide-black/[0.06] border-t border-b border-black/[0.06]">
          {t.faq.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
              >
                <span className="text-[16px] sm:text-[17px] font-medium text-[#1D1D1F] pr-6 group-hover:text-black transition-colors">
                  {item.question}
                </span>
                <span className="flex-shrink-0 text-[#86868B]">
                  {openIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[15px] sm:text-[16px] text-[#86868B] leading-relaxed pr-10">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
