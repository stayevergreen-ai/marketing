"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const WALKTHROUGH_MAILTO =
  "mailto:matt@stayevergreen.ai?subject=Evergreen%20walkthrough";

export type HighlightTab = "handoff" | "qbr" | "voc" | "ooo";

const TAB_ORDER: HighlightTab[] = ["handoff", "qbr", "voc", "ooo"];

const TAB_LABELS: Record<HighlightTab, string> = {
  handoff: "Sales-to-CS Handoff",
  qbr: "QBR",
  voc: "VOC",
  ooo: "OOO Coverage",
};

const TAB_HEADLINES: Record<HighlightTab, string> = {
  handoff: "AE submits once. AI extracts. CSM reviews.",
  qbr: "Two audiences, one build.",
  voc: "Themes across your book, grounded in real quotes.",
  ooo: "When a CSM is out, customers don't notice.",
};

const TAB_SUPPORTS: Record<HighlightTab, string> = {
  handoff:
    "Contacts, goals, risks, commitments — structured the moment the handoff lands.",
  qbr: "Internal strategy memo and customer-facing deck, both grounded in the same data.",
  voc: "Ask a question. Get an answer pulled from real customer conversations, not surveys.",
  ooo: "Routed by industry, relationship history, and live capacity. The math is visible.",
};

export default function HighlightReelModal({
  open,
  initialTab,
  onClose,
}: {
  open: boolean;
  initialTab: HighlightTab;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<HighlightTab>(initialTab);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setActiveTab(initialTab);
  }, [open, initialTab]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="reel-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm sm:p-6"
          style={{ background: "rgba(0, 0, 0, 0.6)" }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            key="reel-modal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: FADE_EASE }}
            className="relative max-h-[88vh] w-full max-w-[760px] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            style={{
              border: "1px solid #EAEAEA",
              scrollbarWidth: "thin",
              scrollbarColor: "#E0E0E0 #FFFFFF",
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Feature highlight reel"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close highlight reel"
              className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-[#888] transition-colors hover:bg-black/5 hover:text-[#0A0A0A]"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#999]">
                See it in action
              </p>

              <div className="mb-6 mt-4 flex items-center gap-1 overflow-x-auto border-b border-[#EAEAEA]">
                {TAB_ORDER.map((tab) => {
                  const active = tab === activeTab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={
                        active
                          ? "relative shrink-0 cursor-pointer px-3 pb-3 pt-2 text-[12.5px] font-bold text-[#0A0A0A] transition-colors sm:text-[13.5px]"
                          : "relative shrink-0 cursor-pointer px-3 pb-3 pt-2 text-[12.5px] font-medium text-[#666] transition-colors hover:text-[#0A0A0A] sm:text-[13.5px]"
                      }
                    >
                      {TAB_LABELS[tab]}
                      {active ? (
                        <motion.span
                          layoutId="reel-tab-underline"
                          className="absolute -bottom-px left-0 right-0 h-[2px] bg-[#16A34A]"
                          aria-hidden="true"
                          transition={{
                            duration: 0.25,
                            ease: FADE_EASE,
                          }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: FADE_EASE }}
                >
                  <div className="mb-5">
                    {activeTab === "handoff" ? <HandoffVisual /> : null}
                    {activeTab === "qbr" ? <QBRVisual /> : null}
                    {activeTab === "voc" ? <VOCVisual /> : null}
                    {activeTab === "ooo" ? <OOOVisual /> : null}
                  </div>
                  <h3 className="text-balance text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[22px]">
                    {TAB_HEADLINES[activeTab]}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-[#1F1F1F]">
                    {TAB_SUPPORTS[activeTab]}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex flex-col gap-3 border-t border-[#EAEAEA] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[12.5px] text-[#444]">
                  Want to see it live?
                </span>
                <a
                  href={WALKTHROUGH_MAILTO}
                  className="inline-flex items-center gap-1.5 self-start rounded-md bg-[#16A34A] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#15803D] sm:self-auto"
                >
                  Book a walkthrough
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

const TIER_TONE: Record<"green" | "neutral" | "amber", string> = {
  green: "#15803D",
  neutral: "#666",
  amber: "#9A3412",
};
const TIER_BG: Record<"green" | "neutral" | "amber", string> = {
  green: "#F0FDF4",
  neutral: "#F5F5F4",
  amber: "#FFF7ED",
};

function HandoffVisual() {
  const contacts: {
    name: string;
    role: string;
    tier: string;
    tone: "green" | "neutral" | "amber";
  }[] = [
    {
      name: "Priya Raman",
      role: "VP Engineering",
      tier: "Champion",
      tone: "green",
    },
    {
      name: "Tom Blackwell",
      role: "Chief Financial Officer",
      tier: "Decision Maker",
      tone: "neutral",
    },
    {
      name: "Mike Donovan",
      role: "Director of Operations",
      tier: "End User",
      tone: "green",
    },
    {
      name: "Janet Liu",
      role: "Procurement Analyst",
      tier: "Detractor",
      tone: "amber",
    },
  ];
  const goals: { text: string }[] = [
    { text: "Expand to Module B across 2 additional teams in Q3" },
    { text: "Hit 200 active users by end of Q2 (currently 147)" },
    { text: "Publish quarterly value review with procurement before renewal" },
  ];
  const risks: { text: string; severity: "amber" | "red"; flag: string }[] = [
    {
      text: "Decision-maker turnover — Tom Blackwell exit rumored",
      severity: "red",
      flag: "8 days",
    },
    {
      text: "Procurement pricing review flagged in DPA",
      severity: "amber",
      flag: "Apr 14",
    },
  ];
  return (
    <div
      className="rounded-lg bg-white p-5"
      style={{ border: "1px solid #E8E8E8" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Check
            size={12}
            strokeWidth={2.75}
            className="text-[#16A34A]"
            aria-hidden="true"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
            Parsed with AI
          </span>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.10em] text-[#888]">
          Voltura Systems · Handoff
        </span>
      </div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
        Contacts · 4 extracted
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {contacts.map((c) => (
          <div
            key={c.name}
            className="rounded-md p-3"
            style={{
              border: "0.5px solid #EAEAEA",
              background: "#FAFAFA",
            }}
          >
            <p className="text-[12px] font-semibold text-[#0A0A0A]">
              {c.name}
            </p>
            <p className="mt-0.5 text-[11px] text-[#444]">{c.role}</p>
            <span
              className="mt-2 inline-block rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em]"
              style={{
                color: TIER_TONE[c.tone],
                background: TIER_BG[c.tone],
              }}
            >
              {c.tier}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-[#EAEAEA] pt-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Goals · 4 identified
        </p>
        <ul className="flex flex-col gap-1.5">
          {goals.map((g) => (
            <li key={g.text} className="flex items-start gap-2.5 py-0.5">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A34A]"
              />
              <span className="flex-1 text-[12px] leading-[1.5] text-[#1F1F1F]">
                {g.text}
              </span>
              <span
                className="shrink-0 rounded px-1.5 py-px text-[9.5px] font-bold uppercase tracking-[0.08em]"
                style={{ color: "#9A3412", background: "#FFF7ED" }}
              >
                Pending review
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-[#EAEAEA] pt-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Risks · 3
        </p>
        <ul className="flex flex-col gap-1.5">
          {risks.map((r) => (
            <li key={r.text} className="flex items-start gap-2.5 py-0.5">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background:
                    r.severity === "red" ? "#DC2626" : "#FB923C",
                }}
              />
              <span className="flex-1 text-[12px] leading-[1.5] text-[#1F1F1F]">
                {r.text}
              </span>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-[#888]">
                {r.flag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function QBRVisual() {
  return (
    <div
      className="rounded-lg bg-white"
      style={{ border: "1px solid #E8E8E8" }}
    >
      <div className="border-b border-[#EAEAEA] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-[#444]">
            Voltura Systems · Q2 2026
          </p>
          <span
            className="rounded-md px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.10em]"
            style={{ color: "#15803D", background: "#F0FDF4" }}
          >
            Draft 87%
          </span>
        </div>
        <div className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#F5F5F4] p-1">
          <span className="rounded-md bg-white px-3 py-1 text-[11px] font-semibold text-[#16A34A] shadow-sm">
            Internal
          </span>
          <span className="rounded-md px-3 py-1 text-[11px] font-medium text-[#666]">
            External
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
            Progress Review
          </p>
          <p className="text-[12.5px] leading-[1.55] text-[#1F1F1F]">
            Active users 147 of 200 (74%) — pace for end-of-Q2.
          </p>
          <div className="mt-3 border-l-2 border-[#16A34A] pl-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
              Say
            </p>
            <p className="mt-0.5 text-[11.5px] italic leading-[1.5] text-[#1F1F1F]">
              &ldquo;You&rsquo;re tracking active users at 74% of your Q1
              commitment. Trajectory is healthy.&rdquo;
            </p>
          </div>
          <p className="mt-2 text-[10px] text-[#666]">
            <span className="font-bold uppercase tracking-[0.10em]">
              Ref:
            </span>{" "}
            Q1 commitment · usage data
          </p>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
            Risks + Commitments
          </p>
          <ul className="flex flex-col gap-2">
            <li className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FB923C]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium leading-[1.4] text-[#1F1F1F]">
                  Module B adoption gap (Ops team) — 12% active vs 60%
                  target
                </p>
                <span
                  className="mt-1 inline-block rounded px-1.5 py-px text-[9.5px] font-bold uppercase tracking-[0.08em]"
                  style={{ color: "#9A3412", background: "#FFF7ED" }}
                >
                  Open · need plan
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A34A]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium leading-[1.4] text-[#1F1F1F]">
                  Procurement value review confirmed for May 22
                </p>
                <span
                  className="mt-1 inline-block rounded px-1.5 py-px text-[9.5px] font-bold uppercase tracking-[0.08em]"
                  style={{ color: "#15803D", background: "#F0FDF4" }}
                >
                  Committed
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#EAEAEA] px-5 py-3">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          At-risk callouts
        </p>
        <p className="text-[12px] leading-[1.5] text-[#1F1F1F]">
          <span className="font-semibold">Tom Blackwell (CFO) transition
          rumored.</span>{" "}
          Plan exec briefing once successor named — 30 min, before Q3
          renewal.
        </p>
      </div>
    </div>
  );
}

function VOCVisual() {
  const themes: {
    name: string;
    mentions: number;
    tone: "green" | "amber" | "red";
    trend: "rising" | "stable";
  }[] = [
    { name: "Pricing concern", mentions: 132, tone: "amber", trend: "rising" },
    {
      name: "Renewal alignment",
      mentions: 89,
      tone: "green",
      trend: "rising",
    },
    {
      name: "Adoption strong",
      mentions: 76,
      tone: "green",
      trend: "rising",
    },
    {
      name: "Decision-maker turnover",
      mentions: 38,
      tone: "red",
      trend: "rising",
    },
  ];
  const TONE_COLOR: Record<"green" | "amber" | "red", string> = {
    green: "#16A34A",
    amber: "#FB923C",
    red: "#DC2626",
  };
  return (
    <div
      className="rounded-lg bg-white"
      style={{ border: "1px solid #E8E8E8" }}
    >
      <div className="border-b border-[#EAEAEA] px-5 py-4">
        <p className="text-[11px] text-[#444]">
          Asking across your book · 47 accounts · $12.4M ARR
        </p>
      </div>
      <div className="px-5 py-4">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Top themes · 6 active
        </p>
        <div className="flex flex-col">
          {themes.map((t, i) => (
            <div
              key={t.name}
              className="flex items-center gap-3 py-2"
              style={{
                borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
              }}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: TONE_COLOR[t.tone] }}
                aria-hidden="true"
              />
              <span className="flex-1 text-[12.5px] font-semibold text-[#0A0A0A]">
                {t.name}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-[#444]">
                {t.mentions} mentions
              </span>
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.08em]"
                style={{ color: TONE_COLOR[t.tone] }}
              >
                ↑ {t.trend}
              </span>
            </div>
          ))}
        </div>
        <div
          className="mt-4 rounded-md p-3"
          style={{ background: "#FAFAFA", border: "0.5px solid #EAEAEA" }}
        >
          <p className="text-[12px] italic leading-[1.5] text-[#1F1F1F]">
            &ldquo;Procurement is asking for a value review before renewal.
            Can we get on calendar?&rdquo;
          </p>
          <p className="mt-2 text-[10px] text-[#666]">
            <span className="font-medium text-[#0A0A0A]">Tom Willis</span>{" "}
            · Decision Maker · Acme Corp · Email · Apr 28
          </p>
        </div>
      </div>
    </div>
  );
}

function OOOVisual() {
  const routes: {
    account: string;
    arr: string;
    why: string;
    cover: string;
  }[] = [
    {
      account: "Acme Corp",
      arr: "$480K",
      why: "Same industry vertical · prior shadow on 2024 renewal · 78% capacity",
      cover: "Markham Liu",
    },
    {
      account: "Voltura Systems",
      arr: "$480K",
      why: "Strongest relationship history · attended Q1 QBR · 65% capacity",
      cover: "Sasha Reyes",
    },
    {
      account: "Bridgewater Co",
      arr: "$360K",
      why: "Procurement context familiar · same legal contact · 78% capacity",
      cover: "Markham Liu",
    },
  ];
  return (
    <div
      className="rounded-lg bg-white"
      style={{ border: "1px solid #E8E8E8" }}
    >
      <div className="border-b border-[#EAEAEA] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
            OOO coverage plan
          </p>
          <span
            className="rounded-md px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.10em]"
            style={{ color: "#9A3412", background: "#FFF7ED" }}
          >
            Devon · OOO May 7–14
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#444]">
          22 accounts · $5.7M ARR redistributed in 4 minutes
        </p>
      </div>
      <ul className="flex flex-col">
        {routes.map((r, i) => (
          <li
            key={r.account}
            className="flex items-start gap-3 px-5 py-3"
            style={{ borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA" }}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[12.5px] font-bold text-[#0A0A0A]">
                  {r.account}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-[#666]">
                  {r.arr}
                </span>
              </div>
              <p className="mt-0.5 text-[11.5px] leading-[1.45] text-[#444]">
                Why? {r.why}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-[#BBB]"
            >
              →
            </span>
            <div className="shrink-0 text-right">
              <p className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#888]">
                Cover
              </p>
              <p className="mt-0.5 text-[12px] font-semibold text-[#0A0A0A]">
                {r.cover}
              </p>
            </div>
          </li>
        ))}
        <li
          className="flex items-start gap-3 px-5 py-3"
          style={{
            borderTop: "0.5px solid #EAEAEA",
            background: "#FAFAF9",
          }}
        >
          <div className="min-w-0 flex-1">
            <span className="text-[12px] font-medium italic text-[#666]">
              + 19 more accounts
            </span>
            <span className="ml-2 font-mono text-[11px] tabular-nums text-[#666]">
              $2.8M total
            </span>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 shrink-0 text-[#BBB]"
          >
            →
          </span>
          <div className="shrink-0 text-right">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#888]">
              Cover
            </p>
            <p className="mt-0.5 text-[12px] font-semibold text-[#0A0A0A]">
              5 CSMs
            </p>
          </div>
        </li>
      </ul>
      <p className="border-t border-[#EAEAEA] px-5 py-3 text-center text-[11px] italic text-[#666]">
        Devon OOO May 7–14. 22 accounts redistributed in 4 minutes.
      </p>
    </div>
  );
}
