import MyProfile from "@/features/dashboard/my-profile";
import { redirect } from "next/navigation";
import { requireSession } from "@/server/session";

export default async function Page() {
  const session = await requireSession();
  if (session.role === "admin") redirect("/dashboard/adminprofile");
  return <MyProfile />;
}
