"use client";

import { useState } from "react";
import Link from "next/link";
import { Headphones, LockKeyhole, RotateCcw, ShieldCheck, type LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { brandEmblem, brandName } from "@/i18n/index";

const promiseIcons: LucideIcon[] = [ShieldCheck, Headphones, RotateCcw, LockKeyhole];

export function Footer({ brandEmail }: { brandEmail: string }) {
  const { locale, dict } = useLocale();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      <div className="container footer-service-strip">
        {dict.footer.promises.map((item, index) => {
          const Icon = promiseIcons[index] ?? ShieldCheck;
          return (
            <article className="footer-service" key={item.title}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="container footer-newsletter">
        <div>
          <span className="section-label light">Epet Club</span>
          <h2>{dict.footer.newsletterTitle}</h2>
          <p>{dict.footer.newsletterText}</p>
        </div>
        <form
          className="newsletter-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubscribed(true);
          }}
        >
          <label className="field">
            <span>{dict.footer.emailLabel}</span>
            <input type="email" placeholder={dict.footer.emailPlaceholder} required />
          </label>
          <button className="pill" type="submit">{dict.footer.subscribe}</button>
          {subscribed ? <p className="form-note" aria-live="polite">{dict.footer.subscribed}</p> : null}
        </form>
      </div>
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-emblem" aria-hidden="true">{brandEmblem(locale)}</span>
            <span className="brand-text" translate="no">{brandName(locale)}</span>
          </div>
          <p className="footer-brand-copy">{dict.footer.brandTagline}</p>
          <p>{brandEmail}</p>
        </div>
        {dict.footer.groups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <p key={link.href + link.label}>
                <Link href={link.href}>{link.label}</Link>
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="container footer-rights">
        <p>© {new Date().getFullYear()} {dict.footer.rights}</p>
      </div>
    </footer>
  );
}
