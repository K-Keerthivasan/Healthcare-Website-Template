"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/book-appointment", label: "Book Appointment" },
  { href: "/faq", label: "Patient FAQ" },
];

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur">
      <div className="shell flex h-20 items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-teal-700 text-lg font-black text-white">
            H
          </div>
          <div>
            <div className="font-heading text-xl text-teal-900">Harbor Health</div>
            <div className="text-xs tracking-[0.28em] text-slate-500 uppercase">Premium Clinic</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Button asChild className="h-11 rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800">
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
    </header>
  );
}
