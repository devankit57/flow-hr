"use client";

import { FormRow } from "@/components/forms/form-row";
import { KeyValueFieldArray } from "@/components/forms/key-value-field-array";
import { useNodeForm } from "@/components/forms/use-node-form";
import { Input } from "@/components/ui/input";
import type { StartNodeData, WorkflowNodeOfType } from "@/types/workflow";

function toStartNodeData(values: StartNodeData): StartNodeData {
  return {
    title: values.title ?? "",
    metadata: values.metadata ?? []
  };
}

export function StartNodeForm({ node }: { node: WorkflowNodeOfType<"start"> }) {
  const form = useNodeForm({
    node,
    toStoreData: toStartNodeData
  });

  return (
    <form className="space-y-5">
      <FormRow id="start-title" label="Title">
        <Input id="start-title" {...form.register("title")} />
      </FormRow>

      <KeyValueFieldArray
        control={form.control}
        register={form.register}
        name="metadata"
        label="Metadata"
        keyPlaceholder="Key"
        valuePlaceholder="Value"
      />
    </form>
  );
}
