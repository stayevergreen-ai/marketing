"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: FADE_EASE },
  viewport: { once: true, margin: "-80px" },
} as const;

const moments = [
  {
    eyebrow: "Show me the formula.",
    headline: "Click any number. See exactly how it was computed.",
    caption: null as string | null,
    src: "/screenshots/01-methodology-reports.png",
    alt: "Customer Lifetime Value methodology modal",
    width: 1149,
    height: 1036,
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
  border: "1px solid #EAEAEA",
  boxShadow:
    "0 4px 12px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.06)",
};

function TreeMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <polygon points="32,8 21,24 43,24" fill="#4ADE80" />
      <polygon points="32,20 18,38 46,38" fill="#16A34A" />
      <polygon points="32,32 14,54 50,54" fill="#14532D" />
      <rect x="29" y="54" width="6" height="6" fill="#14532D" />
    </svg>
  );
}

function TreeDivider() {
  return (
    <div
      aria-hidden="true"
      className="my-32 flex items-center justify-center gap-6"
    >
      <div className="h-px max-w-32 flex-1 bg-[#EAEAEA]" />
      <TreeMark size={20} className="opacity-50" />
      <div className="h-px max-w-32 flex-1 bg-[#EAEAEA]" />
    </div>
  );
}

type ScreenshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function ScreenshotCard({ src, alt, width, height }: ScreenshotProps) {
  return (
    <motion.div
      {...fadeUp}
      className="overflow-hidden rounded-xl bg-white"
      style={cardChrome}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="block h-auto w-full"
      />
    </motion.div>
  );
}

function StickyImage({
  src,
  alt,
  progress,
  fadeIn,
  sizes,
}: {
  src: string;
  alt: string;
  progress: MotionValue<number>;
  fadeIn: boolean;
  sizes: string;
}) {
  const opacity = useTransform(
    progress,
    [0, 0.4, 0.6, 1],
    fadeIn ? [0, 0, 1, 1] : [1, 1, 0, 0]
  );

  return (
    <motion.div
      style={{
        opacity,
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "0.75rem",
        backgroundColor: "#FFFFFF",
        border: "1px solid #EAEAEA",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.06)",
      }}
    >
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

  return (
    <>
      <div
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: "180vh" }}
      >
        <div
          style={{
            position: "sticky",
            top: "8vh",
            height: "84vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              width: "100%",
              maxWidth: "42rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <StickyImage
              src="/screenshots/02a-forecast-accuracy-top.png"
              alt="Forecast accuracy modal — overview and per-period table"
              progress={scrollYProgress}
              fadeIn={false}
              sizes="(min-width: 1024px) 42rem, (min-width: 768px) 36rem, 100vw"
            />
            <StickyImage
              src="/screenshots/02b-forecast-accuracy-bottom.png"
              alt="Forecast accuracy modal — per-metric drill-down and snapshot detail"
              progress={scrollYProgress}
              fadeIn={true}
              sizes="(min-width: 1024px) 42rem, (min-width: 768px) 36rem, 100vw"
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
        />
        <ScreenshotCard
          src="/screenshots/02b-forecast-accuracy-bottom.png"
          alt="Forecast accuracy modal — per-metric drill-down and snapshot detail"
          width={1141}
          height={1064}
        />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: FADE_EASE }}
          className="flex items-center gap-2.5 pt-8 md:pt-10"
        >
          <TreeMark size={28} />
          <span className="text-[22px] font-extrabold leading-none tracking-[-0.03em] text-[#0A0A0A]">
            evergreen<span className="text-[#16A34A]">.</span>
          </span>
        </motion.header>

        <motion.section
          {...fadeUp}
          className="pb-20 pt-32 text-center md:pt-40"
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.10em] text-[#888]">
            AI as the foundation
          </p>
          <h2 className="mx-auto max-w-5xl text-[44px] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#0A0A0A] md:text-[72px] lg:text-[88px]">
            Every metric in Evergreen earns its place.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#666] md:text-[19px]">
            Click any number. See the formula, the inputs, the assumptions, the
            per-account breakdown. Every signal, every forecast, every flag —
            defensible by design, not by claim.
          </p>
        </motion.section>

        <section className="border-t border-[#EAEAEA] pb-32 pt-16">
          <div className="space-y-32">
            {moments.map((m) => (
              <motion.div
                key={m.eyebrow}
                {...fadeUp}
                className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
              >
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-24">
                    <p className="mb-5 text-[13px] uppercase tracking-[0.10em] text-[#888]">
                      {m.eyebrow}
                    </p>
                    <h3 className="mb-6 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] md:text-[32px] lg:text-[36px]">
                      {m.headline}
                    </h3>
                    {m.caption ? (
                      <p className="text-[16px] leading-[1.6] text-[#666]">
                        {m.caption}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <ScreenshotCard
                    src={m.src}
                    alt={m.alt}
                    width={m.width}
                    height={m.height}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <TreeDivider />

        <motion.section {...fadeUp} className="pb-12 pt-8 text-center">
          <p className="mb-8 text-[13px] uppercase tracking-[0.10em] text-[#888]">
            We grade ourselves
          </p>
          <h2 className="mx-auto max-w-4xl text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A] md:text-[52px] lg:text-[64px]">
            Most CS tools forecast and never look back. We publish our own
            accuracy.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.55] tracking-[-0.005em] text-[#666] md:text-[19px]">
            Per snapshot, per metric, per period — so you know exactly how much
            trust to place in next quarter's number based on how last quarter's
            held up.
          </p>
        </motion.section>

        <StickyPinForecastAccuracy />

        <motion.section {...fadeUp} className="py-16 text-center">
          <p className="mx-auto max-w-3xl text-[16px] leading-[1.6] text-[#666] md:text-[17px]">
            We grade ourselves on six metrics: NRR, GRR, Logo Retention,
            Expansion, ARR at Risk, and Save Rate. Trailing four quarters.
            Per-snapshot drill-down on every period. Configurable in Settings.
          </p>
        </motion.section>

        <TreeDivider />

        <motion.section {...fadeUp} className="pb-16 pt-8">
          <p className="mb-12 text-[13px] uppercase tracking-[0.10em] text-[#888]">
            The defensibility test
          </p>

          <div
            className="hidden overflow-hidden rounded-xl bg-white md:block"
            style={cardChrome}
          >
            <table className="w-full border-collapse">
              <thead className="bg-[#FAFAF9]">
                <tr>
                  <th className="px-6 py-5 text-left text-[13px] uppercase tracking-[0.10em] text-[#666]">
                    Question
                  </th>
                  <th
                    className="bg-[#F5F5F2] px-6 py-5 text-left"
                    style={{
                      borderLeft: "1px solid #EAEAEA",
                      borderRight: "1px solid #EAEAEA",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <TreeMark size={16} />
                      <span className="text-[13px] uppercase tracking-[0.10em] text-[#16A34A]">
                        Evergreen
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left text-[13px] uppercase tracking-[0.10em] text-[#666]">
                    Most CS tools
                  </th>
                  <th className="px-6 py-5 text-left text-[13px] uppercase tracking-[0.10em] text-[#666]">
                    AI-replacement tools
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.question}
                    className="group"
                    style={{
                      borderTop:
                        i === 0 ? "none" : "1px solid #EAEAEA",
                    }}
                  >
                    <td className="px-6 py-5 align-top text-[15px] text-[#0A0A0A] transition-colors duration-200 group-hover:bg-[rgba(74,222,128,0.03)]">
                      {row.question}
                    </td>
                    <td
                      className="bg-[#F5F5F2] px-6 py-5 align-top text-[15px] font-semibold text-[#0A0A0A]"
                      style={{
                        borderLeft: "1.5px solid #E5E5E0",
                        borderRight: "1.5px solid #E5E5E0",
                      }}
                    >
                      {row.evergreen}
                    </td>
                    <td className="px-6 py-5 align-top text-[15px] text-[#888] transition-colors duration-200 group-hover:bg-[rgba(74,222,128,0.03)]">
                      {row.legacy}
                    </td>
                    <td className="px-6 py-5 align-top text-[15px] text-[#888] transition-colors duration-200 group-hover:bg-[rgba(74,222,128,0.03)]">
                      {row.aiReplacement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {comparisonRows.map((row) => (
              <div
                key={row.question}
                className="rounded-xl bg-white p-6"
                style={cardChrome}
              >
                <p className="mb-5 text-[15px] font-bold text-[#0A0A0A]">
                  {row.question}
                </p>
                <div className="space-y-4">
                  <div
                    className="rounded-lg bg-[#F5F5F2] p-3"
                    style={{ border: "1.5px solid #E5E5E0" }}
                  >
                    <div className="mb-1 flex items-center gap-1.5">
                      <TreeMark size={12} />
                      <p className="text-[10px] uppercase tracking-[0.10em] text-[#16A34A]">
                        Evergreen
                      </p>
                    </div>
                    <p className="text-[15px] font-semibold text-[#0A0A0A]">
                      {row.evergreen}
                    </p>
                  </div>
                  <div className="px-1">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.10em] text-[#888]">
                      Most CS tools
                    </p>
                    <p className="text-[15px] text-[#888]">{row.legacy}</p>
                  </div>
                  <div className="px-1">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.10em] text-[#888]">
                      AI-replacement tools
                    </p>
                    <p className="text-[15px] text-[#888]">
                      {row.aiReplacement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="py-20">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="/methodology"
              initial={{ scale: 1, backgroundColor: "#0A0A0A" }}
              whileHover={{ scale: 1.01, backgroundColor: "#16A34A" }}
              transition={{ duration: 0.2, ease: FADE_EASE }}
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[15px] font-bold text-white"
            >
              See the full methodology
              <span aria-hidden="true">→</span>
            </motion.a>
            <a
              href="/demo"
              className="inline-flex items-center rounded-lg bg-transparent px-7 py-3.5 text-[15px] font-bold text-[#0A0A0A] transition-colors duration-200 hover:bg-[#F4F4F3]"
              style={{ border: "1px solid #EAEAEA" }}
            >
              Talk to the founder
            </a>
          </div>
        </motion.section>

        <div className="flex flex-col items-center gap-3 pb-24 pt-32 opacity-60">
          <TreeMark size={24} />
          <span className="text-xs uppercase tracking-[0.15em] text-[#888]">
            evergreen.
          </span>
        </div>
      </div>
    </main>
  );
}
