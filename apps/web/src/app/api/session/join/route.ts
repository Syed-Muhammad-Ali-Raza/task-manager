import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, accessCookieOptions } from "@/lib/auth-cookie";
import { API_URL } from "@/lib/api";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { token: string; name: string; password: string };
  const apiResponse = await fetch(`${API_URL}/api/invitations/${body.token}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: body.name, password: body.password }),
  });
  const data = (await apiResponse.json()) as { token?: string; user?: unknown; error?: string };
  if (!apiResponse.ok || !data.token) {
    return NextResponse.json({ error: data.error ?? "Could not join" }, { status: apiResponse.status });
  }
  const response = NextResponse.json({ user: data.user });
  response.cookies.set(ACCESS_COOKIE, data.token, accessCookieOptions());
  return response;
}
