import { Badge } from "@/components/ui/badge";
import { AppointmentsManager } from "@/components/admin/appointments-manager";

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge>Appointments Manager</Badge>
        <h1 className="mt-5 text-5xl text-teal-950">Day and week scheduling</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Calendar-style management with a focused detail panel for patient, doctor, notes, and booking status.
        </p>
      </div>
      <AppointmentsManager />
    </div>
  );
}
