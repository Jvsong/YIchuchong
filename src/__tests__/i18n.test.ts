import { describe, expect, it } from "vitest";
import { pick, pickList, LOCALES } from "@/i18n/index";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageDictionary } from "@/i18n/pageDictionaries";
import {
  badgeLevelLabels,
  enumLabel,
  newsStatusLabels,
  productStatusLabels,
  serviceStatusLabels,
  taskStatusLabels
} from "@/i18n/enums";

describe("pick fallback chain", () => {
  it("纯字符串原样返回", () => {
    expect(pick("hello", "en")).toBe("hello");
  });
  it("命中目标语言", () => {
    expect(pick({ zh: "中", en: "EN", es: "ES" }, "es")).toBe("ES");
  });
  it("缺西语 → 回退英文（英文保底）", () => {
    expect(pick({ zh: "中", en: "EN" }, "es")).toBe("EN");
  });
  it("只有中文 → 回退中文", () => {
    expect(pick({ zh: "中" }, "es")).toBe("中");
  });
  it("空值 → 空串", () => {
    expect(pick(undefined, "en")).toBe("");
  });
  it("pickList 批量解析", () => {
    expect(pickList([{ zh: "中", en: "EN" }, "raw"], "en")).toEqual(["EN", "raw"]);
  });
});

describe("enumLabel 标签表完整", () => {
  const maps = { productStatusLabels, serviceStatusLabels, newsStatusLabels, taskStatusLabels, badgeLevelLabels };
  for (const [name, map] of Object.entries(maps)) {
    it(`${name} 每个 ID 在每种语言都有非空标签`, () => {
      for (const id of Object.keys(map) as (keyof typeof map)[]) {
        for (const locale of LOCALES) {
          expect(enumLabel(map as never, id as never, locale).length).toBeGreaterThan(0);
        }
      }
    });
  }
  it("未知 ID 原样回退", () => {
    expect(enumLabel(productStatusLabels, "core", "en")).toBe("Core Product");
  });
});

/** 递归收集对象的 key 路径（数组只看长度，叶子不展开）。 */
function keyShape(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return [`${prefix}[${value.length}]`];
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .flatMap((k) => keyShape((value as Record<string, unknown>)[k], `${prefix}.${k}`));
  }
  return [prefix];
}

describe("i18n key parity（三语结构一致）", () => {
  it("dictionaries 三语 key 完全一致", () => {
    const en = keyShape(getDictionary("en"));
    expect(keyShape(getDictionary("zh"))).toEqual(en);
    expect(keyShape(getDictionary("es"))).toEqual(en);
  });
  it("pageDictionaries 三语 key 完全一致", () => {
    const en = keyShape(getPageDictionary("en"));
    expect(keyShape(getPageDictionary("zh"))).toEqual(en);
    expect(keyShape(getPageDictionary("es"))).toEqual(en);
  });
});
