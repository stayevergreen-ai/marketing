"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: FADE_EASE },
  viewport: { once: true, margin: "-80px" },
} as const;

type Tier = {
  name: string;
  monthlyFee: string;
  perSeat?: string;
  founderNote?: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaStyle: "primary" | "secondary";
  highlighted?: boolean;
  popular?: boolean;
  availability?: string;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    monthlyFee: "$1,500",
    perSeat: "+ $129 per CSM",
    founderNote: "Year 1: $1,000 + $99/CSM",
    description: "For founder-led teams getting their CS motion right.",
    bullets: [
      "Email-first methodology",
      "AI brief + morning queue",
      "Health scoring with configurable weights",
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
    description: "For mid-market teams running a scaled CS organization.",
    bullets: [
      "Everything in Starter",
      "Multi-team segmentation",
      "Custom dashboards",
      "Salesforce or HubSpot integration ($500/mo + $5K impl)",
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
    description: "For larger CS orgs with custom requirements.",
    bullets: [
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
    availability: "Available Q3 2026",
  },
];

export default function Pricing() {
  return (
    <section className="py-24">
      <motion.div
        {...fadeUp}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#888]">
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: FADE_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      className="relative flex h-full flex-col rounded-2xl bg-white p-8 md:p-10"
      style={{
        border: tier.highlighted
          ? "2px solid #16A34A"
          : "1px solid #EAEAEA",
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

      <h3 className="text-[24px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
        {tier.name}
      </h3>

      <div className="mt-6">
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
      </div>

      {tier.founderNote ? (
        <div
          className="mt-3 inline-flex w-fit items-center rounded-md px-3 py-1.5"
          style={{
            background: "#FFFBEB",
            border: "0.5px solid #FDE68A",
          }}
        >
          <span className="text-[12px] italic text-[#92400E]">
            {tier.founderNote}
          </span>
        </div>
      ) : null}

      <p className="mt-6 text-[14px] leading-[1.55] text-[#666]">
        {tier.description}
      </p>

      <div className="my-7 border-t border-[#EAEAEA]" />

      <ul className="flex flex-col gap-2.5">
        {tier.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[#1F1F1F]"
          >
            <Check
              size={14}
              strokeWidth={2.5}
              className="mt-1 shrink-0 text-[#16A34A]"
              aria-hidden="true"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {tier.availability ? (
        <p className="mt-4 text-[12px] italic text-[#888]">
          {tier.availability}
        </p>
      ) : null}

      <div className="mt-auto pt-8">
        <a
          href={tier.ctaHref}
          className={
            isPrimary
              ? "inline-flex w-full items-center justify-center rounded-lg bg-[#16A34A] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#15803D]"
              : "inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-[15px] font-medium text-[#16A34A] transition-colors hover:bg-[#F0FDF4]"
          }
          style={isPrimary ? undefined : { border: "1.5px solid #16A34A" }}
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: FADE_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mt-24 max-w-3xl text-center"
    >
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.10em] text-[#888]">
        The math
      </p>
      <p className="text-[18px] font-medium leading-[1.4] text-[#0A0A0A] md:text-[20px]">
        ROI typically lands at 16–20× year one for a 6-CSM team.
      </p>
      <p className="mt-3 text-[14px] leading-[1.55] text-[#666] md:text-[15px]">
        Calculator lets you tune assumptions to your own team.
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
