import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./index";
import { getDictionary } from "./dictionaries";

/** 服务端读取当前语言（来自 cookie），默认中文。 */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** 服务端便捷方法：直接拿到当前语言对应的 UI 字典。 */
export function getServerDictionary() {
  return getDictionary(getLocale());
}
