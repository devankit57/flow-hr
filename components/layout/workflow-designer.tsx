"use client";

import { useEffect } from "react";
import { WorkflowCanvas } from "@/components/canvas/workflow-canvas";
import { NodePalette } from "@/components/canvas/node-palette";
import { NodeConfigPanel } from "@/components/forms/node-config-panel";
import { SimulationPanel } from "@/components/layout/simulation-panel";
import { getAutomations } from "@/lib/api";
import { useWorkflowStore } from "@/store/workflow-store";

export function WorkflowDesigner() {
  const setAutomationOptions = useWorkflowStore(
    (state) => state.setAutomationOptions
  );
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);

  useEffect(() => {
    getAutomations()
      .then(setAutomationOptions)
      .catch(() => setAutomationOptions([]));
  }, [setAutomationOptions]);

  return (
    <main className="flex h-screen min-h-[760px] overflow-hidden bg-transparent">
      <NodePalette />
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkflowCanvas />
        <SimulationPanel />
      </div>
      <aside className="relative">
        {!selectedNodeId ? (
          <div className="pointer-events-none absolute inset-x-5 top-4 z-10 rounded-lg border border-white/10 bg-card/88 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
            Pick a step to edit its settings.
          </div>
        ) : null}
        <NodeConfigPanel />
      </aside>
    </main>
  );
}
