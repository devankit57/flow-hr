import { simulateWorkflowPayload } from "@/lib/simulation";
import type { WorkflowPayload } from "@/types/workflow";

export async function POST(request: Request) {
  const payload = (await request.json()) as WorkflowPayload;
  return Response.json(simulateWorkflowPayload(payload));
}
