"use client";

const ACCOUNT = {
  name: "Voltura Systems",
  csm: "Devon Walsh",
  qbrDate: "May 22",
  confidence: "87%",
};

const HEALTH_SUMMARY =
  "Voltura health remained strong (78/100) over Q1, slight dip in Apr (−3) tied to onboarding gap on the new product line. Champion engagement and renewal alignment are positive signals heading into the QBR.";

type GoalStatus = "green" | "amber" | "red";

type Goal = {
  name: string;
  status: GoalStatus;
  progress: string;
  source: string;
};

const GOALS: Goal[] = [
  {
    name: "Increase active users to 200",
    status: "green",
    progress: "147 of 200 (74%)",
    source: "from kickoff doc · last reviewed Q4",
  },
  {
    name: "Expand to Module B across 2 teams",
    status: "amber",
    progress: "1 of 2 teams (50%)",
    source: "from expansion conversation Q1",
  },
  {
    name: "Achieve quarterly NPS 40+",
    status: "green",
    progress: "Q1 NPS: 47",
    source: "from quarterly survey",
  },
  {
    name: "Reduce support ticket volume 20%",
    status: "red",
    progress: "+8% vs baseline",
    source: "from support analytics",
  },
];

type Note = { text: string; source: string };

const WINS: Note[] = [
  {
    text: "Closed expansion to Module B (Eng team)",
    source: "from email thread · Apr 8",
  },
  {
    text: "Champion engagement strong — Sarah Chen escalating internally",
    source: "from 6 email threads",
  },
  {
    text: "ROI achieved: 4.2× year-one productivity gain reported",
    source: "from Q1 QBR notes",
  },
];

const RISKS: Note[] = [
  {
    text: "Adoption gap on Module B (Ops team) — only 12% active",
    source: "from behavioral signals",
  },
  {
    text: "Decision-maker turnover signaled — Tom Willis CFO transition rumored",
    source: "from email thread · Apr 24",
  },
];

const ASKS: Note[] = [
  {
    text: "Confirm Q3 budget cycle and procurement timeline",
    source: "from May 1 champion sync",
  },
  {
    text: "Schedule executive review with new CFO once announced",
    source: "from internal note",
  },
];

const STATUS_COLOR: Record<GoalStatus, string> = {
  green: "#16A34A",
  amber: "#FB923C",
  red: "#DC2626",
};

export default function AccountQBRMethodology() {
  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            QBR Prep · Generated
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            {ACCOUNT.name}
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">
            {ACCOUNT.csm} · QBR scheduled {ACCOUNT.qbrDate}
          </p>
        </div>
        <span
          className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.10em]"
          style={{
            color: "#15803D",
            backgroundColor: "#F0FDF4",
            border: "0.5px solid #BBF7D0",
          }}
        >
          Draft · {ACCOUNT.confidence}
        </span>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Health summary
        </div>
        <p className="text-[13px] leading-[1.55] text-[#1F1F1F]">
          {HEALTH_SUMMARY}
        </p>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
          Goals · {GOALS.length} tracked
        </div>
        <div className="flex flex-col gap-1">
          {GOALS.map((g) => (
            <div
              key={g.name}
              className="-mx-2 flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-[#FAFAF9]"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                style={{ background: STATUS_COLOR[g.status] }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold text-[#0A0A0A]">
                    {g.name}
                  </span>
                  <span
                    className="font-mono text-[11px] font-medium tabular-nums"
                    style={{ color: STATUS_COLOR[g.status] }}
                  >
                    {g.progress}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] italic text-[#888]">
                  {g.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <NoteColumn title="Wins" tone="green" notes={WINS} />
          <NoteColumn title="Risks" tone="amber" notes={RISKS} />
          <NoteColumn title="Asks" tone="neutral" notes={ASKS} />
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-[11px] text-[#666]">
          Sourced from 23 email threads · 8 tickets · 2 meeting notes · Q4 QBR
          doc
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          How is QBR content sourced? →
        </span>
      </div>
    </div>
  );
}

function NoteColumn({
  title,
  tone,
  notes,
}: {
  title: string;
  tone: "green" | "amber" | "neutral";
  notes: Note[];
}) {
  const toneColor =
    tone === "green" ? "#15803D" : tone === "amber" ? "#92400E" : "#666";
  return (
    <div>
      <div
        className="mb-2 text-[10px] font-bold uppercase tracking-[0.10em]"
        style={{ color: toneColor }}
      >
        {title} · {notes.length}
      </div>
      <div className="flex flex-col gap-2">
        {notes.map((n) => (
          <div key={n.text} className="-mx-1 rounded-sm px-1 py-1">
            <p className="text-[12px] leading-[1.45] text-[#1F1F1F]">
              {n.text}
            </p>
            <p className="mt-0.5 text-[10px] italic text-[#888]">{n.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
