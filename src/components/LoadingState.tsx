"use client";

import { cn } from "@/lib/utils";

type LoadingStateProps = {
  message?: string;
  fullScreen?: boolean;
  className?: string;
};

export default function LoadingState({
  message = "Loading…",
  fullScreen = true,
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-4 text-center",
        fullScreen ? "min-h-screen" : "py-6",
        className
      )}
    >
      <span className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
