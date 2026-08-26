"use client";

import { motion } from "framer-motion";
import { adSlots } from "@/data/adSlots";
import { Eye, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AdAreasProps {
  onSelectSlot?: (slotId: string) => void;
}

export default function AdAreas({ onSelectSlot }: AdAreasProps) {
  const { t } = useLanguage();

  const scrollToMacbook = (slotId: string) => {
    const el = document.getElementById("macbook-display");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onSelectSlot?.(slotId);
  };

  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-white"
      id="reklam-alanlari"
    >
      <div className="mx-auto max-w-5xl xl:max-w-6xl px-6 lg:px-8">
        {/* Section Title - Harmonized */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1D1D1F] tracking-tight leading-tight">
            {t.adAreas.title}
          </h2>
          <p className="mt-3 text-[clamp(1rem,1.8vw,1.2rem)] font-medium text-[#86868B] max-w-xl mx-auto leading-relaxed">
            {t.adAreas.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {adSlots.map((slot, index) => {
            const isSold = slot.status === "sold";
            const sizeText =
              slot.sizeLabel === "BÜYÜK"
                ? t.macbook.large
                : slot.sizeLabel === "ORTA"
                ? t.macbook.medium
                : t.macbook.small;

            return (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`p-6 rounded-3xl transition-all duration-300 group cursor-pointer border border-black/[0.04]
                  ${
                    isSold
                      ? "bg-[#1D1D1F] hover:bg-[#2D2D2F]"
                      : "bg-[#F5F5F7] hover:bg-white hover:shadow-xl hover:scale-[1.02]"
                  }
                `}
                onClick={() => scrollToMacbook(slot.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p
                      className={`text-[12px] font-semibold uppercase tracking-wider ${
                        isSold ? "text-white/50" : "text-[#86868B]"
                      }`}
                    >
                      {slot.name} ({sizeText})
                    </p>
                    <p
                      className={`text-[26px] font-bold tracking-tight mt-0.5 ${
                        isSold
                          ? "text-white/30 line-through"
                          : "text-[#1D1D1F]"
                      }`}
                    >
                      ${slot.price.toLocaleString("en-US")}
                    </p>
                  </div>
                  {isSold ? (
                    <span className="px-3 py-1 text-[11px] font-medium bg-white/10 text-white/80 rounded-full">
                      {t.adAreas.sold}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/60">
                      {t.adAreas.available}
                    </span>
                  )}
                </div>

                <div
                  className={`flex items-center gap-2 text-[13px] mb-5 ${
                    isSold ? "text-white/40" : "text-[#86868B]"
                  }`}
                >
                  <Eye size={14} />
                  <span>{slot.visibility} {t.adAreas.visibility}</span>
                  <span className="text-black/20">·</span>
                  <span>{sizeText}</span>
                </div>

                {isSold ? (
                  <div className="flex items-center gap-2 text-white/50 text-[13px]">
                    {slot.brand}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#1D1D1F] group-hover:gap-2.5 transition-all duration-300">
                    {t.adAreas.inspectArea}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
