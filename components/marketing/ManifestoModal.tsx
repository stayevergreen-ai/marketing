"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const manifesto = {
  eyebrow: "Our manifesto",
  openingLine:
    "We're living through the largest workforce shift since the industrial revolution.",
  paragraph1Rest:
    "Every week, another company announces it's replacing a department with AI. Every major AI company is racing toward the same destination: software that doesn't need humans to run it. The customer success industry is no exception.",
  paragraph2:
    "Two kinds of products are competing for your customer success budget. One can't keep up. The other is chasing the wrong destination. The first was built before AI, on architectures that demand integrations, implementation cycles, and dedicated admins to function. They can bolt AI on, but they can't out-iterate companies built around it — and the buyers who could never afford their stack are still locked out. The second is honest about what they're building: customer success without customer success managers. AI doing 99% of the CSM's job today. So the board can sign off on 100% tomorrow. Their honesty is the warning, not the comfort.",
  paragraph3Before:
    "Evergreen exists because someone had to build the third option. AI is the most powerful tool customer success has ever seen, and we were built around that conviction — but with a line we will never cross.",
  pullQuote: "AI does not replace your CSMs. Ever.",
  paragraph3After:
    "Customer success isn't a function that automates. It's a function that compounds — through trust, context, and judgment only humans accumulate. Every feature in Evergreen makes a CSM more capable. None make one optional.",
  paragraph4:
    "The next decade of customer success will be defined by who used AI to amplify humans, and who used it to remove them. The companies that bet on AI replacement will spend years rebuilding the trust they automated away. The ones that bet on amplifying their teams will be the ones their customers stay with. We built Evergreen for the teams that already know which side they're on. We're going to be on the right side of history. So is every team that comes with us.",
};

export default function ManifestoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="manifesto-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm sm:p-6"
          style={{ background: "rgba(0, 0, 0, 0.7)" }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            key="manifesto-modal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: FADE_EASE }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl"
            style={{
              backgroundColor: "#FAFAF9",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.25)",
              scrollbarWidth: "thin",
              scrollbarColor: "#E8E8E8 #FAFAF9",
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="manifesto-title"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close manifesto"
              className="absolute right-5 top-5 cursor-pointer rounded-full p-2 text-[#888888] transition-colors hover:bg-black/5 hover:text-[#0A0A0A] sm:right-6 sm:top-6"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="p-8 sm:p-16 md:p-20">
              <div
                aria-hidden="true"
                className="mb-8 h-px w-16 bg-[#E8E8E8]"
              />
              <p
                id="manifesto-title"
                className="mb-10 text-[12px] font-semibold uppercase tracking-wider text-[#16A34A]"
              >
                {manifesto.eyebrow}
              </p>

              <p className="mb-10 text-balance text-[24px] font-semibold leading-tight tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] md:text-[28px]">
                {manifesto.openingLine}
              </p>

              <p className="overflow-hidden text-base font-normal leading-relaxed text-[#0A0A0A] first-letter:float-left first-letter:pr-3 first-letter:pt-2 first-letter:text-[60px] first-letter:font-bold first-letter:leading-[0.9] first-letter:text-[#0A0A0A] sm:first-letter:text-[72px]">
                {manifesto.paragraph1Rest}
              </p>

              <p className="mt-6 text-base font-normal leading-relaxed text-[#0A0A0A]">
                {manifesto.paragraph2}
              </p>

              <p className="mt-6 text-base font-normal leading-relaxed text-[#0A0A0A]">
                {manifesto.paragraph3Before}
              </p>

              <p className="my-8 text-balance text-[24px] font-bold leading-tight tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] md:text-[28px]">
                {manifesto.pullQuote}
              </p>

              <p className="mt-6 text-base font-normal leading-relaxed text-[#0A0A0A]">
                {manifesto.paragraph3After}
              </p>

              <p className="mt-6 text-base font-normal leading-relaxed text-[#0A0A0A]">
                {manifesto.paragraph4}
              </p>

              <div className="mt-20">
                <div
                  aria-hidden="true"
                  className="mb-6 h-px w-16 bg-[#E8E8E8]"
                />
                <p className="text-lg font-medium text-[#0A0A0A]">
                  — Matt Gilston, <em className="italic">Founder</em>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
