"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

type DefensibilityCard = {
  eyebrow: string;
  question: string;
  evergreen: string;
  contrast: string;
};

const CARDS: DefensibilityCard[] = [
  {
    eyebrow: "Metrics",
    question: "Is this number defensible to a CFO?",
    evergreen:
      "Every metric in Evergreen carries its formula with it. Click. Read. Audit. Change the assumption. Watch the number recompute.",
    contrast:
      "The old guard hides methodology in documentation. The new guard hides it in the model.",
  },
  {
    eyebrow: "Signals",
    question: "Show me the signals that drove this score.",
    evergreen:
      "Health is 5 weighted components. Click any component. Trace to source signals — every email, ticket, meeting note. Adjust the weights. Watch the score move.",
    contrast:
      "The old guard overcomplicates. The new guard just asks for your trust.",
  },
  {
    eyebrow: "AI decisions",
    question: "Can I see the AI's reasoning?",
    evergreen:
      "AI decisions in Evergreen are transparent by design. Click the recommendation. See the alternatives. Override with one click. The AI learns from your correction — the human stays in the loop.",
    contrast:
      "The old guard automates with rules. The new guard automates around humans. Neither shows the override.",
  },
  {
    eyebrow: "Commitment tracking",
    question: "Are we accountable to what we promised?",
    evergreen:
      "Every QBR commitment is captured, tracked, and surfaced. Not in someone's notes — in the platform. The next QBR opens with what you said you'd do, and what actually happened.",
    contrast:
      "Commitments lost in notes are commitments lost to memory. Evergreen turns them into structure.",
  },
];

export default function DefensibilityCards() {
  return (
    <section className="py-24">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-12 text-center">
          <p className="mb-6 text-[13px] uppercase tracking-[0.10em] text-[#666]">
            The defensibility test
          </p>
          <h3 className="mx-auto max-w-3xl text-balance text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0A0A0A] md:text-[36px]">
            Every claim in Evergreen has a defensible answer.
          </h3>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {CARDS.map((card) => (
            <motion.div
              key={card.eyebrow}
              initial={false}
              whileHover={{
                y: -2,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="rounded-2xl bg-white p-7 md:p-9"
              style={{
                border: "1px solid #EAEAEA",
                borderLeft: "3px solid #16A34A",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
              }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.10em] text-[#888]">
                {card.eyebrow}
              </p>
              <h4 className="mt-3 text-balance text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0A0A0A] md:text-[24px]">
                {card.question}
              </h4>
              <p className="mt-5 text-[16px] font-medium leading-[1.55] text-[#1F1F1F] md:text-[17px]">
                {card.evergreen}
              </p>
              <div className="mt-6 border-t border-[#EAEAEA] pt-4">
                <p className="text-[12px] leading-[1.55] text-[#888]">
                  {card.contrast}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
