"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import MorningQueue from "../components/marketing/MorningQueue";
import HealthBreakdownCard from "../components/marketing/HealthBreakdownCard";
import CLVMethodology from "../components/marketing/CLVMethodology";
import NRRForecastMethodology from "../components/marketing/NRRForecastMethodology";
import ForecastAccuracy from "../components/marketing/ForecastAccuracy";
import Pricing from "../components/marketing/Pricing";
import FinalCTA from "../components/marketing/FinalCTA";
import Nav from "../components/marketing/Nav";
import ManifestoModal from "../components/marketing/ManifestoModal";
import MorningQueueSpotlight from "../components/marketing/MorningQueueSpotlight";
import HighlightReel from "../components/marketing/HighlightReel";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: false,
} as const;

type Moment = {
  eyebrow: string;
  headline: string;
  caption: string | null;
  Component: ComponentType;
};

const moments: Moment[] = [
  {
    eyebrow: "Show me the formula",
    headline: "Click any number. See exactly how it was computed.",
    caption:
      "Customer Lifetime Value, computed at your org's actual scale. Every metric in Evergreen — every claim, every flag — is built on math you can audit.",
    Component: CLVMethodology,
  },
  {
    eyebrow: "Show me the assumptions",
    headline:
      "Every threshold, weight, and cap is configurable — and visible.",
    caption:
      "Forecasts move with your reality. Stretch upside scenarios show what's possible if signals close as expected.",
    Component: NRRForecastMethodology,
  },
  {
    eyebrow: "Show me what's pushing the score",
    headline: "Five components. Weighted. Traceable.",
    caption:
      "Every health number traces back to engagement, sentiment, behavior, business signals, and renewal proximity. Configurable. Always current.",
    Component: HealthBreakdownCard,
  },
  {
    eyebrow: "Show me the proof",
    headline:
      "Most CS tools forecast and never look back. We publish our own accuracy.",
    caption:
      "Per snapshot, per metric, per period — so you know exactly how much trust to place in next quarter's number based on how last quarter's held up.",
    Component: ForecastAccuracy,
  },
];

type DefensibilityCard = {
  eyebrow: string;
  question: string;
  evergreen: string;
  contrast: string;
};

const defensibilityCards: DefensibilityCard[] = [
  {
    eyebrow: "Metrics",
    question: "Is this number defensible to a CFO?",
    evergreen:
      "Every metric in Evergreen carries its formula with it. Click. Read. Audit. Change the assumption. Watch the number recompute.",
    contrast:
      "The old guard hides methodology in documentation. The new guard hides it in the model.",
  },
  {
    eyebrow: "Signals",
    question: "Show me the signals that drove this score.",
    evergreen:
      "Health is 5 weighted components. Click any component. Trace to source signals — every email, ticket, meeting note. Adjust the weights. Watch the score move.",
    contrast:
      "The old guard overcomplicates. The new guard just asks for your trust.",
  },
  {
    eyebrow: "AI decisions",
    question: "Can I see the AI's reasoning?",
    evergreen:
      "AI decisions in Evergreen are transparent by design. Click the recommendation. See the alternatives. Override with one click. The AI learns from your correction — the human stays in the loop.",
    contrast:
      "The old guard automates with rules. The new guard automates around humans. Neither shows the override.",
  },
  {
    eyebrow: "Commitment tracking",
    question: "Are we accountable to what we promised?",
    evergreen:
      "Every QBR commitment is captured, tracked, and surfaced. Not in someone's notes — in the platform. The next QBR opens with what you said you'd do, and what actually happened.",
    contrast:
      "Commitments lost in notes are commitments lost to memory. Evergreen turns them into structure.",
  },
];

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
  const [manifestoOpen, setManifestoOpen] = useState(false);

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

        <section className="py-24">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
              The fork
            </p>
            <h2 className="mx-auto max-w-4xl text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl lg:text-6xl">
              There are two paths for AI in customer success.
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: FADE_EASE }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-2xl bg-white p-6 md:p-8 lg:p-10"
              style={{
                border: "1px solid #EAEAEA",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
              }}
            >
              <p className="mb-6 text-[12px] uppercase tracking-[0.10em] text-[#666]">
                The replacement bet
              </p>
              <h3 className="mb-8 text-[24px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0A0A0A] lg:text-[28px]">
                AI replaces your team
              </h3>
              <ul className="flex flex-col gap-2.5 text-[17px] leading-[1.55] text-[#666]">
                {[
                  "AI runs accounts autonomously",
                  "CSMs become optional, then redundant",
                  "Headcount reduction is the ROI story",
                  "When the AI gets it wrong, no one notices",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#BBB]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: FADE_EASE }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative rounded-2xl bg-[#FBFBFA] p-6 md:p-8 lg:p-10"
              style={{
                border: "1.5px solid #E5E5E0",
                boxShadow:
                  "0 1px 3px rgba(0, 0, 0, 0.05), 0 12px 32px rgba(0, 0, 0, 0.07)",
              }}
            >
              <div className="absolute right-8 top-8">
                <TreeMark size={24} />
              </div>
              <p className="mb-6 text-[12px] uppercase tracking-[0.10em] text-[#16A34A]">
                Our bet
              </p>
              <h3 className="mb-8 text-[28px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#0A0A0A] lg:text-[32px]">
                AI makes your team unbeatable
              </h3>
              <ul className="flex flex-col gap-2.5 text-[17px] leading-[1.55] text-[#1F1F1F]">
                {[
                  "AI handles the cognitive switching cost",
                  "CSMs do higher-leverage work, faster",
                  "Your best people get more accounts, not fewer",
                  "When the AI gets it wrong, your CSM catches it",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1 shrink-0">
                      <TreeMark size={14} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={() => setManifestoOpen(true)}
            aria-label="Read our manifesto"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="group mx-auto mt-20 block w-full max-w-3xl cursor-pointer rounded-2xl px-6 py-16 text-left transition-colors hover:bg-white/40 md:px-10 md:py-20"
          >
            <p className="mb-6 text-[12px] font-bold uppercase tracking-[0.18em] text-[#888]">
              From the founder
            </p>
            <p className="text-balance text-[24px] font-medium leading-[1.3] tracking-[-0.015em] text-[#0A0A0A] md:text-[30px]">
              &ldquo;We bet our company on a single conviction: AI does not
              replace humans.&rdquo;
            </p>
            <span className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#16A34A] transition-colors group-hover:text-[#15803D]">
              Read our manifesto
              <span aria-hidden="true">→</span>
            </span>
          </motion.button>

          <TreeDivider />

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="mb-12 text-center">
              <p className="mb-6 text-[13px] uppercase tracking-[0.10em] text-[#666]">
                The defensibility test
              </p>
              <h3 className="mx-auto max-w-3xl text-balance text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0A0A0A] md:text-[36px]">
                Every claim in Evergreen has a defensible answer.
              </h3>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {defensibilityCards.map((card) => (
                <motion.div
                  key={card.eyebrow}
                  initial={false}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="rounded-2xl bg-white p-7 md:p-9"
                  style={{
                    border: "1px solid #EAEAEA",
                    borderLeft: "3px solid #16A34A",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                  }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.10em] text-[#888]">
                    {card.eyebrow}
                  </p>
                  <h4 className="mt-3 text-balance text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0A0A0A] md:text-[24px]">
                    {card.question}
                  </h4>
                  <p className="mt-5 text-[16px] font-medium leading-[1.55] text-[#1F1F1F] md:text-[17px]">
                    {card.evergreen}
                  </p>
                  <div className="mt-6 border-t border-[#EAEAEA] pt-4">
                    <p className="text-[12px] leading-[1.55] text-[#888]">
                      {card.contrast}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <TreeDivider />

        <MorningQueueSpotlight />

        <TreeDivider />

        <HighlightReel />

        <TreeDivider />

        <motion.section
          {...fadeUp}
          id="methodology"
          className="pb-12 pt-24 text-center"
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.10em] text-[#666]">
            Every number is defensible
          </p>
          <h2 className="mx-auto max-w-5xl text-[44px] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#0A0A0A] md:text-[64px] lg:text-[80px]">
            The math behind the numbers your board asks about.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#1F1F1F] md:text-[19px]">
            Click any number. See the formula, the inputs, the assumptions, the
            per-account breakdown. Every signal, every forecast, every flag —
            defensible by design, not by claim.
          </p>
        </motion.section>

        <section className="border-t border-[#EAEAEA] pb-24 pt-12">
          <div className="space-y-32">
            {moments.map((m) => {
              const Comp = m.Component;
              return (
                <motion.div
                  key={m.eyebrow}
                  {...fadeUp}
                  className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
                >
                  <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-24">
                      <p className="mb-5 text-[13px] uppercase tracking-[0.10em] text-[#666]">
                        {m.eyebrow}
                      </p>
                      <h3 className="mb-6 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] md:text-[32px] lg:text-[36px]">
                        {m.headline}
                      </h3>
                      {m.caption ? (
                        <p className="text-[16px] leading-[1.6] text-[#1F1F1F]">
                          {m.caption}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div
                      className="overflow-hidden rounded-xl bg-white"
                      style={cardChrome}
                    >
                      <Comp />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
      <ManifestoModal
        open={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />
    </>
  );
}
