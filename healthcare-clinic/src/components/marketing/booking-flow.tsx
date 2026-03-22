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
    <div className="surface overflow-hidden">
      <div className="border-b border-teal-100 bg-linear-to-r from-teal-50 to-white px-6 py-6 sm:px-8">
        <div className="grid gap-3 md:grid-cols-5">
          {steps.map((label, index) => {
            const active = index === step;
            const complete = index < step;
            return (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border text-sm font-bold",
                    active || complete
                      ? "border-teal-700 bg-teal-700 text-white"
                      : "border-slate-200 bg-white text-slate-400",
                  )}
                >
                  {index + 1}
                </div>
                <div className="text-sm font-semibold text-slate-600">{label}</div>
              </div>
            );
          })}
        </div>
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
                description="Choose a time window that works for your schedule."
              >
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <div className="mb-3 text-sm font-semibold text-slate-500 uppercase">Dates</div>
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
                  </div>
                  <div>
                    <div className="mb-3 text-sm font-semibold text-slate-500 uppercase">Times</div>
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
                  </div>
                </div>
              </StepCard>
            ) : null}

            {step === 3 ? (
              <StepCard
                title="Tell us about the patient"
                description="We only need the essentials to secure your visit."
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" error={form.formState.errors.patientName?.message}>
                    <Input {...form.register("patientName")} placeholder="Jordan Smith" />
                  </Field>
                  <Field label="Email" error={form.formState.errors.email?.message}>
                    <Input {...form.register("email")} placeholder="jordan@example.com" />
                  </Field>
                  <Field label="Phone" error={form.formState.errors.phone?.message}>
                    <Input {...form.register("phone")} placeholder="(555) 123-4567" />
                  </Field>
                  <Field label="Visit notes" error={form.formState.errors.notes?.message}>
                    <Textarea {...form.register("notes")} placeholder="Anything you want the care team to know ahead of time" className="min-h-12" />
                  </Field>
                </div>
              </StepCard>
            ) : null}

            {step === 4 ? (
              <StepCard
                title="Appointment confirmed"
                description="A polished confirmation state for the template and a clear handoff to future backend wiring."
              >
                <div className="rounded-[1.75rem] border border-teal-200 bg-teal-50 p-6">
                  <div className="text-lg font-semibold text-teal-900">
                    {submitted?.patientName || "Patient"} is booked with {selectedDoctor?.name || "your clinician"}.
                  </div>
                  <div className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                    <div>Specialty: {submitted?.specialty}</div>
                    <div>Date: {submitted?.date}</div>
                    <div>Time: {submitted?.time}</div>
                    <div>Email: {submitted?.email}</div>
                  </div>
                </div>
              </StepCard>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full border-slate-200 px-5 text-sm"
            onClick={back}
            disabled={step === 0}
          >
            Back
          </Button>
          <div className="flex gap-3">
            {step < 3 ? (
              <Button type="button" className="h-11 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800" onClick={next}>
                Continue
              </Button>
            ) : null}
            {step === 3 ? (
              <Button type="submit" className="h-11 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800">
                Confirm Appointment
              </Button>
            ) : null}
            {step === 4 ? (
              <Button
                type="button"
                className="h-11 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800"
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
        <h2 className="text-4xl text-teal-950">{title}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
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
        active ? "border-teal-700 bg-teal-700 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-semibold text-slate-700">{label}</div>
      {children}
      {error ? <div className="mt-2 text-sm text-rose-600">{error}</div> : null}
    </label>
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
      className={cn(
        "rounded-[1.75rem] border p-5 text-left transition",
        selected ? "border-teal-700 bg-teal-50 shadow-lg shadow-teal-100" : "border-slate-200 bg-white hover:border-teal-200",
      )}
    >
      <div className="text-lg font-semibold text-slate-900">{doctor.name}</div>
      <div className="mt-1 text-sm text-teal-700">{doctor.experience}</div>
      <p className="mt-3 text-sm leading-7 text-slate-600">{doctor.bio}</p>
      <div className="mt-4 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
        {doctor.languages.join(" • ")}
      </div>
    </button>
  );
}
