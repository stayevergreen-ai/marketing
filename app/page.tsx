"use client";

import { useState } from "react";
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

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: FADE_EASE },
  viewport: { once: true, margin: "-80px" },
} as const;

type Moment = {
  eyebrow: string;
  headline: string;
  caption: string | null;
  Component: ComponentType;
};

const moments: Moment[] = [
  {
    eyebrow: "Show me the formula.",
    headline: "Click any number. See exactly how it was computed.",
    caption: null,
    Component: CLVMethodology,
  },
  {
    eyebrow: "Show me the assumptions.",
    headline:
      "Every threshold, weight, and cap is configurable — and visible.",
    caption:
      "Stretch upside scenarios show what's possible if signals close as expected.",
    Component: NRRForecastMethodology,
  },
  {
    eyebrow: "Show me the AI's reasoning.",
    headline: "Every CSM evaluated. Every projection shown.",
    caption:
      "When the AI suggests coverage, the lattice behind the choice is fully visible.",
    Component: CoverageRoutingList,
  },
  {
    eyebrow: "Show me what's pushing the score.",
    headline: "Five components. Weighted. Traceable.",
    caption:
      "Every health number traces back to engagement, sentiment, behavior, business signals, and renewal proximity.",
    Component: HealthBreakdownCard,
  },
];

const comparisonRows = [
  {
    question: "Show me the formula behind any metric",
    evergreen: "One click on any tile",
    legacy: "Help docs",
    aiReplacement: "Black-box",
  },
  {
    question: "How accurate were last quarter's forecasts vs actual?",
    evergreen: "Per-snapshot drill-down, per metric, per period",
    legacy: "Manual tracking in spreadsheets",
    aiReplacement: "Claimed, not proven",
  },
  {
    question: "Why did the AI pick that CSM for coverage?",
    evergreen: "Every candidate evaluated, with projection",
    legacy: "Rules-based or hidden",
    aiReplacement: "Doesn't ask the human",
  },
  {
    question: "What pushed this account into the at-risk band?",
    evergreen: "5-component health breakdown with weights",
    legacy: "Aggregate score only",
    aiReplacement: "Black-box",
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
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#888]">
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

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="mb-10 flex justify-center border-b border-[#EAEAEA]"
      >
        {TAB_ORDER.map((id) => (
          <PersonaTab
            key={id}
            label={PERSONA_TABS[id].label}
            active={activeTab === id}
            onClick={() => setActiveTab(id)}
          />
        ))}
      </motion.div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: FADE_EASE }}
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
      >
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <p className="mb-5 text-[13px] uppercase tracking-[0.10em] text-[#888]">
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
      className={`relative px-6 py-3 text-[14px] transition-colors ${
        active
          ? "font-bold text-[#16A34A]"
          : "font-medium text-[#888] hover:text-[#0A0A0A]"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="active-persona-tab"
          className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#16A34A]"
          aria-hidden="true"
          transition={{ duration: 0.3, ease: FADE_EASE }}
        />
      )}
    </button>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: FADE_EASE }}
          className="flex items-center gap-2.5 pt-8 md:pt-10"
        >
          <TreeMark size={28} />
          <span className="text-[22px] font-black leading-none tracking-[-0.03em] text-[#0A0A0A]">
            evergreen<span className="text-[#16A34A]">.</span>
          </span>
        </motion.header>

        <section className="pb-24 pt-24 text-center md:pb-32 md:pt-32 lg:pt-40">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: FADE_EASE }}
            className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#888]"
          >
            The AI platform for customer success
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: FADE_EASE }}
            className="mx-auto max-w-5xl text-balance text-[48px] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#0A0A0A] md:text-[80px] lg:text-[112px]"
          >
            Built to make your CSMs irreplaceable.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: FADE_EASE }}
            className="mx-auto mt-8 max-w-2xl text-balance text-[17px] leading-[1.45] tracking-[-0.005em] text-[#666] md:text-[19px] lg:text-[22px]"
          >
            Leverage for your CSMs. Board-level confidence for their leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: FADE_EASE }}
            className="mx-auto mt-12 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center sm:gap-3"
          >
            <motion.a
              href="/demo"
              initial={{ scale: 1, backgroundColor: "#0A0A0A" }}
              whileHover={{ scale: 1.01, backgroundColor: "#16A34A" }}
              transition={{ duration: 0.2, ease: FADE_EASE }}
              className="inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-[15px] font-medium text-white"
            >
              See a demo
            </motion.a>
            <a
              href="/methodology"
              className="inline-flex items-center justify-center rounded-lg border border-[#EAEAEA] bg-transparent px-7 py-3.5 text-[15px] font-medium text-[#0A0A0A] transition-all duration-200 hover:border-[#DDDDDD] hover:bg-[#FAFAF9]"
            >
              See the methodology
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#888]">
              There are two paths…
            </p>
            <h2 className="mx-auto max-w-4xl text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl lg:text-6xl">
              Most AI in customer success is built to replace your CSMs. We bet
              on your team.
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: FADE_EASE }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-2xl bg-white p-6 md:p-8 lg:p-10"
              style={{
                border: "1px solid #EAEAEA",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
              }}
            >
              <p className="mb-6 text-[12px] uppercase tracking-[0.10em] text-[#888]">
                The replacement bet
              </p>
              <h3 className="mb-8 text-[24px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0A0A0A] lg:text-[28px]">
                AI replaces your team
              </h3>
              <ul className="space-y-3 text-[17px] leading-[1.55] text-[#666]">
                <li>AI runs accounts autonomously</li>
                <li>CSMs become optional, then redundant</li>
                <li>Headcount reduction is the ROI story</li>
                <li>When the AI gets it wrong, no one notices</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
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
              <ul className="space-y-3 text-[17px] leading-[1.55] text-[#1F1F1F]">
                <li>AI handles the cognitive switching cost</li>
                <li>CSMs do higher-leverage work, faster</li>
                <li>Your best people get more accounts, not fewer</li>
                <li>When the AI gets it wrong, your CSM catches it</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <TreeDivider />

        <section className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#888]">
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
                    initial={{
                      opacity: 0,
                      y: 16,
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                    }}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                      transition: { duration: 0.2, ease: "easeOut" },
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
                        className="shrink-0 text-[#888]"
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
          className="pb-12 pt-24 text-center"
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.10em] text-[#888]">
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
                      <p className="mb-5 text-[13px] uppercase tracking-[0.10em] text-[#888]">
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

        <motion.section {...fadeUp} className="pb-12 pt-8 text-center">
          <p className="mb-8 text-[13px] uppercase tracking-[0.10em] text-[#888]">
            We grade ourselves
          </p>
          <h2 className="mx-auto max-w-4xl text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] md:text-[52px] lg:text-[64px]">
            Most CS tools forecast and never look back. We publish our own
            accuracy.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#666] md:text-[19px]">
            Per snapshot, per metric, per period — so you know exactly how much
            trust to place in next quarter's number based on how last quarter's
            held up.
          </p>
        </motion.section>

        <motion.div
          {...fadeUp}
          className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white"
          style={cardChrome}
        >
          <ForecastAccuracy />
        </motion.div>

        <motion.section {...fadeUp} className="py-16 text-center">
          <p className="mx-auto max-w-3xl text-[16px] leading-[1.6] text-[#666] md:text-[17px]">
            We grade ourselves on six metrics: NRR, GRR, Logo Retention,
            Expansion, ARR at Risk, and Save Rate. Trailing four quarters.
            Per-snapshot drill-down on every period. Configurable in Settings.
          </p>
        </motion.section>

        <TreeDivider />

        <motion.section {...fadeUp} className="pb-16 pt-8">
          <p className="mb-12 text-[13px] uppercase tracking-[0.10em] text-[#888]">
            The defensibility test
          </p>

          <div
            className="hidden overflow-hidden rounded-xl bg-white md:block"
            style={{
              border: "1.5px solid #E5E5E0",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <table className="w-full border-collapse">
              <thead className="bg-[#FAFAF9]">
                <tr>
                  <th className="px-6 py-5 text-center text-[13px] uppercase tracking-[0.10em] text-[#666]">
                    Question
                  </th>
                  <th
                    className="bg-[#F0F0EC] px-6 py-5 text-center"
                    style={{
                      borderLeft: "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <TreeMark size={16} />
                      <span className="text-[13px] uppercase tracking-[0.10em] text-[#16A34A]">
                        Evergreen
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-[13px] uppercase tracking-[0.10em] text-[#666]">
                    Most CS tools
                  </th>
                  <th className="px-6 py-5 text-center text-[13px] uppercase tracking-[0.10em] text-[#666]">
                    AI-replacement tools
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.question}
                    className="group"
                    style={{
                      borderTop:
                        i === 0 ? "none" : "1px solid #EAEAEA",
                    }}
                  >
                    <td className="px-6 py-5 text-center align-top text-[15px] text-[#0A0A0A] transition-colors duration-200 group-hover:bg-[rgba(74,222,128,0.03)]">
                      {row.question}
                    </td>
                    <td
                      className="bg-[#F0F0EC] px-6 py-5 text-center align-top text-[15px] font-semibold text-[#0A0A0A]"
                      style={{
                        borderLeft: "1.5px solid #E5E5E0",
                        borderRight: "1.5px solid #E5E5E0",
                      }}
                    >
                      {row.evergreen}
                    </td>
                    <td className="px-6 py-5 text-center align-top text-[15px] text-[#888] transition-colors duration-200 group-hover:bg-[rgba(74,222,128,0.03)]">
                      {row.legacy}
                    </td>
                    <td className="px-6 py-5 text-center align-top text-[15px] text-[#888] transition-colors duration-200 group-hover:bg-[rgba(74,222,128,0.03)]">
                      {row.aiReplacement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {comparisonRows.map((row) => (
              <div
                key={row.question}
                className="rounded-xl bg-white p-6"
                style={cardChrome}
              >
                <p className="mb-5 text-[15px] font-bold text-[#0A0A0A]">
                  {row.question}
                </p>
                <div className="space-y-4">
                  <div
                    className="rounded-lg bg-[#F0F0EC] p-3"
                    style={{ border: "1.5px solid #E5E5E0" }}
                  >
                    <div className="mb-1 flex items-center gap-1.5">
                      <TreeMark size={12} />
                      <p className="text-[10px] uppercase tracking-[0.10em] text-[#16A34A]">
                        Evergreen
                      </p>
                    </div>
                    <p className="text-[15px] font-semibold text-[#0A0A0A]">
                      {row.evergreen}
                    </p>
                  </div>
                  <div className="px-1">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.10em] text-[#888]">
                      Most CS tools
                    </p>
                    <p className="text-[15px] text-[#888]">{row.legacy}</p>
                  </div>
                  <div className="px-1">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.10em] text-[#888]">
                      AI-replacement tools
                    </p>
                    <p className="text-[15px] text-[#888]">
                      {row.aiReplacement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="py-20">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="/methodology"
              initial={{ scale: 1, backgroundColor: "#0A0A0A" }}
              whileHover={{ scale: 1.01, backgroundColor: "#16A34A" }}
              transition={{ duration: 0.2, ease: FADE_EASE }}
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[15px] font-bold text-white"
            >
              See the full methodology
              <span aria-hidden="true">→</span>
            </motion.a>
            <a
              href="/demo"
              className="inline-flex items-center rounded-lg bg-transparent px-7 py-3.5 text-[15px] font-bold text-[#0A0A0A] transition-colors duration-200 hover:bg-[#F4F4F3]"
              style={{ border: "1px solid #EAEAEA" }}
            >
              Talk to the founder
            </a>
          </div>
        </motion.section>

        <TreeDivider />

        <Pricing />

        <TreeDivider />

        <div className="flex flex-col items-center gap-3 pb-24 pt-32 opacity-60">
          <TreeMark size={24} />
          <span className="text-xs uppercase tracking-[0.15em] text-[#888]">
            evergreen.
          </span>
        </div>
      </div>
    </main>
  );
}
