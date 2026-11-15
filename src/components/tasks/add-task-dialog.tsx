import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { Chip } from "@/components/common/chip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CATEGORIES, CATEGORY_IDS, PRIORITIES, PRIORITY_IDS } from "@/config/categories";
import { useToday } from "@/hooks/use-today";
import { dayOffsetLabel } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { usePlanner } from "@/store/planner-store";
import type { CategoryId, Priority } from "@/types/planner";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="eyebrow">{label}</p>
      {children}
    </div>
  );
}

const DAY_OPTIONS = [0, 1, 2, 3];

export function AddTaskDialog() {
  const { addTaskDialog, setAddTaskOpen, addTask } = usePlanner();
  const today = useToday();
  const [title, setTitle] = useState("");
  const [dayOffset, setDayOffset] = useState(0);
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<CategoryId>("personal");
  const [priority, setPriority] = useState<Priority>("media");

  useEffect(() => {
    if (addTaskDialog.open) {
      setTitle("");
      setTime("");
      setCategory("personal");
      setPriority("media");
      setDayOffset(addTaskDialog.dayOffset);
    }
  }, [addTaskDialog.open, addTaskDialog.dayOffset]);

  const dayOptions = DAY_OPTIONS.includes(dayOffset) ? DAY_OPTIONS : [...DAY_OPTIONS, dayOffset];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    addTask({ title: clean, dayOffset, time: time || undefined, category, priority });
    toast.success("Tarea añadida", { description: clean });
    setAddTaskOpen(false);
  }

  return (
    <Dialog open={addTaskDialog.open} onOpenChange={setAddTaskOpen}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] overflow-y-auto rounded-3xl sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="font-display text-3xl font-normal">Nueva tarea</DialogTitle>
          <DialogDescription>Apunta lo que quieres hacer y cuándo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            aria-label="Título de la tarea"
            className="h-12 rounded-xl text-base"
          />

          <Field label="Cuándo">
            <div className="flex flex-wrap gap-2">
              {dayOptions.map((offset) => (
                <Chip key={offset} selected={dayOffset === offset} onClick={() => setDayOffset(offset)}>
                  {dayOffsetLabel(offset, today)}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Hora (opcional)">
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              aria-label="Hora"
              className="h-10 w-36 rounded-xl"
            />
          </Field>

          <Field label="Categoría">
            <div className="flex flex-wrap gap-2">
              {CATEGORY_IDS.map((id) => (
                <Chip key={id} selected={category === id} onClick={() => setCategory(id)}>
                  <span className={cn("size-2 rounded-full", CATEGORIES[id].dot)} />
                  {CATEGORIES[id].label}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Prioridad">
            <div className="flex flex-wrap gap-2">
              {PRIORITY_IDS.map((id) => (
                <Chip key={id} selected={priority === id} onClick={() => setPriority(id)}>
                  <span className={cn("size-2 rounded-full", PRIORITIES[id].dot)} />
                  {PRIORITIES[id].label}
                </Chip>
              ))}
            </div>
          </Field>

          <DialogFooter className="gap-2 pt-2 sm:gap-2">
            <Button type="button" variant="ghost" onClick={() => setAddTaskOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Añadir tarea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
