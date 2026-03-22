"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
  { href: "/book-appointment", label: "Book Appointment" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="shell flex h-20 items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Harbor Health – home">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-teal-700 text-lg font-black text-white dark:bg-teal-600">
            H
          </div>
          <div>
            <div className="font-heading text-xl text-teal-900 dark:text-teal-100">Harbor Health</div>
            <div className="text-xs tracking-[0.28em] text-slate-500 uppercase dark:text-slate-400">Premium Clinic</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-teal-50 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            asChild
            className="hidden h-11 rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 lg:inline-flex"
          >
            <Link href="/portal">Patient Portal</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="hidden h-11 rounded-full border-slate-200 px-5 text-sm dark:border-slate-700 dark:text-slate-300 lg:inline-flex"
          >
            <Link href="/admin">Admin</Link>
          </Button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 lg:hidden dark:border-slate-700 dark:text-slate-300"
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white px-6 pb-6 lg:hidden dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="mt-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    active
                      ? "bg-teal-50 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2">
              <Button asChild className="h-11 rounded-full bg-teal-700 text-sm hover:bg-teal-800 dark:bg-teal-600">
                <Link href="/portal" onClick={() => setMobileOpen(false)}>Patient Portal</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-full border-slate-200 text-sm dark:border-slate-700">
                <Link href="/admin" onClick={() => setMobileOpen(false)}>Admin</Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
