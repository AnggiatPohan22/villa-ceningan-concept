# Agent Rules

## Project Structure Guardrails

- Do not change the established Next.js App Router structure without explicit user approval.
- Keep global layout ownership in `src/components/layout/`.
- Keep reusable UI primitives in `src/components/shared/`.
- Keep page-specific marketing sections in `src/components/marketing/`.
- Keep structured content data in `src/data/` when the content is reused or large enough to make page files noisy.
- Keep page implementation reports in `ai/reports/stitch/pages/` for Stitch-based work.
- Do not replace the existing styling system or introduce a new styling framework without explicit user approval.
- Do not refactor unrelated pages, routes, layout components, or shared data while implementing a scoped page request.
- If new files or folders are needed, make them match the existing conventions and keep the addition small, named clearly, and easy to maintain.
- Before changing established structure, explain the reason, list the affected files, and wait for approval.
