"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

// === ACTIVE VISUAL: Direction C — vertical "context queue" activity feed ===
// Why this concept: prior iterations (scattered phrases, overlapping cards)
// both felt decorative / stock-illustration-y. A vertical chronological feed
// reads as a literal CSM inbox — "this is the mess to mentally reconcile
// every morning." Linear/Notion design language. Premium through restraint.
// Two alternative concepts left as commented sketches at the bottom of this
// file for review.

type Fragment = {
  source: string;
  preview: string;
  timestamp: string;
};

const FRAGMENTS: Fragment[] = [
  {
    source: "Email",
    preview: "Re: Q3 renewal — pricing concern from Sarah Chen",
    timestamp: "3w ago",
  },
  {
    source: "Slack",
    preview: "Anyone got context on Acme's DPA escalation?",
    timestamp: "Yesterday",
  },
  {
    source: "Call",
    preview: "Tom Willis · QBR prep · 42 min · 8 action items",
    timestamp: "May 7",
  },
  {
    source: "CRM",
    preview: "Voltura Systems · Health 78 · ARR $480K · stale 6w",
    timestamp: "6w",
  },
  {
    source: "Notion",
    preview: "Q1 commitments doc · 200 active users by EoQ2",
    timestamp: "Mar 15",
  },
  {
    source: "QBR",
    preview: "Carryover: exec review w/ new CFO",
    timestamp: "Mar 15",
  },
  {
    source: "Ticket",
    preview: "Bridgewater · P1 sync issue · open 4d",
    timestamp: "4d",
  },
  {
    source: "Doc",
    preview: "Champion notes from Apr 21 sync · Module C interest",
    timestamp: "Apr 21",
  },
];

export default function PainSection() {
  return (
    <section className="py-20 md:py-24">
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
          <ContextQueue />
        </motion.div>
      </div>
    </section>
  );
}

function ContextQueue() {
  return (
    <div
      className="rounded-xl bg-white"
      style={{
        border: "1px solid #E8E8E8",
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.03), 0 12px 32px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex items-center justify-between border-b border-[#EAEAEA] px-5 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#888]">
          Devon&rsquo;s context queue
        </p>
        <span className="font-mono text-[10px] tabular-nums text-[#999]">
          8 fragments
        </span>
      </div>
      <ul className="flex flex-col">
        {FRAGMENTS.map((f, i) => (
          <li
            key={i}
            className="flex items-center gap-3 px-5 py-2.5"
            style={{
              borderTop: i === 0 ? "none" : "0.5px solid #F0F0F0",
            }}
          >
            <span className="w-14 shrink-0 text-[9.5px] font-bold uppercase tracking-[0.10em] text-[#888]">
              {f.source}
            </span>
            <span className="flex-1 truncate text-[12px] leading-[1.4] text-[#1F1F1F]">
              {f.preview}
            </span>
            <span className="shrink-0 font-mono text-[10px] tabular-nums text-[#999]">
              {f.timestamp}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-[#EAEAEA] bg-[#FAFAF9] px-5 py-2.5">
        <p className="text-center text-[10.5px] italic text-[#888]">
          Every morning. Across every account. By hand.
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
 * COMMENTED-OUT ALTERNATIVES (for review — pick one to swap in if preferred)
 * =========================================================================
 *
 * ALTERNATIVE 1 — Tabbed source switcher (Direction A)
 * Interactive tab strip at top: Email / Slack / Calls / Notion / CRM / QBR.
 * Each tab swaps the lower panel to show a stylized fragment from that
 * source. State-driven, not auto-rotating. Visitor scrubs through to see
 * "all these places context lives." More product-energy but also more
 * UI vocabulary — risk of feeling like a teaser product widget rather
 * than a feature illustration.
 *
 * Sketch:
 *   const [tab, setTab] = useState<Source>("email");
 *   <div className="rounded-xl bg-white" style={cardChrome}>
 *     <div className="flex border-b border-[#EAEAEA]">
 *       {SOURCES.map(s => (
 *         <button onClick={() => setTab(s)}
 *           className={tab === s ? "active-tab" : "inactive-tab"}>
 *           {s}
 *         </button>
 *       ))}
 *     </div>
 *     <div className="p-5">
 *       <FragmentDetail source={tab} />
 *     </div>
 *   </div>
 *
 * ALTERNATIVE 2 — "From this... to this" split-screen (Direction E)
 * Left half: scattered fragments (current overlapping-cards iteration).
 * Right half: same fragments, organized into a clean column with a
 * single green check at top labeled "Reconciled".
 * Caption between the two halves: "From this... to this."
 * Conveys the transformation Evergreen performs visually. Strongest
 * narrative impact but visually busiest — risk of looking like a
 * before/after marketing template.
 *
 * Sketch:
 *   <div className="grid grid-cols-2 gap-6">
 *     <div className="relative h-[420px]">
 *       {scattered overlapping cards (iteration 2 visual)}
 *     </div>
 *     <div className="flex flex-col">
 *       <div className="header">✓ Reconciled by Evergreen</div>
 *       {ordered list of same fragments}
 *     </div>
 *   </div>
 *
 * ========================================================================= */
