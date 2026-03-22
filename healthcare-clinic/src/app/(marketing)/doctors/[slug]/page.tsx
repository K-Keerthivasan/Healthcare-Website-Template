import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DoctorAvatar } from "@/components/site/doctor-avatar";
import { doctors } from "@/lib/mock-data";

export async function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  return { title: doctor?.name ?? "Doctor Profile" };
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);

  if (!doctor) {
    notFound();
  }

  return (
    <main id="main-content" className="shell py-14 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <DoctorAvatar src={doctor.photoUrl} alt={doctor.name} className="min-h-[560px]" />
        <div className="surface p-8 sm:p-10 dark:border-slate-700/60 dark:bg-slate-900/80">
          <Badge>{doctor.specialty}</Badge>
          <h1 className="mt-5 text-5xl text-teal-950 sm:text-6xl dark:text-teal-50">{doctor.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">{doctor.bio}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <InfoCard title="Qualifications" items={doctor.qualifications} />
            <InfoCard title="Languages" items={doctor.languages} />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <div className="text-sm tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">Schedule snippet</div>
              <div className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{doctor.hours}</div>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Available {doctor.availabilityDays.join(", ")} for consultations and follow-up visits.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-teal-200 bg-teal-50 p-5 dark:border-teal-900 dark:bg-teal-950/60">
              <div className="text-sm tracking-[0.18em] text-teal-700 uppercase dark:text-teal-400">Experience</div>
              <div className="mt-3 text-lg font-semibold text-teal-950 dark:text-teal-100">{doctor.experience}</div>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                A seasoned physician with a strong track record of patient outcomes and continuity of care.
              </p>
            </div>
          </div>

          <Button asChild className="mt-8 h-12 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500">
            <Link href="/book-appointment">Book with this doctor</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <div className="text-sm tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">{title}</div>
      <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}
