import type { Breed, NewsItem } from '@/data/types';
import { newsItems } from '@/data/news';
import { breeds } from '@/data/breeds';
import { readData } from './dataStore';

export function getNewsList(): NewsItem[] {
  return readData<NewsItem>('news', newsItems);
}

export function getNewsById(id: string): NewsItem | undefined {
  return getNewsList().find((item) => item.id === id);
}

export function getBreedList(): Breed[] {
  return readData<Breed>('breeds', breeds);
}

export function getBreedById(slug: string): Breed | undefined {
  return getBreedList().find((item) => item.slug === slug || item.id === slug);
}
