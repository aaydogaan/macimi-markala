"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  MACBOOK_PRICE,
  getTotalCollected,
  getSoldSlots,
  adSlots,
  getProgressPercentage,
} from "@/data/adSlots";

export default function Hero() {
  const { t } = useLanguage();
  const soldCount = getSoldSlots().length;
  const totalCollected = getTotalCollected();
  const progressPercent = getProgressPercentage();

  return (
    <section className="pt-24 pb-4 sm:pt-28 sm:pb-6 text-center max-w-5xl mx-auto px-6 flex flex-col items-center">
      {/* Live Visitors Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F5F5F7] border border-black/[0.06] rounded-full text-[13px] text-[#1D1D1F]/80 mb-4"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-medium text-[#1D1D1F]">
          {t.hero.visitorBadge}
        </span>
        <span className="text-[#86868B] font-bold">·</span>
        <span className="text-[#86868B]">{t.hero.totalBadge}</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold tracking-tight leading-[1.08] text-[#1D1D1F]"
      >
        {t.hero.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.12,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mt-3 text-[clamp(1.05rem,2vw,1.35rem)] font-medium text-[#86868B] max-w-xl mx-auto leading-relaxed"
      >
        {t.hero.subtitle}
      </motion.p>

      {/* Compact MacBook Target Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mt-5 mb-2 w-full max-w-lg bg-white/90 backdrop-blur-sm border border-black/[0.08] shadow-xs rounded-2xl px-5 py-3.5 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between text-[12px] sm:text-[13px]">
          <div className="flex items-center gap-1.5 font-semibold text-[#1D1D1F]">
            <span className="text-[#86868B] font-normal">{t.hero.targetLabel}</span>
            <span>${MACBOOK_PRICE.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#1D1D1F]">
            <span className="text-[#86868B]">{t.hero.collectedLabel}</span>
            <span className="font-semibold text-emerald-600">
              ${totalCollected.toLocaleString("en-US")}
            </span>
            <span className="text-[11px] text-[#86868B]">
              ({soldCount}/{adSlots.length} {t.hero.slotsSoldLabel})
            </span>
          </div>
        </div>

        {/* Mini sleek progress bar */}
        <div className="w-full h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="h-full bg-[#1D1D1F] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
