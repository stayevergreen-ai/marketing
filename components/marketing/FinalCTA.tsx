"use client";

import { motion } from "framer-motion";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const CALENDLY_URL = "https://calendly.com/matt-stayevergreen/30min";

export default function FinalCTA() {
  return (
    <section id="demo" className="py-16 md:py-20">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.18em] text-[#666]">
          Ready?
        </p>
        <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] sm:text-4xl md:text-5xl lg:text-6xl">
          Make your CSMs unbeatable.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#1F1F1F] md:text-[19px]">
          30 minutes. We&apos;ll walk through what Evergreen does, how it fits
          your team, and whether it makes sense for where you are.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center justify-center rounded-lg bg-[#16A34A] px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:scale-[1.01] hover:bg-[#15803D]"
        >
          Book a demo
        </a>
      </motion.div>
    </section>
  );
}
