import { NextResponse } from "next/server";
import { z } from "zod";
import type { SessionUser, UserRole } from "@/types/domain";
import { apiBaseUrl } from "@/server/env";
import { clearSessionCookie, createSessionToken, setSessionCookie } from "@/server/session";

const requestSchema = z.object({ idToken: z.string().min(1) });
const validRoles = new Set<UserRole>(["user", "member", "admin"]);

type TokenExchange = {
  token: string;
  user: { email: string; name: string | null; photoURL: string | null };
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { idToken } = requestSchema.parse(await request.json());
    const tokenResponse = await fetch(`${apiBaseUrl}/jwt`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json().catch(() => null) as { message?: string } | null;
      return NextResponse.json(
        { message: errorData?.message ?? "API token exchange failed" },
        { status: tokenResponse.status },
      );
    }

    const { token: apiToken, user } = await tokenResponse.json() as TokenExchange;
    const roleResponse = await fetch(`${apiBaseUrl}/users/role?${new URLSearchParams({ email: user.email })}`, {
      headers: { authorization: `Bearer ${apiToken}` },
      cache: "no-store",
    });
    const roleData = roleResponse.ok
      ? await roleResponse.json() as { user_role?: UserRole } | null
      : {};
    const role = roleData?.user_role && validRoles.has(roleData.user_role) ? roleData.user_role : "user";

    const session: SessionUser = {
      email: user.email,
      name: user.name,
      photoURL: user.photoURL,
      role,
      apiToken,
    };
    await setSessionCookie(await createSessionToken(session));
    return NextResponse.json({
      user: {
        email: session.email,
        name: session.name,
        photoURL: session.photoURL,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("Unable to create session", error);
    await clearSessionCookie();
    const configurationError = error instanceof Error
      && error.message.startsWith("Missing required server environment variable:");
    return NextResponse.json(
      { message: configurationError ? "Server session configuration is missing" : "Unable to create session" },
      { status: 500 },
    );
  }
}

export async function DELETE(): Promise<NextResponse> {
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
