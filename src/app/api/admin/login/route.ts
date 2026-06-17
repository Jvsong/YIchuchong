import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  verifyAdminCredentials
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };

  if (!verifyAdminCredentials(body.username ?? "", body.password ?? "")) {
    return NextResponse.json({ message: "账号或密码错误" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const isSecure =
    new URL(request.url).protocol === "https:" ||
    request.headers.get("x-forwarded-proto") === "https";

  response.cookies.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6
  });
  return response;
}
