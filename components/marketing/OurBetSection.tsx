"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

export default function OurBetSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:px-12 md:py-20">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#6EE7B7]">
          Our bet
        </p>

        <h2 className="text-balance text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-[#ECFDF5] lg:text-6xl">
          We bet on the{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              color: "#4ADE80",
              fontWeight: 700,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-20px",
                background:
                  "radial-gradient(circle, rgba(74,222,128,0.20) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: -1,
              }}
            />
            human
          </span>
          .
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-balance text-base leading-[1.5] tracking-[-0.005em] text-[#6EE7B7] lg:text-lg">
          AI is the operator&rsquo;s leverage — not their replacement.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 text-left md:mt-16 md:grid-cols-2">
          <div className="rounded-xl border border-[rgba(255,255,255,0.10)] p-8">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[rgba(255,255,255,0.50)]">
              One path
            </p>
            <p className="mb-3 text-[22px] font-medium leading-snug text-[rgba(255,255,255,0.85)]">
              AI replaces the operator.
            </p>
            <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">
              Agents own the work. Humans review the output.
            </p>
          </div>

          <div
            className="rounded-xl border border-[rgba(74,222,128,0.30)] p-8"
            style={{ background: "rgba(74, 222, 128, 0.04)" }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#4ADE80]">
              Our path
            </p>
            <p className="mb-3 text-[22px] font-medium leading-snug text-[#ECFDF5]">
              AI handles the cognitive load.
            </p>
            <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.70)]">
              The operator stays in charge. Their leverage compounds.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
