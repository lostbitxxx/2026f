import Link from "next/link";
import { type ReactNode } from "react";

type BrutalButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function BrutalButton({
  children,
  href,
  className = "",
  type = "button",
  onClick,
}: BrutalButtonProps) {
  const styles = `inline-block border-[3px] border-fg bg-bg px-6 py-3 text-sm font-bold uppercase tracking-widest brutal-shadow brutal-press transition-colors hover:bg-fg hover:text-bg ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
