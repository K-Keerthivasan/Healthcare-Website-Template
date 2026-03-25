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
import { services } from "@/lib/mock-data";

export const metadata = { title: "Services" };

const iconMap = {
  Cross,
  Heartbeat,
  Sparkle,
  Baby,
  FlowerLotus,
  ShieldCheck,
};

const serviceDetails: Record<string, { highlights: string[]; who: string }> = {
  "Family Medicine": {
    highlights: ["Annual wellness visits", "Preventive screenings", "Chronic disease management", "Same-day urgent concerns"],
    who: "Families, individuals, and patients of all ages seeking a trusted, long-term care relationship.",
  },
  Cardiology: {
    highlights: ["Cardiovascular risk assessment", "Hypertension management", "ECG & Holter monitoring", "Specialist referral coordination"],
    who: "Patients managing heart conditions, hypertension, or seeking preventive cardiovascular screening.",
  },
  Dermatology: {
    highlights: ["Skin condition diagnosis", "Mole mapping & melanoma screening", "Acne & eczema treatment", "Cosmetic dermatology consultations"],
    who: "Patients with skin concerns ranging from routine care to complex dermatological conditions.",
  },
  Pediatrics: {
    highlights: ["Well-child checkups", "Vaccination schedules", "Development milestone reviews", "Sick-child visits"],
    who: "Infants, children, and adolescents supported through every stage of growth.",
  },
  "Women's Health": {
    highlights: ["Preventive gynecological care", "Hormonal health support", "Pap smears & pelvic exams", "Perimenopause & menopause care"],
    who: "Women seeking personalized, compassionate care across all life stages.",
  },
  "Preventive Care": {
    highlights: ["Comprehensive health assessments", "Bloodwork & lab panels", "Lifestyle & nutrition coaching", "Long-term wellness planning"],
    who: "Anyone committed to proactive health management and disease prevention.",
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="shell py-14 sm:py-20">
      <div className="mb-12 max-w-3xl">
        <Badge>Services</Badge>
        <h1 className="mt-5 text-4xl text-teal-950 sm:text-5xl lg:text-6xl dark:text-teal-50">
          Comprehensive care under one roof
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
          From family wellness to specialist care, our clinic delivers a calm, professional experience at every visit.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap];
          const details = serviceDetails[service.title];
          return (
            <article
              key={service.title}
              className="surface flex flex-col p-7 dark:border-slate-700/60 dark:bg-slate-900/80"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-900/60 dark:text-teal-400">
                <Icon size={28} weight="duotone" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-2xl text-teal-950 dark:text-teal-100">{service.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{service.description}</p>

              {details && (
                <>
                  <ul className="mt-5 space-y-2" aria-label={`${service.title} highlights`}>
                    {details.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                    <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">Who it's for</div>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">{details.who}</p>
                  </div>
                </>
              )}

              <div className="mt-auto pt-6">
                <Button
                  asChild
                  className="h-11 w-full rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                  <Link href="/book-appointment">Book this service</Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-14 surface overflow-hidden bg-linear-to-r from-teal-900 to-teal-700 p-8 text-white sm:p-10 dark:from-teal-950 dark:to-teal-900">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">Not sure which service is right for you?</h2>
            <p className="mt-3 max-w-xl text-base leading-8 text-teal-50/90">
              Book a general consultation and our care team will guide you to the right specialist or service.
            </p>
          </div>
          <Button asChild className="h-12 rounded-full bg-white px-6 text-sm text-teal-800 hover:bg-teal-50">
            <Link href="/book-appointment">Book a consultation</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
