import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-teal-700 uppercase dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-400",
        className,
      )}
      {...props}
    />
  );
}
