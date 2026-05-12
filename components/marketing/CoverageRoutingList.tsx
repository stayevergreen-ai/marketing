"use client";

type ItemType = "renewal" | "flag" | "draft" | "meeting";
type Severity = "high" | "medium" | "low";

type Item = {
  id: string;
  type: ItemType;
  account: string;
  severity: Severity;
  dueDate: string;
  aiCsm: string;
  csmPicked?: string;
  csmReason?: string;
  managerHandles?: boolean;
};

const OOO = {
  csm: "Naomi Okafor",
  start: "May 12",
  end: "May 19",
  team: "Mid-Market",
};

const ATTENTION_ITEMS: Item[] = [
  {
    id: "i1",
    type: "renewal",
    account: "Acme Corp",
    severity: "high",
    dueDate: "May 16",
    aiCsm: "Aisha Mohammed",
    csmPicked: "Devon Walsh",
    csmReason: "Devon has the existing CFO relationship from Q1",
  },
  {
    id: "i2",
    type: "flag",
    account: "Bridgewater Co",
    severity: "high",
    dueDate: "May 14",
    aiCsm: "Aisha Mohammed",
    managerHandles: true,
  },
];

const AGREED_ITEMS: Item[] = [
  {
    id: "i3",
    type: "draft",
    account: "Globex Industries",
    severity: "medium",
    dueDate: "May 15",
    aiCsm: "Devon Walsh",
    csmPicked: "Devon Walsh",
  },
  {
    id: "i4",
    type: "meeting",
    account: "Pinewood Partners",
    severity: "medium",
    dueDate: "May 17",
    aiCsm: "Aisha Mohammed",
    csmPicked: "Aisha Mohammed",
  },
  {
    id: "i5",
    type: "renewal",
    account: "Northfield Health",
    severity: "medium",
    dueDate: "May 18",
    aiCsm: "Devon Walsh",
    csmPicked: "Devon Walsh",
  },
];

const AI_ONLY_ITEMS: Item[] = [
  {
    id: "i6",
    type: "flag",
    account: "Cascade Systems",
    severity: "low",
    dueDate: "May 19",
    aiCsm: "Aisha Mohammed",
  },
];

const SEVERITY_COLOR: Record<Severity, string> = {
  high: "#DC2626",
  medium: "#FB923C",
  low: "#888888",
};

const SEVERITY_BG: Record<Severity, string> = {
  high: "#FEF2F2",
  medium: "#FFF7ED",
  low: "#F4F4F3",
};

const TYPE_LABEL: Record<ItemType, string> = {
  renewal: "Renewal",
  flag: "Flag",
  draft: "Draft",
  meeting: "Meeting",
};

export default function CoverageRoutingList() {
  const total =
    ATTENTION_ITEMS.length + AGREED_ITEMS.length + AI_ONLY_ITEMS.length;

  return (
    <div className="bg-white text-[#0A0A0A]">
      <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] px-6 py-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
            Coverage routing
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
            {OOO.csm} · OOO {OOO.start} → {OOO.end}
          </h3>
          <p className="mt-1 text-[12px] text-[#666]">
            {OOO.team} team · {total} items to cover · AI suggested + CSM
            reviewed
          </p>
        </div>
      </div>

      <div className="border-b border-[#EAEAEA] px-6 py-3">
        <SummaryLine
          attention={ATTENTION_ITEMS.length}
          agreed={AGREED_ITEMS.length}
          aiOnly={AI_ONLY_ITEMS.length}
          total={total}
        />
      </div>

      <div className="flex flex-col gap-3 px-6 py-4">
        <Section
          title="Needs your attention"
          subtitle="CSMs flagged these for your judgment"
          count={ATTENTION_ITEMS.length}
          tone="default"
        >
          {ATTENTION_ITEMS.map((item) => (
            <ItemRow key={item.id} item={item} highlight />
          ))}
        </Section>

        <Section
          title="AI + CSM agreed"
          subtitle="Both recommended the same coverage. Quick review and approve."
          count={AGREED_ITEMS.length}
          tone="muted"
          headerAction={
            <span className="rounded-md bg-[#0A0A0A] px-3 py-1 text-[11px] font-medium text-white transition-colors hover:bg-[#16A34A]">
              Approve all {AGREED_ITEMS.length}
            </span>
          }
        >
          {AGREED_ITEMS.map((item) => (
            <ItemRow key={item.id} item={item} compact />
          ))}
        </Section>

        <Section
          title="AI suggestion only"
          subtitle="No CSM input on these — AI suggestion shown."
          count={AI_ONLY_ITEMS.length}
          tone="default"
        >
          {AI_ONLY_ITEMS.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </Section>
      </div>

      <div className="flex items-center justify-between border-t border-[#EAEAEA] px-6 py-3">
        <span className="text-[11px] text-[#666]">
          Routing AI · 4 candidates evaluated per item
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          See routing methodology →
        </span>
      </div>
    </div>
  );
}

function SummaryLine({
  attention,
  agreed,
  aiOnly,
  total,
}: {
  attention: number;
  agreed: number;
  aiOnly: number;
  total: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#666]">
      <span
        className="font-bold"
        style={{ color: attention > 0 ? "#16A34A" : "#888" }}
      >
        {attention} need{attention === 1 ? "s" : ""} your attention
      </span>
      <span className="text-[#bbb]">·</span>
      <span>{agreed} agreed</span>
      <span className="text-[#bbb]">·</span>
      <span>{aiOnly} AI-only</span>
      <span className="text-[#bbb]">·</span>
      <span className="text-[#666]">{total} total</span>
    </div>
  );
}

function Section({
  title,
  subtitle,
  count,
  tone,
  headerAction,
  children,
}: {
  title: string;
  subtitle: string;
  count: number;
  tone: "default" | "muted";
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}) {
  if (count === 0) return null;
  const muted = tone === "muted";
  return (
    <section
      className="overflow-hidden rounded-lg"
      style={{
        background: muted ? "#FAFAFA" : "#FFFFFF",
        border: "0.5px solid #EAEAEA",
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#EAEAEA] px-4 py-2.5">
        <div>
          <div className="flex items-baseline gap-2">
            <h4 className="text-[12px] font-bold tracking-[-0.01em] text-[#0A0A0A]">
              {title}
            </h4>
            <span className="text-[11px] text-[#666]">{count}</span>
          </div>
          <p className="text-[11px] leading-[1.4] text-[#666]">{subtitle}</p>
        </div>
        {headerAction}
      </div>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.10em]"
      style={{
        color: SEVERITY_COLOR[severity],
        backgroundColor: SEVERITY_BG[severity],
      }}
    >
      {severity}
    </span>
  );
}

function ItemRow({
  item,
  highlight,
  compact,
}: {
  item: Item;
  highlight?: boolean;
  compact?: boolean;
}) {
  const overrode =
    !!item.csmPicked && !item.managerHandles && item.csmPicked !== item.aiCsm;

  return (
    <div
      className={`flex flex-col gap-2 border-t border-[#EAEAEA] px-4 transition-colors hover:bg-[#FAFAF9] first:border-t-0 ${
        compact ? "py-2" : "py-2.5"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <SeverityBadge severity={item.severity} />
          <span className="text-[12px] font-semibold text-[#0A0A0A]">
            {item.account}
          </span>
          <span className="text-[11px] text-[#666]">
            {TYPE_LABEL[item.type]} · {item.dueDate}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {item.managerHandles ? (
            <span className="rounded-sm bg-[#FFF7ED] px-2 py-0.5 text-[10px] font-semibold text-[#92400E]">
              CSM passed to you
            </span>
          ) : overrode ? (
            <span className="rounded-sm bg-[#F0FDF4] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]">
              ⚠ override
            </span>
          ) : null}
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#bbb] text-[9px] font-bold text-[#bbb] transition-colors hover:border-[#16A34A] hover:text-[#16A34A]"
            aria-hidden="true"
          >
            i
          </span>
        </div>
      </div>

      {!compact && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-1 text-[11px]">
          <span className="text-[#666]">
            AI suggests <span className="font-semibold text-[#0A0A0A]">{item.aiCsm}</span>
          </span>
          {item.csmPicked && !item.managerHandles && (
            <>
              <span className="text-[#bbb]">·</span>
              <span className="text-[#666]">
                CSM picked{" "}
                <span className="font-semibold text-[#0A0A0A]">
                  {item.csmPicked}
                </span>
              </span>
            </>
          )}
          {item.managerHandles && (
            <>
              <span className="text-[#bbb]">·</span>
              <span className="text-[#666]">CSM marked manager-handle</span>
            </>
          )}
        </div>
      )}

      {item.csmReason && (
        <div className="rounded-sm bg-[#FAFAF9] px-2.5 py-1.5 text-[11px] italic leading-[1.4] text-[#666]">
          “{item.csmReason}”
        </div>
      )}

      {compact && (
        <div className="flex items-center justify-between pl-1">
          <span className="text-[11px] text-[#666]">
            Both picked{" "}
            <span className="font-semibold text-[#0A0A0A]">
              {item.csmPicked}
            </span>
          </span>
          <span className="text-[11px] text-[#16A34A]">✓ ready</span>
        </div>
      )}

      {highlight && !compact && (
        <div className="flex items-center gap-2 pt-1">
          <span className="rounded-md bg-[#0A0A0A] px-3 py-1 text-[10px] font-medium text-white transition-colors hover:bg-[#16A34A]">
            Approve {item.csmPicked ?? item.aiCsm}
          </span>
          <span className="rounded-md border border-[#EAEAEA] bg-white px-3 py-1 text-[10px] font-medium text-[#444] transition-colors hover:bg-[#FAFAF9]">
            Override
          </span>
        </div>
      )}
    </div>
  );
}
