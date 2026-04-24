"use client";

import { ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";
import { SmokeBackground } from "@/components/smoke-background";

const loginHighlights = [
  {
    icon: Workflow,
    title: "Design workflows visually",
    description: "Create HR flows with drag-and-drop steps and live configuration."
  },
  {
    icon: ShieldCheck,
    title: "Secure Google access",
    description: "Use your Google account to enter the workspace safely."
  },
  {
    icon: Sparkles,
    title: "Run quick simulations",
    description: "Validate and preview how each workflow moves from start to finish."
  }
];

function LoginFeatureGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {loginHighlights.map((highlight) => {
        const Icon = highlight.icon;

        return (
          <div
            key={highlight.title}
            className="rounded-lg border border-white/14 bg-white/8 p-4 backdrop-blur-sm"
          >
            <div className="mb-3 inline-flex rounded-md bg-white/12 p-2">
              <Icon className="h-4 w-4 text-cyan-100" />
            </div>
            <h2 className="text-sm font-semibold text-white">{highlight.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/68">
              {highlight.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function LoginScreen() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#071013] text-white">
      <div className="absolute inset-0">
        <SmokeBackground smokeColor="#2bb8b4" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_38%),linear-gradient(180deg,rgba(7,16,19,0.24),rgba(7,16,19,0.84))]" />

      <div className="relative z-10 flex min-h-screen flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">FlowHR</div>
            <div className="mt-1 text-sm text-white/72">
              Coordinate onboarding, approvals, and automation in one place.
            </div>
          </div>
        </header>

        <div className="flex flex-1 items-center">
          <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-end">
            <section className="max-w-2xl space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-cyan-200/85">
                  Google Sign-In Required
                </p>
                <h1 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                  FLOWHR
                </h1>
                <p className="max-w-xl text-base leading-7 text-white/76 sm:text-lg">
                  Sign in to access the workflow canvas, node configuration tools,
                  and simulation panel for your HR processes.
                </p>
              </div>

              <LoginFeatureGrid />
            </section>

            <section className="rounded-lg border border-white/14 bg-black/24 p-6 shadow-2xl backdrop-blur-md sm:p-7">
              <div className="space-y-3">
                <div className="text-sm font-medium uppercase tracking-[0.12em] text-cyan-200/85">
                  Access Workspace
                </div>
                <h2 className="text-2xl font-semibold text-white">Sign in with Google</h2>
                <p className="text-sm leading-6 text-white/70">
                  Use your Google account to continue into the HR workflow designer.
                </p>
              </div>

              <div className="mt-8">
                <AuthButton
                  className="h-11 w-full bg-white text-slate-950 hover:bg-white/92"
                  showEmail={false}
                />
              </div>

              <p className="mt-5 text-xs leading-5 text-white/54">
                By continuing, you will be redirected to Google for authentication.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
