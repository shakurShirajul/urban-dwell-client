import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";
import type { SessionUser, UserRole } from "@/types/domain";
import { apiBaseUrl, requiredServerEnv } from "./env";

const COOKIE_NAME = "urban-dwell-session";
const SESSION_DURATION = 60 * 60;
const secret = () => new TextEncoder().encode(requiredServerEnv("NEXT_SESSION_SECRET"));

export const createSessionToken = (user: SessionUser) =>
  new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(secret());

export const setSessionCookie = async (token: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
};

export const clearSessionCookie = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
};

export const getSession = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.user as SessionUser;
  } catch {
    return null;
  }
});

export const requireSession = async (): Promise<SessionUser> => {
  const session = await getSession();
  if (!session) redirect("/login");

  const roleResponse = await fetch(`${apiBaseUrl}/users/role?email=${encodeURIComponent(session.email)}`, {
    headers: { authorization: `Bearer ${session.apiToken}` },
    cache: "no-store",
  });
  if (!roleResponse.ok) redirect("/login");

  const data = await roleResponse.json().catch(() => null) as { user_role?: UserRole } | null;
  const role: UserRole = data?.user_role === "admin" || data?.user_role === "member" ? data.user_role : "user";
  return { ...session, role };
};

export const requireRole = async (...roles: UserRole[]): Promise<SessionUser> => {
  const session = await requireSession();
  if (!roles.includes(session.role)) redirect("/unauthorized");
  return session;
};
