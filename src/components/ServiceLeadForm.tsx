"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

const initial = {
  name: "",
  phone: "",
  service: "",
  pet: "",
  note: ""
};

export function ServiceLeadForm() {
  const { dict } = useLocale();
  const [form, setForm] = useState({ ...initial, service: dict.lead.services[0] });
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const rows = JSON.parse(window.localStorage.getItem("yqc-service-leads") ?? "[]") as typeof initial[];
    window.localStorage.setItem("yqc-service-leads", JSON.stringify([{ ...form, createdAt: new Date().toISOString() }, ...rows].slice(0, 20)));
    setSaved(true);
    setForm({ ...initial, service: dict.lead.services[0] });
    window.setTimeout(() => setSubmitting(false), 300);
  }

  return (
    <form className="card feature-card lead-form" onSubmit={submit}>
      <span className="eyebrow">{dict.lead.kicker}</span>
      <h3 style={{ marginTop: 14 }}>{dict.lead.title}</h3>
      <div className="form-grid">
        <label className="field">
          <span>{dict.lead.name}</span>
          <input required value={form.name} placeholder={dict.lead.namePh} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
        </label>
        <label className="field">
          <span>{dict.lead.pet}</span>
          <input required value={form.pet} placeholder={dict.lead.petPh} onChange={(event) => setForm((current) => ({ ...current, pet: event.target.value }))} />
        </label>
        <label className="field">
          <span>{dict.lead.phone}</span>
          <input required type="tel" value={form.phone} placeholder={dict.lead.phonePh} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
        </label>
        <label className="field">
          <span>{dict.lead.serviceType}</span>
          <select required value={form.service} onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}>
            {dict.lead.services.map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
      </div>
      <label className="field">
        <span>{dict.lead.note}</span>
        <textarea value={form.note} rows={4} placeholder={dict.lead.notePh} onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} />
      </label>
      <button className="pill" type="submit" disabled={submitting}>{submitting ? dict.lead.submitting : dict.lead.submit}</button>
      {saved ? <p className="form-success">{dict.lead.saved}</p> : null}
    </form>
  );
}
