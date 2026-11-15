import { ListPlus, Pin, PinOff, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { NOTE_KINDS } from "@/config/categories";
import { cn } from "@/lib/utils";
import { usePlanner } from "@/store/planner-store";
import type { Note } from "@/types/planner";

export function NoteCard({ note, compact = false }: { note: Note; compact?: boolean }) {
  const { togglePinNote, deleteNote, convertNoteToTask } = usePlanner();
  const kind = NOTE_KINDS[note.kind];
  const Icon = kind.icon;

  return (
    <article
      className={cn(
        "group relative break-inside-avoid rounded-2xl border border-border/60 transition-shadow hover:shadow-soft",
        kind.soft,
        compact ? "p-3.5" : "mb-4 p-4 sm:p-5",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider", kind.ink)}>
          <Icon className="size-3.5" />
          {kind.label}
        </span>
        {note.pinned && <Pin className={cn("size-3.5 fill-current", kind.ink)} aria-label="Fijada" />}
      </div>
      <p className={cn("mt-2 text-foreground", compact ? "line-clamp-2 text-sm" : "text-[15px] leading-relaxed")}>
        {note.content}
      </p>

      {!compact && (
        <div className="mt-4 flex items-center gap-1 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-within:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              convertNoteToTask(note.id);
              toast.success("Convertida en tarea para hoy");
            }}
          >
            <ListPlus /> A tarea
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={note.pinned ? "Desfijar nota" : "Fijar nota"}
            onClick={() => togglePinNote(note.id)}
          >
            {note.pinned ? <PinOff /> : <Pin />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Eliminar nota"
            className="ml-auto"
            onClick={() => {
              deleteNote(note.id);
              toast("Nota eliminada");
            }}
          >
            <Trash2 />
          </Button>
        </div>
      )}
    </article>
  );
}
