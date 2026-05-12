"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const moments = [
  {
    eyebrow: "Show me the formula.",
    headline: "Click any number. See exactly how it was computed.",
    caption: null as string | null,
    src: "/screenshots/01-methodology-reports.png",
    alt: "Customer Lifetime Value methodology modal",
    width: 1149,
    height: 1036,
    badge: "formula",
  },
  {
    eyebrow: "Show me the assumptions.",
    headline:
      "Every threshold, weight, and cap is configurable — and visible.",
    caption:
      "Stretch upside scenarios show what's possible if signals close as expected.",
    src: "/screenshots/03-forecast-nrr-modal.png",
    alt: "Net Revenue Retention forecast detail",
    width: 1002,
    height: 1204,
    badge: "assumptions",
  },
  {
    eyebrow: "Show me the AI's reasoning.",
    headline: "Every CSM evaluated. Every projection shown.",
    caption:
      "When the AI suggests coverage, the lattice behind the choice is fully visible.",
    src: "/screenshots/03b-coverage-routing-list.png",
    alt: "Coverage routing AI suggestions",
    width: 1084,
    height: 1120,
    badge: "reasoning",
  },
  {
    eyebrow: "Show me what's pushing the score.",
    headline: "Five components. Weighted. Traceable.",
    caption:
      "Every health number traces back to engagement, sentiment, behavior, business signals, and renewal proximity.",
    src: "/screenshots/04-health-breakdown.png",
    alt: "Account health score breakdown",
    width: 1568,
    height: 696,
    badge: "components",
  },
];

const comparisonRows = [
  {
    question: "Show me the formula behind any metric",
    evergreen: "One click on any tile",
    legacy: "Help docs",
    aiReplacement: "Black-box",
  },
  {
    question: "How accurate were last quarter's forecasts vs actual?",
    evergreen: "Per-snapshot drill-down, per metric, per period",
    legacy: "Manual tracking in spreadsheets",
    aiReplacement: "Claimed, not proven",
  },
  {
    question: "Why did the AI pick that CSM for coverage?",
    evergreen: "Every candidate evaluated, with projection",
    legacy: "Rules-based or hidden",
    aiReplacement: "Doesn't ask the human",
  },
  {
    question: "What pushed this account into the at-risk band?",
    evergreen: "5-component health breakdown with weights",
    legacy: "Aggregate score only",
    aiReplacement: "Black-box",
  },
];

const cardChrome = {
  borderTop: "2px solid #4ADE80",
  borderLeft: "0.5px solid rgba(255, 255, 255, 0.1)",
  borderRight: "0.5px solid rgba(255, 255, 255, 0.1)",
  borderBottom: "0.5px solid rgba(255, 255, 255, 0.1)",
  boxShadow:
    "0 30px 80px rgba(0, 0, 0, 0.6), 0 12px 24px rgba(0, 0, 0, 0.3), 0 0 80px rgba(74, 222, 128, 0.08), 0 0 0 0.5px rgba(74, 222, 128, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.55)",
};

function PulsingDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[6px] w-[6px] rounded-full bg-[#4ADE80]"
      style={{ animation: "pulse-glow 2.4s ease-in-out infinite" }}
    />
  );
}

function TreeMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <polygon points="32,8 21,24 43,24" fill="#4ADE80" />
      <polygon points="32,20 18,38 46,38" fill="#16A34A" />
      <polygon points="32,32 14,54 50,54" fill="#14532D" />
      <rect x="29" y="54" width="6" height="6" fill="#14532D" />
    </svg>
  );
}

type ScreenshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  badge: string;
};

function ScreenshotCard({ src, alt, width, height, badge }: ScreenshotProps) {
  return (
    <div className="group relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-[32px] opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.10) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 4, rotateY: -1 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 2, rotateY: -1 }}
        whileHover={{ rotateX: 0, rotateY: 0, scale: 1.01 }}
        transition={{ duration: 0.7, ease: FADE_EASE }}
        viewport={{ once: true, margin: "-100px" }}
        style={{ transformPerspective: 1500, ...cardChrome }}
        className="relative overflow-hidden rounded-xl bg-white"
      >
        <span
          className="absolute right-3 top-3 z-10 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#16A34A] backdrop-blur-sm"
          style={{ backgroundColor: "rgba(22, 163, 74, 0.08)" }}
        >
          {badge}
        </span>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block h-auto w-full"
        />
      </motion.div>
    </div>
  );
}

type StickyCardProps = {
  src: string;
  alt: string;
  badge: string;
  opacity: ReturnType<typeof useTransform<number, number>>;
  sizes: string;
};

function StickyCard({ src, alt, badge, opacity, sizes }: StickyCardProps) {
  return (
    <motion.div
      style={{
        opacity,
        transformPerspective: 1500,
        rotateX: 2,
        rotateY: -1,
        ...cardChrome,
      }}
      whileHover={{ rotateX: 0, rotateY: 0, scale: 1.01 }}
      transition={{ duration: 0.4, ease: FADE_EASE }}
      className="absolute inset-0 overflow-hidden rounded-xl bg-white"
    >
      <span
        className="absolute right-3 top-3 z-10 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#16A34A] backdrop-blur-sm"
        style={{ backgroundColor: "rgba(22, 163, 74, 0.08)" }}
      >
        {badge}
      </span>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-contain"
      />
    </motion.div>
  );
}

function StickyPinForecastAccuracy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const opacityTop = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [1, 1, 0, 0]
  );
  const opacityBottom = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 0, 1, 1]
  );

  return (
    <>
      <div
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: "180vh" }}
      >
        <div
          className="sticky flex items-center justify-center"
          style={{ top: "10vh", height: "80vh" }}
        >
          <div className="group relative mx-auto aspect-square w-full max-w-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-12 rounded-[40px] opacity-80 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.12) 0%, transparent 70%)",
              }}
            />
            <StickyCard
              src="/screenshots/02a-forecast-accuracy-top.png"
              alt="Forecast accuracy modal — overview and per-period table"
              badge="accuracy"
              opacity={opacityTop}
              sizes="(min-width: 768px) 36rem, 100vw"
            />
            <StickyCard
              src="/screenshots/02b-forecast-accuracy-bottom.png"
              alt="Forecast accuracy modal — per-metric drill-down and snapshot detail"
              badge="accuracy"
              opacity={opacityBottom}
              sizes="(min-width: 768px) 36rem, 100vw"
            />
          </div>
        </div>
      </div>

      <div className="space-y-8 md:hidden">
        <ScreenshotCard
          src="/screenshots/02a-forecast-accuracy-top.png"
          alt="Forecast accuracy modal — overview and per-period table"
          width={1092}
          height={1092}
          badge="accuracy"
        />
        <ScreenshotCard
          src="/screenshots/02b-forecast-accuracy-bottom.png"
          alt="Forecast accuracy modal — per-metric drill-down and snapshot detail"
          width={1141}
          height={1064}
          badge="accuracy"
        />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #1A1A1C 0%, #0D0D0E 60%, #050506 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          top: "8%",
          right: "-100px",
          background:
            "radial-gradient(circle, rgba(74, 222, 128, 0.10) 0%, transparent 70%)",
          animation: "drift-slow 38s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[700px] w-[700px] rounded-full blur-3xl"
        style={{
          top: "42%",
          left: "-120px",
          background:
            "radial-gradient(circle, rgba(22, 163, 74, 0.08) 0%, transparent 70%)",
          animation:
            "drift-slow-reverse 45s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[500px] w-[800px] rounded-full blur-3xl"
        style={{
          bottom: "5%",
          left: "calc(50% - 400px)",
          background:
            "radial-gradient(ellipse, rgba(74, 222, 128, 0.06) 0%, transparent 70%)",
          animation: "drift-slow-xy 32s ease-in-out infinite alternate",
        }}
      />

      <section className="relative px-6 py-32 md:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.30) 50%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.30) 50%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[30%] h-[40%] w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(74, 222, 128, 0.65) 50%, transparent 100%)",
            boxShadow: "0 0 24px rgba(74, 222, 128, 0.4)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: FADE_EASE }}
            className="mb-16 flex items-center gap-2.5"
          >
            <TreeMark size={26} />
            <span className="text-[22px] font-extrabold leading-none tracking-[-0.03em] text-white">
              evergreen<span className="text-[#4ADE80]">.</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-24 max-w-3xl"
          >
            <p className="mb-6 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4ADE80]">
              <PulsingDot />
              AI as the foundation.
            </p>
            <h2 className="mb-7 text-[32px] font-semibold leading-[1.04] tracking-[-0.035em] text-white md:text-[44px] lg:text-[52px]">
              Every metric in Evergreen earns its place.
            </h2>
            <p className="text-[17px] font-normal leading-[1.6] tracking-[-0.011em] text-[#9CA3AB] md:text-[18px]">
              Click any number. See the formula, the inputs, the assumptions,
              the per-account breakdown. Every signal, every forecast, every
              flag — defensible by design, not by claim.
            </p>
          </motion.div>

          <div className="mb-32 space-y-24">
            {moments.map((m, i) => (
              <motion.div
                key={m.badge}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: FADE_EASE,
                  delay: i * 0.12,
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-[720px]"
              >
                <p className="mb-4 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#16A34A]">
                  <PulsingDot />
                  {m.eyebrow}
                </p>
                <h3 className="mb-4 text-[22px] font-medium leading-[1.1] tracking-[-0.025em] text-white md:text-[28px] lg:text-[32px]">
                  {m.headline}
                </h3>
                {m.caption ? (
                  <p className="mb-10 max-w-[640px] text-[15px] font-normal leading-[1.55] text-[#9CA3AB]">
                    {m.caption}
                  </p>
                ) : (
                  <div className="mb-10" />
                )}
                <ScreenshotCard {...m} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 max-w-3xl"
          >
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4ADE80]">
              We grade ourselves.
            </p>
            <h2 className="mb-7 text-[32px] font-semibold leading-[1.04] tracking-[-0.035em] text-white md:text-[44px] lg:text-[52px]">
              Most CS tools forecast and never look back. We publish our own
              accuracy.
            </h2>
            <p className="text-[17px] font-normal leading-[1.6] tracking-[-0.011em] text-[#9CA3AB] md:text-[18px]">
              Per snapshot, per metric, per period — so you know exactly how
              much trust to place in next quarter's number based on how last
              quarter's held up.
            </p>
          </motion.div>

          <StickyPinForecastAccuracy />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mb-32 mt-16 max-w-3xl text-[17px] font-normal leading-[1.6] text-[#9CA3AB]"
          >
            We grade ourselves on six metrics: NRR, GRR, Logo Retention,
            Expansion, ARR at Risk, and Save Rate. Trailing four quarters.
            Per-snapshot drill-down on every period. Configurable in Settings.
          </motion.p>

          <div className="mx-auto mb-20 max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: FADE_EASE }}
              viewport={{ once: true, margin: "-80px" }}
              className="mb-8 text-[11px] font-medium uppercase tracking-[0.18em] text-[#16A34A]"
            >
              The defensibility test.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: FADE_EASE }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-12 rounded-[40px] blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(74, 222, 128, 0.08) 0%, transparent 70%)",
                }}
              />
              <div
                className="relative rounded-[13px] p-px"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(74, 222, 128, 0.25) 0%, rgba(22, 163, 74, 0.10) 100%)",
                }}
              >
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #1A1F23 0%, #14181B 100%)",
                    border: "0.5px solid rgba(255, 255, 255, 0.12)",
                    boxShadow:
                      "0 30px 60px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <table className="hidden w-full border-collapse md:table">
                    <thead
                      style={{
                        background:
                          "linear-gradient(180deg, #20272D 0%, #1A1F23 100%)",
                        borderBottom: "1px solid rgba(74, 222, 128, 0.20)",
                      }}
                    >
                      <tr>
                        <th className="px-6 py-5 text-left text-[13px] font-medium text-white">
                          Question
                        </th>
                        <th className="px-6 py-5 text-left text-[13px] font-medium text-white">
                          Evergreen
                        </th>
                        <th className="px-6 py-5 text-left text-[13px] font-medium text-white">
                          Most CS tools
                        </th>
                        <th className="px-6 py-5 text-left text-[13px] font-medium text-white">
                          AI-replacement tools
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, i) => (
                        <motion.tr
                          key={row.question}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: FADE_EASE,
                            delay: i * 0.06,
                          }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="transition-colors duration-200 hover:bg-[rgba(74,222,128,0.03)]"
                          style={{
                            borderTop:
                              i === 0
                                ? "none"
                                : "0.5px solid rgba(255, 255, 255, 0.06)",
                          }}
                        >
                          <td className="px-6 py-5 align-top text-[15px] text-white">
                            {row.question}
                          </td>
                          <td
                            className="px-6 py-5 align-top text-[15px] font-medium text-white"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(22, 163, 74, 0.10) 0%, rgba(22, 163, 74, 0.06) 100%)",
                              borderLeft:
                                "1px solid rgba(22, 163, 74, 0.20)",
                              borderRight:
                                "1px solid rgba(22, 163, 74, 0.20)",
                            }}
                          >
                            {row.evergreen}
                          </td>
                          <td className="px-6 py-5 align-top text-[15px] text-[#6B7280]">
                            {row.legacy}
                          </td>
                          <td className="px-6 py-5 align-top text-[15px] text-[#6B7280]">
                            {row.aiReplacement}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                    {comparisonRows.map((row, i) => (
                      <motion.div
                        key={row.question}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: FADE_EASE,
                          delay: i * 0.06,
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="rounded-xl p-5"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "0.5px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <p className="mb-5 text-[15px] font-medium text-white">
                          {row.question}
                        </p>
                        <div className="space-y-4">
                          <div
                            className="rounded-lg px-3 py-2"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(22, 163, 74, 0.10) 0%, rgba(22, 163, 74, 0.06) 100%)",
                              border:
                                "1px solid rgba(22, 163, 74, 0.20)",
                            }}
                          >
                            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#16A34A]">
                              Evergreen
                            </p>
                            <p className="text-[15px] font-medium text-white">
                              {row.evergreen}
                            </p>
                          </div>
                          <div className="px-1">
                            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
                              Most CS tools
                            </p>
                            <p className="text-[15px] text-[#6B7280]">
                              {row.legacy}
                            </p>
                          </div>
                          <div className="px-1">
                            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
                              AI-replacement tools
                            </p>
                            <p className="text-[15px] text-[#6B7280]">
                              {row.aiReplacement}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: FADE_EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-5"
          >
            <motion.a
              href="/methodology"
              initial={{
                y: 0,
                scale: 1,
                boxShadow:
                  "0 0 48px rgba(74, 222, 128, 0.40), 0 0 24px rgba(74, 222, 128, 0.30), 0 4px 8px rgba(74, 222, 128, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.30)",
              }}
              whileHover={{
                y: -1,
                scale: 1.02,
                boxShadow:
                  "0 0 64px rgba(74, 222, 128, 0.50), 0 0 32px rgba(74, 222, 128, 0.40), 0 4px 12px rgba(74, 222, 128, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.40)",
              }}
              transition={{ duration: 0.25, ease: FADE_EASE }}
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[15px] font-medium"
              style={{
                background:
                  "linear-gradient(180deg, #4ADE80 0%, #22C55E 100%)",
                color: "#050506",
                border: "0.5px solid rgba(255, 255, 255, 0.20)",
              }}
            >
              See the full methodology
              <span aria-hidden="true">→</span>
            </motion.a>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg bg-transparent px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/[0.04]"
              style={{ border: "0.5px solid rgba(255, 255, 255, 0.20)" }}
            >
              Talk to the founder
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
