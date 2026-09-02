import { type ReactNode } from "react";

type BrutalCardProps = {
  children: ReactNode;
  className?: string;
};

export function BrutalCard({ children, className = "" }: BrutalCardProps) {
  return (
    <div
      className={`border-[3px] border-fg bg-bg p-6 brutal-shadow ${className}`}
    >
      {children}
    </div>
  );
}
