"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Eye, Layers, Check } from "lucide-react";
import { AdSlot } from "@/data/adSlots";
import { useLanguage } from "@/context/LanguageContext";

interface AdSlotPanelProps {
  slot: AdSlot | null;
  onClose: () => void;
  onLogoUpload: (dataUrl: string) => void;
  uploadedLogo: string | null;
}

type PanelStep = "detail" | "upload" | "reserve" | "success";

export default function AdSlotPanel({
  slot,
  onClose,
  onLogoUpload,
  uploadedLogo,
}: AdSlotPanelProps) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<PanelStep>("detail");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!slot) return null;

  const isSold = slot.status === "sold";

  const sizeText =
    slot.sizeLabel === "BÜYÜK"
      ? t.macbook.large
      : slot.sizeLabel === "ORTA"
      ? t.macbook.medium
      : t.macbook.small;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onLogoUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setStep("detail");
    onClose();
  };

  return (
    <AnimatePresence>
      {slot && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] bg-white z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-[13px] text-[#86868B] font-medium uppercase tracking-wider">
                    {isSold ? t.panel.soldSlot : t.panel.availableSlot}
                  </p>
                  <h2 className="text-2xl font-bold text-[#1D1D1F] mt-1">
                    {slot.name} ({sizeText})
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                  aria-label="Kapat"
                >
                  <X size={20} className="text-[#86868B]" />
                </button>
              </div>

              {/* Detail Step */}
              {step === "detail" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Price */}
                  <div className="mb-8">
                    {isSold ? (
                      <div>
                        <div className="inline-flex items-center px-3 py-1 bg-[#1D1D1F] text-white text-[13px] font-medium rounded-full">
                          {t.adAreas.sold} — {slot.brand}
                        </div>
                        <p className="mt-3 text-[32px] font-bold text-[#1D1D1F]/30 line-through">
                          ${slot.price.toLocaleString("en-US")}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[42px] font-bold text-[#1D1D1F] tracking-tight">
                        ${slot.price.toLocaleString("en-US")}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[15px] text-[#86868B] leading-relaxed mb-8">
                    {slot.description}
                  </p>

                  {/* Info Cards */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 p-3.5 bg-[#F5F5F7] rounded-xl">
                      <Layers size={18} className="text-[#86868B]" />
                      <div>
                        <p className="text-[12px] text-[#86868B]">{t.panel.slotSize}</p>
                        <p className="text-[14px] font-medium text-[#1D1D1F]">
                          {sizeText}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 bg-[#F5F5F7] rounded-xl">
                      <Eye size={18} className="text-[#86868B]" />
                      <div>
                        <p className="text-[12px] text-[#86868B]">{t.panel.visibility}</p>
                        <p className="text-[14px] font-medium text-[#1D1D1F]">
                          {slot.visibility}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  {!isSold && (
                    <button
                      onClick={() => setStep("upload")}
                      className="w-full py-3.5 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-full hover:bg-black transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer"
                    >
                      {t.panel.chooseSlot}
                    </button>
                  )}
                </motion.div>
              )}

              {/* Upload Step */}
              {step === "upload" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">
                    {t.panel.uploadTitle}
                  </h3>
                  <p className="text-[14px] text-[#86868B] mb-6">
                    {t.panel.uploadDesc}
                  </p>

                  {/* Upload Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#1D1D1F]/15 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#1D1D1F]/35 hover:bg-[#F5F5F7]/50 transition-all duration-300 mb-4"
                  >
                    {uploadedLogo ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={uploadedLogo}
                          alt="Logo preview"
                          className="max-w-[140px] max-h-[100px] object-contain mb-3 drop-shadow-xs"
                        />
                        <p className="text-[13px] text-[#86868B] font-medium">
                          {t.panel.changeLogo}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload
                          size={32}
                          className="text-[#86868B]/50 mb-3"
                        />
                        <p className="text-[14px] font-medium text-[#1D1D1F]">
                          {t.panel.uploadAction}
                        </p>
                        <p className="text-[12px] text-[#86868B] mt-1">
                          {t.panel.uploadSub}
                        </p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {uploadedLogo && (
                    <div className="flex items-center justify-between mb-6 px-1">
                      <p className="text-[13px] text-[#86868B]">
                        {t.panel.previewNote}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLogoUpload("");
                        }}
                        className="text-[12px] font-medium text-red-500 hover:text-red-600 hover:underline cursor-pointer"
                      >
                        {language === "tr" ? "Logoyu Kaldır" : "Remove Logo"}
                      </button>
                    </div>
                  )}

                  {/* Reserve Button */}
                  <button
                    onClick={() => setStep("reserve")}
                    className="w-full py-3.5 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-full hover:bg-black transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer"
                  >
                    {t.panel.reserveButton}
                  </button>

                  <button
                    onClick={() => setStep("detail")}
                    className="w-full py-3 text-[14px] text-[#86868B] hover:text-[#1D1D1F] transition-colors mt-2 cursor-pointer"
                  >
                    {t.panel.backButton}
                  </button>
                </motion.div>
              )}

              {/* Reserve Step */}
              {step === "reserve" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F7] rounded-full flex items-center justify-center">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">
                    {t.panel.reserveTitle}
                  </h3>
                  <p className="text-[14px] text-[#86868B] mb-8">
                    {t.panel.reserveDesc}
                  </p>

                  <div className="bg-[#F5F5F7] rounded-2xl p-5 mb-8 text-left">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[13px] text-[#86868B]">
                        {t.panel.selectedSlot}
                      </span>
                      <span className="text-[14px] font-medium text-[#1D1D1F]">
                        {slot.name} ({sizeText})
                      </span>
                    </div>
                    <div className="h-px bg-black/[0.06]" />
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[13px] text-[#86868B]">{t.panel.amount}</span>
                      <span className="text-[18px] font-bold text-[#1D1D1F]">
                        ${slot.price.toLocaleString("en-US")}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("success")}
                    className="w-full py-3.5 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-full hover:bg-black transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer"
                  >
                    {t.panel.completeReservation}
                  </button>

                  <button
                    onClick={() => setStep("upload")}
                    className="w-full py-3 text-[14px] text-[#86868B] hover:text-[#1D1D1F] transition-colors mt-2 cursor-pointer"
                  >
                    {t.panel.backButton}
                  </button>
                </motion.div>
              )}

              {/* Success Step */}
              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="w-20 h-20 mx-auto mb-6 bg-[#1D1D1F] rounded-full flex items-center justify-center"
                  >
                    <Check size={36} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">
                    {t.panel.congratsTitle}
                  </h3>
                  <p className="text-[15px] text-[#86868B] mb-3">
                    {t.panel.successDesc}
                  </p>
                  <p className="text-[13px] text-[#86868B]/70 mb-8">
                    {t.panel.successSub}
                  </p>

                  <div className="bg-[#F5F5F7] rounded-2xl p-5 mb-8">
                    <p className="text-[14px] font-medium text-[#1D1D1F]">
                      {slot.name} ({sizeText}) — ${slot.price.toLocaleString("en-US")}
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-3.5 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-full hover:bg-black transition-all duration-300 cursor-pointer"
                  >
                    {t.panel.closeButton}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
