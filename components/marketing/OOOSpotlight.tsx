"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

type Route = {
  account: string;
  arr: string;
  to: string;
  rationale: string;
};

const ROUTES: Route[] = [
  {
    account: "Acme Corp",
    arr: "$480K",
    to: "Markham Liu",
    rationale:
      "Same industry vertical · prior shadow on 2024 renewal · 78% capacity",
  },
  {
    account: "Voltura Systems",
    arr: "$480K",
    to: "Sasha Reyes",
    rationale:
      "Strongest relationship history · attended Q1 QBR · 65% capacity",
  },
  {
    account: "Bridgewater Co",
    arr: "$360K",
    to: "Markham Liu",
    rationale:
      "Procurement context familiar · same legal contact · 78% capacity",
  },
  {
    account: "+ 19 more accounts",
    arr: "$2.8M total",
    to: "5 CSMs",
    rationale: "Routed by industry, history, and current load",
  },
];

export default function OOOSpotlight() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: FADE_EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-5"
        >
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
            And the one you might not have considered
          </p>
          <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-[40px] lg:text-[44px]">
            When Devon's out, Markham doesn't notice.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.7] text-[#1F1F1F] md:text-[17px]">
            Coverage routing solves a problem CS teams don't usually name:
            continuity during OOO. When a CSM is out, accounts get reassigned
            by industry expertise, customer-relationship history, and current
            load — not by who's free. The customer experiences continuity.
            The covering CSM gets the brief, the contacts, and the live goal
            status. The decision is the manager's. The math is visible.
            Nobody loses context.
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
            <div className="border-b border-[#EAEAEA] bg-[#FAFAF9] px-5 py-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
                  OOO coverage plan
                </p>
                <span
                  className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.10em]"
                  style={{
                    color: "#9A3412",
                    background: "#FFF7ED",
                  }}
                >
                  Devon · OOO May 7–14
                </span>
              </div>
              <p className="mt-2 text-[11px] text-[#888]">
                22 accounts · $5.7M ARR redistributed in 4 minutes
              </p>
            </div>
            <ul className="flex flex-col">
              {ROUTES.map((route, i) => {
                const isAggregate = i === ROUTES.length - 1;
                return (
                  <li
                    key={route.account}
                    className="flex items-start gap-3 px-5 py-4"
                    style={{
                      borderTop: i === 0 ? "none" : "0.5px solid #EAEAEA",
                      background: isAggregate ? "#FAFAF9" : "transparent",
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={
                            isAggregate
                              ? "text-[12px] font-medium italic text-[#666]"
                              : "text-[13px] font-bold text-[#0A0A0A]"
                          }
                        >
                          {route.account}
                        </span>
                        <span className="font-mono text-[11px] tabular-nums text-[#666]">
                          {route.arr}
                        </span>
                      </div>
                      <p className="mt-1 text-[11.5px] leading-[1.45] text-[#666]">
                        Why? {route.rationale}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-[#BBB]"
                    >
                      →
                    </span>
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#888]">
                        Cover
                      </p>
                      <p className="mt-0.5 text-[12px] font-semibold text-[#0A0A0A]">
                        {route.to}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-3 text-center text-[11px] italic text-[#888]">
            Devon OOO May 7–14. 22 accounts redistributed in 4 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
