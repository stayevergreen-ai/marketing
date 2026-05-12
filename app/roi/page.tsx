"use client";

import { useMemo, useState } from "react";
import Nav from "../../components/marketing/Nav";

const CALENDLY_URL = "https://calendly.com/matt-stayevergreen/30min";

type Inputs = {
  csms: number;
  csmCost: number;
  hoursRecovered: number;
  hourlyValue: number;
  workingWeeks: number;
  deferredHire: number;
};

const DEFAULTS: Inputs = {
  csms: 6,
  csmCost: 180000,
  hoursRecovered: 20,
  hourlyValue: 80,
  workingWeeks: 50,
  deferredHire: 200000,
};

const formatDollars = (n: number) => `$${Math.round(n).toLocaleString()}`;
const formatNumber = (n: number) => n.toLocaleString();

function pricingTier(csms: number) {
  if (csms <= 3) {
    return { monthlyBase: 1500, perCsm: 129, isCustom: false };
  }
  if (csms <= 12) {
    return { monthlyBase: 2500, perCsm: 179, isCustom: false };
  }
  return { monthlyBase: 5000, perCsm: 179, isCustom: true };
}

export default function RoiPage() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const update = <K extends keyof Inputs>(key: K, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const productivity =
      inputs.csms *
      inputs.hoursRecovered *
      inputs.workingWeeks *
      inputs.hourlyValue;
    const totalValue = productivity + inputs.deferredHire;

    const tier = pricingTier(inputs.csms);
    const platformCost =
      (tier.monthlyBase + inputs.csms * tier.perCsm) * 12;

    const netRoi = totalValue - platformCost;
    const multiplier = platformCost > 0 ? totalValue / platformCost : 0;
    const paybackMonths =
      totalValue > 0 ? (platformCost / totalValue) * 12 : Infinity;

    const sensitivityHours = inputs.hoursRecovered * 0.75;
    const sensitivityProductivity =
      inputs.csms *
      sensitivityHours *
      inputs.workingWeeks *
      inputs.hourlyValue;
    const sensitivityValue = sensitivityProductivity + inputs.deferredHire;
    const sensitivityMultiplier =
      platformCost > 0 ? sensitivityValue / platformCost : 0;

    return {
      productivity,
      totalValue,
      platformCost,
      isCustom: tier.isCustom,
      netRoi,
      multiplier,
      paybackMonths,
      sensitivityHours,
      sensitivityMultiplier,
    };
  }, [inputs]);

  const paybackDisplay = !isFinite(results.paybackMonths)
    ? "—"
    : results.paybackMonths < 1
      ? "<1 month"
      : `${results.paybackMonths.toFixed(1)} months`;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#FAFAF9] pt-16 text-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <section className="py-24 text-center">
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
              ROI Calculator
            </p>
            <h1 className="mx-auto max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl lg:text-6xl">
              What does Evergreen actually save you?
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#666] md:text-[19px]">
              Tune the inputs to your team. See the math behind the numbers we
              publish — every assumption is editable, every number traces back.
            </p>
          </section>

          <section className="pb-16">
            <div
              className="mx-auto max-w-6xl rounded-2xl bg-white p-8 md:p-10"
              style={{
                border: "1px solid #EAEAEA",
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
                    Your inputs
                  </p>
                  <div className="flex flex-col">
                    <InputRow
                      id="csms"
                      label="Number of CSMs"
                      annotation="Industry mid-market average for $20–100M ARR"
                      value={inputs.csms}
                      onChange={(v) => update("csms", v)}
                    />
                    <InputRow
                      id="csmCost"
                      label="Fully-loaded CSM cost (annual)"
                      annotation="Industry average: $160K–$200K"
                      prefix="$"
                      value={inputs.csmCost}
                      onChange={(v) => update("csmCost", v)}
                    />
                    <InputRow
                      id="hoursRecovered"
                      label="Hours per week recovered per CSM"
                      annotation="Via AI brief + queue + automated workflows"
                      value={inputs.hoursRecovered}
                      onChange={(v) => update("hoursRecovered", v)}
                    />
                    <InputRow
                      id="hourlyValue"
                      label="Hourly value of CSM time"
                      annotation="Industry average for senior CSM"
                      prefix="$"
                      value={inputs.hourlyValue}
                      onChange={(v) => update("hourlyValue", v)}
                    />
                    <InputRow
                      id="workingWeeks"
                      label="Working weeks per year"
                      annotation="Typical with PTO + holidays"
                      value={inputs.workingWeeks}
                      onChange={(v) => update("workingWeeks", v)}
                    />
                    <InputRow
                      id="deferredHire"
                      label="Deferred next-hire cost (annual)"
                      annotation="Typical fully-loaded cost for next CSM hire"
                      prefix="$"
                      value={inputs.deferredHire}
                      onChange={(v) => update("deferredHire", v)}
                      last
                    />
                  </div>
                </div>

                <ResultsColumn
                  results={results}
                  paybackDisplay={paybackDisplay}
                  inputs={inputs}
                />
              </div>
            </div>
          </section>

          <section className="border-t border-[#EAEAEA] py-24 text-center">
            <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
              Ready to see it in action?
            </p>
            <h2 className="mx-auto max-w-2xl text-balance text-[28px] font-bold tracking-[-0.02em] text-[#0A0A0A] md:text-[32px]">
              Book a 30-minute walk-through.
            </h2>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#16A34A] px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:scale-[1.01] hover:bg-[#15803D]"
            >
              Book a demo
            </a>
          </section>
        </div>
      </main>
    </>
  );
}

function InputRow({
  id,
  label,
  annotation,
  value,
  onChange,
  prefix,
  last,
}: {
  id: string;
  label: string;
  annotation: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  last?: boolean;
}) {
  const formatted = prefix === "$" ? value.toLocaleString() : value.toString();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const num = raw === "" ? 0 : Number(raw);
    if (!isNaN(num)) onChange(num);
  };

  return (
    <div
      className="flex items-start justify-between gap-4 py-4"
      style={{ borderBottom: last ? "none" : "1px solid #F0EFEC" }}
    >
      <div className="min-w-0 flex-1">
        <label
          htmlFor={id}
          className="block text-[14px] text-[#555]"
        >
          {label}
        </label>
        <span className="mt-0.5 block text-[12px] leading-[1.4] text-[#888]">
          {annotation}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {prefix ? (
          <span className="text-[15px] text-[#666]">{prefix}</span>
        ) : null}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={formatted}
          onChange={handleChange}
          className="w-[110px] rounded-md border border-[#EAEAEA] bg-white px-3 py-2 text-right text-[16px] font-medium text-[#0A0A0A] outline-none transition-colors focus:border-[#16A34A]"
        />
      </div>
    </div>
  );
}

function ResultsColumn({
  results,
  paybackDisplay,
  inputs,
}: {
  results: {
    productivity: number;
    totalValue: number;
    platformCost: number;
    isCustom: boolean;
    netRoi: number;
    multiplier: number;
    sensitivityHours: number;
    sensitivityMultiplier: number;
  };
  paybackDisplay: string;
  inputs: Inputs;
}) {
  const [showMethodology, setShowMethodology] = useState(false);

  const multiplierDisplay = isFinite(results.multiplier)
    ? `${Math.max(0, Math.round(results.multiplier))}×`
    : "—";

  const sensitivityDisplay = isFinite(results.sensitivityMultiplier)
    ? Math.max(0, Math.round(results.sensitivityMultiplier))
    : 0;

  const headlineMultiplierRounded = Math.max(
    0,
    Math.round(results.multiplier),
  );

  return (
    <div>
      <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
        Your results
      </p>

      <div className="rounded-xl bg-[#FAFAF9] p-6">
        <div className="text-[40px] font-bold leading-none tracking-[-0.03em] text-[#0A0A0A] md:text-[48px]">
          {multiplierDisplay}
        </div>
        <p className="mt-2 text-[13px] text-[#666]">
          estimated year-one return
        </p>
      </div>

      <div className="mt-6 flex flex-col">
        <ResultRow
          label="Productivity recovered"
          value={formatDollars(results.productivity)}
        />
        <ResultRow
          label="Deferred hire savings"
          value={formatDollars(inputs.deferredHire)}
        />
        <ResultRow
          label="Total annual value"
          value={formatDollars(results.totalValue)}
          accent
        />
        <ResultRow
          label="Evergreen platform cost"
          value={
            results.isCustom
              ? "Custom — contact us"
              : formatDollars(results.platformCost)
          }
        />
        <ResultRow
          label="Net annual ROI"
          value={formatDollars(results.netRoi)}
          accent
        />
        <ResultRow label="Payback period" value={paybackDisplay} last />
      </div>

      <div className="mt-6 rounded-lg bg-[#FAFAF9] p-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Sensitivity
        </p>
        <p className="text-[13px] leading-[1.5] text-[#1F1F1F]">
          If hours recovered drops to{" "}
          <span className="font-semibold">
            {Math.round(results.sensitivityHours)}/week
          </span>
          , ROI is{" "}
          <span className="font-semibold">{sensitivityDisplay}×</span> instead
          of{" "}
          <span className="font-semibold">
            {headlineMultiplierRounded}×
          </span>
          .
        </p>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowMethodology((v) => !v)}
          className="text-[13px] font-medium text-[#16A34A] transition-colors hover:text-[#15803D]"
        >
          {showMethodology ? "Hide methodology" : "How is this calculated?"} →
        </button>
        {showMethodology ? (
          <div className="mt-3 rounded-md bg-[#FAFAFA] p-4 text-[12px] leading-[1.65] text-[#1F1F1F]">
            <p>
              <span className="font-semibold">Productivity recovered</span> =
              CSMs × hours per week × working weeks × hourly value of CSM time.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Total annual value</span> =
              productivity recovered + deferred hire cost.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Annual platform cost</span> =
              (monthly base + CSMs × per-CSM rate) × 12. Tier auto-selected
              from CSM count: 1–3 CSMs Starter, 4–12 CSMs Scale, 13+ Custom.
            </p>
            <p className="mt-2">
              <span className="font-semibold">ROI multiplier</span> = total
              annual value ÷ annual platform cost.{" "}
              <span className="font-semibold">Net ROI</span> = total value −
              platform cost.{" "}
              <span className="font-semibold">Payback period</span> = (platform
              cost ÷ total value) × 12 months.
            </p>
            <p className="mt-2">
              <span className="font-semibold">Sensitivity</span> applies a 25%
              reduction to hours recovered to model conservative outcomes.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  accent,
  last,
}: {
  label: string;
  value: string;
  accent?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-baseline justify-between gap-3 py-3"
      style={{ borderBottom: last ? "none" : "0.5px solid #EAEAEA" }}
    >
      <span
        className={
          accent
            ? "text-[13px] font-semibold text-[#0A0A0A]"
            : "text-[13px] text-[#666]"
        }
      >
        {label}
      </span>
      <span
        className={
          accent
            ? "font-mono text-[14px] font-bold tabular-nums text-[#0A0A0A]"
            : "font-mono text-[14px] tabular-nums text-[#1F1F1F]"
        }
      >
        {value}
      </span>
    </div>
  );
}
