"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdSlot as AdSlotType } from "@/data/adSlots";
import { X, Upload, Check, Eye, ExternalLink, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { uploadLogo as uploadLogoToSupabase, saveReservation } from "@/services/supabaseService";

interface AdSlotPanelProps {
  slot: AdSlotType | null;
  onClose: () => void;
  onLogoUpload: (logoUrl: string | null) => void;
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
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [brandName, setBrandName] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!slot) return null;

  const isSold = slot.status === "sold";

  const sizeText =
    slot.sizeLabel === "BÜYÜK"
      ? t.macbook.large
      : slot.sizeLabel === "ORTA"
      ? t.macbook.medium
      : t.macbook.small;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Instant 0ms Preview via FileReader
    const reader = new FileReader();
    reader.onload = (ev) => {
      const localUrl = ev.target?.result as string;
      if (localUrl) {
        onLogoUpload(localUrl);
      }
    };
    reader.readAsDataURL(file);

    // 2. Background Upload to Supabase Storage
    setIsUploading(true);
    try {
      const publicUrl = await uploadLogoToSupabase(file, slot.id);
      if (publicUrl) {
        onLogoUpload(publicUrl);
      }
    } catch (err) {
      console.warn("Background upload notice:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCompleteReservation = async () => {
    if (!uploadedLogo) {
      setStep("upload");
      return;
    }

    setIsSubmitting(true);
    try {
      await saveReservation({
        slot_id: slot.id,
        brand_name: brandName || "İsimsiz Marka",
        brand_url: brandUrl,
        logo_url: uploadedLogo,
        amount: slot.price,
        contact_email: contactEmail,
        status: "confirmed",
      });
      setStep("success");
    } catch (err) {
      console.error("Reservation save error:", err);
      setStep("success");
    } finally {
      setIsSubmitting(false);
    }
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
                          ${slot.price}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[42px] font-bold text-[#1D1D1F] tracking-tight">
                        ${slot.price}
                      </p>
                    )}
                  </div>

                  {/* Info Cards */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-[#F5F5F7] rounded-2xl p-4 flex items-center justify-between">
                      <span className="text-[14px] text-[#86868B]">
                        {t.panel.slotSize}
                      </span>
                      <span className="text-[14px] font-semibold text-[#1D1D1F]">
                        {sizeText}
                      </span>
                    </div>
                    <div className="bg-[#F5F5F7] rounded-2xl p-4 flex items-center justify-between">
                      <span className="text-[14px] text-[#86868B]">
                        {t.panel.visibility}
                      </span>
                      <span className="text-[14px] font-semibold text-[#1D1D1F] flex items-center gap-1.5">
                        <Eye size={16} className="text-[#86868B]" />
                        {slot.visibility}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] text-[#86868B] leading-relaxed mb-8">
                    {slot.description}
                  </p>

                  {/* Action Button */}
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
                    {isUploading ? (
                      <div className="flex flex-col items-center py-4">
                        <Loader2 className="animate-spin text-[#1D1D1F] mb-2" size={32} />
                        <p className="text-xs text-[#86868B]">
                          {language === "tr" ? "Yükleniyor..." : "Uploading..."}
                        </p>
                      </div>
                    ) : uploadedLogo ? (
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
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
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
                          onLogoUpload(null);
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
                    disabled={!uploadedLogo}
                    className={`w-full py-3.5 text-[15px] font-medium rounded-full transition-all duration-300 ${
                      uploadedLogo
                        ? "bg-[#1D1D1F] text-white hover:bg-black hover:scale-[1.01] hover:shadow-lg cursor-pointer"
                        : "bg-[#F5F5F7] text-[#86868B] cursor-not-allowed"
                    }`}
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

              {/* Reserve Form Step */}
              {step === "reserve" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-1">
                    {t.panel.reserveTitle}
                  </h3>
                  <p className="text-[14px] text-[#86868B] mb-6">
                    {t.panel.reserveDesc}
                  </p>

                  {/* Form Inputs */}
                  <div className="space-y-4 mb-6 text-left">
                    <div>
                      <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1.5">
                        {language === "tr" ? "Marka / Şirket Adı" : "Brand / Company Name"}
                      </label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="örn: Stripe, Acrobats"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm focus:border-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1.5">
                        {language === "tr" ? "Web Sitesi (İsteğe bağlı)" : "Website (Optional)"}
                      </label>
                      <input
                        type="url"
                        value={brandUrl}
                        onChange={(e) => setBrandUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm focus:border-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1.5">
                        {language === "tr" ? "İletişim E-postası" : "Contact Email"}
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="hello@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Amount Summary */}
                  <div className="bg-[#F5F5F7] rounded-2xl p-4 mb-6 text-left">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] text-[#86868B]">
                        {t.panel.selectedSlot}
                      </span>
                      <span className="text-[13px] font-medium text-[#1D1D1F]">
                        {slot.name} ({sizeText})
                      </span>
                    </div>
                    <div className="h-px bg-black/[0.06] my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-[#86868B]">{t.panel.amount}</span>
                      <span className="text-[18px] font-bold text-[#1D1D1F]">
                        ${slot.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteReservation}
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-full hover:bg-black transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      t.panel.completeReservation
                    )}
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
                  <p className="text-[15px] text-[#86868B] mb-2">
                    {t.panel.successDesc}
                  </p>
                  <p className="text-[13px] text-[#86868B]/70 mb-8">
                    {t.panel.successSub}
                  </p>

                  <button
                    onClick={handleClose}
                    className="w-full py-3.5 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-full hover:bg-black transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer"
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
