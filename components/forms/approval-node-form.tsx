"use client";

import { FormRow } from "@/components/forms/form-row";
import { useNodeForm } from "@/components/forms/use-node-form";
import { Input } from "@/components/ui/input";
import type { ApprovalNodeData, WorkflowNodeOfType } from "@/types/workflow";

function toApprovalNodeData(values: ApprovalNodeData): ApprovalNodeData {
  return {
    title: values.title ?? "",
    approverRole: values.approverRole ?? "",
    autoApproveThreshold: Number(values.autoApproveThreshold ?? 0)
  };
}

export function ApprovalNodeForm({
  node
}: {
  node: WorkflowNodeOfType<"approval">;
}) {
  const form = useNodeForm({
    node,
    toStoreData: toApprovalNodeData
  });

  return (
    <form className="space-y-5">
      <FormRow id="approval-title" label="Title">
        <Input id="approval-title" {...form.register("title")} />
      </FormRow>
      <FormRow id="approval-role" label="Approver Role">
        <Input id="approval-role" {...form.register("approverRole")} />
      </FormRow>
      <FormRow id="approval-threshold" label="Auto-Approve Threshold">
        <Input
          id="approval-threshold"
          type="number"
          min={0}
          {...form.register("autoApproveThreshold", { valueAsNumber: true })}
        />
      </FormRow>
    </form>
  );
}
