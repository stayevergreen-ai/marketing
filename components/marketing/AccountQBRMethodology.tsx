"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Download,
  FileDown,
  Printer,
  RefreshCw,
} from "lucide-react";

type View = "internal" | "external";

const VIEWS: View[] = ["internal", "external"];

const VIEW_LABELS: Record<View, string> = {
  internal: "Internal",
  external: "External",
};

const ACCOUNT = {
  name: "Voltura Systems",
  arr: "$480K ARR",
  csm: "Devon Walsh",
  cycle: "Q2 2026 cycle",
  draftPct: "87%",
  externalTitle: "Voltura Systems · Q2 2026 Business Review",
};

type LogisticsRow = {
  label: string;
  value: string;
  subline: string;
};

const LOGISTICS: LogisticsRow[] = [
  {
    label: "Date",
    value: "May 22, 2026 · 2:00pm ET",
    subline: "Based on Q1 cadence + champion availability",
  },
  {
    label: "Attendees (Customer)",
    value: "Sarah Chen (Champion), Tom Willis (CFO transition pending)",
    subline: "Pulled from email + meeting history",
  },
  {
    label: "Attendees (Evergreen)",
    value: "Devon Walsh (CSM)",
    subline: "Devon owns the relationship",
  },
];

type PastQBR = {
  quarter: string;
  date: string;
  outcomes: string;
  delivered: boolean;
};

const PAST_QBRS: PastQBR[] = [
  {
    quarter: "Q1 2026",
    date: "Mar 15",
    outcomes: "Module B expansion confirmed · NPS 47",
    delivered: true,
  },
  {
    quarter: "Q4 2025",
    date: "Dec 8",
    outcomes: "Renewal commitment secured · Pricing pushback resolved",
    delivered: true,
  },
  {
    quarter: "Q3 2025",
    date: "Sep 11",
    outcomes: "Onboarding milestone hit · Module A live",
    delivered: true,
  },
  {
    quarter: "Q2 2025",
    date: "Jun 14",
    outcomes: "Initial expansion conversation · Roadmap reviewed",
    delivered: true,
  },
];

type CarryoverItem = {
  text: string;
  source: string;
};

const CARRYOVER: CarryoverItem[] = [
  { text: "Confirm Q3 budget cycle timing", source: "from Q1 QBR" },
  {
    text: "Schedule executive review with new CFO",
    source: "from Q1 QBR",
  },
];

type Item = {
  content: string;
  say: string;
  ref: string;
};

type Section = {
  title: string;
  items: Item[];
};

const SECTIONS: Section[] = [
  {
    title: "Opening",
    items: [
      {
        content:
          "Open with appreciation for Q1 partnership and acknowledge Tom Willis's CFO transition.",
        say: "Sarah, before we dig in — wanted to acknowledge the Tom Willis transition. We know that creates some uncertainty around budget cycles and procurement. We're prepared to support however helpful through that change.",
        ref: "Q1 QBR notes · email thread Apr 24 (CFO transition rumor)",
      },
    ],
  },
  {
    title: "Progress Review",
    items: [
      {
        content:
          "Active users hit 147 of 200 target (74%) — on pace for end-of-Q2.",
        say: "We're tracking active users at 74% of your Q1 commitment of 200. Trajectory is healthy — based on the current onboarding cadence, you'll hit 200 by mid-Q3.",
        ref: "From Q1 QBR commitment · platform usage data",
      },
      {
        content:
          "Module B expansion to 2 teams (1 confirmed, 1 in progress) — 50% of Q1 commitment.",
        say: "Module B is live with the Engineering team and adoption looks strong. The Ops team launch hit a small adoption gap — 12% active vs. 60% target. We have a path to address that today.",
        ref: "From Q1 QBR · behavioral signal data",
      },
    ],
  },
  {
    title: "Value Delivered",
    items: [
      {
        content:
          "ROI achievement: 4.2× year-one productivity gain reported by champion.",
        say: "You shared in Q1 that the team is seeing 4.2x productivity gains on the workflow we automated. That's above the 3x benchmark we projected at kickoff.",
        ref: "Q1 QBR notes · email thread Apr 8",
      },
      {
        content: "Q1 NPS hit 47 — above the 40+ target.",
        say: "NPS hit 47 last quarter, beating your 40+ goal. Power user cohort is driving most of that.",
        ref: "Quarterly survey data",
      },
    ],
  },
  {
    title: "Challenges",
    items: [
      {
        content: "Module B adoption gap on Ops team — only 12% active.",
        say: "I want to address the Ops team adoption directly. We're seeing strong engagement from Engineering but Ops hasn't activated. We have three options to discuss.",
        ref: "Behavioral signal data · 6 email threads",
      },
      {
        content:
          "Pricing concern flagged in DPA review with procurement.",
        say: "Procurement raised pricing questions in the DPA review last month. I want to walk through how we typically address these and confirm there's no concern about Q3 renewal.",
        ref: "Email thread Apr 14 · 4 emails + 1 ticket",
      },
    ],
  },
  {
    title: "Roadmap Preview",
    items: [
      {
        content:
          "Module C launching in Q3 — early access available for Voltura.",
        say: "We have a roadmap item I think aligns with what you mentioned in our last working session. Module C launches in Q3 — would you want early access for the Engineering team?",
        ref: "Internal roadmap · Sarah Chen May 1 sync notes",
      },
    ],
  },
  {
    title: "Renewal Discussion",
    items: [
      {
        content:
          "Q3 renewal cycle landing in 47 days — confirm budget timing and procurement path.",
        say: "Q3 renewal lands in 47 days. Based on Q1 procurement signal, I want to align on the value review process before it hits procurement, so the renewal conversation is forward-looking, not defensive.",
        ref: "Renewal calendar · Q1 procurement DPA thread",
      },
    ],
  },
  {
    title: "Next Steps",
    items: [
      {
        content:
          "Schedule executive review with new CFO once announced.",
        say: "Once Tom's replacement is announced, we should plan a 30-minute exec briefing. I'll work with you on timing.",
        ref: "Q1 QBR carryover · email Apr 24",
      },
      {
        content: "Confirm Q3 budget cycle timing.",
        say: "Procurement asked about timing for the Q3 budget cycle. Can we confirm this week so we can plan renewal conversation appropriately?",
        ref: "Q1 QBR carryover · May 1 champion sync",
      },
    ],
  },
];

export default function AccountQBRMethodology() {
  const [view, setView] = useState<View>("internal");
  const isExternal = view === "external";
  const totalItems = SECTIONS.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Quarterly Business Review
          </div>
          {isExternal ? (
            <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
              {ACCOUNT.externalTitle}
            </h3>
          ) : (
            <>
              <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
                {ACCOUNT.name}
              </h3>
              <p className="mt-1 text-[12px] text-[#666]">
                {ACCOUNT.arr} · {ACCOUNT.csm} · {ACCOUNT.cycle}
              </p>
            </>
          )}
        </div>
        {isExternal ? (
          <span
            className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.10em]"
            style={{
              color: "#15803D",
              backgroundColor: "#F0FDF4",
              border: "0.5px solid #BBF7D0",
            }}
          >
            Ready for external share
          </span>
        ) : (
          <span
            className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.10em]"
            style={{
              color: "#15803D",
              backgroundColor: "#F0FDF4",
              border: "0.5px solid #BBF7D0",
            }}
          >
            Draft · {ACCOUNT.draftPct}
          </span>
        )}
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="inline-flex items-center gap-1 rounded-lg bg-[#F5F5F4] p-1">
          {VIEWS.map((v) => {
            const active = view === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={
                  active
                    ? "rounded-md bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#16A34A] shadow-sm"
                    : "cursor-pointer rounded-md px-3.5 py-1.5 text-[12px] font-medium text-[#666] transition-colors hover:text-[#0A0A0A]"
                }
              >
                {VIEW_LABELS[v]}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] text-[#888]">
          {isExternal
            ? "Customer-facing version — talk tracks and source attribution removed."
            : "Internal prep — talk track and source attribution visible per item."}
        </p>
      </div>

      {!isExternal ? (
        <div className="border-b border-[#EAEAEA] px-6 py-4">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Recommended · based on account context
          </div>
          <div className="flex flex-col gap-3">
            {LOGISTICS.map((row) => (
              <div key={row.label} className="group flex items-start gap-3">
                <span className="w-[120px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#666]">
                  {row.label}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium text-[#0A0A0A]">
                    {row.value}
                  </p>
                  <p className="mt-0.5 text-[11px] italic text-[#888]">
                    {row.subline}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-medium text-[#16A34A] opacity-0 transition-opacity group-hover:opacity-100">
                  Override →
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {!isExternal ? (
        <div className="border-b border-[#EAEAEA] px-6 py-4">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Past QBRs · last 4
          </div>
          <div className="flex flex-col">
            {PAST_QBRS.map((q, i) => (
              <div
                key={q.quarter}
                className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-[#FAFAF9]"
                style={{
                  borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                }}
              >
                <span className="w-[78px] shrink-0 text-[12px] font-semibold text-[#0A0A0A]">
                  {q.quarter}
                </span>
                <span className="w-[52px] shrink-0 font-mono text-[11px] tabular-nums text-[#666]">
                  {q.date}
                </span>
                <span
                  className="flex-1 truncate text-[12px]"
                  style={{
                    color: "#888",
                    textDecoration: q.delivered ? "line-through" : "none",
                  }}
                >
                  {q.outcomes}
                </span>
                {q.delivered ? (
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    className="shrink-0 text-[#16A34A]"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="shrink-0 text-[#bbb]" aria-hidden="true">
                  ›
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-[#EAEAEA] pt-3">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
              Carried forward · {CARRYOVER.length} items
            </div>
            <div className="flex flex-col gap-2">
              {CARRYOVER.map((c) => (
                <div
                  key={c.text}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FB923C]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-[#0A0A0A]">
                      {c.text}
                    </p>
                    <p className="mt-0.5 text-[10px] italic text-[#888]">
                      {c.source}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded px-1.5 py-px text-[10px] font-bold uppercase tracking-[0.06em]"
                    style={{
                      color: "#9A3412",
                      background: "#FFF7ED",
                    }}
                  >
                    Open
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="px-6 py-4">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          {isExternal
            ? "Business review · 7 sections"
            : `QBR draft · 7 sections · ${totalItems} items`}
        </div>
      </div>

      {SECTIONS.map((section, sIdx) => (
        <div
          key={section.title}
          className="px-6 py-5"
          style={{
            borderTop: sIdx === 0 ? "0.5px solid #EAEAEA" : "0.5px solid #EAEAEA",
          }}
        >
          <h4 className="mb-4 text-[15px] font-bold tracking-[-0.01em] text-[#0A0A0A]">
            {section.title}
          </h4>
          <div className="flex flex-col gap-5">
            {section.items.map((item, iIdx) => (
              <div key={iIdx} className="flex flex-col gap-2.5">
                <p className="text-[13px] leading-[1.55] text-[#0A0A0A]">
                  {item.content}
                </p>
                {!isExternal ? (
                  <>
                    <div className="border-l-2 border-[#16A34A] pl-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
                        Say
                      </p>
                      <p className="mt-1 text-[12.5px] italic leading-[1.55] text-[#444]">
                        &ldquo;{item.say}&rdquo;
                      </p>
                    </div>
                    <p className="text-[10px] text-[#888]">
                      <span className="font-bold uppercase tracking-[0.10em]">
                        Ref:
                      </span>{" "}
                      {item.ref}
                    </p>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-3 border-t border-[#EAEAEA] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[11px] text-[#666]">
          {isExternal
            ? "Last updated 4 minutes ago"
            : "Generated by AI · Last updated 4 minutes ago"}
        </span>
        {isExternal ? (
          <div className="flex flex-wrap gap-2">
            <ActionButton primary icon={<FileDown size={13} />}>
              Export as PDF
            </ActionButton>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <ActionButton icon={<Printer size={13} />}>
              Print/Export
            </ActionButton>
            <ActionButton icon={<RefreshCw size={13} />}>
              Regenerate
            </ActionButton>
            <ActionButton icon={<Copy size={13} />}>Copy</ActionButton>
            <ActionButton icon={<Check size={13} />}>
              Mark as used
            </ActionButton>
            <ActionButton primary icon={<Download size={13} />}>
              Export as PDF
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  children,
  icon,
  primary,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  primary?: boolean;
}) {
  if (primary) {
    return (
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-[#16A34A] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#15803D]"
      >
        <span aria-hidden="true">{icon}</span>
        {children}
      </button>
    );
  }
  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-[11px] font-medium text-[#444] transition-colors hover:border-[#16A34A] hover:text-[#16A34A]"
      style={{ border: "0.5px solid #EAEAEA" }}
    >
      <span aria-hidden="true">{icon}</span>
      {children}
    </button>
  );
}
