"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange
} from "reactflow";
import { create } from "zustand";
import { createDefaultNodeData } from "@/lib/node-defaults";
import type { WorkflowEdge, WorkflowNode } from "@/types/workflow";
import type { WorkflowStoreState } from "@/types/workflow-store";

const starterNodes: WorkflowNode[] = [
  {
    id: "start-1",
    type: "start",
    position: { x: 120, y: 160 },
    data: createDefaultNodeData("start")
  },
  {
    id: "end-1",
    type: "end",
    position: { x: 560, y: 160 },
    data: createDefaultNodeData("end")
  }
];

const starterEdges: WorkflowEdge[] = [
  {
    id: "start-1-end-1",
    source: "start-1",
    target: "end-1",
    animated: true
  }
];

const updateNodeChanges = (changes: NodeChange[], nodes: WorkflowNode[]) =>
  applyNodeChanges(changes, nodes) as WorkflowNode[];

export const useWorkflowStore = create<WorkflowStoreState>((set, get) => ({
  nodes: starterNodes,
  edges: starterEdges,
  selectedNodeId: null,
  automationOptions: [],
  simulation: {
    logs: [],
    serialized: "",
    valid: null,
    isRunning: false
  },

  updateNodes: (changes) => {
    set({
      nodes: updateNodeChanges(changes, get().nodes)
    });
  },

  updateEdges: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    });
  },

  connectNodes: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, animated: true }, get().edges)
    });
  },

  createNode: (type, position) => {
    const nodeId = `${type}-${crypto.randomUUID()}`;

    set({
      nodes: [
        ...get().nodes,
        {
          id: nodeId,
          type,
          position,
          data: createDefaultNodeData(type)
        }
      ],
      selectedNodeId: nodeId
    });
  },

  selectNode: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },

  updateNodeData: (nodeId, nextData) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: nextData } : node
      )
    });
  },

  removeSelectedNode: () => {
    const { selectedNodeId } = get();
    if (!selectedNodeId) {
      return;
    }

    get().deleteNode(selectedNodeId);
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNodeId:
        get().selectedNodeId === nodeId ? null : get().selectedNodeId
    });
  },

  setAutomationOptions: (automationOptions) => {
    set({ automationOptions });
  },

  applySimulationResult: (result) => {
    set({
      simulation: {
        ...get().simulation,
        logs: result.logs,
        serialized: result.serialized,
        valid: result.valid
      }
    });
  },

  setSimulationPending: (isRunning) => {
    set({
      simulation: {
        ...get().simulation,
        isRunning
      }
    });
  }
}));
