"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t.header.navHow, href: "#nasil-calisiyor" },
    { label: t.header.navSlots, href: "#reklam-alanlari" },
    { label: t.header.navFaq, href: "#sss" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo with Icon */}
          <a
            href="#"
            className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#1D1D1F] hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/logo-small.webp"
              alt="Mac'imi Markala Logo"
              className="w-5 h-5 object-contain"
            />
            <span>{t.header.logo}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions: Lang Switcher + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <a
              href="#reklam-alanlari"
              className="inline-flex items-center px-4 py-1.5 text-[13px] font-medium text-white bg-[#1D1D1F] rounded-full hover:bg-black transition-colors duration-200"
            >
              {t.header.cta}
            </a>
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1 text-[#1D1D1F]"
              aria-label="Menüyü aç"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-black/[0.06] overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[15px] text-[#1D1D1F] hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reklam-alanlari"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-4 py-2 text-[14px] font-medium text-white bg-[#1D1D1F] rounded-full hover:bg-black transition-colors mt-1"
              >
                {t.header.cta}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
