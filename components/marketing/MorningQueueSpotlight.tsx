"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

type Tier = "urgent" | "watch" | "active" | "steady";

const TIER_LABEL: Record<Tier, string> = {
  urgent: "Urgent",
  watch: "Watch",
  active: "Active",
  steady: "Steady",
};

const TIER_TEXT: Record<Tier, string> = {
  urgent: "#991B1B",
  watch: "#9A3412",
  active: "#15803D",
  steady: "#444",
};

const TIER_BG: Record<Tier, string> = {
  urgent: "#FEF2F2",
  watch: "#FFF7ED",
  active: "#F0FDF4",
  steady: "#F5F5F4",
};

const TIER_DOT: Record<Tier, string> = {
  urgent: "#DC2626",
  watch: "#FB923C",
  active: "#16A34A",
  steady: "#888",
};

type Row = {
  tier: Tier;
  account: string;
  arr: string;
  brief: string;
};

const ROWS: Row[] = [
  {
    tier: "urgent",
    account: "Acme Corp",
    arr: "$480K",
    brief:
      "6 risk indicators · DPA review escalated · Tom Willis CFO transition rumored",
  },
  {
    tier: "urgent",
    account: "Bridgewater Co",
    arr: "$360K",
    brief: "Pricing concern flagged in 4 email threads with procurement",
  },
  {
    tier: "watch",
    account: "Stellar Media",
    arr: "$295K",
    brief: "Champion silent 30 days · open rate dropped 78% → 12%",
  },
  {
    tier: "active",
    account: "Voltura Systems",
    arr: "$480K",
    brief: "Q3 budget cycle confirmed · Module B launch on track",
  },
  {
    tier: "steady",
    account: "Northfield Health",
    arr: "$310K",
    brief: "No material changes · renewal in 90 days",
  },
];

export default function MorningQueueSpotlight() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: FADE_EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-5"
        >
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
            The backbone
          </p>
          <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-[44px] lg:text-[48px]">
            Start the day with what matters, ranked by what's at stake.
          </h2>
          <p className="mt-7 text-[16px] leading-[1.7] text-[#1F1F1F] md:text-[17px]">
            Most CSMs start Monday morning the same way: open six tabs, scan
            email, ask Slack who's panicking, try to remember what mattered
            Friday. Morning Queue replaces all of it. Every account in the
            book, ranked by signal strength and ARR exposure. AI synthesizes
            the brief — what changed, what's at stake, what the customer
            needs from you today. The judgment stays human. The synthesis
            stops being yours to do.
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: FADE_EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-7"
        >
          <div
            className="overflow-hidden rounded-xl bg-white"
            style={{
              border: "1px solid #E8E8E8",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.04), 0 12px 32px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex items-center justify-between border-b border-[#EAEAEA] bg-[#FAFAF9] px-5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
                Today's queue
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.06em] tabular-nums text-[#888]">
                Updated 4 min ago
              </p>
            </div>
            <ul className="flex flex-col">
              {ROWS.map((row, i) => (
                <li
                  key={row.account}
                  className="flex items-start gap-3 px-5 py-4"
                  style={{
                    borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                  }}
                >
                  <span
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.10em]"
                    style={{
                      color: TIER_TEXT[row.tier],
                      background: TIER_BG[row.tier],
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: TIER_DOT[row.tier] }}
                    />
                    {TIER_LABEL[row.tier]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13px] font-bold text-[#0A0A0A]">
                        {row.account}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-[#666]">
                        {row.arr}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] leading-[1.45] text-[#444]">
                      {row.brief}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-center text-[11px] italic text-[#888]">
            Devon Walsh, CSM · 22 accounts · 4 urgent today
          </p>
        </motion.div>
      </div>
    </section>
  );
}
