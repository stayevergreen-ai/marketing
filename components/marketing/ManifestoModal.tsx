"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const FADE_EASE = [0.16, 1, 0.3, 1] as const;

const SERIF_STACK =
  "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, 'Times New Roman', serif";

const manifesto = {
  brand: "Evergreen",
  section: "A manifesto",
  issue: "№ 001",
  subhead:
    "A statement on what we believe, what we won't build, and the bet we're making on every customer success team that comes with us.",
  headline: "There are two paths for AI in customer success.",
  lede: "We took a third one.",
  paragraph1:
    "We're living through the largest workforce shift since the industrial revolution. Every week, another company announces it's replacing a department with AI. Every major AI company is racing toward the same destination: software that doesn't need humans to run it. The customer success industry is no exception.",
  paragraph2:
    "Two kinds of products are competing for your customer success budget. One can't keep up. The other is chasing the wrong destination. The first was built before AI, on architectures that demand integrations, implementation cycles, and dedicated admins to function. They can bolt AI on, but they can't out-iterate companies built around it — and the buyers who could never afford their stack are still locked out. The second is honest about what they're building: customer success without customer success managers. AI doing 99% of the CSM's job today. So the board can sign off on 100% tomorrow. Their honesty is the warning, not the comfort.",
  paragraph3Before:
    "Evergreen exists because someone had to build the third option. AI is the most powerful tool customer success has ever seen, and we were built around that conviction — but with a line we will never cross. ",
  paragraph3Emphasis: "AI does not replace your CSMs. Ever.",
  paragraph3After:
    " Customer success isn't a function that automates. It's a function that compounds — through trust, context, and judgment only humans accumulate. Every feature in Evergreen makes a CSM more capable. None make one optional.",
  paragraph4:
    "The next decade of customer success will be defined by who used AI to amplify humans, and who used it to remove them. The companies that bet on AI replacement will spend years rebuilding the trust they automated away. The ones that bet on amplifying their teams will be the ones their customers stay with. We built Evergreen for the teams that already know which side they're on. We're going to be on the right side of history. So is every team that comes with us.",
  signatureName: "— Matt Gilston",
  signatureRole: "Founder, Evergreen",
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
            className="relative max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-xl shadow-2xl"
            style={{
              backgroundColor: "#F4F2EC",
              scrollbarWidth: "thin",
              scrollbarColor: "#C7C2B3 #E8E5DD",
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="manifesto-headline"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close manifesto"
              className="absolute right-5 top-5 cursor-pointer rounded-full p-2 text-[#999] transition-colors hover:bg-black/5 hover:text-[#0A0A0A] sm:right-6 sm:top-6"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="p-8 sm:px-12 sm:pb-10 sm:pt-14">
              <div className="mb-8 flex items-baseline justify-between gap-3">
                <p className="flex flex-wrap items-baseline gap-x-2 text-[11px] font-medium uppercase tracking-[0.2em]">
                  <span className="text-[#999]">{manifesto.brand}</span>
                  <span aria-hidden="true" className="text-[#999]">
                    ·
                  </span>
                  <span className="text-[#16A34A]">{manifesto.section}</span>
                </p>
                <p className="shrink-0 text-[11px] font-medium tracking-[0.2em] text-[#999]">
                  {manifesto.issue}
                </p>
              </div>

              <div className="mb-10 border-l-2 border-[#16A34A] pl-5">
                <p className="text-[16px] font-medium leading-[1.45] text-[#0A0A0A]">
                  {manifesto.subhead}
                </p>
              </div>

              <h2
                id="manifesto-headline"
                className="mb-7 text-[36px] font-bold leading-[1.08] text-[#0A0A0A] sm:text-[40px] md:text-[44px]"
                style={{
                  fontFamily: SERIF_STACK,
                  letterSpacing: "-0.018em",
                }}
              >
                {manifesto.headline}
              </h2>

              <p
                className="mb-10 text-[17px] italic leading-[1.45] text-[#555] md:text-[19px]"
                style={{ fontFamily: SERIF_STACK }}
              >
                {manifesto.lede}
              </p>

              <p className="mb-5 text-[16px] leading-[1.7] text-[#0A0A0A]">
                {manifesto.paragraph1}
              </p>

              <p className="mb-5 text-[16px] leading-[1.7] text-[#0A0A0A]">
                {manifesto.paragraph2}
              </p>

              <p className="mb-5 text-[16px] leading-[1.7] text-[#0A0A0A]">
                {manifesto.paragraph3Before}
                <strong style={{ fontWeight: 500 }}>
                  {manifesto.paragraph3Emphasis}
                </strong>
                {manifesto.paragraph3After}
              </p>

              <p className="mb-5 text-[16px] leading-[1.7] text-[#0A0A0A]">
                {manifesto.paragraph4}
              </p>

              <div
                className="mt-12 flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-8"
                style={{ borderTop: "1px solid #D6D3CB" }}
              >
                <span
                  className="text-[17px] font-medium text-[#0A0A0A]"
                  style={{ fontFamily: SERIF_STACK }}
                >
                  {manifesto.signatureName}
                </span>
                <span className="text-[13px] italic text-[#888]">
                  {manifesto.signatureRole}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
