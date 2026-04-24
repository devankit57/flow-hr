import type {
  AutomationAction,
  SimulationResult,
  WorkflowPayload
} from "@/types/workflow";

export async function getAutomations(): Promise<AutomationAction[]> {
  const response = await fetch("/api/automations");
  if (!response.ok) {
    throw new Error("Unable to load automations");
  }

  return response.json();
}

export async function simulateWorkflow(
  payload: WorkflowPayload
): Promise<SimulationResult> {
  const response = await fetch("/api/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Unable to run simulation");
  }

  return response.json();
}
