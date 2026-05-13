"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

type Phrase = {
  text: string;
  top: string;
  left: string;
  size: number;
  color: string;
  rotate: number;
};

const PHRASES: Phrase[] = [
  {
    text: "Slack thread from 3 weeks ago",
    top: "6%",
    left: "6%",
    size: 18,
    color: "#888",
    rotate: -1,
  },
  {
    text: "Email chain · 14 replies",
    top: "12%",
    left: "58%",
    size: 14,
    color: "#AAA",
    rotate: 2,
  },
  {
    text: "QBR notes from January",
    top: "28%",
    left: "18%",
    size: 20,
    color: "#777",
    rotate: -2,
  },
  {
    text: "Call recording from May",
    top: "34%",
    left: "62%",
    size: 13,
    color: "#BBB",
    rotate: 1,
  },
  {
    text: "CRM record · stale 6w",
    top: "50%",
    left: "8%",
    size: 16,
    color: "#999",
    rotate: -1,
  },
  {
    text: "That doc somewhere",
    top: "56%",
    left: "52%",
    size: 17,
    color: "#888",
    rotate: 2,
  },
  {
    text: "Ticket from Q3",
    top: "74%",
    left: "22%",
    size: 14,
    color: "#AAA",
    rotate: 1,
  },
  {
    text: "Last QBR commitments",
    top: "80%",
    left: "58%",
    size: 15,
    color: "#999",
    rotate: -1,
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
          <p className="mt-7 text-[18px] font-semibold leading-[1.4] text-[#14532D] md:text-[19px]">
            Evergreen takes that tax off your team.
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
          <div className="flex flex-wrap gap-x-6 gap-y-3 lg:hidden">
            {PHRASES.map((p, i) => (
              <span
                key={i}
                className="select-none"
                style={{
                  fontSize: `${Math.min(p.size, 17)}px`,
                  color: p.color,
                }}
              >
                {p.text}
              </span>
            ))}
          </div>
          <div className="relative hidden min-h-[420px] lg:block">
            {PHRASES.map((p, i) => (
              <span
                key={i}
                className="absolute select-none whitespace-nowrap"
                style={{
                  top: p.top,
                  left: p.left,
                  fontSize: `${p.size}px`,
                  color: p.color,
                  transform: `rotate(${p.rotate}deg)`,
                }}
              >
                {p.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
