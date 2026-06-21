import type { HomeConfig } from "@/data/types";
import { heroImages, homeConfig, homeStoryImages, pageHeroImages } from "@/data/homepage";
import { readObject } from "./dataStore";

export type SiteSettings = {
  home: HomeConfig;
  heroImages: string[];
  homeStoryImages: typeof homeStoryImages;
  pageHeroImages: typeof pageHeroImages;
  brand: { email: string };
};

export const defaultSiteSettings: SiteSettings = {
  home: homeConfig,
  heroImages,
  homeStoryImages,
  pageHeroImages,
  brand: { email: "hello@yiquchong.example" }
};

/** 服务端读取站点设置（storage/settings.json），缺失字段回退默认值。仅供 server component 使用。 */
export function getSiteSettings(): SiteSettings {
  return readObject<SiteSettings>("settings", defaultSiteSettings);
}

export function getHomeConfig() {
  return getSiteSettings().home;
}

export function getHeroImages() {
  return getSiteSettings().heroImages;
}

export function getHomeStoryImages() {
  return getSiteSettings().homeStoryImages;
}

export function getPageHeroImages() {
  return getSiteSettings().pageHeroImages;
}

export function getBrand() {
  return getSiteSettings().brand;
}
