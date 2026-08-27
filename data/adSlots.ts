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
  row: number;
  col: number;
  colSpan: number;
  shopierUrl?: string;
}

export const adSlots: AdSlot[] = [
  // --- ÜST SIRA (6 EŞİT ALAN: $160, $160, $190, $190, $160, $160) ---
  {
    id: "slot-1",
    name: "Alan 1",
    sizeLabel: "ORTA",
    price: 160,
    status: "available",
    description: "Sol üst köşe reklam alanı.",
    visibility: "Yüksek",
    gridArea: "top-1",
    row: 1,
    col: 1,
    colSpan: 1,
  },
  {
    id: "slot-2",
    name: "Alan 2",
    sizeLabel: "ORTA",
    price: 160,
    status: "available",
    description: "Sol üst iç reklam alanı.",
    visibility: "Yüksek",
    gridArea: "top-2",
    row: 1,
    col: 2,
    colSpan: 1,
  },
  {
    id: "slot-3",
    name: "Alan 3",
    sizeLabel: "BÜYÜK",
    price: 190,
    status: "available",
    description: "Üst vitrin sol reklam alanı (Apple logosunun hemen üstü).",
    visibility: "Premium",
    gridArea: "top-3",
    row: 1,
    col: 3,
    colSpan: 1,
  },
  {
    id: "slot-4",
    name: "Alan 4",
    sizeLabel: "BÜYÜK",
    price: 190,
    status: "available",
    description: "Üst vitrin sağ reklam alanı (Apple logosunun hemen üstü).",
    visibility: "Premium",
    gridArea: "top-4",
    row: 1,
    col: 4,
    colSpan: 1,
  },
  {
    id: "slot-5",
    name: "Alan 5",
    sizeLabel: "ORTA",
    price: 160,
    status: "available",
    description: "Sağ üst iç reklam alanı.",
    visibility: "Yüksek",
    gridArea: "top-5",
    row: 1,
    col: 5,
    colSpan: 1,
  },
  {
    id: "slot-6",
    name: "Alan 6",
    sizeLabel: "ORTA",
    price: 160,
    status: "available",
    description: "Sağ üst köşe reklam alanı.",
    visibility: "Yüksek",
    gridArea: "top-6",
    row: 1,
    col: 6,
    colSpan: 1,
  },

  // --- ORTA SIRA (4 ALAN: APPLE LOGOSU SOLUNDA 2, SAĞINDA 2: $140, $150, $150, $140) ---
  {
    id: "slot-7",
    name: "Alan 7",
    sizeLabel: "KÜÇÜK",
    price: 140,
    status: "available",
    description: "Sol kenar orta reklam alanı.",
    visibility: "Orta",
    gridArea: "mid-1",
    row: 2,
    col: 1,
    colSpan: 1,
  },
  {
    id: "slot-8",
    name: "Alan 8",
    sizeLabel: "KÜÇÜK",
    price: 150,
    status: "available",
    description: "Logo solundaki prestijli reklam alanı.",
    visibility: "Yüksek",
    gridArea: "mid-2",
    row: 2,
    col: 2,
    colSpan: 1,
  },
  {
    id: "slot-9",
    name: "Alan 9",
    sizeLabel: "KÜÇÜK",
    price: 150,
    status: "available",
    description: "Logo sağındaki prestijli reklam alanı.",
    visibility: "Yüksek",
    gridArea: "mid-3",
    row: 2,
    col: 5,
    colSpan: 1,
  },
  {
    id: "slot-10",
    name: "Alan 10",
    sizeLabel: "KÜÇÜK",
    price: 140,
    status: "available",
    description: "Sağ kenar orta reklam alanı.",
    visibility: "Orta",
    gridArea: "mid-4",
    row: 2,
    col: 6,
    colSpan: 1,
  },

  // --- ALT SIRA (6 EŞİT ALAN: $135, $135, $155, $155, $135, $135) ---
  {
    id: "slot-11",
    name: "Alan 11",
    sizeLabel: "KÜÇÜK",
    price: 135,
    status: "available",
    description: "Sol alt köşe reklam alanı.",
    visibility: "Orta",
    gridArea: "bot-1",
    row: 3,
    col: 1,
    colSpan: 1,
  },
  {
    id: "slot-12",
    name: "Alan 12",
    sizeLabel: "KÜÇÜK",
    price: 135,
    status: "available",
    description: "Sol alt iç reklam alanı.",
    visibility: "Orta",
    gridArea: "bot-2",
    row: 3,
    col: 2,
    colSpan: 1,
  },
  {
    id: "slot-13",
    name: "Alan 13",
    sizeLabel: "ORTA",
    price: 155,
    status: "available",
    description: "Alt orta sol reklam alanı (Apple logosunun hemen altı).",
    visibility: "Yüksek",
    gridArea: "bot-3",
    row: 3,
    col: 3,
    colSpan: 1,
  },
  {
    id: "slot-14",
    name: "Alan 14",
    sizeLabel: "ORTA",
    price: 155,
    status: "available",
    description: "Alt orta sağ reklam alanı (Apple logosunun hemen altı).",
    visibility: "Yüksek",
    gridArea: "bot-4",
    row: 3,
    col: 4,
    colSpan: 1,
  },
  {
    id: "slot-15",
    name: "Alan 15",
    sizeLabel: "KÜÇÜK",
    price: 135,
    status: "available",
    description: "Sağ alt iç reklam alanı.",
    visibility: "Orta",
    gridArea: "bot-5",
    row: 3,
    col: 5,
    colSpan: 1,
  },
  {
    id: "slot-16",
    name: "Alan 16",
    sizeLabel: "KÜÇÜK",
    price: 135,
    status: "available",
    description: "Sağ alt köşe reklam alanı.",
    visibility: "Orta",
    gridArea: "bot-6",
    row: 3,
    col: 6,
    colSpan: 1,
  },
];

export const TOTAL_GOAL = 2415.97;
export const MACBOOK_PRICE = 2415.97;
export const MACBOOK_PRICE_TL = 116249.0;

export const getTotalCollected = (): number => {
  return adSlots
    .filter((slot) => slot.status === "sold")
    .reduce((sum, slot) => sum + slot.price, 0);
};

export const getSoldSlots = (): AdSlot[] => {
  return adSlots.filter((slot) => slot.status === "sold");
};

export const getProgressPercentage = (): number => {
  const collected = getTotalCollected();
  return Math.min(Math.round((collected / MACBOOK_PRICE) * 100), 100);
};

