"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MacBookDisplay from "@/components/MacBookDisplay";
import StorySection from "@/components/StorySection";
import WhatMoneyBuys from "@/components/WhatMoneyBuys";
import AdAreas from "@/components/AdAreas";
import JourneySection from "@/components/JourneySection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <MacBookDisplay />
        <StorySection />
        <WhatMoneyBuys />
        <AdAreas />
        <JourneySection />
        <FAQ />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
