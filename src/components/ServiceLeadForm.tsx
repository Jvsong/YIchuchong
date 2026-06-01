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

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rows = JSON.parse(window.localStorage.getItem("yqc-service-leads") ?? "[]") as typeof initial[];
    window.localStorage.setItem("yqc-service-leads", JSON.stringify([{ ...form, createdAt: new Date().toISOString() }, ...rows].slice(0, 20)));
    setSaved(true);
    setForm(initial);
  }

  return (
    <form className="card feature-card lead-form" onSubmit={submit}>
      <span className="eyebrow">预约线索 Demo</span>
      <h3 style={{ marginTop: 14 }}>留下服务需求</h3>
      <div className="form-grid">
        {[
          ["name", "联系人", "请输入姓名"],
          ["phone", "联系方式", "请输入手机号"],
          ["pet", "宠物信息", "例如：柯基 / 2岁 / 中型"]
        ].map(([key, label, placeholder]) => (
          <label className="field" key={key}>
            <span>{label}</span>
            <input value={form[key as keyof typeof form]} placeholder={placeholder} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} />
          </label>
        ))}
        <label className="field">
          <span>服务类型</span>
          <select value={form.service} onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}>
            <option>宠物寄养</option>
            <option>宠物代溜</option>
            <option>门店合作</option>
            <option>丢宠协寻</option>
          </select>
        </label>
      </div>
      <label className="field">
        <span>需求备注</span>
        <textarea value={form.note} rows={4} onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} />
      </label>
      <button className="pill" type="submit">保存本地线索</button>
      {saved ? <p className="form-success">已保存到本地演示线索，不会真实提交。</p> : null}
    </form>
  );
}
