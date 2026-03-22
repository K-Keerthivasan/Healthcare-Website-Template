import { Badge } from "@/components/ui/badge";
import { DoctorsManager } from "@/components/admin/doctors-manager";

export default function AdminDoctorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge>Doctors Manager</Badge>
        <h1 className="mt-5 text-5xl text-teal-950">Manage the physician roster</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          A polished admin table paired with an add/edit doctor form covering specialty, bio, photo URL, and availability days.
        </p>
      </div>
      <DoctorsManager />
    </div>
  );
}
