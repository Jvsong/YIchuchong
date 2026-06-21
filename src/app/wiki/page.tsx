import { PageHero } from "@/components/PageHero";
import { WikiExplorer } from "@/components/WikiExplorer";
import { getPageHeroImages } from "@/lib/siteSettings";
import { getBreeds } from "@/lib/content";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";

export const dynamic = 'force-dynamic';

export default function WikiPage() {
  const t = getPageDictionary(getLocale()).wiki;
  const breeds = getBreeds();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.desc}
        image={heroImages.wiki}
        imageAlt={t.title}
      />
      <section className="section compact">
        <div className="container">
          <WikiExplorer breeds={breeds} />
        </div>
      </section>
    </>
  );
}
