import { describe, expect, it } from "vitest";
import { breeds } from "@/data/breeds";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { newsItems } from "@/data/news";
import { generateAiCareAdvice } from "@/services/aiCareService";
import { productStatusLabels, serviceStatusLabels } from "@/i18n/enums";
import type { AiCareInput } from "@/data/types";

describe("数据生成器在真实数据上不抛错", () => {
  it("breeds 全部生成且字段齐全（含 carePreset/lifespan 衍生字段）", () => {
    expect(breeds.length).toBeGreaterThanOrEqual(40);
    for (const b of breeds) {
      expect(b.slug).toBeTruthy();
      expect(b.name.zh).toBeTruthy();
      expect(b.image).toMatch(/^\/assets\//);
      // 这些字段来自 carePreset/lifespan 衍生，缺失会在生成时抛错——此断言兜底
      expect(b.lifespan.zh).toBeTruthy();
      expect(b.groomingNeeds.zh).toBeTruthy();
    }
  });
  it("news 全部已发布且 status 为新 ID", () => {
    expect(newsItems.length).toBeGreaterThan(0);
    for (const n of newsItems) expect(n.status).toBe("published");
  });
});

describe("枚举 ID 合法（数据只用 ID，不再用中文）", () => {
  it("product.status 都是合法 ID", () => {
    const ids = Object.keys(productStatusLabels);
    for (const p of products) expect(ids).toContain(p.status);
  });
  it("service.status 都是合法 ID", () => {
    const ids = Object.keys(serviceStatusLabels);
    for (const s of services) expect(ids).toContain(s.status);
  });
});

describe("养宠建议本地规则引擎", () => {
  const base: AiCareInput = {
    petType: "dog",
    breed: "金毛寻回犬",
    age: "adult",
    size: "large",
    health: "healthy",
    weather: "clear",
    time: "45",
    hasTracker: "yes",
    activityLevel: "medium",
    locationScenario: "indoor"
  };
  it("狗狗常规输入返回合理时长", () => {
    const a = generateAiCareAdvice(base);
    expect(a.minutes).toBeGreaterThanOrEqual(8);
    expect(a.source).toBe("local");
    expect(a.device).toContain("定位器");
  });
  it("术后恢复降低运动量", () => {
    const recovery = generateAiCareAdvice({ ...base, health: "recovery" });
    expect(recovery.minutes).toBeLessThan(generateAiCareAdvice(base).minutes);
  });
  it("猫咪走另一套基数", () => {
    const cat = generateAiCareAdvice({ ...base, petType: "cat" });
    expect(cat.minutes).toBeGreaterThanOrEqual(8);
  });
});
