"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarBlank, ClockCountdown, CheckCircle, XCircle, SignOut } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appointments, doctors } from "@/lib/mock-data";
import type { Appointment, AppointmentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── Auth form ───────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

// Mock patient — in production this comes from Supabase Auth
const MOCK_PATIENT = { email: "maya@example.com", name: "Maya Thompson" };

function LoginForm({ onLogin }: { onLogin: (email: string) => void }) {
  const [error, setError] = useState("");
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginValues) => {
    // Mock auth — accept the demo account or any email/password combo
    if (values.email === MOCK_PATIENT.email || values.password.length >= 6) {
      onLogin(values.email);
    } else {
      setError("Invalid credentials. Use the demo account below.");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="surface p-8 dark:border-slate-700/60 dark:bg-slate-900/80">
        <Badge>Patient Portal</Badge>
        <h1 className="mt-5 text-4xl text-teal-950 dark:text-teal-50">Sign in to your portal</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
          Access your upcoming appointments, past visits, and health records.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 space-y-4" noValidate>
          <div>
            <label htmlFor="portal-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email
            </label>
            <Input
              id="portal-email"
              {...form.register("email")}
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
            />
            {form.formState.errors.email && (
              <div role="alert" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
                {form.formState.errors.email.message}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="portal-password" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Input
              id="portal-password"
              {...form.register("password")}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {form.formState.errors.password && (
              <div role="alert" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
                {form.formState.errors.password.message}
              </div>
            )}
          </div>

          {error && (
            <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="h-12 w-full rounded-full bg-teal-700 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            Sign in
          </Button>
        </form>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
          <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">Demo account</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Email: <span className="font-semibold text-slate-800 dark:text-slate-200">{MOCK_PATIENT.email}</span>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Password: <span className="font-semibold text-slate-800 dark:text-slate-200">any 6+ chars</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

type Tab = "upcoming" | "past";

function Dashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [cancelled, setCancelled] = useState<Set<string>>(new Set());

  const patientName = email === MOCK_PATIENT.email ? MOCK_PATIENT.name : email.split("@")[0];

  // Show all appointments for the demo — in production filter by auth user
  const allApts = appointments.map((apt) =>
    cancelled.has(apt.id) ? { ...apt, status: "Rescheduled" as AppointmentStatus } : apt,
  );

  const upcoming = allApts.filter(
    (a) => a.status === "Confirmed" || a.status === "Pending",
  );
  const past = allApts.filter(
    (a) => a.status === "Completed" || a.status === "Rescheduled",
  );

  const handleCancel = (id: string) => {
    setCancelled((prev) => new Set([...prev, id]));
  };

  return (
    <div className="shell py-14 sm:py-20">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <Badge>Patient Portal</Badge>
          <h1 className="mt-4 text-4xl text-teal-950 sm:text-5xl dark:text-teal-50">
            Welcome back, {patientName.split(" ")[0]}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{email}</p>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="flex items-center gap-2 rounded-full border-slate-200 px-4 text-sm dark:border-slate-700 dark:text-slate-300"
        >
          <SignOut size={16} aria-hidden="true" />
          Sign out
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard value={upcoming.length.toString()} label="Upcoming appointments" />
        <StatCard value={past.filter((a) => a.status === "Completed").length.toString()} label="Past visits" />
        <StatCard value={cancelled.size.toString()} label="Cancelled this session" />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2" role="tablist" aria-label="Appointments">
        {(["upcoming", "past"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            aria-controls={`tabpanel-${t}`}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold capitalize transition",
              tab === t
                ? "bg-teal-700 text-white dark:bg-teal-600"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
            )}
          >
            {t} ({t === "upcoming" ? upcoming.length : past.length})
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`tabpanel-${tab}`}
        aria-label={tab === "upcoming" ? "Upcoming appointments" : "Past appointments"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tab === "upcoming" ? (
              upcoming.length === 0 ? (
                <EmptyState message="No upcoming appointments. Book one below." href="/book-appointment" />
              ) : (
                <div className="space-y-4">
                  {upcoming.map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      apt={apt}
                      showCancel
                      onCancel={() => handleCancel(apt.id)}
                      isCancelled={cancelled.has(apt.id)}
                    />
                  ))}
                </div>
              )
            ) : (
              past.length === 0 ? (
                <EmptyState message="No past visits on record yet." />
              ) : (
                <div className="space-y-4">
                  {past.map((apt) => (
                    <AppointmentCard key={apt.id} apt={apt} showCancel={false} isCancelled={cancelled.has(apt.id)} />
                  ))}
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AppointmentCard({
  apt,
  showCancel,
  onCancel,
  isCancelled,
}: {
  apt: Appointment;
  showCancel: boolean;
  onCancel?: () => void;
  isCancelled: boolean;
}) {
  const doctor = doctors.find((d) => d.id === apt.doctorId);

  const statusStyles: Record<AppointmentStatus, string> = {
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
    Pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
    Rescheduled: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900",
    Completed: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  };

  return (
    <div className="surface p-5 sm:p-6 dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-900/60 dark:text-teal-400">
            <CalendarBlank size={22} weight="duotone" aria-hidden="true" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100">{doctor?.name ?? "Unknown Doctor"}</div>
            <div className="text-sm text-teal-700 dark:text-teal-400">{apt.specialty}</div>
            <div className="mt-1 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{apt.date}</span>
              <span aria-hidden="true">·</span>
              <span>{apt.time}</span>
            </div>
            {apt.notes && (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{apt.notes}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold",
              isCancelled ? statusStyles.Rescheduled : statusStyles[apt.status],
            )}
          >
            {isCancelled ? "Cancelled" : apt.status}
          </span>
          {showCancel && !isCancelled && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="h-9 rounded-full border-rose-200 px-4 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-950/40"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="surface p-5 dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="font-heading text-4xl text-teal-950 dark:text-teal-100">{value}</div>
      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function EmptyState({ message, href }: { message: string; href?: string }) {
  return (
    <div className="surface flex flex-col items-center justify-center gap-4 p-12 text-center dark:border-slate-700/60 dark:bg-slate-900/80">
      <ClockCountdown size={40} weight="duotone" className="text-teal-200 dark:text-teal-800" aria-hidden="true" />
      <p className="text-slate-500 dark:text-slate-400">{message}</p>
      {href && (
        <Button asChild className="h-11 rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500">
          <a href={href}>Book an appointment</a>
        </Button>
      )}
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function PatientPortal() {
  const [session, setSession] = useState<string | null>(null);

  if (!session) {
    return (
      <main id="main-content" className="shell py-14 sm:py-20">
        <LoginForm onLogin={setSession} />
      </main>
    );
  }

  return (
    <main id="main-content">
      <Dashboard email={session} onLogout={() => setSession(null)} />
    </main>
  );
}
