import type { ReactNode } from "react";
import { requireRole } from "@/server/session";

export default async function ResidentLayout({ children }: { children: ReactNode }) {
  await requireRole("user", "member", "admin");
  return children;
}
