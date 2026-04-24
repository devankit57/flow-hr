"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  useFieldArray,
  type Control,
  type FieldArrayPath,
  type FieldValues,
  type UseFormRegister
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSection } from "@/components/forms/form-section";

type KeyValueArrayProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  name: FieldArrayPath<TFieldValues>;
  label: string;
  keyPlaceholder: string;
  valuePlaceholder: string;
};

export function KeyValueFieldArray<TFieldValues extends FieldValues>({
  control,
  register,
  name,
  label,
  keyPlaceholder,
  valuePlaceholder
}: KeyValueArrayProps<TFieldValues>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  return (
    <FormSection title={label}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Add as many entries as needed.
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ id: crypto.randomUUID(), key: "", value: "" } as never)}
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <Input
              placeholder={keyPlaceholder}
              {...register(`${name}.${index}.key` as never)}
            />
            <Input
              placeholder={valuePlaceholder}
              {...register(`${name}.${index}.value` as never)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              aria-label={`Remove ${label}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </FormSection>
  );
}
