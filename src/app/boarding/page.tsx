import { ServiceCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { getServices } from "@/lib/content";
import { getPageHeroImages } from "@/lib/siteSettings";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";
import { pick } from "@/i18n/index";

export default function BoardingPage() {
  const locale = getLocale();
  const t = getPageDictionary(locale).boarding;
  const services = getServices();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.desc}
        image={heroImages.boarding}
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
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
          <div className="service-checklist">
            {t.checklist.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="grid cols-3">
            {services.slice(0, 3).map((service) => (
              <article className="card feature-card" key={service.id}>
                <span className="tag">{pick(service.name, locale)}{t.processSuffix}</span>
                {service.processSteps.map((step, index) => <p key={pick(step, locale)}>{index + 1}. {pick(step, locale)}</p>)}
              </article>
            ))}
          </div>
          <ServiceLeadForm />
        </div>
      </section>
    </>
  );
}
