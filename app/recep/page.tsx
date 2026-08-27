"use client";

import { useState, useEffect } from "react";
import {
  fetchAllReservations,
  updateReservationStatus,
  deleteReservation,
  saveReservation,
  uploadLogo,
  ReservationData,
} from "@/services/supabaseService";
import { adSlots } from "@/data/adSlots";
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Trash2,
  Lock,
  Unlock,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Eye,
  Loader2,
} from "lucide-react";

export default function RecepAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Manual sponsor addition form state
  const [manualSlotId, setManualSlotId] = useState("slot-1");
  const [manualBrandName, setManualBrandName] = useState("");
  const [manualBrandUrl, setManualBrandUrl] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualFile, setManualFile] = useState<File | null>(null);
  const [isManualSubmitting, setIsManualSubmitting] = useState(false);

  // Check login from sessionStorage
  useEffect(() => {
    const auth = sessionStorage.getItem("recep_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadReservations();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "recep2026" || password === "admin2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("recep_admin_auth", "true");
      setErrorMsg("");
      loadReservations();
    } else {
      setErrorMsg("Hatalı yönetici şifresi! Tekrar deneyin.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("recep_admin_auth");
  };

  const loadReservations = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllReservations();
      setReservations(data);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: "sold" | "confirmed" | "rejected" | "pending") => {
    setActionLoadingId(id);
    try {
      const ok = await updateReservationStatus(id, newStatus);
      if (ok) {
        setReservations((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch {
      // ignore
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğinize emin misiniz?")) return;
    setActionLoadingId(id);
    try {
      const ok = await deleteReservation(id);
      if (ok) {
        setReservations((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {
      // ignore
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualBrandName.trim() || !manualFile) {
      alert("Lütfen marka adı ve logo dosyası seçin.");
      return;
    }

    setIsManualSubmitting(true);
    try {
      const logoUrl = await uploadLogo(manualFile, manualSlotId);
      const slotObj = adSlots.find((s) => s.id === manualSlotId);
      const amount = slotObj ? slotObj.price : 150;

      await saveReservation({
        slot_id: manualSlotId,
        brand_name: manualBrandName,
        brand_url: manualBrandUrl,
        logo_url: logoUrl,
        amount,
        contact_email: manualEmail,
        status: "sold", // Directly approved & locked
      });

      alert("Sponsor başarıyla kapağa kilitlendi ve yayınlandı!");
      setManualBrandName("");
      setManualBrandUrl("");
      setManualEmail("");
      setManualFile(null);
      loadReservations();
    } catch (err) {
      console.error(err);
      alert("Hata oluştu.");
    } finally {
      setIsManualSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-black/[0.06]">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
              <Lock size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-[#1D1D1F] mb-1">
            Recep Yönetici Girişi
          </h1>
          <p className="text-xs text-[#86868B] text-center mb-6">
            Mac&apos;imi Markala gizli yönetim paneli
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                Yönetici Şifresi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi girin..."
                className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm focus:border-black focus:outline-none"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Panele Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-2xl font-bold text-[#1D1D1F]">
                Recep — Sponsor Yönetim Paneli
              </h1>
            </div>
            <p className="text-xs text-[#86868B] mt-1">
              Shopier ödemelerini kontrol edin, logoları tek tıkla kapağa kilitleyin.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadReservations}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F5F7] rounded-xl text-xs font-semibold text-[#1D1D1F] hover:bg-black/10 transition-colors cursor-pointer"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              Yenile
            </button>
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors"
            >
              <Eye size={14} /> Siteyi Canlı Gör
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors cursor-pointer"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* 2 Column Layout: List vs Manual Add */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main Table: Gelen Siparişler & Talepler */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm">
              <h2 className="text-lg font-bold text-[#1D1D1F] mb-4 flex items-center justify-between">
                <span>Gelen Talepler & Siparişler</span>
                <span className="text-xs font-normal text-[#86868B]">
                  Toplam: {reservations.length} talep
                </span>
              </h2>

              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-[#86868B]">
                  <Loader2 size={32} className="animate-spin mb-2" />
                  <p className="text-xs">Yükleniyor...</p>
                </div>
              ) : reservations.length === 0 ? (
                <div className="py-12 text-center text-[#86868B]">
                  <p className="text-sm font-medium">Henüz gelen bir talep yok.</p>
                  <p className="text-xs mt-1">
                    Biri siteden Shopier ödemesi başlattığında burada görünecektir.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((item) => {
                    const isSold = item.status === "sold" || item.status === "confirmed";
                    const isPending = item.status === "pending";
                    const isActionLoading = actionLoadingId === item.id;
                    const slotInfo = adSlots.find((s) => s.id === item.slot_id);

                    return (
                      <div
                        key={item.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isSold
                            ? "bg-emerald-50/40 border-emerald-200"
                            : isPending
                            ? "bg-amber-50/30 border-amber-200/80"
                            : "bg-[#F5F5F7] border-black/10 opacity-60"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            {/* Logo Thumbnail */}
                            <div className="w-16 h-16 bg-white rounded-xl border border-black/10 p-1 flex items-center justify-center shrink-0">
                              <img
                                src={item.logo_url}
                                alt={item.brand_name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>

                            {/* Info */}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#1D1D1F] text-base">
                                  {item.brand_name}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black text-white">
                                  {slotInfo?.name || item.slot_id} (${item.amount})
                                </span>
                              </div>

                              {item.order_code && (
                                <p className="text-xs text-blue-600 font-mono font-semibold mt-0.5">
                                  Kod: {item.order_code}
                                </p>
                              )}

                              <div className="flex flex-wrap items-center gap-3 text-xs text-[#86868B] mt-1">
                                {item.contact_email && <span>📧 {item.contact_email}</span>}
                                {item.brand_url && (
                                  <a
                                    href={item.brand_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline flex items-center gap-0.5"
                                  >
                                    🌐 {item.brand_url} <ExternalLink size={10} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Status Badge & Actions */}
                          <div className="flex sm:flex-col items-end gap-2 w-full sm:w-auto justify-between">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                isSold
                                  ? "bg-emerald-600 text-white"
                                  : isPending
                                  ? "bg-amber-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {isSold ? "KAPAKTA YAYINDA (SATILDI)" : isPending ? "ÖDEME BEKLİYOR" : "REDDEDİLDİ"}
                            </span>

                            <div className="flex items-center gap-1.5 mt-1">
                              {item.id && (
                                <>
                                  {!isSold && (
                                    <button
                                      disabled={isActionLoading}
                                      onClick={() => handleStatusChange(item.id!, "sold")}
                                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                      title="Ödemesi alındı, kapağa kilitle"
                                    >
                                      <CheckCircle size={14} /> Onayla (Kapağa Bas)
                                    </button>
                                  )}

                                  {isSold && (
                                    <button
                                      disabled={isActionLoading}
                                      onClick={() => handleStatusChange(item.id!, "pending")}
                                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                      title="Onayı geri al"
                                    >
                                      <Unlock size={14} /> Geri Al
                                    </button>
                                  )}

                                  <button
                                    disabled={isActionLoading}
                                    onClick={() => handleDelete(item.id!)}
                                    className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors cursor-pointer"
                                    title="Sil"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Manuel Sponsor Ekleme Formu */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm">
              <h2 className="text-lg font-bold text-[#1D1D1F] mb-1 flex items-center gap-2">
                <PlusCircle size={20} className="text-black" />
                Manuel Sponsor Ekle
              </h2>
              <p className="text-xs text-[#86868B] mb-5">
                Elden / havale ile ödeme yapan markaları doğrudan kapağa kilitleyin.
              </p>

              <form onSubmit={handleManualAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                    Hangi Alana Yerleşecek?
                  </label>
                  <select
                    value={manualSlotId}
                    onChange={(e) => setManualSlotId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:border-black focus:outline-none"
                  >
                    {adSlots.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.sizeLabel} (${s.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                    Marka Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualBrandName}
                    onChange={(e) => setManualBrandName(e.target.value)}
                    placeholder="örn: Getir, Trendyol"
                    className="w-full px-3 py-2 rounded-xl border border-black/15 text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                    Web Sitesi (İsteğe bağlı)
                  </label>
                  <input
                    type="url"
                    value={manualBrandUrl}
                    onChange={(e) => setManualBrandUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-black/15 text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                    İletişim E-postası
                  </label>
                  <input
                    type="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="sponsor@sirket.com"
                    className="w-full px-3 py-2 rounded-xl border border-black/15 text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">
                    Logo Dosyası (PNG / SVG / JPG) *
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={(e) => setManualFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-[#86868B] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isManualSubmitting}
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isManualSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Kapağa Kilitle & Canlıya Al"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
