export type SlotStatus = "available" | "sold";
export type SlotSize = "BÜYÜK" | "ORTA" | "KÜÇÜK";

export interface AdSlot {
  id: string;
  name: string;
  sizeLabel: SlotSize;
  price: number;
  status: SlotStatus;
  brand?: string;
  brandBg?: string;
  brandLogoText?: string;
  description: string;
  visibility: "Düşük" | "Orta" | "Yüksek" | "Premium";
  gridArea: string;
}

export const adSlots: AdSlot[] = [
  // --- ÜST SIRA (3 BÜYÜK ALAN) ---
  {
    id: "slot-1",
    name: "Alan 1",
    sizeLabel: "BÜYÜK",
    price: 400,
    status: "available",
    description: "Sol üst büyük reklam alanı. İlk bakışta yüksek dikkat çeker.",
    visibility: "Yüksek",
    gridArea: "top-left",
  },
  {
    id: "slot-2",
    name: "Alan 2",
    sizeLabel: "BÜYÜK",
    price: 650,
    status: "available",
    description: "Üst orta en prestijli büyük reklam alanı.",
    visibility: "Premium",
    gridArea: "top-center",
  },
  {
    id: "slot-3",
    name: "Alan 3",
    sizeLabel: "BÜYÜK",
    price: 400,
    status: "available",
    description: "Sağ üst büyük alan. Geniş marka görünürlüğü sağlar.",
    visibility: "Yüksek",
    gridArea: "top-right",
  },

  // --- ORTA SIRA (SOLDA 2 KÜÇÜK, SAĞDA 2 KÜÇÜK) ---
  {
    id: "slot-4",
    name: "Alan 4",
    sizeLabel: "KÜÇÜK",
    price: 125,
    status: "available",
    description: "Sol kenar kompakt reklam alanı.",
    visibility: "Orta",
    gridArea: "mid-left-1",
  },
  {
    id: "slot-5",
    name: "Alan 5",
    sizeLabel: "KÜÇÜK",
    price: 150,
    status: "available",
    description: "Logo yanındaki sol kompakt reklam alanı.",
    visibility: "Yüksek",
    gridArea: "mid-left-2",
  },
  {
    id: "slot-6",
    name: "Alan 6",
    sizeLabel: "KÜÇÜK",
    price: 150,
    status: "available",
    description: "Logo yanındaki sağ kompakt reklam alanı.",
    visibility: "Yüksek",
    gridArea: "mid-right-1",
  },
  {
    id: "slot-7",
    name: "Alan 7",
    sizeLabel: "KÜÇÜK",
    price: 125,
    status: "available",
    description: "Sağ kenar kompakt reklam alanı.",
    visibility: "Orta",
    gridArea: "mid-right-2",
  },

  // --- ALT SIRA (3 ORTA ALAN) ---
  {
    id: "slot-8",
    name: "Alan 8",
    sizeLabel: "ORTA",
    price: 200,
    status: "available",
    description: "Sol alt orta ölçekli dengeli reklam alanı.",
    visibility: "Orta",
    gridArea: "bot-left",
  },
  {
    id: "slot-9",
    name: "Alan 9",
    sizeLabel: "ORTA",
    price: 250,
    status: "available",
    description: "Alt orta merkezi ve simetrik reklam alanı.",
    visibility: "Yüksek",
    gridArea: "bot-center",
  },
  {
    id: "slot-10",
    name: "Alan 10",
    sizeLabel: "ORTA",
    price: 200,
    status: "available",
    description: "Sağ alt orta ölçekli reklam alanı.",
    visibility: "Orta",
    gridArea: "bot-right",
  },
];

export const MACBOOK_PRICE = 2415.97;

export function getSoldSlots(): AdSlot[] {
  return adSlots.filter((slot) => slot.status === "sold");
}

export function getAvailableSlots(): AdSlot[] {
  return adSlots.filter((slot) => slot.status === "available");
}

export function getTotalCollected(): number {
  return getSoldSlots().reduce((sum, slot) => sum + slot.price, 0);
}

export function getProgressPercentage(): number {
  const collected = getTotalCollected();
  return Math.min(Math.round((collected / MACBOOK_PRICE) * 100), 100);
}
