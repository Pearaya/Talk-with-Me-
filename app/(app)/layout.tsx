import { DashboardNav } from "@/components/DashboardNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardNav />
      <main>{children}</main>
    </>
  );
}
