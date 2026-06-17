"use client";

import { useState } from "react";

const initial = {
  name: "",
  phone: "",
  service: "宠物寄养",
  pet: "",
  note: ""
};

export function ServiceLeadForm() {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const rows = JSON.parse(window.localStorage.getItem("yqc-service-leads") ?? "[]") as typeof initial[];
    window.localStorage.setItem("yqc-service-leads", JSON.stringify([{ ...form, createdAt: new Date().toISOString() }, ...rows].slice(0, 20)));
    setSaved(true);
    setForm(initial);
    window.setTimeout(() => setSubmitting(false), 300);
  }

  return (
    <form className="card feature-card lead-form" onSubmit={submit}>
      <span className="eyebrow">服务咨询</span>
      <h3 style={{ marginTop: 14 }}>留下你的宠物服务需求</h3>
      <div className="form-grid">
        {[
          ["name", "联系人", "请输入姓名"],
          ["pet", "宠物信息", "例如：柯基 / 2岁 / 中型"]
        ].map(([key, label, placeholder]) => (
          <label className="field" key={key}>
            <span>{label}</span>
            <input required value={form[key as keyof typeof form]} placeholder={placeholder} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} />
          </label>
        ))}
        <label className="field">
          <span>联系方式</span>
          <input required type="tel" value={form.phone} placeholder="请输入手机号" onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
        </label>
        <label className="field">
          <span>服务类型</span>
          <select required value={form.service} onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}>
            <option>宠物寄养</option>
            <option>宠物代溜</option>
            <option>门店合作</option>
            <option>丢宠协寻</option>
          </select>
        </label>
      </div>
      <label className="field">
        <span>需求备注</span>
        <textarea value={form.note} rows={4} placeholder="例如：寄养 3 天、希望每天有照片日报、宠物已免疫" onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} />
      </label>
      <button className="pill" type="submit" disabled={submitting}>{submitting ? "提交中..." : "提交咨询需求"}</button>
      {saved ? <p className="form-success">已记录咨询需求。当前为本地演示保存，生产环境将接入后台线索系统。</p> : null}
    </form>
  );
}
