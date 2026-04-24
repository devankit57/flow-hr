import { AlertCircle, Bot, GitBranch, PlayCircle, Settings2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { LoginScreen } from "@/components/login-screen";
import { auth } from "@/lib/auth";

const helpSections = [
  {
    title: "Getting Started",
    icon: GitBranch,
    items: [
      "Drag a node from the left sidebar onto the canvas.",
      "Connect steps from left to right to define the workflow path.",
      "Click any node to configure its details in the right panel."
    ]
  },
  {
    title: "Working With Nodes",
    icon: Settings2,
    items: [
      "Start nodes define the entry point for the workflow.",
      "Task and Approval nodes capture operational details and review steps.",
      "Automation nodes change their fields based on the selected action."
    ]
  },
  {
    title: "Simulation",
    icon: PlayCircle,
    items: [
      "Use the simulation panel to serialize the workflow and inspect execution logs.",
      "The simulator checks for missing Start or End nodes.",
      "Disconnected steps are highlighted through validation warnings."
    ]
  },
  {
    title: "Automation Actions",
    icon: Bot,
    items: [
      "Available automation actions come from the mock API.",
      "Each action exposes its own required parameter fields.",
      "Changing the selected action refreshes those inputs automatically."
    ]
  }
];

const troubleshootingItems = [
  "If a node form is empty, click the node again to refresh selection state.",
  "If simulation fails, confirm the workflow includes both Start and End nodes.",
  "If a node cannot be reached, verify its incoming and outgoing edges.",
  "If Google sign-in fails locally, check your .env.local credentials and callback URL."
];

export default async function HelpPage() {
  const session = await auth();

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-8">
        <section className="rounded-lg border border-white/10 bg-card/70 p-6 backdrop-blur-xl">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-cyan-200/85">
              Help Center
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Using FlowHR effectively
            </h1>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              This guide covers the main workflow builder flow, what each area of
              the product does, and a few practical checks when something looks off.
            </p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {helpSections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="rounded-lg border border-white/10 bg-card/70 p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-md bg-white/10 p-2">
                    <Icon className="h-4 w-4 text-cyan-100" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item} className="rounded-md bg-white/5 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <section className="rounded-lg border border-white/10 bg-card/70 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-md bg-amber-500/15 p-2">
              <AlertCircle className="h-4 w-4 text-amber-200" />
            </div>
            <h2 className="text-lg font-semibold text-white">Troubleshooting</h2>
          </div>
          <ul className="grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            {troubleshootingItems.map((item) => (
              <li key={item} className="rounded-md bg-white/5 px-3 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
