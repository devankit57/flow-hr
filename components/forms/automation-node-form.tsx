"use client";

import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { FormRow } from "@/components/forms/form-row";
import { FormSection } from "@/components/forms/form-section";
import { useNodeForm } from "@/components/forms/use-node-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useWorkflowStore } from "@/store/workflow-store";
import type { AutomationNodeData, WorkflowNodeOfType } from "@/types/workflow";

function normalizeParameters(
  parameters: Partial<Record<string, string>> | undefined
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(parameters ?? {}).map(([key, value]) => [key, value ?? ""])
  );
}

function toAutomationNodeData(values: AutomationNodeData): AutomationNodeData {
  return {
    title: values.title ?? "",
    action: values.action ?? "",
    parameters: normalizeParameters(values.parameters)
  };
}

export function AutomationNodeForm({
  node
}: {
  node: WorkflowNodeOfType<"automation">;
}) {
  const automations = useWorkflowStore((state) => state.automationOptions);
  const form = useNodeForm<"automation", AutomationNodeData>({
    node,
    toStoreData: toAutomationNodeData
  });
  const selectedActionId = useWatch({
    control: form.control,
    name: "action"
  });
  const selectedAction = automations.find(
    (automation) => automation.id === selectedActionId
  );

  useEffect(() => {
    if (!selectedAction) {
      form.setValue("parameters", {}, { shouldDirty: true, shouldValidate: true });
      return;
    }

    const currentParameters = form.getValues("parameters") ?? {};
    const nextParameters = selectedAction.params.reduce<Record<string, string>>(
      (acc, param) => {
        acc[param] = currentParameters[param] ?? "";
        return acc;
      },
      {}
    );

    form.setValue("parameters", nextParameters, {
      shouldDirty: true,
      shouldValidate: true
    });
  }, [form, selectedAction]);

  return (
    <form className="space-y-5">
      <FormRow id="automation-title" label="Title">
        <Input id="automation-title" {...form.register("title")} />
      </FormRow>
      <FormRow id="automation-action" label="Action">
        <Select id="automation-action" {...form.register("action")}>
          <option value="">Select action</option>
          {automations.map((automation) => (
            <option key={automation.id} value={automation.id}>
              {automation.label}
            </option>
          ))}
        </Select>
      </FormRow>
      {selectedAction ? (
        <FormSection title="Parameters">
          {selectedAction.params.map((param) => (
            <FormRow key={param} id={`automation-param-${param}`} label={param}>
              <Input
                id={`automation-param-${param}`}
                {...form.register(`parameters.${param}`)}
              />
            </FormRow>
          ))}
        </FormSection>
      ) : null}
    </form>
  );
}
