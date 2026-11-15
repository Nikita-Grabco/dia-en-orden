import { useEffect, useState } from "react";

/**
 * Current date, available only after hydration (null during SSR) so server and
 * browser time zones never cause a hydration mismatch. Ticks every minute.
 */
export function useToday(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}
