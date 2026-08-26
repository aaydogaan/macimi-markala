"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "tr" | "en";

interface Translations {
  header: {
    logo: string;
    navHow: string;
    navSlots: string;
    navFaq: string;
    cta: string;
  };
  hero: {
    visitorBadge: string;
    totalBadge: string;
    title: string;
    subtitle: string;
    targetLabel: string;
    collectedLabel: string;
    slotsSoldLabel: string;
  };
  macbook: {
    large: string;
    medium: string;
    small: string;
    fromPrefix: string;
    fromSuffix: string;
    preview: string;
    liveTab: string;
    finalTab: string;
    liveHint: string;
    finalHint: string;
  };
  panel: {
    availableSlot: string;
    soldSlot: string;
    slotSize: string;
    visibility: string;
    chooseSlot: string;
    uploadTitle: string;
    uploadDesc: string;
    uploadAction: string;
    uploadSub: string;
    changeLogo: string;
    previewNote: string;
    reserveButton: string;
    backButton: string;
    reserveTitle: string;
    reserveDesc: string;
    selectedSlot: string;
    amount: string;
    completeReservation: string;
    congratsTitle: string;
    successDesc: string;
    successSub: string;
    closeButton: string;
  };
  story: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
  };
  whatMoneyBuys: {
    title: string;
    subtitle: string;
    model: string;
    modelSub: string;
    chip: string;
    chipVal: string;
    memory: string;
    memoryVal: string;
    storage: string;
    storageVal: string;
    display: string;
    displayVal: string;
    keyboard: string;
    keyboardVal: string;
    box: string;
    boxVal: string;
    disclaimer: string;
  };
  adAreas: {
    title: string;
    subtitle: string;
    available: string;
    sold: string;
    visibility: string;
    inspectArea: string;
  };
  journey: {
    title: string;
    places: string[];
    quote: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  footer: {
    desc: string;
    disclaimer: string;
  };
}

export const translations: Record<Language, Translations> = {
  tr: {
    header: {
      logo: "Mac'imi Markala",
      navHow: "Nasıl Çalışır?",
      navSlots: "Reklam Alanları",
      navFaq: "SSS",
      cta: "Mac'imi Markala",
    },
    hero: {
      visitorBadge: "Bu siteyi 1 kişi ziyaret ediyor",
      totalBadge: "Toplam 1",
      title: "Mac'imi Markala.",
      subtitle: "Yeni MacBook'umu markaların reklam bütçesiyle alıyorum.",
      targetLabel: "MacBook Hedefi:",
      collectedLabel: "Toplanan:",
      slotsSoldLabel: "satıldı",
    },
    macbook: {
      large: "BÜYÜK",
      medium: "ORTA",
      small: "KÜÇÜK",
      fromPrefix: "$",
      fromSuffix: "'den",
      preview: "Önizleme",
      liveTab: "Canlı Alanlar",
      finalTab: "Son Görünüm",
      liveHint: "Yerinizi seçmek için bir alana tıklayın.",
      finalHint: "Tüm reklam alanları tamamlandığında MacBook'un gerçek görünümü.",
    },
    panel: {
      availableSlot: "Müsait Alan",
      soldSlot: "Satılmış Alan",
      slotSize: "Alan Boyutu",
      visibility: "Görünürlük Seviyesi",
      chooseSlot: "Bu Alanı Seç",
      uploadTitle: "Markanı MacBook'a yerleştir",
      uploadDesc: "Logonuzu yükleyin ve MacBook kapağında nasıl duracağını hemen canlı görün.",
      uploadAction: "Logonuzu Yükleyin",
      uploadSub: "PNG, JPG veya SVG",
      changeLogo: "Değiştirmek için tıklayın",
      previewNote: "MacBook üzerinde canlı önizleniyor. ↗",
      reserveButton: "Alanı Rezerve Et",
      backButton: "Geri dön",
      reserveTitle: "Harika seçim!",
      reserveDesc: "Bu alana markanızı eklemek için talebinizi tamamlayın.",
      selectedSlot: "Seçilen Alan",
      amount: "Tutar",
      completeReservation: "Rezervasyonu Tamamla",
      congratsTitle: "Tebrikler!",
      successDesc: "Rezervasyon talebiniz başarıyla oluşturuldu.",
      successSub: "Markanız MacBook kapağında yerini almak üzere kaydedildi.",
      closeButton: "Kapat",
    },
    story: {
      title: "Bu MacBook neden var?",
      p1: "Henüz yeni MacBook'umu almadım. Bunun yerine kapağını reklam alanlarına böldüm.",
      p2: "Markalar bu alanlardan birini satın alıyor. Hedef tamamlandığında MacBook'umu alıyorum.",
      p3: "Sonrasında o MacBook'u günlük hayatımda, çalışırken, seyahat ederken ve katıldığım etkinliklerde kullanıyorum.",
      p4: "Yani reklamınız sadece bu sitede kalmıyor.",
      p5: "Ben nereye gidersem markanız da benimle geliyor.",
    },
    whatMoneyBuys: {
      title: "Bu para neyi satın alıyor?",
      subtitle: "İşte alınacak MacBook'un tam teknik özellikleri.",
      model: "M5 çipli 13 inç MacBook Air — Gümüş",
      modelSub: "Silver · 2026 Model",
      chip: "Çip",
      chipVal: "Apple M5 — 10 çekirdekli CPU, 10 çekirdekli GPU, 16 çekirdekli Neural Engine",
      memory: "Bellek",
      memoryVal: "24 GB birleşik bellek",
      storage: "Depolama",
      storageVal: "1 TB SSD depolama",
      display: "Ekran",
      displayVal: "13.6 inç Liquid Retina ekran, True Tone teknolojisi",
      keyboard: "Klavye",
      keyboardVal: "Touch ID özellikli Arkadan Aydınlatmalı Magic Keyboard",
      box: "Kutu İçeriği",
      boxVal: "35 W Çift USB-C Bağlantı Noktalı Güç Adaptörü, USB-C - MagSafe 3 Kablosu",
      disclaimer:
        "Fiyat Apple Türkiye resmi satış fiyatıdır (116.249,00 TL / $2.415,97). Reklam bütçesinden hedefin üzerinde toplanan miktar, MacBook'un taşınacağı seyahat, çalışma ve etkinlik giderleri için kullanılacaktır.",
    },
    adAreas: {
      title: "MacBook'ta yerinizi seçin.",
      subtitle: "Her alan farklı boyutta. Her alanın fiyatı kapağın üzerindeki görünürlüğüne göre değişiyor.",
      available: "Müsait",
      sold: "Satıldı",
      visibility: "Görünürlük",
      inspectArea: "Alanı İncele",
    },
    journey: {
      title: "Markanız benimle birlikte\nyola çıkacak.",
      places: [
        "Kafede çalışırken.",
        "Bir toplantıda.",
        "Bir etkinlikte.",
        "Trende.",
        "Uçakta.",
        "Başka bir şehirde.",
      ],
      quote: "“Markanızın reklamı bir web sitesinde değil, gerçek hayatta dolaşacak.”",
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      items: [
        {
          question: "MacBook gerçekten alınacak mı?",
          answer:
            "Evet. Reklam alanlarının tamamı satıldığında toplanan bütçeyle MacBook satın alınacak. Süreç tamamen şeffaf olacak ve her adım bu sitede paylaşılacak.",
        },
        {
          question: "Reklamım MacBook'un neresinde olacak?",
          answer:
            "MacBook kapağının üzerindeki seçtiğiniz alana logonuz yerleştirilecek. Her alanın konumu ve boyutu farklıdır. Satın alma öncesinde tam olarak nerede görüneceğini görebilirsiniz.",
        },
        {
          question: "Reklam alanını ne kadar süre kullanacağım?",
          answer:
            "Reklam alanınız MacBook'un kullanım ömrü boyunca kalıcıdır. Özel kaliteli baskı/vinil yöntemiyle uygulanacak ve süresiz olarak kapakta yer alacak.",
        },
        {
          question: "Logom nasıl uygulanacak?",
          answer:
            "Logonuz profesyonel kalitede dayanıklı vinil veya özel kaplama tekniğiyle MacBook kapağına uygulanacak. Yüksek çözünürlüklü ve estetik bir sonuç garanti edilecek.",
        },
        {
          question: "MacBook'u nerelerde kullanacaksın?",
          answer:
            "MacBook günlük hayatımda aktif olarak kullanılacak — kafede çalışırken, toplantılarda, etkinliklerde, seyahatlerde ve co-working alanlarda. Markanız gerçek dünyada sürekli görünür olacak.",
        },
        {
          question: "Ödeme nasıl yapılacak?",
          answer:
            "Ödemeler doğrudan güvenli altyapı üzerinden kredi kartı veya havale ile USD cinsinden tahsil edilecektir.",
        },
        {
          question: "Apple bu projeyi destekliyor mu?",
          answer:
            "Hayır. Bu proje Apple Inc. ile hiçbir şekilde bağlantılı değildir. Tamamen bağımsız ve kişisel bir projedir.",
        },
      ],
    },
    footer: {
      desc: "Markaların reklam bütçesiyle yeni MacBook'uma ulaşmayı hedeflediğim bağımsız bir proje.",
      disclaimer:
        "Mac'imi Markala projesinin Apple Inc. ile herhangi bir resmi ortaklığı, sponsorluğu veya kurumsal bağı bulunmamaktadır. MacBook, MacBook Air, MacBook Pro ve Mac ibareleri Apple Inc.'in tescilli ticari markalarıdır.",
    },
  },
  en: {
    header: {
      logo: "Brand My Mac",
      navHow: "How It Works",
      navSlots: "Ad Slots",
      navFaq: "FAQ",
      cta: "Brand My Mac",
    },
    hero: {
      visitorBadge: "1 person browsing this site",
      totalBadge: "Total 1",
      title: "Brand My Mac.",
      subtitle: "Buying my new MacBook with brands' ad budgets.",
      targetLabel: "MacBook Goal:",
      collectedLabel: "Raised:",
      slotsSoldLabel: "sold",
    },
    macbook: {
      large: "LARGE",
      medium: "MEDIUM",
      small: "SMALL",
      fromPrefix: "from $",
      fromSuffix: "",
      preview: "Preview",
      liveTab: "Live auction",
      finalTab: "Final look",
      liveHint: "Tap any spot to place a bid.",
      finalHint: "How the MacBook will look with all sponsor stickers applied.",
    },
    panel: {
      availableSlot: "Available Slot",
      soldSlot: "Sold Slot",
      slotSize: "Slot Size",
      visibility: "Visibility Level",
      chooseSlot: "Select This Slot",
      uploadTitle: "Place your brand on the MacBook",
      uploadDesc: "Upload your logo to instantly see a live preview on the MacBook lid.",
      uploadAction: "Upload Your Logo",
      uploadSub: "PNG, JPG or SVG",
      changeLogo: "Click to change",
      previewNote: "Live preview on the MacBook. ↗",
      reserveButton: "Reserve Slot",
      backButton: "Go back",
      reserveTitle: "Great choice!",
      reserveDesc: "Complete your request to secure this spot for your brand.",
      selectedSlot: "Selected Slot",
      amount: "Amount",
      completeReservation: "Complete Reservation",
      congratsTitle: "Congratulations!",
      successDesc: "Your reservation request has been created.",
      successSub: "Your spot on the MacBook lid is now queued.",
      closeButton: "Close",
    },
    story: {
      title: "Why does this MacBook exist?",
      p1: "I haven't bought my new MacBook yet. Instead, I turned its lid into ad slots.",
      p2: "Brands purchase these spots. Once the goal is met, I buy the MacBook.",
      p3: "After that, I will use that MacBook every day—working at cafes, meetings, traveling, and tech events.",
      p4: "So your ad doesn't just stay on this website.",
      p5: "Wherever I go, your brand travels with me.",
    },
    whatMoneyBuys: {
      title: "What the money buys.",
      subtitle: "Here are the exact hardware specs.",
      model: "13-inch MacBook Air with M5 chip — Silver",
      modelSub: "Silver · 2026 Model",
      chip: "Chip",
      chipVal: "Apple M5 — 10-core CPU, 10-core GPU, 16-core Neural Engine",
      memory: "Memory",
      memoryVal: "24 GB unified memory",
      storage: "Storage",
      storageVal: "1 TB SSD storage",
      display: "Display",
      displayVal: "13.6-inch Liquid Retina display with True Tone",
      keyboard: "Keyboard",
      keyboardVal: "Backlit Magic Keyboard with Touch ID",
      box: "In the Box",
      boxVal: "35W Dual USB-C Port Power Adapter, USB-C to MagSafe 3 Cable",
      disclaimer:
        "Price reflects Apple Turkey official retail price (116,249.00 TL / $2,415.97). Any funds raised past the goal will support travel, workspace, and event expenses where the Mac travels.",
    },
    adAreas: {
      title: "Choose your spot on the Mac.",
      subtitle: "Each slot varies in size and price depending on visibility on the lid.",
      available: "Available",
      sold: "Sold",
      visibility: "Visibility",
      inspectArea: "Inspect Slot",
    },
    journey: {
      title: "Your brand will travel\nwith me.",
      places: [
        "Working at a coffee shop.",
        "In a business meeting.",
        "At a conference or event.",
        "On the train.",
        "On an airplane.",
        "In another city.",
      ],
      quote: "“Your ad won't just sit on a webpage—it will travel in the real world.”",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Will the MacBook actually be purchased?",
          answer:
            "Yes. As soon as all slots are sold and the funding goal is reached, the MacBook will be purchased. The entire process will be fully transparent with updates posted here.",
        },
        {
          question: "Where will my ad be located on the MacBook?",
          answer:
            "Your logo will be placed on the exact slot you choose on the lid. You can see the exact dimensions and position before booking.",
        },
        {
          question: "How long will my ad stay on the MacBook?",
          answer:
            "Your ad will remain permanently on the MacBook for its entire lifespan. It will be professionally applied with durable, high-quality vinyl.",
        },
        {
          question: "How will my logo be applied?",
          answer:
            "Your logo will be printed using high-resolution premium vinyl skin technology for a sleek, OEM-grade finish.",
        },
        {
          question: "Where will you use the MacBook?",
          answer:
            "Everywhere: cafes, co-working spaces, conferences, flights, trains, and meetups. Your brand will gain continuous real-world exposure.",
        },
        {
          question: "How is payment handled?",
          answer:
            "Payments are handled securely via credit card or wire transfer in USD ($).",
        },
        {
          question: "Is Apple affiliated with this project?",
          answer:
            "No. This project is entirely independent and is not affiliated with, endorsed by, or sponsored by Apple Inc.",
        },
      ],
    },
    footer: {
      desc: "An independent project aiming to buy my next MacBook funded by brand advertising.",
      disclaimer:
        "Brand My Mac is not affiliated with, endorsed by, or sponsored by Apple Inc. MacBook, MacBook Air, MacBook Pro, and Mac are registered trademarks of Apple Inc.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
