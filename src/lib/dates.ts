import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function getGreeting(hour: number): string {
  if (hour >= 6 && hour < 14) return "Buenos días";
  if (hour >= 14 && hour < 21) return "Buenas tardes";
  return "Buenas noches";
}

export function formatLongDate(date: Date): string {
  return capitalize(format(date, "EEEE, d 'de' MMMM", { locale: es }));
}

export function dayOffsetLabel(offset: number, today: Date | null): string {
  if (offset === 0) return "Hoy";
  if (offset === 1) return "Mañana";
  if (!today) return `En ${offset} días`;
  return capitalize(format(addDays(today, offset), "EEEE d", { locale: es }));
}

export function dayParts(offset: number, today: Date | null) {
  if (!today) return { weekday: offset === 0 ? "Hoy" : `+${offset}`, day: "" };
  const date = addDays(today, offset);
  return {
    weekday: capitalize(format(date, "EEE", { locale: es }).replace(".", "")),
    day: format(date, "d"),
  };
}

export function currentTimeString(date: Date): string {
  return format(date, "HH:mm");
}
