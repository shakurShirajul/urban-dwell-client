import { NextResponse } from "next/server";
import { z } from "zod";
import type { SessionUser, UserRole } from "@/types/domain";
import { apiBaseUrl } from "@/server/env";
import { verifyFirebaseToken } from "@/server/firebase-admin";
import { clearSessionCookie, createSessionToken, setSessionCookie } from "@/server/session";

const requestSchema = z.object({ idToken: z.string().min(1) });
const validRoles = new Set<UserRole>(["user", "member", "admin"]);

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { idToken } = requestSchema.parse(await request.json());
    const firebaseUser = await verifyFirebaseToken(idToken);
    if (!firebaseUser.email) {
      return NextResponse.json({ message: "Firebase account has no email" }, { status: 400 });
    }

    const tokenResponse = await fetch(`${apiBaseUrl}/jwt`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: firebaseUser.email }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) throw new Error("API token exchange failed");
    const { token: apiToken } = await tokenResponse.json() as { token: string };

    const roleResponse = await fetch(`${apiBaseUrl}/users/role?email=${encodeURIComponent(firebaseUser.email)}`, {
      headers: { authorization: `Bearer ${apiToken}` },
      cache: "no-store",
    });
    const roleData = roleResponse.ok
      ? await roleResponse.json() as { user_role?: UserRole }
      : {};
    const role = roleData.user_role && validRoles.has(roleData.user_role) ? roleData.user_role : "user";

    const session: SessionUser = {
      email: firebaseUser.email,
      name: firebaseUser.name ?? null,
      photoURL: firebaseUser.picture ?? null,
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
  } catch {
    await clearSessionCookie();
    return NextResponse.json({ message: "Unable to create session" }, { status: 401 });
  }
}

export async function DELETE(): Promise<NextResponse> {
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
