export type Specialty =
  | "Family Medicine"
  | "Cardiology"
  | "Dermatology";

export type Doctor = {
  id: string;
  slug: string;
  name: string;
  specialty: Specialty;
  languages: string[];
  qualifications: string[];
  availabilityDays: string[];
  hours: string;
  bio: string;
  experience: string;
  photoUrl: string;
  spotlight: boolean;
};

export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Rescheduled"
  | "Completed";

export type Appointment = {
  id: string;
  patientName: string;
  patientEmail: string;
  doctorId: string;
  specialty: Specialty;
  date: string;
  time: string;
  notes: string;
  status: AppointmentStatus;
};

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export type Testimonial = {
  name: string;
  quote: string;
  outcome: string;
};

export type FaqGroup = {
  topic: string;
  items: { question: string; answer: string }[];
};
