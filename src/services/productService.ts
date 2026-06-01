import { products } from "@/data/products";

export function getProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((item) => item.slug === slug || item.id === slug);
}

export function getCoreProduct() {
  return products.find((item) => item.isCore) ?? products[0];
}
