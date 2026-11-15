import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";

import { ActivityList } from "@/components/agenda/activity-timeline";
import { EmptyState } from "@/components/common/empty-state";
import { SectionCard } from "@/components/common/section-card";
import { useToday } from "@/hooks/use-today";
import { currentTimeString, dayOffsetLabel } from "@/lib/dates";
import { getUpcoming } from "@/lib/planner";
import { usePlanner } from "@/store/planner-store";
import type { Activity } from "@/types/planner";

export function UpcomingActivities({ limit = 5 }: { limit?: number }) {
  const { activities } = usePlanner();
  const today = useToday();
  const upcoming = getUpcoming(activities, today ? currentTimeString(today) : null).slice(0, limit);

  const groups = upcoming.reduce<Record<number, Activity[]>>((acc, a) => {
    (acc[a.dayOffset] ??= []).push(a);
    return acc;
  }, {});

  return (
    <SectionCard
      title="Próximas actividades"
      icon={<CalendarDays />}
      action={
        <Link to="/agenda" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          Agenda <ArrowRight className="size-3" />
        </Link>
      }
    >
      {upcoming.length === 0 ? (
        <EmptyState icon={<CalendarDays />} title="Sin actividades próximas" />
      ) : (
        <div className="space-y-5">
          {Object.entries(groups).map(([offset, list]) => (
            <div key={offset}>
              <p className="eyebrow mb-2.5">{dayOffsetLabel(Number(offset), today)}</p>
              <ActivityList activities={list} />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
