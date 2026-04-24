"use client";

import Link from "next/link";
import { LifeBuoy, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { AuthButton } from "@/components/AuthButton";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    href: "/",
    label: "Workspace",
    icon: LayoutDashboard
  },
  {
    href: "/help",
    label: "Help",
    icon: LifeBuoy
  }
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-card/80 px-6 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-base font-semibold">
          FlowHR
        </Link>
        <nav className="flex items-center gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <AuthButton />
    </header>
  );
}
