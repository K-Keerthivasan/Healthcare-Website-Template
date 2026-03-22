/**
 * Supabase database type definitions.
 * Generated via: npx supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts
 *
 * The types below are hand-authored to match schema.sql.
 * Replace with the generated output once your Supabase project is live.
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      doctors: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          slug: string;
          specialty: "Family Medicine" | "Cardiology" | "Dermatology";
          bio: string;
          photo_url: string | null;
          qualifications: string[];
          languages: string[];
          availability_days: string[];
          hours: string;
          experience: string;
          spotlight: boolean;
          is_active: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["doctors"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["doctors"]["Insert"]>;
      };
      services: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          icon: string;
          is_active: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["services"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
      };
      patients: {
        Row: {
          id: string;
          created_at: string;
          auth_user_id: string;
          full_name: string;
          email: string;
          phone: string | null;
          date_of_birth: string | null;
          notes: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["patients"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["patients"]["Insert"]>;
      };
      appointments: {
        Row: {
          id: string;
          created_at: string;
          patient_id: string;
          doctor_id: string;
          service_id: string | null;
          specialty: "Family Medicine" | "Cardiology" | "Dermatology";
          date: string;
          time: string;
          notes: string | null;
          status: "Confirmed" | "Pending" | "Rescheduled" | "Completed" | "Cancelled";
          cal_booking_uid: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["appointments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["appointments"]["Insert"]>;
      };
      availability_blocks: {
        Row: {
          id: string;
          created_at: string;
          doctor_id: string;
          date: string;
          start_time: string;
          end_time: string;
          is_booked: boolean;
          cal_slot_id: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["availability_blocks"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["availability_blocks"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      specialty: "Family Medicine" | "Cardiology" | "Dermatology";
      appointment_status: "Confirmed" | "Pending" | "Rescheduled" | "Completed" | "Cancelled";
    };
  };
}
