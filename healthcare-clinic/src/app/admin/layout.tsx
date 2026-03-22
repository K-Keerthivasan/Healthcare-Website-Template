import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell py-8">
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <AdminNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
