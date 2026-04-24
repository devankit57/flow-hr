"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function FormRow({
  id,
  label,
  children
}: {
  id?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
