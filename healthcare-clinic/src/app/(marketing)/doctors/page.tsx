import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DoctorAvatar } from "@/components/site/doctor-avatar";
import { doctors } from "@/lib/mock-data";
import type { Specialty } from "@/lib/types";

export const metadata = { title: "Doctors" };

const specialties: Specialty[] = ["Family Medicine", "Cardiology", "Dermatology"];

export default function DoctorsPage() {
  return (
    <main id="main-content" className="shell py-14 sm:py-20">
      <div className="mb-10 max-w-3xl">
        <Badge>Doctors</Badge>
        <h1 className="mt-5 text-4xl text-teal-950 sm:text-5xl lg:text-6xl dark:text-teal-50">Meet the care team</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Six physicians across three specialties, designed to feel premium, approachable, and production-ready.
        </p>
      </div>

      {specialties.map((specialty) => {
        const group = doctors.filter((d) => d.specialty === specialty);
        return (
          <section key={specialty} className="mb-14" aria-labelledby={`specialty-${specialty.replace(/\s/g, "-")}`}>
            <h2
              id={`specialty-${specialty.replace(/\s/g, "-")}`}
              className="mb-6 text-2xl font-semibold text-teal-800 dark:text-teal-300"
            >
              {specialty}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {group.map((doctor) => (
                <article key={doctor.id} className="surface overflow-hidden dark:border-slate-700/60 dark:bg-slate-900/80">
                  <DoctorAvatar src={doctor.photoUrl} alt={doctor.name} className="min-h-[320px]" />
                  <div className="p-6">
                    <div className="text-sm tracking-[0.18em] text-teal-700 uppercase dark:text-teal-400">{doctor.specialty}</div>
                    <h3 className="mt-3 text-3xl text-teal-950 dark:text-teal-100">{doctor.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{doctor.bio}</p>
                    <div className="mt-4 space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <div>Languages: {doctor.languages.join(", ")}</div>
                      <div>Clinic hours: {doctor.hours}</div>
                    </div>
                    <Button asChild className="mt-6 h-11 rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500">
                      <Link href={`/doctors/${doctor.slug}`}>View profile</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
