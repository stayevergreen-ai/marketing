"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HighlightReelModal, {
  type HighlightTab,
} from "./HighlightReelModal";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

export default function HighlightReel() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<HighlightTab>("handoff");

  const openWith = (tab: HighlightTab) => {
    setActiveTab(tab);
    setOpen(true);
  };

  return (
    <section className="py-24">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mb-14 max-w-3xl text-center"
      >
        <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
          What CS has been trying to solve for years
        </p>
        <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl">
          Built right, finally.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.6] tracking-[-0.005em] text-[#1F1F1F] md:text-[19px]">
          Four workflows every CS leader has tried to fix and given up on —
          and one most haven't even named. They're hard because they're
          cross-functional, judgment-heavy, and resist automation. They're
          also where AI actually earns its place — when paired with the
          people who own the relationship.
        </p>
      </motion.div>

      <div className="mx-auto max-w-7xl">
        <HeroTile onOpen={() => openWith("handoff")} />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <SatelliteTile
            number="02"
            title="Quarterly Business Reviews"
            subtitle="Internal prep + customer deck, built in one place."
            detail="DRAFT 87% · Q2 2026"
            accent={<QBRAccent />}
            onOpen={() => openWith("qbr")}
            ariaLabel="Open Quarterly Business Reviews highlight"
          />
          <SatelliteTile
            number="03"
            title="Voice of Customer"
            subtitle="Themes across your book, grounded in real quotes."
            detail="47 accounts · 6 active themes"
            accent={<VOCAccent />}
            onOpen={() => openWith("voc")}
            ariaLabel="Open Voice of Customer highlight"
          />
          <SatelliteTile
            number="04"
            title="Coverage During OOO"
            subtitle="When a CSM is out, customers don't notice."
            detail="22 accounts redistributed · 4 minutes"
            accent={<OOOAccent />}
            onOpen={() => openWith("ooo")}
            ariaLabel="Open Coverage During OOO highlight"
          />
        </div>
      </div>

      <HighlightReelModal
        open={open}
        initialTab={activeTab}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}

function HeroTile({ onOpen }: { onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      transition={{ duration: 0.8, ease: FADE_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      aria-label="Open Sales-to-CS Handoff highlight"
      className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-shadow duration-200"
      style={{
        background:
          "linear-gradient(to top right, #FFFFFF 0%, #FFFFFF 60%, #F0FDF4 100%)",
        border: hover
          ? "1.5px solid rgba(22, 163, 74, 0.6)"
          : "1.5px solid rgba(22, 163, 74, 0.3)",
        boxShadow: hover
          ? "0 16px 40px rgba(22, 163, 74, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)"
          : "0 1px 2px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col px-9 pt-9 md:col-span-7 md:py-10 md:pl-10 md:pr-0">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#999]">
            Feature 01
          </p>
          <h3 className="text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#14532D] sm:text-[32px] md:text-[34px]">
            Sales-to-CS Handoff
          </h3>
          <p className="mt-4 text-[16px] font-normal leading-[1.55] text-[#0A0A0A]">
            AE submits once. AI extracts. CSM reviews.
          </p>
          <p className="mt-3 text-[14px] leading-[1.55] text-[#6B6B6B]">
            Contacts, goals, risks, and commitments — structured the moment
            the handoff lands.
          </p>
          <span className="mt-6 inline-block text-[14px] font-semibold text-[#16A34A] transition-colors group-hover:text-[#15803D]">
            See it →
          </span>
        </div>

        <div className="px-9 pb-9 md:col-span-5 md:py-10 md:pl-0 md:pr-10">
          <HandoffSnippet />
        </div>
      </div>
    </motion.button>
  );
}

function HandoffSnippet() {
  return (
    <div
      className="rounded-lg bg-white p-4"
      style={{ border: "1px solid #E8E8E8" }}
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="text-[12px] font-bold leading-none text-[#16A34A]"
        >
          ✓
        </span>
        <span className="text-[9.5px] font-bold uppercase tracking-[0.10em] text-[#16A34A]">
          Parsed with AI
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <ContactMini name="Priya Raman" tier="Champion" tone="green" />
        <ContactMini
          name="Tom Blackwell"
          tier="Decision Maker"
          tone="neutral"
        />
      </div>
      <p className="mt-3 text-[10.5px] text-[#6B6B6B]">
        + 2 more · 4 goals · 3 risks
      </p>
    </div>
  );
}

function ContactMini({
  name,
  tier,
  tone,
}: {
  name: string;
  tier: string;
  tone: "green" | "neutral";
}) {
  const TONE_TEXT: Record<"green" | "neutral", string> = {
    green: "#15803D",
    neutral: "#666",
  };
  const TONE_BG: Record<"green" | "neutral", string> = {
    green: "#F0FDF4",
    neutral: "#F5F5F4",
  };
  return (
    <div
      className="flex items-center justify-between gap-2 rounded-md p-2"
      style={{ background: "#FAFAFA", border: "0.5px solid #EAEAEA" }}
    >
      <span className="truncate text-[11px] font-semibold text-[#0A0A0A]">
        {name}
      </span>
      <span
        className="shrink-0 rounded-full px-1.5 py-px text-[8.5px] font-bold uppercase tracking-[0.06em]"
        style={{ color: TONE_TEXT[tone], background: TONE_BG[tone] }}
      >
        {tier}
      </span>
    </div>
  );
}

function SatelliteTile({
  number,
  title,
  subtitle,
  detail,
  accent,
  onOpen,
  ariaLabel,
}: {
  number: string;
  title: string;
  subtitle: string;
  detail: string;
  accent: React.ReactNode;
  onOpen: () => void;
  ariaLabel: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -3,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      transition={{ duration: 0.8, ease: FADE_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      aria-label={ariaLabel}
      className="group flex h-full cursor-pointer flex-col rounded-2xl bg-white px-7 py-8 text-left transition-shadow duration-200"
      style={{
        border: hover ? "1px solid #16A34A" : "1px solid #E8E8E8",
        boxShadow: hover
          ? "0 12px 32px rgba(22, 163, 74, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)"
          : "0 1px 2px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div className="mb-5 flex h-7 items-center">{accent}</div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#999]">
        Feature {number}
      </p>
      <h3 className="mt-3 text-balance text-[20px] font-bold leading-[1.2] tracking-[-0.015em] text-[#14532D] md:text-[22px]">
        {title}
      </h3>
      <p className="mt-2 text-[15px] font-normal leading-[1.55] text-[#0A0A0A]">
        {subtitle}
      </p>
      <div className="mt-auto pt-6">
        <p className="font-mono text-[12px] tabular-nums text-[#6B6B6B]">
          {detail}
        </p>
        <span className="mt-3 inline-block text-[13px] font-semibold text-[#16A34A] transition-colors group-hover:text-[#15803D]">
          See it →
        </span>
      </div>
    </motion.button>
  );
}

function QBRAccent() {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-md bg-[#F5F5F4] p-0.5">
      <span
        className="rounded bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#16A34A]"
        style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)" }}
      >
        Internal
      </span>
      <span className="px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#888]">
        External
      </span>
    </div>
  );
}

function VOCAccent() {
  const bars: { width: string; color: string }[] = [
    { width: "70%", color: "#FB923C" },
    { width: "100%", color: "#16A34A" },
    { width: "85%", color: "#16A34A" },
    { width: "45%", color: "#DC2626" },
  ];
  return (
    <div
      aria-hidden="true"
      className="flex w-full max-w-[110px] flex-col gap-1"
    >
      {bars.map((b, i) => (
        <div
          key={i}
          className="h-1.5 rounded-sm"
          style={{ width: b.width, background: b.color }}
        />
      ))}
    </div>
  );
}

function OOOAccent() {
  return (
    <span
      className="inline-block rounded-md px-2 py-1 text-[9.5px] font-bold uppercase tracking-[0.10em]"
      style={{
        color: "#9A3412",
        background: "#FFF7ED",
        border: "1px solid #FED7AA",
      }}
    >
      OOO May 7–14
    </span>
  );
}
