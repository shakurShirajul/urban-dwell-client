import { redirect } from "next/navigation";
import { requireSession } from "@/server/session";

export default async function DashboardPage() {
  const session = await requireSession();
  redirect(session.role === "admin" ? "/dashboard/adminprofile" : "/dashboard/myprofile");
}
