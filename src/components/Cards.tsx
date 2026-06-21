"use client";

import Image from "next/image";
import Link from "next/link";
import type { Breed, LocalizedText, NewsItem, Product, Service } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { pick } from "@/i18n/index";
import { tt } from "@/i18n/terms";
import { enumLabel, productStatusLabels, serviceStatusLabels } from "@/i18n/enums";

type Text = string | LocalizedText;

export function CollectionCard({ title, text, href, image }: { title: Text; text: Text; href: string; image: string }) {
  const { locale, dict } = useLocale();
  return (
    <Link className="collection-card" href={href}>
      <Image src={image} alt={pick(title, locale)} width={720} height={720} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 66vw" />
      <span>{pick(title, locale)}</span>
      <p>{pick(text, locale)}</p>
      <strong>{dict.card.exploreSeries}</strong>
    </Link>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { locale, dict } = useLocale();
  const name = pick(product.name, locale);
  const href = product.id === "tracker" ? "/locator" : `/devices/${product.slug}`;
  return (
    <article className={`catalog-product-card${product.isCore ? " is-featured" : ""}`}>
      <Link className="catalog-product-media" href={href} aria-label={name}>
        <Image
          src={product.image}
          alt={name}
          width={760}
          height={620}
          sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
        />
        <span className="catalog-product-status">{enumLabel(productStatusLabels, product.status, locale)}</span>
      </Link>
      <div className="catalog-product-body">
        <span className="catalog-product-category">{tt(product.category, locale)}</span>
        <h3><Link href={href}>{name}</Link></h3>
        <p>{pick(product.summary, locale)}</p>
        <ul className="catalog-product-features" aria-label={name}>
          {product.features.slice(0, 3).map((feature) => (
            <li key={pick(feature, locale)}>{pick(feature, locale)}</li>
          ))}
        </ul>
        <Link className="catalog-product-action" href={href}>
          {dict.card.viewDetail} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const { locale, dict } = useLocale();
  return (
    <article className="card news-card">
      <Image src={item.image} alt={pick(item.title, locale)} width={720} height={480} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" />
      <div className="card-body">
        <span className="tag">{tt(item.category, locale)}</span>
        <h3 style={{ marginTop: 12 }}>{pick(item.title, locale)}</h3>
        <p>{pick(item.summary, locale)}</p>
        <div className="mini-tags">
          {item.tags.slice(0, 3).map((tag) => <span key={tag}>{tt(tag, locale)}</span>)}
        </div>
        <p>{item.publishDate} · {pick(item.readTime, locale)}</p>
        <Link className="card-link" href={`/news/${item.id}`}>
          {dict.card.readDetail} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export function BreedCard({ breed }: { breed: Breed }) {
  const { locale, dict } = useLocale();
  const speciesLabel =
    breed.species === "dog" ? dict.card.speciesDog : breed.species === "cat" ? dict.card.speciesCat : dict.card.speciesSmall;
  return (
    <Link className="card breed-card" href={`/wiki/${breed.slug}`}>
      <Image src={breed.image} alt={pick(breed.name, locale)} width={720} height={480} />
      <div className="card-body">
        <span className="tag">{speciesLabel}</span>
        <h3 style={{ marginTop: 12 }}>{pick(breed.name, locale)}</h3>
        <p>{pick(breed.summary, locale)}</p>
        <div className="mini-tags">
          <span>{tt(breed.activityLevel, locale)}</span>
          <span>{tt(breed.careLevel, locale)}</span>
        </div>
      </div>
    </Link>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const { locale } = useLocale();
  const name = pick(service.name, locale);
  return (
    <article className="card service-card">
      <Image src={service.image} alt={name} width={720} height={480} />
      <div className="card-body">
        <span className="tag">{enumLabel(serviceStatusLabels, service.status, locale)}</span>
        <h3 style={{ marginTop: 12 }}>{name}</h3>
        <p>{pick(service.summary, locale)}</p>
        <ul className="feature-list">
          {service.points.map((point) => (
            <li key={pick(point, locale)}>{pick(point, locale)}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
