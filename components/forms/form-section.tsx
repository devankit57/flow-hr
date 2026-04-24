"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormSection({
  title,
  children,
  className
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}
