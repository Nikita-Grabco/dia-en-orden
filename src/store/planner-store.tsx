import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { sampleActivities, sampleNotes, sampleTasks, sampleUser } from "@/data/sample-data";
import { createId } from "@/lib/planner";
import type { Activity, NewNoteInput, NewTaskInput, Note, Task, UserProfile } from "@/types/planner";

/**
 * In-memory app state seeded with sample data. Components only talk to this
 * hook, so swapping it for a real backend later won't touch the UI.
 */
interface PlannerContextValue {
  user: UserProfile;
  tasks: Task[];
  activities: Activity[];
  notes: Note[];
  toggleTask: (id: string) => void;
  addTask: (input: NewTaskInput) => void;
  deleteTask: (id: string) => void;
  addNote: (input: NewNoteInput) => void;
  togglePinNote: (id: string) => void;
  deleteNote: (id: string) => void;
  convertNoteToTask: (id: string) => void;
  addTaskDialog: { open: boolean; dayOffset: number };
  openAddTask: (dayOffset?: number) => void;
  setAddTaskOpen: (open: boolean) => void;
}

const PlannerContext = createContext<PlannerContextValue | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [activities] = useState<Activity[]>(sampleActivities);
  const [addTaskDialog, setAddTaskDialog] = useState({ open: false, dayOffset: 0 });

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const addTask = useCallback((input: NewTaskInput) => {
    setTasks((prev) => [...prev, { ...input, id: createId("t"), completed: false }]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addNote = useCallback((input: NewNoteInput) => {
    setNotes((prev) => [
      { ...input, id: createId("n"), pinned: false, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const togglePinNote = useCallback((id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const convertNoteToTask = useCallback(
    (id: string) => {
      const note = notes.find((n) => n.id === id);
      if (!note) return;
      addTask({ title: note.content, category: "personal", priority: "media", dayOffset: 0 });
      deleteNote(id);
    },
    [notes, addTask, deleteNote],
  );

  const openAddTask = useCallback((dayOffset = 0) => {
    setAddTaskDialog({ open: true, dayOffset });
  }, []);

  const setAddTaskOpen = useCallback((open: boolean) => {
    setAddTaskDialog((prev) => ({ ...prev, open }));
  }, []);

  const value = useMemo<PlannerContextValue>(
    () => ({
      user: sampleUser,
      tasks,
      activities,
      notes,
      toggleTask,
      addTask,
      deleteTask,
      addNote,
      togglePinNote,
      deleteNote,
      convertNoteToTask,
      addTaskDialog,
      openAddTask,
      setAddTaskOpen,
    }),
    [tasks, activities, notes, toggleTask, addTask, deleteTask, addNote, togglePinNote, deleteNote, convertNoteToTask, addTaskDialog, openAddTask, setAddTaskOpen],
  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner(): PlannerContextValue {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used inside <PlannerProvider>");
  return ctx;
}
