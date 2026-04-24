import { AuthButton } from "@/components/AuthButton";
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
      <header className="flex items-center justify-between border-b border-white/10 bg-card/80 px-6 py-3 backdrop-blur-xl">
        <h1 className="text-base font-semibold">FlowHR</h1>
        <AuthButton />
      </header>
      <div className="min-h-0 flex-1">
        <WorkflowDesigner />
      </div>
    </div>
  );
}
