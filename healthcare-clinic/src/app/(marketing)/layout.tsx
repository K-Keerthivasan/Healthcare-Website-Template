import Link from "next/link";
import { PublicNav } from "@/components/marketing/public-nav";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <PublicNav />
      {children}
      <footer className="border-t border-white/70 bg-white/80">
        <div className="shell flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-heading text-2xl text-teal-900">Harbor Health Clinic</div>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              A premium healthcare website boilerplate built for K2 Digital Media.
            </p>
          </div>
          <div className="flex gap-5 text-sm font-semibold text-slate-600">
            <Link href="/doctors">Doctors</Link>
            <Link href="/book-appointment">Book Appointment</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
