import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/content";
import { getLocale, getServerDictionary } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";
import { pick } from "@/i18n/index";
import { tt } from "@/i18n/terms";
import { enumLabel, productStatusLabels } from "@/i18n/enums";

export const dynamic = "force-dynamic";

export default function DeviceDetailPage({ params }: { params: { slug: string } }) {
  const locale = getLocale();
  const dict = getServerDictionary();
  const t = getPageDictionary(locale).deviceDetail;
  const product = getProductBySlug(params.slug);
  if (!product || product.id === "tracker") {
    notFound();
  }
  const name = pick(product.name, locale);
  const gallery = [product.coverImage, ...product.gallery.filter((image) => image !== product.coverImage)];

  return (
    <>
      <section className="product-detail-hero">
        <div className="container product-detail-grid">
          <div className="product-gallery">
            <div className="product-gallery-main">
              <Image src={gallery[0]} alt={name} fill priority sizes="(max-width: 980px) 100vw, 58vw" />
            </div>
            {gallery.length > 1 ? (
              <div className="product-gallery-thumbs">
                {gallery.slice(1, 4).map((image, index) => (
                  <div key={image}>
                    <Image src={image} alt={`${name} ${t.viewWord} ${index + 2}`} fill sizes="160px" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="product-detail-summary">
            <Link className="product-breadcrumb" href="/devices">← {t.allDevices}</Link>
            <span className="product-detail-status">{enumLabel(productStatusLabels, product.status, locale)}</span>
            <h1>{name}</h1>
            <p className="lead">{pick(product.description, locale)}</p>
            <ul className="product-detail-highlights">
              {product.features.slice(0, 4).map((feature) => <li key={pick(feature, locale)}>{pick(feature, locale)}</li>)}
            </ul>
            <div className="product-detail-actions">
              <Link className="pill" href="/partners">{t.ask}</Link>
              <a className="ghost-pill" href="#product-specifications">{t.viewDetails}</a>
            </div>
            <div className="product-detail-trust">
              <span>{t.trust1}</span>
              <span>{t.trust2}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="product-detail-section" id="product-specifications">
        <div className="container">
          <div className="product-detail-section-head">
            <span className="section-label">{t.coreLabel}</span>
            <h2>{t.coreTitle}</h2>
          </div>
          <div className="product-capability-list">
            {product.features.map((feature, index) => (
              <article key={pick(feature, locale)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{pick(feature, locale)}</h3>
                <p>{pick(product.summary, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-context-section">
        <div className="container product-context-grid">
          <div>
            <span className="section-label light">{dict.detail.scenarios}</span>
            <h2>{t.scenarioTitle}</h2>
            <ul>{product.scenarios.map((item) => <li key={pick(item, locale)}>{pick(item, locale)}</li>)}</ul>
          </div>
          <div className="product-context-image">
            <Image src={gallery[1] ?? product.coverImage} alt={name} fill sizes="(max-width: 980px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="product-roadmap-section">
        <div className="container product-roadmap-grid">
          <div>
            <span className="section-label">{dict.detail.futureIntegrations}</span>
            <h2>{t.futureTitle}</h2>
          </div>
          <div className="product-roadmap-list">
            {product.futureIntegrations.map((item) => <p key={pick(item, locale)}>{pick(item, locale)} <span aria-hidden="true">↗</span></p>)}
          </div>
        </div>
      </section>
    </>
  );
}
