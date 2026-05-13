"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

export default function OurBetSection() {
  return (
    <section className="py-24 md:py-28">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="mb-10 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
          Our bet
        </p>

        <h2 className="text-balance text-[40px] font-bold leading-[1.0] tracking-[-0.035em] text-[#0A0A0A] sm:text-[52px] md:text-[64px] lg:text-[72px]">
          We bet on the human.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-balance text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#16A34A] sm:text-[24px] md:text-[28px] lg:text-[32px]">
          AI is the operator&rsquo;s leverage — not their replacement.
        </p>

        <div className="mx-auto mt-14 flex max-w-2xl flex-col gap-3 text-[16px] leading-[1.65] text-[#1F1F1F] md:text-[17px]">
          <p>
            The AI handles the cognitive load. Your CSMs do higher-leverage
            work, faster.
          </p>
          <p>Your best people get more accounts, not fewer.</p>
          <p>
            The CSM stays in charge. The AI learns from every interaction.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
