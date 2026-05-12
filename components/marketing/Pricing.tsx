"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: false,
} as const;

type WhatYouGetItem = string | { label: string; hint: string };

type Tier = {
  name: string;
  monthlyFee: string;
  perSeat?: string;
  availability?: string;
  bestFor: string[];
  whatYouGet: WhatYouGetItem[];
  ctaLabel: string;
  ctaHref: string;
  ctaStyle: "primary" | "secondary";
  highlighted?: boolean;
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    monthlyFee: "$1,500",
    perSeat: "+ $129 per CSM",
    bestFor: [
      "Founder-led teams running CS hands-on",
      "Small CS orgs with a Manager, Director, or Head of CS",
      "Pre-seed through Seed-stage SaaS",
    ],
    whatYouGet: [
      "Email-first methodology",
      "AI brief + morning queue",
      "Health scoring with weights",
      "NRR + LTV forecasting",
      "Coverage routing",
      "Up to 3 CSMs",
    ],
    ctaLabel: "Get started",
    ctaHref: "#starter",
    ctaStyle: "secondary",
  },
  {
    name: "Scale",
    monthlyFee: "$2,500",
    perSeat: "+ $179 per CSM",
    bestFor: [
      "Mid-market CS teams running 4–12 CSMs",
      "Series A through Series C SaaS",
      "Multiple segments, regions, or verticals",
      "Need defensible numbers and operational clarity",
    ],
    whatYouGet: [
      "Everything in Starter",
      "Multi-team segmentation",
      "Custom dashboards",
      {
        label: "Salesforce or HubSpot integration",
        hint: "$500/mo + $5K impl",
      },
      "Advanced forecasting",
      "Up to 12 CSMs",
      "Priority support",
    ],
    ctaLabel: "Get Scale",
    ctaHref: "#scale",
    ctaStyle: "primary",
    highlighted: true,
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyFee: "Custom",
    availability: "Available Q3 2026",
    bestFor: [
      "CS orgs with 13+ CSMs across multiple teams",
      "Regulated industries needing SOC 2 Type II",
      "Custom integration and dedicated CSM",
    ],
    whatYouGet: [
      "Everything in Scale",
      "Unlimited CSMs",
      "SOC 2 Type II compliance",
      "Custom integrations",
      "Dedicated CSM",
      "SLA-backed support",
    ],
    ctaLabel: "Talk to us",
    ctaHref: "mailto:matt@stayevergreen.ai",
    ctaStyle: "secondary",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pb-24 pt-12">
      <motion.div
        {...fadeUp}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
          Pricing
        </p>
        <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl lg:text-6xl">
          Built around your team, priced around your wins.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#666] md:text-[19px]">
          Hybrid platform fee plus per-seat — designed so cost grows with your
          team's value, not punitively with seat count.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {TIERS.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} delay={i * 0.1} />
        ))}
      </div>

      <ROIBlock />
    </section>
  );
}

function PricingCard({ tier, delay }: { tier: Tier; delay: number }) {
  const isPrimary = tier.ctaStyle === "primary";
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: FADE_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      className="relative flex h-full flex-col rounded-2xl bg-white p-8 md:p-10"
      style={{
        border: tier.highlighted ? "2px solid #16A34A" : "1px solid #EAEAEA",
        boxShadow: tier.highlighted
          ? "0 1px 3px rgba(0, 0, 0, 0.04), 0 12px 32px rgba(22, 163, 74, 0.08)"
          : "0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.04)",
      }}
    >
      {tier.popular ? (
        <span className="mb-4 inline-block w-fit rounded-full bg-[#16A34A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.10em] text-white">
          Most popular
        </span>
      ) : null}

      <h3 className="text-[20px] font-medium tracking-[-0.01em] text-[#0A0A0A]">
        {tier.name}
      </h3>

      <div className="mt-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[44px] font-bold leading-none tracking-[-0.03em] text-[#0A0A0A] md:text-[48px]">
            {tier.monthlyFee}
          </span>
          {tier.monthlyFee !== "Custom" ? (
            <span className="text-[14px] text-[#666]">/month</span>
          ) : null}
        </div>
        {tier.perSeat ? (
          <div className="mt-1.5 text-[14px] text-[#666]">{tier.perSeat}</div>
        ) : null}
        {tier.availability ? (
          <p className="mt-1.5 text-[13px] italic text-[#666]">
            {tier.availability}
          </p>
        ) : null}
      </div>

      <div className="mt-7 border-t border-[#EAEAEA] pt-7">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888]">
          Best for
        </p>
        <ul className="flex flex-col gap-2">
          {tier.bestFor.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[13px] leading-[1.45] text-[#444]"
            >
              <Check
                size={13}
                strokeWidth={2.5}
                className="mt-[3px] shrink-0 text-[#16A34A]"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 border-t border-[#EAEAEA] pt-7">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888]">
          What you get
        </p>
        <ul className="flex flex-col gap-2">
          {tier.whatYouGet.map((item) => {
            const key = typeof item === "string" ? item : item.label;
            return (
              <li
                key={key}
                className="flex items-start gap-2.5 text-[13px] leading-[1.4] text-[#444]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[2px] shrink-0 select-none text-[#999]"
                >
                  •
                </span>
                {typeof item === "string" ? (
                  <span>{item}</span>
                ) : (
                  <span>
                    {item.label}{" "}
                    <span className="text-[11px] text-[#999]">
                      ({item.hint})
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <a
          href={tier.ctaHref}
          className={
            isPrimary
              ? "inline-flex w-full items-center justify-center rounded-lg bg-[#16A34A] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#15803D]"
              : "inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-[15px] font-semibold text-[#16A34A] transition-colors hover:bg-[#F0FDF4]"
          }
          style={isPrimary ? undefined : { border: "2px solid #16A34A" }}
        >
          {tier.ctaLabel}
        </a>
      </div>
    </motion.div>
  );
}

function ROIBlock() {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: FADE_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mt-24 max-w-3xl text-center"
    >
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.10em] text-[#666]">
        The math
      </p>
      <p className="text-[18px] font-medium leading-[1.4] text-[#0A0A0A] md:text-[20px]">
        ROI typically lands at 16–20× year one for a 6-CSM team.
      </p>
      <p className="mt-3 text-[14px] leading-[1.55] text-[#666] md:text-[15px]">
        Run the math on your team. No vibes — just inputs you control.
      </p>
      <a
        href="/roi"
        className="mt-5 inline-block text-[14px] font-medium text-[#16A34A] transition-colors hover:text-[#15803D]"
      >
        See the math →
      </a>
    </motion.div>
  );
}
