"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { adSlots, AdSlot as AdSlotType } from "@/data/adSlots";
import { useLanguage } from "@/context/LanguageContext";
import AdSlotPanel from "./AdSlotPanel";

export default function MacBookDisplay() {
  const { t, language } = useLanguage();
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

  // Spot placement grid areas (Exact 6-column, 3-row grid layout from original site)
  const spotGridAreas: Record<string, string> = {
    "slot-1": "1 / 1 / auto / span 2",
    "slot-2": "1 / 3 / auto / span 2",
    "slot-3": "1 / 5 / auto / span 2",
    "slot-4": "2 / 1 / auto / span 1",
    "slot-5": "2 / 2 / auto / span 1",
    "slot-6": "2 / 5 / auto / span 1",
    "slot-7": "2 / 6 / auto / span 1",
    "slot-8": "3 / 1 / auto / span 2",
    "slot-9": "3 / 3 / auto / span 2",
    "slot-10": "3 / 5 / auto / span 2",
  };

  const selectLabel = language === "tr" ? "Seç" : "Select";

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 flex justify-center" id="macbook-display">
      <div className="w-full max-w-[840px]">
        {/* Exact Original MacBook Lid Container */}
        <div
          className="relative w-full rounded-[18px] p-[10px] sm:rounded-[22px]"
          style={{
            aspectRatio: "1.44",
            background:
              "linear-gradient(172deg, #ebebed 0%, #dcdce0 45%, #c8c8cf 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.18), 0 30px 60px -18px rgba(0,0,0,0.28), 0 12px 24px -12px rgba(0,0,0,0.18)",
          }}
        >
          {/* Radial light reflection overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                "radial-gradient(120% 90% at 30% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 42%, transparent 70%)",
            }}
          />

          {/* Center Apple Logo Overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div aria-hidden="true" className="w-[15.6%]">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-full text-[#3b3b3f] [filter:drop-shadow(0_1px_0_rgba(255,255,255,0.6))]"
              >
                <path
                  fill="currentColor"
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.033 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                />
              </svg>
            </div>
          </div>

          {/* 6-Column, 3-Row Grid System from original site */}
          <div
            className="relative grid h-full gap-2 p-2 sm:gap-3 sm:p-4"
            style={{
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gridTemplateRows: "minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 1fr)",
            }}
          >
            {adSlots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isSold = slot.status === "sold";

              const sizeText =
                slot.sizeLabel === "BÜYÜK"
                  ? t.macbook.large
                  : slot.sizeLabel === "ORTA"
                  ? t.macbook.medium
                  : t.macbook.small;

              return (
                <div
                  key={slot.id}
                  style={{ gridArea: spotGridAreas[slot.id] }}
                  className="h-full w-full"
                >
                  <button
                    type="button"
                    onClick={() => handleSlotClick(slot)}
                    className={`group relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-dashed transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/40 ring-2 ring-blue-600 shadow-md z-20"
                        : "border-black/25 bg-black/[0.02] hover:border-black/45 hover:bg-black/[0.04]"
                    }`}
                  >
                    {/* Normal slot content */}
                    <span className="flex h-full w-full flex-col items-center justify-center gap-1 px-1.5 py-2 transition duration-200 group-hover:blur-[2px] group-focus-visible:blur-[2px]">
                      {uploadedLogo && isSelected ? (
                        <span className="relative flex min-h-0 w-full flex-1 items-center justify-center p-1">
                          <img
                            src={uploadedLogo}
                            alt="Preview"
                            className="max-h-[80%] max-w-[88%] object-contain"
                          />
                        </span>
                      ) : isSold ? (
                        <span className="relative flex min-h-0 w-full flex-1 items-center justify-center p-1">
                          <span className="font-bold text-xs sm:text-sm text-black">
                            {slot.brand}
                          </span>
                        </span>
                      ) : (
                        <span className="flex flex-col items-center justify-center gap-1">
                          <span className="text-[10px] sm:text-[12px] font-semibold tracking-wider text-black/50 uppercase">
                            {sizeText}
                          </span>
                          <span className="shrink-0 text-[12px] sm:text-[15px] font-semibold tabular-nums leading-tight text-black/90">
                            {t.macbook.fromPrefix}
                            {slot.price.toLocaleString("en-US")}
                            {t.macbook.fromSuffix}
                          </span>
                        </span>
                      )}
                    </span>

                    {/* Hover Action Pill */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <span className="rounded-full px-3 py-1.5 text-[11px] font-medium text-white sm:px-4 sm:text-[13px] bg-blue-600 shadow-sm">
                        {selectLabel}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

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
