import type { Appointment, Doctor, FaqGroup, Service, Testimonial } from "@/lib/types";

export const services: Service[] = [
  {
    title: "Family Medicine",
    description: "Continuity care for annual wellness, same-day concerns, and long-term planning.",
    icon: "Cross",
  },
  {
    title: "Cardiology",
    description: "Preventive screening and ongoing support for heart health and hypertension.",
    icon: "Heartbeat",
  },
  {
    title: "Dermatology",
    description: "Modern assessment for skin conditions, rashes, mole checks, and treatment plans.",
    icon: "Sparkle",
  },
  {
    title: "Pediatrics",
    description: "Warm, family-centered care for checkups, common illnesses, and developmental guidance.",
    icon: "Baby",
  },
  {
    title: "Women's Health",
    description: "Preventive care, hormonal support, and personalized screening in a calm environment.",
    icon: "FlowerLotus",
  },
  {
    title: "Preventive Care",
    description: "Screenings, lifestyle coaching, and care plans designed to keep you well.",
    icon: "ShieldCheck",
  },
];

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    slug: "dr-amelia-hart",
    name: "Dr. Amelia Hart",
    specialty: "Family Medicine",
    languages: ["English", "French"],
    qualifications: ["MD, University of Toronto", "CFPC"],
    availabilityDays: ["Monday", "Wednesday", "Friday"],
    hours: "8:30 AM - 4:30 PM",
    bio: "Dr. Hart focuses on long-term family care, preventive medicine, and clear communication that helps patients feel confident in every decision.",
    experience: "14 years experience",
    photoUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
    spotlight: true,
  },
  {
    id: "doc-2",
    slug: "dr-lucas-bennett",
    name: "Dr. Lucas Bennett",
    specialty: "Family Medicine",
    languages: ["English", "Spanish"],
    qualifications: ["MD, McGill University", "CFPC"],
    availabilityDays: ["Tuesday", "Thursday", "Saturday"],
    hours: "9:00 AM - 5:00 PM",
    bio: "Dr. Bennett blends primary care with lifestyle planning, helping busy professionals and young families stay ahead of health concerns.",
    experience: "11 years experience",
    photoUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
    spotlight: false,
  },
  {
    id: "doc-3",
    slug: "dr-sophia-nguyen",
    name: "Dr. Sophia Nguyen",
    specialty: "Cardiology",
    languages: ["English", "Vietnamese"],
    qualifications: ["MD, UBC", "FRCPC Cardiology"],
    availabilityDays: ["Monday", "Tuesday", "Thursday"],
    hours: "7:30 AM - 3:30 PM",
    bio: "Dr. Nguyen specializes in preventive cardiology and ongoing management plans that keep care practical, proactive, and data-informed.",
    experience: "16 years experience",
    photoUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
    spotlight: true,
  },
  {
    id: "doc-4",
    slug: "dr-elias-romero",
    name: "Dr. Elias Romero",
    specialty: "Cardiology",
    languages: ["English", "Portuguese"],
    qualifications: ["MD, Western University", "FRCPC Cardiology"],
    availabilityDays: ["Wednesday", "Friday"],
    hours: "10:00 AM - 6:00 PM",
    bio: "Dr. Romero works closely with patients navigating hypertension, arrhythmia follow-up, and coordinated specialist referrals.",
    experience: "9 years experience",
    photoUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80",
    spotlight: false,
  },
  {
    id: "doc-5",
    slug: "dr-nadia-patel",
    name: "Dr. Nadia Patel",
    specialty: "Dermatology",
    languages: ["English", "Hindi", "Gujarati"],
    qualifications: ["MD, Queen's University", "FRCPC Dermatology"],
    availabilityDays: ["Tuesday", "Thursday", "Friday"],
    hours: "8:00 AM - 2:30 PM",
    bio: "Dr. Patel delivers thoughtful dermatology care with an emphasis on early detection, treatment clarity, and skin confidence.",
    experience: "12 years experience",
    photoUrl:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=900&q=80",
    spotlight: true,
  },
  {
    id: "doc-6",
    slug: "dr-claire-morrison",
    name: "Dr. Claire Morrison",
    specialty: "Dermatology",
    languages: ["English"],
    qualifications: ["MD, Dalhousie University", "FRCPC Dermatology"],
    availabilityDays: ["Monday", "Wednesday", "Saturday"],
    hours: "11:00 AM - 7:00 PM",
    bio: "Dr. Morrison focuses on complex skin conditions, treatment continuity, and helping patients understand what to expect from each visit.",
    experience: "10 years experience",
    photoUrl:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=900&q=80",
    spotlight: false,
  },
];

export const appointments: Appointment[] = [
  { id: "apt-101", patientName: "Maya Thompson", patientEmail: "maya@example.com", doctorId: "doc-1", specialty: "Family Medicine", date: "2026-03-21", time: "8:30 AM", notes: "Annual wellness visit", status: "Confirmed" },
  { id: "apt-102", patientName: "Daniel Lee", patientEmail: "daniel@example.com", doctorId: "doc-3", specialty: "Cardiology", date: "2026-03-21", time: "9:00 AM", notes: "Blood pressure follow-up", status: "Confirmed" },
  { id: "apt-103", patientName: "Sofia Ramirez", patientEmail: "sofia@example.com", doctorId: "doc-5", specialty: "Dermatology", date: "2026-03-21", time: "9:30 AM", notes: "Rash consultation", status: "Pending" },
  { id: "apt-104", patientName: "Noah Johnson", patientEmail: "noah@example.com", doctorId: "doc-2", specialty: "Family Medicine", date: "2026-03-21", time: "10:00 AM", notes: "Persistent cough", status: "Confirmed" },
  { id: "apt-105", patientName: "Ava Collins", patientEmail: "ava@example.com", doctorId: "doc-6", specialty: "Dermatology", date: "2026-03-21", time: "10:30 AM", notes: "Mole mapping review", status: "Rescheduled" },
  { id: "apt-106", patientName: "Henry Walker", patientEmail: "henry@example.com", doctorId: "doc-4", specialty: "Cardiology", date: "2026-03-21", time: "11:00 AM", notes: "ECG results discussion", status: "Confirmed" },
  { id: "apt-107", patientName: "Lily Chen", patientEmail: "lily@example.com", doctorId: "doc-1", specialty: "Family Medicine", date: "2026-03-22", time: "8:45 AM", notes: "Medication renewal", status: "Confirmed" },
  { id: "apt-108", patientName: "Owen Brooks", patientEmail: "owen@example.com", doctorId: "doc-5", specialty: "Dermatology", date: "2026-03-22", time: "12:30 PM", notes: "Acne treatment review", status: "Completed" },
  { id: "apt-109", patientName: "Ella Nguyen", patientEmail: "ella@example.com", doctorId: "doc-3", specialty: "Cardiology", date: "2026-03-22", time: "1:15 PM", notes: "Cholesterol consult", status: "Pending" },
  { id: "apt-110", patientName: "James Patel", patientEmail: "james@example.com", doctorId: "doc-2", specialty: "Family Medicine", date: "2026-03-23", time: "9:15 AM", notes: "Travel health planning", status: "Confirmed" },
  { id: "apt-111", patientName: "Emma Foster", patientEmail: "emma@example.com", doctorId: "doc-4", specialty: "Cardiology", date: "2026-03-23", time: "11:45 AM", notes: "Palpitations assessment", status: "Pending" },
  { id: "apt-112", patientName: "Jack Wilson", patientEmail: "jack@example.com", doctorId: "doc-6", specialty: "Dermatology", date: "2026-03-23", time: "2:00 PM", notes: "Eczema management", status: "Confirmed" },
  { id: "apt-113", patientName: "Grace Morgan", patientEmail: "grace@example.com", doctorId: "doc-3", specialty: "Cardiology", date: "2026-03-24", time: "8:00 AM", notes: "Stress test follow-up", status: "Completed" },
  { id: "apt-114", patientName: "Benjamin Hall", patientEmail: "benjamin@example.com", doctorId: "doc-1", specialty: "Family Medicine", date: "2026-03-24", time: "3:15 PM", notes: "New patient intake", status: "Pending" },
  { id: "apt-115", patientName: "Chloe Reed", patientEmail: "chloe@example.com", doctorId: "doc-5", specialty: "Dermatology", date: "2026-03-24", time: "4:00 PM", notes: "Psoriasis treatment plan", status: "Confirmed" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Megan R.",
    quote: "The space feels calm, the team is organized, and every visit feels genuinely personal.",
    outcome: "Family Medicine patient",
  },
  {
    name: "Anthony T.",
    quote: "My cardiology follow-up was clear, efficient, and reassuring from check-in to care plan.",
    outcome: "Cardiology patient",
  },
  {
    name: "Priya S.",
    quote: "I finally found a dermatology clinic that feels premium without feeling intimidating.",
    outcome: "Dermatology patient",
  },
];

export const faqs: FaqGroup[] = [
  {
    topic: "Appointments",
    items: [
      {
        question: "How far in advance can I book?",
        answer: "Appointments can be booked up to six weeks in advance, with select same-day visits released each morning.",
      },
      {
        question: "Can I reschedule online?",
        answer: "Yes. Existing patients can reschedule from their appointment confirmation link or by calling the clinic concierge.",
      },
    ],
  },
  {
    topic: "Insurance",
    items: [
      {
        question: "Do you direct bill insurance providers?",
        answer: "We support direct billing for most major providers and provide digital receipts when direct billing is unavailable.",
      },
      {
        question: "What should I bring to my first visit?",
        answer: "Bring your insurance card, government ID, medication list, and any relevant referral notes or lab results.",
      },
    ],
  },
  {
    topic: "Treatment",
    items: [
      {
        question: "Will I receive a treatment plan after my appointment?",
        answer: "Yes. Your clinician provides a clear next-step summary including prescriptions, follow-up timing, and referrals when needed.",
      },
      {
        question: "Do specialists coordinate with my family doctor?",
        answer: "Absolutely. With your consent, we send concise visit notes and recommended care plans to your existing providers.",
      },
    ],
  },
  {
    topic: "General",
    items: [
      {
        question: "Is parking available?",
        answer: "Validated underground parking is available onsite, and the clinic is also a short walk from public transit.",
      },
      {
        question: "Are virtual visits offered?",
        answer: "Yes. Follow-ups and select consults can be completed virtually depending on your care needs and physician availability.",
      },
    ],
  },
];

export const accreditations = [
  "Accreditation Canada",
  "College of Physicians",
  "Ontario Health Network",
  "Private Care Alliance",
];
