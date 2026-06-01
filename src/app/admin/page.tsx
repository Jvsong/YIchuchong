"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BreedCard, NewsCard, ProductCard, ServiceCard } from "@/components/Cards";
import { ecoCategories } from "@/data/site";
import type { Breed, FunFact, NewsItem, PhotoAsset, Product, Service } from "@/data/types";
import { getAdminDashboardStats, getBreedList, getFunFacts, getNewsList, getPhotoAssets, getProducts, getServices } from "@/services/content";

type Tab = "overview" | "news" | "wiki" | "facts" | "photos" | "products" | "services" | "home" | "advice";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "数据概览" },
  { id: "news", label: "宠物资讯管理" },
  { id: "wiki", label: "宠物百科管理" },
  { id: "facts", label: "小科普管理" },
  { id: "photos", label: "图片素材库" },
  { id: "products", label: "产品内容管理" },
  { id: "services", label: "服务内容管理" },
  { id: "home", label: "首页配置" },
  { id: "advice", label: "养宠建议配置" }
];

function useLocalCollection<T extends { id?: string; slug?: string }>(key: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(() => {
    if (typeof window === "undefined") return fallback;
    const cached = window.localStorage.getItem(key);
    try {
      return cached ? (JSON.parse(cached) as T[]) : fallback;
    } catch {
      window.localStorage.removeItem(key);
      return fallback;
    }
  });

  function persist(next: T[]) {
    setItems(next);
    window.localStorage.setItem(key, JSON.stringify(next));
  }

  return [items, persist] as const;
}

export default function AdminPage() {
  const router = useRouter();
  const [active, setActive] = useState<Tab>("overview");
  const [news, setNews] = useLocalCollection<NewsItem>("yqc-news", getNewsList());
  const [wiki, setWiki] = useLocalCollection<Breed>("yqc-breeds", getBreedList());
  const [facts, setFacts] = useLocalCollection<FunFact>("yqc-facts", getFunFacts());
  const [productList, setProductList] = useLocalCollection<Product>("yqc-products", getProducts());
  const [serviceList, setServiceList] = useLocalCollection<Service>("yqc-services", getServices());
  const [wikiSpecies, setWikiSpecies] = useState("all");
  const [photoKeyword, setPhotoKeyword] = useState("");
  const [photoCategory, setPhotoCategory] = useState("全部");
  const photos = getPhotoAssets() as PhotoAsset[];

  const stats = useMemo(() => getAdminDashboardStats().map(([label, value]) => {
    if (label === "资讯数量") return [label, news.length] as const;
    if (label === "百科数量") return [label, wiki.length] as const;
    if (label === "科普数量") return [label, facts.length] as const;
    if (label === "产品数量") return [label, productList.length] as const;
    if (label === "服务数量") return [label, serviceList.length] as const;
    return [label, value] as const;
  }), [facts.length, news.length, productList.length, serviceList.length, wiki.length]);
  const visibleWiki = wiki.filter((item) => wikiSpecies === "all" || item.species === wikiSpecies);
  const photoCategories = ["全部", ...Array.from(new Set(photos.map((item) => item.category)))];
  const visiblePhotos = photos.filter((item) => {
    const matchCategory = photoCategory === "全部" || item.category === photoCategory;
    const pageUsageText = item.pageUsage?.map((usage) => typeof usage === "string" ? usage : `${usage.page} ${usage.role}`).join(" ");
    const haystack = [item.id, item.fileName, item.category, item.scene, item.usage, item.author, pageUsageText].join(" ").toLowerCase();
    return matchCategory && haystack.includes(photoKeyword.toLowerCase());
  });

  function duplicateNews() {
    const id = `n${Date.now()}`;
    setNews([{ ...news[0], id, title: "新建宠物资讯", summary: "在这里编辑资讯摘要。" }, ...news]);
  }

  function duplicateFact() {
    const id = `fact-${Date.now()}`;
    setFacts([{ ...facts[0], id, body: "新建小科普内容。" }, ...facts]);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.localStorage.removeItem("yqc-admin-demo");
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <span className="eyebrow">轻量管理平台</span>
        <h2 style={{ fontSize: "2rem", marginTop: 16 }}>易趣宠后台</h2>
        <button className="ghost-pill admin-logout" type="button" onClick={logout}>
          退出登录
        </button>
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
              <p>第四版数据来自模块化前端数据与 localStorage 演示存储，service 层保留后续 API 替换空间。</p>
            </div>
            <div className="grid cols-4">
              {stats.map(([label, value]) => (
                <article className="card feature-card" key={label}>
                  <span className="tag">{label}</span>
                  <h2 style={{ marginTop: 12 }}>{value}</h2>
                </article>
              ))}
              <article className="card feature-card">
                <span className="tag">今日更新提示</span>
                <p style={{ marginTop: 12 }}>第四版新增养宠建议接口，后续可把内容管理和建议记录接入 Spring Boot + MySQL。</p>
              </article>
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
            <div className="segmented">
              {[["all", "全部"], ["dog", "狗狗"], ["cat", "猫咪"], ["small-pet", "小宠"]].map(([value, label]) => (
                <button className={wikiSpecies === value ? "active" : ""} key={value} type="button" onClick={() => setWikiSpecies(value)}>{label}</button>
              ))}
            </div>
            <div className="grid cols-4">{visibleWiki.slice(0, 8).map((item) => <BreedCard key={item.slug} breed={item} />)}</div>
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
            <div className="filter-row">
              <label className="search-field"><span>搜索素材</span><input value={photoKeyword} onChange={(event) => setPhotoKeyword(event.target.value)} placeholder="图片、作者、场景、页面用途" /></label>
              <div className="chip-row">
                {photoCategories.map((item) => <button className={photoCategory === item ? "active" : ""} key={item} type="button" onClick={() => setPhotoCategory(item)}>{item}</button>)}
              </div>
            </div>
            <EditableTable rows={visiblePhotos} getKey={(row) => row.id} />
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

        {active === "advice" && (
          <Manager title="养宠建议配置">
            <div className="grid cols-3">
              {[
                ["服务端接口", "前台提交到 /api/pet-advice，由 Next.js 服务端读取 DEEPSEEK_API_KEY，不在前端暴露 Key。"],
                ["本地兜底", "DeepSeek 未配置、超时或失败时，自动使用 aiRules.ts 生成结构化建议。"],
                ["生产迁移", "后续 Spring Boot 可实现 PetAdviceController / PetAdviceService，并记录请求摘要和降级状态。"]
              ].map(([title, text]) => (
                <article className="card feature-card" key={title}>
                  <span className="tag">说明</span>
                  <h3 style={{ marginTop: 14 }}>{title}</h3>
                  <p>{text}</p>
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
                  ) : key === "path" && typeof row[key] === "string" ? (
                    <Image
                      className="admin-thumb"
                      src={String(row[key])}
                      alt={String(row.id ?? "宠物素材")}
                      width={92}
                      height={68}
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
