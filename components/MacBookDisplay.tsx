"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adSlots, AdSlot as AdSlotType } from "@/data/adSlots";
import { useLanguage } from "@/context/LanguageContext";
import AdSlotPanel from "./AdSlotPanel";

// Exact corner percentages from original brandmymac.com
const CORNER_TOP_LEFT = [33.67, 16.4];
const CORNER_TOP_RIGHT = [97.05, 1.75];
const CORNER_BOT_RIGHT = [91.18, 74.3];
const CORNER_BOT_LEFT = [28.66, 96.39];

// 2D Perspective Projection (Homography) to 3D CSS Matrix3D transform
function getHomographyMatrix(width: number, height: number): string | undefined {
  if (!width || !height) return undefined;

  const [i, n] = [(CORNER_TOP_LEFT[0] / 100) * width, (CORNER_TOP_LEFT[1] / 100) * height];
  const [a, o] = [(CORNER_TOP_RIGHT[0] / 100) * width, (CORNER_TOP_RIGHT[1] / 100) * height];
  const [l, h] = [(CORNER_BOT_RIGHT[0] / 100) * width, (CORNER_BOT_RIGHT[1] / 100) * height];
  const [u, c] = [(CORNER_BOT_LEFT[0] / 100) * width, (CORNER_BOT_LEFT[1] / 100) * height];

  const d = a - l;
  const p = u - l;
  const f = i - a + l - u;
  const m = o - h;
  const g = c - h;
  const y = n - o + h - c;

  const b = d * g - p * m;
  const v = b ? (f * g - p * y) / b : 0;
  const w = b ? (d * y - f * m) / b : 0;

  const matrix = [
    (a - i + v * a) / 1000,
    (o - n + v * o) / 1000,
    0,
    v / 1000,
    (u - i + w * u) / 700,
    (c - n + w * c) / 700,
    0,
    w / 700,
    0,
    0,
    1,
    0,
    i,
    n,
    0,
    1,
  ];

  return `matrix3d(${matrix.map((num) => +num.toFixed(6)).join(",")})`;
}

export default function MacBookDisplay() {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<"live" | "final">("live");
  const [selectedSlot, setSelectedSlot] = useState<AdSlotType | null>(null);
  
  // Persistent map of slotId -> logoDataUrl
  const [uploadedLogos, setUploadedLogos] = useState<Record<string, string>>({});

  // Container dimensions for 3D homography calculation
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  const [mockupDimensions, setMockupDimensions] = useState({ w: 0, h: 0 });

  const updateDimensions = useCallback(() => {
    if (!mockupContainerRef.current) return;
    const { width, height } = mockupContainerRef.current.getBoundingClientRect();
    setMockupDimensions((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
  }, []);

  useEffect(() => {
    updateDimensions();
    const container = mockupContainerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      updateDimensions();
    });
    ro.observe(container);
    window.addEventListener("resize", updateDimensions);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions, viewMode]);

  // Load saved logos from localStorage and Supabase on mount
  useEffect(() => {
    // 1. LocalStorage
    try {
      const saved = localStorage.getItem("mac_uploaded_logos");
      if (saved) {
        setUploadedLogos(JSON.parse(saved));
      }
    } catch {
      // ignore
    }

    // 2. Fetch from Supabase
    const loadSupabaseLogos = async () => {
      try {
        const { fetchLiveReservations } = await import("@/services/supabaseService");
        const liveMap = await fetchLiveReservations();
        if (liveMap && Object.keys(liveMap).length > 0) {
          setUploadedLogos((prev) => {
            const merged = { ...prev };
            for (const [id, val] of Object.entries(liveMap)) {
              if (val.logoUrl) {
                merged[id] = val.logoUrl;
              }
            }
            return merged;
          });
        }
      } catch {
        // ignore
      }
    };
    loadSupabaseLogos();

    // 3. Realtime subscription
    let unsubscribe: (() => void) | undefined;
    import("@/services/supabaseService").then(({ subscribeToReservations }) => {
      unsubscribe = subscribeToReservations(() => {
        loadSupabaseLogos();
      });
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const handleLogoUpload = (slotId: string, dataUrl: string | null) => {
    setUploadedLogos((prev) => {
      const updated = { ...prev };
      if (dataUrl) {
        updated[slotId] = dataUrl;
      } else {
        delete updated[slotId];
      }
      try {
        localStorage.setItem("mac_uploaded_logos", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleSlotClick = (slot: AdSlotType) => {
    setSelectedSlot(slot);
  };

  const handleClose = () => {
    setSelectedSlot(null);
  };

  const selectLabel = language === "tr" ? "Seç" : "Select";
  const matrix3dTransform = getHomographyMatrix(mockupDimensions.w, mockupDimensions.h);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 flex flex-col items-center" id="macbook-display">
      <div className="w-full max-w-[840px] flex flex-col items-center">
        {/* Main Display Box with Switchable View (Live Lid Grid vs Final 3D Look) */}
        <div className="relative w-full aspect-[1.44] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {viewMode === "live" ? (
              /* LIVE AUCTION / INTERACTIVE 16-SLOT GRID */
              <motion.div
                key="live-lid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-[18px] p-[8px] sm:rounded-[22px] sm:p-[12px]"
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

                {/* 6-Column, 3-Row Grid System (16 Slots: 6 Top, 4 Mid, 6 Bottom) */}
                <div
                  className="relative grid h-full gap-1.5 p-1 sm:gap-2.5 sm:p-2"
                  style={{
                    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                    gridTemplateRows: "minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 1fr)",
                  }}
                >
                  {adSlots.map((slot) => {
                    const isSelected = selectedSlot?.id === slot.id;
                    const slotLogo = uploadedLogos[slot.id];
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
                        style={{ gridColumn: `${slot.col} / span ${slot.colSpan}`, gridRow: slot.row }}
                        className="h-full w-full"
                      >
                        <button
                          type="button"
                          onClick={() => handleSlotClick(slot)}
                          className={`group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg sm:rounded-xl border border-dashed transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "border-blue-600 bg-blue-50/40 ring-2 ring-blue-600 shadow-md z-20"
                              : slotLogo
                              ? "border-black/35 bg-white/70 shadow-xs"
                              : "border-black/25 bg-black/[0.02] hover:border-black/45 hover:bg-black/[0.04]"
                          }`}
                        >
                          {/* Slot content */}
                          <span className="flex h-full w-full flex-col items-center justify-center gap-0.5 sm:gap-1 px-1 py-1 sm:px-1.5 sm:py-1.5 transition duration-200 group-hover:blur-[2px] group-focus-visible:blur-[2px]">
                            {slotLogo ? (
                              <span className="relative flex min-h-0 w-full flex-1 items-center justify-center p-0.5">
                                <img
                                  src={slotLogo}
                                  alt="Logo"
                                  className="max-h-[82%] max-w-[88%] object-contain drop-shadow-xs"
                                />
                              </span>
                            ) : isSold ? (
                              <span className="relative flex min-h-0 w-full flex-1 items-center justify-center p-0.5">
                                <span className="font-bold text-[11px] sm:text-xs text-black">
                                  {slot.brand}
                                </span>
                              </span>
                            ) : (
                              <span className="flex flex-col items-center justify-center">
                                <span className="text-[9px] sm:text-[11px] font-semibold tracking-wider text-black/45 uppercase leading-none">
                                  {sizeText}
                                </span>
                                <span className="shrink-0 text-[11px] sm:text-[14px] font-semibold tabular-nums leading-tight text-black/90 mt-0.5">
                                  ${slot.price}
                                </span>
                              </span>
                            )}
                          </span>

                          {/* Hover Action Pill */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                          >
                            <span className="rounded-full px-2.5 py-1 text-[10px] font-medium text-white sm:px-3.5 sm:text-[12px] bg-blue-600 shadow-sm">
                              {slotLogo ? (language === "tr" ? "Düzenle" : "Edit") : selectLabel}
                            </span>
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* EXACT MATHEMATICAL 3D HOMOGRAPHY PERSPECTIVE (16 Slots) */
              <motion.div
                key="final-look"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                ref={mockupContainerRef}
                className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
              >
                {/* Background 3D MacBook Pro Image */}
                <img
                  src="/images/macbook.webp"
                  alt="A MacBook Pro seen from behind"
                  className="block h-auto w-full max-h-full object-contain pointer-events-none drop-shadow-2xl"
                  onLoad={updateDimensions}
                />

                {/* Mathematical Matrix3D Homography Plane (1000px by 700px exactly mapped to lid) */}
                <div
                  aria-hidden={!matrix3dTransform}
                  className="pointer-events-none absolute left-0 top-0 origin-top-left z-20"
                  style={{
                    width: 1000,
                    height: 700,
                    transform: matrix3dTransform,
                    opacity: matrix3dTransform ? 1 : 0,
                  }}
                >
                  <div
                    className="grid h-full w-full gap-4 p-7"
                    style={{
                      gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                      gridTemplateRows: "minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 1fr)",
                    }}
                  >
                    {adSlots.map((slot) => {
                      const customLogo = uploadedLogos[slot.id];
                      // Inner middle slots offset slightly around Apple logo
                      const translateX = slot.row !== 2 ? 0 : slot.col <= 2 ? 20 : -20;

                      if (!customLogo) {
                        return (
                          <div
                            key={slot.id}
                            style={{
                              gridColumn: `${slot.col} / span ${slot.colSpan}`,
                              gridRow: slot.row,
                              transform: translateX ? `translateX(${translateX}%)` : undefined,
                            }}
                          />
                        );
                      }

                      const maxH = slot.sizeLabel === "BÜYÜK" ? 160 : slot.sizeLabel === "ORTA" ? 135 : 120;

                      return (
                        <div
                          key={slot.id}
                          style={{
                            gridColumn: `${slot.col} / span ${slot.colSpan}`,
                            gridRow: slot.row,
                            transform: translateX ? `translateX(${translateX}%)` : undefined,
                          }}
                          className="flex flex-col items-center justify-center gap-1"
                        >
                          <img
                            src={customLogo}
                            alt="Sticker Logo"
                            style={{
                              maxHeight: `${maxH}px`,
                              maxWidth: "90%",
                            }}
                            className="w-auto shrink-0 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live auction vs Final look Switch Pill Tab */}
        <div className="mt-6 flex flex-col items-center gap-2.5">
          <div className="inline-flex items-center p-1 bg-[#E5E5EA] border border-black/[0.06] rounded-full">
            <button
              type="button"
              onClick={() => setViewMode("live")}
              className={`relative px-4 sm:px-5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                viewMode === "live"
                  ? "bg-white text-[#1D1D1F] shadow-xs font-semibold"
                  : "text-[#1D1D1F]/60 hover:text-[#1D1D1F]"
              }`}
            >
              {t.macbook.liveTab}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("final")}
              className={`relative px-4 sm:px-5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                viewMode === "final"
                  ? "bg-white text-[#1D1D1F] shadow-xs font-semibold"
                  : "text-[#1D1D1F]/60 hover:text-[#1D1D1F]"
              }`}
            >
              {t.macbook.finalTab}
            </button>
          </div>

          {/* Subtitle Hint */}
          <p className="text-center text-[13px] text-[#86868B] font-normal">
            {viewMode === "live" ? t.macbook.liveHint : t.macbook.finalHint}
          </p>
        </div>
      </div>

      {/* Side Panel for Selected Slot */}
      <AdSlotPanel
        slot={selectedSlot}
        onClose={handleClose}
        onLogoUpload={(dataUrl) => {
          if (selectedSlot) {
            handleLogoUpload(selectedSlot.id, dataUrl);
          }
        }}
        uploadedLogo={selectedSlot ? uploadedLogos[selectedSlot.id] || null : null}
      />
    </section>
  );
}
