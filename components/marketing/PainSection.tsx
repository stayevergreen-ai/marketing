"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

type RankedRow = {
  source: string;
  preview: string;
  timestamp: string;
  priority: string;
  priorityColor: string;
};

const RANKED_ROWS: RankedRow[] = [
  {
    priority: "1",
    priorityColor: "#993C1D",
    source: "Email",
    preview: "Re: Q3 renewal — pricing concern from Sarah Chen",
    timestamp: "3w ago",
  },
  {
    priority: "2",
    priorityColor: "#BA7517",
    source: "Slack",
    preview: "Anyone got context on Acme's DPA escalation?",
    timestamp: "Yesterday",
  },
  {
    priority: "3",
    priorityColor: "#BA7517",
    source: "Call",
    preview: "Tom Willis · QBR prep · 42 min · 8 action items",
    timestamp: "May 7",
  },
  {
    priority: "4",
    priorityColor: "#888780",
    source: "CRM",
    preview: "Voltura Systems · Health 78 · ARR $480K · stale 6w",
    timestamp: "6w",
  },
];

type Fragment = {
  text: string;
  top: string;
  left: string;
  rotate: number;
  hideMobile?: boolean;
};

const FRAGMENTS: Fragment[] = [
  // ── Top band (above card) ──
  { text: "Q3 renewal · Sarah", top: "3%", left: "8%", rotate: -3 },
  { text: "DPA escalation", top: "2%", left: "28%", rotate: 2 },
  { text: "QBR · 42min", top: "5%", left: "52%", rotate: -1 },
  { text: "Voltura 78", top: "3%", left: "74%", rotate: 3 },
  { text: "P1 ticket", top: "12%", left: "14%", rotate: -2 },
  { text: "EoQ2 target", top: "14%", left: "38%", rotate: 4 },
  { text: "147/200 active", top: "10%", left: "62%", rotate: -3 },
  { text: "Sarah replied", top: "13%", left: "84%", rotate: 1 },
  { text: "Bridgewater", top: "20%", left: "24%", rotate: -1, hideMobile: true },
  { text: "Acme renewal", top: "22%", left: "58%", rotate: 2, hideMobile: true },

  // ── Left flank ──
  { text: "200 users", top: "32%", left: "1%", rotate: -3 },
  { text: "Pricing concern", top: "44%", left: "3%", rotate: 2 },
  { text: "Module C interest", top: "56%", left: "1%", rotate: 4 },
  { text: "Net new logos", top: "38%", left: "11%", rotate: 1, hideMobile: true },
  { text: "Re-baseline", top: "62%", left: "10%", rotate: -2, hideMobile: true },

  // ── Right flank ──
  { text: "8 action items", top: "34%", left: "84%", rotate: 2 },
  { text: "Stale 6w", top: "45%", left: "90%", rotate: -3 },
  { text: "Tom Willis", top: "57%", left: "85%", rotate: 1 },
  { text: "Forward CFO", top: "40%", left: "92%", rotate: -2, hideMobile: true },
  { text: "Loop Devon", top: "62%", left: "91%", rotate: 2, hideMobile: true },

  // ── Bottom band ──
  { text: "Apr 21 sync", top: "78%", left: "10%", rotate: 3 },
  { text: "Champion gone", top: "82%", left: "30%", rotate: -2 },
  { text: "$480K ARR", top: "80%", left: "52%", rotate: 1 },
  { text: "New CFO", top: "78%", left: "74%", rotate: -4 },
  { text: "Apr 21 doc", top: "90%", left: "16%", rotate: -1, hideMobile: true },
  { text: "Open 4d", top: "88%", left: "40%", rotate: -3, hideMobile: true },
  { text: "Mar 15 sync", top: "90%", left: "62%", rotate: 2, hideMobile: true },
  { text: "Carryover", top: "86%", left: "84%", rotate: -1, hideMobile: true },

  // ── Edge-overlap: TOP edge of card ──
  { text: "Slack #acme", top: "28%", left: "30%", rotate: -2, hideMobile: true },
  { text: "Pricing thread", top: "27%", left: "48%", rotate: 1, hideMobile: true },
  { text: "Notion doc", top: "29%", left: "65%", rotate: -1, hideMobile: true },

  // ── Edge-overlap: BOTTOM edge of card ──
  { text: "Mar 15 call", top: "69%", left: "28%", rotate: 2, hideMobile: true },
  { text: "Renewal 8w", top: "70%", left: "48%", rotate: -1, hideMobile: true },
  { text: "QBR doc", top: "68%", left: "66%", rotate: 3, hideMobile: true },

  // ── Edge-overlap: LEFT edge of card ──
  { text: "Health 78", top: "38%", left: "19%", rotate: -3, hideMobile: true },
  { text: "NRR 104%", top: "50%", left: "20%", rotate: 1, hideMobile: true },
  { text: "Mid-market", top: "62%", left: "19%", rotate: -2, hideMobile: true },

  // ── Edge-overlap: RIGHT edge of card ──
  { text: "Acme DPA", top: "38%", left: "75%", rotate: 1, hideMobile: true },
  { text: "EU expansion", top: "50%", left: "76%", rotate: -2, hideMobile: true },
  { text: "Slack DM", top: "62%", left: "75%", rotate: 3, hideMobile: true },
];

export default function PainSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-12 lg:py-28">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto mb-16 max-w-2xl text-center lg:mb-20"
      >
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#6EE7B7]">
          The problem
        </p>
        <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[#ECFDF5] sm:text-4xl md:text-[44px] lg:text-[48px]">
          The tax of context rebuilding.
        </h2>
        <p className="mx-auto mt-7 text-[16px] leading-[1.65] text-[rgba(255,255,255,0.70)] md:text-[17px]">
          It&rsquo;s not the work. It&rsquo;s the cognitive switching cost
          between the work — the constant context rebuilding that happens
          between every meeting, every reply, every handoff. And it&rsquo;s
          where CS teams lose hours every day.
        </p>
      </motion.div>

      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto flex max-w-5xl items-center justify-center"
        style={{ minHeight: "600px" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
        >
          {FRAGMENTS.map((f, i) => (
            <span
              key={i}
              className={`absolute select-none whitespace-nowrap rounded-md ${
                f.hideMobile ? "hidden lg:inline-block" : "inline-block"
              }`}
              style={{
                top: f.top,
                left: f.left,
                padding: "5px 9px",
                fontSize: "11px",
                fontWeight: 500,
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "rgba(255, 255, 255, 0.55)",
                transform: `rotate(${f.rotate}deg)`,
                zIndex: 1,
              }}
            >
              {f.text}
            </span>
          ))}
        </div>

        <div
          className="relative w-full"
          style={{ maxWidth: "580px", zIndex: 2 }}
        >
          <RankedQueueCard />
        </div>
      </motion.div>

    </section>
  );
}

function RankedQueueCard() {
  return (
    <div
      className="rounded-xl bg-white"
      style={{
        border: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 30px 80px -12px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}
      >
        <p
          className="font-semibold uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "#14532D",
          }}
        >
          Devon&rsquo;s queue · ranked by Evergreen
        </p>
        <span className="text-[10px] font-medium tabular-nums text-gray-500">
          8 of 30+
        </span>
      </div>
      <ul className="flex flex-col">
        {RANKED_ROWS.map((row, i) => (
          <li
            key={i}
            className="flex items-center gap-3 px-5 py-2.5"
            style={{
              borderTop:
                i === 0 ? "none" : "1px solid rgba(0, 0, 0, 0.06)",
            }}
          >
            <span
              className="shrink-0 text-center"
              style={{
                width: "22px",
                fontSize: "12px",
                fontWeight: 600,
                color: row.priorityColor,
              }}
            >
              {row.priority}
            </span>
            <div className="w-[60px] shrink-0">
              <span className="inline-flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-700">
                {row.source}
              </span>
            </div>
            <span className="flex-1 truncate text-[12px] leading-[1.4] text-[#1F1F1F]">
              {row.preview}
            </span>
            <span className="shrink-0 text-xs font-medium text-gray-500">
              {row.timestamp}
            </span>
          </li>
        ))}
        <li
          className="flex items-center gap-3 px-5 py-2.5"
          style={{ borderTop: "1px solid rgba(0, 0, 0, 0.06)" }}
        >
          <span
            className="shrink-0 text-center"
            style={{
              width: "22px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#888780",
            }}
          >
            +5
          </span>
          <span className="flex-1 text-[12px] italic leading-[1.4] text-gray-500">
            +5 more, ranked
          </span>
        </li>
      </ul>
      <div
        className="flex items-center justify-center"
        style={{
          background: "#F1EFE8",
          padding: "12px 22px",
        }}
      >
        <p
          className="text-center"
          style={{
            fontSize: "12px",
            color: "#5F5E5A",
          }}
        >
          Without Evergreen, this is{" "}
          <span style={{ fontWeight: 600, color: "#2C2C2A" }}>by hand.</span>
        </p>
      </div>
    </div>
  );
}
