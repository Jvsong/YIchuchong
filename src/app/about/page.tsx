import { PageHero } from "@/components/PageHero";
import { getPageHeroImages } from "@/lib/siteSettings";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";

export default function AboutPage() {
  const locale = getLocale();
  const t = getPageDictionary(locale).about;
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.desc}
        image={heroImages.about}
        imageAlt={t.title}
      />
      <section className="section compact">
        <div className="container grid cols-3">
          <article className="card feature-card"><h3>{t.brandTitle}</h3><p>{t.brandText}</p></article>
          <article className="card feature-card" id="privacy"><h3>{t.privacyTitle}</h3><p>{t.privacyText}</p></article>
          <article className="card feature-card" id="terms"><h3>{t.termsTitle}</h3><p>{t.termsText}</p></article>
        </div>
        <div className="container roadmap">
          {t.roadmap.map((item) => (
            <article className="card feature-card" key={item}>
              <span className="tag">Roadmap</span>
              <h3 style={{ marginTop: 14 }}>{item}</h3>
              <p>{t.roadmapNote}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
