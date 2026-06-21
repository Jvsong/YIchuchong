"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ProductCard } from "@/components/Cards";
import type { Product } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { getPageDictionary } from "@/i18n/pageDictionaries";
import { tt } from "@/i18n/terms";

const ALL = "__all__";

/** 设备目录的客户端筛选视图。可编辑的 products 由 server 页（lib/content）以 props 下传，
 *  这样后台对产品的编辑能在前台实时反映。 */
export function DevicesCatalog({ products, heroImage }: { products: Product[]; heroImage: string }) {
  const { locale } = useLocale();
  const t = getPageDictionary(locale).devices;
  const [category, setCategory] = useState(ALL);
  const categories = useMemo(() => [ALL, ...Array.from(new Set(products.map((item) => item.category)))], [products]);
  const visible = products.filter((item) => category === ALL || item.category === category);

  return (
    <>
      <section className="catalog-hero">
        <div className="container catalog-hero-grid">
          <div className="catalog-hero-copy">
            <span className="section-label">{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p className="lead">{t.desc}</p>
            <a className="pill" href="#device-catalog">{t.browseAll}</a>
          </div>
          <div className="catalog-hero-media">
            <Image src={heroImage} alt={t.title} fill priority sizes="(max-width: 980px) 100vw, 55vw" />
          </div>
        </div>
      </section>

      <section className="catalog-browser" id="device-catalog">
        <div className="container">
          <div className="catalog-browser-head">
            <div>
              <span className="section-label">{t.lineupKicker}</span>
              <h2>{t.lineupTitle}</h2>
            </div>
            <p>{t.lineupText}</p>
          </div>

          <div className="catalog-filter-panel">
            <div>
              <strong>{t.chooseCategory}</strong>
              <span>{t.chooseCategoryHint}</span>
            </div>
            <div className="catalog-filter-tabs" role="tablist" aria-label={t.categoryAria}>
              {categories.map((item) => (
                <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => setCategory(item)}>
                  {item === ALL ? t.allProducts : tt(item, locale)}
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-results-bar">
            <strong>{category === ALL ? t.allDevices : tt(category, locale)}</strong>
            <span>{visible.length} {t.countSuffix}</span>
          </div>
          <div className="catalog-product-grid">
            {visible.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>

          <div className="catalog-compare-section">
            <div className="catalog-compare-head">
              <span className="section-label">{t.recommendedLabel}</span>
              <h2>{t.recommendedTitle}</h2>
            </div>
            <div className="device-compare">
              {t.compare.map((item) => (
                <article className="catalog-combination" key={item.title}>
                  <span>{item.title}</span>
                  <h3>{item.combo}</h3>
                  <p>{item.scene}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="catalog-consultation">
            <div>
              <span className="section-label light">{t.linkKicker}</span>
              <h2>{t.linkTitle}</h2>
              <p>{t.linkText}</p>
            </div>
            <a className="pill" href="/partners">{t.consultCta}</a>
          </div>
        </div>
      </section>
    </>
  );
}
