import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function SectionHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="font-display text-5xl text-white">{title}</h2>
        {subtitle ? <p className="text-white/70 mt-2 max-w-2xl">{subtitle}</p> : null}
      </div>
      {right}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("panel p-4", className)}>{children}</section>;
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "danger" | "warning" }) {
  const toneClass = {
    default: "bg-white/10 text-white/80",
    success: "bg-emerald-500/20 text-emerald-300",
    danger: "bg-rose-500/20 text-rose-300",
    warning: "bg-amber-500/20 text-amber-200",
  }[tone];
  return <span className={cn("px-2 py-1 rounded text-xs uppercase tracking-wider", toneClass)}>{children}</span>;
}
