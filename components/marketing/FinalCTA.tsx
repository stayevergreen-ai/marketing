"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const CALENDLY_URL = "https://calendly.com/matt-stayevergreen/30min";

export default function FinalCTA() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden px-6 py-12 md:px-12 md:py-14"
    >
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#34D399]">
          Ready?
        </p>
        <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[#ECFDF5] sm:text-4xl md:text-5xl lg:text-6xl">
          Make your CSMs unbeatable.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[rgba(255,255,255,0.70)] md:text-[19px]">
          30 minutes. We&apos;ll walk through what Evergreen does, how it fits
          your team, and whether it makes sense for where you are.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0A0A0A] transition-all duration-200 hover:scale-[1.02] hover:bg-[#ECFDF5]"
        >
          Book a demo
        </a>
      </motion.div>
    </section>
  );
}
