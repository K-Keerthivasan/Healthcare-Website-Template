import { appointments, doctors } from "@/lib/mock-data";

export const mockSupabase = {
  doctors: async () => doctors,
  appointments: async () => appointments,
};
