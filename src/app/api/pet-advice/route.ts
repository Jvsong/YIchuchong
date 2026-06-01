import { NextResponse } from "next/server";
import { generateAiCareAdvice } from "@/services/aiCareService";
import type { AiCareAdvice, AiCareInput } from "@/types";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEFAULT_MODEL = "deepseek-chat";
const DISCLAIMER = "智能建议仅供参考，不能替代兽医诊断；如宠物持续异常，请及时咨询专业兽医。";

function normalizeInput(body: Partial<AiCareInput>): AiCareInput {
  return {
    petType: body.petType === "猫咪" || body.petType === "小宠" ? body.petType : "狗狗",
    breed: String(body.breed ?? "混合品种").slice(0, 40),
    age: body.age === "幼年" || body.age === "老年" ? body.age : "成年",
    size: body.size === "小型" || body.size === "中型" ? body.size : "中大型",
    weight: String(body.weight ?? "").slice(0, 20),
    activityLevel: body.activityLevel === "偏低" || body.activityLevel === "较高" ? body.activityLevel : "适中",
    health: body.health === "轻微超重" || body.health === "术后恢复" || body.health === "关节敏感" ? body.health : "健康",
    healthNote: String(body.healthNote ?? "").slice(0, 180),
    weather: body.weather === "炎热" || body.weather === "小雨" || body.weather === "寒冷" ? body.weather : "晴朗",
    time: body.time === "15分钟" || body.time === "30分钟" || body.time === "60分钟" ? body.time : "45分钟",
    hasTracker: body.hasTracker === "未佩戴" ? "未佩戴" : "已佩戴",
    locationScenario:
      body.locationScenario === "日常遛狗" ||
      body.locationScenario === "室内陪伴" ||
      body.locationScenario === "旅行" ||
      body.locationScenario === "寄养" ||
      body.locationScenario === "生病恢复期" ||
      body.locationScenario === "户外"
        ? body.locationScenario
        : "室内陪伴",
    userQuestion: String(body.userQuestion ?? "").slice(0, 240)
  };
}

function fallback(input: AiCareInput, message = "当前智能服务不可用，已使用本地规则生成建议。") {
  return NextResponse.json({
    ok: true,
    source: "local",
    message,
    disclaimer: DISCLAIMER,
    advice: generateAiCareAdvice(input)
  });
}

function parseAdvice(content: string, input: AiCareInput): AiCareAdvice {
  try {
    const parsed = JSON.parse(content) as Partial<AiCareAdvice>;
    const local = generateAiCareAdvice(input);
    return {
      ...local,
      ...parsed,
      source: "deepseek",
      cautions: [
        ...(parsed.cautions ?? []),
        "智能建议仅供参考，不能替代兽医诊断。"
      ].slice(0, 5)
    };
  } catch {
    return {
      ...generateAiCareAdvice(input),
      dailyAdvice: content.slice(0, 500),
      source: "deepseek",
      cautions: ["智能建议仅供参考，不能替代兽医诊断。"]
    };
  }
}

export async function POST(request: Request) {
  let input: AiCareInput;
  try {
    input = normalizeInput(await request.json());
  } catch {
    return NextResponse.json({ ok: false, message: "请求格式不正确，请检查表单内容。" }, { status: 400 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return fallback(input, "未配置 DEEPSEEK_API_KEY，已使用本地规则生成建议。");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL ?? DEFAULT_MODEL,
        temperature: 0.4,
        max_tokens: 900,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "你是谨慎、可靠的宠物日常照护建议助手。只输出 JSON，不输出 Markdown。字段包含 dailyAdvice, exerciseAdvice, dietAdvice, healthReminder, trackerAdvice, cautions。建议应克制、实用，并明确不能替代兽医诊断。"
          },
          {
            role: "user",
            content: JSON.stringify(input)
          }
        ]
      })
    });

    if (!response.ok) {
      return fallback(input);
    }

    const data = await response.json() as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return fallback(input);
    }

    return NextResponse.json({
      ok: true,
      source: "deepseek",
      disclaimer: DISCLAIMER,
      advice: parseAdvice(content, input)
    });
  } catch {
    return fallback(input);
  } finally {
    clearTimeout(timeout);
  }
}
