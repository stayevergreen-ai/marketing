"use client";

const SCOPE = {
  org: "Customer Success Org",
  window: "Trailing 12 months",
};

const SUMMARY = {
  ltv: "$97.2M",
  accountCount: 86,
  avgARR: "$95K",
  annualChurnRate: "8.4%",
  avgLifetimeYears: "11.9",
};

type AccountRow = {
  accountId: string;
  name: string;
  arr: string;
  health: "green" | "warn" | "danger";
  ltvContribution: string;
};

const TOP_ACCOUNTS: AccountRow[] = [
  {
    accountId: "summit-logistics",
    name: "Summit Logistics",
    arr: "$520K",
    health: "green",
    ltvContribution: "$6.19M",
  },
  {
    accountId: "acme-corp",
    name: "Acme Corp",
    arr: "$480K",
    health: "danger",
    ltvContribution: "$5.71M",
  },
  {
    accountId: "pinewood-partners",
    name: "Pinewood Partners",
    arr: "$440K",
    health: "green",
    ltvContribution: "$5.24M",
  },
  {
    accountId: "globex-industries",
    name: "Globex Industries",
    arr: "$410K",
    health: "danger",
    ltvContribution: "$4.88M",
  },
  {
    accountId: "bridgewater-co",
    name: "Bridgewater Co",
    arr: "$360K",
    health: "warn",
    ltvContribution: "$4.28M",
  },
  {
    accountId: "northfield-health",
    name: "Northfield Health",
    arr: "$310K",
    health: "warn",
    ltvContribution: "$3.69M",
  },
];

const HEALTH_COLOR = {
  green: "#16A34A",
  warn: "#FB923C",
  danger: "#DC2626",
} as const;

export default function CLVMethodology() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Customer Lifetime Value
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            {SCOPE.org}
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">
            {SCOPE.window} · {SUMMARY.accountCount} accounts in scope
          </p>
        </div>
        <span className="shrink-0 font-mono text-[28px] font-extrabold tracking-[-0.03em] tabular-nums text-[#0A0A0A]">
          {SUMMARY.ltv}
        </span>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          How this is calculated
        </div>
        <p className="text-[13px] leading-[1.55] text-[#1F1F1F]">
          Average ARR multiplied by expected customer lifetime. Lifetime is
          derived from the trailing 12-month logo churn rate — floored at 2%
          and capped at 50% to avoid extreme estimates with small samples.
        </p>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          The math
        </div>
        <MathRow
          label="Accounts in scope"
          value={String(SUMMARY.accountCount)}
        />
        <MathRow label="Average ARR" value={SUMMARY.avgARR} striped />
        <MathRow
          label="Trailing 12mo logo churn rate"
          value={SUMMARY.annualChurnRate}
        />
        <MathRow
          label="Avg expected lifetime (1 ÷ churn rate)"
          value={`${SUMMARY.avgLifetimeYears} years`}
          striped
        />
        <MathRow
          label="Customer Lifetime Value (avg ARR × lifetime × accounts)"
          value={SUMMARY.ltv}
          accent
        />
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Settings driving this
        </div>
        <SettingsRow label="Lifetime cap" value="50 years" />
        <SettingsRow label="Methodology baseline" value="Trailing 12 months" />
        <SettingsRow label="Demo data filter" value="Active" />
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Accounts in scope · top contributors
        </div>
        <div
          className="overflow-hidden rounded-md"
          style={{ border: "0.5px solid #EAEAEA" }}
        >
          <table className="w-full text-[12px]">
            <thead className="bg-[#FAFAFA]">
              <tr>
                <ColumnHeader>Account</ColumnHeader>
                <ColumnHeader align="right">ARR</ColumnHeader>
                <ColumnHeader align="center">Health</ColumnHeader>
                <ColumnHeader align="right">LTV contribution</ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {TOP_ACCOUNTS.map((a, i) => (
                <tr
                  key={a.accountId}
                  className="transition-colors hover:bg-[#FAFAF9]"
                  style={{
                    borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                  }}
                >
                  <Cell>{a.name}</Cell>
                  <Cell align="right" mono>
                    {a.arr}
                  </Cell>
                  <Cell align="center">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: HEALTH_COLOR[a.health] }}
                      aria-hidden="true"
                    />
                  </Cell>
                  <Cell align="right" mono>
                    {a.ltvContribution}
                  </Cell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#666]">
          Showing top 6 of {SUMMARY.accountCount}
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          See methodology page →
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
