import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)} aria-label="Calma, inicio">
      <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
        <span className="font-display text-xl leading-none">c</span>
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-sidebar bg-personal" />
      </span>
      {!compact && <span className="font-display text-2xl leading-none text-foreground">calma</span>}
    </Link>
  );
}
