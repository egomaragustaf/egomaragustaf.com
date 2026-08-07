"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackButton({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className={cn(
        "cursor-pointer mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100",
        className,
      )}
    >
      <ArrowLeft className="size-4" />
      {label ?? "Back"}
    </button>
  );
}
