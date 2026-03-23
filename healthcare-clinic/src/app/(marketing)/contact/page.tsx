import { ContactForm } from "@/components/marketing/contact-form";
import { Badge } from "@/components/ui/badge";
import type { Icon } from "@phosphor-icons/react";
import { Clock, MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main id="main-content" className="shell py-14 sm:py-20">
      <div className="mb-12 max-w-3xl">
        <Badge>Contact</Badge>
        <h1 className="mt-5 text-5xl text-teal-950 sm:text-6xl dark:text-teal-50">
          Get in touch
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Questions, feedback, or general enquiries — our team typically responds within one business day.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Contact info */}
        <div className="space-y-5">
          <InfoCard
            Icon={MapPin}
            title="Location"
            lines={["120 Harbor Drive, Suite 400", "Toronto, ON M5J 2T3", "Canada"]}
          />
          <InfoCard
            Icon={Phone}
            title="Phone"
            lines={["(416) 555-0192", "Mon – Fri, 8:00 AM – 6:00 PM"]}
          />
          <InfoCard
            Icon={EnvelopeSimple}
            title="Email"
            lines={["hello@harborhealth.ca", "appointments@harborhealth.ca"]}
          />
          <InfoCard
            Icon={Clock}
            title="Clinic Hours"
            lines={[
              "Monday – Friday: 8:00 AM – 6:00 PM",
              "Saturday: 9:00 AM – 2:00 PM",
              "Sunday: Closed",
            ]}
          />

          {/* Map placeholder */}
          <div className="surface flex min-h-52 items-center justify-center overflow-hidden dark:border-slate-700/60 dark:bg-slate-900/80">
            <div className="text-center">
              <MapPin size={32} weight="duotone" className="mx-auto text-teal-600 dark:text-teal-400" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-400">Interactive map</p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Connect @react-google-maps/api to embed</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="surface p-8 dark:border-slate-700/60 dark:bg-slate-900/80">
          <h2 className="mb-6 text-3xl text-teal-950 dark:text-teal-100">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  Icon,
  title,
  lines,
}: {
  Icon: Icon;
  title: string;
  lines: string[];
}) {
  return (
    <div className="surface flex gap-4 p-5 dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-900/60 dark:text-teal-400">
        <Icon size={20} weight="duotone" aria-hidden="true" />
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</div>
        {lines.map((line) => (
          <div key={line} className="mt-1 text-sm text-slate-700 dark:text-slate-300">{line}</div>
        ))}
      </div>
    </div>
  );
}
