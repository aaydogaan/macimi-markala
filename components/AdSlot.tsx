"use client";

import { motion } from "framer-motion";
import { AdSlot as AdSlotType } from "@/data/adSlots";

interface AdSlotProps {
  slot: AdSlotType;
  isSelected: boolean;
  uploadedLogo?: string | null;
  onClick: (slot: AdSlotType) => void;
  className?: string;
}

export default function AdSlot({
  slot,
  isSelected,
  uploadedLogo,
  onClick,
  className = "",
}: AdSlotProps) {
  const isSold = slot.status === "sold";

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(slot)}
      className={`relative flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden text-center
        border border-dashed
        ${
          isSelected
            ? "border-[#1D1D1F] ring-2 ring-[#1D1D1F] bg-white/90 shadow-lg z-10"
            : "border-black/25 hover:border-black/50 bg-white/35 hover:bg-white/65 hover:shadow-md"
        }
        ${className}
      `}
    >
      {/* Uploaded logo preview */}
      {uploadedLogo && isSelected ? (
        <div className="flex flex-col items-center justify-center w-full h-full p-1">
          <img
            src={uploadedLogo}
            alt="Logo Önizleme"
            className="max-w-[80%] max-h-16 sm:max-h-20 object-contain"
          />
          <span className="text-[10px] sm:text-xs text-[#1D1D1F]/60 mt-1 font-medium">
            Önizleme
          </span>
        </div>
      ) : isSold ? (
        /* Sold Slot */
        <div className="flex flex-col items-center justify-center w-full h-full py-1">
          <div
            className={`w-12 h-10 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-lg flex items-center justify-center shadow-xs mb-1 sm:mb-1.5 transition-transform group-hover:scale-105
              ${
                slot.brandBg === "black"
                  ? "bg-[#0b0f19] text-white"
                  : "bg-white text-[#1D1D1F]"
              }
            `}
          >
            {slot.brand === "RISITI" ? (
              <span className="font-extrabold tracking-widest text-[11px] sm:text-sm md:text-base">
                RISITI
              </span>
            ) : slot.brand === "o2" ? (
              <div className="flex items-center gap-1 font-bold text-sky-400 text-sm sm:text-lg">
                <span className="tracking-tighter">c2</span>
              </div>
            ) : (
              <span className="font-bold text-[10px] sm:text-xs md:text-sm tracking-wide">
                {slot.brandLogoText || slot.brand}
              </span>
            )}
          </div>
          <span className="text-[9px] sm:text-xs text-[#1D1D1F]/70 font-medium">
            ${slot.price.toLocaleString("en-US")}
          </span>
        </div>
      ) : (
        /* Available Slot */
        <div className="flex flex-col items-center justify-center py-2">
          <span className="text-[9px] sm:text-[11px] md:text-xs font-semibold tracking-wider text-[#1D1D1F]/65 uppercase">
            {slot.sizeLabel}
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm font-medium text-[#1D1D1F]/85 mt-0.5">
            ${slot.price.toLocaleString("en-US")}
          </span>
        </div>
      )}
    </motion.button>
  );
}
