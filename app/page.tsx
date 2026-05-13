"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import MorningQueue from "../components/marketing/MorningQueue";
import ForecastAccuracy from "../components/marketing/ForecastAccuracy";
import Pricing from "../components/marketing/Pricing";
import FinalCTA from "../components/marketing/FinalCTA";
import Nav from "../components/marketing/Nav";
import PainSection from "../components/marketing/PainSection";
import OurBetSection from "../components/marketing/OurBetSection";
import HighlightReel from "../components/marketing/HighlightReel";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const cardChrome = {
  border: "1px solid #EAEAEA",
  boxShadow:
    "0 4px 12px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.06)",
};

function TreeMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <polygon points="32,8 21,24 43,24" fill="#4ADE80" />
      <polygon points="32,20 18,38 46,38" fill="#16A34A" />
      <polygon points="32,32 14,54 50,54" fill="#14532D" />
      <rect x="29" y="54" width="6" height="6" fill="#14532D" />
    </svg>
  );
}

function TreeDivider() {
  return (
    <div
      aria-hidden="true"
      className="my-16 flex items-center justify-center gap-6"
    >
      <div className="h-px max-w-32 flex-1 bg-[#C8C8C3]" />
      <TreeMark size={20} className="opacity-85" />
      <div className="h-px max-w-32 flex-1 bg-[#C8C8C3]" />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const handler = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", handler);
    return () => window.removeEventListener("pageshow", handler);
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#FAFAF9] pt-16 text-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <section
            id="product"
            className="pb-24 pt-24 text-center md:pb-32 md:pt-32 lg:pt-40"
          >
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: FADE_EASE }}
            className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]"
          >
            The operational intelligence layer for CS
          </motion.p>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: FADE_EASE }}
            className="mx-auto max-w-5xl text-balance text-[48px] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#0A0A0A] md:text-[80px] lg:text-[112px]"
          >
            Built to make your CSMs unbeatable.
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: FADE_EASE }}
            className="mx-auto mt-8 max-w-2xl text-balance text-[17px] leading-[1.45] tracking-[-0.005em] text-[#1F1F1F] md:text-[19px] lg:text-[22px]"
          >
            The operational intelligence layer for CS — leverage for your team, confidence for your board.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: FADE_EASE }}
            className="mx-auto mt-12 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center sm:gap-3"
          >
            <motion.a
              href="https://calendly.com/matt-stayevergreen/30min"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 1, backgroundColor: "#0A0A0A" }}
              whileHover={{ scale: 1.01, backgroundColor: "#16A34A" }}
              transition={{ duration: 0.2, ease: FADE_EASE }}
              className="inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-[15px] font-medium text-white"
            >
              Book a demo
            </motion.a>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: FADE_EASE }}
            className="mx-auto mt-20 max-w-6xl overflow-hidden rounded-xl bg-white md:mt-24"
            style={cardChrome}
          >
            <MorningQueue />
          </motion.div>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: FADE_EASE }}
            className="mx-auto mt-5 max-w-3xl text-[13px] italic text-[#888]"
          >
            Morning Queue: the day prioritized for your team, ranked by what&apos;s at stake.
          </motion.p>
        </section>

        <TreeDivider />

        <PainSection />

        <TreeDivider />

        <OurBetSection />

        <TreeDivider />

        <HighlightReel />

        <TreeDivider />

        <section id="methodology" className="py-24">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
              The defensibility test
            </p>
            <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl">
              Every claim has a defensible answer.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-[1.6] tracking-[-0.005em] text-[#1F1F1F] md:text-[17px]">
              Click any number in Evergreen. See the formula, the inputs, the
              assumptions. Defensible by design, not by claim.
            </p>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-5xl"
          >
            <div
              className="overflow-hidden rounded-xl bg-white"
              style={cardChrome}
            >
              <ForecastAccuracy />
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] italic leading-[1.6] text-[#666] md:text-[14px]">
              No black-box AI. Click any number to see the formula, the
              inputs, the assumptions. Every snapshot, every metric, every
              period — defensible by design, not by claim.
            </p>
          </motion.div>
        </section>

        <TreeDivider />

        <Pricing />

        <TreeDivider />

        <FinalCTA />

        <div className="flex flex-col items-center gap-3 pb-24 pt-32 opacity-60">
          <TreeMark size={24} />
          <span className="text-xs uppercase tracking-[0.15em] text-[#666]">
            evergreen.
          </span>
        </div>
        </div>
      </main>
    </>
  );
}
