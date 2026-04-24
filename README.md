# FLOW HR

A visual HR workflow designer for building, configuring, and simulating people operations processes.

## Overview

FLOW HR is a Next.js application built for designing HR workflows such as onboarding, approvals, and automations.

It exists to make HR process design:
- visual
- structured
- easy to validate
- simple to simulate before implementation

Users can drag and drop workflow steps, configure each node dynamically, and run a mock simulation to preview how the workflow executes.

## Features

- Drag-and-drop workflow builder
- Custom workflow nodes:
  - Start
  - Task
  - Approval
  - Automation
  - End
- Dynamic node configuration forms
- Centralized workflow state management
- Workflow simulation panel with execution logs
- Mock API layer for automations and simulation
- Google authentication with NextAuth
- Responsive UI with a polished branded experience

## Tech Stack

- Next.js (App Router)
- TypeScript
- React Flow
- Zustand
- React Hook Form
- NextAuth
- Tailwind CSS
- shadcn-style UI components

## Architecture

The project is organized to keep UI, logic, and state clearly separated.

- **Canvas layer**
  - Built with React Flow
  - Handles node rendering, edge connections, minimap, and controls
- **Forms layer**
  - Dynamic form renderer based on node type
  - React Hook Form used for controlled, scalable form handling
- **State layer**
  - Zustand store manages nodes, edges, selection state, automation options, and simulation results
- **API layer**
  - Mock App Router API routes provide automation options and simulation responses
- **Auth layer**
  - NextAuth with Google provider protects access to the main app

This separation makes the codebase easier to extend with:
- new node types
- stronger validation
- real backend APIs
- persistence
- advanced workflow features

## Folder Structure

```bash
.
├── app
│   ├── api
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── automations/route.ts
│   │   └── simulate/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── canvas
│   │   ├── node-palette.tsx
│   │   ├── workflow-canvas.tsx
│   │   └── workflow-node.tsx
│   ├── forms
│   │   ├── approval-node-form.tsx
│   │   ├── automation-node-form.tsx
│   │   ├── end-node-form.tsx
│   │   ├── key-value-field-array.tsx
│   │   ├── node-config-panel.tsx
│   │   ├── start-node-form.tsx
│   │   ├── task-node-form.tsx
│   │   └── use-node-form.ts
│   ├── layout
│   │   ├── simulation-panel.tsx
│   │   └── workflow-designer.tsx
│   ├── ui
│   ├── AuthButton.tsx
│   ├── auth-provider.tsx
│   ├── login-screen.tsx
│   └── smoke-background.tsx
├── lib
│   ├── api.ts
│   ├── auth.ts
│   ├── mock-data.ts
│   ├── node-defaults.ts
│   ├── node-registry.ts
│   ├── simulation.ts
│   └── utils.ts
├── store
│   └── workflow-store.ts
├── types
│   ├── next-auth.d.ts
│   ├── workflow-store.ts
│   └── workflow.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Installation

```bash
npm install
```

### Run

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
```

## How It Works

- User signs in with Google
- User opens the workflow designer
- User drags nodes from the sidebar onto the canvas
- User connects nodes to define the process flow
- User selects a node to configure its fields
- Dynamic forms update node data in Zustand state
- User runs simulation
- The app serializes nodes and edges into JSON
- Mock simulation logic validates and traverses the workflow
- Execution logs are displayed in the simulation panel

## API Endpoints (Mock)

### `GET /api/automations`

Returns available automation actions and required parameters.

Example:
- `send_email`
- `generate_doc`

### `POST /api/simulate`

Accepts serialized workflow data:
- nodes
- edges

Returns:
- validation result
- execution logs
- serialized workflow JSON

## Design Decisions

- **Zustand over Redux**
  - lighter setup
  - less boilerplate
  - faster for localized app state
  - ideal for canvas-driven UI interactions

- **React Flow**
  - purpose-built for node-based editors
  - supports drag/drop, edges, minimap, and controls out of the box
  - reduces time spent building graph behavior manually

- **Dynamic form mapping**
  - each node type maps to its own form
  - scales cleanly as more node types are added
  - keeps form logic modular and type-safe

- **JWT session strategy**
  - no database adapter required
  - simpler setup for assessment scope
  - sufficient for protected app access

## Trade-offs

- No backend persistence for workflows
- Mock APIs instead of real integrations
- Validation is intentionally basic
- Simulation is linear and simplified
- Authentication is implemented, but user management is minimal

## Future Improvements

- Undo/Redo support
- Auto-layout for workflow graphs
- Save/load workflows
- JSON import/export
- Real backend persistence
- More advanced validation rules
- Visual validation errors on nodes/edges
- Multi-branch simulation paths
- Role-based access control
