import { aiCareRules } from "@/data/aiRules";
import type { AiCareAdvice, AiCareInput } from "@/types";

export function getAiCareRules() {
  return aiCareRules;
}

export function generateAiCareAdvice(input: AiCareInput): AiCareAdvice {
  const isDog = input.petType === "狗狗";
  const baseMap = isDog ? aiCareRules.dogBaseMinutes : aiCareRules.catBaseMinutes;
  const base = baseMap[input.size] ?? 20;
  const health = aiCareRules.healthAdjustments[input.health];
  const weather = aiCareRules.weatherAdjustments[input.weather];
  const minutes = Math.max(8, base + aiCareRules.ageAdjustments[input.age] + health.delta + weather.delta);
  const times = isDog ? (minutes > 45 ? 2 : 1) : 2;
  const intensity = input.age === "老年" || input.health !== "健康" || input.weather !== "晴朗"
    ? "低到中等"
    : input.size === "中大型"
      ? "中高"
      : "中等";

  return {
    minutes,
    times,
    intensity,
    notes: `${weather.note} ${health.note}`,
    device: input.petType === "狗狗" ? "易趣宠宠物定位器 + 电子围栏" : input.petType === "猫咪" ? "宠物监控器 + 智能饮水机" : "宠物监控器 + 安全档案",
    task: input.petType === "狗狗" ? "完成城市探索路线打卡" : "完成室内互动和饮水观察",
    safety: `${aiCareRules.trackerTips[input.hasTracker]} ${aiCareRules.serviceTips[input.petType]}`,
    dailyAdvice: `${input.breed}今日建议以稳定作息和可持续陪伴为主，结合${input.locationScenario ?? "日常"}场景安排活动。`,
    exerciseAdvice: `建议分 ${times} 次完成约 ${minutes} 分钟活动，强度控制在${intensity}。`,
    dietAdvice: input.health === "轻微超重" ? "控制零食和加餐，优先保持固定喂食时间。" : "保持原有主粮节奏，换粮或加餐都应循序渐进。",
    healthReminder: input.healthNote ? `重点观察：${input.healthNote}` : "观察精神、食欲、饮水和排便变化，异常持续时咨询兽医。",
    trackerAdvice: aiCareRules.trackerTips[input.hasTracker],
    cautions: ["智能建议仅供日常参考，不能替代兽医诊断。", "天气、年龄和健康状态变化时，应及时降低运动强度。"],
    source: "local"
  };
}
