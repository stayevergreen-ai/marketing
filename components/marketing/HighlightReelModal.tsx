"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

export type HighlightTab = "handoff" | "qbr" | "voc";

const TAB_ORDER: HighlightTab[] = ["handoff", "qbr", "voc"];

const TAB_LABELS: Record<HighlightTab, string> = {
  handoff: "Sales-to-CS Handoff",
  qbr: "QBR",
  voc: "VOC",
};

const TAB_HEADLINES: Record<HighlightTab, string> = {
  handoff: "AE submits once. AI extracts. CSM reviews.",
  qbr: "Two audiences, one build.",
  voc: "Themes across your book, grounded in real quotes.",
};

const TAB_SUPPORTS: Record<HighlightTab, string> = {
  handoff:
    "Contacts, goals, risks, commitments — structured the moment the handoff lands.",
  qbr: "Internal strategy memo and customer-facing deck, both grounded in the same data.",
  voc: "Ask a question. Get an answer pulled from real customer conversations, not surveys.",
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
            className="relative max-h-[85vh] w-full max-w-[720px] overflow-y-auto rounded-2xl bg-white shadow-2xl"
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

              <div className="mb-6 mt-4 flex items-center gap-1 border-b border-[#EAEAEA]">
                {TAB_ORDER.map((tab) => {
                  const active = tab === activeTab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={
                        active
                          ? "relative cursor-pointer px-3 pb-3 pt-2 text-[13px] font-bold text-[#0A0A0A] transition-colors sm:text-[14px]"
                          : "relative cursor-pointer px-3 pb-3 pt-2 text-[13px] font-medium text-[#888] transition-colors hover:text-[#0A0A0A] sm:text-[14px]"
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
                  </div>
                  <h3 className="text-balance text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[22px]">
                    {TAB_HEADLINES[activeTab]}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#666]">
                    {TAB_SUPPORTS[activeTab]}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex flex-col gap-3 border-t border-[#EAEAEA] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[12px] text-[#888]">
                  Want the full walkthrough?
                </span>
                <a
                  href="/tour"
                  className="inline-flex items-center gap-1.5 self-start rounded-md bg-[#16A34A] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#15803D] sm:self-auto"
                >
                  See the product tour
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
  const TIER_TONE: Record<"green" | "neutral" | "amber", string> = {
    green: "#16A34A",
    neutral: "#888",
    amber: "#FB923C",
  };
  const TIER_BG: Record<"green" | "neutral" | "amber", string> = {
    green: "#F0FDF4",
    neutral: "#F5F5F4",
    amber: "#FFF7ED",
  };
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
        <span className="text-[10px] uppercase tracking-[0.10em] text-[#888]">
          Voltura Systems · handoff
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
            <p className="mt-0.5 text-[11px] text-[#666]">{c.role}</p>
            <span
              className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
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
        <div className="inline-flex items-center gap-1 rounded-lg bg-[#F5F5F4] p-1">
          <span className="rounded-md bg-white px-3 py-1 text-[11px] font-semibold text-[#16A34A] shadow-sm">
            Internal
          </span>
          <span className="rounded-md px-3 py-1 text-[11px] font-medium text-[#888]">
            External
          </span>
        </div>
        <p className="mt-3 text-[11px] text-[#888]">
          Voltura Systems · Q2 2026 · DRAFT 87%
        </p>
      </div>
      <div className="px-5 py-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Progress Review
        </p>
        <p className="text-[12.5px] leading-[1.55] text-[#0A0A0A]">
          Active users hit 147 of 200 target (74%) — on pace for end-of-Q2.
        </p>
        <div className="mt-3 border-l-2 border-[#16A34A] pl-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
            Say
          </p>
          <p className="mt-0.5 text-[11.5px] italic leading-[1.5] text-[#444]">
            &ldquo;You're tracking active users at 74% of your Q1
            commitment. Trajectory is healthy — you'll hit 200 by mid-Q3.&rdquo;
          </p>
        </div>
        <p className="mt-2 text-[10px] text-[#888]">
          <span className="font-bold uppercase tracking-[0.10em]">
            Ref:
          </span>{" "}
          From Q1 QBR commitment · platform usage data
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
    { name: "Pricing concern", mentions: 47, tone: "amber", trend: "rising" },
    {
      name: "Renewal alignment",
      mentions: 34,
      tone: "green",
      trend: "rising",
    },
    { name: "Adoption strong", mentions: 28, tone: "green", trend: "rising" },
    {
      name: "Decision-maker turnover",
      mentions: 12,
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
        <p className="text-[11px] text-[#888]">
          Asking across 12 accounts · $4.6M ARR
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
              className="flex items-center gap-2.5 py-2"
              style={{
                borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
              }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: TONE_COLOR[t.tone] }}
                aria-hidden="true"
              />
              <span className="flex-1 text-[12px] font-semibold text-[#0A0A0A]">
                {t.name}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-[#666]">
                {t.mentions} mentions
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.06em]"
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
          <p className="mt-2 text-[10px] text-[#888]">
            <span className="font-medium text-[#0A0A0A]">Tom Willis</span>{" "}
            · Decision Maker · Acme Corp · Email · Apr 28
          </p>
        </div>
      </div>
    </div>
  );
}
