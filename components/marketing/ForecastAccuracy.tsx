"use client";

type AccuracyRow = {
  metric: string;
  lastQuarter: string;
  trailing4Q: string;
};

const SUMMARY = {
  headline: "93.8%",
  scope: "Customer Success Team scope · 6 forecast types",
  window: "Trailing 4 closed quarters",
  snapshotsEvaluated: 24,
  missedPeriods: 0,
};

const METHODOLOGY =
  "Forecast accuracy is computed for closed periods by comparing each snapshot's forecasted value against the actual outcome at period end. Accuracy is reported per snapshot, per metric, per period — so you can see exactly where the model held up and where it slipped.";

const FORMULA = "accuracy = 1 − |forecast − actual| ÷ actual";

const PER_TYPE: AccuracyRow[] = [
  { metric: "NRR", lastQuarter: "96.2%", trailing4Q: "93.8%" },
  { metric: "GRR", lastQuarter: "94.1%", trailing4Q: "92.5%" },
  { metric: "Logo Retention", lastQuarter: "97.8%", trailing4Q: "95.4%" },
  { metric: "Expansion", lastQuarter: "88.3%", trailing4Q: "89.1%" },
  { metric: "ARR at Risk", lastQuarter: "91.6%", trailing4Q: "90.2%" },
  { metric: "Save Rate", lastQuarter: "95.5%", trailing4Q: "94.7%" },
];

export default function ForecastAccuracy() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
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
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          What this measures
        </div>
        <p className="text-[13px] leading-[1.55] text-[#1F1F1F]">
          {METHODOLOGY}
        </p>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
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
              {PER_TYPE.map((row, i) => (
                <tr
                  key={row.metric}
                  className="transition-colors hover:bg-[#FAFAF9]"
                  style={{
                    borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                  }}
                >
                  <Cell>{row.metric}</Cell>
                  <Cell align="right" mono>
                    {row.lastQuarter}
                  </Cell>
                  <Cell align="right" mono>
                    {row.trailing4Q}
                  </Cell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          The formula
        </div>
        <div
          className="rounded-md bg-[#FAFAFA] px-3 py-2.5 font-mono text-[12px] leading-[1.5] text-[#1F1F1F]"
          style={{ border: "1px solid #EAEAEA" }}
        >
          {FORMULA}
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#888]">
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
