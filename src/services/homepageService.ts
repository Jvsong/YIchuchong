import { collectionCards, smartEcosystem } from "@/data/homepage";

// 首页静态卡片（非后台可编辑）。hero 文案/各页背景图等改由 lib/siteSettings 提供（可编辑）。
export function getCollectionCards() {
  return collectionCards;
}

export function getSmartEcosystem() {
  return smartEcosystem;
}
