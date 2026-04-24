import { AppHeader } from "@/components/app-header";
import { LoginScreen } from "@/components/login-screen";
import { WorkflowDesigner } from "@/components/layout/workflow-designer";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <AppHeader />
      <div className="min-h-0 flex-1">
        <WorkflowDesigner />
      </div>
    </div>
  );
}
