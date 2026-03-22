import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100",
        className,
      )}
      {...props}
    />
  );
}
