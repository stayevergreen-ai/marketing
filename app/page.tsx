import Image from "next/image";

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
};

function ScreenshotCard({ src, alt, width, height }: ScreenshotProps) {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full max-w-full object-contain"
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F4F4]">
      <section className="px-6 py-32 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#16A34A]">
              AI as the foundation, not a feature.
            </p>
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-black md:text-5xl">
              Every metric in Evergreen earns its place.
            </h2>
            <p className="max-w-3xl text-lg font-normal leading-relaxed text-[#525252] md:text-xl">
              Click any number. See the formula, the inputs, the assumptions, the per-account breakdown. Every signal, every forecast, every flag — defensible by design, not by claim.
            </p>
          </div>

          <div className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-2">
            <ScreenshotCard
              src="/screenshots/01-methodology-reports.png"
              alt="Customer Lifetime Value methodology modal"
              width={1149}
              height={1036}
            />
            <ScreenshotCard
              src="/screenshots/03-forecast-nrr-modal.png"
              alt="Net Revenue Retention forecast detail"
              width={1002}
              height={1204}
            />
            <ScreenshotCard
              src="/screenshots/03b-coverage-routing-list.png"
              alt="Coverage routing AI suggestions"
              width={1084}
              height={1120}
            />
            <ScreenshotCard
              src="/screenshots/04-health-breakdown.png"
              alt="Account health score breakdown"
              width={1568}
              height={696}
            />
          </div>

          <div className="mb-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#16A34A]">
              We grade ourselves.
            </p>
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-black md:text-5xl">
              Most CS tools forecast and never look back. We publish our own accuracy.
            </h2>
            <p className="max-w-3xl text-lg font-normal leading-relaxed text-[#525252] md:text-xl">
              Per snapshot, per metric, per period — so you know exactly how much trust to place in next quarter's number based on how last quarter's held up.
            </p>
          </div>

          <div className="mx-auto mb-32 max-w-4xl">
            <ScreenshotCard
              src="/screenshots/02-forecast-accuracy.png"
              alt="Forecast accuracy modal with per-period drill-down"
              width={502}
              height={1044}
            />
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="hidden overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white md:block">
              <table className="w-full border-collapse">
                <thead className="bg-[#F1EFE8]">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-black">
                      Question
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-black">
                      Evergreen
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-black">
                      Most CS tools
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-black">
                      AI-replacement tools
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.question} className="border-t border-[#E8E8E8]">
                      <td className="px-6 py-5 align-top text-base text-black">
                        {row.question}
                      </td>
                      <td className="bg-[#F0FDF4] px-6 py-5 align-top text-base font-medium text-[#16A34A]">
                        {row.evergreen}
                      </td>
                      <td className="px-6 py-5 align-top text-base text-gray-500">
                        {row.legacy}
                      </td>
                      <td className="px-6 py-5 align-top text-base text-gray-500">
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
                  className="rounded-2xl border border-[#E8E8E8] bg-white p-6"
                >
                  <p className="mb-4 text-base font-semibold text-black">
                    {row.question}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#16A34A]">
                        Evergreen
                      </p>
                      <p className="text-base font-medium text-black">
                        {row.evergreen}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Most CS tools
                      </p>
                      <p className="text-base text-gray-500">{row.legacy}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        AI-replacement tools
                      </p>
                      <p className="text-base text-gray-500">
                        {row.aiReplacement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="/methodology"
              className="inline-flex items-center gap-2 rounded-lg border border-black bg-transparent px-6 py-3 text-base font-semibold text-black transition-colors hover:bg-black hover:text-white"
            >
              See the full methodology
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
