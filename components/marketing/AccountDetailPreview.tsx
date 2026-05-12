"use client";

const ACCOUNT = {
  name: "Voltura Systems",
  arr: "$480K",
  tier: "Enterprise",
  owner: "Devon Walsh",
  healthTone: "warn" as const,
};

type Contact = { name: string; role: string; relationship: string };

const CONTACTS: Contact[] = [
  { name: "Sarah Chen", role: "VP Operations", relationship: "Champion" },
  { name: "Tom Willis", role: "CFO", relationship: "Economic Buyer" },
  { name: "Rachel Kim", role: "Operations Mgr", relationship: "End User" },
];

const BRIEFING =
  "Champion engagement strong but legal review is stalling renewal. Focus the next conversation on procurement timeline rather than product fit.";

const BRIEFING_TIME = "12 min ago";

type Signal = {
  id: string;
  severity: "high" | "medium" | "low";
  type: string;
  description: string;
  source: string;
};

const SIGNALS: Signal[] = [
  {
    id: "s1",
    severity: "high",
    type: "Procurement stall",
    description: "Legal review extended 14 days beyond original timeline.",
    source: "from email thread",
  },
  {
    id: "s2",
    severity: "medium",
    type: "Champion engagement",
    description: "VP Ops opened last 4 emails; replied within 2h on average.",
    source: "behavioral",
  },
  {
    id: "s3",
    severity: "low",
    type: "Adoption pattern",
    description: "Reports usage flat for 21 days. Power users still active.",
    source: "behavioral",
  },
];

const THREAD = {
  subject: "Re: Q3 renewal — procurement update",
  receivedAt: "2 hours ago",
  messages: [
    {
      from: "Sarah Chen",
      role: "VP Operations · Champion",
      preview:
        "Hi Devon — quick update on procurement. Legal flagged the new DPA terms; Tom wants a 30 min sync this week to walk through.",
    },
    {
      from: "Devon Walsh",
      role: "you",
      preview:
        "Sounds good — I have Thursday 2pm or Friday 10am open. Forwarding the standard DPA red-line summary so legal has it ahead of…",
    },
  ],
};

const HEALTH_COLOR = {
  green: "#16A34A",
  warn: "#FB923C",
  danger: "#DC2626",
} as const;
const HEALTH_LABEL = {
  green: "Healthy",
  warn: "Attention",
  danger: "At Risk",
} as const;
const HEALTH_BG = {
  green: "#F0FDF4",
  warn: "#FFF7ED",
  danger: "#FEF2F2",
} as const;
const SEVERITY_COLOR = {
  high: "#DC2626",
  medium: "#FB923C",
  low: "#888888",
} as const;
const SEVERITY_BG = {
  high: "#FEF2F2",
  medium: "#FFF7ED",
  low: "#F4F4F3",
} as const;

export default function AccountDetailPreview() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="border-b border-[#EAEAEA] px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
              {ACCOUNT.name}
            </h3>
            <p className="mt-1 text-[12px] text-[#666]">
              {ACCOUNT.arr} ARR · {ACCOUNT.tier} · Owner: {ACCOUNT.owner}
            </p>
          </div>
          <span
            className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.10em]"
            style={{
              color: HEALTH_COLOR[ACCOUNT.healthTone],
              backgroundColor: HEALTH_BG[ACCOUNT.healthTone],
            }}
          >
            {HEALTH_LABEL[ACCOUNT.healthTone]}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONTACTS.map((c) => (
            <ContactPill key={c.name} contact={c} />
          ))}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div
          className="rounded-md p-4"
          style={{ background: "#F0FDF4", border: "0.5px solid #BBF7D0" }}
        >
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#15803D]">
            AI Briefing · Updated {BRIEFING_TIME}
          </div>
          <p className="text-[13px] leading-[1.55] text-[#065F46]">
            {BRIEFING}
          </p>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Signals · {SIGNALS.length} active
        </div>
        <div className="flex flex-col gap-1">
          {SIGNALS.map((s) => (
            <SignalRow key={s.id} signal={s} />
          ))}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
          Recent email · {THREAD.receivedAt}
        </div>
        <div
          className="overflow-hidden rounded-md"
          style={{ border: "0.5px solid #EAEAEA" }}
        >
          <div className="border-b border-[#EAEAEA] bg-[#FAFAFA] px-3 py-2.5">
            <p className="text-[13px] font-semibold text-[#0A0A0A]">
              {THREAD.subject}
            </p>
          </div>
          {THREAD.messages.map((m, i) => (
            <div
              key={i}
              className="px-3 py-2.5 transition-colors hover:bg-[#FAFAF9]"
              style={{
                borderTop: i === 0 ? "none" : "0.5px solid #F4F4F3",
              }}
            >
              <div className="mb-1 flex items-baseline gap-2 text-[11px]">
                <span className="font-semibold text-[#0A0A0A]">{m.from}</span>
                <span className="text-[#888]">{m.role}</span>
              </div>
              <p className="text-[12px] leading-[1.5] text-[#1F1F1F]">
                {m.preview}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#888]">
          3 contacts · 2 emails this week
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          View thread →
        </span>
      </div>
    </div>
  );
}

function ContactPill({ contact }: { contact: Contact }) {
  return (
    <div
      className="flex items-baseline gap-1.5 rounded-sm bg-[#FAFAFA] px-2 py-1 text-[11px] transition-colors hover:bg-[#F0F0F0]"
      style={{ border: "0.5px solid #EAEAEA" }}
    >
      <span className="font-semibold text-[#0A0A0A]">{contact.name}</span>
      <span className="text-[#bbb]">·</span>
      <span className="text-[#666]">{contact.relationship}</span>
    </div>
  );
}

function SignalRow({ signal }: { signal: Signal }) {
  return (
    <div className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-[#FAFAF9]">
      <span
        className="shrink-0 rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.10em]"
        style={{
          color: SEVERITY_COLOR[signal.severity],
          backgroundColor: SEVERITY_BG[signal.severity],
        }}
      >
        {signal.severity}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] font-semibold text-[#0A0A0A]">
            {signal.type}
          </span>
          <span className="text-[10px] text-[#888]">{signal.source}</span>
        </div>
        <p className="text-[11px] leading-[1.4] text-[#666]">
          {signal.description}
        </p>
      </div>
      <span className="shrink-0 text-[#bbb]" aria-hidden="true">
        ›
      </span>
    </div>
  );
}
