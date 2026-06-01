"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

const initial = {
  petType: "狗狗",
  breed: "金毛寻回犬",
  age: "成年",
  size: "中大型",
  health: "健康",
  weather: "晴朗",
  time: "45分钟"
};

export function AiCareDemo() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(initial);
  const [loading, setLoading] = useState(false);
  const advice = useMemo(() => {
    const isDog = submitted.petType === "狗狗";
    const hot = submitted.weather.includes("热") || submitted.weather.includes("雨");
    const senior = submitted.age === "老年" || submitted.health !== "健康";
    const minutes = isDog ? (senior ? 25 : hot ? 30 : submitted.size === "小型" ? 35 : 55) : senior ? 12 : 20;
    const times = isDog ? (minutes > 40 ? 2 : 1) : 2;
    return {
      minutes,
      times,
      intensity: senior || hot ? "低到中等" : submitted.size === "中大型" ? "中高" : "中等",
      notes: hot ? "避开正午，确认地面温度并补水。" : senior ? "减少冲刺，观察呼吸和步态。" : "保留 5 分钟嗅闻和放松时间。",
      device: isDog ? "易趣宠宠物定位器 + 电子围栏" : "宠物监控器 + 智能饮水机",
      task: isDog ? "完成城市探索路线打卡" : "完成室内互动和饮水观察"
    };
  }, [submitted]);

  function update(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function generate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setSubmitted(form);
      setLoading(false);
    }, 520);
  }

  return (
    <div className="ai-panel">
      <form className="card feature-card" aria-label="AI养宠助手表单" onSubmit={generate}>
        <div className="form-grid">
          {([
            ["petType", "宠物类型", ["狗狗", "猫咪", "小宠"]],
            ["breed", "品种", ["金毛寻回犬", "英短", "柯基", "布偶猫", "兔子"]],
            ["age", "年龄", ["幼年", "成年", "老年"]],
            ["size", "体型", ["小型", "中型", "中大型"]],
            ["health", "健康状态", ["健康", "轻微超重", "术后恢复", "关节敏感"]],
            ["weather", "今日天气", ["晴朗", "炎热", "小雨", "寒冷"]],
            ["time", "主人可用时间", ["15分钟", "30分钟", "45分钟", "60分钟"]]
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
        </div>
        <div className="button-row">
          <button className="pill" type="submit" disabled={loading}>
            {loading ? "生成中…" : "生成今日建议"}
          </button>
        </div>
      </form>
      <aside className={`suggestion ${loading ? "is-loading" : ""}`} aria-live="polite">
        <span className="eyebrow"><Sparkles size={16} aria-hidden="true" /> 今日建议</span>
        <h3 style={{ marginTop: 16 }}>为{submitted.breed}生成的养宠计划</h3>
        <div className="metrics">
          <div className="metric"><strong>{advice.minutes}</strong><span>分钟运动</span></div>
          <div className="metric"><strong>{advice.times}</strong><span>次安排</span></div>
          <div className="metric"><strong>{advice.intensity}</strong><span>强度</span></div>
        </div>
        <p>{advice.notes}</p>
        <ul className="feature-list">
          <li>推荐设备：{advice.device}</li>
          <li>推荐任务：{advice.task}</li>
          <li>可用时间：{submitted.time}</li>
        </ul>
      </aside>
    </div>
  );
}
