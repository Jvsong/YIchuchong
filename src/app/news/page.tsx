import { NewsExplorer } from "@/components/NewsExplorer";
import { PageHero } from "@/components/PageHero";
import { getPageHeroImages } from "@/lib/siteSettings";
import { getNews } from "@/lib/content";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";

export const dynamic = 'force-dynamic';

export default function NewsPage() {
  const t = getPageDictionary(getLocale()).news;
  const newsItems = getNews();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.desc}
        image={heroImages.news}
        imageAlt={t.title}
      />
      <section className="section compact">
        <div className="container">
          <NewsExplorer items={newsItems} />
        </div>
      </section>
    </>
  );
}
