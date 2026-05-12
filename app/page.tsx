"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Mail, Sun, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MorningQueue from "../components/marketing/MorningQueue";
import HealthBreakdownCard from "../components/marketing/HealthBreakdownCard";
import CLVMethodology from "../components/marketing/CLVMethodology";
import NRRForecastMethodology from "../components/marketing/NRRForecastMethodology";
import CoverageRoutingList from "../components/marketing/CoverageRoutingList";
import ForecastAccuracy from "../components/marketing/ForecastAccuracy";
import AccountDetailPreview from "../components/marketing/AccountDetailPreview";
import ManagerReportsPreview from "../components/marketing/ManagerReportsPreview";
import ARRWaterfallPreview from "../components/marketing/ARRWaterfallPreview";
import Pricing from "../components/marketing/Pricing";
import FinalCTA from "../components/marketing/FinalCTA";
import Nav from "../components/marketing/Nav";
import AccountVOCMethodology from "../components/marketing/AccountVOCMethodology";
import BookVOCMethodology from "../components/marketing/BookVOCMethodology";
import AccountQBRMethodology from "../components/marketing/AccountQBRMethodology";

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
  // Foundational metrics
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
  // Operational peak
  {
    eyebrow: "Show me the prep",
    headline: "Every QBR walks in fully prepared.",
    caption:
      "AI assembles the brief from the same signals that feed health and forecasts — so what you say in the QBR matches what's actually true.",
    Component: AccountQBRMethodology,
  },
  // Qualitative signals
  {
    eyebrow: "Show me the signals",
    headline: "Every theme traces back to a source.",
    caption:
      "Sentiment isn't a vibe. It's an aggregate of email tone, ticket urgency, and meeting commentary — with the source visible.",
    Component: AccountVOCMethodology,
  },
  {
    eyebrow: "Show me the patterns",
    headline: "What's true across the whole book.",
    caption:
      "AI surfaces themes that span multiple accounts — so you spot the systemic risk before it shows up in your numbers.",
    Component: BookVOCMethodology,
  },
  // Operational decisions
  {
    eyebrow: "Show me the AI's reasoning",
    headline: "Every CSM evaluated. Every projection shown.",
    caption:
      "When the AI suggests coverage, the lattice behind the choice is fully visible — including capacity impact and what your CSMs need to handle on return.",
    Component: CoverageRoutingList,
  },
  // Self-grading proof
  {
    eyebrow: "Show me the proof",
    headline:
      "Most CS tools forecast and never look back. We publish our own accuracy.",
    caption:
      "Per snapshot, per metric, per period — so you know exactly how much trust to place in next quarter's number based on how last quarter's held up.",
    Component: ForecastAccuracy,
  },
];

const manifesto = {
  eyebrow: "Our manifesto",
  openingLine:
    "We're living through the largest workforce shift since the industrial revolution.",
  paragraph1Rest:
    "Every week, another company announces it's replacing a department with AI. Every major AI company is racing toward the same destination: software that doesn't need humans to run it. The customer success industry is no exception.",
  paragraph2:
    "Two kinds of products are competing for your customer success budget. One can't keep up. The other is chasing the wrong destination. The first was built before AI, on architectures that demand integrations, implementation cycles, and dedicated admins to function. They can bolt AI on, but they can't out-iterate companies built around it — and the buyers who could never afford their stack are still locked out. The second is honest about what they're building: customer success without customer success managers. AI doing 99% of the CSM's job today. So the board can sign off on 100% tomorrow. Their honesty is the warning, not the comfort.",
  paragraph3Before:
    "Evergreen exists because someone had to build the third option. AI is the most powerful tool customer success has ever seen, and we were built around that conviction — but with a line we will never cross.",
  pullQuote: "AI does not replace your CSMs. Ever.",
  paragraph3After:
    "Customer success isn't a function that automates. It's a function that compounds — through trust, context, and judgment only humans accumulate. Every feature in Evergreen makes a CSM more capable. None make one optional.",
  paragraph4:
    "The next decade of customer success will be defined by who used AI to amplify humans, and who used it to remove them. The companies that bet on AI replacement will spend years rebuilding the trust they automated away. The ones that bet on amplifying their teams will be the ones their customers stay with. We built Evergreen for the teams that already know which side they're on. We're going to be on the right side of history. So is every team that comes with us.",
  signature: "— Matt Gilston, Founder",
};

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

const steps: {
  number: string;
  icon: LucideIcon;
  headline: string;
  subHeadline: string;
  body: string;
}[] = [
  {
    number: "01",
    icon: Mail,
    headline: "Connect what you have",
    subHeadline: "Gmail or Outlook. Done.",
    body: "Evergreen reads your customer email signal — the same conversations your CSMs are already having. No data warehouse migration. No CSV imports. No 'foundational data work' that takes a quarter.",
  },
  {
    number: "02",
    icon: Sun,
    headline: "CSMs open Evergreen",
    subHeadline: "First queue is ready that morning.",
    body: "AI prioritizes the first day of accounts based on signal it's seen since you connected. Your CSMs walk into a workspace that already understands their book.",
  },
  {
    number: "03",
    icon: Calendar,
    headline: "Numbers leaders can defend",
    subHeadline: "Within 30 days.",
    body: "Forecast accuracy starts grading itself from snapshot one. Health scores anchor to real engagement, sentiment, behavior, and renewal signals. Every number traces back to a method, not a vibe.",
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

type TabId = "csm" | "manager" | "leader";

const PERSONA_TABS: Record<
  TabId,
  {
    label: string;
    sidebar: { eyebrow: string; headline: string; sub: string };
    Component: ComponentType;
  }
> = {
  csm: {
    label: "CSM",
    sidebar: {
      eyebrow: "For the operator",
      headline: "Every account, fully contextual.",
      sub: "AI briefs the moment of work. Signals trace to source. No manual digging through threads to remember why an account stalled.",
    },
    Component: AccountDetailPreview,
  },
  manager: {
    label: "Manager",
    sidebar: {
      eyebrow: "For the manager",
      headline: "Your team's rhythm, every cadence.",
      sub: "Per-CSM visibility, trend tracking, capacity awareness. Switch cadence to match the conversation — weekly standups to quarterly business reviews.",
    },
    Component: ManagerReportsPreview,
  },
  leader: {
    label: "Leader",
    sidebar: {
      eyebrow: "For the leader",
      headline: "Defensible numbers for the board.",
      sub: "Methodology-backed forecasts. Recovery confidence broken out by save-rate model. Exec-ready visibility without the spreadsheet ceremony.",
    },
    Component: ARRWaterfallPreview,
  },
};

const TAB_ORDER: TabId[] = ["csm", "manager", "leader"];

function Section4() {
  const [activeTab, setActiveTab] = useState<TabId>("csm");
  const Active = PERSONA_TABS[activeTab];
  const ActiveComponent = Active.Component;

  return (
    <section className="py-24">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
          Built for your whole team
        </p>
        <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl">
          Same product. Three lenses. One source of truth.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#666] md:text-[19px]">
          What your CSMs, managers, and CS leadership see in Evergreen — one
          product surface tuned to each.
        </p>
      </motion.div>

      <div className="mb-10 flex justify-center border-b border-[#EAEAEA]">
        {TAB_ORDER.map((id) => (
          <PersonaTab
            key={id}
            label={PERSONA_TABS[id].label}
            active={activeTab === id}
            onClick={() => setActiveTab(id)}
          />
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: FADE_EASE }}
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
      >
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <p className="mb-5 text-[13px] uppercase tracking-[0.10em] text-[#666]">
              {Active.sidebar.eyebrow}
            </p>
            <h3 className="mb-6 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] md:text-[32px] lg:text-[36px]">
              {Active.sidebar.headline}
            </h3>
            <p className="text-[16px] leading-[1.6] text-[#666]">
              {Active.sidebar.sub}
            </p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div
            className="overflow-hidden rounded-xl bg-white"
            style={cardChrome}
          >
            <ActiveComponent />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function PersonaTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative cursor-pointer px-6 py-3 text-[14px] transition-colors ${
        active
          ? "font-bold text-[#16A34A]"
          : "font-medium text-[#666] hover:text-[#0A0A0A]"
      }`}
    >
      {label}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px left-3 right-3 h-[2px] bg-[#16A34A] transition-opacity duration-200"
        style={{ opacity: active ? 1 : 0 }}
      />
    </button>
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
            The AI platform for customer success
          </motion.p>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: FADE_EASE }}
            className="mx-auto max-w-5xl text-balance text-[48px] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#0A0A0A] md:text-[80px] lg:text-[112px]"
          >
            Built to make your CSMs irreplaceable.
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: FADE_EASE }}
            className="mx-auto mt-8 max-w-2xl text-balance text-[17px] leading-[1.45] tracking-[-0.005em] text-[#666] md:text-[19px] lg:text-[22px]"
          >
            Leverage for your CSMs. Board-level confidence for their leaders.
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

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-24 max-w-3xl py-20 md:py-24"
          >
            <div className="border-l-4 border-[#16A34A] pl-8 md:pl-12">
              <p className="mb-8 text-[12px] font-bold uppercase tracking-[0.18em] text-[#666]">
                {manifesto.eyebrow}
              </p>

              <p className="text-balance text-[24px] font-semibold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] md:text-[30px]">
                {manifesto.openingLine}
              </p>

              <p className="mt-7 text-[18px] font-normal leading-[1.7] text-[#0A0A0A] md:text-[19px]">
                {manifesto.paragraph1Rest}
              </p>

              <p className="mt-6 text-[18px] font-normal leading-[1.7] text-[#0A0A0A] md:text-[19px]">
                {manifesto.paragraph2}
              </p>

              <p className="mt-6 text-[18px] font-normal leading-[1.7] text-[#0A0A0A] md:text-[19px]">
                {manifesto.paragraph3Before}
              </p>

              <p className="my-8 text-balance text-[22px] font-bold leading-[1.3] tracking-[-0.015em] text-[#0A0A0A] md:text-[26px]">
                {manifesto.pullQuote}
              </p>

              <p className="mt-6 text-[18px] font-normal leading-[1.7] text-[#0A0A0A] md:text-[19px]">
                {manifesto.paragraph3After}
              </p>

              <p className="mt-6 text-[18px] font-normal leading-[1.7] text-[#0A0A0A] md:text-[19px]">
                {manifesto.paragraph4}
              </p>

              <div className="mt-12">
                <div
                  aria-hidden="true"
                  className="mb-5 h-px w-16 bg-[#C8C8C3]"
                />
                <p className="text-[16px] font-medium text-[#0A0A0A]">
                  {manifesto.signature}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12"
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

        <section className="py-20">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
              Go live in days. Not weeks. Not quarters.
            </p>
            <h2 className="mx-auto max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl">
              Three steps. No 12-week implementation.
            </h2>
          </motion.div>

          <div className="relative mx-auto max-w-7xl">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 hidden h-px bg-[#EAEAEA] lg:block"
              style={{ top: "68px" }}
            />
            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={false}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    style={{
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 * (i + 1),
                      ease: FADE_EASE,
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="rounded-2xl border border-[#EAEAEA] bg-white p-6 md:p-8 lg:p-10"
                  >
                    <p className="mb-6 text-[48px] font-extrabold leading-none tracking-[-0.04em] text-[#16A34A] lg:text-[56px]">
                      {step.number}
                    </p>
                    <h3 className="mb-2 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0A0A0A] lg:text-[24px]">
                      {step.headline}
                    </h3>
                    <p className="mb-4 flex items-center gap-2 text-[17px] font-bold leading-[1.4] tracking-[-0.01em] text-[#0A0A0A]">
                      <Icon
                        size={14}
                        className="shrink-0 text-[#666]"
                        aria-hidden="true"
                      />
                      <span>{step.subHeadline}</span>
                    </p>
                    <p className="text-[16px] leading-[1.6] text-[#666]">
                      {step.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <TreeDivider />

        <Section4 />

        <TreeDivider />

        <motion.section
          {...fadeUp}
          id="methodology"
          className="pb-12 pt-24 text-center"
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.10em] text-[#666]">
            AI as the foundation
          </p>
          <h2 className="mx-auto max-w-5xl text-[44px] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#0A0A0A] md:text-[72px] lg:text-[88px]">
            Every metric in Evergreen earns its place.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#666] md:text-[19px]">
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
                        <p className="text-[16px] leading-[1.6] text-[#666]">
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
    </>
  );
}
