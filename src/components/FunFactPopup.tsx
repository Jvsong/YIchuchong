"use client";

import { useMemo, useState } from "react";
import { funFacts } from "@/data/site";

export function FunFactPopup() {
  const [closed, setClosed] = useState(false);
  const fact = useMemo(() => funFacts[Math.floor(Math.random() * funFacts.length)], []);

  if (closed || !fact) {
    return null;
  }

  return (
    <aside className="fun-fact" aria-live="polite">
      <button aria-label="关闭小科普" type="button" onClick={() => setClosed(true)}>
        ×
      </button>
      <span className="tag">{fact.type}</span>
      <h3 style={{ marginTop: 12 }}>{fact.title}</h3>
      <p style={{ marginBottom: 0 }}>{fact.body}</p>
    </aside>
  );
}
