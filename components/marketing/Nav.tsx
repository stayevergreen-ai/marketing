"use client";

export default function Nav() {
  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 h-16 bg-white"
      style={{ borderBottom: "1px solid #EAEAEA" }}
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
          <span className="text-[16px] font-black tracking-[-0.03em] text-[#0A0A0A] sm:text-[18px]">
            evergreen<span className="text-[#16A34A]">.</span>
          </span>
        </a>
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          <NavLink href="/#product">Product</NavLink>
          <NavLink href="/#methodology">Methodology</NavLink>
          <NavLink href="/#pricing">Pricing</NavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-[12px] font-medium text-[#666] transition-colors hover:text-[#16A34A] sm:text-[14px]"
    >
      {children}
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
