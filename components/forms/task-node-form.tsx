"use client";

import { FormRow } from "@/components/forms/form-row";
import { KeyValueFieldArray } from "@/components/forms/key-value-field-array";
import { useNodeForm } from "@/components/forms/use-node-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TaskNodeData, WorkflowNodeOfType } from "@/types/workflow";

function toTaskNodeData(values: TaskNodeData): TaskNodeData {
  return {
    title: values.title ?? "",
    description: values.description ?? "",
    assignee: values.assignee ?? "",
    dueDate: values.dueDate ?? "",
    customFields: values.customFields ?? []
  };
}

export function TaskNodeForm({ node }: { node: WorkflowNodeOfType<"task"> }) {
  const form = useNodeForm<"task", TaskNodeData>({
    node,
    options: {
      mode: "onChange"
    },
    toStoreData: toTaskNodeData
  });

  return (
    <form className="space-y-5">
      <FormRow id="task-title" label="Title *">
        <Input id="task-title" {...form.register("title", { required: true })} />
      </FormRow>
      <FormRow id="task-description" label="Description">
        <Textarea id="task-description" {...form.register("description")} />
      </FormRow>
      <FormRow id="task-assignee" label="Assignee">
        <Input id="task-assignee" {...form.register("assignee")} />
      </FormRow>
      <FormRow id="task-due-date" label="Due Date">
        <Input id="task-due-date" type="date" {...form.register("dueDate")} />
      </FormRow>

      <KeyValueFieldArray
        control={form.control}
        register={form.register}
        name="customFields"
        label="Custom Fields"
        keyPlaceholder="Field"
        valuePlaceholder="Value"
      />
    </form>
  );
}
