"use client";

import { useState } from "react";
import Image from "next/image";
import { Languages, Pencil, Plus, Trash2, X } from "lucide-react";
import { ImageInput } from "@/components/admin/ImageInput";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/index";

type Localized = { zh: string } & Partial<Record<Locale, string>>;
type AnyRecord = Record<string, unknown>;

const EMPTY_LOCALIZED: Localized = LOCALES.reduce((acc, loc) => ({ ...acc, [loc]: "" }), { zh: "" } as Localized);

function isLocalized(value: unknown): value is Localized {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "zh" in value;
}

const IMAGE_KEYS = ["image", "cover", "gallery", "thumb", "avatar", "logo", "photo"];
function isImageKey(key: string): boolean {
  const k = key.toLowerCase();
  return k === "path" || IMAGE_KEYS.some((token) => k.includes(token));
}

const LONG_KEYS = new Set([
  "summary", "content", "description", "body", "notes", "brandtagline",
  "healthrisks", "feedingtips", "devicesuggestion", "suitablepeople", "dailyexercise", "text"
]);
function isLongKey(key: string): boolean {
  return LONG_KEYS.has(key.toLowerCase());
}

const LABELS: Record<string, string> = {
  id: "ID", slug: "别名 slug", title: "标题", name: "名称", summary: "摘要", content: "正文",
  description: "描述", body: "内容", category: "分类", tags: "标签", status: "状态", statusLabel: "状态标签",
  coverImage: "封面图", image: "图片", gallery: "图集", features: "功能点", scenarios: "适用场景",
  futureIntegrations: "未来联动", processSteps: "流程步骤", safetyRules: "安全规范", requiredInfo: "所需信息",
  points: "服务亮点", temperament: "性格", careLevel: "养护难度", activityLevel: "活动需求",
  suitablePeople: "适合人群", dailyExercise: "每日运动", feedingTips: "喂养建议", healthRisks: "健康风险",
  deviceSuggestion: "设备建议", species: "物种", size: "体型", englishName: "英文名", publishDate: "发布日期",
  readTime: "阅读时长", sourceName: "来源名称", sourceUrl: "来源页面", relatedProductIds: "关联产品",
  relatedServiceIds: "关联服务", relatedProducts: "关联产品", relatedServices: "关联服务", path: "图片路径",
  breedSlug: "品种标识", identityVerified: "品种身份已核验", licenseVerified: "商用许可已核验",
  adminOnlyAttribution: "来源仅管理员可见", contentHash: "文件哈希", verificationNote: "核验说明",
  source: "来源平台", author: "摄影作者", license: "使用许可", checkedAt: "核验日期",
  fileName: "文件名", scene: "场景", usage: "用途",
  notes: "备注", priority: "优先级", enabled: "启用", pageScope: "页面范围", type: "类型",
  relatedLink: "相关链接", isCore: "核心产品", activity: "活动", breed: "品种", title2: "标题"
};
function labelFor(key: string): string {
  return LABELS[key] ?? key;
}

/** 弹窗编辑单条记录。表单按字段类型自动渲染（双语 / 图片 / 数组 / 布尔 / 文本）。 */
function RecordEditor<T extends AnyRecord>({
  title,
  record,
  onSave,
  onClose
}: {
  title: string;
  record: T;
  onSave: (next: T) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<T>(record);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");

  const update = (key: string, value: unknown) => setDraft({ ...draft, [key]: value });

  /** 收集所有多语字段的中文源 → 调 DeepSeek 翻译 → 回填英文 / 西班牙文等。 */
  async function translateAll() {
    setTranslating(true);
    setTranslateError("");
    const texts: Record<string, string> = {};
    for (const [key, value] of Object.entries(draft)) {
      if (isLocalized(value) && value.zh?.trim()) {
        texts[key] = value.zh;
      } else if (Array.isArray(value) && value.length > 0 && isLocalized(value[0])) {
        (value as Localized[]).forEach((item, i) => {
          if (item.zh?.trim()) texts[`${key}::${i}`] = item.zh;
        });
      }
    }
    const targets = LOCALES.filter((loc) => loc !== "zh");
    if (Object.keys(texts).length === 0 || targets.length === 0) {
      setTranslating(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts, targets })
      });
      const data = (await res.json()) as { translations?: Partial<Record<Locale, Record<string, string>>>; message?: string };
      if (!res.ok) throw new Error(data.message ?? "翻译失败");
      const translations = data.translations ?? {};
      setDraft((current) => {
        const next: AnyRecord = { ...current };
        for (const target of targets) {
          const map = translations[target];
          if (!map) continue;
          for (const [flatKey, translated] of Object.entries(map)) {
            if (flatKey.includes("::")) {
              const [k, idxStr] = flatKey.split("::");
              const idx = Number(idxStr);
              const arr = Array.isArray(next[k]) ? [...(next[k] as Localized[])] : [];
              if (arr[idx]) arr[idx] = { ...arr[idx], [target]: translated };
              next[k] = arr;
            } else if (isLocalized(next[flatKey])) {
              next[flatKey] = { ...(next[flatKey] as Localized), [target]: translated };
            }
          }
        }
        return next as T;
      });
    } catch (err) {
      setTranslateError(err instanceof Error ? err.message : "翻译失败");
    } finally {
      setTranslating(false);
    }
  }

  function renderField(key: string, value: unknown) {
    // 多语文本（中 / 英 / 西…）
    if (isLocalized(value)) {
      const Field = isLongKey(key) ? "textarea" : "input";
      return (
        <div className="loc-grid">
          {LOCALES.map((loc) => (
            <label className="field" key={loc}>
              <span>{LOCALE_LABELS[loc]}</span>
              <Field value={value[loc] ?? ""} rows={isLongKey(key) ? 3 : undefined} onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => update(key, { ...value, [loc]: e.target.value })} />
            </label>
          ))}
        </div>
      );
    }

    // 数组
    if (Array.isArray(value)) {
      // 多语数组
      if (value.length > 0 && isLocalized(value[0])) {
        const items = value as Localized[];
        return (
          <div className="array-editor">
            {items.map((item, index) => (
              <div className="loc-array-row" key={index}>
                {LOCALES.map((loc) => (
                  <input key={loc} value={item[loc] ?? ""} placeholder={LOCALE_LABELS[loc]} onChange={(e) => update(key, items.map((it, i) => (i === index ? { ...it, [loc]: e.target.value } : it)))} />
                ))}
                <button type="button" className="icon-btn" aria-label="删除" onClick={() => update(key, items.filter((_, i) => i !== index))}><X size={14} /></button>
              </div>
            ))}
            <button type="button" className="ghost-pill small" onClick={() => update(key, [...items, { ...EMPTY_LOCALIZED }])}><Plus size={14} /> 添加一项</button>
          </div>
        );
      }
      // 图集（图片数组）
      if (isImageKey(key)) {
        const imgs = value as string[];
        return (
          <div className="array-editor">
            {imgs.map((img, index) => (
              <div className="array-row" key={index}>
                <ImageInput value={img} onChange={(v) => update(key, imgs.map((it, i) => (i === index ? v : it)))} />
                <button type="button" className="icon-btn" aria-label="删除" onClick={() => update(key, imgs.filter((_, i) => i !== index))}><X size={14} /></button>
              </div>
            ))}
            <button type="button" className="ghost-pill small" onClick={() => update(key, [...imgs, ""])}><Plus size={14} /> 添加图片</button>
          </div>
        );
      }
      // 普通字符串数组（标签、关联 id 等）
      if (value.every((v) => typeof v === "string")) {
        const items = value as string[];
        return (
          <div className="array-editor">
            {items.map((item, index) => (
              <div className="array-row" key={index}>
                <input value={item} onChange={(e) => update(key, items.map((it, i) => (i === index ? e.target.value : it)))} />
                <button type="button" className="icon-btn" aria-label="删除" onClick={() => update(key, items.filter((_, i) => i !== index))}><X size={14} /></button>
              </div>
            ))}
            <button type="button" className="ghost-pill small" onClick={() => update(key, [...items, ""])}><Plus size={14} /> 添加一项</button>
          </div>
        );
      }
      // 复杂数组（对象数组）— 不可视化编辑，保留原值
      return <p className="editor-skip">（复杂字段，保留原值）</p>;
    }

    // 布尔
    if (typeof value === "boolean") {
      return (
        <label className="checkbox-field">
          <input type="checkbox" checked={value} onChange={(e) => update(key, e.target.checked)} />
          <span>{value ? "是" : "否"}</span>
        </label>
      );
    }

    // 数字
    if (typeof value === "number") {
      return <input type="number" value={value} onChange={(e) => update(key, Number(e.target.value))} />;
    }

    // 字符串
    if (typeof value === "string") {
      if (isImageKey(key)) {
        return <ImageInput value={value} onChange={(v) => update(key, v)} />;
      }
      if (isLongKey(key)) {
        return <textarea value={value} rows={3} onChange={(e) => update(key, e.target.value)} />;
      }
      return <input value={value} onChange={(e) => update(key, e.target.value)} />;
    }

    return <p className="editor-skip">（复杂字段，保留原值）</p>;
  }

  return (
    <div className="admin-modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" aria-label="关闭" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="admin-modal-body">
          {Object.entries(draft).map(([key, value]) => (
            <div className="editor-field" key={key}>
              <label className="editor-field-label">{labelFor(key)}</label>
              {renderField(key, value)}
            </div>
          ))}
        </div>
        <div className="admin-modal-foot">
          {translateError ? <span className="form-error" style={{ marginRight: "auto" }}>{translateError}</span> : null}
          <button type="button" className="ghost-pill" onClick={translateAll} disabled={translating} title="用 DeepSeek 把中文自动翻译为英文 / 西班牙文">
            <Languages size={15} /> {translating ? "翻译中…" : "一键翻译"}
          </button>
          <button type="button" className="ghost-pill" onClick={onClose}>取消</button>
          <button type="button" className="pill" onClick={() => onSave(draft)}>保存</button>
        </div>
      </div>
    </div>
  );
}

/** 内容列表 + 新增 / 编辑 / 删除。 */
export function RecordManager<T extends AnyRecord>({
  title,
  rows,
  getKey,
  primary,
  secondary,
  thumb,
  makeNew,
  onChange,
  loading
}: {
  title: string;
  rows: T[];
  getKey: (row: T) => string;
  primary: (row: T) => string;
  secondary?: (row: T) => string;
  thumb?: (row: T) => string | undefined;
  makeNew: () => T;
  onChange: (rows: T[]) => void;
  loading?: boolean;
}) {
  const [editing, setEditing] = useState<{ record: T; isNew: boolean; key: string } | null>(null);
  const [query, setQuery] = useState("");
  const visible = query
    ? rows.filter((row) => `${primary(row)} ${secondary?.(row) ?? ""}`.toLowerCase().includes(query.toLowerCase()))
    : rows;

  function openNew() {
    setEditing({ record: makeNew(), isNew: true, key: "" });
  }
  function openEdit(row: T) {
    setEditing({ record: row, isNew: false, key: getKey(row) });
  }
  function save(next: T) {
    if (!editing) return;
    if (editing.isNew) {
      onChange([next, ...rows]);
    } else {
      onChange(rows.map((row) => (getKey(row) === editing.key ? next : row)));
    }
    setEditing(null);
  }
  function remove(row: T) {
    if (window.confirm("确认删除这条内容？删除后不可恢复。")) {
      onChange(rows.filter((item) => getKey(item) !== getKey(row)));
    }
  }

  return (
    <>
      <div className="section-head">
        <div><span className="eyebrow">Content Studio</span><h1 style={{ fontSize: "3rem" }}>{title}</h1></div>
        <button className="pill" type="button" onClick={openNew}><Plus size={16} /> 新增内容</button>
      </div>

      {loading ? <p>加载中…</p> : null}

      <div className="record-toolbar">
        <input
          className="record-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索内容…"
        />
        <span className="record-count">共 {rows.length} 条{query ? ` · 匹配 ${visible.length} 条` : ""}</span>
      </div>

      <div className="record-list">
        {rows.length === 0 ? <div className="card feature-card">暂无内容，点击「新增内容」开始创建。</div> : null}
        {visible.map((row) => {
          const image = thumb?.(row);
          return (
            <div className="record-row" key={getKey(row)}>
              {image ? <Image className="record-thumb" src={image} alt="" width={64} height={48} /> : <div className="record-thumb placeholder" aria-hidden="true" />}
              <div className="record-meta">
                <strong>{primary(row) || "（未命名）"}</strong>
                {secondary ? <span>{secondary(row)}</span> : null}
              </div>
              <div className="record-actions">
                <button type="button" className="ghost-pill small" onClick={() => openEdit(row)}><Pencil size={14} /> 编辑</button>
                <button type="button" className="ghost-pill small danger" onClick={() => remove(row)}><Trash2 size={14} /> 删除</button>
              </div>
            </div>
          );
        })}
      </div>

      {editing ? (
        <RecordEditor
          title={editing.isNew ? `新增：${title}` : `编辑：${primary(editing.record) || title}`}
          record={editing.record}
          onSave={save}
          onClose={() => setEditing(null)}
        />
      ) : null}
    </>
  );
}
