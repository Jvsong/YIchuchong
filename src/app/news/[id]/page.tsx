import { notFound } from "next/navigation";
import Link from "next/link";
import { NewsCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { getNewsById, getNewsList } from "@/services/content";

export function generateStaticParams() {
  return getNewsList().map((item) => ({ id: item.id }));
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const item = getNewsById(params.id);
  if (!item) {
    notFound();
  }
  const related = getNewsList().filter((news) => news.id !== item.id && news.category === item.category).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={item.category}
        title={item.title}
        description={item.summary}
        image={item.coverImage}
        imageAlt={item.title}
      />
      <section className="section compact">
        <div className="container article-layout">
          <article className="card feature-card article-card">
            <div className="mini-tags">
              {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <p>{item.publishDate} · {item.readTime} · {item.sourceName}</p>
            <p>{item.content}</p>
            <p>关联产品：{item.relatedProductIds.join("、") || "暂无"}。关联服务：{item.relatedServiceIds.join("、") || "暂无"}。</p>
            <Link className="card-link" href="/news">返回资讯列表 <span aria-hidden="true">→</span></Link>
          </article>
          <aside className="article-related">
            <h3>相关阅读</h3>
            {related.map((news) => <NewsCard key={news.id} item={news} />)}
          </aside>
        </div>
      </section>
    </>
  );
}
