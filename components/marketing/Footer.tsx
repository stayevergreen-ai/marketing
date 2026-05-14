"use client";

type LinkItem = { label: string; href: string };

const PRODUCT_LINKS: LinkItem[] = [
  { label: "Methodology", href: "/#methodology" },
  { label: "Pricing", href: "/#pricing" },
  { label: "ROI calculator", href: "/roi" },
  { label: "Book a demo", href: "/#demo" },
];

const COMPANY_LINKS: LinkItem[] = [
  { label: "About", href: "#" },
  { label: "Security", href: "#" },
  { label: "Contact", href: "mailto:hello@stayevergreen.ai" },
];

const LEGAL_LINKS: LinkItem[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative px-6 py-16 md:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <FooterTreeMark size={28} />
              <span className="text-[18px] font-black tracking-[-0.03em] text-[#ECFDF5]">
                evergreen<span className="text-[#16A34A]">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-[1.55] text-[rgba(255,255,255,0.70)]">
              The operational intelligence layer for Customer Success.
            </p>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div
          className="mt-12 flex items-center justify-between pt-8"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
        >
          <p className="text-[12px] text-[rgba(255,255,255,0.50)]">
            © 2026 Evergreen. All rights reserved.
          </p>
          <FooterTreeMark size={18} />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: LinkItem[];
}) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.10em] text-[rgba(255,255,255,0.50)]">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[13px] text-[rgba(255,255,255,0.50)] transition-colors hover:text-[#ECFDF5]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterTreeMark({ size = 24 }: { size?: number }) {
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
