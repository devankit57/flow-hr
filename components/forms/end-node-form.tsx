"use client";

import { Controller } from "react-hook-form";
import { FormRow } from "@/components/forms/form-row";
import { useNodeForm } from "@/components/forms/use-node-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { EndNodeData, WorkflowNodeOfType } from "@/types/workflow";

function toEndNodeData(values: EndNodeData): EndNodeData {
  return {
    endMessage: values.endMessage ?? "",
    showSummary: Boolean(values.showSummary)
  };
}

export function EndNodeForm({ node }: { node: WorkflowNodeOfType<"end"> }) {
  const form = useNodeForm<"end", EndNodeData>({
    node,
    toStoreData: toEndNodeData
  });

  return (
    <form className="space-y-5">
      <FormRow id="end-message" label="End Message">
        <Textarea id="end-message" {...form.register("endMessage")} />
      </FormRow>
      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label htmlFor="summary-toggle">Show Summary</Label>
        <Controller
          control={form.control}
          name="showSummary"
          render={({ field }) => (
            <Switch
              id="summary-toggle"
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>
    </form>
  );
}
