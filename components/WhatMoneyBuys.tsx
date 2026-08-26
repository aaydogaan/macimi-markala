"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function WhatMoneyBuys() {
  const { t } = useLanguage();

  const specs = [
    {
      label: t.whatMoneyBuys.chip,
      value: t.whatMoneyBuys.chipVal,
    },
    {
      label: t.whatMoneyBuys.memory,
      value: t.whatMoneyBuys.memoryVal,
    },
    {
      label: t.whatMoneyBuys.storage,
      value: t.whatMoneyBuys.storageVal,
    },
    {
      label: t.whatMoneyBuys.display,
      value: t.whatMoneyBuys.displayVal,
    },
    {
      label: t.whatMoneyBuys.keyboard,
      value: t.whatMoneyBuys.keyboardVal,
    },
    {
      label: t.whatMoneyBuys.box,
      value: t.whatMoneyBuys.boxVal,
    },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F5F5F7]" id="hedef-macbook">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Title - Harmonized */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1D1D1F] tracking-tight leading-tight">
            {t.whatMoneyBuys.title}
          </h2>
          <p className="mt-3 text-[clamp(1rem,1.8vw,1.2rem)] font-medium text-[#86868B] max-w-xl mx-auto leading-relaxed">
            {t.whatMoneyBuys.subtitle}
          </p>
        </motion.div>

        {/* Specs Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-3xl p-7 sm:p-10 shadow-sm border border-black/[0.06]"
        >
          {/* Card Header: Model + 2 Currencies */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-black/[0.06]">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F]">
                {t.whatMoneyBuys.model}
              </h3>
              <p className="text-[14px] text-[#86868B] mt-1">
                {t.whatMoneyBuys.modelSub}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
                $2.415,97
              </div>
              <div className="text-[14px] font-medium text-[#86868B] mt-0.5">
                116.249,00 TL
              </div>
            </div>
          </div>

          {/* Specs Rows */}
          <div className="divide-y divide-black/[0.06]">
            {specs.map((item) => (
              <div
                key={item.label}
                className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 items-baseline"
              >
                <span className="text-[15px] text-[#86868B] font-normal">
                  {item.label}
                </span>
                <span className="sm:col-span-2 text-[15px] sm:text-[16px] text-[#1D1D1F] font-medium leading-relaxed">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Small Disclaimer / Context note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-[13px] sm:text-[14px] text-[#86868B] leading-relaxed text-center"
        >
          {t.whatMoneyBuys.disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
