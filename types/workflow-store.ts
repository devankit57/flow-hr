import type { Connection, EdgeChange, NodeChange } from "reactflow";
import type {
  AutomationAction,
  SimulationResult,
  WorkflowCanvasPosition,
  WorkflowEdge,
  WorkflowNode,
  WorkflowNodeData,
  WorkflowNodeType,
  WorkflowSimulationState
} from "@/types/workflow";

export type WorkflowStoreState = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  automationOptions: AutomationAction[];
  simulation: WorkflowSimulationState;
  updateNodes: (changes: NodeChange[]) => void;
  updateEdges: (changes: EdgeChange[]) => void;
  connectNodes: (connection: Connection) => void;
  createNode: (type: WorkflowNodeType, position: WorkflowCanvasPosition) => void;
  selectNode: (nodeId: string | null) => void;
  updateNodeData: (nodeId: string, data: WorkflowNodeData) => void;
  removeSelectedNode: () => void;
  deleteNode: (nodeId: string) => void;
  setAutomationOptions: (automations: AutomationAction[]) => void;
  applySimulationResult: (result: SimulationResult) => void;
  setSimulationPending: (isRunning: boolean) => void;
};
