import { getNodeTitle } from "@/lib/node-defaults";
import type {
  SimulationLog,
  SimulationResult,
  WorkflowNode,
  WorkflowNodeType,
  WorkflowPayload
} from "@/types/workflow";

function buildAdjacencyList(payload: WorkflowPayload) {
  const adjacencyList = new Map<string, string[]>();

  payload.nodes.forEach((node) => adjacencyList.set(node.id, []));
  payload.edges.forEach((edge) => {
    adjacencyList.get(edge.source)?.push(edge.target);
  });

  return adjacencyList;
}

function serializeWorkflow(payload: WorkflowPayload): string {
  return JSON.stringify(
    {
      nodes: payload.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: node.data
      })),
      edges: payload.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target
      }))
    },
    null,
    2
  );
}

function createValidationLog(
  step: number,
  message: string,
  nodeId = "validation"
): SimulationLog {
  return {
    step,
    nodeId,
    nodeType: "start",
    title: "Validation",
    status: "warning",
    message
  };
}

function createExecutionMessage(node: WorkflowNode): string {
  switch (node.type as WorkflowNodeType) {
    case "start":
      return "Start triggered";
    case "task":
      return "Task assigned";
    case "approval":
      return "Approval step";
    case "automation":
      return "Automation executed";
    case "end":
      return "Workflow completed";
  }
}

function validateWorkflow(payload: WorkflowPayload): SimulationLog[] {
  const logs: SimulationLog[] = [];
  const startNodes = payload.nodes.filter((node) => node.type === "start");
  const endNodes = payload.nodes.filter((node) => node.type === "end");

  if (startNodes.length === 0) {
    logs.push(createValidationLog(logs.length + 1, "Workflow must include a Start node."));
  }

  if (endNodes.length === 0) {
    logs.push(createValidationLog(logs.length + 1, "Workflow must include an End node."));
  }

  if (startNodes.length === 0 || endNodes.length === 0) {
    return logs;
  }

  const adjacencyList = buildAdjacencyList(payload);

  const visited = new Set<string>();
  const stack = [startNodes[0].id];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || visited.has(current)) {
      continue;
    }

    visited.add(current);

    const nextNodeIds = adjacencyList.get(current) ?? [];
    for (let index = nextNodeIds.length - 1; index >= 0; index -= 1) {
      stack.push(nextNodeIds[index]);
    }
  }

  const disconnectedNodes = payload.nodes.filter((node) => !visited.has(node.id));
  if (disconnectedNodes.length > 0) {
    logs.push(
      createValidationLog(
        logs.length + 1,
        `Disconnected nodes found: ${disconnectedNodes
          .map((node) => getNodeTitle(node.data))
          .join(", ")}.`
      )
    );
  }

  const reachableEnd = endNodes.some((node) => visited.has(node.id));
  if (!reachableEnd) {
    logs.push(
      createValidationLog(logs.length + 1, "No path from Start reaches an End node.")
    );
  }

  return logs;
}

function traverseWorkflow(payload: WorkflowPayload): SimulationLog[] {
  const nodeMap = new Map(payload.nodes.map((node) => [node.id, node]));
  const adjacencyList = buildAdjacencyList(payload);

  const startNode = payload.nodes.find((node) => node.type === "start");
  if (!startNode) {
    return [];
  }

  const logs: SimulationLog[] = [];
  const visited = new Set<string>();
  const queue = [startNode.id];

  while (queue.length > 0) {
    const nodeId = queue.shift();
    if (!nodeId || visited.has(nodeId)) {
      continue;
    }

    const node = nodeMap.get(nodeId);
    if (!node) {
      continue;
    }

    visited.add(nodeId);
    logs.push({
      step: logs.length + 1,
      nodeId: node.id,
      nodeType: node.type as WorkflowNodeType,
      title: getNodeTitle(node.data),
      status: "completed",
      message: createExecutionMessage(node)
    });

    const nextNodeIds = adjacencyList.get(nodeId) ?? [];
    nextNodeIds.forEach((nextNodeId) => {
      if (!visited.has(nextNodeId)) {
        queue.push(nextNodeId);
      }
    });
  }

  return logs;
}

export function simulateWorkflowPayload(payload: WorkflowPayload): SimulationResult {
  const serialized = serializeWorkflow(payload);
  const validationLogs = validateWorkflow(payload);

  if (validationLogs.length > 0) {
    return {
      serialized,
      logs: validationLogs,
      valid: false
    };
  }

  return {
    serialized,
    logs: traverseWorkflow(payload),
    valid: true
  };
}
