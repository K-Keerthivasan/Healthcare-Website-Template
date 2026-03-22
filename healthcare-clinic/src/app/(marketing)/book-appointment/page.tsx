import { Badge } from "@/components/ui/badge";
import { BookingFlow } from "@/components/marketing/booking-flow";

export default function BookAppointmentPage() {
  return (
    <main className="shell py-14 sm:py-20">
      <div className="mb-10 max-w-3xl">
        <Badge>Book Appointment</Badge>
        <h1 className="mt-5 text-5xl text-teal-950 sm:text-6xl">A guided booking flow that feels frictionless</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Five steps, animated transitions, and validated patient details so the boilerplate already feels like a real clinic product.
        </p>
      </div>
      <BookingFlow />
    </main>
  );
}
