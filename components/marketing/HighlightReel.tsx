"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarClock,
  FileText,
  Headphones,
  MessageSquareQuote,
} from "lucide-react";
import HighlightReelModal, {
  type HighlightTab,
} from "./HighlightReelModal";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

type Tile = {
  id: HighlightTab;
  Icon: typeof FileText;
  title: string;
  subtitle: string;
};

const TILES: Tile[] = [
  {
    id: "handoff",
    Icon: Headphones,
    title: "Sales-to-CS Handoff",
    subtitle: "AE submits once. AI extracts. CSM reviews.",
  },
  {
    id: "qbr",
    Icon: FileText,
    title: "Quarterly Business Reviews",
    subtitle: "Internal prep + customer deck, built in one place.",
  },
  {
    id: "voc",
    Icon: MessageSquareQuote,
    title: "Voice of Customer",
    subtitle: "Themes across your book, grounded in real quotes.",
  },
  {
    id: "ooo",
    Icon: CalendarClock,
    title: "Coverage During OOO",
    subtitle: "When a CSM is out, customers don't notice.",
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

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {TILES.map((tile, i) => (
          <Tile key={tile.id} tile={tile} index={i} onOpen={openWith} />
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

function Tile({
  tile,
  index,
  onOpen,
}: {
  tile: Tile;
  index: number;
  onOpen: (tab: HighlightTab) => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(tile.id)}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -3,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: FADE_EASE,
      }}
      viewport={{ once: true, margin: "-80px" }}
      aria-label={`Open ${tile.title} highlight`}
      className="group flex h-full cursor-pointer flex-col rounded-2xl bg-white p-8 text-left transition-colors md:p-10"
      style={{
        border: hover ? "1px solid #16A34A" : "1px solid #E8E8E8",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div className="mb-6 flex items-start justify-between">
        <motion.span
          animate={{ scale: hover ? 1.05 : 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
          }}
          aria-hidden="true"
        >
          <tile.Icon size={26} className="text-[#16A34A]" />
        </motion.span>
        <ArrowUpRight
          size={18}
          className={
            hover
              ? "text-[#16A34A] transition-colors"
              : "text-[#BBB] transition-colors"
          }
          aria-hidden="true"
        />
      </div>
      <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] md:text-[22px]">
        {tile.title}
      </h3>
      <p className="mt-2 text-[14.5px] leading-[1.55] text-[#444] md:text-[15px]">
        {tile.subtitle}
      </p>
      <span className="mt-auto pt-6 text-[13px] font-semibold text-[#16A34A] transition-colors group-hover:text-[#15803D]">
        See it →
      </span>
    </motion.button>
  );
}
