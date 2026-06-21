import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight, Battery, Bell, MapPin, Route, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { CollectionCard, NewsCard } from "@/components/Cards";
import { getCollectionCards, getSmartEcosystem } from "@/services/content";
import { getHeroImages, getHomeConfig, getHomeStoryImages } from "@/lib/siteSettings";
import { getCoreProduct, getNews } from "@/lib/content";
import { getLocale, getServerDictionary } from "@/i18n/server";
import { pick } from "@/i18n/index";

export const dynamic = "force-dynamic";

const featureIcons: LucideIcon[] = [MapPin, Route, ShieldCheck, Battery, Bell, Users, Activity];

export default function HomePage() {
  const locale = getLocale();
  const dict = getServerDictionary();
  const home = getHomeConfig();
  const tracker = getCoreProduct();
  const newsItems = getNews();
  const heroImages = getHeroImages();
  const story = getHomeStoryImages();
  const collectionCards = getCollectionCards();
  const smartEcosystem = getSmartEcosystem();
  if (!tracker) return null;

  return (
    <>
      <section className="home-hero">
        <Image className="home-hero-image" src={heroImages[0]} alt="" fill priority sizes="100vw" />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <span className="hero-kicker">{dict.home.heroKicker}</span>
            <h1>{pick(home.heroTitle, locale)}</h1>
            <p className="lead">{pick(home.heroSubtitle, locale)}</p>
            <div className="hero-actions">
              <Link className="pill" href="/locator">{pick(home.primaryAction, locale)} <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link className="text-link light" href="/devices">{pick(home.secondaryAction, locale)} <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="hero-signal" aria-label={dict.home.productLabel}>
            <div><MapPin size={19} aria-hidden="true" /><span><strong>{dict.home.signal.location}</strong>{dict.home.signal.locationText}</span></div>
            <div><ShieldCheck size={19} aria-hidden="true" /><span><strong>{dict.home.signal.fence}</strong>{dict.home.signal.fenceText}</span></div>
            <div><Users size={19} aria-hidden="true" /><span><strong>{dict.home.signal.share}</strong>{dict.home.signal.shareText}</span></div>
            <div className="hero-signal-status"><i aria-hidden="true" /> {dict.home.signal.online}</div>
          </div>
        </div>
      </section>

      <section className="section collection-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-label">{dict.home.collectionLabel}</span>
              <h2>{dict.home.collectionTitle}</h2>
            </div>
            <p>{dict.home.collectionText}</p>
          </div>
          <div className="collection-grid">
            {collectionCards.map((item, index) => <CollectionCard key={index} {...item} />)}
          </div>
        </div>
      </section>

      <section className="section product-stories-section">
        <div className="container">
          <div className="product-story">
            <div className="product-story-media">
              <Image src={story.story1} alt={pick(home.heroTitle, locale)} width={1080} height={760} sizes="(max-width: 980px) 100vw, 60vw" />
            </div>
            <div className="product-story-copy">
              <span className="section-label">{dict.home.story1Label}</span>
              <h2>{dict.home.story1Title}</h2>
              <p>{dict.home.story1Text}</p>
              <Link className="pill" href="/locator">{dict.home.story1Cta} <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="product-story reverse">
            <div className="product-story-media">
              <Image src={story.story2} alt={dict.home.story2Title} width={1080} height={760} sizes="(max-width: 980px) 100vw, 60vw" />
            </div>
            <div className="product-story-copy">
              <span className="section-label">{dict.home.story2Label}</span>
              <h2>{dict.home.story2Title}</h2>
              <p>{dict.home.story2Text}</p>
              <Link className="ghost-pill" href="/devices">{dict.home.story2Cta}</Link>
            </div>
          </div>
          <div className="product-story">
            <div className="product-story-media">
              <Image src={story.story3} alt={dict.home.story3Title} width={1080} height={760} sizes="(max-width: 980px) 100vw, 60vw" />
            </div>
            <div className="product-story-copy">
              <span className="section-label">{dict.home.story3Label}</span>
              <h2>{dict.home.story3Title}</h2>
              <p>{dict.home.story3Text}</p>
              <Link className="ghost-pill" href="/ai-care">{dict.home.story3Cta}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section smart-home-section">
        <Image className="section-bg-image" src={story.smartHomeBg} alt="" fill sizes="100vw" />
        <div className="container smart-home-panel">
          <div className="section-head">
            <div>
              <span className="section-label light">{dict.home.smartLabel}</span>
              <h2>{dict.home.smartTitle}</h2>
            </div>
            <p>{dict.home.smartText}</p>
          </div>
          <div className="ecosystem-chain">
            {smartEcosystem.map((item, index) => (
              <Link className="chain-card" href={item.href} key={index}>
                <span>{dict.home.ecoNode} {String(index + 1).padStart(2, "0")}</span>
                <h3>{pick(item.title, locale)}</h3>
                <p>{pick(item.text, locale)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section product-showcase-section">
        <div className="container product-showcase">
          <div className="section-head product-copy">
            <div>
              <span className="section-label">{dict.home.productLabel}</span>
              <h2>{pick(tracker.name, locale)}</h2>
            </div>
            <p>{dict.home.productText}</p>
          </div>
          <div className="spec-strip" aria-label={dict.home.productLabel}>
            {dict.home.specs.map((item) => <span key={item}>{item}</span>)}
            <Link href="/locator">{dict.home.fullSpec}</Link>
          </div>
          <div className="locator-stage">
            <div className="locator-photo">
              <Image src={story.locatorShowcase} alt={pick(tracker.name, locale)} width={960} height={720} sizes="(max-width: 768px) 100vw, 1220px" />
            </div>
            <div className="map-panel">
              <span className="tag">{dict.home.fenceTag}</span>
              <h3>{dict.home.fenceTitle}</h3>
              <p>{dict.home.fenceText}</p>
              <div className="map-path" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="grid cols-4 tracker-feature-grid">
            {dict.home.features.map((feature, index) => {
              const Icon = featureIcons[index] ?? MapPin;
              return (
                <article className="tracker-feature" key={feature.label}>
                  <div className="icon-badge" aria-hidden="true"><Icon size={21} /></div>
                  <h3>{feature.label}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-label">{dict.home.newsLabel}</span>
              <h2>{dict.home.newsTitle}</h2>
            </div>
            <Link className="ghost-pill" href="/news">{dict.home.newsMore}</Link>
          </div>
          <div className="grid cols-3 editorial-grid">
            {newsItems.slice(0, 3).map((item) => <NewsCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
