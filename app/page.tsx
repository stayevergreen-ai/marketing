"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import MorningQueue from "../components/marketing/MorningQueue";
import Pricing from "../components/marketing/Pricing";
import FinalCTA from "../components/marketing/FinalCTA";
import Nav from "../components/marketing/Nav";
import PainSection from "../components/marketing/PainSection";
import OurBetSection from "../components/marketing/OurBetSection";
import HighlightReel from "../components/marketing/HighlightReel";
import Footer from "../components/marketing/Footer";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  useEffect(() => {
    const handler = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", handler);
    return () => window.removeEventListener("pageshow", handler);
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16 text-[#ECFDF5]">
        <section
          id="product"
          className="relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(16, 185, 129, 0.10) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: FADE_EASE }}
                className="lg:col-span-6"
              >
                <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#6EE7B7]">
                  The operational intelligence layer for CS
                </p>
                <h1 className="mt-5 text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-[#ECFDF5] sm:text-[48px] lg:text-[60px]">
                  Built to make your CSMs unbeatable.
                </h1>
                <p className="mt-6 max-w-md text-[18px] font-normal leading-[1.6] text-[rgba(255,255,255,0.70)]">
                  The operational intelligence layer for CS — leverage for
                  your team, confidence for your board.
                </p>
                <motion.a
                  href="https://calendly.com/matt-stayevergreen/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: FADE_EASE }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[#0A0A0A] transition-colors duration-200 hover:bg-[#ECFDF5]"
                >
                  Book a demo
                  <span aria-hidden="true">→</span>
                </motion.a>
              </motion.div>

              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: FADE_EASE }}
                className="overflow-hidden rounded-xl bg-white lg:col-span-6"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.08)",
                }}
              >
                <MorningQueue />
              </motion.div>
            </div>
          </div>
        </section>

        <PainSection />

        <OurBetSection />

        <HighlightReel />

        <section
          id="methodology"
          className="relative overflow-hidden"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: FADE_EASE }}
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-5"
              >
                <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#6EE7B7]">
                  The defensibility test
                </p>
                <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#ECFDF5] lg:text-5xl">
                  Every claim has a defensible answer.
                </h2>
                <p className="mt-6 text-[18px] leading-[1.6] tracking-[-0.005em] text-[rgba(255,255,255,0.70)]">
                  Click any number in Evergreen. See the formula, the inputs,
                  the assumptions.
                </p>
                <p className="mt-8 text-[16px] font-medium leading-[1.5] text-[#ECFDF5] lg:text-[18px]">
                  Defensible by design, not by claim.
                </p>
              </motion.div>

              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: FADE_EASE }}
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-7"
              >
                <div
                  className="rounded-2xl bg-white p-8 lg:p-10"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#16A34A]">
                    Forecast accuracy
                  </p>
                  <p className="mt-2 text-6xl font-medium leading-none tracking-[-0.03em] text-black lg:text-7xl">
                    93.8%
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Trailing 4 closed quarters · Customer Success Team scope
                  </p>
                  <div className="mt-6 rounded-md bg-[#FAFAFA] p-4 font-mono text-sm text-gray-800">
                    accuracy = 1 − |forecast − actual| ÷ actual
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-[rgba(0,0,0,0.10)] bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[rgba(22,163,74,0.40)] hover:bg-gray-50"
                    >
                      Inputs →
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-[rgba(0,0,0,0.10)] bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[rgba(22,163,74,0.40)] hover:bg-gray-50"
                    >
                      Assumptions →
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-[rgba(0,0,0,0.10)] bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[rgba(22,163,74,0.40)] hover:bg-gray-50"
                    >
                      Snapshot history →
                    </button>
                  </div>
                  <p className="mt-6 text-sm leading-[1.6] text-gray-600">
                    Click any number in Evergreen. See everything that built
                    it.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Pricing />

        <FinalCTA />

        <Footer />
      </main>
    </>
  );
}
