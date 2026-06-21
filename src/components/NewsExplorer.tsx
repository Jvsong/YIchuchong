"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsCard } from "@/components/Cards";
import type { NewsItem } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { pick } from "@/i18n/index";
import { tt } from "@/i18n/terms";

const ALL = "__all__";

export function NewsExplorer({ items }: { items: NewsItem[] }) {
  const { locale, dict } = useLocale();
  const [category, setCategory] = useState(ALL);
  const [tag, setTag] = useState(ALL);
  const categories = useMemo(() => [ALL, ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const tags = useMemo(() => [ALL, ...Array.from(new Set(items.flatMap((item) => item.tags))).slice(0, 14)], [items]);
  const visible = items.filter((item) => (category === ALL || item.category === category) && (tag === ALL || item.tags.includes(tag)));
  const [featured, ...rest] = visible;

  return (
    <div className="wiki-explorer">
      {featured ? (
        <article className="featured-article">
          <Image src={featured.image} alt={pick(featured.title, locale)} width={900} height={620} />
          <div>
            <span className="eyebrow">{dict.explorer.featured}</span>
            <h2>{pick(featured.title, locale)}</h2>
            <p>{pick(featured.summary, locale)}</p>
            <div className="mini-tags">
              <span>{tt(featured.category, locale)}</span>
              <span>{featured.publishDate}</span>
              <span>{pick(featured.readTime, locale)}</span>
            </div>
            <Link className="pill" href={`/news/${featured.id}`}>{dict.explorer.readFeature}</Link>
          </div>
        </article>
      ) : null}
      <div className="segmented" role="tablist" aria-label={dict.explorer.categoryAria}>
        {categories.map((item) => (
          <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => setCategory(item)}>
            {item === ALL ? dict.explorer.all : tt(item, locale)}
          </button>
        ))}
      </div>
      <div className="chip-row" aria-label={dict.explorer.tagAria}>
        {tags.map((item) => (
          <button className={tag === item ? "active" : ""} key={item} type="button" onClick={() => setTag(item)}>
            {item === ALL ? dict.explorer.all : tt(item, locale)}
          </button>
        ))}
      </div>
      <div className="grid cols-3 editorial-grid">
        {rest.map((item) => <NewsCard key={item.id} item={item} />)}
      </div>
      {!visible.length ? <p className="form-success">{dict.explorer.noArticles}</p> : null}
    </div>
  );
}
