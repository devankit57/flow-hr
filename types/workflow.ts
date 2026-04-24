import type { Edge, Node } from "reactflow";

export type WorkflowNodeType =
  | "start"
  | "task"
  | "approval"
  | "automation"
  | "end";

export type WorkflowCanvasPosition = {
  x: number;
  y: number;
};

export type KeyValueField = {
  id: string;
  key: string;
  value: string;
};

export type StartNodeData = {
  title: string;
  metadata: KeyValueField[];
};

export type TaskNodeData = {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: KeyValueField[];
};

export type ApprovalNodeData = {
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
};

export type AutomationNodeData = {
  title: string;
  action: string;
  parameters: Record<string, string>;
};

export type EndNodeData = {
  endMessage: string;
  showSummary: boolean;
};

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomationNodeData
  | EndNodeData;

export type WorkflowNodeDataMap = {
  start: StartNodeData;
  task: TaskNodeData;
  approval: ApprovalNodeData;
  automation: AutomationNodeData;
  end: EndNodeData;
};

export type WorkflowNode = Node<WorkflowNodeData, WorkflowNodeType>;
export type WorkflowNodeOfType<T extends WorkflowNodeType> = Node<
  WorkflowNodeDataMap[T],
  T
>;
export type WorkflowEdge = Edge;

export type AutomationAction = {
  id: string;
  label: string;
  params: string[];
};

export type SimulationLog = {
  step: number;
  nodeId: string;
  nodeType: WorkflowNodeType;
  title: string;
  status: "completed" | "skipped" | "warning";
  message: string;
};

export type SimulationResult = {
  serialized: string;
  logs: SimulationLog[];
  valid: boolean;
};

export type WorkflowSimulationState = {
  logs: SimulationLog[];
  serialized: string;
  valid: boolean | null;
  isRunning: boolean;
};

export type WorkflowPayload = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};
