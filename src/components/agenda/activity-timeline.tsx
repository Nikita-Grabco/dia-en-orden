import { MapPin } from "lucide-react";

import { CATEGORIES } from "@/config/categories";
import { cn } from "@/lib/utils";
import type { Activity } from "@/types/planner";

export function ActivityRow({ activity }: { activity: Activity }) {
  const c = CATEGORIES[activity.category];
  return (
    <li className="flex gap-3.5">
      <div className="w-12 shrink-0 pt-0.5 text-right">
        <p className="text-sm font-bold tabular-nums text-foreground">{activity.start}</p>
        {activity.end && <p className="text-[11px] tabular-nums text-muted-foreground">{activity.end}</p>}
      </div>
      <div className={cn("min-w-0 flex-1 rounded-xl border-l-[3px] px-3.5 py-2.5", c.bar, c.soft)}>
        <p className="truncate text-sm font-semibold text-foreground">{activity.title}</p>
        {activity.location && (
          <p className={cn("mt-0.5 flex items-center gap-1 truncate text-xs font-medium", c.ink)}>
            <MapPin className="size-3 shrink-0" />
            {activity.location}
          </p>
        )}
      </div>
    </li>
  );
}

export function ActivityList({ activities }: { activities: Activity[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {activities.map((a) => (
        <ActivityRow key={a.id} activity={a} />
      ))}
    </ul>
  );
}
