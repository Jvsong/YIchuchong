import { AiCareDemo } from "@/components/AiCareDemo";
import { PageHero } from "@/components/PageHero";
import { getPageHeroImages } from "@/lib/siteSettings";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";

export default function AiCarePage() {
  const locale = getLocale();
  const t = getPageDictionary(locale).aiCare;
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.desc}
        image={heroImages.aiCare}
        imageAlt={t.title}
      />
      <section className="section compact">
        <div className="container">
          <AiCareDemo />
          <div className="grid cols-3" style={{ marginTop: 22 }}>
            {t.cards.map((item) => (
              <article className="card feature-card" key={item}>
                <span className="tag">{t.tag}</span>
                <h3 style={{ marginTop: 14 }}>{item}</h3>
                <p>{t.cardNote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
