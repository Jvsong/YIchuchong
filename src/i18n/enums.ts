import { pick, type Locale, type LocalizedText } from "./index";

/**
 * 枚举 = 稳定英文 ID + 多语标签表。
 * 逻辑/存储只用 ID（改文案不断逻辑、迁语言不破坏类型）；显示时用 enumLabel 查表。
 */

export type ProductStatus = "core" | "planned" | "coming-soon" | "future";
export const productStatusLabels: Record<ProductStatus, LocalizedText> = {
  core: { zh: "核心产品", en: "Core Product", es: "Producto principal" },
  planned: { zh: "生态规划", en: "Ecosystem Plan", es: "Plan de ecosistema" },
  "coming-soon": { zh: "即将接入", en: "Coming Soon", es: "Próximamente" },
  future: { zh: "未来能力", en: "Future Capability", es: "Capacidad futura" }
};

export type ServiceStatus = "available" | "planned" | "future";
export const serviceStatusLabels: Record<ServiceStatus, LocalizedText> = {
  available: { zh: "展示中", en: "Available", es: "Disponible" },
  planned: { zh: "生态规划", en: "Ecosystem Plan", es: "Plan de ecosistema" },
  future: { zh: "未来能力", en: "Future Capability", es: "Capacidad futura" }
};

export type NewsStatus = "published" | "draft";
export const newsStatusLabels: Record<NewsStatus, LocalizedText> = {
  published: { zh: "已发布", en: "Published", es: "Publicado" },
  draft: { zh: "草稿", en: "Draft", es: "Borrador" }
};

export type TaskStatus = "recommended" | "available" | "future";
export const taskStatusLabels: Record<TaskStatus, LocalizedText> = {
  recommended: { zh: "今日推荐", en: "Today's pick", es: "Recomendado hoy" },
  available: { zh: "可完成", en: "Available", es: "Disponible" },
  future: { zh: "未来联动", en: "Future linkage", es: "Vínculo futuro" }
};

export type BadgeLevel = "basic" | "advanced" | "rare";
export const badgeLevelLabels: Record<BadgeLevel, LocalizedText> = {
  basic: { zh: "基础", en: "Basic", es: "Básico" },
  advanced: { zh: "进阶", en: "Advanced", es: "Avanzado" },
  rare: { zh: "稀有", en: "Rare", es: "Raro" }
};

/** 把枚举 ID 解析为当前语言的显示文案；未知 ID 原样回退。 */
export function enumLabel<T extends string>(
  map: Record<T, LocalizedText>,
  id: T,
  locale: Locale
): string {
  const entry = map[id];
  return entry ? pick(entry, locale) : id;
}

/** 旧中文枚举值 → 新 ID（迁移 storage 旧数据与读取容错用）。 */
export const LEGACY_ENUM_IDS: Record<string, string> = {
  "核心产品": "core", "生态规划": "planned", "即将接入": "coming-soon", "未来能力": "future",
  "展示中": "available",
  "已发布": "published", "草稿": "draft",
  "今日推荐": "recommended", "可完成": "available", "未来联动": "future",
  "基础": "basic", "进阶": "advanced", "稀有": "rare"
};
