"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Send, Sparkles, Trash2 } from "lucide-react";
import { generateAiCareAdvice } from "@/services/content";
import type { AiCareAdvice, AiCareInput } from "@/types";

const initial: AiCareInput = {
  petType: "狗狗",
  breed: "金毛寻回犬",
  age: "成年",
  size: "中大型",
  health: "健康",
  weather: "晴朗",
  time: "45分钟",
  hasTracker: "已佩戴",
  weight: "18kg",
  activityLevel: "适中",
  healthNote: "",
  locationScenario: "室内陪伴",
  userQuestion: "今天应该怎么安排运动和喂养？"
};

export function AiCareDemo() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [remoteAdvice, setRemoteAdvice] = useState<AiCareAdvice | null>(null);
  const [message, setMessage] = useState("");
  const localAdvice = useMemo(() => {
    return generateAiCareAdvice(submitted);
  }, [submitted]);
  const advice = remoteAdvice ?? localAdvice;

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
        throw new Error(result.message ?? "生成失败");
      }
      setSubmitted(form);
      setRemoteAdvice(result.advice);
      setMessage(result.message ?? (result.source === "deepseek" ? "已生成智能养宠建议。" : "已使用本地规则生成建议。"));
    } catch {
      setSubmitted(form);
      setRemoteAdvice(generateAiCareAdvice(form));
      setMessage("智能服务暂时不可用，已使用本地规则生成建议。");
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
      <form className="card feature-card advice-form" aria-label="养宠建议表单" onSubmit={generate}>
        <div className="form-grid">
          {([
            ["petType", "宠物类型", ["狗狗", "猫咪", "小宠"]],
            ["breed", "品种", ["金毛寻回犬", "英短", "边境牧羊犬", "布偶猫", "缅因猫", "兔子"]],
            ["age", "年龄", ["幼年", "成年", "老年"]],
            ["size", "体型", ["小型", "中型", "中大型"]],
            ["activityLevel", "运动量", ["偏低", "适中", "较高"]],
            ["health", "健康状态", ["健康", "轻微超重", "术后恢复", "关节敏感"]],
            ["weather", "今日天气", ["晴朗", "炎热", "小雨", "寒冷"]],
            ["time", "主人可用时间", ["15分钟", "30分钟", "45分钟", "60分钟"]],
            ["hasTracker", "是否佩戴定位器", ["已佩戴", "未佩戴"]],
            ["locationScenario", "当前场景", ["日常遛狗", "室内陪伴", "旅行", "寄养", "生病恢复期"]]
          ] as const).map(([name, label, options]) => (
            <label className="field" key={name}>
              <span>{label}</span>
              <select
                name={name}
                value={form[name]}
                autoComplete="off"
                onChange={(event) => update(name, event.target.value)}
              >
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
          <label className="field">
            <span>体重</span>
            <input value={form.weight ?? ""} placeholder="例如 18kg" onChange={(event) => update("weight", event.target.value)} />
          </label>
          <label className="field">
            <span>健康备注</span>
            <input value={form.healthNote ?? ""} placeholder="例如 最近有点挑食" onChange={(event) => update("healthNote", event.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>你想咨询的问题</span>
          <textarea value={form.userQuestion ?? ""} rows={4} placeholder="例如 今天下雨，狗狗还需要出门运动吗？" onChange={(event) => update("userQuestion", event.target.value)} />
        </label>
        <div className="button-row">
          <button className="pill" type="submit" disabled={loading}>
            {loading ? "生成中…" : <><Send size={17} aria-hidden="true" /> 生成养宠建议</>}
          </button>
          <button className="ghost-pill" type="button" onClick={clearForm} disabled={loading}>
            <Trash2 size={17} aria-hidden="true" /> 清空
          </button>
          <button className="ghost-pill" type="submit" disabled={loading}>
            <RotateCcw size={17} aria-hidden="true" /> 重新生成
          </button>
        </div>
      </form>
      <aside className={`suggestion ${loading ? "is-loading" : ""}`} aria-live="polite">
        <span className="eyebrow"><Sparkles size={16} aria-hidden="true" /> 今日养宠建议</span>
        <h3 style={{ marginTop: 16 }}>为{submitted.breed}生成的养宠计划</h3>
        {message ? <p className="form-success">{message}</p> : null}
        <div className="metrics">
          <div className="metric"><strong>{advice.minutes}</strong><span>分钟运动</span></div>
          <div className="metric"><strong>{advice.times}</strong><span>次安排</span></div>
          <div className="metric"><strong>{advice.intensity}</strong><span>强度</span></div>
        </div>
        <div className="advice-result-grid">
          {[
            ["今日建议", advice.dailyAdvice ?? advice.notes],
            ["运动建议", advice.exerciseAdvice ?? advice.notes],
            ["饮食建议", advice.dietAdvice ?? "保持原有主粮节奏，换粮和加餐都应循序渐进。"],
            ["健康提醒", advice.healthReminder ?? "观察精神、食欲、饮水和排便变化。"],
            ["定位器建议", advice.trackerAdvice ?? advice.safety]
          ].map(([title, text]) => (
            <div className="advice-result-card" key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <ul className="feature-list">
          <li>推荐设备：{advice.device}</li>
          <li>推荐任务：{advice.task}</li>
          <li>安全提醒：{advice.safety}</li>
          <li>可用时间：{submitted.time}</li>
        </ul>
        <p className="advice-disclaimer">智能建议仅供参考，不能替代兽医诊断；如宠物持续异常，请及时咨询专业兽医。</p>
      </aside>
    </div>
  );
}
