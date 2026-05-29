"use client";

import { useMemo, useState } from "react";
import { BreedCard, NewsCard, ProductCard, ServiceCard } from "@/components/Cards";
import { breeds, ecoCategories, funFacts, newsItems, products, services } from "@/data/site";
import type { Breed, FunFact, NewsItem, PhotoAsset, Product, Service } from "@/data/types";
import photoLibrary from "../../../public/assets/pets/photo-library.json";

type Tab = "overview" | "news" | "wiki" | "facts" | "photos" | "products" | "services" | "home";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "数据概览" },
  { id: "news", label: "宠物资讯管理" },
  { id: "wiki", label: "宠物百科管理" },
  { id: "facts", label: "小科普管理" },
  { id: "photos", label: "图片素材库" },
  { id: "products", label: "产品内容管理" },
  { id: "services", label: "服务内容管理" },
  { id: "home", label: "首页配置" }
];

function useLocalCollection<T extends { id?: string; slug?: string }>(key: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(() => {
    if (typeof window === "undefined") return fallback;
    const cached = window.localStorage.getItem(key);
    return cached ? (JSON.parse(cached) as T[]) : fallback;
  });

  function persist(next: T[]) {
    setItems(next);
    window.localStorage.setItem(key, JSON.stringify(next));
  }

  return [items, persist] as const;
}

export default function AdminPage() {
  const [active, setActive] = useState<Tab>("overview");
  const [news, setNews] = useLocalCollection<NewsItem>("yqc-news", newsItems);
  const [wiki, setWiki] = useLocalCollection<Breed>("yqc-breeds", breeds);
  const [facts, setFacts] = useLocalCollection<FunFact>("yqc-facts", funFacts);
  const [productList, setProductList] = useLocalCollection<Product>("yqc-products", products);
  const [serviceList, setServiceList] = useLocalCollection<Service>("yqc-services", services);
  const photos = photoLibrary as PhotoAsset[];

  const stats = useMemo(() => [
    ["新闻数量", news.length],
    ["百科数量", wiki.length],
    ["图片数量", photos.length],
    ["小科普数量", facts.length]
  ], [facts.length, news.length, photos.length, wiki.length]);

  function duplicateNews() {
    const id = `n${Date.now()}`;
    setNews([{ ...news[0], id, title: "新建宠物资讯", summary: "在这里编辑资讯摘要。" }, ...news]);
  }

  function duplicateFact() {
    const id = `fact-${Date.now()}`;
    setFacts([{ ...facts[0], id, body: "新建小科普内容。" }, ...facts]);
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <span className="eyebrow">轻量管理平台</span>
        <h2 style={{ fontSize: "2rem", marginTop: 16 }}>易趣宠后台</h2>
        <div className="admin-tabs" role="tablist" aria-label="后台模块">
          {tabs.map((tab) => (
            <button
              className={`admin-tab ${active === tab.id ? "active" : ""}`}
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </aside>
      <section className="admin-main">
        {active === "overview" && (
          <>
            <div className="section-head">
              <div><span className="eyebrow">Dashboard</span><h1 style={{ fontSize: "3.2rem" }}>数据概览</h1></div>
              <p>第一版数据来自 mock 与 localStorage，结构保留后续 API 替换空间。</p>
            </div>
            <div className="grid cols-4">
              {stats.map(([label, value]) => (
                <article className="card feature-card" key={label}>
                  <span className="tag">{label}</span>
                  <h2 style={{ marginTop: 12 }}>{value}</h2>
                </article>
              ))}
            </div>
          </>
        )}

        {active === "news" && (
          <Manager title="宠物资讯管理" onAdd={duplicateNews}>
            <div className="grid cols-3">{news.slice(0, 6).map((item) => <NewsCard key={item.id} item={item} />)}</div>
            <EditableTable rows={news} getKey={(row) => row.id} onUpdate={(id, row) => setNews(news.map((item) => item.id === id ? row : item))} onDelete={(id) => setNews(news.filter((item) => item.id !== id))} />
          </Manager>
        )}

        {active === "wiki" && (
          <Manager title="宠物百科管理" onAdd={() => setWiki([{ ...wiki[0], slug: `breed-${Date.now()}`, name: "新建品种" }, ...wiki])}>
            <div className="grid cols-4">{wiki.slice(0, 8).map((item) => <BreedCard key={item.slug} breed={item} />)}</div>
            <EditableTable rows={wiki} getKey={(row) => row.slug} onUpdate={(slug, row) => setWiki(wiki.map((item) => item.slug === slug ? row : item))} onDelete={(slug) => setWiki(wiki.filter((item) => item.slug !== slug))} />
          </Manager>
        )}

        {active === "facts" && (
          <Manager title="小科普管理" onAdd={duplicateFact}>
            <EditableTable rows={facts} getKey={(row) => row.id} onUpdate={(id, row) => setFacts(facts.map((item) => item.id === id ? row : item))} onDelete={(id) => setFacts(facts.filter((item) => item.id !== id))} />
          </Manager>
        )}

        {active === "photos" && (
          <Manager title="图片素材库">
            <EditableTable rows={photos} getKey={(row) => row.id} />
          </Manager>
        )}

        {active === "products" && (
          <Manager title="产品内容管理" onAdd={() => setProductList([{ ...productList[0], id: `product-${Date.now()}`, name: "新建设备" }, ...productList])}>
            <div className="grid cols-3">{productList.slice(0, 3).map((item) => <ProductCard key={item.id} product={item} />)}</div>
            <EditableTable rows={productList} getKey={(row) => row.id} onUpdate={(id, row) => setProductList(productList.map((item) => item.id === id ? row : item))} onDelete={(id) => setProductList(productList.filter((item) => item.id !== id))} />
          </Manager>
        )}

        {active === "services" && (
          <Manager title="服务内容管理" onAdd={() => setServiceList([{ ...serviceList[0], id: `service-${Date.now()}`, name: "新建服务" }, ...serviceList])}>
            <div className="grid cols-4">{serviceList.map((item) => <ServiceCard key={item.id} service={item} />)}</div>
            <EditableTable rows={serviceList} getKey={(row) => row.id} onUpdate={(id, row) => setServiceList(serviceList.map((item) => item.id === id ? row : item))} onDelete={(id) => setServiceList(serviceList.filter((item) => item.id !== id))} />
          </Manager>
        )}

        {active === "home" && (
          <Manager title="首页配置">
            <div className="grid cols-3">
              {ecoCategories.map((item) => (
                <article className="card feature-card" key={item.title}>
                  <span className="tag">生态卡片</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </Manager>
        )}
      </section>
    </div>
  );
}

function Manager({ title, children, onAdd }: { title: string; children: React.ReactNode; onAdd?: () => void }) {
  return (
    <>
      <div className="section-head">
        <div><span className="eyebrow">Content Studio</span><h1 style={{ fontSize: "3rem" }}>{title}</h1></div>
        {onAdd ? <button className="pill" type="button" onClick={onAdd}>新增内容</button> : <p>查看素材与配置，后续可接 API 或对象存储。</p>}
      </div>
      <div style={{ display: "grid", gap: 22 }}>{children}</div>
    </>
  );
}

function EditableTable<T extends Record<string, unknown>>({
  rows,
  getKey,
  onUpdate,
  onDelete
}: {
  rows: T[];
  getKey: (row: T) => string;
  onUpdate?: (key: string, row: T) => void;
  onDelete?: (key: string) => void;
}) {
  const keys = Object.keys(rows[0] ?? {}).slice(0, 7);
  if (rows.length === 0) {
    return <div className="card feature-card">暂无数据</div>;
  }

  return (
    <div className="card table-card">
      <table>
        <thead>
          <tr>
            {keys.map((key) => <th key={key}>{key}</th>)}
            {onDelete ? <th>操作</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getKey(row)}>
              {keys.map((key) => (
                <td key={key}>
                  {onUpdate ? (
                    <input
                      aria-label={`编辑${key}`}
                      name={key}
                      autoComplete="off"
                      value={Array.isArray(row[key]) ? (row[key] as unknown[]).join("、") : String(row[key] ?? "")}
                      onChange={(event) => {
                        const currentValue = row[key];
                        const nextValue = Array.isArray(currentValue)
                          ? event.target.value.split("、").map((item) => item.trim()).filter(Boolean)
                          : event.target.value;
                        onUpdate(getKey(row), { ...row, [key]: nextValue });
                      }}
                    />
                  ) : (
                    Array.isArray(row[key]) ? (row[key] as unknown[]).join("、") : String(row[key] ?? "")
                  )}
                </td>
              ))}
              {onDelete ? (
                <td>
                  <button
                    className="ghost-pill"
                    type="button"
                    onClick={() => {
                      if (window.confirm("确认删除这条内容？")) {
                        onDelete(getKey(row));
                      }
                    }}
                  >
                    删除
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
