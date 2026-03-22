import { Badge } from "@/components/ui/badge";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { faqs } from "@/lib/mock-data";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <main id="main-content" className="shell py-14 sm:py-20">
      <div className="mb-10 max-w-3xl">
        <Badge>Patient FAQ</Badge>
        <h1 className="mt-5 text-5xl text-teal-950 sm:text-6xl dark:text-teal-50">
          Answers that feel clear and reassuring
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Grouped FAQs for appointments, insurance, treatment, and general clinic information.
        </p>
      </div>
      <FaqAccordion groups={faqs} />
    </main>
  );
}
