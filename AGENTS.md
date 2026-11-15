<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Frontend-only for now: all state lives in `src/store/planner-store.tsx` (React context seeded from `src/data/sample-data.ts`); components only use `usePlanner()`, so a backend can replace the store without touching UI.
- Domain types live in `src/types/planner.ts`; visual config (categories, priorities, note kinds, nav items) lives in `src/config/` so labels/colors change in one place.
- Dates are relative (`dayOffset`) and rendered via `useToday()` after hydration to avoid SSR/browser time-zone mismatches.
- Layout: `AppShell` in `__root.tsx` renders the sidebar (md icon rail, lg full) and the mobile bottom bar from the same `NAV_ITEMS`.
- Colors only via tokens in `src/styles.css` (category tokens: base / -soft / -ink); no raw color utilities in components.
