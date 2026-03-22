import Link from "next/link";
import {
  Baby,
  Cross,
  FlowerLotus,
  Heartbeat,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DoctorAvatar } from "@/components/site/doctor-avatar";
import { accreditations, doctors, services, testimonials } from "@/lib/mock-data";

const iconMap = {
  Cross,
  Heartbeat,
  Sparkle,
  Baby,
  FlowerLotus,
  ShieldCheck,
};

export default function HomePage() {
  const featuredDoctors = doctors.filter((doctor) => doctor.spotlight).slice(0, 3);

  return (
    <main>
      <section className="shell py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface overflow-hidden p-8 sm:p-12">
            <Badge>Fresh Clinical Trust</Badge>
            <h1 className="mt-6 max-w-3xl text-5xl leading-tight text-teal-950 sm:text-7xl">
              Your Health, Our Priority
            </h1>
            <p className="section-copy mt-6">
              A premium private-clinic experience with calm spaces, experienced physicians, and a seamless path from booking to follow-up.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="h-12 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800">
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-slate-200 px-6 text-sm">
                <Link href="/doctors">Meet Our Doctors</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Metric value="6" label="Mock doctors" />
              <Metric value="15" label="Mock appointments" />
              <Metric value="4.9/5" label="Patient satisfaction" />
            </div>
          </div>

          <div className="surface relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.14),transparent_38%)]" />
            <div className="relative grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                <DoctorAvatar src={featuredDoctors[0].photoUrl} alt={featuredDoctors[0].name} className="min-h-[320px]" />
                <div className="rounded-[1.75rem] bg-teal-900 p-6 text-white">
                  <div className="text-sm tracking-[0.18em] text-teal-100 uppercase">Same week access</div>
                  <div className="mt-5 text-4xl font-heading leading-tight">Calm, concierge-style care.</div>
                  <p className="mt-4 text-sm leading-7 text-teal-50/90">
                    Designed for private clinic brands that want warmth, confidence, and polish.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-teal-100 bg-teal-50 p-5">
                  <div className="text-sm font-semibold text-teal-800">Today’s availability</div>
                  <div className="mt-3 text-3xl font-heading text-teal-950">12 open slots</div>
                  <p className="mt-2 text-sm text-slate-600">Across family medicine, cardiology, and dermatology.</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                  <div className="text-sm font-semibold text-slate-500">Fast intake</div>
                  <div className="mt-3 text-3xl font-heading text-teal-950">5-step booking flow</div>
                  <p className="mt-2 text-sm text-slate-600">Animated, validated, and ready to connect to Supabase.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-10 sm:py-14">
        <div className="mb-8">
          <Badge>Specialties</Badge>
          <h2 className="mt-4 text-4xl text-teal-950 sm:text-5xl">Care designed around real life</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <article key={service.title} className="surface p-6">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Icon size={28} weight="duotone" />
                </div>
                <h3 className="mt-5 text-2xl text-teal-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="shell py-10 sm:py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <Badge>Doctors</Badge>
            <h2 className="mt-4 text-4xl text-teal-950 sm:text-5xl">Clinicians patients remember</h2>
          </div>
          <Button asChild variant="outline" className="hidden h-11 rounded-full border-slate-200 px-5 text-sm sm:inline-flex">
            <Link href="/doctors">View all doctors</Link>
          </Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredDoctors.map((doctor) => (
            <article key={doctor.id} className="surface overflow-hidden">
              <DoctorAvatar src={doctor.photoUrl} alt={doctor.name} className="min-h-[280px]" />
              <div className="p-6">
                <div className="text-sm tracking-[0.18em] text-teal-700 uppercase">{doctor.specialty}</div>
                <h3 className="mt-3 text-3xl text-teal-950">{doctor.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{doctor.bio}</p>
                <div className="mt-4 text-sm font-semibold text-slate-500">{doctor.languages.join(" • ")}</div>
                <Button asChild className="mt-6 h-11 rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800">
                  <Link href={`/doctors/${doctor.slug}`}>View Profile</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-10 sm:py-14">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="surface p-6">
              <div className="text-5xl text-teal-200">“</div>
              <p className="mt-3 text-base leading-8 text-slate-600">{testimonial.quote}</p>
              <div className="mt-6 font-semibold text-slate-900">{testimonial.name}</div>
              <div className="text-sm text-teal-700">{testimonial.outcome}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-10 sm:py-14">
        <div className="surface p-8 sm:p-10">
          <Badge>Accreditations</Badge>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {accreditations.map((item) => (
              <div
                key={item}
                className="flex min-h-24 items-center justify-center rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 text-center text-sm font-semibold text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-16 pt-10 sm:pb-24">
        <div className="surface overflow-hidden bg-linear-to-r from-teal-900 to-teal-700 p-8 text-white sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm tracking-[0.18em] text-teal-100 uppercase">Appointment CTA</div>
              <h2 className="mt-4 text-4xl sm:text-5xl">Ready to launch a clinic site that feels credible on day one?</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-teal-50/90">
                This starter includes the patient-facing journey, admin surfaces, and mock data structure to begin integrating real operations.
              </p>
            </div>
            <Button asChild className="h-12 rounded-full bg-white px-6 text-sm text-teal-800 hover:bg-teal-50">
              <Link href="/book-appointment">Start Booking Flow</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
      <div className="font-heading text-3xl text-teal-950">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}
