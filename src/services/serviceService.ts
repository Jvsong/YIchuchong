import { services } from "@/data/services";

export function getServices() {
  return services;
}

export function getServiceBySlug(slug: string) {
  return services.find((item) => item.slug === slug || item.id === slug);
}
