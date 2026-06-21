/**
 * 统一的「存储感知」内容读取层 —— SERVER-ONLY（依赖 fs via dataStore）。
 *
 * 这是公开页面读取可编辑内容的【唯一规范入口】：优先读 storage/<type>.json
 * （后台编辑的结果），文件缺失时回退到 src/data 种子数据。
 *
 * ⚠️ 客户端组件不能 import 本文件（会因 fs 报错）。客户端需要可编辑数据时，
 *    应由 server 父组件读取后以 props 下传（见 FunFactTicker / DevicesCatalog）。
 *    纯静态、客户端安全的访问器在 src/services/content.ts。
 */
import { readData } from "./dataStore";
import { newsItems } from "@/data/news";
import { breeds } from "@/data/breeds";
import { funFacts } from "@/data/funFacts";
import { products } from "@/data/products";
import { services } from "@/data/services";
import photoLibrary from "@/data/private/photo-library.json";
import type { Breed, FunFact, NewsItem, PhotoAsset, Product, Service } from "@/data/types";
import type { EditableType } from "@/config";
import { LEGACY_ENUM_IDS } from "@/i18n/enums";

/** 读取容错：把旧中文枚举值（如 storage 里历史的 "已发布"）就地归一为新 ID，
 *  并丢弃已废弃的 statusLabel 字段。即使没跑迁移脚本，旧 storage 也能正常显示。 */
function normalizeLegacy<T>(items: T[]): T[] {
  if (!Array.isArray(items)) return items;
  return items.map((item) => {
    if (!item || typeof item !== "object") return item;
    const rec = item as Record<string, unknown>;
    const status = rec.status;
    if (typeof status === "string" && LEGACY_ENUM_IDS[status]) {
      const { statusLabel, ...rest } = rec;
      void statusLabel;
      return { ...rest, status: LEGACY_ENUM_IDS[status] } as T;
    }
    return item;
  });
}

/** 每个可编辑类型的种子回退数据（storage 文件缺失时使用）。 */
const FALLBACKS: Record<EditableType, unknown[]> = {
  news: newsItems,
  breeds,
  facts: funFacts,
  products,
  services,
  photos: photoLibrary as unknown as PhotoAsset[]
};

/** 泛型读取：storage 优先、回退种子，并对旧枚举值做读取容错。后台编辑后立即对前台可见。 */
export function getCollection<T>(type: EditableType): T[] {
  return normalizeLegacy(readData<T>(type, FALLBACKS[type] as T[]));
}

export function getNews(): NewsItem[] {
  return getCollection<NewsItem>("news");
}
export function getNewsById(id: string): NewsItem | undefined {
  return getNews().find((item) => item.id === id);
}

export function getBreeds(): Breed[] {
  return getCollection<Breed>("breeds");
}
export function getBreedById(slug: string): Breed | undefined {
  return getBreeds().find((item) => item.slug === slug || item.id === slug);
}

export function getProducts(): Product[] {
  return getCollection<Product>("products");
}
export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((item) => item.slug === slug || item.id === slug);
}
export function getCoreProduct(): Product | undefined {
  const list = getProducts();
  return list.find((item) => item.isCore) ?? list[0];
}

export function getServices(): Service[] {
  return getCollection<Service>("services");
}
export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((item) => item.slug === slug || item.id === slug);
}

export function getPhotoAssets(): PhotoAsset[] {
  return getCollection<PhotoAsset>("photos");
}

/** 启用 + 命中页面范围的小科普，按优先级降序（前台展示用）。 */
export function getFunFacts(scope = "global"): FunFact[] {
  return getCollection<FunFact>("facts")
    .filter((item) => item.enabled && (item.pageScope.includes("global") || item.pageScope.includes(scope)))
    .sort((a, b) => b.priority - a.priority);
}

/** 后台「数据概览」统计（server 端，与前台同源）。 */
export function getContentCounts() {
  return {
    news: getNews().length,
    breeds: getBreeds().length,
    facts: getCollection<FunFact>("facts").length,
    products: getProducts().length,
    services: getServices().length,
    photos: getPhotoAssets().length
  };
}
