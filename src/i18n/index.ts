export type Locale = "en" | "zh" | "es";

/** 以英语为主：默认语言、列表顺序、回退基准都以 en 优先。 */
export const LOCALES: Locale[] = ["en", "zh", "es"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "yqc_locale";

/** 语言展示名（切换器、后台编辑器复用）。新增语言时这里加一项即可。 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  es: "Español"
};

/** 各语言对应国旗（emoji）。 */
export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  zh: "🇨🇳",
  es: "🇪🇸"
};

/** 品牌名：中文用「易趣宠」，其余语言统一用英文名「Epet」。 */
export function brandName(locale: Locale): string {
  return locale === "zh" ? "易趣宠" : "Epet";
}
export function brandEmblem(locale: Locale): string {
  return locale === "zh" ? "趣" : "E";
}

/** zh 为基准必填，其余语言可选；缺失时由 pick() 回退。 */
export type LocalizedText = { zh: string; en?: string; es?: string };

/** 把一个可能是多语对象、也可能是纯字符串的值解析为当前语言的字符串。
 *  以英语保底：目标语言 → 英文 → 中文。纯字符串原样返回。 */
export function pick(value: string | LocalizedText | undefined | null, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value.en ?? value.zh ?? "";
}

/** 把一组多语标签解析为当前语言的字符串数组。 */
export function pickList(
  values: (string | LocalizedText)[] | undefined | null,
  locale: Locale
): string[] {
  if (!values) return [];
  return values.map((item) => pick(item, locale));
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as string[]).includes(value);
}
