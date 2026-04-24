import {
  Bot,
  CheckCircle2,
  CircleStop,
  ClipboardList,
  Play,
  type LucideIcon
} from "lucide-react";
import type { WorkflowNodeType } from "@/types/workflow";

export type NodeRegistryItem = {
  type: WorkflowNodeType;
  label: string;
  description: string;
  icon: LucideIcon;
  paletteClassName: string;
  nodeClassName: string;
  accentClassName: string;
};

export const nodeRegistry: Record<WorkflowNodeType, NodeRegistryItem> = {
  start: {
    type: "start",
    label: "Start Node",
    description: "Entry point for an HR process",
    icon: Play,
    paletteClassName:
      "border-emerald-500/30 bg-emerald-500/12 text-emerald-100 hover:border-emerald-400/45 hover:bg-emerald-500/18",
    nodeClassName: "border-emerald-500/35 bg-emerald-500/12 text-emerald-50",
    accentClassName: "bg-emerald-500"
  },
  task: {
    type: "task",
    label: "Task Node",
    description: "Assign work and capture details",
    icon: ClipboardList,
    paletteClassName:
      "border-sky-500/30 bg-sky-500/12 text-sky-100 hover:border-sky-400/45 hover:bg-sky-500/18",
    nodeClassName: "border-sky-500/35 bg-sky-500/12 text-sky-50",
    accentClassName: "bg-sky-500"
  },
  approval: {
    type: "approval",
    label: "Approval Node",
    description: "Collect manager or role approval",
    icon: CheckCircle2,
    paletteClassName:
      "border-amber-500/30 bg-amber-500/12 text-amber-100 hover:border-amber-400/45 hover:bg-amber-500/18",
    nodeClassName: "border-amber-500/35 bg-amber-500/12 text-amber-50",
    accentClassName: "bg-amber-500"
  },
  automation: {
    type: "automation",
    label: "Automation Node",
    description: "Trigger an automated action",
    icon: Bot,
    paletteClassName:
      "border-fuchsia-500/30 bg-fuchsia-500/12 text-fuchsia-100 hover:border-fuchsia-400/45 hover:bg-fuchsia-500/18",
    nodeClassName: "border-fuchsia-500/35 bg-fuchsia-500/12 text-fuchsia-50",
    accentClassName: "bg-fuchsia-500"
  },
  end: {
    type: "end",
    label: "End Node",
    description: "Finish the workflow cleanly",
    icon: CircleStop,
    paletteClassName:
      "border-rose-500/30 bg-rose-500/12 text-rose-100 hover:border-rose-400/45 hover:bg-rose-500/18",
    nodeClassName: "border-rose-500/35 bg-rose-500/12 text-rose-50",
    accentClassName: "bg-rose-500"
  }
};

export const paletteItems = Object.values(nodeRegistry);
