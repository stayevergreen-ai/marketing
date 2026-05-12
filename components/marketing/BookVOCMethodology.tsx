"use client";

const BOOK = {
  csm: "Devon Walsh",
  accountCount: 12,
  totalArr: "$4.6M",
  themeCount: 6,
};

type Trend = "rising" | "stable" | "falling";

type Theme = {
  name: string;
  context: string;
  accounts: number;
  arr: string;
  arrNumeric: number;
  pct: number;
  trend: Trend;
};

const TOP_THEMES: Theme[] = [
  {
    name: "Champion strength",
    context: "Tier 1 accounts have 2+ engaged champions actively advocating",
    accounts: 7,
    arr: "$1.4M",
    arrNumeric: 1400,
    pct: 30,
    trend: "rising",
  },
  {
    name: "Pricing concern",
    context: "Contract renewal pressure from procurement teams",
    accounts: 8,
    arr: "$1.2M",
    arrNumeric: 1200,
    pct: 26,
    trend: "rising",
  },
  {
    name: "Adoption gap",
    context: "Module B usage flat across mid-market accounts",
    accounts: 5,
    arr: "$890K",
    arrNumeric: 890,
    pct: 19,
    trend: "stable",
  },
  {
    name: "Expansion readiness",
    context: "Usage growth + champion advocacy aligned in 4 accounts",
    accounts: 4,
    arr: "$760K",
    arrNumeric: 760,
    pct: 17,
    trend: "stable",
  },
  {
    name: "Decision-maker turnover",
    context: "VP-level changes signaled in 3 accounts via email + Slack",
    accounts: 3,
    arr: "$680K",
    arrNumeric: 680,
    pct: 15,
    trend: "rising",
  },
];

const PATTERN = {
  insight:
    "Pricing concern is concentrated in accounts with renewal in next 60 days. Recommend pre-emptive value review for Acme Corp, Stellar Media, and Bridgewater Co.",
};

const TREND_COLOR = {
  rising: "#16A34A",
  stable: "#888",
  falling: "#DC2626",
} as const;

const TREND_ARROW = {
  rising: "↑",
  stable: "→",
  falling: "↓",
} as const;

const arrTone = (arrNumeric: number): "neutral" | "amber" | "red" => {
  if (arrNumeric >= 1000) return "red";
  if (arrNumeric >= 500) return "amber";
  return "neutral";
};

const ARR_BG = {
  neutral: "#FAFAFA",
  amber: "#FFF7ED",
  red: "#FEF2F2",
} as const;

const ARR_TEXT = {
  neutral: "#1F1F1F",
  amber: "#92400E",
  red: "#7F1D1D",
} as const;

export default function BookVOCMethodology() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Book VOC · Live
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            {BOOK.csm}&apos;s book
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">
            {BOOK.accountCount} accounts · {BOOK.totalArr} ARR ·{" "}
            {BOOK.themeCount} themes detected
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Themes
          </span>
          <span className="mt-1 font-mono text-[28px] font-extrabold tracking-[-0.03em] tabular-nums text-[#0A0A0A]">
            {BOOK.themeCount}
          </span>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Top themes · by ARR exposure
        </div>
        <div
          className="overflow-hidden rounded-md"
          style={{ border: "0.5px solid #EAEAEA" }}
        >
          <table className="w-full text-[12px]">
            <thead className="bg-[#FAFAFA]">
              <tr>
                <ColumnHeader>Theme</ColumnHeader>
                <ColumnHeader align="right">Accounts</ColumnHeader>
                <ColumnHeader align="right">ARR exposure</ColumnHeader>
                <ColumnHeader align="right">% of book</ColumnHeader>
                <ColumnHeader align="right">Trend</ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {TOP_THEMES.map((t, i) => {
                const tone = arrTone(t.arrNumeric);
                return (
                  <tr
                    key={t.name}
                    className="transition-colors hover:bg-[#FAFAF9]"
                    style={{
                      borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                    }}
                  >
                    <td className="px-3 py-2.5 align-top">
                      <div className="font-semibold text-[#0A0A0A]">
                        {t.name}
                      </div>
                      <div className="mt-0.5 text-[11px] leading-[1.35] text-[#666]">
                        {t.context}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right align-top text-[#1F1F1F]">
                      {t.accounts}
                    </td>
                    <td
                      className="px-3 py-2.5 text-right align-top font-mono font-semibold tabular-nums"
                      style={{
                        backgroundColor: ARR_BG[tone],
                        color: ARR_TEXT[tone],
                      }}
                    >
                      {t.arr}
                    </td>
                    <td className="px-3 py-2.5 text-right align-top text-[#1F1F1F]">
                      {t.pct}%
                    </td>
                    <td className="px-3 py-2.5 text-right align-top">
                      <span
                        className="font-mono text-[11px] font-medium tabular-nums"
                        style={{ color: TREND_COLOR[t.trend] }}
                      >
                        {TREND_ARROW[t.trend]} {t.trend}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Cross-account pattern
        </div>
        <div
          className="rounded-md p-4"
          style={{ background: "#FFFBEB", border: "0.5px solid #FDE68A" }}
        >
          <p className="text-[13px] leading-[1.55] text-[#92400E]">
            {PATTERN.insight}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#666]">
          Trailing 90 days · 234 signals across {BOOK.accountCount} accounts
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          How are themes detected? →
        </span>
      </div>
    </div>
  );
}

function ColumnHeader({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#666]"
      style={{ textAlign: align }}
    >
      {children}
    </th>
  );
}
