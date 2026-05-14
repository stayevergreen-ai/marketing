"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type SectionId = "product" | "methodology" | "pricing";

const NAV_SECTIONS: { id: SectionId; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "methodology", label: "Methodology" },
  { id: "pricing", label: "Pricing" },
];

export default function Nav() {
  const [active, setActive] = useState<SectionId>("product");

  useEffect(() => {
    const sections = NAV_SECTIONS.map(({ id }) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 h-16 backdrop-blur-md"
      style={{
        background: "rgba(2, 44, 34, 0.7)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-12">
        <a
          href="/#product"
          className="flex items-center gap-2 sm:gap-2.5"
          aria-label="Evergreen — back to top"
        >
          <span className="hidden sm:inline-flex">
            <NavTreeMark size={22} />
          </span>
          <span className="text-[16px] font-black tracking-[-0.03em] text-[#ECFDF5] sm:text-[18px]">
            evergreen<span className="text-[#10B981]">.</span>
          </span>
        </a>
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          {NAV_SECTIONS.map(({ id, label }) => (
            <NavLink
              key={id}
              href={`/#${id}`}
              active={active === id}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`relative py-1 text-[12px] font-medium transition-colors sm:text-[14px] ${
        active
          ? "text-[#ECFDF5]"
          : "text-[rgba(255,255,255,0.70)] hover:text-[#ECFDF5]"
      }`}
    >
      {children}
      {active ? (
        <motion.span
          layoutId="nav-active-underline"
          aria-hidden="true"
          className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-[#10B981]"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      ) : null}
    </a>
  );
}

function NavTreeMark({ size = 22 }: { size?: number }) {
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
