"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { appointments, doctors } from "@/lib/mock-data";
import type { Appointment } from "@/lib/types";
import { cn } from "@/lib/utils";

const dates = ["2026-03-21", "2026-03-22", "2026-03-23", "2026-03-24", "2026-03-25", "2026-03-26", "2026-03-27"];

export function AppointmentsManager() {
  const [view, setView] = useState<"day" | "week">("week");
  const [activeDate, setActiveDate] = useState("2026-03-21");
  const [selected, setSelected] = useState<Appointment>(appointments[0]);

  const visibleAppointments = useMemo(() => {
    if (view === "day") {
      return appointments.filter((appointment) => appointment.date === activeDate);
    }

    return appointments.filter((appointment) => dates.includes(appointment.date));
  }, [activeDate, view]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="surface p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl text-teal-950">Appointments calendar</h2>
            <p className="mt-2 text-sm text-slate-500">Toggle between focused daily scheduling and a full weekly overview.</p>
          </div>
          <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setView("day")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                view === "day" ? "bg-teal-700 text-white" : "text-slate-600",
              )}
            >
              Day
            </button>
            <button
              type="button"
              onClick={() => setView("week")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                view === "week" ? "bg-teal-700 text-white" : "text-slate-600",
              )}
            >
              Week
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-7">
          {dates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => setActiveDate(date)}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left text-sm transition",
                activeDate === date ? "border-teal-700 bg-teal-50" : "border-slate-200 bg-white hover:border-teal-200",
              )}
            >
              <div className="font-semibold text-slate-900">{formatDate(date)}</div>
              <div className="mt-1 text-slate-500">
                {appointments.filter((appointment) => appointment.date === date).length} bookings
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {visibleAppointments.map((appointment) => {
            const doctor = doctors.find((item) => item.id === appointment.doctorId);
            return (
              <button
                type="button"
                key={appointment.id}
                className={cn(
                  "grid w-full gap-3 rounded-[1.5rem] border p-4 text-left transition md:grid-cols-[140px_1fr_120px]",
                  selected.id === appointment.id
                    ? "border-teal-700 bg-teal-50"
                    : "border-slate-200 bg-white hover:border-teal-200",
                )}
                onClick={() => setSelected(appointment)}
              >
                <div className="text-sm font-semibold text-teal-800">{appointment.time}</div>
                <div>
                  <div className="font-semibold text-slate-900">{appointment.patientName}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    {doctor?.name} • {appointment.specialty}
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-500">{appointment.status}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="surface p-6 sm:p-8">
        <h2 className="text-3xl text-teal-950">Appointment detail</h2>
        <p className="mt-2 text-sm text-slate-500">Selected booking information with room for future actions and note management.</p>
        <div className="mt-6 space-y-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
          <DetailRow label="Patient" value={selected.patientName} />
          <DetailRow label="Doctor" value={doctors.find((item) => item.id === selected.doctorId)?.name || ""} />
          <DetailRow label="Specialty" value={selected.specialty} />
          <DetailRow label="Time" value={`${formatDate(selected.date)} at ${selected.time}`} />
          <DetailRow label="Status" value={selected.status} />
          <DetailRow label="Email" value={selected.patientEmail} />
          <DetailRow label="Notes" value={selected.notes} />
        </div>
        <div className="mt-5 flex gap-3">
          <Button className="h-11 rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800">Mark Complete</Button>
          <Button variant="outline" className="h-11 rounded-full border-slate-200 px-5 text-sm">Reschedule</Button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">{label}</div>
      <div className="mt-1 text-sm leading-7 text-slate-700">{value}</div>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
}
