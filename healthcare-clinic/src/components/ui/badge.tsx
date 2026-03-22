import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-teal-700 uppercase",
        className,
      )}
      {...props}
    />
  );
}
