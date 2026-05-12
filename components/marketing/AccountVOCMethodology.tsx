"use client";

const ACCOUNT = {
  name: "Voltura Systems",
  csm: "Devon Walsh",
  arr: "$480K",
  sentimentScore: "+0.42",
  sentimentTrend: "+2.3 over 30 days",
};

const SENTIMENT_DATA = [
  0.18, 0.22, 0.15, 0.2, 0.25, 0.12, 0.18, 0.28, 0.32, 0.3, 0.35, 0.4, 0.42,
];

type Inflection = {
  weekIdx: number;
  sentiment: number;
  date: string;
  label: string;
  tone: "positive" | "negative";
};

const INFLECTIONS: Inflection[] = [
  {
    weekIdx: 2,
    sentiment: 0.15,
    date: "Mar 10",
    label: "Onboarding completed across 3 teams",
    tone: "positive",
  },
  {
    weekIdx: 5,
    sentiment: 0.12,
    date: "Apr 14",
    label: "Pricing concern flagged in DPA review",
    tone: "negative",
  },
  {
    weekIdx: 11,
    sentiment: 0.4,
    date: "May 1",
    label: "Champion confirmed Q3 renewal",
    tone: "positive",
  },
];

type Theme = {
  name: string;
  description: string;
  tone: "green" | "amber" | "red";
  trend: "rising" | "stable" | "falling";
  source: string;
};

const THEMES: Theme[] = [
  {
    name: "Renewal alignment",
    tone: "green",
    trend: "rising",
    description: "Champion confirmed Q3 direction during May 1 sync",
    source: "from 6 email threads",
  },
  {
    name: "Pricing concern",
    tone: "amber",
    trend: "stable",
    description: "Procurement flagged DPA review timeline; Tom requested sync",
    source: "from 4 email threads + 1 ticket",
  },
  {
    name: "Adoption strong",
    tone: "green",
    trend: "rising",
    description: "Power users active across new features; reporting flat",
    source: "from behavioral signals",
  },
  {
    name: "Champion engagement",
    tone: "green",
    trend: "rising",
    description: "Sarah Chen open rate 89%, replies within 2h on average",
    source: "from 8 email threads",
  },
];

const TONE_COLOR = {
  green: "#16A34A",
  amber: "#FB923C",
  red: "#DC2626",
} as const;

const TREND_COLOR = {
  rising: "#16A34A",
  stable: "#888",
  falling: "#DC2626",
} as const;

// SVG geometry
const W = 600;
const H = 100;
const Y_CENTER = H / 2;
const Y_RANGE = 35;
const sentimentToY = (s: number) => Y_CENTER - s * Y_RANGE;
const idxToX = (i: number, n: number) => (i / (n - 1)) * W;

export default function AccountVOCMethodology() {
  const polyPoints = SENTIMENT_DATA.map(
    (s, i) => `${idxToX(i, SENTIMENT_DATA.length)},${sentimentToY(s)}`,
  ).join(" ");

  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Account VOC · Live
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            {ACCOUNT.name}
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">
            {ACCOUNT.csm} · {ACCOUNT.arr} ARR · sentiment trending{" "}
            {ACCOUNT.sentimentTrend}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
            Positive
          </span>
          <span className="mt-1 font-mono text-[28px] font-extrabold tracking-[-0.03em] tabular-nums text-[#16A34A]">
            {ACCOUNT.sentimentScore}
          </span>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Sentiment · 90 days
        </div>
        <div
          className="rounded-md p-4"
          style={{ background: "#FAFAFA", border: "0.5px solid #EAEAEA" }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-20 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1={Y_CENTER}
              x2={W}
              y2={Y_CENTER}
              stroke="#DDDDDD"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <polyline
              points={polyPoints}
              fill="none"
              stroke="#16A34A"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
            {INFLECTIONS.map((infl) => (
              <circle
                key={infl.label}
                cx={idxToX(infl.weekIdx, SENTIMENT_DATA.length)}
                cy={sentimentToY(infl.sentiment)}
                r="4"
                fill="white"
                stroke={
                  infl.tone === "positive" ? "#16A34A" : "#FB923C"
                }
                strokeWidth="2"
              />
            ))}
          </svg>
          <div className="mt-3 flex flex-col gap-1">
            {INFLECTIONS.map((infl) => (
              <div
                key={infl.label}
                className="-mx-1 flex items-baseline gap-2 rounded-sm px-1 py-0.5 text-[11px] transition-colors hover:bg-white"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    background:
                      infl.tone === "positive" ? "#16A34A" : "#FB923C",
                  }}
                  aria-hidden="true"
                />
                <span className="w-[58px] shrink-0 font-medium text-[#666]">
                  {infl.date}
                </span>
                <span className="flex-1 text-[#1F1F1F]">{infl.label}</span>
                <span className="shrink-0 text-[#bbb]">›</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Themes · {THEMES.length} active
        </div>
        <div className="flex flex-col gap-1">
          {THEMES.map((t) => (
            <div
              key={t.name}
              className="-mx-2 flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-[#FAFAF9]"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                style={{ background: TONE_COLOR[t.tone] }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[12px] font-semibold text-[#0A0A0A]">
                    {t.name}
                  </span>
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.06em]"
                    style={{ color: TREND_COLOR[t.trend] }}
                  >
                    {t.trend}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-[1.4] text-[#666]">
                  {t.description}
                </p>
                <p className="mt-0.5 text-[10px] italic text-[#888]">
                  {t.source}
                </p>
              </div>
              <span className="shrink-0 text-[#bbb]" aria-hidden="true">
                ›
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#666]">
          Methodology baseline: trailing 90 days · 47 signals analyzed
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          How is sentiment computed? →
        </span>
      </div>
    </div>
  );
}
