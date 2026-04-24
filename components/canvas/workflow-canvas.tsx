"use client";

import { Crosshair, MousePointer2 } from "lucide-react";
import {
  useCallback,
  useMemo,
  type DragEvent,
  type MouseEvent,
  type PropsWithChildren
} from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  type NodeTypes
} from "reactflow";
import { WorkflowNode } from "@/components/canvas/workflow-node";
import { useWorkflowStore } from "@/store/workflow-store";
import type { WorkflowNodeType } from "@/types/workflow";

const nodeTypes: NodeTypes = {
  start: WorkflowNode,
  task: WorkflowNode,
  approval: WorkflowNode,
  automation: WorkflowNode,
  end: WorkflowNode
};

function CanvasStat({
  icon: Icon,
  children
}: PropsWithChildren<{
  icon: typeof MousePointer2;
}>) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function CanvasInner() {
  const {
    nodes,
    edges,
    updateNodes,
    updateEdges,
    connectNodes,
    createNode,
    selectNode,
    selectedNodeId
  } = useWorkflowStore();
  const reactFlow = useReactFlow();
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData(
        "application/reactflow"
      ) as WorkflowNodeType;

      if (!type) {
        return;
      }

      createNode(
        type,
        reactFlow.screenToFlowPosition({ x: event.clientX, y: event.clientY })
      );
    },
    [createNode, reactFlow]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleNodeClick = useCallback(
    (_event: MouseEvent, node: { id: string }) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const handlePaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const defaultEdgeOptions = useMemo(
    () => ({
      animated: true
    }),
    []
  );

  return (
    <div className="relative flex-1 p-4">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-card/78 shadow-xl shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold">Workflow Canvas</h2>
            <p className="text-xs text-muted-foreground">
              Drag from the left panel to add new steps.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CanvasStat icon={MousePointer2}>
              {selectedNode ? "Node selected" : "Canvas ready"}
            </CanvasStat>
            <CanvasStat icon={Crosshair}>
              {nodes.length} nodes
            </CanvasStat>
          </div>
        </div>
        <div className="relative min-h-0 flex-1 bg-[radial-gradient(circle_at_top,rgba(43,184,180,0.12),transparent_30%),linear-gradient(180deg,rgba(10,23,26,0.92),rgba(7,16,19,0.98))]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={updateNodes}
            onEdgesChange={updateEdges}
            onConnect={connectNodes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            deleteKeyCode={["Backspace", "Delete"]}
            fitView
            defaultEdgeOptions={defaultEdgeOptions}
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={20} size={1} color="rgba(124, 223, 217, 0.16)" />
            <MiniMap
              pannable
              zoomable
              className="!bottom-4 !right-4 !rounded-md !border !border-white/10 !bg-[rgba(12,28,31,0.92)] !shadow-md"
              nodeBorderRadius={8}
              maskColor="rgba(8, 16, 19, 0.6)"
            />
            <Controls
              position="bottom-left"
              className="!bottom-4 !left-4 !rounded-md !border !border-white/10 !bg-[rgba(12,28,31,0.92)] !shadow-md"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
