import Image from "next/image";

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

type ScreenshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  badge: string;
};

function ScreenshotCard({ src, alt, width, height, badge }: ScreenshotProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white"
      style={{
        borderTop: "2px solid #4ADE80",
        borderLeft: "0.5px solid rgba(255, 255, 255, 0.1)",
        borderRight: "0.5px solid rgba(255, 255, 255, 0.1)",
        borderBottom: "0.5px solid rgba(255, 255, 255, 0.1)",
        boxShadow:
          "0 30px 80px rgba(0, 0, 0, 0.6), 0 0 80px rgba(74, 222, 128, 0.06), 0 0 0 0.5px rgba(74, 222, 128, 0.15)",
      }}
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
    </div>
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
        className="pointer-events-none absolute left-1/2 top-[18%] h-[640px] w-[640px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(22, 163, 74, 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[58%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(74, 222, 128, 0.05) 0%, transparent 70%)",
        }}
      />

      <section className="relative px-6 py-32 md:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.18) 50%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.18) 50%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[30%] h-[40%] w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(74, 222, 128, 0.55) 50%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-16 flex items-center gap-2.5">
            <TreeMark size={26} />
            <span className="text-[22px] font-extrabold leading-none tracking-[-0.03em] text-white">
              evergreen<span className="text-[#4ADE80]">.</span>
            </span>
          </div>

          <div className="mb-24 max-w-3xl">
            <p className="mb-6 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4ADE80]">
              <span
                aria-hidden="true"
                className="inline-block h-[6px] w-[6px] rounded-full bg-[#4ADE80]"
                style={{ animation: "pulse-glow 2.4s ease-in-out infinite" }}
              />
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
          </div>

          <div className="mb-32 space-y-24">
            {moments.map((m) => (
              <div key={m.badge} className="max-w-[720px]">
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#16A34A]">
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
              </div>
            ))}
          </div>

          <div className="mb-12 max-w-3xl">
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
          </div>
          <div className="mx-auto mb-32 max-w-4xl">
            <ScreenshotCard
              src="/screenshots/02-forecast-accuracy.png"
              alt="Forecast accuracy modal with per-period drill-down"
              width={502}
              height={1044}
              badge="accuracy"
            />
          </div>

          <div className="mx-auto mb-20 max-w-5xl">
            <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.18em] text-[#16A34A]">
              The defensibility test.
            </p>

            <div
              className="hidden overflow-hidden rounded-xl md:block"
              style={{
                backgroundColor: "#14181B",
                border: "0.5px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <table className="w-full border-collapse">
                <thead style={{ backgroundColor: "#1A1F23" }}>
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
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.question}
                      style={{
                        borderTop: "0.5px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <td className="px-6 py-5 align-top text-[15px] text-white">
                        {row.question}
                      </td>
                      <td
                        className="px-6 py-5 align-top text-[15px] font-medium text-white"
                        style={{ backgroundColor: "rgba(22, 163, 74, 0.04)" }}
                      >
                        {row.evergreen}
                      </td>
                      <td className="px-6 py-5 align-top text-[15px] text-[#9CA3AB]">
                        {row.legacy}
                      </td>
                      <td className="px-6 py-5 align-top text-[15px] text-[#9CA3AB]">
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
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: "#14181B",
                    border: "0.5px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <p className="mb-5 text-[15px] font-medium text-white">
                    {row.question}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#16A34A]">
                        Evergreen
                      </p>
                      <p className="text-[15px] font-medium text-white">
                        {row.evergreen}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
                        Most CS tools
                      </p>
                      <p className="text-[15px] text-[#9CA3AB]">{row.legacy}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
                        AI-replacement tools
                      </p>
                      <p className="text-[15px] text-[#9CA3AB]">
                        {row.aiReplacement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-5">
            <a
              href="/methodology"
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[15px] font-medium transition-all duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: "#4ADE80",
                color: "#050506",
                boxShadow:
                  "0 0 32px rgba(74, 222, 128, 0.3), 0 4px 16px rgba(74, 222, 128, 0.2)",
              }}
            >
              See the full methodology
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg bg-transparent px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/[0.04]"
              style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
            >
              Talk to the founder
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
