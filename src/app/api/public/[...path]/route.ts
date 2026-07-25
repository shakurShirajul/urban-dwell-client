import { NextResponse, type NextRequest } from "next/server";
import { apiBaseUrl } from "@/server/env";

const allowedRoutes = new Set([
  "apartments",
  "appartment/length",
  "coupon-code",
]);

const proxy = async (request: NextRequest, context: { params: Promise<{ path: string[] }> }) => {
  const { path } = await context.params;
  const route = path.join("/");
  if (!allowedRoutes.has(route)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const target = new URL(`${apiBaseUrl}/${route}`);
  target.search = request.nextUrl.search;
  const response = await fetch(target, { cache: "no-store" });

  const headers = new Headers({
    "content-type": response.headers.get("content-type") ?? "application/json",
  });
  const hasMore = response.headers.get("x-has-more");
  if (hasMore) headers.set("x-has-more", hasMore);

  return new NextResponse(response.body, { status: response.status, headers });
};

export const GET = proxy;
