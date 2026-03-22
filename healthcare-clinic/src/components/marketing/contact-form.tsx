"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please include a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactValues = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
    mode: "onTouched",
  });

  const onSubmit = async (_values: ContactValues) => {
    // TODO: wire to Resend API route
    setSent(true);
  };

  if (sent) {
    return (
      <div role="alert" className="rounded-[1.75rem] border border-teal-200 bg-teal-50 p-8 text-center dark:border-teal-900 dark:bg-teal-950/60">
        <div className="text-2xl font-heading text-teal-900 dark:text-teal-100">Message received</div>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
          Thanks for reaching out. A member of our team will respond within one business day.
        </p>
        <button
          type="button"
          onClick={() => { setSent(false); form.reset(); }}
          className="mt-5 text-sm font-semibold text-teal-700 underline underline-offset-2 dark:text-teal-400"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={form.formState.errors.name?.message} htmlFor="contact-name">
          <Input
            id="contact-name"
            {...form.register("name")}
            placeholder="Jordan Smith"
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={form.formState.errors.email?.message} htmlFor="contact-email">
          <Input
            id="contact-email"
            {...form.register("email")}
            type="email"
            placeholder="jordan@example.com"
            autoComplete="email"
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)" htmlFor="contact-phone">
          <Input
            id="contact-phone"
            {...form.register("phone")}
            type="tel"
            placeholder="(555) 123-4567"
            autoComplete="tel"
          />
        </Field>
        <Field label="Subject" error={form.formState.errors.subject?.message} htmlFor="contact-subject">
          <Input
            id="contact-subject"
            {...form.register("subject")}
            placeholder="Appointment enquiry"
          />
        </Field>
      </div>
      <Field label="Message" error={form.formState.errors.message?.message} htmlFor="contact-message">
        <Textarea
          id="contact-message"
          {...form.register("message")}
          placeholder="How can we help you?"
          className="min-h-36"
        />
      </Field>
      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="h-12 w-full rounded-full bg-teal-700 text-sm hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
      >
        {form.formState.isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
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
      {error ? (
        <div role="alert" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{error}</div>
      ) : null}
    </div>
  );
}
