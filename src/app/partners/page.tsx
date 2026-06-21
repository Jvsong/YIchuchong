import { PageHero } from "@/components/PageHero";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { getPageHeroImages } from "@/lib/siteSettings";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";

export default function PartnersPage() {
  const locale = getLocale();
  const t = getPageDictionary(locale).partners;
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.desc}
        image={heroImages.partners}
        imageAlt={t.title}
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="partner-grid">
            {t.partners.map((item) => (
              <article className="card feature-card" key={item.title}>
                <span className="tag">{t.partnerTag}</span>
                <h3 style={{ marginTop: 14 }}>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="partner-process">
            {t.process.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
          <ServiceLeadForm />
        </div>
      </section>
    </>
  );
}
