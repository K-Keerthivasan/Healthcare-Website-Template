"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { doctors } from "@/lib/mock-data";
import type { Doctor, Specialty } from "@/lib/types";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  specialty: z.enum(["Family Medicine", "Cardiology", "Dermatology"]),
  bio: z.string().min(20, "Bio should be more descriptive"),
  photoUrl: z.url("Enter a valid photo URL"),
  availabilityDays: z.array(z.string()).min(1, "Choose at least one day"),
});

type DoctorFormValues = z.infer<typeof schema>;

const availabilityOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function DoctorsManager() {
  const [selected, setSelected] = useState<Doctor>(doctors[0]);
  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: selected.name,
      specialty: selected.specialty,
      bio: selected.bio,
      photoUrl: selected.photoUrl,
      availabilityDays: selected.availabilityDays,
    },
  });

  useEffect(() => {
    form.reset({
      name: selected.name,
      specialty: selected.specialty,
      bio: selected.bio,
      photoUrl: selected.photoUrl,
      availabilityDays: selected.availabilityDays,
    });
  }, [form, selected]);

  const selectedDays = useWatch({
    control: form.control,
    name: "availabilityDays",
  }) ?? [];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <div className="surface overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <h2 className="text-3xl text-teal-950">Doctor directory</h2>
          <p className="mt-2 text-sm text-slate-500">A clean table layout for admin management workflows.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 sm:px-8">Doctor</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Languages</th>
                <th className="px-6 py-4">Availability</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="cursor-pointer border-t border-slate-100 transition hover:bg-teal-50/60"
                  onClick={() => setSelected(doctor)}
                >
                  <td className="px-6 py-4 sm:px-8">
                    <div className="font-semibold text-slate-900">{doctor.name}</div>
                    <div className="mt-1 text-slate-500">{doctor.experience}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{doctor.specialty}</td>
                  <td className="px-6 py-4 text-slate-700">{doctor.languages.join(", ")}</td>
                  <td className="px-6 py-4 text-slate-700">{doctor.availabilityDays.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="surface p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-3xl text-teal-950">Add / edit doctor</h2>
          <p className="mt-2 text-sm text-slate-500">Validated with React Hook Form and Zod so this boilerplate is ready for persistence wiring.</p>
        </div>
        <form
          className="space-y-5"
          onSubmit={form.handleSubmit(() => {
            form.reset(form.getValues());
          })}
        >
          <Field label="Name" error={form.formState.errors.name?.message}>
            <Input {...form.register("name")} />
          </Field>

          <Field label="Specialty" error={form.formState.errors.specialty?.message}>
            <select
              {...form.register("specialty")}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100"
            >
              {(["Family Medicine", "Cardiology", "Dermatology"] as Specialty[]).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Bio" error={form.formState.errors.bio?.message}>
            <Textarea {...form.register("bio")} />
          </Field>

          <Field label="Photo URL" error={form.formState.errors.photoUrl?.message}>
            <Input {...form.register("photoUrl")} />
          </Field>

          <div>
            <div className="mb-2 text-sm font-semibold text-slate-700">Availability days</div>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((day) => {
                const active = selectedDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      const next = active
                        ? selectedDays.filter((item) => item !== day)
                        : [...selectedDays, day];
                      form.setValue("availabilityDays", next, { shouldValidate: true });
                    }}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-teal-700 bg-teal-700 text-white"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            {form.formState.errors.availabilityDays?.message ? (
              <div className="mt-2 text-sm text-rose-600">{form.formState.errors.availabilityDays.message}</div>
            ) : null}
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="h-11 rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800">
              Save Doctor
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-full border-slate-200 px-5 text-sm"
              onClick={() =>
                form.reset({
                  name: "",
                  specialty: "Family Medicine",
                  bio: "",
                  photoUrl: "",
                  availabilityDays: ["Monday"],
                })
              }
            >
              New Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
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
