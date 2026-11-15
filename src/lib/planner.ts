import type { Activity, Note, Priority, Task } from "@/types/planner";

export function getProgress(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  return {
    total,
    completed,
    pending: total - completed,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function getProgressMessage(percent: number, total: number): string {
  if (total === 0) return "Un día en blanco";
  if (percent === 100) return "¡Día completado!";
  if (percent >= 70) return "Ya casi lo tienes";
  if (percent >= 40) return "Vas por buen camino";
  if (percent > 0) return "Buen comienzo";
  return "Empecemos con calma";
}

const priorityRank: Record<Priority, number> = { alta: 0, media: 1, baja: 2 };

/** Pending first, then by time (untimed last), then by priority. */
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      Number(a.completed) - Number(b.completed) ||
      (a.time ?? "99:99").localeCompare(b.time ?? "99:99") ||
      priorityRank[a.priority] - priorityRank[b.priority],
  );
}

export function sortActivities(activities: Activity[]): Activity[] {
  return [...activities].sort((a, b) => a.dayOffset - b.dayOffset || a.start.localeCompare(b.start));
}

/** Activities that haven't started yet, given the current "HH:mm". */
export function getUpcoming(activities: Activity[], nowTime: string | null): Activity[] {
  return sortActivities(activities).filter(
    (a) => a.dayOffset > 0 || nowTime === null || a.start >= nowTime,
  );
}

export function sortNotes(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt - a.createdAt);
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
