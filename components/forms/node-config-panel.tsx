"use client";

import { Trash2 } from "lucide-react";
import { ApprovalNodeForm } from "@/components/forms/approval-node-form";
import { AutomationNodeForm } from "@/components/forms/automation-node-form";
import { EndNodeForm } from "@/components/forms/end-node-form";
import { StartNodeForm } from "@/components/forms/start-node-form";
import { TaskNodeForm } from "@/components/forms/task-node-form";
import { Button } from "@/components/ui/button";
import { useWorkflowStore } from "@/store/workflow-store";
import type { WorkflowNodeOfType, WorkflowNodeType } from "@/types/workflow";

type FormComponentMap = {
  [K in WorkflowNodeType]: (props: { node: WorkflowNodeOfType<K> }) => JSX.Element;
};

const FORM_MAP: FormComponentMap = {
  start: StartNodeForm,
  task: TaskNodeForm,
  approval: ApprovalNodeForm,
  automation: AutomationNodeForm,
  end: EndNodeForm
};

function renderNodeForm<T extends WorkflowNodeType>(node: WorkflowNodeOfType<T>) {
  const FormComponent = FORM_MAP[node.type as T] as (props: {
    node: WorkflowNodeOfType<T>;
  }) => JSX.Element;

  return <FormComponent node={node} />;
}

export function NodeConfigPanel() {
  const nodes = useWorkflowStore((state) => state.nodes);
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);
  const removeSelectedNode = useWorkflowStore((state) => state.removeSelectedNode);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l border-white/10 bg-card/80 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="text-base font-semibold">Configuration</h2>
          <p className="text-sm text-muted-foreground">
            {selectedNode ? `${selectedNode.type} node` : "No node selected"}
          </p>
        </div>
        {selectedNode ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={removeSelectedNode}
            aria-label="Delete selected node"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        {!selectedNode ? (
          <div className="rounded-lg border border-dashed border-white/15 bg-white/5 p-4 text-sm text-muted-foreground">
            Select a node on the canvas to edit its fields.
          </div>
        ) : null}
        {selectedNode ? renderNodeForm(selectedNode as never) : null}
      </div>
    </aside>
  );
}
