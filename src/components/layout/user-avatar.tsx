import { usePlanner } from "@/store/planner-store";
import { cn } from "@/lib/utils";

export function UserAvatar({ className }: { className?: string }) {
  const { user } = usePlanner();
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground",
        className,
      )}
      aria-label={user.name}
    >
      {user.initials}
    </span>
  );
}
