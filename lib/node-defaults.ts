import type { WorkflowNodeData, WorkflowNodeType } from "@/types/workflow";

export function createDefaultNodeData(type: WorkflowNodeType): WorkflowNodeData {
  switch (type) {
    case "start":
      return { title: "Start onboarding", metadata: [] };
    case "task":
      return {
        title: "New HR task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: []
      };
    case "approval":
      return {
        title: "Manager approval",
        approverRole: "Manager",
        autoApproveThreshold: 0
      };
    case "automation":
      return {
        title: "Run automation",
        action: "",
        parameters: {}
      };
    case "end":
      return {
        endMessage: "Workflow complete",
        showSummary: true
      };
  }
}

export function getNodeTitle(data: WorkflowNodeData): string {
  if ("title" in data) {
    return data.title || "Untitled";
  }

  return data.endMessage || "End";
}
