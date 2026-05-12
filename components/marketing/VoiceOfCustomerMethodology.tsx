"use client";

import { useState } from "react";
import { Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";

type Scope = "account" | "book" | "org";

const SCOPES: Scope[] = ["account", "book", "org"];

const SCOPE_LABELS: Record<Scope, string> = {
  account: "Account",
  book: "My book",
  org: "Org",
};

type RiskLevel = "high" | "medium" | "low";

type SynthesisSegment =
  | { type: "text"; value: string }
  | { type: "badge"; value: string; risk: RiskLevel };

type Tone = "positive" | "neutral" | "caution" | "risk";
type Trend = "up" | "stable" | "down";
type ThemeTrend = "rising" | "stable" | "falling";

type ContactSentiment = {
  role: string;
  score: string;
  trend: Trend;
  subline: string;
  tone: Tone;
};

type Theme = {
  name: string;
  mentions: number;
  trend: ThemeTrend;
  tone: Tone;
};

type Quote = {
  text: string;
  speaker: string;
  role: string;
  account: string;
  source: string;
  date: string;
};

type ScopeData = {
  contextLine: string;
  suggestedQuestions: [string, string, string];
  activeQuestion: string;
  signalCount: number;
  synthesis: SynthesisSegment[];
  contacts: ContactSentiment[];
  themes: Theme[];
  themeCount: number;
  quotes: Quote[];
  footer: string;
};

const TONE_COLOR: Record<Tone, string> = {
  positive: "#16A34A",
  neutral: "#888888",
  caution: "#FB923C",
  risk: "#DC2626",
};

const RISK_BG: Record<RiskLevel, string> = {
  high: "#FEF2F2",
  medium: "#FFF7ED",
  low: "#F0FDF4",
};

const RISK_TEXT: Record<RiskLevel, string> = {
  high: "#991B1B",
  medium: "#9A3412",
  low: "#166534",
};

const TREND_COLOR: Record<ThemeTrend, string> = {
  rising: "#16A34A",
  stable: "#888888",
  falling: "#DC2626",
};

const TREND_ARROW: Record<ThemeTrend, string> = {
  rising: "↑",
  stable: "→",
  falling: "↓",
};

const SCOPE_DATA: Record<Scope, ScopeData> = {
  account: {
    contextLine: "Asking about Voltura Systems · $480K ARR · Devon Walsh",
    suggestedQuestions: [
      "What are the top concerns from this account?",
      "What's driving the sentiment trend?",
      "Any expansion signals?",
    ],
    activeQuestion: "What's driving the sentiment trend?",
    signalCount: 47,
    synthesis: [
      {
        type: "text",
        value:
          "Voltura health is strong (78/100) with positive trajectory. Champion engagement is rising — Olivia Reid's open rate hit 89% over 30 days. One risk emerging: pricing concern flagged in DPA review with procurement, with Q3 renewal in 47 days.",
      },
    ],
    contacts: [
      {
        role: "Champion",
        score: "+0.78",
        trend: "up",
        subline: "Olivia Reid, VP Eng",
        tone: "positive",
      },
      {
        role: "Decision Maker",
        score: "+0.12",
        trend: "stable",
        subline: "Jamie Wright, CFO",
        tone: "neutral",
      },
      {
        role: "End User",
        score: "+0.45",
        trend: "up",
        subline: "Power user cohort, 5 contacts",
        tone: "positive",
      },
      {
        role: "Detractor",
        score: "-0.34",
        trend: "down",
        subline: "Procurement, 2 contacts",
        tone: "risk",
      },
    ],
    themes: [
      {
        name: "Champion engagement",
        mentions: 12,
        trend: "rising",
        tone: "positive",
      },
      {
        name: "Pricing concern",
        mentions: 8,
        trend: "stable",
        tone: "caution",
      },
      {
        name: "Adoption strong",
        mentions: 6,
        trend: "rising",
        tone: "positive",
      },
      {
        name: "Renewal alignment",
        mentions: 4,
        trend: "rising",
        tone: "positive",
      },
    ],
    themeCount: 4,
    quotes: [
      {
        text: "Q3 alignment is clear — budget cycle wraps in two weeks.",
        speaker: "Olivia Reid",
        role: "Champion",
        account: "Voltura Systems",
        source: "Email",
        date: "May 1",
      },
      {
        text: "Procurement is asking for a value review before renewal. Can we get on calendar?",
        speaker: "Jamie Wright",
        role: "Decision Maker",
        account: "Voltura Systems",
        source: "Email",
        date: "Apr 28",
      },
      {
        text: "The new module shaved 8 hours off our weekly reporting cycle.",
        speaker: "Lin Ramos",
        role: "End User",
        account: "Voltura Systems",
        source: "Slack",
        date: "May 3",
      },
    ],
    footer:
      "Trailing 90 days · 47 signals from Voltura · Updated 4 minutes ago",
  },
  book: {
    contextLine: "Asking across 12 accounts · $4.6M ARR",
    suggestedQuestions: [
      "What's true across my whole book?",
      "Top 3 churn risks right now?",
      "Where am I seeing pricing concern?",
    ],
    activeQuestion: "Top 3 churn risks right now?",
    signalCount: 234,
    synthesis: [
      {
        type: "text",
        value:
          "Three accounts in your book are showing converging churn signals. ",
      },
      { type: "badge", value: "Bridgewater Co.", risk: "medium" },
      {
        type: "text",
        value:
          " flagged pricing concerns in 4 email threads with procurement, with Q3 renewal landing in 47 days. ",
      },
      { type: "badge", value: "Stellar Media", risk: "medium" },
      {
        type: "text",
        value:
          "'s champion has gone quiet — open rate dropped from 78% to 12% over 30 days. ",
      },
      { type: "badge", value: "Acme Corp", risk: "high" },
      {
        type: "text",
        value:
          " shows the strongest signal: 6 risk indicators including DPA review escalation and Tom Willis's CFO transition rumor.",
      },
    ],
    contacts: [
      {
        role: "Champion",
        score: "+0.78",
        trend: "up",
        subline: "Sarah Chen, Bridgewater",
        tone: "positive",
      },
      {
        role: "Decision Maker",
        score: "+0.12",
        trend: "stable",
        subline: "Tom Willis, Acme",
        tone: "neutral",
      },
      {
        role: "End User",
        score: "+0.45",
        trend: "up",
        subline: "Power user cohort, 23 contacts",
        tone: "positive",
      },
      {
        role: "Detractor",
        score: "-0.34",
        trend: "down",
        subline: "Procurement, 4 across book",
        tone: "risk",
      },
    ],
    themes: [
      {
        name: "Pricing concern",
        mentions: 47,
        trend: "rising",
        tone: "caution",
      },
      {
        name: "Renewal alignment",
        mentions: 34,
        trend: "rising",
        tone: "positive",
      },
      {
        name: "Adoption strong",
        mentions: 28,
        trend: "rising",
        tone: "positive",
      },
      {
        name: "Decision-maker turnover",
        mentions: 12,
        trend: "rising",
        tone: "risk",
      },
      {
        name: "Champion strength",
        mentions: 8,
        trend: "stable",
        tone: "positive",
      },
    ],
    themeCount: 6,
    quotes: [
      {
        text: "We're aligned on Q3 direction — just need to confirm budget cycle timing.",
        speaker: "Sarah Chen",
        role: "Champion",
        account: "Bridgewater Co.",
        source: "Email",
        date: "May 1",
      },
      {
        text: "Procurement is asking for a value review before renewal. Can we get on calendar?",
        speaker: "Tom Willis",
        role: "Decision Maker",
        account: "Acme Corp",
        source: "Email",
        date: "Apr 28",
      },
      {
        text: "Module B is exactly what we needed. Eng team is asking about adding a second region.",
        speaker: "Diego Patel",
        role: "End User",
        account: "Stellar Media",
        source: "Slack",
        date: "May 3",
      },
    ],
    footer:
      "Trailing 90 days · 234 signals across 12 accounts · Updated 4 minutes ago",
  },
  org: {
    contextLine: "Asking across 86 accounts · $97.2M CLV",
    suggestedQuestions: [
      "What themes span the most ARR?",
      "Where are we most exposed?",
      "What's rising fastest?",
    ],
    activeQuestion: "Where are we most exposed?",
    signalCount: 1842,
    synthesis: [
      {
        type: "text",
        value:
          "Org-wide patterns show three concentrated risk areas. ",
      },
      { type: "badge", value: "Pricing concern", risk: "medium" },
      {
        type: "text",
        value:
          " is rising across 18 accounts with renewals in next 60 days, concentrated in the mid-market segment ($14.3M total ARR exposure). ",
      },
      { type: "badge", value: "Decision-maker turnover", risk: "high" },
      {
        type: "text",
        value:
          " detected in 7 accounts via email signal analysis. ",
      },
      { type: "badge", value: "Champion strength", risk: "low" },
      {
        type: "text",
        value:
          " remains a positive signal, with 23 accounts showing 2+ engaged advocates.",
      },
    ],
    contacts: [
      {
        role: "Champion",
        score: "+0.62",
        trend: "up",
        subline: "147 across org",
        tone: "positive",
      },
      {
        role: "Decision Maker",
        score: "+0.18",
        trend: "stable",
        subline: "234 across org",
        tone: "neutral",
      },
      {
        role: "End User",
        score: "+0.41",
        trend: "up",
        subline: "1,847 contacts org-wide",
        tone: "positive",
      },
      {
        role: "Detractor",
        score: "-0.28",
        trend: "down",
        subline: "62 procurement / IT contacts",
        tone: "caution",
      },
    ],
    themes: [
      {
        name: "Pricing concern",
        mentions: 156,
        trend: "rising",
        tone: "caution",
      },
      {
        name: "Champion strength",
        mentions: 89,
        trend: "stable",
        tone: "positive",
      },
      {
        name: "Adoption gap",
        mentions: 73,
        trend: "rising",
        tone: "caution",
      },
      {
        name: "Renewal alignment",
        mentions: 67,
        trend: "rising",
        tone: "positive",
      },
      {
        name: "Decision-maker turnover",
        mentions: 41,
        trend: "rising",
        tone: "risk",
      },
    ],
    themeCount: 9,
    quotes: [
      {
        text: "Procurement timeline is tighter this quarter — every renewal is now a value review.",
        speaker: "Maria Vargas",
        role: "Decision Maker",
        account: "Globex Industries",
        source: "Email",
        date: "May 2",
      },
      {
        text: "Module B saved us 12 hours a week per team.",
        speaker: "Diego Patel",
        role: "End User",
        account: "Stellar Media",
        source: "Slack",
        date: "May 3",
      },
      {
        text: "New CFO took over — they've never seen the contract value review.",
        speaker: "Anonymous Champion",
        role: "Champion",
        account: "Pinewood Partners",
        source: "Email",
        date: "Apr 30",
      },
    ],
    footer:
      "Trailing 90 days · 1,842 signals across 86 accounts · Updated 4 minutes ago",
  },
};

export default function VoiceOfCustomerMethodology() {
  const [scope, setScope] = useState<Scope>("book");
  const data = SCOPE_DATA[scope];

  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="border-b border-[#EAEAEA] px-6 py-5">
        <div className="inline-flex items-center gap-1 rounded-lg bg-[#F5F5F4] p-1">
          {SCOPES.map((s) => {
            const active = scope === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setScope(s)}
                className={
                  active
                    ? "rounded-md bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#16A34A] shadow-sm"
                    : "cursor-pointer rounded-md px-3.5 py-1.5 text-[12px] font-medium text-[#666] transition-colors hover:text-[#0A0A0A]"
                }
              >
                {SCOPE_LABELS[s]}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[12px] text-[#666]">{data.contextLine}</p>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div
          className="flex items-center gap-2.5 rounded-lg px-3.5 py-3"
          style={{ background: "#FAFAFA", border: "0.5px solid #EAEAEA" }}
        >
          <Sparkles
            size={14}
            className="shrink-0 text-[#16A34A]"
            aria-hidden="true"
          />
          <span className="flex-1 text-[13px] text-[#999]">
            Ask the VOC...
          </span>
          <kbd className="hidden rounded border border-[#EAEAEA] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#999] sm:inline-block">
            ⏎
          </kbd>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {data.suggestedQuestions.map((q) => {
            const isActive = q === data.activeQuestion;
            return (
              <span
                key={q}
                className={
                  isActive
                    ? "inline-flex items-center rounded-full border border-[#16A34A] bg-[#F0FDF4] px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]"
                    : "inline-flex cursor-default items-center rounded-full border border-[#EAEAEA] bg-white px-2.5 py-1 text-[11px] text-[#666] transition-colors hover:border-[#16A34A] hover:text-[#16A34A]"
                }
              >
                {q}
              </span>
            );
          })}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          AI Synthesis · Drawn from {data.signalCount.toLocaleString()} signals
        </div>
        <p className="text-[13px] leading-[1.65] text-[#1F1F1F]">
          {data.synthesis.map((seg, i) =>
            seg.type === "text" ? (
              <span key={i}>{seg.value}</span>
            ) : (
              <span
                key={i}
                className="whitespace-nowrap rounded px-1.5 py-px font-semibold"
                style={{
                  background: RISK_BG[seg.risk],
                  color: RISK_TEXT[seg.risk],
                }}
              >
                {seg.value}
              </span>
            ),
          )}
        </p>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Sentiment by contact
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {data.contacts.map((c) => (
            <div
              key={c.role}
              className="flex items-center justify-between gap-3 rounded-md p-3"
              style={{
                background: "#FAFAFA",
                border: "0.5px solid #EAEAEA",
              }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: TONE_COLOR[c.tone] }}
                    aria-hidden="true"
                  />
                  <span className="text-[12px] font-semibold text-[#0A0A0A]">
                    {c.role}
                  </span>
                </div>
                <p className="mt-1 truncate text-[11px] text-[#666]">
                  {c.subline}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <span
                  className="font-mono text-[14px] font-bold tabular-nums"
                  style={{ color: TONE_COLOR[c.tone] }}
                >
                  {c.score}
                </span>
                <TrendIcon trend={c.trend} color={TONE_COLOR[c.tone]} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Top themes · {data.themeCount} active
        </div>
        <div className="flex flex-col">
          {data.themes.map((t, i) => (
            <div
              key={t.name}
              className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-[#FAFAF9]"
              style={{
                borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
              }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: TONE_COLOR[t.tone] }}
                aria-hidden="true"
              />
              <span className="flex-1 truncate text-[12.5px] font-semibold text-[#0A0A0A]">
                {t.name}
              </span>
              <span className="shrink-0 font-mono text-[11px] tabular-nums text-[#666]">
                {t.mentions} mentions
              </span>
              <span
                className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.06em] tabular-nums"
                style={{ color: TREND_COLOR[t.trend] }}
              >
                {TREND_ARROW[t.trend]} {t.trend}
              </span>
              <span
                className="shrink-0 text-[#bbb]"
                aria-hidden="true"
              >
                ›
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Recent quotes
        </div>
        <div className="flex flex-col gap-3">
          {data.quotes.map((q, i) => (
            <div
              key={i}
              className="rounded-md p-3"
              style={{
                background: "#FAFAFA",
                border: "0.5px solid #EAEAEA",
              }}
            >
              <p className="text-[13px] italic leading-[1.5] text-[#1F1F1F]">
                &ldquo;{q.text}&rdquo;
              </p>
              <p className="mt-2 text-[11px] text-[#666]">
                <span className="font-medium text-[#0A0A0A]">{q.speaker}</span>
                <Sep />
                <span>{q.role}</span>
                <Sep />
                <span>{q.account}</span>
                <Sep />
                <span>{q.source}</span>
                <Sep />
                <span>{q.date}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-6 py-3">
        <span className="text-[11px] text-[#666]">{data.footer}</span>
        <span className="shrink-0 text-[12px] font-medium text-[#16A34A]">
          How is sentiment computed? →
        </span>
      </div>
    </div>
  );
}

function TrendIcon({ trend, color }: { trend: Trend; color: string }) {
  const Icon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  return (
    <Icon
      size={12}
      className="shrink-0"
      style={{ color }}
      aria-hidden="true"
    />
  );
}

function Sep() {
  return <span className="text-[#bbb]"> · </span>;
}
