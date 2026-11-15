import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface TaskCheckProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
}

/** Round checkbox used for tasks. */
export function TaskCheck({ checked, onToggle, label }: TaskCheckProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "grid size-6 shrink-0 cursor-pointer place-items-center rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-card text-transparent hover:border-primary/60",
      )}
    >
      <Check className={cn("size-3.5", checked && "animate-check-pop")} strokeWidth={3} />
    </button>
  );
}
