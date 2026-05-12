"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

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
  qbr: "Internal candor, external clarity.",
  voc: "Themes across your book, grounded in real quotes.",
  ooo: "When a CSM is out, customers don't notice.",
};

const TAB_SUPPORTS: Record<HighlightTab, string> = {
  handoff:
    "Contacts, goals, risks, commitments — structured the moment the handoff lands.",
  qbr: "QBR builds both views from the same source. Update the data once, both stay synced.",
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setActiveTab(initialTab);
  }, [open, initialTab]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeTab]);

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
            className="relative flex max-h-[85vh] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{ border: "1px solid #EAEAEA" }}
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
              className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white/80 p-2 text-[#888] transition-colors hover:bg-black/5 hover:text-[#0A0A0A]"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="shrink-0 px-6 pt-7 sm:px-8 sm:pt-9">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#999]">
                See it in action
              </p>
              <div className="mt-4 flex items-center gap-1 overflow-x-auto border-b border-[#EAEAEA]">
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
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 py-6 sm:px-8"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#E0E0E0 #FFFFFF",
              }}
            >
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
            </div>

            <div className="flex shrink-0 flex-col gap-3 border-t border-[#EAEAEA] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
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
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Raw handoff submission
        </p>
        <span className="text-[10px] uppercase tracking-[0.08em] text-[#888]">
          Voltura Systems
        </span>
      </div>
      <p className="mb-3 text-[10.5px] italic text-[#888]">
        Submitted by Jordan Park · Account Executive · 8 days ago
      </p>
      <div
        className="rounded-md p-4 font-mono text-[12.5px] leading-[1.6] text-[#444]"
        style={{
          background: "#F8F6EF",
          border: "0.5px solid #EAEAEA",
        }}
      >
        <p>
          voltura systems - good call w priya raman vp eng, she&apos;s our
          champ, super bought in. tom blackwell cfo signed off but heard he
          might be leaving for another role idk. mike donovan ops director
          will use it day to day. janet liu in procurement was a bit of a
          pain on pricing pushback, watch her on renewal.
        </p>
        <p className="mt-3">
          goals: hit 200 active users end Q2 (theyre at 147), expand module B
          to 2 more teams Q3, want a quarterly value review with procurement
          before renewal.
        </p>
        <p className="mt-3">
          risks: tom&apos;s transition is real, procurement flagged DPA
          pricing review, also mike mentioned the ops team has been slow to
          adopt module B.
        </p>
        <p className="mt-3">
          contract started Jan, 12 month term, renewal next jan.
        </p>
      </div>

      <div
        className="relative my-6 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#EAEAEA]" />
        <span
          className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1"
          style={{ border: "1px solid #BBF7D0" }}
        >
          <span className="text-[12px] font-bold leading-none text-[#16A34A]">
            ✓
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
            Parsed with AI
          </span>
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
      </div>
      <div className="grid grid-cols-1 gap-px bg-[#EAEAEA] sm:grid-cols-2">
        <div
          className="flex flex-col gap-5 px-5 py-4"
          style={{ background: "#F8F6EF" }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
              Internal · strategy memo
            </p>
            <p className="mt-0.5 text-[10.5px] italic text-[#888]">
              For your team and leadership
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#666]">
              Today&rsquo;s critical conversations
            </p>
            <CoachingBlock
              title="Acknowledge Tom Blackwell's transition before pricing comes up"
              say="Tom, before we dive in, we want to make sure your transition is smooth. Who's stepping into the financial conversation, and how can we set them up for success on the renewal?"
              ref="Tom Blackwell (CFO) transition rumored · Successor not yet named · Renewal in 47 days"
            />
            <CoachingBlock
              title="Address Module B adoption gap with Ops team"
              say="Sarah, we noticed Module B adoption stalled at 12%. Walk me through what's blocking your Ops team and what support would unblock them."
              ref="Module B at 12% vs 60% target · Sarah Chen flagged onboarding friction in last 1:1"
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-[#E8E0CE] pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#666]">
              Quick reference
            </p>

            <QBRSection title="Health signals">
              <QBRBullet tone="green">
                Product usage trending up (+18% MoM)
              </QBRBullet>
              <QBRBullet tone="green">
                Champion (Priya Raman) engagement: high
              </QBRBullet>
              <QBRBullet tone="amber">
                Decision-maker engagement: low — Tom missed last 2 monthly
                checkpoints
              </QBRBullet>
              <QBRBullet tone="amber">
                Support tickets: 3 open (1 P1 on Module B sync)
              </QBRBullet>
            </QBRSection>

            <QBRSection title="Expansion signals">
              <QBRBullet tone="green">
                Procurement requested value review before renewal — Q3
                expansion likely
              </QBRBullet>
              <QBRBullet tone="green">
                Module C interest mentioned by Priya in last 1:1
              </QBRBullet>
            </QBRSection>

            <QBRSection title="Commitment watch">
              <div className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A34A]"
                />
                <p className="flex-1 text-[12px] leading-[1.5] text-[#1F1F1F]">
                  Procurement value review · confirmed for May 22
                </p>
                <span
                  className="shrink-0 rounded px-1.5 py-px text-[9.5px] font-bold uppercase tracking-[0.08em]"
                  style={{ color: "#15803D", background: "#F0FDF4" }}
                >
                  Committed
                </span>
              </div>
            </QBRSection>
          </div>
        </div>

        <div
          className="flex flex-col gap-5 px-5 py-4"
          style={{ background: "#F4FAF5" }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#15803D]">
              External · customer deck
            </p>
            <p className="mt-0.5 text-[10.5px] italic text-[#888]">
              For your customer&apos;s executive team
            </p>
          </div>

          <div>
            <p className="text-[13px] font-bold tracking-[-0.005em] text-[#0A0A0A]">
              Voltura Systems — Q2 2026 Business Review
            </p>
            <p className="mt-0.5 text-[10.5px] text-[#888]">
              Week of May 26, 2026
            </p>
          </div>

          <AgendaSection title="Opening">
            <AgendaBullet>
              Reconnect and align on Q2 priorities ahead of June 14 renewal
            </AgendaBullet>
            <AgendaBullet>
              Review tracking against full team onboarding and ERP
              integration goals
            </AgendaBullet>
          </AgendaSection>

          <AgendaSection title="Progress Review">
            <AgendaBullet>
              ERP integration timeline: where you stand and what support you
              need to go live
            </AgendaBullet>
            <AgendaBullet>
              Ops team adoption: blockers, wins, and next levers for
              engagement
            </AgendaBullet>
          </AgendaSection>

          <AgendaSection title="Value Delivered">
            <AgendaBullet>
              Sustaining 40% manual reporting reduction toward the 80% target
            </AgendaBullet>
            <AgendaBullet>
              Adoption benchmarks for your team versus peers in your industry
            </AgendaBullet>
          </AgendaSection>

          <AgendaSection title="Challenges">
            <AgendaBullet>
              Integration complexity: dedicated technical resources to
              unblock your IT team
            </AgendaBullet>
            <AgendaBullet>
              Commercial discussion: optimizing your investment and renewal
              terms
            </AgendaBullet>
          </AgendaSection>

          <AgendaSection title="Roadmap Preview">
            <AgendaBullet>
              Q2 integration launch and the downstream value unlock for
              operations
            </AgendaBullet>
            <AgendaBullet>
              Post-launch adoption plan to ensure your team drives maximum
              ROI
            </AgendaBullet>
          </AgendaSection>
        </div>
      </div>
      <div className="border-t border-[#EAEAEA] bg-white px-5 py-3">
        <p className="text-center text-[11px] italic text-[#666]">
          Same data. Two audiences. Both updated when the source updates.
        </p>
      </div>
    </div>
  );
}

function CoachingBlock({
  title,
  say,
  ref,
}: {
  title: string;
  say: string;
  ref: string;
}) {
  return (
    <div
      className="py-2 pl-3"
      style={{ borderLeft: "3px solid rgba(22, 163, 74, 0.6)" }}
    >
      <div className="flex items-start gap-2">
        <span
          aria-hidden="true"
          className="mt-[3px] inline-block h-[14px] w-[14px] shrink-0 rounded-[3px] bg-white"
          style={{ border: "1.5px solid #888" }}
        />
        <p className="flex-1 text-[12.5px] font-bold leading-[1.4] text-[#0A0A0A]">
          {title}
        </p>
      </div>
      <div className="ml-[22px] mt-2.5">
        <p className="text-[9.5px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
          Say
        </p>
        <p className="mt-1 text-[12px] italic leading-[1.5] text-[#1F1F1F]">
          &ldquo;{say}&rdquo;
        </p>
      </div>
      <div className="ml-[22px] mt-2.5">
        <p className="text-[9.5px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Ref
        </p>
        <p className="mt-0.5 text-[11px] leading-[1.5] text-[#6B6B6B]">
          {ref}
        </p>
      </div>
    </div>
  );
}

function AgendaSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
        {title}
      </p>
      <ul className="flex flex-col gap-1.5">{children}</ul>
    </div>
  );
}

function AgendaBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span
        aria-hidden="true"
        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#888]"
      />
      <span className="flex-1 text-[12px] leading-[1.5] text-[#1F1F1F]">
        {children}
      </span>
    </li>
  );
}

function QBRSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
        {title}
      </p>
      {children}
    </div>
  );
}

function QBRBullet({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "green" | "amber";
  children: React.ReactNode;
}) {
  const DOT: Record<"neutral" | "green" | "amber", string> = {
    neutral: "#BBB",
    green: "#16A34A",
    amber: "#FB923C",
  };
  return (
    <div className="flex items-start gap-2 py-0.5">
      <span
        aria-hidden="true"
        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: DOT[tone] }}
      />
      <span className="flex-1 text-[12.5px] leading-[1.5] text-[#1F1F1F]">
        {children}
      </span>
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
  type Stakeholder = {
    name: string;
    role: string;
    initials: string;
    initialBg: string;
    initialText: string;
    sentiment: "green" | "amber" | "red";
    trend: "up" | "down" | "stable";
  };
  const stakeholders: Stakeholder[] = [
    {
      name: "Tom Willis",
      role: "Decision Maker",
      initials: "TW",
      initialBg: "#F5F5F4",
      initialText: "#666",
      sentiment: "amber",
      trend: "down",
    },
    {
      name: "Priya Raman",
      role: "Champion",
      initials: "PR",
      initialBg: "#F0FDF4",
      initialText: "#15803D",
      sentiment: "green",
      trend: "up",
    },
    {
      name: "Mike Donovan",
      role: "End User",
      initials: "MD",
      initialBg: "#F0FDF4",
      initialText: "#15803D",
      sentiment: "green",
      trend: "stable",
    },
    {
      name: "Janet Liu",
      role: "Detractor",
      initials: "JL",
      initialBg: "#FFF7ED",
      initialText: "#9A3412",
      sentiment: "red",
      trend: "down",
    },
    {
      name: "Sam Reyes",
      role: "Economic Buyer",
      initials: "SR",
      initialBg: "#F5F5F4",
      initialText: "#666",
      sentiment: "amber",
      trend: "stable",
    },
  ];
  const TREND_ARROW: Record<"up" | "down" | "stable", string> = {
    up: "↑",
    down: "↓",
    stable: "→",
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

      <div className="border-t border-[#EAEAEA] px-5 py-4">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Ask the VOC
        </p>
        <div
          className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5"
          style={{ background: "#FAFAFA", border: "0.5px solid #EAEAEA" }}
        >
          <span
            aria-hidden="true"
            className="text-[12px] font-bold leading-none text-[#16A34A]"
          >
            ✦
          </span>
          <span className="flex-1 truncate text-[12.5px] text-[#1F1F1F]">
            What are my At-Risk accounts saying about onboarding?
          </span>
          <kbd className="hidden rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#999] sm:inline-block">
            ⏎
          </kbd>
        </div>
        <div
          className="mt-3 rounded-md py-3 pl-4 pr-3"
          style={{
            background: "#FBFEFB",
            borderLeft: "3px solid rgba(22, 163, 74, 0.3)",
          }}
        >
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
            AI answer
          </p>
          <p className="text-[12.5px] leading-[1.6] text-[#1F1F1F]">
            Three At-Risk accounts (
            <span className="font-semibold">Halford Capital</span>,{" "}
            <span className="font-semibold">Northfield Industries</span>,{" "}
            <span className="font-semibold">Riverbend Commerce</span>) cited
            onboarding friction in the last 30 days. Two specifically
            mentioned the Module B rollout as a friction point.
            Halford&rsquo;s CFO escalated last week.
          </p>
          <p className="mt-2 text-[10px] text-[#666]">
            <span className="font-bold uppercase tracking-[0.10em]">
              Grounded in:
            </span>{" "}
            3 emails · 2 Slack threads · 1 call transcript
          </p>
        </div>
      </div>

      <div className="border-t border-[#EAEAEA] px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Sentiment by contact · Acme Corp
        </p>
        <p className="mt-0.5 text-[10.5px] italic text-[#888]">
          Stakeholder-level sentiment, not just aggregate.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-2">
          {stakeholders.map((s) => (
            <div
              key={s.name}
              className="flex flex-col items-start gap-1.5 rounded-md p-2.5"
              style={{
                border: "0.5px solid #EAEAEA",
                background: "#FAFAFA",
              }}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                style={{
                  background: s.initialBg,
                  color: s.initialText,
                }}
              >
                {s.initials}
              </span>
              <p className="w-full truncate text-[11px] font-semibold text-[#0A0A0A]">
                {s.name}
              </p>
              <p className="w-full truncate text-[10px] text-[#666]">
                {s.role}
              </p>
              <div className="flex items-center gap-1">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ background: TONE_COLOR[s.sentiment] }}
                />
                <span
                  className="font-mono text-[10px] font-bold leading-none"
                  style={{ color: TONE_COLOR[s.sentiment] }}
                >
                  {TREND_ARROW[s.trend]}
                </span>
              </div>
            </div>
          ))}
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
