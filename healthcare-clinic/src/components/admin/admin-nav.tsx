"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/doctors", label: "Doctors" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-[2rem] border border-teal-100 bg-white/90 p-5 shadow-[0_20px_60px_-42px_rgba(15,118,110,0.5)] lg:sticky lg:top-8 lg:w-72 lg:self-start dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-none">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="font-heading text-2xl text-teal-900 dark:text-teal-100">Harbor Admin</div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Clinic operations overview</p>
        </div>
        <ThemeToggle />
      </div>
      <nav aria-label="Admin navigation" className="space-y-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "block rounded-2xl px-4 py-3 text-sm font-semibold transition",
                active
                  ? "bg-teal-700 text-white shadow-lg shadow-teal-700/20 dark:bg-teal-600"
                  : "bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-teal-950/60 dark:hover:text-teal-200",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
