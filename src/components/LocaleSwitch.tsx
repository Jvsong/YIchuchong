"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALES, LOCALE_FLAGS, LOCALE_LABELS } from "@/i18n/index";

export function LocaleSwitch() {
  const { locale, setLocale, dict } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    function onEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className={`locale-switch ${open ? "is-open" : ""}`} ref={ref}>
      <button
        type="button"
        className="locale-switch-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dict.locale.switchTo}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="locale-flag" aria-hidden="true">{LOCALE_FLAGS[locale]}</span>
        <span className="locale-name">{LOCALE_LABELS[locale]}</span>
        <ChevronDown size={15} className="locale-chevron" aria-hidden="true" />
      </button>
      {open ? (
        <ul className="locale-switch-menu" role="listbox">
          {LOCALES.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === locale}
                className={`locale-switch-option ${loc === locale ? "active" : ""}`}
                onClick={() => {
                  setLocale(loc);
                  setOpen(false);
                }}
              >
                <span className="locale-flag" aria-hidden="true">{LOCALE_FLAGS[loc]}</span>
                <span className="locale-name">{LOCALE_LABELS[loc]}</span>
                {loc === locale ? <Check size={14} aria-hidden="true" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
