"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import type { FunFact } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { pick } from "@/i18n/index";
import { tt } from "@/i18n/terms";

/** facts 由 server 端（lib/content.getFunFacts）筛选后以 props 下传，确保后台编辑实时生效。 */
export function FunFactTicker({ facts: allFacts }: { facts: FunFact[] }) {
  const { locale, dict } = useLocale();
  const facts = useMemo(() => allFacts.slice(0, 12), [allFacts]);
  const [index, setIndex] = useState(0);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed || facts.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % facts.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [closed, facts.length]);

  if (closed || facts.length === 0) {
    return null;
  }

  const fact = facts[index];

  return (
    <div className="fact-ticker" role="region" aria-label={dict.a11y.factRegion}>
      <div className="container fact-ticker-inner">
        <span className="fact-tag">{tt(fact.type, locale)}</span>
        <p key={fact.id} className="fact-copy" aria-live="polite">
          {pick(fact.body, locale)}
        </p>
        <button
          className="fact-close"
          type="button"
          aria-label={dict.a11y.factClose}
          onClick={() => setClosed(true)}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
