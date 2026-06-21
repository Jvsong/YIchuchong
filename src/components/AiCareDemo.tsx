"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Send, Sparkles, Trash2 } from "lucide-react";
import { generateAiCareAdvice } from "@/services/content";
import type { AiCareAdvice, AiCareInput } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";

const initial: AiCareInput = {
  petType: "dog",
  breed: "金毛寻回犬",
  age: "adult",
  size: "large",
  health: "healthy",
  weather: "clear",
  time: "45",
  hasTracker: "yes",
  weight: "18kg",
  activityLevel: "medium",
  healthNote: "",
  locationScenario: "indoor",
  userQuestion: "今天应该怎么安排运动和喂养？"
};

/** 各下拉的稳定 ID 取值（传给接口/本地规则），顺序与字典里的 options 一一对应；显示文案走 dict.aiCareForm。 */
const FIELD_VALUES = {
  petType: ["dog", "cat", "small"],
  breed: ["金毛寻回犬", "英短", "边境牧羊犬", "布偶猫", "缅因猫", "兔子"],
  age: ["puppy", "adult", "senior"],
  size: ["small", "medium", "large"],
  activityLevel: ["low", "medium", "high"],
  health: ["healthy", "overweight", "recovery", "joint"],
  weather: ["clear", "hot", "rain", "cold"],
  time: ["15", "30", "45", "60"],
  hasTracker: ["yes", "no"],
  locationScenario: ["walk", "indoor", "travel", "boarding", "recovery"]
} as const;

const FIELD_ORDER = [
  "petType", "breed", "age", "size", "activityLevel",
  "health", "weather", "time", "hasTracker", "locationScenario"
] as const;

export function AiCareDemo() {
  const { dict } = useLocale();
  const t = dict.aiCareForm;
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [remoteAdvice, setRemoteAdvice] = useState<AiCareAdvice | null>(null);
  const [message, setMessage] = useState("");
  const localAdvice = useMemo(() => generateAiCareAdvice(submitted), [submitted]);
  const advice = remoteAdvice ?? localAdvice;

  /** 把某字段的中文取值翻译成当前语言显示文案。 */
  function valueLabel(field: (typeof FIELD_ORDER)[number], value: string): string {
    const index = (FIELD_VALUES[field] as readonly string[]).indexOf(value);
    return index >= 0 ? t.fields[field].options[index] : value;
  }

  function update(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function generate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setRemoteAdvice(null);
    try {
      const response = await fetch("/api/pet-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json() as { ok?: boolean; advice?: AiCareAdvice; message?: string; source?: string };
      if (!response.ok || !result.ok || !result.advice) {
        throw new Error(result.message ?? t.status.failed);
      }
      setSubmitted(form);
      setRemoteAdvice(result.advice);
      setMessage(result.source === "deepseek" ? t.status.ai : t.status.local);
    } catch {
      setSubmitted(form);
      setRemoteAdvice(generateAiCareAdvice(form));
      setMessage(t.status.unavailable);
    } finally {
      setLoading(false);
    }
  }

  function clearForm() {
    setForm(initial);
    setSubmitted(initial);
    setRemoteAdvice(null);
    setMessage("");
  }

  return (
    <div className="ai-panel">
      <form className="card feature-card advice-form" aria-label={t.formAria} onSubmit={generate}>
        <div className="form-grid">
          {FIELD_ORDER.map((name) => (
            <label className="field" key={name}>
              <span>{t.fields[name].label}</span>
              <select
                name={name}
                value={form[name] ?? ""}
                autoComplete="off"
                onChange={(event) => update(name, event.target.value)}
              >
                {FIELD_VALUES[name].map((value, index) => (
                  <option key={value} value={value}>{t.fields[name].options[index]}</option>
                ))}
              </select>
            </label>
          ))}
          <label className="field">
            <span>{t.weightLabel}</span>
            <input value={form.weight ?? ""} placeholder={t.weightPh} onChange={(event) => update("weight", event.target.value)} />
          </label>
          <label className="field">
            <span>{t.healthNoteLabel}</span>
            <input value={form.healthNote ?? ""} placeholder={t.healthNotePh} onChange={(event) => update("healthNote", event.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>{t.questionLabel}</span>
          <textarea value={form.userQuestion ?? ""} rows={4} placeholder={t.questionPh} onChange={(event) => update("userQuestion", event.target.value)} />
        </label>
        <div className="button-row">
          <button className="pill" type="submit" disabled={loading}>
            {loading ? t.generating : <><Send size={17} aria-hidden="true" /> {t.generate}</>}
          </button>
          <button className="ghost-pill" type="button" onClick={clearForm} disabled={loading}>
            <Trash2 size={17} aria-hidden="true" /> {t.clear}
          </button>
          <button className="ghost-pill" type="submit" disabled={loading}>
            <RotateCcw size={17} aria-hidden="true" /> {t.regenerate}
          </button>
        </div>
      </form>
      <aside className={`suggestion ${loading ? "is-loading" : ""}`} aria-live="polite">
        <span className="eyebrow"><Sparkles size={16} aria-hidden="true" /> {t.resultEyebrow}</span>
        <h3 style={{ marginTop: 16 }}>{t.planForPrefix} {valueLabel("breed", submitted.breed)} {t.planForSuffix}</h3>
        {message ? <p className="form-success">{message}</p> : null}
        <div className="metrics">
          <div className="metric"><strong>{advice.minutes}</strong><span>{t.minutes}</span></div>
          <div className="metric"><strong>{advice.times}</strong><span>{t.times}</span></div>
          <div className="metric"><strong>{advice.intensity}</strong><span>{t.intensity}</span></div>
        </div>
        <div className="advice-result-grid">
          {[
            advice.dailyAdvice ?? advice.notes,
            advice.exerciseAdvice ?? advice.notes,
            advice.dietAdvice ?? t.fallbackDiet,
            advice.healthReminder ?? t.fallbackHealth,
            advice.trackerAdvice ?? advice.safety
          ].map((text, index) => (
            <div className="advice-result-card" key={t.cards[index]}>
              <strong>{t.cards[index]}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <ul className="feature-list">
          <li>{t.recDevice}{advice.device}</li>
          <li>{t.recTask}{advice.task}</li>
          <li>{t.recSafety}{advice.safety}</li>
          <li>{t.recTime}{valueLabel("time", submitted.time)}</li>
        </ul>
        <p className="advice-disclaimer">{t.disclaimer}</p>
      </aside>
    </div>
  );
}
