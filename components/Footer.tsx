"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1D1D1F] text-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col items-center text-center">
          {/* Logo Title */}
          <p className="text-[17px] font-semibold tracking-tight text-white">
            {t.header.logo}
          </p>

          <p className="mt-2 text-[14px] text-white/50 max-w-md leading-relaxed">
            {t.footer.desc}
          </p>

          {/* Legal / Disclaimer Notice */}
          <div className="mt-8 pt-8 border-t border-white/[0.08] max-w-2xl">
            <p className="text-[12px] sm:text-[13px] text-white/40 leading-relaxed">
              {t.footer.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
