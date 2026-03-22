import { Badge } from "@/components/ui/badge";
import { BookingFlow } from "@/components/marketing/booking-flow";

export const metadata = { title: "Book Appointment" };

export default function BookAppointmentPage() {
  return (
    <main id="main-content" className="shell py-14 sm:py-20">
      <div className="mb-10 max-w-3xl">
        <Badge>Book Appointment</Badge>
        <h1 className="mt-5 text-5xl text-teal-950 sm:text-6xl dark:text-teal-50">
          A guided booking flow that feels frictionless
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Five steps, animated transitions, and validated patient details — production-ready and wired to Supabase.
        </p>
      </div>
      <BookingFlow />
    </main>
  );
}
