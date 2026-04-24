"use client";

import { useEffect } from "react";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn
} from "react-hook-form";
import { useWorkflowStore } from "@/store/workflow-store";
import type { WorkflowNodeOfType, WorkflowNodeType } from "@/types/workflow";

type UseNodeFormOptions<T extends WorkflowNodeType, TValues extends FieldValues> = {
  node: WorkflowNodeOfType<T>;
  options?: UseFormProps<TValues>;
  toStoreData: (values: TValues) => WorkflowNodeOfType<T>["data"];
};

export function useNodeForm<T extends WorkflowNodeType, TValues extends FieldValues>({
  node,
  options,
  toStoreData
}: UseNodeFormOptions<T, TValues>): UseFormReturn<TValues> {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const form = useForm<TValues>({
    ...(options ?? {}),
    defaultValues: node.data as DefaultValues<TValues>
  });

  useEffect(() => {
    form.reset(node.data as DefaultValues<TValues>);
  }, [form, node.id]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateNodeData(node.id, toStoreData(value as TValues));
    });

    return () => subscription.unsubscribe();
  }, [form, node.id, toStoreData, updateNodeData]);

  return form;
}
