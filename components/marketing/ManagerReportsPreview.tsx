"use client";

const MANAGER = {
  name: "Amara Diallo",
  team: "Enterprise team",
};

const KPIS = [
  { label: "Active accounts", value: "36", subtitle: "12 / CSM avg" },
  { label: "ARR managed", value: "$6.4M", subtitle: "+8% QoQ" },
  { label: "At-risk ARR", value: "$890K", subtitle: "14% of book" },
  { label: "Renewals 30d", value: "$1.2M", subtitle: "5 accounts" },
];

const CADENCES = ["Weekly", "Monthly", "Quarterly", "Annual"];
const ACTIVE_CADENCE = "Monthly";

type CSMRow = {
  name: string;
  accounts: number;
  arr: string;
  healthAvg: number;
  healthTone: "green" | "warn" | "danger";
  trend: number;
};

const CSMS: CSMRow[] = [
  {
    name: "Devon Walsh",
    accounts: 12,
    arr: "$2.4M",
    healthAvg: 76,
    healthTone: "green",
    trend: 3.2,
  },
  {
    name: "Naomi Okafor",
    accounts: 13,
    arr: "$2.1M",
    healthAvg: 58,
    healthTone: "warn",
    trend: -4.1,
  },
  {
    name: "Kenji Tanaka",
    accounts: 11,
    arr: "$1.9M",
    healthAvg: 71,
    healthTone: "green",
    trend: 1.8,
  },
];

const ACTIVITY = [
  "$1.4M renewed across 8 accounts (88% on-time, 12% renewed late)",
  "$420K expansion signaled across 3 deals in flight; one closed Tuesday",
  "2 escalations resolved by Devon · 1 active for Naomi (Acme Corp legal review)",
];

const HEALTH_COLOR = {
  green: "#16A34A",
  warn: "#FB923C",
  danger: "#DC2626",
} as const;

export default function ManagerReportsPreview() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="border-b border-[#EAEAEA] px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
              Team Performance
            </div>
            <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
              {MANAGER.name} · {MANAGER.team}
            </h3>
            <p className="mt-1 text-[12px] text-[#666]">
              Rollup cadence · viewing {ACTIVE_CADENCE.toLowerCase()}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {CADENCES.map((c) => (
            <CadencePill key={c} label={c} active={c === ACTIVE_CADENCE} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-b border-[#EAEAEA] px-6 py-4 md:grid-cols-4">
        {KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-md px-3 py-2.5 transition-colors hover:bg-[#FAFAF9]"
            style={{ border: "0.5px solid #EAEAEA" }}
          >
            <div className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#666]">
              {k.label}
            </div>
            <div className="mt-1.5 text-[18px] font-semibold tracking-[-0.02em] text-[#0A0A0A]">
              {k.value}
            </div>
            <div className="mt-0.5 text-[11px] text-[#666]">{k.subtitle}</div>
          </div>
        ))}
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Per CSM · this month
        </div>
        <div
          className="overflow-hidden rounded-md"
          style={{ border: "0.5px solid #EAEAEA" }}
        >
          <table className="w-full text-[12px]">
            <thead className="bg-[#FAFAFA]">
              <tr>
                <ColumnHeader>CSM</ColumnHeader>
                <ColumnHeader align="right">Accounts</ColumnHeader>
                <ColumnHeader align="right">ARR</ColumnHeader>
                <ColumnHeader align="center">Health avg</ColumnHeader>
                <ColumnHeader align="right">Trend</ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {CSMS.map((c, i) => {
                const positive = c.trend >= 0;
                return (
                  <tr
                    key={c.name}
                    className="transition-colors hover:bg-[#FAFAF9]"
                    style={{
                      borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                    }}
                  >
                    <Cell>{c.name}</Cell>
                    <Cell align="right">{c.accounts}</Cell>
                    <Cell align="right" mono>
                      {c.arr}
                    </Cell>
                    <Cell align="center">
                      <span
                        className="font-semibold"
                        style={{ color: HEALTH_COLOR[c.healthTone] }}
                      >
                        {c.healthAvg}
                      </span>
                    </Cell>
                    <Cell align="right">
                      <span
                        className="font-mono text-[11px] tabular-nums"
                        style={{ color: positive ? "#16A34A" : "#DC2626" }}
                      >
                        {positive ? "↑" : "↓"} {Math.abs(c.trend).toFixed(1)}pt
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
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          This month
        </div>
        <ul className="list-disc space-y-1.5 pl-5 text-[12px] leading-[1.65] text-[#1F1F1F]">
          {ACTIVITY.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#666]">
          36 accounts across 3 CSMs · last sync 4 min ago
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          See team breakdown →
        </span>
      </div>
    </div>
  );
}

function CadencePill({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`rounded-sm px-2.5 py-1 text-[11px] transition-colors ${
        active
          ? "bg-[#0A0A0A] font-medium text-white"
          : "bg-white text-[#666] hover:bg-[#FAFAF9]"
      }`}
      style={{
        border: active ? "1px solid #0A0A0A" : "0.5px solid #EAEAEA",
      }}
    >
      {label}
    </span>
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
