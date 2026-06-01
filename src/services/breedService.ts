import { breeds } from "@/data/breeds";

export function getBreedList() {
  return breeds;
}

export function getBreedById(slug: string) {
  return breeds.find((item) => item.slug === slug || item.id === slug);
}

export function getBreedTags() {
  return Array.from(new Set(breeds.flatMap((item) => item.tags)));
}
