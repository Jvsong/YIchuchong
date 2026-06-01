"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { getFunFacts } from "@/services/content";

export function FunFactTicker() {
  const facts = useMemo(() => getFunFacts(), []);
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
    <div className="fact-ticker" role="region" aria-label="宠物科普提示">
      <div className="container fact-ticker-inner">
        <span className="fact-kicker">你知道吗？</span>
        <span className="fact-tag">{fact.type}</span>
        <p key={fact.id} className="fact-copy" aria-live="polite">
          {fact.body}
        </p>
        <button
          className="fact-close"
          type="button"
          aria-label="关闭宠物科普提示"
          onClick={() => setClosed(true)}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
