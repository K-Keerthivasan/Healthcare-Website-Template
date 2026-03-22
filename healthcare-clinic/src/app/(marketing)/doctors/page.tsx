import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DoctorAvatar } from "@/components/site/doctor-avatar";
import { doctors } from "@/lib/mock-data";

export default function DoctorsPage() {
  return (
    <main className="shell py-14 sm:py-20">
      <div className="mb-10 max-w-3xl">
        <Badge>Doctors</Badge>
        <h1 className="mt-5 text-5xl text-teal-950 sm:text-6xl">Meet the care team</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Six mock doctors across three specialties, designed to feel premium, approachable, and production-ready.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => (
          <article key={doctor.id} className="surface overflow-hidden">
            <DoctorAvatar src={doctor.photoUrl} alt={doctor.name} className="min-h-[320px]" />
            <div className="p-6">
              <div className="text-sm tracking-[0.18em] text-teal-700 uppercase">{doctor.specialty}</div>
              <h2 className="mt-3 text-3xl text-teal-950">{doctor.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{doctor.bio}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-500">
                <div>Languages: {doctor.languages.join(", ")}</div>
                <div>Clinic hours: {doctor.hours}</div>
              </div>
              <Button asChild className="mt-6 h-11 rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800">
                <Link href={`/doctors/${doctor.slug}`}>View profile</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
