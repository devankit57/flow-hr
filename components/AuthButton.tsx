"use client";

import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AuthButtonProps = {
  className?: string;
  showEmail?: boolean;
};

export function AuthButton({
  className,
  showEmail = true
}: AuthButtonProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button type="button" variant="outline" disabled className={className}>
        Checking session
      </Button>
    );
  }

  if (!session?.user) {
    return (
      <Button
        type="button"
        onClick={() => signIn("google")}
        className={className}
      >
        <LogIn className="h-4 w-4" />
        Sign in with Google
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {showEmail ? (
        <div className="hidden text-sm text-muted-foreground sm:block">
          {session.user?.email ?? "Signed in"}
        </div>
      ) : null}
      <Button
        type="button"
        variant="outline"
        onClick={() => signOut()}
        className={cn(!showEmail && "w-full", className)}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
