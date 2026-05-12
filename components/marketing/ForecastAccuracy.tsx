"use client";

type AccuracyRow = {
  metric: string;
  lastQuarter: string;
  trailing4Q: string;
  delta: number;
};

type QuarterRow = {
  metric: string;
  forecast: string;
  actual: string;
  accuracy: string;
};

const SUMMARY = {
  headline: "93.8%",
  scope: "Customer Success Team scope · 6 forecast types",
  window: "Trailing 4 closed quarters",
  recentQuarter: "Q1 2026",
  snapshotsEvaluated: 24,
  missedPeriods: 0,
};

const FORMULA = "accuracy = 1 − |forecast − actual| ÷ actual";

const METHODOLOGY =
  "Forecast accuracy is computed for closed periods by comparing each snapshot's forecasted value against the actual outcome at period end. We report it per snapshot, per metric, per period — granularity matters because aggregated accuracy hides the snapshots and metrics that moved the headline. Six forecast types are covered: NRR, GRR, Logo Retention, Expansion, ARR at Risk, and Save Rate. The headline rolls four trailing closed quarters; closed-period actuals are immutable once locked, and snapshots are versioned by generation date so historical accuracy is reproducible.";

const PER_TYPE: AccuracyRow[] = [
  { metric: "NRR", lastQuarter: "96.2%", trailing4Q: "93.8%", delta: 2.4 },
  { metric: "GRR", lastQuarter: "94.1%", trailing4Q: "92.5%", delta: 1.6 },
  {
    metric: "Logo Retention",
    lastQuarter: "97.8%",
    trailing4Q: "95.4%",
    delta: 2.4,
  },
  {
    metric: "Expansion",
    lastQuarter: "88.3%",
    trailing4Q: "89.1%",
    delta: -0.8,
  },
  {
    metric: "ARR at Risk",
    lastQuarter: "91.6%",
    trailing4Q: "90.2%",
    delta: 1.4,
  },
  {
    metric: "Save Rate",
    lastQuarter: "95.5%",
    trailing4Q: "94.7%",
    delta: 0.8,
  },
];

const RECENT_QUARTER: QuarterRow[] = [
  {
    metric: "NRR",
    forecast: "100.1%",
    actual: "104.1%",
    accuracy: "96.2%",
  },
  {
    metric: "GRR",
    forecast: "87.0%",
    actual: "92.4%",
    accuracy: "94.1%",
  },
  {
    metric: "Expansion",
    forecast: "$883K",
    actual: "$1.00M",
    accuracy: "88.3%",
  },
  {
    metric: "Save Rate",
    forecast: "74.5%",
    actual: "78.0%",
    accuracy: "95.5%",
  },
];

const DRIFT_FACTORS = [
  "Expansion forecasts skew low when champion turnover spikes mid-period — re-baseline triggered automatically at 30-day silence threshold.",
  "Save Rate accuracy improves with longer at-risk dwell time before save attempts; rushed save plays compress signal coverage.",
  "Logo Retention is the most stable type — driven by contractual data with low signal noise.",
];

const SETTINGS = [
  { label: "Snapshot cadence", value: "Monthly" },
  { label: "Period close definition", value: "Calendar quarter" },
  { label: "Variance threshold", value: "±5pp" },
];

export default function ForecastAccuracy() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Forecast Accuracy
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            {SUMMARY.window}
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">{SUMMARY.scope}</p>
        </div>
        <span className="shrink-0 font-mono text-[28px] font-extrabold tracking-[-0.03em] tabular-nums text-[#0A0A0A]">
          {SUMMARY.headline}
        </span>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Formula
        </div>
        <div
          className="rounded-md bg-[#FAFAFA] px-3 py-2.5 font-mono text-[12px] leading-[1.5] text-[#1F1F1F]"
          style={{ border: "1px solid #EAEAEA" }}
        >
          {FORMULA}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          What this measures
        </div>
        <p className="text-[13px] leading-[1.55] text-[#1F1F1F]">
          {METHODOLOGY}
        </p>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Per forecast type
        </div>
        <div
          className="overflow-hidden rounded-md"
          style={{ border: "0.5px solid #EAEAEA" }}
        >
          <table className="w-full text-[12px]">
            <thead className="bg-[#FAFAFA]">
              <tr>
                <ColumnHeader>Forecast type</ColumnHeader>
                <ColumnHeader align="right">Last quarter</ColumnHeader>
                <ColumnHeader align="right">Trailing 4Q</ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {PER_TYPE.map((row, i) => {
                const positive = row.delta >= 0;
                const arrow = positive ? "↑" : "↓";
                const color = positive ? "#16A34A" : "#999";
                return (
                  <tr
                    key={row.metric}
                    className="transition-colors hover:bg-[#FAFAF9]"
                    style={{
                      borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                    }}
                  >
                    <Cell>{row.metric}</Cell>
                    <Cell align="right">
                      <span className="font-mono tabular-nums text-[#1F1F1F]">
                        {row.lastQuarter}
                      </span>
                      <span
                        className="ml-1.5 font-mono text-[11px] tabular-nums"
                        style={{ color }}
                      >
                        {arrow} {Math.abs(row.delta).toFixed(1)}pp
                      </span>
                    </Cell>
                    <Cell align="right" mono>
                      {row.trailing4Q}
                    </Cell>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Most recent closed quarter · {SUMMARY.recentQuarter}
        </div>
        <div className="flex flex-col gap-1.5">
          {RECENT_QUARTER.map((q, i) => (
            <div
              key={q.metric}
              className="text-[12px] leading-[1.5]"
              style={{
                paddingTop: i === 0 ? 0 : 6,
                borderTop: i === 0 ? "none" : "0.5px solid #F4F4F3",
              }}
            >
              <span className="font-semibold text-[#0A0A0A]">{q.metric}</span>
              <span className="text-[#666]"> · forecast </span>
              <span className="font-mono tabular-nums text-[#1F1F1F]">
                {q.forecast}
              </span>
              <span className="text-[#bbb]"> → </span>
              <span className="text-[#666]">actual </span>
              <span className="font-mono tabular-nums text-[#1F1F1F]">
                {q.actual}
              </span>
              <span className="text-[#bbb]"> · </span>
              <span className="font-mono font-semibold tabular-nums text-[#16A34A]">
                {q.accuracy}
              </span>
              <span className="text-[#666]"> accuracy</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Drift factors
        </div>
        <ul className="list-disc space-y-1.5 pl-5 text-[12px] leading-[1.65] text-[#1F1F1F]">
          {DRIFT_FACTORS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Settings driving this
        </div>
        {SETTINGS.map((s) => (
          <SettingsRow key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#666]">
          {SUMMARY.snapshotsEvaluated} snapshots evaluated ·{" "}
          {SUMMARY.missedPeriods} missed periods
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          See snapshot history →
        </span>
      </div>
    </div>
  );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="-mx-3 flex items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[#FAFAF9]">
      <span className="text-[13px] text-[#1F1F1F]">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-[13px] text-[#666]">{value}</span>
        <span className="text-[12px] text-[#16A34A]">→</span>
      </span>
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
