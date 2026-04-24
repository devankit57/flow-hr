# HR Workflow Designer

A Next.js App Router + TypeScript workflow builder for HR processes.

## Stack

- Next.js App Router
- React Flow for the workflow canvas
- Tailwind CSS with local shadcn-style UI primitives
- Zustand for global workflow state
- React Hook Form for node configuration forms

## Structure

- `app/` - routes, layout, and mock API endpoints
- `components/canvas/` - React Flow canvas, custom nodes, and node palette
- `components/forms/` - dynamic node configuration forms
- `components/layout/` - application shell and simulation panel
- `components/ui/` - reusable shadcn-style UI primitives
- `lib/` - API client helpers, mock data, node defaults, utilities
- `store/` - Zustand workflow store
- `types/` - strong workflow and node data types

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Mock API

- `GET /api/automations` returns automation action definitions.
- `POST /api/simulate` accepts serialized nodes and edges, then returns execution logs.
