"use client";

const SNAPSHOT = {
  period: "Q3 2026",
  team: "Mid-Market",
  predictedNRR: "103.2%",
  startingARR: "$14.20M",
  predictedEndingARR: "$14.66M",
  accountsInScope: 32,
  expansionProjected: "$890K",
  churnProjected: "$290K",
  stretchNRR: "108.5%",
  stretchDelta: "+5.3pp",
};

const ASSUMPTIONS = [
  "Renewal probability weights: 40 / 20 / 20 / 20 (health · engagement · signals · historical)",
  "Renewal thresholds: 80 / 60 / 40 (renew · at-risk · downgrade)",
  "Historical baseline: trailing 12 months",
  "Coverage factor: 1.00× (no save-rate adjustment)",
];

export default function NRRForecastMethodology() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
            Forecast · NRR
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            Net Revenue Retention
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">
            {SNAPSHOT.period} · {SNAPSHOT.team} team ·{" "}
            {SNAPSHOT.accountsInScope} accounts in scope
          </p>
        </div>
        <span className="shrink-0 font-mono text-[28px] font-extrabold tracking-[-0.03em] tabular-nums text-[#0A0A0A]">
          {SNAPSHOT.predictedNRR}
        </span>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Formula
        </div>
        <div
          className="rounded-md bg-[#FAFAFA] px-3 py-2.5 font-mono text-[12px] leading-[1.5] text-[#1F1F1F]"
          style={{ border: "1px solid #EAEAEA" }}
        >
          NRR = (starting_ARR − churn + expansion) ÷ starting_ARR × 100
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Inputs
        </div>
        <MathRow
          label="Starting ARR (period start)"
          value={SNAPSHOT.startingARR}
        />
        <MathRow
          label="Renewing accounts"
          value={String(SNAPSHOT.accountsInScope)}
          striped
        />
        <MathRow
          label="Expansion projected"
          value={`+ ${SNAPSHOT.expansionProjected}`}
        />
        <MathRow
          label="Churn projected"
          value={`− ${SNAPSHOT.churnProjected}`}
          striped
        />
        <MathRow
          label="Predicted ending ARR"
          value={SNAPSHOT.predictedEndingARR}
          accent
        />
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div
          className="rounded-md p-4"
          style={{ background: "#F0FDF4", border: "0.5px solid #BBF7D0" }}
        >
          <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.10em] text-[#15803D]">
            Stretch upside
          </div>
          <p className="mb-3 text-[12px] leading-[1.5] text-[#065F46]">
            If all signaled expansion closes, save rate hits 100%, and at-risk
            accounts renew at predicted probability.
          </p>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] text-[#1F1F1F]">Stretch NRR</span>
            <span className="font-mono text-[14px] font-bold tabular-nums text-[#15803D]">
              {SNAPSHOT.stretchNRR}
              <span className="ml-2 text-[11px] font-medium">
                ({SNAPSHOT.stretchDelta} above predictive)
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Assumptions
        </div>
        <ul className="list-disc pl-5 text-[12px] leading-[1.7] text-[#1F1F1F]">
          {ASSUMPTIONS.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#888]">
          Settings → Forecasting · Last snapshot: May 1
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          See snapshot history →
        </span>
      </div>
    </div>
  );
}

function MathRow({
  label,
  value,
  accent,
  striped,
}: {
  label: string;
  value: string;
  accent?: boolean;
  striped?: boolean;
}) {
  return (
    <div
      className="-mx-3 flex items-baseline justify-between gap-3 px-3 py-2"
      style={{ background: striped ? "#FAFAFA" : "transparent" }}
    >
      <span
        className={`text-[13px] ${
          accent ? "font-semibold text-[#0A0A0A]" : "text-[#1F1F1F]"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-[13px] tabular-nums ${
          accent ? "font-bold text-[#16A34A]" : "text-[#1F1F1F]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
