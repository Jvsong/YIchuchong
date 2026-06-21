"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Breed, FunFact, LocalizedText, NewsItem, PhotoAsset, Product, Service } from "@/data/types";
import type { SiteSettings } from "@/lib/siteSettings";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/index";
import { productStatusLabels, serviceStatusLabels } from "@/i18n/enums";
// 后台为客户端组件，初始回退用静态种子（不能 import 含 fs 的 lib/content）；
// 挂载后立即用 /api/admin/data 拉取 storage 中的真实数据覆盖。
import { newsItems } from "@/data/news";
import { breeds as seedBreeds } from "@/data/breeds";
import { funFacts } from "@/data/funFacts";
import { products } from "@/data/products";
import { services } from "@/data/services";
import photoLibrary from "@/data/private/photo-library.json";
import { RecordManager } from "@/components/admin/RecordManager";

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

/** 取字段中文展示值（双语取 zh，否则原值）。 */
function txt(value: string | LocalizedText | undefined): string {
  if (!value) return "";
  return typeof value === "string" ? value : value.zh;
}

function useApiCollection<T extends { id?: string; slug?: string }>(type: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/data/${type}`)
      .then((r) => {
        if (!r.ok) throw new Error("load failed");
        return r.json() as Promise<T[]>;
      })
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [type]);

  async function persist(next: T[]) {
    setItems(next);
    await fetch(`/api/admin/data/${type}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next)
    }).catch(() => {});
  }

  return [items, persist, loading] as const;
}

export default function AdminPage() {
  const router = useRouter();
  const [active, setActive] = useState<Tab>("overview");
  const [news, setNews, newsLoading] = useApiCollection<NewsItem>("news", newsItems);
  const [wiki, setWiki, wikiLoading] = useApiCollection<Breed>("breeds", seedBreeds);
  const [facts, setFacts, factsLoading] = useApiCollection<FunFact>("facts", funFacts);
  const [productList, setProductList, productsLoading] = useApiCollection<Product>("products", products);
  const [serviceList, setServiceList, servicesLoading] = useApiCollection<Service>("services", services);
  const [photos, setPhotos, photosLoading] = useApiCollection<PhotoAsset>("photos", photoLibrary as unknown as PhotoAsset[]);

  // 统计直接来自当前编辑中的实时数组，始终与各管理 tab 一致。
  const stats = useMemo(() => [
    ["资讯数量", news.length],
    ["百科数量", wiki.length],
    ["科普数量", facts.length],
    ["产品数量", productList.length],
    ["服务数量", serviceList.length]
  ] as const, [facts.length, news.length, productList.length, serviceList.length, wiki.length]);

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    router.replace("/admin/login");
    router.refresh();
  }

  const stamp = () => Date.now();

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <span className="eyebrow">轻量管理平台</span>
        <h2 style={{ fontSize: "2rem", marginTop: 16 }}>易趣宠后台</h2>
        <button className="ghost-pill admin-logout" type="button" onClick={logout}>退出登录</button>
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
              <p>内容数据存储于服务器 JSON 文件，支持跨浏览器持久化与图片上传。Service 层预留后续 Spring Boot + MySQL 替换空间。</p>
            </div>
            <div className="grid cols-4">
              {stats.map(([label, value]) => (
                <article className="card feature-card" key={label}>
                  <span className="tag">{label}</span>
                  <h2 style={{ marginTop: 12 }}>{value}</h2>
                </article>
              ))}
              <article className="card feature-card">
                <span className="tag">图片素材</span>
                <h2 style={{ marginTop: 12 }}>{photos.length}</h2>
              </article>
            </div>
          </>
        )}

        {active === "news" && (
          <RecordManager<NewsItem>
            title="宠物资讯管理"
            rows={news}
            loading={newsLoading}
            getKey={(row) => row.id}
            primary={(row) => txt(row.title)}
            secondary={(row) => `${txt(row.category)} · ${row.publishDate}`}
            thumb={(row) => row.coverImage || row.image}
            onChange={setNews}
            makeNew={() => ({
              ...(news[0] as NewsItem),
              id: `n${stamp()}`,
              title: { zh: "新建资讯标题", en: "New article title" },
              summary: { zh: "", en: "" },
              content: { zh: "", en: "" },
              tags: [],
              status: "draft"
            })}
          />
        )}

        {active === "wiki" && (
          <RecordManager<Breed>
            title="宠物百科管理"
            rows={wiki}
            loading={wikiLoading}
            getKey={(row) => row.slug}
            primary={(row) => txt(row.name)}
            secondary={(row) => `${row.species} · ${row.size}`}
            thumb={(row) => row.image || row.coverImage}
            onChange={setWiki}
            makeNew={() => {
              const slug = `breed-${stamp()}`;
              return {
                ...(wiki[0] as Breed),
                id: slug,
                slug,
                name: { zh: "新建品种", en: "New breed" },
                englishName: "New breed",
                summary: { zh: "", en: "" }
              };
            }}
          />
        )}

        {active === "facts" && (
          <RecordManager<FunFact>
            title="小科普管理"
            rows={facts}
            loading={factsLoading}
            getKey={(row) => row.id}
            primary={(row) => txt(row.body)}
            secondary={(row) => txt(row.category)}
            onChange={setFacts}
            makeNew={() => ({
              ...(facts[0] as FunFact),
              id: `fact-${stamp()}`,
              title: { zh: "你知道吗？", en: "Did you know?" },
              body: { zh: "新建小科普内容。", en: "New tip content." }
            })}
          />
        )}

        {active === "photos" && (
          <RecordManager<PhotoAsset>
            title="图片素材库"
            rows={photos}
            loading={photosLoading}
            getKey={(row) => row.id}
            primary={(row) => row.fileName || row.id}
            secondary={(row) => `${row.category}${row.author ? ` · ${row.author}` : ""}`}
            thumb={(row) => row.path}
            onChange={setPhotos}
            makeNew={() => ({
              ...(photos[0] as PhotoAsset),
              id: `photo-${stamp()}`,
              fileName: "新上传图片",
              path: "",
              author: "",
              notes: ""
            })}
          />
        )}

        {active === "products" && (
          <RecordManager<Product>
            title="产品内容管理"
            rows={productList}
            loading={productsLoading}
            getKey={(row) => row.id}
            primary={(row) => txt(row.name)}
            secondary={(row) => `${txt(row.category)} · ${productStatusLabels[row.status]?.zh ?? row.status}`}
            thumb={(row) => row.image || row.coverImage}
            onChange={setProductList}
            makeNew={() => {
              const slug = `product-${stamp()}`;
              return {
                ...(productList[0] as Product),
                id: slug,
                slug,
                name: { zh: "新建设备", en: "New device" },
                summary: { zh: "", en: "" },
                description: { zh: "", en: "" },
                isCore: false
              };
            }}
          />
        )}

        {active === "services" && (
          <RecordManager<Service>
            title="服务内容管理"
            rows={serviceList}
            loading={servicesLoading}
            getKey={(row) => row.id}
            primary={(row) => txt(row.name)}
            secondary={(row) => `${txt(row.category)} · ${serviceStatusLabels[row.status]?.zh ?? row.status}`}
            thumb={(row) => row.image || row.coverImage}
            onChange={setServiceList}
            makeNew={() => {
              const slug = `service-${stamp()}`;
              return {
                ...(serviceList[0] as Service),
                id: slug,
                slug,
                name: { zh: "新建服务", en: "New service" },
                summary: { zh: "", en: "" },
                description: { zh: "", en: "" }
              };
            }}
          />
        )}

        {active === "home" && <SiteSettingsManager />}

        {active === "advice" && (
          <>
            <div className="section-head">
              <div><span className="eyebrow">Content Studio</span><h1 style={{ fontSize: "3rem" }}>养宠建议配置</h1></div>
              <p>说明性配置，建议接口由服务端 DeepSeek 代理。</p>
            </div>
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
          </>
        )}
      </section>
    </div>
  );
}

function SiteSettingsManager() {
  const [draft, setDraft] = useState<SiteSettings | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "saving" | "saved">("loading");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => (r.ok ? (r.json() as Promise<SiteSettings>) : null))
      .then((data) => {
        if (data) setDraft(data);
        setStatus("idle");
      })
      .catch(() => setStatus("idle"));
  }, []);

  async function save() {
    if (!draft) return;
    setStatus("saving");
    try {
      const r = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
      });
      setStatus(r.ok ? "saved" : "idle");
    } catch {
      setStatus("idle");
    }
  }

  if (!draft) {
    return (
      <>
        <div className="section-head"><div><span className="eyebrow">Content Studio</span><h1 style={{ fontSize: "3rem" }}>首页配置 / 站点设置</h1></div></div>
        <div className="card feature-card">{status === "loading" ? "正在加载设置…" : "无法加载设置。"}</div>
      </>
    );
  }

  const setHome = (key: keyof SiteSettings["home"], lang: Locale, value: string) =>
    setDraft({ ...draft, home: { ...draft.home, [key]: { ...draft.home[key], [lang]: value } } });
  const setStory = (key: keyof SiteSettings["homeStoryImages"], value: string) =>
    setDraft({ ...draft, homeStoryImages: { ...draft.homeStoryImages, [key]: value } });
  const setPageHero = (key: string, value: string) =>
    setDraft({ ...draft, pageHeroImages: { ...draft.pageHeroImages, [key]: value } });
  const setHeroImage = (index: number, value: string) =>
    setDraft({ ...draft, heroImages: draft.heroImages.map((img, i) => (i === index ? value : img)) });

  const homeFields: { key: keyof SiteSettings["home"]; label: string }[] = [
    { key: "heroTitle", label: "首页主标题" },
    { key: "heroSubtitle", label: "首页副标题" },
    { key: "primaryAction", label: "主按钮文字" },
    { key: "secondaryAction", label: "次按钮文字" }
  ];

  return (
    <>
      <div className="section-head">
        <div><span className="eyebrow">Content Studio</span><h1 style={{ fontSize: "3rem" }}>首页配置 / 站点设置</h1></div>
        <button className="pill" type="button" onClick={save} disabled={status === "saving"}>
          {status === "saving" ? "保存中…" : status === "saved" ? "已保存 ✓" : "保存设置"}
        </button>
      </div>

      <div style={{ display: "grid", gap: 22 }}>
        <div className="card feature-card">
          <h3>首页 Hero 文案（{LOCALES.map((l) => LOCALE_LABELS[l]).join(" / ")}）</h3>
          <div style={{ display: "grid", gap: 14, marginTop: 12 }}>
            {homeFields.map(({ key, label }) => (
              <div className="loc-grid" key={key}>
                {LOCALES.map((loc) => (
                  <label className="field" key={loc}>
                    <span>{label}（{LOCALE_LABELS[loc]}）</span>
                    <input value={draft.home[key][loc] ?? ""} onChange={(e) => setHome(key, loc, e.target.value)} />
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="card feature-card">
          <h3>首页图片</h3>
          <div style={{ display: "grid", gap: 14, marginTop: 12 }}>
            <label className="field">
              <span>首页主图 (hero)</span>
              <input value={draft.heroImages[0] ?? ""} onChange={(e) => setHeroImage(0, e.target.value)} />
            </label>
            {(Object.keys(draft.homeStoryImages) as (keyof SiteSettings["homeStoryImages"])[]).map((key) => (
              <label className="field" key={key}>
                <span>首页配图：{key}</span>
                <input value={draft.homeStoryImages[key]} onChange={(e) => setStory(key, e.target.value)} />
              </label>
            ))}
          </div>
        </div>

        <div className="card feature-card">
          <h3>各页背景图</h3>
          <div style={{ display: "grid", gap: 14, marginTop: 12 }}>
            {Object.keys(draft.pageHeroImages).map((key) => (
              <label className="field" key={key}>
                <span>{key} 页背景</span>
                <input value={(draft.pageHeroImages as Record<string, string>)[key]} onChange={(e) => setPageHero(key, e.target.value)} />
              </label>
            ))}
          </div>
        </div>

        <div className="card feature-card">
          <h3>品牌信息</h3>
          <label className="field" style={{ marginTop: 12 }}>
            <span>联系邮箱</span>
            <input value={draft.brand.email} onChange={(e) => setDraft({ ...draft, brand: { ...draft.brand, email: e.target.value } })} />
          </label>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
          图片可在「图片素材库」上传后复制路径，或直接填 public 下的路径（如 /assets/pets/hero/xxx.jpg）。保存后前台对应页面刷新即生效。
        </p>
      </div>
    </>
  );
}
