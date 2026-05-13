"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HighlightReelModal, {
  type HighlightTab,
} from "./HighlightReelModal";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

type Tile = {
  id: HighlightTab;
  label: string;
  headline: string;
  valueProp: string;
  supporting: string;
  Preview: () => React.ReactElement;
};

const TILES: Tile[] = [
  {
    id: "handoff",
    label: "Sales-to-CS Handoff",
    headline: "Sales-to-CS Handoff",
    valueProp: "AE submits once. AI extracts. CSM reviews.",
    supporting:
      "Contacts, goals, risks, and commitments — structured the moment the handoff lands.",
    Preview: HandoffPreview,
  },
  {
    id: "qbr",
    label: "Quarterly Business Reviews",
    headline: "Quarterly Business Reviews",
    valueProp: "Internal prep + customer deck, built in one place.",
    supporting: "AI drafts. You edit. The result lands ready to present.",
    Preview: QBRPreview,
  },
  {
    id: "voc",
    label: "Voice of Customer",
    headline: "Voice of Customer",
    valueProp: "Themes across your book, grounded in real quotes.",
    supporting:
      "Ask a question. Get an answer pulled from real conversations, not surveys.",
    Preview: VOCPreview,
  },
  {
    id: "ooo",
    label: "Coverage During OOO",
    headline: "Coverage During OOO",
    valueProp: "When a CSM is out, customers don't notice.",
    supporting:
      "AI redistributes accounts based on context, skills, and capacity.",
    Preview: OOOPreview,
  },
];

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
          How it works
        </p>
        <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl">
          Leverage, where the work actually happens.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-[1.6] tracking-[-0.005em] text-[#1F1F1F] md:text-[17px]">
          Four places where AI handles the cognitive load — and your CSM
          stays in charge.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {TILES.map((tile, i) => (
          <Card
            key={tile.id}
            tile={tile}
            index={i}
            onOpen={() => openWith(tile.id)}
          />
        ))}
      </div>

      <HighlightReelModal
        open={open}
        initialTab={activeTab}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}

function Card({
  tile,
  index,
  onOpen,
}: {
  tile: Tile;
  index: number;
  onOpen: () => void;
}) {
  const [hover, setHover] = useState(false);
  const { Preview } = tile;
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
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: FADE_EASE,
      }}
      viewport={{ once: true, margin: "-80px" }}
      aria-label={`Open ${tile.headline} highlight`}
      className="group flex h-full cursor-pointer flex-col rounded-2xl bg-white p-8 text-left transition-shadow duration-200 md:p-10"
      style={{
        border: hover ? "1px solid #16A34A" : "1px solid #E8E8E8",
        boxShadow: hover
          ? "0 12px 32px rgba(22, 163, 74, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)"
          : "0 1px 2px rgba(0, 0, 0, 0.02)",
      }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#999]">
        {tile.label}
      </p>
      <h3 className="mt-3 text-balance text-[22px] font-bold leading-[1.2] tracking-[-0.015em] text-[#14532D] md:text-[24px]">
        {tile.headline}
      </h3>
      <p className="mt-4 text-[15px] font-medium leading-[1.5] text-[#0A0A0A] md:text-[16px]">
        {tile.valueProp}
      </p>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-[#6B6B6B] md:text-[14px]">
        {tile.supporting}
      </p>

      <div className="mt-7 flex min-h-[120px] items-start">
        <Preview />
      </div>

      <span className="mt-auto pt-6 text-[13px] font-semibold text-[#16A34A] transition-colors group-hover:text-[#15803D]">
        See it →
      </span>
    </motion.button>
  );
}

function HandoffPreview() {
  return (
    <div
      className="w-full rounded-md bg-white p-3"
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

function QBRPreview() {
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

function VOCPreview() {
  const bars: { width: string; color: string }[] = [
    { width: "70%", color: "#FB923C" },
    { width: "100%", color: "#16A34A" },
    { width: "85%", color: "#16A34A" },
    { width: "45%", color: "#DC2626" },
  ];
  return (
    <div
      aria-hidden="true"
      className="flex w-full max-w-[140px] flex-col gap-1"
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

function OOOPreview() {
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
