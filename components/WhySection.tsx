"use client";

import { motion } from "framer-motion";
import { Globe, Monitor, Heart } from "lucide-react";

const cards = [
  {
    icon: Globe,
    title: "Fiziksel görünürlük",
    description: "Markanız gerçek dünyada benimle birlikte dolaşır.",
  },
  {
    icon: Monitor,
    title: "Dijital görünürlük",
    description: "Proje boyunca markanız bu sitede de yer alır.",
  },
  {
    icon: Heart,
    title: "Hikâyenin parçası olun",
    description: "MacBook'un alınma hikâyesinin bir parçası olursunuz.",
  },
];

export default function WhySection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white" id="nasil-calisiyor">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#1D1D1F] tracking-tight leading-tight">
            Reklamınız internette kaybolmasın.
          </h2>
          <div className="mt-6 max-w-xl mx-auto">
            <p className="text-[clamp(1rem,1.5vw,1.15rem)] text-[#86868B] leading-relaxed">
              Bannerlar kapanıyor.
              <br />
              Reklamlar geçiliyor.
              <br />
              Ama üzerindeki marka her gün gözünün önünde olan bir MacBook
              kapağındaysa, hikâye biraz farklı.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="p-8 bg-[#F5F5F7] rounded-2xl hover:bg-[#EDEDF0] transition-colors duration-300 group"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <card.icon size={22} className="text-[#1D1D1F]" />
              </div>
              <h3 className="text-[17px] font-semibold text-[#1D1D1F] mb-2">
                {card.title}
              </h3>
              <p className="text-[14px] text-[#86868B] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
