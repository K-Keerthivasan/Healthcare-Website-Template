import Link from "next/link";
import { DemoBanner } from "@/components/marketing/demo-banner";
import { PublicNav } from "@/components/marketing/public-nav";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <DemoBanner />
      <PublicNav />
      {children}
      <footer className="border-t border-slate-200/70 bg-white/80 dark:border-slate-700/70 dark:bg-slate-900/90">
        <div className="shell py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1fr_auto_auto_auto]">
            <div>
              <div className="font-heading text-2xl text-teal-900 dark:text-teal-100">Harbor Health Clinic</div>
              <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                A premium healthcare website boilerplate built for K2 Digital Media.
              </p>
            </div>
            <nav aria-label="Footer – Clinic" className="flex flex-col gap-2 text-sm font-semibold">
              <div className="mb-1 text-xs tracking-widest text-slate-400 uppercase dark:text-slate-500">Clinic</div>
              <Link href="/doctors" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">Doctors</Link>
              <Link href="/services" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">Services</Link>
              <Link href="/book-appointment" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">Book Appointment</Link>
            </nav>
            <nav aria-label="Footer – Patients" className="flex flex-col gap-2 text-sm font-semibold">
              <div className="mb-1 text-xs tracking-widest text-slate-400 uppercase dark:text-slate-500">Patients</div>
              <Link href="/portal" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">Patient Portal</Link>
              <Link href="/faq" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">FAQ</Link>
              <Link href="/contact" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">Contact Us</Link>
            </nav>
            <nav aria-label="Footer – Admin" className="flex flex-col gap-2 text-sm font-semibold">
              <div className="mb-1 text-xs tracking-widest text-slate-400 uppercase dark:text-slate-500">Admin</div>
              <Link href="/admin" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">Dashboard</Link>
              <Link href="/admin/appointments" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">Appointments</Link>
              <Link href="/admin/doctors" className="text-slate-600 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400">Doctors</Link>
            </nav>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
            © {new Date().getFullYear()} Harbor Health Clinic · Built by K2 Digital Media
          </div>
        </div>
      </footer>
    </div>
  );
}
