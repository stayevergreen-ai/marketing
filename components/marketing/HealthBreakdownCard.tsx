"use client";

type ComponentRow = {
  key: string;
  label: string;
  rawScore: number;
  weight: number;
  weightedContribution: number;
};

const ACCOUNT = {
  name: "BetterPath HR",
  csm: "Devon Walsh",
  arr: "$340K",
};

const SCORE = 72;
const TONE: "green" | "warn" | "danger" = "warn";

const COMPONENTS: ComponentRow[] = [
  {
    key: "engagement",
    label: "Engagement",
    rawScore: 78,
    weight: 25,
    weightedContribution: 19.5,
  },
  {
    key: "sentiment",
    label: "Sentiment",
    rawScore: 65,
    weight: 25,
    weightedContribution: 16.25,
  },
  {
    key: "behavioral",
    label: "Behavioral",
    rawScore: 62,
    weight: 20,
    weightedContribution: 12.4,
  },
  {
    key: "business",
    label: "Business",
    rawScore: 88,
    weight: 15,
    weightedContribution: 13.2,
  },
  {
    key: "renewalProximity",
    label: "Renewal proximity",
    rawScore: 71,
    weight: 15,
    weightedContribution: 10.65,
  },
];

const TONE_COLOR = {
  green: "#16A34A",
  warn: "#FB923C",
  danger: "#DC2626",
} as const;

const TONE_LABEL = {
  green: "Healthy",
  warn: "Attention",
  danger: "At Risk",
} as const;

const TONE_BG = {
  green: "#F0FDF4",
  warn: "#FFF7ED",
  danger: "#FEF2F2",
} as const;

export default function HealthBreakdownCard() {
  const color = TONE_COLOR[TONE];
  const toneLabel = TONE_LABEL[TONE];
  const toneBg = TONE_BG[TONE];
  const maxContribution = Math.max(
    ...COMPONENTS.map((c) => c.weightedContribution),
  );
  const composite = COMPONENTS.reduce(
    (s, c) => s + c.weightedContribution,
    0,
  );

  return (
    <div className="bg-white text-[#0A0A0A]">
      <div
        className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5"
        style={{ borderLeft: `3px solid ${color}` }}
      >
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Health Score
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            {ACCOUNT.name}
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">
            {ACCOUNT.csm} · {ACCOUNT.arr} ARR · Live calculation
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span
            className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.10em]"
            style={{ color, backgroundColor: toneBg }}
          >
            {toneLabel}
          </span>
          <span
            className="mt-1 text-[40px] font-extrabold leading-none tracking-[-0.03em]"
            style={{ color }}
          >
            {SCORE}
          </span>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          How this is calculated
        </div>
        <p className="text-[13px] leading-[1.55] text-[#1F1F1F]">
          Live composite of five weighted components — engagement, sentiment,
          behavior, business signals, and renewal proximity. Each contributes
          to a 0–100 score; the tone band is derived (green ≥70, attention
          40–69, at-risk &lt;40). Weights are manager-configurable.
        </p>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Component breakdown
        </div>
        <div className="flex flex-col gap-3">
          {COMPONENTS.map((c) => {
            const pct = (c.weightedContribution / maxContribution) * 100;
            return (
              <div
                key={c.key}
                className="-mx-2 rounded-md px-2 py-1.5 transition-colors hover:bg-[#FAFAF9]"
              >
                <div className="mb-1.5 flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px] font-medium text-[#0A0A0A]">
                      {c.label}
                    </span>
                    <span className="text-[10px] text-[#666]">
                      {c.weight}% weight
                    </span>
                  </div>
                  <span className="font-mono text-[12px] tabular-nums text-[#666]">
                    {c.rawScore}/100
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#F0F0F0]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#666]">
          Composite {composite.toFixed(1)} / 100 · Settings → Health Weights
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          How is this calculated? →
        </span>
      </div>
    </div>
  );
}
