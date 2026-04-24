"use client";

import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { simulateWorkflow } from "@/lib/api";
import { useWorkflowStore } from "@/store/workflow-store";

function SimulationBadge({
  isWarning,
  label
}: {
  isWarning: boolean;
  label: string;
}) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        isWarning
          ? "bg-amber-500/18 text-amber-200"
          : "bg-emerald-500/18 text-emerald-200"
      }`}
    >
      {label}
    </span>
  );
}

export function SimulationPanel() {
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const simulation = useWorkflowStore((state) => state.simulation);
  const applySimulationResult = useWorkflowStore(
    (state) => state.applySimulationResult
  );
  const setSimulationPending = useWorkflowStore(
    (state) => state.setSimulationPending
  );

  async function runSimulation() {
    setSimulationPending(true);

    try {
      const result = await simulateWorkflow({ nodes, edges });
      applySimulationResult(result);
    } finally {
      setSimulationPending(false);
    }
  }

  return (
    <section className="border-t border-white/10 bg-card/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <h2 className="text-sm font-semibold">Simulation</h2>
          <p className="text-xs text-muted-foreground">
            Serializes the canvas and runs the mock workflow.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={runSimulation}
          disabled={simulation.isRunning}
        >
          <PlayCircle className="h-4 w-4" />
          {simulation.isRunning ? "Running" : "Run"}
        </Button>
      </div>
      <div className="grid gap-3 border-t px-5 py-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="max-h-56 overflow-y-auto">
          {simulation.logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No simulation logs yet.</p>
          ) : (
            <ol className="space-y-2">
              {simulation.logs.map((logEntry) => (
                <li
                  key={`${logEntry.step}-${logEntry.nodeId}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">
                      Step {logEntry.step}: {logEntry.title}
                    </span>
                    <SimulationBadge
                      isWarning={logEntry.status === "warning"}
                      label={logEntry.status}
                    />
                  </div>
                  <p className="mt-1 text-muted-foreground">{logEntry.message}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="min-w-0 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground">
              Serialized JSON
            </h3>
            {simulation.valid !== null ? (
              <SimulationBadge
                isWarning={!simulation.valid}
                label={simulation.valid ? "Valid" : "Needs fixes"}
              />
            ) : null}
          </div>
          <pre className="max-h-56 overflow-auto rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-muted-foreground">
            <code>
              {simulation.serialized || '{\n  "nodes": [],\n  "edges": []\n}'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
