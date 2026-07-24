import type { ReactNode } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { requireSession } from "@/server/session";

export const metadata = { title: "Dashboard" };

export default async function DashboardRootLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();
  return <DashboardLayout session={session}>{children}</DashboardLayout>;
}
