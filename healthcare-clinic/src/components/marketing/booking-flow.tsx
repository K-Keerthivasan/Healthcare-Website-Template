"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { doctors } from "@/lib/mock-data";
import type { Doctor, Specialty } from "@/lib/types";
import { cn } from "@/lib/utils";

const schema = z.object({
  specialty: z.enum(["Family Medicine", "Cardiology", "Dermatology"]),
  doctorId: z.string().min(1, "Choose a doctor"),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
  patientName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  notes: z.string().optional(),
});

type BookingValues = z.infer<typeof schema>;

const steps = [
  "Select specialty",
  "Choose doctor",
  "Pick date/time",
  "Patient info",
  "Confirm",
];

const dateOptions = ["Mon, Mar 23", "Tue, Mar 24", "Wed, Mar 25", "Thu, Mar 26"];
const timeOptions = ["8:30 AM", "9:00 AM", "10:30 AM", "1:15 PM", "3:00 PM"];

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<BookingValues | null>(null);
  const form = useForm<BookingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      specialty: "Family Medicine",
      doctorId: "",
      date: "",
      time: "",
      patientName: "",
      email: "",
      phone: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const specialty = useWatch({ control: form.control, name: "specialty" });
  const doctorId = useWatch({ control: form.control, name: "doctorId" });
  const date = useWatch({ control: form.control, name: "date" });
  const time = useWatch({ control: form.control, name: "time" });
  const doctorOptions = useMemo(
    () => doctors.filter((doctor) => doctor.specialty === specialty),
    [specialty],
  );
  const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);

  const next = async () => {
    const validations: Array<Array<keyof BookingValues>> = [
      ["specialty"],
      ["doctorId"],
      ["date", "time"],
      ["patientName", "email", "phone", "notes"],
      [],
    ];

    const fields = validations[step];
    if (fields.length > 0) {
      const valid = await form.trigger(fields);
      if (!valid) return;
    }

    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const back = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <div className="surface overflow-hidden dark:border-slate-700/60 dark:bg-slate-900/80">
      {/* Step indicator */}
      <div className="border-b border-teal-100 bg-linear-to-r from-teal-50 to-white px-6 py-6 sm:px-8 dark:border-teal-900/50 dark:from-teal-950/40 dark:to-slate-900">
        <ol className="grid gap-3 md:grid-cols-5" aria-label="Booking steps">
          {steps.map((label, index) => {
            const active = index === step;
            const complete = index < step;
            return (
              <li key={label} className="flex items-center gap-3">
                <div
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border text-sm font-bold",
                    active || complete
                      ? "border-teal-700 bg-teal-700 text-white dark:border-teal-500 dark:bg-teal-600"
                      : "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
                  )}
                >
                  {index + 1}
                </div>
                <div className={cn(
                  "text-sm font-semibold",
                  active || complete ? "text-teal-800 dark:text-teal-300" : "text-slate-400 dark:text-slate-500",
                )}>{label}</div>
              </li>
            );
          })}
        </ol>
      </div>

      <form
        onSubmit={form.handleSubmit((values) => {
          setSubmitted(values);
          setStep(4);
        })}
        className="p-6 sm:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="space-y-6"
          >
            {step === 0 ? (
              <StepCard
                title="Select a specialty"
                description="Start with the area of care you need so we can tailor the available clinicians and times."
              >
                <div className="grid gap-4 md:grid-cols-3">
                  {(["Family Medicine", "Cardiology", "Dermatology"] as Specialty[]).map((item) => (
                    <SelectablePill
                      key={item}
                      active={specialty === item}
                      onClick={() => {
                        form.setValue("specialty", item, { shouldValidate: true });
                        form.setValue("doctorId", "");
                      }}
                    >
                      {item}
                    </SelectablePill>
                  ))}
                </div>
              </StepCard>
            ) : null}

            {step === 1 ? (
              <StepCard
                title="Choose your doctor"
                description="Select from physicians currently available for your chosen specialty."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {doctorOptions.map((doctor) => (
                    <DoctorChoice
                      key={doctor.id}
                      doctor={doctor}
                      selected={doctorId === doctor.id}
                      onSelect={() => form.setValue("doctorId", doctor.id, { shouldValidate: true })}
                    />
                  ))}
                </div>
              </StepCard>
            ) : null}

            {step === 2 ? (
              <StepCard
                title="Pick a date and time"
                description="Choose a time window that works for your schedule. Dates shown reflect available slots."
              >
                <div className="grid gap-8 lg:grid-cols-2">
                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Available dates</legend>
                    <div className="grid gap-3">
                      {dateOptions.map((item) => (
                        <SelectablePill
                          key={item}
                          active={date === item}
                          onClick={() => form.setValue("date", item, { shouldValidate: true })}
                        >
                          {item}
                        </SelectablePill>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">Available times</legend>
                    <div className="grid grid-cols-2 gap-3">
                      {timeOptions.map((item) => (
                        <SelectablePill
                          key={item}
                          active={time === item}
                          onClick={() => form.setValue("time", item, { shouldValidate: true })}
                        >
                          {item}
                        </SelectablePill>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </StepCard>
            ) : null}

            {step === 3 ? (
              <StepCard
                title="Tell us about the patient"
                description="We only need the essentials to secure your visit."
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" error={form.formState.errors.patientName?.message} htmlFor="patientName">
                    <Input id="patientName" {...form.register("patientName")} placeholder="Jordan Smith" autoComplete="name" />
                  </Field>
                  <Field label="Email" error={form.formState.errors.email?.message} htmlFor="email">
                    <Input id="email" {...form.register("email")} type="email" placeholder="jordan@example.com" autoComplete="email" />
                  </Field>
                  <Field label="Phone" error={form.formState.errors.phone?.message} htmlFor="phone">
                    <Input id="phone" {...form.register("phone")} type="tel" placeholder="(555) 123-4567" autoComplete="tel" />
                  </Field>
                  <Field label="Visit notes (optional)" error={form.formState.errors.notes?.message} htmlFor="notes">
                    <Textarea id="notes" {...form.register("notes")} placeholder="Anything you want the care team to know ahead of time" className="min-h-12" />
                  </Field>
                </div>
              </StepCard>
            ) : null}

            {step === 4 ? (
              <StepCard
                title="Appointment confirmed"
                description="You'll receive an email confirmation shortly. We look forward to seeing you."
              >
                <div className="rounded-[1.75rem] border border-teal-200 bg-teal-50 p-6 dark:border-teal-900 dark:bg-teal-950/60">
                  <div className="text-lg font-semibold text-teal-900 dark:text-teal-100">
                    {submitted?.patientName || "Patient"} is booked with {selectedDoctor?.name || "your clinician"}.
                  </div>
                  <div className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-2 dark:text-slate-400">
                    <div><span className="font-semibold text-slate-700 dark:text-slate-300">Specialty:</span> {submitted?.specialty}</div>
                    <div><span className="font-semibold text-slate-700 dark:text-slate-300">Date:</span> {submitted?.date}</div>
                    <div><span className="font-semibold text-slate-700 dark:text-slate-300">Time:</span> {submitted?.time}</div>
                    <div><span className="font-semibold text-slate-700 dark:text-slate-300">Email:</span> {submitted?.email}</div>
                  </div>
                  <p className="mt-4 text-sm text-teal-700 dark:text-teal-400">
                    A confirmation email has been dispatched. SMS reminders will be sent 24 hours before your appointment.
                  </p>
                </div>
              </StepCard>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full border-slate-200 px-5 text-sm dark:border-slate-700 dark:text-slate-300"
            onClick={back}
            disabled={step === 0}
          >
            Back
          </Button>
          <div className="flex gap-3">
            {step < 3 ? (
              <Button type="button" className="h-11 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500" onClick={next}>
                Continue
              </Button>
            ) : null}
            {step === 3 ? (
              <Button type="submit" className="h-11 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500">
                Confirm Appointment
              </Button>
            ) : null}
            {step === 4 ? (
              <Button
                type="button"
                className="h-11 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
                onClick={() => {
                  form.reset();
                  setSubmitted(null);
                  setStep(0);
                }}
              >
                Book Another
              </Button>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}

function StepCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-4xl text-teal-950 dark:text-teal-50">{title}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      {children}
    </div>
  );
}

function SelectablePill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
        active
          ? "border-teal-700 bg-teal-700 text-white dark:border-teal-500 dark:bg-teal-600"
          : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-700 dark:hover:bg-teal-950/50",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      {children}
      {error ? <div role="alert" className="mt-2 text-sm text-rose-600 dark:text-rose-400">{error}</div> : null}
    </div>
  );
}

function DoctorChoice({
  doctor,
  selected,
  onSelect,
}: {
  doctor: Doctor;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "rounded-[1.75rem] border p-5 text-left transition",
        selected
          ? "border-teal-700 bg-teal-50 shadow-lg shadow-teal-100 dark:border-teal-500 dark:bg-teal-950/60 dark:shadow-teal-950"
          : "border-slate-200 bg-white hover:border-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-teal-700",
      )}
    >
      <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{doctor.name}</div>
      <div className="mt-1 text-sm text-teal-700 dark:text-teal-400">{doctor.experience}</div>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{doctor.bio}</p>
      <div className="mt-4 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
        {doctor.languages.join(" • ")}
      </div>
    </button>
  );
}
