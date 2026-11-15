import type { Activity, Note, Task, UserProfile } from "@/types/planner";

/** Example data for the frontend-only version. Replace with real data sources later. */

export const sampleUser: UserProfile = { name: "Nikita", initials: "NG" };

export const sampleTasks: Task[] = [
  { id: "t1", title: "Revisar correos y priorizar el día", category: "trabajo", priority: "media", dayOffset: 0, time: "08:30", completed: true },
  { id: "t2", title: "Llamada con el equipo de diseño", category: "trabajo", priority: "alta", dayOffset: 0, time: "10:00", completed: true },
  { id: "t3", title: "Preparar la presentación del proyecto", category: "trabajo", priority: "alta", dayOffset: 0, time: "12:00", completed: false },
  { id: "t4", title: "Pagar la factura de la luz", category: "hogar", priority: "alta", dayOffset: 0, completed: false },
  { id: "t5", title: "Comprar fruta y verduras", category: "hogar", priority: "baja", dayOffset: 0, time: "18:30", completed: false },
  { id: "t6", title: "Salir a correr 30 minutos", category: "salud", priority: "media", dayOffset: 0, time: "19:30", completed: false },
  { id: "t7", title: "Llamar a mamá", category: "personal", priority: "media", dayOffset: 0, time: "21:00", completed: false },
  { id: "t8", title: "Leer 20 páginas", category: "personal", priority: "baja", dayOffset: 0, completed: true },
  { id: "t9", title: "Enviar el informe mensual", category: "trabajo", priority: "alta", dayOffset: 1, time: "11:00", completed: false },
  { id: "t10", title: "Reservar mesa para el cumpleaños", category: "personal", priority: "media", dayOffset: 1, completed: false },
  { id: "t11", title: "Estiramientos antes de dormir", category: "salud", priority: "baja", dayOffset: 1, time: "22:30", completed: false },
  { id: "t12", title: "Regar las plantas", category: "hogar", priority: "baja", dayOffset: 2, completed: false },
  { id: "t13", title: "Revisar presupuesto del mes", category: "personal", priority: "media", dayOffset: 3, time: "20:00", completed: false },
  { id: "t14", title: "Actualizar el portfolio", category: "trabajo", priority: "baja", dayOffset: 5, completed: false },
];

export const sampleActivities: Activity[] = [
  { id: "a1", title: "Reunión semanal del equipo", category: "trabajo", dayOffset: 0, start: "10:00", end: "11:00", location: "Sala Norte" },
  { id: "a2", title: "Comida con Laura", category: "personal", dayOffset: 0, start: "14:00", end: "15:30", location: "Café Central" },
  { id: "a3", title: "Clase de yoga", category: "salud", dayOffset: 0, start: "19:00", end: "20:00", location: "Estudio Om" },
  { id: "a4", title: "Cita con el dentista", category: "salud", dayOffset: 1, start: "09:30", end: "10:15", location: "Clínica Sonrisa" },
  { id: "a5", title: "Revisión de sprint", category: "trabajo", dayOffset: 1, start: "16:00", end: "17:00", location: "Videollamada" },
  { id: "a6", title: "Cumpleaños de Carlos", category: "personal", dayOffset: 2, start: "21:00", location: "Casa de Carlos" },
  { id: "a7", title: "Recoger paquete", category: "hogar", dayOffset: 3, start: "11:00", location: "Oficina de correos" },
  { id: "a8", title: "Taller de cerámica", category: "personal", dayOffset: 5, start: "18:00", end: "20:00", location: "Barro Studio" },
  { id: "a9", title: "Revisión anual médica", category: "salud", dayOffset: 6, start: "08:45", location: "Centro de salud" },
];

const now = 1_700_000_000_000;
const hour = 3_600_000;

export const sampleNotes: Note[] = [
  { id: "n1", content: "Aprender a hacer pan de masa madre los domingos.", kind: "idea", pinned: true, createdAt: now - 2 * hour },
  { id: "n2", content: "Renovar el pasaporte antes del verano.", kind: "recordatorio", pinned: true, createdAt: now - 5 * hour },
  { id: "n3", content: "Planificar un viaje a Lisboa en primavera: barrio de Alfama, tranvía 28 y pasteles de Belém.", kind: "idea", pinned: false, createdAt: now - 26 * hour },
  { id: "n4", content: "Organizar el armario y donar la ropa que ya no uso.", kind: "por-hacer", pinned: false, createdAt: now - 30 * hour },
  { id: "n5", content: "Libro recomendado: «Hábitos atómicos».", kind: "idea", pinned: false, createdAt: now - 50 * hour },
  { id: "n6", content: "Cambiar el filtro del agua.", kind: "por-hacer", pinned: false, createdAt: now - 72 * hour },
  { id: "n7", content: "Preguntar a Ana por la receta del curry.", kind: "recordatorio", pinned: false, createdAt: now - 90 * hour },
];
