import { notFound } from "next/navigation";
import Link from "next/link";
import { NewsCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { getNews, getNewsById } from "@/lib/content";
import { getLocale, getServerDictionary } from "@/i18n/server";
import { pick } from "@/i18n/index";
import { tt } from "@/i18n/terms";

export const dynamic = 'force-dynamic';

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const locale = getLocale();
  const dict = getServerDictionary();
  const item = getNewsById(params.id);
  if (!item) {
    notFound();
  }
  const related = getNews().filter((news) => news.id !== item.id && news.category === item.category).slice(0, 3);
  const title = pick(item.title, locale);

  return (
    <>
      <PageHero
        eyebrow={tt(item.category, locale)}
        title={title}
        description={pick(item.summary, locale)}
        image={item.coverImage}
        imageAlt={title}
      />
      <section className="section compact">
        <div className="container article-layout">
          <article className="card feature-card article-card">
            <div className="mini-tags">
              {item.tags.map((tag) => <span key={tag}>{tt(tag, locale)}</span>)}
            </div>
            <p>{item.publishDate} · {pick(item.readTime, locale)} · {pick(item.sourceName, locale)}</p>
            <p>{pick(item.content, locale)}</p>
            <p>{dict.detail.relatedProducts}：{item.relatedProductIds.join("、") || dict.detail.none}。{dict.detail.relatedServices}：{item.relatedServiceIds.join("、") || dict.detail.none}。</p>
            <Link className="card-link" href="/news">{dict.detail.backToNews} <span aria-hidden="true">→</span></Link>
          </article>
          <aside className="article-related">
            <h3>{dict.detail.relatedReading}</h3>
            {related.map((news) => <NewsCard key={news.id} item={news} />)}
          </aside>
        </div>
      </section>
    </>
  );
}
