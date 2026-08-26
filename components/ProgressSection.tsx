"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  getSoldSlots,
  getTotalCollected,
  getProgressPercentage,
  MACBOOK_PRICE,
  adSlots,
} from "@/data/adSlots";

export default function ProgressSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [animatedAmount, setAnimatedAmount] = useState(0);

  const soldCount = getSoldSlots().length;
  const totalCollected = getTotalCollected();
  const progressPercent = getProgressPercentage();

  useEffect(() => {
    if (isInView) {
      // Animate progress bar
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        setAnimatedProgress(Math.round(eased * progressPercent));
        setAnimatedAmount(Math.round(eased * totalCollected));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, progressPercent, totalCollected]);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          {/* Target Price */}
          <p className="text-[13px] font-medium text-[#86868B] uppercase tracking-wider mb-3">
            MacBook Hedefi
          </p>
          <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#1D1D1F] tracking-tight leading-none">
            ${MACBOOK_PRICE.toLocaleString("en-US")}
          </p>

          {/* Collected */}
          <div className="mt-10 mb-4">
            <p className="text-[13px] text-[#86868B] mb-1">
              Reklamlardan toplanan
            </p>
            <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-[#1D1D1F]">
              ${animatedAmount.toLocaleString("en-US")}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-lg mx-auto">
            <div className="w-full h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1D1D1F] rounded-full"
                initial={{ width: 0 }}
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[13px] text-[#86868B]">
                %{animatedProgress}
              </span>
              <span className="text-[13px] text-[#86868B]">
                {soldCount} / {adSlots.length} reklam alanı satıldı
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
