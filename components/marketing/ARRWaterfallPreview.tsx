"use client";

const ORG = {
  period: "Q3 2026",
  scope: "Customer Success Org · 86 accounts",
  netArr: "$1.94M",
};

type WaterfallStep = {
  label: string;
  absValue: number;
  display: string;
  color: string;
  opacity: number;
};

const WATERFALL_MAX = 2.4; // millions, baseline for bar widths

const WATERFALL: WaterfallStep[] = [
  {
    label: "Starting at-risk",
    absValue: 2.4,
    display: "$2.4M",
    color: "#DC2626",
    opacity: 0.9,
  },
  {
    label: "Save attempts in flight",
    absValue: 0.34,
    display: "+$340K",
    color: "#888888",
    opacity: 0.45,
  },
  {
    label: "Recovered",
    absValue: 0.68,
    display: "−$680K",
    color: "#16A34A",
    opacity: 0.85,
  },
  {
    label: "Lost",
    absValue: 0.12,
    display: "−$120K",
    color: "#7F1D1D",
    opacity: 0.85,
  },
  {
    label: "Net at-risk",
    absValue: 1.94,
    display: "$1.94M",
    color: "#DC2626",
    opacity: 0.9,
  },
];

type Segment = {
  name: string;
  accounts: number;
  arr: string;
  pct: number;
  trend: number;
};

const SEGMENTS: Segment[] = [
  {
    name: "Enterprise",
    accounts: 28,
    arr: "$1.86M",
    pct: 78,
    trend: -4.2,
  },
  { name: "SMB", accounts: 58, arr: "$540K", pct: 22, trend: 1.8 },
];

type Recovery = {
  label: string;
  value: string;
  pct: string;
  color: string;
};

const RECOVERY: Recovery[] = [
  {
    label: "Recoverable based on save-rate model",
    value: "$1.42M",
    pct: "73%",
    color: "#16A34A",
  },
  {
    label: "Likely lost without intervention",
    value: "$480K",
    pct: "25%",
    color: "#FB923C",
  },
  {
    label: "Confirmed churn",
    value: "$40K",
    pct: "2%",
    color: "#7F1D1D",
  },
];

export default function ARRWaterfallPreview() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
            ARR at Risk · {ORG.period}
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            Save flow & recovery confidence
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">{ORG.scope}</p>
        </div>
        <span className="shrink-0 font-mono text-[28px] font-extrabold tracking-[-0.03em] tabular-nums text-[#0A0A0A]">
          {ORG.netArr}
        </span>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Quarter-to-date waterfall
        </div>
        <div className="flex flex-col gap-2">
          {WATERFALL.map((item) => {
            const widthPct = (item.absValue / WATERFALL_MAX) * 100;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 transition-colors hover:bg-[#FAFAF9] -mx-2 rounded-md px-2 py-1"
              >
                <span className="w-[160px] shrink-0 text-[11px] text-[#666]">
                  {item.label}
                </span>
                <div
                  className="relative h-5 flex-1 overflow-hidden rounded-sm bg-[#FAFAFA]"
                  style={{ border: "0.5px solid #EAEAEA" }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: `${widthPct}%`,
                      background: item.color,
                      opacity: item.opacity,
                    }}
                  />
                </div>
                <span className="w-[80px] shrink-0 text-right font-mono text-[12px] font-semibold tabular-nums text-[#0A0A0A]">
                  {item.display}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          By segment
        </div>
        <div
          className="overflow-hidden rounded-md"
          style={{ border: "0.5px solid #EAEAEA" }}
        >
          <table className="w-full text-[12px]">
            <thead className="bg-[#FAFAFA]">
              <tr>
                <ColumnHeader>Segment</ColumnHeader>
                <ColumnHeader align="right">Accounts</ColumnHeader>
                <ColumnHeader align="right">At-risk ARR</ColumnHeader>
                <ColumnHeader align="right">% of total</ColumnHeader>
                <ColumnHeader align="right">Trend</ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {SEGMENTS.map((s, i) => {
                const decreasing = s.trend < 0;
                return (
                  <tr
                    key={s.name}
                    className="transition-colors hover:bg-[#FAFAF9]"
                    style={{
                      borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                    }}
                  >
                    <Cell>{s.name}</Cell>
                    <Cell align="right">{s.accounts}</Cell>
                    <Cell align="right" mono>
                      {s.arr}
                    </Cell>
                    <Cell align="right">{s.pct}%</Cell>
                    <Cell align="right">
                      <span
                        className="font-mono text-[11px] tabular-nums"
                        style={{
                          color: decreasing ? "#16A34A" : "#DC2626",
                        }}
                      >
                        {decreasing ? "↓" : "↑"} {Math.abs(s.trend).toFixed(1)}%
                      </span>
                    </Cell>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Recovery confidence
        </div>
        <div className="flex flex-col gap-1.5">
          {RECOVERY.map((r) => (
            <div
              key={r.label}
              className="-mx-2 flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-[#FAFAF9]"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: r.color }}
                aria-hidden="true"
              />
              <span className="flex-1 text-[12px] text-[#1F1F1F]">
                {r.label}
              </span>
              <span className="font-mono text-[12px] font-semibold tabular-nums text-[#0A0A0A]">
                {r.value}
              </span>
              <span className="w-10 text-right font-mono text-[11px] tabular-nums text-[#666]">
                {r.pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#888]">
          Save-rate model · trailing 4Q baseline
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          How is recovery confidence calculated? →
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
      className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#888]"
      style={{ textAlign: align }}
    >
      {children}
    </th>
  );
}

function Cell({
  children,
  align = "left",
  mono,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  mono?: boolean;
}) {
  return (
    <td
      className={`px-3 py-2 text-[12px] text-[#1F1F1F] ${
        mono ? "font-mono tabular-nums" : ""
      }`}
      style={{ textAlign: align }}
    >
      {children}
    </td>
  );
}
