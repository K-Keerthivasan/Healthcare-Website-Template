-- ─────────────────────────────────────────────────────────────────────────────
-- Harbor Health Clinic — Supabase Schema
-- Run in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── Enums ───────────────────────────────────────────────────────────────────

create type specialty as enum ('Family Medicine', 'Cardiology', 'Dermatology');
create type appointment_status as enum ('Confirmed', 'Pending', 'Rescheduled', 'Completed', 'Cancelled');

-- ─── doctors ─────────────────────────────────────────────────────────────────

create table if not exists doctors (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  name             text not null,
  slug             text not null unique,
  specialty        specialty not null,
  bio              text not null default '',
  photo_url        text,
  qualifications   text[] not null default '{}',
  languages        text[] not null default '{"English"}',
  availability_days text[] not null default '{}',
  hours            text not null default '9:00 AM - 5:00 PM',
  experience       text not null default '',
  spotlight        boolean not null default false,
  is_active        boolean not null default true
);

-- ─── services ────────────────────────────────────────────────────────────────

create table if not exists services (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  title       text not null,
  description text not null default '',
  icon        text not null default 'Cross',
  is_active   boolean not null default true
);

-- ─── patients ────────────────────────────────────────────────────────────────
-- auth_user_id links to auth.users (Supabase Auth)

create table if not exists patients (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  auth_user_id  uuid not null references auth.users (id) on delete cascade,
  full_name     text not null,
  email         text not null,
  phone         text,
  date_of_birth date,
  notes         text,
  unique (auth_user_id)
);

-- ─── appointments ────────────────────────────────────────────────────────────

create table if not exists appointments (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  patient_id      uuid not null references patients (id) on delete cascade,
  doctor_id       uuid not null references doctors (id) on delete restrict,
  service_id      uuid references services (id) on delete set null,
  specialty       specialty not null,
  date            date not null,
  time            text not null,
  notes           text,
  status          appointment_status not null default 'Pending',
  cal_booking_uid text                            -- Cal.com booking reference
);

-- ─── availability_blocks ─────────────────────────────────────────────────────

create table if not exists availability_blocks (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  doctor_id   uuid not null references doctors (id) on delete cascade,
  date        date not null,
  start_time  time not null,
  end_time    time not null,
  is_booked   boolean not null default false,
  cal_slot_id text,                               -- Cal.com slot reference
  constraint no_overlap exclude using gist (
    doctor_id with =,
    tsrange(
      (date + start_time)::timestamp,
      (date + end_time)::timestamp
    ) with &&
  )
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

create index if not exists idx_appointments_patient    on appointments (patient_id);
create index if not exists idx_appointments_doctor     on appointments (doctor_id);
create index if not exists idx_appointments_date       on appointments (date);
create index if not exists idx_availability_doctor     on availability_blocks (doctor_id, date);
create index if not exists idx_doctors_slug            on doctors (slug);

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table doctors             enable row level security;
alter table services            enable row level security;
alter table patients            enable row level security;
alter table appointments        enable row level security;
alter table availability_blocks enable row level security;

-- ── doctors: public read, staff write ────────────────────────────────────────

create policy "doctors: anyone can read active"
  on doctors for select
  using (is_active = true);

create policy "doctors: staff can manage"
  on doctors for all
  using (auth.role() = 'service_role');

-- ── services: public read, staff write ───────────────────────────────────────

create policy "services: anyone can read active"
  on services for select
  using (is_active = true);

create policy "services: staff can manage"
  on services for all
  using (auth.role() = 'service_role');

-- ── patients: own record only ─────────────────────────────────────────────────

create policy "patients: read own record"
  on patients for select
  using (auth.uid() = auth_user_id);

create policy "patients: insert own record"
  on patients for insert
  with check (auth.uid() = auth_user_id);

create policy "patients: update own record"
  on patients for update
  using (auth.uid() = auth_user_id);

create policy "patients: staff can read all"
  on patients for select
  using (auth.role() = 'service_role');

-- ── appointments: patients see own, staff see all ────────────────────────────

create policy "appointments: patient reads own"
  on appointments for select
  using (
    patient_id in (
      select id from patients where auth_user_id = auth.uid()
    )
  );

create policy "appointments: patient inserts own"
  on appointments for insert
  with check (
    patient_id in (
      select id from patients where auth_user_id = auth.uid()
    )
  );

create policy "appointments: patient cancels own"
  on appointments for update
  using (
    patient_id in (
      select id from patients where auth_user_id = auth.uid()
    )
    and status != 'Completed'
  );

create policy "appointments: staff manages all"
  on appointments for all
  using (auth.role() = 'service_role');

-- ── availability_blocks: public read, staff write ────────────────────────────

create policy "availability: anyone can read"
  on availability_blocks for select
  using (true);

create policy "availability: staff manages"
  on availability_blocks for all
  using (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────────────────────
-- Seed doctors (mirrors mock-data.ts)
-- ─────────────────────────────────────────────────────────────────────────────

insert into doctors (name, slug, specialty, bio, photo_url, qualifications, languages, availability_days, hours, experience, spotlight) values
  (
    'Dr. Amelia Hart', 'dr-amelia-hart', 'Family Medicine',
    'Dr. Hart focuses on long-term family care, preventive medicine, and clear communication.',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
    '{"MD, University of Toronto","CFPC"}', '{"English","French"}',
    '{"Monday","Wednesday","Friday"}', '8:30 AM - 4:30 PM', '14 years experience', true
  ),
  (
    'Dr. Lucas Bennett', 'dr-lucas-bennett', 'Family Medicine',
    'Dr. Bennett blends primary care with lifestyle planning for busy professionals and young families.',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
    '{"MD, McGill University","CFPC"}', '{"English","Spanish"}',
    '{"Tuesday","Thursday","Saturday"}', '9:00 AM - 5:00 PM', '11 years experience', false
  ),
  (
    'Dr. Sophia Nguyen', 'dr-sophia-nguyen', 'Cardiology',
    'Dr. Nguyen specializes in preventive cardiology and data-informed management plans.',
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80',
    '{"MD, UBC","FRCPC Cardiology"}', '{"English","Vietnamese"}',
    '{"Monday","Tuesday","Thursday"}', '7:30 AM - 3:30 PM', '16 years experience', true
  ),
  (
    'Dr. Elias Romero', 'dr-elias-romero', 'Cardiology',
    'Dr. Romero works closely with patients navigating hypertension and arrhythmia follow-up.',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
    '{"MD, Western University","FRCPC Cardiology"}', '{"English","Portuguese"}',
    '{"Wednesday","Friday"}', '10:00 AM - 6:00 PM', '9 years experience', false
  ),
  (
    'Dr. Nadia Patel', 'dr-nadia-patel', 'Dermatology',
    'Dr. Patel delivers thoughtful dermatology care with emphasis on early detection.',
    'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=900&q=80',
    '{"MD, Queen''s University","FRCPC Dermatology"}', '{"English","Hindi","Gujarati"}',
    '{"Tuesday","Thursday","Friday"}', '8:00 AM - 2:30 PM', '12 years experience', true
  ),
  (
    'Dr. Claire Morrison', 'dr-claire-morrison', 'Dermatology',
    'Dr. Morrison focuses on complex skin conditions and treatment continuity.',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=900&q=80',
    '{"MD, Dalhousie University","FRCPC Dermatology"}', '{"English"}',
    '{"Monday","Wednesday","Saturday"}', '11:00 AM - 7:00 PM', '10 years experience', false
  )
on conflict (slug) do nothing;

-- ─── Seed services ────────────────────────────────────────────────────────────

insert into services (title, description, icon) values
  ('Family Medicine', 'Continuity care for annual wellness, same-day concerns, and long-term planning.', 'Cross'),
  ('Cardiology', 'Preventive screening and ongoing support for heart health and hypertension.', 'Heartbeat'),
  ('Dermatology', 'Modern assessment for skin conditions, rashes, mole checks, and treatment plans.', 'Sparkle'),
  ('Pediatrics', 'Warm, family-centered care for checkups, common illnesses, and developmental guidance.', 'Baby'),
  ('Women''s Health', 'Preventive care, hormonal support, and personalized screening in a calm environment.', 'FlowerLotus'),
  ('Preventive Care', 'Screenings, lifestyle coaching, and care plans designed to keep you well.', 'ShieldCheck')
on conflict do nothing;
