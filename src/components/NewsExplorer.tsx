"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsCard } from "@/components/Cards";
import type { NewsItem } from "@/types";

export function NewsExplorer({ items }: { items: NewsItem[] }) {
  const [category, setCategory] = useState("全部");
  const [tag, setTag] = useState("全部");
  const categories = useMemo(() => ["全部", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const tags = useMemo(() => ["全部", ...Array.from(new Set(items.flatMap((item) => item.tags))).slice(0, 14)], [items]);
  const visible = items.filter((item) => (category === "全部" || item.category === category) && (tag === "全部" || item.tags.includes(tag)));
  const [featured, ...rest] = visible;

  return (
    <div className="wiki-explorer">
      {featured ? (
        <article className="featured-article">
          <Image src={featured.image} alt={featured.title} width={900} height={620} />
          <div>
            <span className="eyebrow">Featured Journal</span>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <div className="mini-tags">
              <span>{featured.category}</span>
              <span>{featured.publishDate}</span>
              <span>{featured.readTime}</span>
            </div>
            <Link className="pill" href={`/news/${featured.id}`}>阅读专题</Link>
          </div>
        </article>
      ) : null}
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
        {rest.map((item) => <NewsCard key={item.id} item={item} />)}
      </div>
      {!visible.length ? <p className="form-success">没有找到匹配的文章，可以切换分类或标签。</p> : null}
    </div>
  );
}
