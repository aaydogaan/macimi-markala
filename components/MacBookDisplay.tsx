"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { adSlots, AdSlot as AdSlotType } from "@/data/adSlots";
import { useLanguage } from "@/context/LanguageContext";
import AdSlotPanel from "./AdSlotPanel";
import AppleLogo from "./AppleLogo";

interface SlotCardProps {
  slot: AdSlotType;
  isSelected: boolean;
  uploadedLogo: string | null;
  onClick: (slot: AdSlotType) => void;
  className?: string;
}

function SlotCard({
  slot,
  isSelected,
  uploadedLogo,
  onClick,
  className = "",
}: SlotCardProps) {
  const { t } = useLanguage();
  const isSold = slot.status === "sold";

  // Translate size label
  const sizeText =
    slot.sizeLabel === "BÜYÜK"
      ? t.macbook.large
      : slot.sizeLabel === "ORTA"
      ? t.macbook.medium
      : t.macbook.small;

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(slot)}
      className={`relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-200 cursor-pointer overflow-hidden text-center
        border border-dashed
        ${
          isSelected
            ? "border-[#1D1D1F] ring-2 ring-[#1D1D1F] bg-white/95 shadow-xl z-10"
            : "border-black/20 hover:border-black/45 bg-white/40 hover:bg-white/75 hover:shadow-lg"
        }
        ${className}
      `}
    >
      {/* Uploaded logo preview */}
      {uploadedLogo && isSelected ? (
        <div className="flex flex-col items-center justify-center w-full h-full p-2">
          <img
            src={uploadedLogo}
            alt="Logo Preview"
            className="max-w-[85%] max-h-20 sm:max-h-24 object-contain"
          />
          <span className="text-[11px] sm:text-xs text-[#1D1D1F]/70 mt-1.5 font-medium">
            {t.macbook.preview}
          </span>
        </div>
      ) : isSold ? (
        /* Sold Slot */
        <div className="flex flex-col items-center justify-center w-full h-full py-1">
          <div className="w-14 h-12 sm:w-22 sm:h-16 rounded-xl bg-white shadow-xs flex items-center justify-center mb-1.5">
            <span className="font-bold text-xs sm:text-sm text-[#1D1D1F]">
              {slot.brand}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-[#1D1D1F]/70 font-medium">
            ${slot.price.toLocaleString("en-US")}
          </span>
        </div>
      ) : (
        /* Available Slot */
        <div className="flex flex-col items-center justify-center py-2 sm:py-4">
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider text-[#1D1D1F]/70 uppercase">
            {sizeText}
          </span>
          <span className="text-[12px] sm:text-sm md:text-base font-medium text-[#1D1D1F]/90 mt-1">
            {t.macbook.fromPrefix}
            {slot.price.toLocaleString("en-US")}
            {t.macbook.fromSuffix}
          </span>
        </div>
      )}
    </motion.button>
  );
}

export default function MacBookDisplay() {
  const { t } = useLanguage();
  const [selectedSlot, setSelectedSlot] = useState<AdSlotType | null>(null);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  const handleSlotClick = (slot: AdSlotType) => {
    setSelectedSlot(slot);
    setUploadedLogo(null);
  };

  const handleClose = () => {
    setSelectedSlot(null);
    setUploadedLogo(null);
  };

  // Find slots
  const slot1 = adSlots.find((s) => s.id === "slot-1")!;
  const slot2 = adSlots.find((s) => s.id === "slot-2")!;
  const slot3 = adSlots.find((s) => s.id === "slot-3")!;
  const slot4 = adSlots.find((s) => s.id === "slot-4")!;
  const slot5 = adSlots.find((s) => s.id === "slot-5")!;
  const slot6 = adSlots.find((s) => s.id === "slot-6")!;
  const slot7 = adSlots.find((s) => s.id === "slot-7")!;
  const slot8 = adSlots.find((s) => s.id === "slot-8")!;
  const slot9 = adSlots.find((s) => s.id === "slot-9")!;
  const slot10 = adSlots.find((s) => s.id === "slot-10")!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24" id="macbook-display">
      <div className="mx-auto max-w-5xl xl:max-w-6xl">
        {/* MacBook Lid Container - Space Gray / Silver Metallic Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative bg-gradient-to-b from-[#EAEAEF] via-[#E2E2E8] to-[#D5D5DC] rounded-[28px] sm:rounded-[44px] p-4 sm:p-7 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)] border border-black/10"
        >
          {/* Subtle glossy bevel highlight inside lid */}
          <div className="absolute inset-0 rounded-[28px] sm:rounded-[44px] border border-white/70 pointer-events-none" />

          {/* GRID LAYOUT */}
          <div className="flex flex-col gap-3 sm:gap-5 md:gap-6 w-full">
            {/* ROW 1: 3 BÜYÜK / LARGE SLOTS */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6 h-28 sm:h-40 md:h-52">
              <SlotCard
                slot={slot1}
                isSelected={selectedSlot?.id === slot1.id}
                uploadedLogo={selectedSlot?.id === slot1.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
              <SlotCard
                slot={slot2}
                isSelected={selectedSlot?.id === slot2.id}
                uploadedLogo={selectedSlot?.id === slot2.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
              <SlotCard
                slot={slot3}
                isSelected={selectedSlot?.id === slot3.id}
                uploadedLogo={selectedSlot?.id === slot3.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
            </div>

            {/* ROW 2: 2 KÜÇÜK / SMALL + CENTER LOGO + 2 KÜÇÜK / SMALL */}
            <div className="grid grid-cols-5 gap-2.5 sm:gap-4 md:gap-5 h-28 sm:h-40 md:h-52 items-stretch">
              <SlotCard
                slot={slot4}
                isSelected={selectedSlot?.id === slot4.id}
                uploadedLogo={selectedSlot?.id === slot4.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
              <SlotCard
                slot={slot5}
                isSelected={selectedSlot?.id === slot5.id}
                uploadedLogo={selectedSlot?.id === slot5.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />

              {/* CENTER APPLE LOGO */}
              <div className="flex items-center justify-center p-2 sm:p-4">
                <AppleLogo className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#3A3A3C] drop-shadow-sm transition-transform hover:scale-105" />
              </div>

              <SlotCard
                slot={slot6}
                isSelected={selectedSlot?.id === slot6.id}
                uploadedLogo={selectedSlot?.id === slot6.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
              <SlotCard
                slot={slot7}
                isSelected={selectedSlot?.id === slot7.id}
                uploadedLogo={selectedSlot?.id === slot7.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
            </div>

            {/* ROW 3: 3 ORTA / MEDIUM SLOTS */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6 h-28 sm:h-40 md:h-52">
              <SlotCard
                slot={slot8}
                isSelected={selectedSlot?.id === slot8.id}
                uploadedLogo={selectedSlot?.id === slot8.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
              <SlotCard
                slot={slot9}
                isSelected={selectedSlot?.id === slot9.id}
                uploadedLogo={selectedSlot?.id === slot9.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
              <SlotCard
                slot={slot10}
                isSelected={selectedSlot?.id === slot10.id}
                uploadedLogo={selectedSlot?.id === slot10.id ? uploadedLogo : null}
                onClick={handleSlotClick}
                className="h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Small hint under MacBook */}
        <p className="text-center mt-5 text-[13px] sm:text-[14px] text-[#86868B] font-normal">
          {t.macbook.hint}
        </p>
      </div>

      {/* Side Panel for Selected Slot */}
      <AdSlotPanel
        slot={selectedSlot}
        onClose={handleClose}
        onLogoUpload={setUploadedLogo}
        uploadedLogo={uploadedLogo}
      />
    </section>
  );
}
