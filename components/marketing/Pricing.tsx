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
      "Pre-seed through Seed-stage companies",
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
      "Series A through Series C companies",
      "Multiple segments, regions, or verticals",
      "Teams that need defensible numbers and operational clarity",
    ],
    whatYouGet: [
      "Everything in Starter",
      "Multi-team segmentation",
      "Custom dashboards",
      {
        label: "Salesforce or HubSpot integration",
        hint: "$500/mo + $5K implementation",
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
      "Companies with complex compliance and security requirements",
      "Custom integration and dedicated CSM needs",
    ],
    whatYouGet: [
      "Everything in Scale",
      "Unlimited CSMs",
      "SSO and SAML",
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
    <section
      id="pricing"
      className="relative overflow-hidden px-6 pb-16 pt-12 md:px-12"
    >
      <motion.div
        {...fadeUp}
        className="relative z-10 mx-auto mb-12 max-w-3xl text-center"
      >
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#34D399]">
          Pricing
        </p>
        <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[#ECFDF5] sm:text-4xl md:text-5xl lg:text-6xl">
          Built around your team, priced around your wins.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[rgba(255,255,255,0.70)] md:text-[19px]">
          Hybrid platform fee plus per-seat — designed so cost grows with your
          team's value, not punitively with seat count.
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {TIERS.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} delay={i * 0.1} />
        ))}
      </div>

      <div className="relative z-10">
        <ROIBlock />
      </div>
    </section>
  );
}

function PricingCard({ tier, delay }: { tier: Tier; delay: number }) {
  const isPrimary = tier.ctaStyle === "primary";
  const card = (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: FADE_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      className="relative flex h-full flex-col rounded-2xl bg-white p-6"
      style={{
        border: tier.highlighted
          ? "2px solid #16A34A"
          : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: tier.highlighted
          ? "0 20px 40px -12px rgba(0, 0, 0, 0.3)"
          : "0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.04)",
      }}
    >
      {tier.popular ? (
        <span className="mb-4 inline-block w-fit rounded-full bg-[#16A34A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.10em] text-white">
          Most popular
        </span>
      ) : (
        <div
          aria-hidden="true"
          className="mb-4 hidden min-h-[24px] lg:block"
        />
      )}

      <h3 className="text-[20px] font-medium tracking-[-0.01em] text-[#0A0A0A]">
        {tier.name}
      </h3>

      <div className="mt-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[40px] font-bold leading-none tracking-[-0.03em] text-[#0A0A0A] md:text-[44px]">
            {tier.monthlyFee}
          </span>
          {tier.monthlyFee !== "Custom" ? (
            <span className="text-[14px] text-[#666]">/month</span>
          ) : null}
        </div>
        {tier.perSeat ? (
          <div className="mt-1 text-[14px] text-[#666]">{tier.perSeat}</div>
        ) : null}
        {tier.availability ? (
          <p className="mt-1 text-[13px] italic text-[#666]">
            {tier.availability}
          </p>
        ) : null}
      </div>

      <div className="mt-4 border-t border-[#EAEAEA] pt-4 lg:min-h-[150px]">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888]">
          Best for
        </p>
        <ul className="flex flex-col gap-1.5">
          {tier.bestFor.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[13px] leading-snug text-[#444]"
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

      <div className="mt-4 border-t border-[#EAEAEA] pt-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888]">
          What you get
        </p>
        <ul className="flex flex-col gap-1.5">
          {tier.whatYouGet.map((item) => {
            const key = typeof item === "string" ? item : item.label;
            return (
              <li
                key={key}
                className="flex items-start gap-2 text-[13px] leading-snug text-[#444]"
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
                  <span className="flex flex-col">
                    <span>{item.label}</span>
                    <span className="mt-0.5 text-[11px] text-[#9CA3AF]">
                      {item.hint}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto pt-4">
        <a
          href={tier.ctaHref}
          className="inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-[15px] font-semibold text-[#16A34A] transition-colors hover:bg-[#F0FDF4]"
          style={{
            border: isPrimary ? "1px solid #16A34A" : "2px solid #16A34A",
          }}
        >
          {tier.ctaLabel}
        </a>
      </div>
    </motion.div>
  );

  if (tier.highlighted) {
    return (
      <div className="relative h-full" style={{ isolation: "isolate" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            inset: "-48px",
            background:
              "radial-gradient(circle, rgba(74, 222, 128, 0.28) 0%, rgba(74, 222, 128, 0.12) 40%, transparent 75%)",
            zIndex: 0,
          }}
        />
        <div className="relative z-10 h-full">{card}</div>
      </div>
    );
  }

  return card;
}

function ROIBlock() {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: FADE_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mt-20 max-w-3xl text-center"
    >
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.10em] text-[#6EE7B7]">
        The math
      </p>
      <p className="text-[18px] font-medium leading-[1.4] text-[#ECFDF5] md:text-[20px]">
        ROI typically lands at 16–20× year one for a 6-CSM team.
      </p>
      <p className="mt-3 text-[14px] leading-[1.55] text-[rgba(255,255,255,0.70)] md:text-[15px]">
        We built the calculator so the math is yours, not ours.
      </p>
      <a
        href="/roi"
        className="mt-5 inline-block text-[14px] font-medium text-[#4ADE80] transition-colors hover:text-[#ECFDF5]"
      >
        See the math →
      </a>
    </motion.div>
  );
}
