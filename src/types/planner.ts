/** Domain types. Keep these stable: a future backend should map its rows to these shapes. */

export type CategoryId = "trabajo" | "personal" | "salud" | "hogar";
export type Priority = "alta" | "media" | "baja";
export type NoteKind = "idea" | "por-hacer" | "recordatorio";

export interface Task {
  id: string;
  title: string;
  category: CategoryId;
  priority: Priority;
  /** Days from today: 0 = today, 1 = tomorrow… */
  dayOffset: number;
  /** Optional "HH:mm" time. */
  time?: string;
  completed: boolean;
}

export interface Activity {
  id: string;
  title: string;
  category: CategoryId;
  dayOffset: number;
  start: string;
  end?: string;
  location?: string;
}

export interface Note {
  id: string;
  content: string;
  kind: NoteKind;
  pinned: boolean;
  /** Epoch millis, used for ordering. */
  createdAt: number;
}

export interface UserProfile {
  name: string;
  initials: string;
}

export type NewTaskInput = Omit<Task, "id" | "completed">;
export type NewNoteInput = Pick<Note, "content" | "kind">;
