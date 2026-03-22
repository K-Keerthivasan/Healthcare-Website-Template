import { Badge } from "@/components/ui/badge";
import { appointments, doctors } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  const todaysAppointments = appointments.filter((appointment) => appointment.date === "2026-03-21");
  const pendingBookings = appointments.filter((appointment) => appointment.status === "Pending").length;
  const doctorsOnDuty = new Set(todaysAppointments.map((appointment) => appointment.doctorId)).size;

  return (
    <div className="space-y-6">
      <div>
        <Badge>Dashboard</Badge>
        <h1 className="mt-5 text-5xl text-teal-950">Clinic operations at a glance</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          A clean admin dashboard with today’s appointments, patient counts, coverage, and booking backlog.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's appointments" value={todaysAppointments.length.toString()} />
        <StatCard label="Total patients" value="248" />
        <StatCard label="Doctors on duty" value={doctorsOnDuty.toString()} />
        <StatCard label="Pending requests" value={pendingBookings.toString()} />
      </div>

      <div className="surface p-6 sm:p-8">
        <h2 className="text-3xl text-teal-950">Today’s appointments</h2>
        <div className="mt-6 space-y-3">
          {todaysAppointments.map((appointment) => {
            const doctor = doctors.find((item) => item.id === appointment.doctorId);
            return (
              <div
                key={appointment.id}
                className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[120px_1fr_120px]"
              >
                <div className="font-semibold text-teal-800">{appointment.time}</div>
                <div>
                  <div className="font-semibold text-slate-900">{appointment.patientName}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    {doctor?.name} • {appointment.notes}
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-500">{appointment.status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-6">
      <div className="text-sm tracking-[0.18em] text-slate-500 uppercase">{label}</div>
      <div className="mt-3 font-heading text-5xl text-teal-950">{value}</div>
    </div>
  );
}
