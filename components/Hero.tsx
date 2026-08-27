"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  MACBOOK_PRICE,
  getTotalCollected,
  getSoldSlots,
  adSlots,
  getProgressPercentage,
} from "@/data/adSlots";
import { createClient } from "@/utils/supabase/client";

export default function Hero() {
  const { t, language } = useLanguage();
  const soldCount = getSoldSlots().length;
  const totalCollected = getTotalCollected();
  const progressPercent = getProgressPercentage();

  // 100% Real Live Presence & Persistent Total Visits Tracking via Supabase
  const [liveVisitors, setLiveVisitors] = useState(1);
  const [totalVisits, setTotalVisits] = useState(4);

  useEffect(() => {
    // 1. Persistent Unique Visitor Tracking via Supabase API
    const trackVisitor = async () => {
      try {
        // Fast initial load from local storage cache if available
        const cachedTotal = localStorage.getItem("mac_global_total_visits");
        if (cachedTotal) {
          const parsed = parseInt(cachedTotal, 10);
          if (!isNaN(parsed) && parsed > 0) {
            setTotalVisits(parsed);
          }
        }

        const sessionActive = sessionStorage.getItem("mac_session_visited");
        let res;

        if (!sessionActive) {
          // New visit in this browser session -> increment counter
          res = await fetch("/api/stats/visit", {
            method: "POST",
            cache: "no-store",
          });
          sessionStorage.setItem("mac_session_visited", "true");
        } else {
          // Already counted this session -> just fetch latest total
          res = await fetch("/api/stats/visit", {
            method: "GET",
            cache: "no-store",
          });
        }

        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.total_visits === "number") {
            setTotalVisits(data.total_visits);
            localStorage.setItem("mac_global_total_visits", data.total_visits.toString());
          }
        }
      } catch (err) {
        console.warn("Visitor tracking sync notice:", err);
      }
    };

    trackVisitor();

    // 2. Real-time Supabase Presence for accurate online viewer count & realtime visits update
    try {
      const supabase = createClient();
      const channel = supabase.channel("online-presence", {
        config: {
          presence: {
            key: `client-${Math.random().toString(36).substring(2, 9)}`,
          },
        },
      });

      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel.presenceState();
          const uniqueOnline = Object.keys(state).length;
          setLiveVisitors(Math.max(1, uniqueOnline));
        })
        .on("presence", { event: "join" }, () => {
          const state = channel.presenceState();
          setLiveVisitors(Math.max(1, Object.keys(state).length));
        })
        .on("presence", { event: "leave" }, () => {
          const state = channel.presenceState();
          setLiveVisitors(Math.max(1, Object.keys(state).length));
        });

      // Realtime listener for site_stats table updates
      const statsChannel = supabase
        .channel("site-stats-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "site_stats",
            filter: "id=eq.global",
          },
          (payload) => {
            if (payload.new && typeof (payload.new as { total_visits?: number }).total_visits === "number") {
              const updatedCount = (payload.new as { total_visits: number }).total_visits;
              setTotalVisits(updatedCount);
              localStorage.setItem("mac_global_total_visits", updatedCount.toString());
            }
          }
        )
        .subscribe();

      channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
          });
        }
      });

      return () => {
        supabase.removeChannel(channel);
        supabase.removeChannel(statsChannel);
      };
    } catch {
      // fallback
    }
  }, []);

  const liveText =
    language === "tr"
      ? `${liveVisitors} kişi şu an inceliyor`
      : `${liveVisitors} ${liveVisitors > 1 ? "people" : "person"} viewing now`;

  const totalText =
    language === "tr"
      ? `${totalVisits} tekil ziyaret`
      : `${totalVisits} unique visits`;

  return (
    <section className="pt-24 pb-4 sm:pt-28 sm:pb-6 text-center max-w-5xl mx-auto px-6 flex flex-col items-center">
      {/* Live Visitors Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F5F5F7] border border-black/[0.06] rounded-full text-[13px] text-[#1D1D1F]/85 mb-4 shadow-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-[#1D1D1F]">
          {liveText}
        </span>
        <span className="text-[#86868B] font-bold">·</span>
        <span className="text-[#86868B] font-medium">{totalText}</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold tracking-tight leading-[1.08] text-[#1D1D1F]"
      >
        {t.hero.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.12,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mt-3 text-[clamp(1.05rem,2vw,1.35rem)] font-medium text-[#86868B] max-w-xl mx-auto leading-relaxed"
      >
        {t.hero.subtitle}
      </motion.p>

      {/* Mini Progress Card / Stats Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.18,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[14px] text-[#86868B]"
      >
        <span className="inline-flex items-center gap-1.5 font-medium text-[#1D1D1F]">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          {t.hero.targetLabel}{" "}
          <strong className="font-semibold text-[#1D1D1F]">
            ${MACBOOK_PRICE.toLocaleString("en-US")}
          </strong>
        </span>

        <span className="text-[#86868B]/40 hidden sm:inline">|</span>

        <span className="inline-flex items-center gap-1.5 font-medium text-[#1D1D1F]">
          {t.hero.collectedLabel}{" "}
          <strong className="font-semibold text-emerald-600">
            ${totalCollected.toLocaleString("en-US")}
          </strong>
        </span>

        <span className="text-[#86868B]/40 hidden sm:inline">|</span>

        <span>
          <strong className="font-semibold text-[#1D1D1F]">
            {soldCount} / {adSlots.length}
          </strong>{" "}
          {t.hero.slotsSoldLabel}
        </span>
      </motion.div>
    </section>
  );
}
