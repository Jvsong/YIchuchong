import Image from "next/image";
import Link from "next/link";
import { getCoreProduct } from "@/lib/content";
import { getHomeStoryImages, getPageHeroImages } from "@/lib/siteSettings";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";
import { pick, pickList } from "@/i18n/index";

export default function LocatorPage() {
  const locale = getLocale();
  const t = getPageDictionary(locale).locator;
  const tracker = getCoreProduct();
  const heroImages = getPageHeroImages();
  const story = getHomeStoryImages();
  if (!tracker) return null;
  const scenarioText = pickList(tracker.scenarios, locale).join(locale === "zh" ? "、" : ", ");

  return (
    <>
      <section className="tracker-product-hero">
        <div className="container tracker-product-grid">
          <div className="tracker-product-gallery">
            <div className="tracker-product-main-image">
              <Image src={tracker.coverImage} alt={t.title} fill priority sizes="(max-width: 980px) 100vw, 58vw" />
            </div>
            <div className="tracker-product-gallery-row">
              {[heroImages.locator, ...tracker.gallery].slice(0, 3).map((image, index) => (
                <div key={`${image}-${index}`}><Image src={image} alt={`${t.title} ${index + 2}`} fill sizes="180px" /></div>
              ))}
            </div>
          </div>
          <div className="tracker-product-copy">
            <span className="product-detail-status">{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p className="lead">{t.desc}</p>
            <div className="tracker-live-badges"><span>{t.liveBadge}</span><span>{t.fenceBadge}</span></div>
            <div className="product-detail-actions">
              <a className="pill" href="#locator-lead">{t.getAlerts}</a>
              <a className="ghost-pill" href="#locator-specs">{t.exploreFeatures}</a>
            </div>
            <p className="tracker-product-note">{t.heroNote}</p>
          </div>
        </div>
      </section>

      <section className="tracker-spec-section" id="locator-specs">
        <div className="container">
          <div className="tracker-spec-head">
            <div><span className="section-label">{t.detailKicker}</span><h2>{t.detailTitle}</h2></div>
            <p>{t.detailText}</p>
          </div>
          <div className="tracker-spec-row">
            {t.specs.map((spec) => (
              <article key={spec.label}>
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tracker-story-section">
        <div className="container tracker-story-grid">
          <div className="tracker-story-media">
            <Image src={story.locatorShowcase} alt={t.title} fill sizes="(max-width: 980px) 100vw, 62vw" />
            <div className="map-panel">
              <span className="tag">{t.routeTag}</span>
              <h3>{t.routeTitle}</h3>
              <p>{t.routeText}</p>
              <div className="map-path" aria-hidden="true"><span /><span /><span /></div>
            </div>
          </div>
          <div className="tracker-story-copy">
            <span className="section-label">{t.connectedLabel}</span>
            <h2>{t.connectedTitle}</h2>
            <p>{scenarioText}{t.capabilityNoteSuffix}</p>
            <Link className="text-link" href="/partners">{t.demoCta} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="tracker-capability-section">
        <div className="container">
          <div className="product-detail-section-head">
            <span className="section-label">{t.capabilityTag}</span>
            <h2>{t.capabilityTitle}</h2>
          </div>
          <div className="tracker-capability-list">
            {tracker.features.map((feature) => (
              <article key={pick(feature, locale)}>
                <h3>{pick(feature, locale)}</h3>
                <p>{scenarioText}{t.capabilityNoteSuffix}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tracker-scenes-section">
        <div className="container">
          <div className="tracker-scenes-head"><span className="section-label light">{t.sceneTag}</span><h2>{t.scenesTitle}</h2></div>
          <div className="tracker-scenes-grid">
            {t.scenes.map((scene) => (
              <article key={scene}>
                <h3>{scene}</h3>
                <p>{t.sceneNote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tracker-faq-section" id="locator-faq">
        <div className="container tracker-faq-grid">
          <div><span className="section-label">FAQ</span><h2>{t.faqTitle}</h2><a className="ghost-pill" href="#locator-lead">{t.viewFaq}</a></div>
          <div className="tracker-faq-list">
            {t.faq.map((question) => (
              <article key={question}>
                <h3>{question}</h3>
                <p>{t.faqAnswer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tracker-lead-section" id="locator-lead">
        <div className="container tracker-lead-inner">
          <div><span className="section-label light">{t.leadKicker}</span><h2>{t.leadTitle}</h2></div>
          <div>
            <p>{t.leadText}</p>
            <a className="pill" href="/partners">{t.contactCta}</a>
          </div>
        </div>
      </section>
    </>
  );
}
