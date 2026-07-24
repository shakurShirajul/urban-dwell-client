import type { ReactNode } from "react";
import { requireRole } from "@/server/session";

export default async function MemberLayout({ children }: { children: ReactNode }) {
  await requireRole("member");
  return children;
}
