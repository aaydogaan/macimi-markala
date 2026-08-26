"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "tr" | "en";

export interface Translations {
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
      cta: "Yerinizi Seçin",
    },
    hero: {
      visitorBadge: "Canlı Ziyaretçi",
      totalBadge: "Aktif",
      title: "Mac'imi Markala.",
      subtitle: "Yeni MacBook'umu kapağındaki reklam alanlarıyla finanse ediyorum. Yerinizi ayırtın, markanız her yerde görünsün.",
      targetLabel: "MacBook Hedefi:",
      collectedLabel: "Toplanan:",
      slotsSoldLabel: "satıldı",
    },
    macbook: {
      large: "BÜYÜK",
      medium: "ORTA",
      small: "KÜÇÜK",
      fromPrefix: "$",
      fromSuffix: "",
      preview: "Önizleme",
      liveTab: "Canlı Alanlar",
      finalTab: "Son Görünüm",
      liveHint: "Yerinizi seçmek ve logonuzu denemek için bir alana tıklayın.",
      finalHint: "Tüm alanlar dolduğunda MacBook'un gerçek hayattaki görünümü.",
    },
    panel: {
      availableSlot: "Müsait Alan",
      soldSlot: "Dolu Alan",
      slotSize: "Alan Boyutu",
      visibility: "Görünürlük Seviyesi",
      chooseSlot: "Bu Alanı Seç",
      uploadTitle: "Markanızı Kapağa Yerleştirin",
      uploadDesc: "Logonuzu yükleyin ve MacBook kapağında nasıl duracağını canlı olarak görün.",
      uploadAction: "Logonuzu Yükleyin",
      uploadSub: "PNG, JPG veya SVG formatında",
      changeLogo: "Logoyu değiştirmek için tıklayın",
      previewNote: "MacBook üzerinde canlı olarak önizleniyor. ↗",
      reserveButton: "Bu Alanı Rezerve Et",
      backButton: "Geri Dön",
      reserveTitle: "Harika Bir Seçim!",
      reserveDesc: "Bu alana markanızı eklemek için talebinizi tamamlayın.",
      selectedSlot: "Seçilen Alan",
      amount: "Tutar",
      completeReservation: "Rezervasyonu Tamamla",
      congratsTitle: "Tebrikler!",
      successDesc: "Rezervasyon talebiniz başarıyla oluşturuldu.",
      successSub: "Markanız MacBook kapağındaki yerini almak üzere sıraya alındı.",
      closeButton: "Kapat",
    },
    story: {
      title: "Bu Proje Nasıl Ortaya Çıktı?",
      p1: "Yeni bir MacBook'a ihtiyacım var; ancak bunu klasik bir alışverişle yapmak yerine kapağını reklam alanlarına böldüm.",
      p2: "Markalar bu alanlara sponsor oluyor. Belirlenen bütçe hedefine ulaşıldığında MacBook'u satın alıyorum.",
      p3: "Ardından bu cihazı günlük hayatımda, kafelerde, coworking alanlarında, etkinliklerde ve seyahatlerimde aktif olarak kullanıyorum.",
      p4: "Böylece reklamınız sadece dijitalde kalmıyor; gerçek dünyada binlerce insanın gözü önünde dolaşıyor.",
      p5: "Ben nereye gidersem, markanız da benimle birlikte seyahat ediyor.",
    },
    whatMoneyBuys: {
      title: "Toplanan Bütçe Nereye Harcanacak?",
      subtitle: "Alınacak MacBook'un resmi Apple konfigürasyonu ve donanım detayları:",
      model: "M5 çipli 13 inç MacBook Air — Gümüş",
      modelSub: "Silver · 2026 Model",
      chip: "İşlemci",
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
      boxVal: "35W Çift USB-C Girişli Güç Adaptörü, USB-C - MagSafe 3 Kablosu",
      disclaimer:
        "Fiyat Apple Türkiye resmi satış tutarıdır (116.249,00 TL / $2.415,97). Hedefin üzerinde kalan miktar, MacBook'un taşınacağı çalışma, seyahat ve etkinlik giderleri için kullanılacaktır.",
    },
    adAreas: {
      title: "Kapak Üzerindeki Reklam Alanları",
      subtitle: "Her alanın boyutu ve konumu farklıdır. Markanız için en uygun yeri seçebilirsiniz.",
      available: "Müsait",
      sold: "Dolu",
      visibility: "Görünürlük",
      inspectArea: "Alanı İncele",
    },
    journey: {
      title: "Markanız Her Yerde Benimle.",
      places: [
        "Kafede çalışırken,",
        "Önemli bir toplantıda,",
        "Teknoloji etkinliklerinde,",
        "Hızlı trende,",
        "Uçakta seyahat ederken,",
        "Farklı şehirlerde ve ülkelerde...",
      ],
      quote: "“Logonuz sabit bir web sitesinde değil; gerçek dünyada, hayatın tam içinde dolaşacak.”",
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      items: [
        {
          question: "MacBook gerçekten satın alınacak mı?",
          answer:
            "Evet. Reklam alanlarının tamamı dolduğunda toplanan bütçeyle MacBook Air satın alınacak. Satın alma süreci ve cihazın teslim anı tamamen şeffaf şekilde bu sitede ve sosyal medyada paylaşılacaktır.",
        },
        {
          question: "Logom MacBook kapağında ne kadar süre kalacak?",
          answer:
            "Reklamınız MacBook'un kullanım ömrü boyunca kalıcıdır. Yüksek kaliteli, suya ve aşınmaya dayanıklı özel vinil baskı tekniğiyle uygulanır ve süresiz olarak kapakta kalır.",
        },
        {
          question: "Logolar kapağa nasıl uygulanıyor?",
          answer:
            "Tüm logolar birinci sınıf die-cut vinil sticker veya özel koruyucu kaplama tekniğiyle, cihazın estetik görünümünü bozmayacak şekilde profesyonelce yerleştirilir.",
        },
        {
          question: "Bu cihazı nerelerde kullanacaksınız?",
          answer:
            "MacBook benim ana çalışma bilgisayarım olacak. Yazılım geliştirirken, kafelerde, coworking alanlarında, workshop ve etkinliklerde sürekli aktif olarak kullanılacaktır.",
        },
        {
          question: "Ödeme ve rezervasyon nasıl yapılıyor?",
          answer:
            "İstediğiniz alanı seçtikten sonra logonuzu yükleyebilir ve güvenli ödeme/rezervasyon talebinizi oluşturabilirsiniz. Talebiniz onaylandıktan sonra alan adınıza ayrılır.",
        },
        {
          question: "Bu projenin Apple ile bir bağı var mı?",
          answer:
            "Hayır. Bu proje tamamen bağımsız bir girişimdir; Apple Inc. ile hiçbir resmi sponsorluk, ortaklık veya organik bağı bulunmamaktadır.",
        },
      ],
    },
    footer: {
      desc: "Kişisel bir MacBook finansman projesidir.",
      disclaimer:
        "Bu proje Apple Inc. ile ilişkili, onaylı veya sponsorlu değildir. MacBook, MacBook Air ve Apple, Apple Inc.'in tescilli ticari markalarıdır.",
    },
  },
  en: {
    header: {
      logo: "Brand My Mac",
      navHow: "How It Works",
      navSlots: "Ad Spots",
      navFaq: "FAQ",
      cta: "Get a Spot",
    },
    hero: {
      visitorBadge: "Live Visitors",
      totalBadge: "Active",
      title: "Brand My Mac.",
      subtitle: "Funding my new MacBook through ad spots on its lid. Secure your spot and let your brand travel everywhere with me.",
      targetLabel: "MacBook Goal:",
      collectedLabel: "Raised:",
      slotsSoldLabel: "sold",
    },
    macbook: {
      large: "LARGE",
      medium: "MEDIUM",
      small: "SMALL",
      fromPrefix: "$",
      fromSuffix: "",
      preview: "Preview",
      liveTab: "Live auction",
      finalTab: "Final look",
      liveHint: "Click any spot to inspect details and preview your logo.",
      finalHint: "A realistic preview of how the MacBook will look with all sponsor stickers.",
    },
    panel: {
      availableSlot: "Available Spot",
      soldSlot: "Sold Spot",
      slotSize: "Spot Size",
      visibility: "Visibility Level",
      chooseSlot: "Select This Spot",
      uploadTitle: "Place Your Brand on the Lid",
      uploadDesc: "Upload your logo to instantly see a live preview on the MacBook lid.",
      uploadAction: "Upload Your Logo",
      uploadSub: "PNG, JPG or SVG format",
      changeLogo: "Click to change logo",
      previewNote: "Live preview rendered on the MacBook. ↗",
      reserveButton: "Reserve This Spot",
      backButton: "Go Back",
      reserveTitle: "Great Choice!",
      reserveDesc: "Complete your request to secure this spot for your brand.",
      selectedSlot: "Selected Spot",
      amount: "Amount",
      completeReservation: "Complete Reservation",
      congratsTitle: "Congratulations!",
      successDesc: "Your reservation request has been created successfully.",
      successSub: "Your brand is now queued for placement on the MacBook lid.",
      closeButton: "Close",
    },
    story: {
      title: "The Story Behind This Project",
      p1: "I need a new MacBook to build and create. Instead of buying it quietly, I turned its lid into a travel billboard.",
      p2: "Sponsor brands claim these spots. Once the funding goal is reached, the MacBook is purchased.",
      p3: "I will use this machine daily — in cafés, coworking hubs, tech conferences, and during travels.",
      p4: "Your logo doesn't just stay on a screen; it travels through real-world spaces with real people.",
      p5: "Wherever I go, your brand rides along with me.",
    },
    whatMoneyBuys: {
      title: "Where Does the Budget Go?",
      subtitle: "Official Apple configuration and hardware specs of the MacBook being funded:",
      model: "13-inch MacBook Air with Apple M5 chip — Silver",
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
        "Priced at official Apple store retail ($2,415.97 / 116,249.00 TL). Any additional funds raised will cover travel and public workspace expenses while showcasing the laptop.",
    },
    adAreas: {
      title: "Sponsor Spots on the Lid",
      subtitle: "Each spot offers unique dimensions and visibility. Choose the ideal placement for your brand.",
      available: "Available",
      sold: "Sold",
      visibility: "Visibility",
      inspectArea: "Inspect Spot",
    },
    journey: {
      title: "Your Brand Travels Everywhere With Me.",
      places: [
        "Working in bustling cafés,",
        "In high-stakes meetings,",
        "At tech conferences,",
        "On high-speed trains,",
        "On flights around the world,",
        "Across different cities and coworking spaces...",
      ],
      quote: "“Your brand isn't buried on a website; it lives and travels in the real world.”",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Will the MacBook really be purchased?",
          answer:
            "Absolutely. Once all spots are funded, the MacBook Air will be purchased immediately. The unboxing and setup process will be shared transparently on this site and social channels.",
        },
        {
          question: "How long does my sticker stay on the lid?",
          answer:
            "Your placement is permanent for the entire lifetime of the MacBook. It will be printed on durable, weatherproof vinyl.",
        },
        {
          question: "How are logos applied to the lid?",
          answer:
            "All logos are professionally printed as premium die-cut vinyl stickers and applied precisely to maintain the sleek aesthetic of the device.",
        },
        {
          question: "Where will you be using this laptop?",
          answer:
            "It will be my primary daily driver for coding, designing, and working in public coworking hubs, cafés, and global tech events.",
        },
        {
          question: "How does payment and booking work?",
          answer:
            "Select your preferred spot, upload your logo for instant preview, and submit your reservation. Once verified, the spot is locked for your brand.",
        },
        {
          question: "Is this affiliated with Apple?",
          answer:
            "No. This is an independent creative project. It is not affiliated with, endorsed by, or sponsored by Apple Inc.",
        },
      ],
    },
    footer: {
      desc: "A personal creative MacBook crowdfunding project.",
      disclaimer:
        "This project is not affiliated with, endorsed by, or sponsored by Apple Inc. MacBook, MacBook Air, and Apple are registered trademarks of Apple Inc.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("preferred_lang") as Language | null;
      if (savedLang === "tr" || savedLang === "en") {
        setLanguage(savedLang);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("preferred_lang", lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "tr" ? "en" : "tr";
    handleSetLanguage(nextLang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
