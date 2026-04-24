"use client";

import { GripVertical } from "lucide-react";
import type { DragEvent } from "react";
import { cn } from "@/lib/utils";
import { paletteItems } from "@/lib/node-registry";
import type { WorkflowNodeType } from "@/types/workflow";

function onDragStart(event: DragEvent<HTMLButtonElement>, type: WorkflowNodeType) {
  event.dataTransfer.setData("application/reactflow", type);
  event.dataTransfer.effectAllowed = "move";
}

export function NodePalette() {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-white/10 bg-card/80 backdrop-blur-xl">
      <div className="space-y-3 border-b px-5 py-5">
        <div>
          <h1 className="text-lg font-semibold">FlowHR</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Build process maps by dragging steps onto the canvas.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground">
          Connect nodes left to right, then configure each step from the panel on
          the right.
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {paletteItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.type}
              draggable
              onDragStart={(event) => onDragStart(event, item.type)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md",
                item.paletteClassName
              )}
            >
              <div className="mt-0.5 rounded-md bg-white/10 p-2 shadow-sm shadow-black/10">
                <Icon className="h-4 w-4 shrink-0" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <GripVertical className="h-4 w-4 shrink-0 opacity-40" />
                </div>
                <p className="mt-1 text-xs leading-5 text-current/75">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
