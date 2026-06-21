import { ServiceCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { getServices } from "@/lib/content";
import { getPageHeroImages } from "@/lib/siteSettings";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";

export default function WalkingPage() {
  const locale = getLocale();
  const t = getPageDictionary(locale).walking;
  const services = getServices();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.desc}
        image={heroImages.walking}
        imageAlt={t.title}
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="service-pricing">
            {t.pricing.map((item) => (
              <article className="card feature-card" key={item.title}>
                <span className="tag">{item.sub}</span>
                <h3 style={{ marginTop: 14 }}>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="grid cols-3">
            {services.filter((service) => service.id !== "boarding").map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
          <div className="card feature-card">
            <span className="eyebrow">{t.safetyKicker}</span>
            <h2 style={{ fontSize: "2.4rem", marginTop: 14 }}>{t.safetyTitle}</h2>
            <p>{t.safetyText}</p>
          </div>
          <ServiceLeadForm />
        </div>
      </section>
    </>
  );
}
