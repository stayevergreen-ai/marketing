"use client";

type Account = {
  name: string;
  arr: string;
  renewal: string;
  silent: string;
  signal: string;
  action: string;
};

const URGENT: Account[] = [
  {
    name: "Acme Corp",
    arr: "$480K",
    renewal: "12d",
    silent: "8d",
    signal: "Champion silence",
    action: "Send re-engagement email today",
  },
  {
    name: "Globex Industries",
    arr: "$390K",
    renewal: "21d",
    silent: "14d",
    signal: "Open tickets",
    action: "Schedule exec sync · loop in Devon",
  },
  {
    name: "Stellar Media",
    arr: "$260K",
    renewal: "5d",
    silent: "11d",
    signal: "Adoption drag",
    action: "Re-engage Sarah Chen on usage drop",
  },
];

const ATTENTION: Account[] = [
  {
    name: "Bridgewater Co",
    arr: "$340K",
    renewal: "47d",
    silent: "5d",
    signal: "Sentiment slip",
    action: "Send Q3 health check",
  },
  {
    name: "Northfield Health",
    arr: "$295K",
    renewal: "62d",
    silent: "4d",
    signal: "Exec disengaged",
    action: "Forward case study to CFO",
  },
  {
    name: "Cascade Systems",
    arr: "$180K",
    renewal: "38d",
    silent: "9d",
    signal: "Price sensitivity",
    action: "Pre-renewal value review",
  },
];

const OPPORTUNITY: Account[] = [
  {
    name: "Summit Logistics",
    arr: "$520K",
    renewal: "94d",
    silent: "3d",
    signal: "Usage growth",
    action: "Pitch Pro tier upgrade",
  },
  {
    name: "Pinewood Partners",
    arr: "$410K",
    renewal: "118d",
    silent: "2d",
    signal: "Team expansion",
    action: "Send seat expansion proposal",
  },
  {
    name: "Northcrest Industries",
    arr: "$280K",
    renewal: "76d",
    silent: "4d",
    signal: "Champion advocacy",
    action: "Request referral intro",
  },
];

type BriefRow = { label: string; color: string; bg: string; text: string };

const AI_BRIEF: BriefRow[] = [
  {
    label: "URGENT",
    color: "#7F1D1D",
    bg: "#FEF2F2",
    text: "3 at-risk accounts, $1.13M renewing in next 30 days. Acme Corp first.",
  },
  {
    label: "ATTENTION",
    color: "#78350F",
    bg: "#FFF7ED",
    text: "6 accounts need outreach this week. Tuesday morning is your busiest cluster.",
  },
  {
    label: "PIPELINE",
    color: "#14532D",
    bg: "#F0FDF4",
    text: "4 expansion signals across $2.1M ARR. Summit Logistics ready for tier discussion.",
  },
  {
    label: "AGING",
    color: "#92400E",
    bg: "#FFFBEB",
    text: "2 accounts untouched 7+ days. Both in your Tier 1 segment.",
  },
];

const KPIS = [
  { label: "ARR at Risk", value: "$2.4M", subtitle: "12 accounts" },
  { label: "Renewals 30d", value: "8", subtitle: "$1.13M ARR" },
  { label: "Expansion", value: "12", subtitle: "$890K signaled" },
  { label: "Not contacted", value: "6", subtitle: "7+ days silent" },
];

const TONE = {
  urgent: "#DC2626",
  attention: "#FB923C",
  opportunity: "#16A34A",
} as const;

export default function MorningQueue() {
  return (
    <div className="bg-[#FAFAF9] text-[#0A0A0A]">
      <TopBar />
      <CalendarBar />
      <KpiRow />
      <AiBrief />
      <Kanban />
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-[#E8E8E8] bg-white px-5 py-3 md:px-6">
      <div className="flex items-baseline gap-3">
        <h2 className="text-[14px] font-bold tracking-[-0.01em] md:text-[15px]">
          Morning queue
        </h2>
        <span className="text-[11px] text-[#666] md:text-[12px]">
          Tuesday, May 6
        </span>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-[#666] md:gap-3 md:text-[12px]">
        <span>
          <span className="font-semibold text-[#0A0A0A]">120</span> accounts
        </span>
        <span className="text-[#ccc]">·</span>
        <span>
          <span className="font-semibold text-[#0A0A0A]">4</span> handled today
        </span>
      </div>
    </div>
  );
}

function CalendarBar() {
  return (
    <div className="flex items-center gap-2 border-b border-[#E8E8E8] bg-white px-5 py-2 text-[11px] md:gap-3 md:px-6 md:text-[12px]">
      <span className="flex items-center gap-1.5 text-[#666]">
        <CalendarIcon />
        <span>
          <span className="font-semibold text-[#0A0A0A]">4</span> meetings
        </span>
      </span>
      <span className="text-[#ccc]">·</span>
      <span className="text-[#666]">
        <span className="font-semibold text-[#0A0A0A]">5h</span> free
      </span>
      <span className="text-[#ccc]">·</span>
      <span className="text-[#666]">
        capacity for{" "}
        <span className="font-semibold text-[#0A0A0A]">8</span> accounts
      </span>
    </div>
  );
}

function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-2 border-b border-[#E8E8E8] bg-white px-5 py-3 md:grid-cols-4 md:gap-3 md:px-6 md:py-4">
      {KPIS.map((k) => (
        <div
          key={k.label}
          className="rounded-md border-[0.5px] border-[#E8E8E8] bg-white px-3 py-2.5 transition-colors hover:bg-[#FAFAF9]"
        >
          <div className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#666] md:text-[10px]">
            {k.label}
          </div>
          <div className="mt-1.5 text-[16px] font-semibold tracking-[-0.02em] text-[#0A0A0A] md:text-[18px]">
            {k.value}
          </div>
          <div className="mt-0.5 text-[12px] font-normal text-[#666]">
            {k.subtitle}
          </div>
        </div>
      ))}
    </div>
  );
}

function AiBrief() {
  return (
    <div className="border-b border-[#E8E8E8] bg-white px-5 py-3 md:px-6 md:py-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
          AI
        </span>
        <span className="text-[12px] font-semibold text-[#0A0A0A]">
          Your book today · Tuesday
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {AI_BRIEF.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline gap-3 rounded-sm px-3 py-2"
            style={{
              borderLeft: `3px solid ${row.color}`,
              backgroundColor: row.bg,
            }}
          >
            <span
              className="w-[72px] shrink-0 text-[10px] font-bold uppercase tracking-[0.10em]"
              style={{ color: row.color }}
            >
              {row.label}
            </span>
            <span className="text-[12px] leading-[1.45] text-[#1F1F1F]">
              {row.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kanban() {
  return (
    <div className="grid grid-cols-1 gap-4 bg-white px-5 py-4 md:grid-cols-3 md:px-6">
      <KanbanColumn
        title="Urgent"
        tone={TONE.urgent}
        count={URGENT.length}
        accounts={URGENT}
      />
      <KanbanColumn
        title="Attention"
        tone={TONE.attention}
        count={ATTENTION.length}
        accounts={ATTENTION}
      />
      <KanbanColumn
        title="Opportunity"
        tone={TONE.opportunity}
        count={OPPORTUNITY.length}
        accounts={OPPORTUNITY}
      />
    </div>
  );
}

function KanbanColumn({
  title,
  tone,
  count,
  accounts,
}: {
  title: string;
  tone: string;
  count: number;
  accounts: Account[];
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: tone }}
          />
          <h3
            className="text-[10px] font-bold uppercase tracking-[0.10em] md:text-[11px]"
            style={{ color: tone }}
          >
            {title}
          </h3>
          <span className="text-[10px] text-[#666]">{count}</span>
        </div>
        <div className="flex items-center gap-1 rounded border-[0.5px] border-[#E8E8E8] bg-white px-2 py-0.5 text-[10px] text-[#666]">
          AI score <span className="text-[#aaa]">▾</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {accounts.map((a) => (
          <KanbanCard key={a.name} account={a} tone={tone} />
        ))}
      </div>
    </div>
  );
}

function KanbanCard({ account, tone }: { account: Account; tone: string }) {
  return (
    <div
      className="rounded-md border-[0.5px] border-[#E8E8E8] bg-white px-3 py-2.5 transition-all duration-150 hover:translate-y-[-1px] hover:bg-[#FCFCFC] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      style={{ borderLeft: `3px solid ${tone}` }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate text-[12px] font-semibold text-[#0A0A0A]">
          {account.name}
        </span>
        <span className="shrink-0 text-[12px] font-semibold tabular-nums text-[#0A0A0A]">
          {account.arr}
        </span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-[10px] text-[#666]">
        <span>Renew in {account.renewal}</span>
        <span className="text-[#ccc]">·</span>
        <span>Silent {account.silent}</span>
      </div>
      <div className="mt-1.5 inline-flex items-center rounded-sm bg-[#F4F4F3] px-1.5 py-0.5 text-[10px] text-[#666]">
        {account.signal}
      </div>
      <div className="mt-1.5 text-[10px] font-medium leading-[1.35] text-[#16A34A]">
        {account.action}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <ActionPill>
          <span aria-hidden="true">✓</span> Done
        </ActionPill>
        <ActionPill>
          Defer <span aria-hidden="true">→</span>
        </ActionPill>
      </div>
    </div>
  );
}

function ActionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-sm border border-[#E8E8E8] bg-[#FAFAFA] px-2.5 py-1 text-[10px] text-[#444] transition-colors hover:bg-[#F0F0F0]">
      {children}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
