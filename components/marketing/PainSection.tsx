"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

type ContextCard = {
  source: string;
  primary: string;
  secondary?: string;
  timestamp: string;
  top: string;
  left: string;
  rotate: number;
  z: number;
};

const CARDS: ContextCard[] = [
  {
    source: "Gmail",
    primary: "Re: Q3 renewal — pricing concern",
    secondary: "Sarah Chen",
    timestamp: "3 weeks ago",
    top: "0%",
    left: "4%",
    rotate: -2.5,
    z: 6,
  },
  {
    source: "Slack · #cs-team",
    primary: "Anyone got context on Acme's DPA escalation?",
    secondary: "Devon Walsh",
    timestamp: "Yesterday",
    top: "6%",
    left: "44%",
    rotate: 3,
    z: 5,
  },
  {
    source: "Salesforce · Account",
    primary: "Voltura Systems",
    secondary: "Health: 78 · ARR $480K",
    timestamp: "Last updated 6w ago",
    top: "34%",
    left: "0%",
    rotate: 1.5,
    z: 4,
  },
  {
    source: "Notion · linked from QBR",
    primary: "Q1 commitments",
    secondary: "200 active users by EoQ2",
    timestamp: "Mar 15",
    top: "38%",
    left: "46%",
    rotate: -3,
    z: 3,
  },
  {
    source: "Call recording",
    primary: "Tom Willis · QBR prep",
    secondary: "42 min · 8 action items",
    timestamp: "May 7",
    top: "68%",
    left: "6%",
    rotate: 2,
    z: 2,
  },
  {
    source: "QBR · Q1 2026",
    primary: "Carryover: exec review w/ new CFO",
    secondary: "Open · owner: Devon",
    timestamp: "Mar 15",
    top: "70%",
    left: "48%",
    rotate: -1.5,
    z: 1,
  },
];

export default function PainSection() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: FADE_EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-5"
        >
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
            The problem
          </p>
          <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-[44px] lg:text-[48px]">
            The tax of context rebuilding.
          </h2>
          <p className="mt-7 text-[16px] leading-[1.65] text-[#1F1F1F] md:text-[17px]">
            Customer Success spends most of its day rebuilding context.
            Reading the same email thread for the third time. Re-finding the
            insight buried in last week&rsquo;s Slack. Re-explaining an
            account to leadership for the fifth time this quarter.
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] text-[#1F1F1F] md:text-[17px]">
            It&rsquo;s not the work. It&rsquo;s the cognitive switching cost
            between the work. And it&rsquo;s where CS teams lose hours every
            day.
          </p>
          <p className="mt-10 text-[24px] font-bold leading-[1.2] tracking-[-0.015em] text-[#14532D] md:text-[28px]">
            Evergreen handles it.
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: FADE_EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-7"
          aria-hidden="true"
        >
          <div className="flex flex-col gap-3 lg:hidden">
            {CARDS.map((c, i) => (
              <ContextCardView key={i} card={c} stacked={false} />
            ))}
          </div>
          <div className="relative hidden h-[440px] lg:block">
            {CARDS.map((c, i) => (
              <div
                key={i}
                className="absolute w-[280px]"
                style={{
                  top: c.top,
                  left: c.left,
                  transform: `rotate(${c.rotate}deg)`,
                  zIndex: c.z,
                }}
              >
                <ContextCardView card={c} stacked />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContextCardView({
  card,
  stacked,
}: {
  card: ContextCard;
  stacked: boolean;
}) {
  return (
    <div
      className="rounded-md bg-white p-3"
      style={{
        border: "1px solid #E8E8E8",
        boxShadow: stacked
          ? "0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)"
          : "0 1px 2px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[9px] font-bold uppercase tracking-[0.10em] text-[#888]">
          {card.source}
        </span>
        <span className="shrink-0 text-[9px] uppercase tracking-[0.06em] text-[#999]">
          {card.timestamp}
        </span>
      </div>
      <p className="mt-2 text-[12px] font-semibold leading-[1.35] text-[#1F1F1F]">
        {card.primary}
      </p>
      {card.secondary ? (
        <p className="mt-1 text-[10.5px] leading-[1.4] text-[#666]">
          {card.secondary}
        </p>
      ) : null}
    </div>
  );
}
