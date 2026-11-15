import { CheckCircle2 } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { sortTasks } from "@/lib/planner";
import type { Task } from "@/types/planner";
import { TaskItem } from "./task-item";

interface TaskListProps {
  tasks: Task[];
  emptyTitle?: string;
  emptyDescription?: string | undefined;
}

export function TaskList({ tasks, emptyTitle = "Nada por aquí", emptyDescription }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState icon={<CheckCircle2 />} title={emptyTitle} description={emptyDescription} />;
  }
  return (
    <ul className="-mx-2 flex flex-col gap-0.5 sm:-mx-3">
      {sortTasks(tasks).map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
