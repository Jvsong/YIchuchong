import photoLibrary from "../../public/assets/pets/photo-library.json";
import {
  breeds,
  funFacts,
  homeConfig,
  newsItems,
  products,
  services
} from "@/data/site";
import type { Breed, NewsItem, PhotoAsset } from "@/types";

export function getNewsList() {
  return newsItems;
}

export function getNewsById(id: string): NewsItem | undefined {
  return newsItems.find((item) => item.id === id);
}

export function getBreedList() {
  return breeds;
}

export function getBreedById(slug: string): Breed | undefined {
  return breeds.find((item) => item.slug === slug);
}

export function getFunFacts() {
  return funFacts;
}

export function getProducts() {
  return products;
}

export function getServices() {
  return services;
}

export function getPhotoAssets() {
  return photoLibrary as PhotoAsset[];
}

export function getHomeConfig() {
  return homeConfig;
}
