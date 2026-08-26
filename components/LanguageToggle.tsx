"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center p-0.5 bg-[#F5F5F7] border border-black/[0.08] rounded-full text-xs font-semibold">
      <button
        onClick={() => setLanguage("tr")}
        className={`relative px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer ${
          language === "tr" ? "text-[#1D1D1F]" : "text-[#86868B] hover:text-[#1D1D1F]"
        }`}
      >
        {language === "tr" && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-0 bg-white rounded-full shadow-xs border border-black/[0.04]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">TR</span>
      </button>

      <button
        onClick={() => setLanguage("en")}
        className={`relative px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer ${
          language === "en" ? "text-[#1D1D1F]" : "text-[#86868B] hover:text-[#1D1D1F]"
        }`}
      >
        {language === "en" && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-0 bg-white rounded-full shadow-xs border border-black/[0.04]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}
