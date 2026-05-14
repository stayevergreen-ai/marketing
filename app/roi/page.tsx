"use client";

import { useMemo, useState } from "react";
import Nav from "../../components/marketing/Nav";
import Footer from "../../components/marketing/Footer";

const CALENDLY_URL = "https://calendly.com/matt-stayevergreen/30min";

type Inputs = {
  csms: number;
  csmCost: number;
  hoursRecovered: number;
  workingWeeks: number;
  deferredHire: number;
};

const DEFAULTS: Inputs = {
  csms: 6,
  csmCost: 180000,
  hoursRecovered: 20,
  workingWeeks: 50,
  deferredHire: 200000,
};

const HOURS_PER_WEEK = 40;

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
    const annualHours = inputs.workingWeeks * HOURS_PER_WEEK;
    const hourlyRate = annualHours > 0 ? inputs.csmCost / annualHours : 0;

    const productivity =
      inputs.csms *
      inputs.hoursRecovered *
      inputs.workingWeeks *
      hourlyRate;
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
      inputs.csms * sensitivityHours * inputs.workingWeeks * hourlyRate;
    const sensitivityValue = sensitivityProductivity + inputs.deferredHire;
    const sensitivityMultiplier =
      platformCost > 0 ? sensitivityValue / platformCost : 0;

    return {
      hourlyRate,
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
      <main className="relative min-h-screen pt-16 text-[#ECFDF5]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "1100px",
            height: "1100px",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <section className="relative z-10 px-6 pb-12 pt-16 text-center md:px-12 md:pb-16 md:pt-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#6EE7B7]">
              ROI Calculator
            </p>
            <h1 className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-[#ECFDF5] sm:text-[48px] lg:text-[60px]">
              What does Evergreen actually save you?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.6] text-[rgba(255,255,255,0.70)]">
              Tune the inputs to your team. See the math behind the numbers
              we publish — every assumption is editable, every number traces
              back.
            </p>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-16 md:px-12">
          <div
            className="mx-auto max-w-5xl rounded-2xl bg-white p-8 lg:p-10"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.08)",
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
                      derivedAnnotation={`≈ $${Math.round(results.hourlyRate)}/hr derived`}
                    />
                    <InputRow
                      id="hoursRecovered"
                      label="Hours per week recovered per CSM"
                      annotation="Via AI brief + queue + automated workflows"
                      value={inputs.hoursRecovered}
                      onChange={(v) => update("hoursRecovered", v)}
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

        <section className="relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-20">
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-[#6EE7B7]">
              Ready to see it in action?
            </p>
            <h2 className="text-balance text-3xl font-medium tracking-[-0.02em] text-[#ECFDF5] lg:text-4xl">
              Book a 30-minute walk-through.
            </h2>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[#0A0A0A] transition-all duration-200 hover:scale-[1.02] hover:bg-[#ECFDF5]"
            >
              Book a demo
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <Footer />
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
  derivedAnnotation,
  last,
}: {
  id: string;
  label: string;
  annotation: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  derivedAnnotation?: string;
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
      style={{
        borderBottom: last ? "none" : "1px solid rgba(0, 0, 0, 0.06)",
      }}
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
      <div className="flex shrink-0 flex-col items-end gap-1">
        <div className="flex items-center gap-1.5">
          {prefix ? (
            <span className="text-[15px] text-[#666]">{prefix}</span>
          ) : null}
          <input
            id={id}
            type="text"
            inputMode="numeric"
            value={formatted}
            onChange={handleChange}
            className="w-[110px] rounded-md border border-[rgba(0,0,0,0.12)] bg-white px-3 py-2 text-right text-[16px] font-medium text-[#0A0A0A] outline-none transition-colors focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
          />
        </div>
        {derivedAnnotation ? (
          <span className="text-[11px] text-[#888]">{derivedAnnotation}</span>
        ) : null}
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

      <div
        className="rounded-xl p-6"
        style={{
          background: "#F0FDF4",
          border: "1px solid rgba(22, 163, 74, 0.2)",
        }}
      >
        <div className="text-[40px] font-medium leading-none tracking-[-0.03em] text-[#15803D] md:text-[48px]">
          {multiplierDisplay}
        </div>
        <p className="mt-2 text-[13px] text-[#6B7280]">
          estimated year-one return
        </p>
      </div>

      <div className="mt-6 flex flex-col">
        <ResultRow
          label="Productivity recovered"
          value={formatDollars(results.productivity)}
          explanation="Hours saved by AI-assisted workflows, valued at the CSM's effective hourly rate."
        />
        <ResultRow
          label="Deferred hire savings"
          value={formatDollars(inputs.deferredHire)}
          explanation="Cost of the next CSM hire you don't have to make this year."
        />
        <ResultRow
          label="Total annual value"
          value={formatDollars(results.totalValue)}
          explanation="What Evergreen returns to the business in year one."
          accent
        />
        <ResultRow
          label="Evergreen platform cost"
          value={
            results.isCustom
              ? "Custom — contact us"
              : formatDollars(results.platformCost)
          }
          explanation="Annual subscription based on team size."
        />
        <ResultRow
          label="Net annual ROI"
          value={formatDollars(results.netRoi)}
          explanation="Total value minus platform cost."
          accent
        />
        <ResultRow
          label="Payback period"
          value={paybackDisplay}
          explanation="Months until Evergreen pays for itself."
          last
        />
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
              CSMs × hours per week × working weeks × derived hourly rate
              (annual salary ÷ working weeks ÷ 40 hours).
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
  explanation,
  accent,
  last,
}: {
  label: string;
  value: string;
  explanation?: string;
  accent?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className="py-3"
      style={{
        borderBottom: last
          ? "none"
          : accent
            ? "1px solid rgba(0, 0, 0, 0.10)"
            : "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex items-baseline justify-between gap-3">
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
      {explanation ? (
        <p className="mt-1 text-[12px] leading-[1.4] text-[#888]">
          {explanation}
        </p>
      ) : null}
    </div>
  );
}
