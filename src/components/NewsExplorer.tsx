"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/Cards";
import type { NewsItem } from "@/types";

export function NewsExplorer({ items }: { items: NewsItem[] }) {
  const [category, setCategory] = useState("全部");
  const [tag, setTag] = useState("全部");
  const categories = useMemo(() => ["全部", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const tags = useMemo(() => ["全部", ...Array.from(new Set(items.flatMap((item) => item.tags))).slice(0, 14)], [items]);
  const visible = items.filter((item) => (category === "全部" || item.category === category) && (tag === "全部" || item.tags.includes(tag)));

  return (
    <div className="wiki-explorer">
      <div className="segmented" role="tablist" aria-label="资讯分类">
        {categories.map((item) => (
          <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="chip-row" aria-label="热门标签">
        {tags.map((item) => (
          <button className={tag === item ? "active" : ""} key={item} type="button" onClick={() => setTag(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="grid cols-3 editorial-grid">
        {visible.map((item) => <NewsCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
