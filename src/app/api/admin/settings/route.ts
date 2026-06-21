import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/admin-auth";
import { readObject, writeObject } from "@/lib/dataStore";
import { defaultSiteSettings, type SiteSettings } from "@/lib/siteSettings";

function isAuthorized(): boolean {
  return cookies().get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}

export async function GET() {
  if (!isAuthorized()) {
    return NextResponse.json({ message: "未授权" }, { status: 401 });
  }
  return NextResponse.json(readObject<SiteSettings>("settings", defaultSiteSettings));
}

export async function PUT(request: Request) {
  if (!isAuthorized()) {
    return NextResponse.json({ message: "未授权" }, { status: 401 });
  }
  try {
    const data = (await request.json()) as SiteSettings;
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ message: "数据格式错误" }, { status: 400 });
    }
    writeObject<SiteSettings>("settings", data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "解析失败" }, { status: 400 });
  }
}
