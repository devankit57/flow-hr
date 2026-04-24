"use client";

import { Handle, Position, type NodeProps } from "reactflow";
import { cn } from "@/lib/utils";
import { getNodeTitle } from "@/lib/node-defaults";
import { nodeRegistry } from "@/lib/node-registry";
import type { WorkflowNodeData, WorkflowNodeType } from "@/types/workflow";

type WorkflowNodeProps = NodeProps<WorkflowNodeData>;

export function WorkflowNode({ data, type, selected }: WorkflowNodeProps) {
  const workflowType = type as WorkflowNodeType;
  const definition = nodeRegistry[workflowType];
  const Icon = definition.icon;

  return (
    <div
      className={cn(
        "min-w-52 rounded-lg border-2 px-3 py-3 shadow-sm transition-all duration-150",
        definition.nodeClassName,
        selected &&
          "border-primary shadow-lg ring-2 ring-ring ring-offset-2 ring-offset-background"
      )}
    >
      {workflowType !== "start" && <Handle type="target" position={Position.Left} />}
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-white/10 p-2 shadow-sm shadow-black/10">
          <Icon className="h-4 w-4 shrink-0" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", definition.accentClassName)} />
            <div className="truncate text-sm font-semibold">{getNodeTitle(data)}</div>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-white/60">
            {definition.label}
          </div>
        </div>
      </div>
      {workflowType !== "end" && <Handle type="source" position={Position.Right} />}
    </div>
  );
}
