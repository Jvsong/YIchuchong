import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/admin-auth";
import { LOCALE_LABELS, type Locale } from "@/i18n/index";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEFAULT_MODEL = "deepseek-chat";

function isAuthorized(): boolean {
  return cookies().get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}

type Body = { texts: Record<string, string>; targets: Locale[] };

export async function POST(request: Request) {
  if (!isAuthorized()) {
    return NextResponse.json({ message: "未授权" }, { status: 401 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "未配置 DEEPSEEK_API_KEY，无法自动翻译。请在 .env.local 或服务器环境变量中配置后重试。" },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ message: "请求格式错误" }, { status: 400 });
  }

  const targets = (body.targets ?? []).filter((t) => t !== "zh");
  const entries = Object.entries(body.texts ?? {}).filter(([, v]) => typeof v === "string" && v.trim());
  if (targets.length === 0 || entries.length === 0) {
    return NextResponse.json({ translations: {} });
  }
  const texts = Object.fromEntries(entries);
  const targetNames = targets.map((t) => `${t} (${LOCALE_LABELS[t]})`).join(", ");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL ?? DEFAULT_MODEL,
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a professional website localizer for a pet-tech brand. The brand is named 易趣宠 in Chinese and 'Epet' in English and all other languages. " +
              `Translate the Chinese string values in the given JSON into these target languages: ${targetNames}. ` +
              "Keep keys identical. Keep translations natural, concise and consistent in marketing tone. Render the brand name as 'Epet' (never 'Yiquchong') in non-Chinese languages. " +
              'Return ONLY a JSON object shaped exactly as {"<localeCode>": {<same keys>: "<translation>"}} containing one entry per requested target locale code (e.g. "en", "es").'
          },
          { role: "user", content: JSON.stringify({ targets, texts }) }
        ]
      })
    });

    if (!response.ok) {
      return NextResponse.json({ message: "翻译服务返回错误，请稍后重试。" }, { status: 502 });
    }
    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ message: "翻译服务无有效返回。" }, { status: 502 });
    }

    let parsed: Record<string, Record<string, string>>;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json({ message: "翻译结果解析失败。" }, { status: 502 });
    }

    const translations: Partial<Record<Locale, Record<string, string>>> = {};
    for (const target of targets) {
      if (parsed[target] && typeof parsed[target] === "object") {
        translations[target] = parsed[target];
      }
    }
    return NextResponse.json({ translations });
  } catch {
    return NextResponse.json({ message: "翻译超时或网络错误，请稍后重试。" }, { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}
