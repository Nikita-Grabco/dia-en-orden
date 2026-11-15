import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Chip } from "@/components/common/chip";
import { PageHeader } from "@/components/common/page-header";
import { TaskList } from "@/components/tasks/task-list";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CATEGORIES, CATEGORY_IDS } from "@/config/categories";
import { useToday } from "@/hooks/use-today";
import { dayOffsetLabel } from "@/lib/dates";
import { getProgress } from "@/lib/planner";
import { cn } from "@/lib/utils";
import { usePlanner } from "@/store/planner-store";
import type { CategoryId } from "@/types/planner";

export const Route = createFileRoute("/tareas")({
  head: () => ({
    meta: [
      { title: "Tareas — Calma" },
      { name: "description", content: "Todas tus tareas por día y categoría, con su progreso." },
      { property: "og:title", content: "Tareas — Calma" },
      { property: "og:description", content: "Todas tus tareas por día y categoría, con su progreso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const { tasks, openAddTask } = usePlanner();
  const today = useToday();
  const [category, setCategory] = useState<CategoryId | "todas">("todas");
  const [showDone, setShowDone] = useState(true);

  const filtered = tasks.filter(
    (t) => (category === "todas" || t.category === category) && (showDone || !t.completed),
  );
  const days = [...new Set(tasks.map((t) => t.dayOffset))].sort((a, b) => a - b);
  const { pending } = getProgress(tasks);

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow="Gestión"
        title="Tareas"
        description={`Tienes ${pending} tareas pendientes en total.`}
        actions={
          <Button onClick={() => openAddTask()} className="hidden md:inline-flex">
            <Plus /> Nueva tarea
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          <Chip selected={category === "todas"} onClick={() => setCategory("todas")}>
            Todas
          </Chip>
          {CATEGORY_IDS.map((id) => (
            <Chip key={id} selected={category === id} onClick={() => setCategory(id)}>
              <span className={cn("size-2 rounded-full", CATEGORIES[id].dot)} />
              {CATEGORIES[id].label}
            </Chip>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-muted-foreground">
          <Switch checked={showDone} onCheckedChange={setShowDone} />
          Mostrar completadas
        </label>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-2">
        {days.map((offset) => {
          const dayTasks = filtered.filter((t) => t.dayOffset === offset);
          const progress = getProgress(tasks.filter((t) => t.dayOffset === offset));
          return (
            <section key={offset} className="surface p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display font-semibold text-2xl leading-none text-foreground">{dayOffsetLabel(offset, today)}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {progress.completed} de {progress.total} completadas
                  </p>
                </div>
                <Button variant="soft" size="icon-sm" aria-label="Añadir tarea a este día" onClick={() => openAddTask(offset)}>
                  <Plus />
                </Button>
              </div>
              <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress.percent}%` }} />
              </div>
              <TaskList tasks={dayTasks} emptyTitle="Sin tareas con este filtro" />
            </section>
          );
        })}
      </div>
    </div>
  );
}
