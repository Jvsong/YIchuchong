import { newsItems } from "@/data/news";

export function getNewsList() {
  return newsItems;
}

export function getNewsById(id: string) {
  return newsItems.find((item) => item.id === id);
}

export function getNewsCategories() {
  return Array.from(new Set(newsItems.map((item) => item.category)));
}

export function getNewsTags() {
  return Array.from(new Set(newsItems.flatMap((item) => item.tags)));
}
