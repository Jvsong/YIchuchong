import { DevicesCatalog } from "@/components/DevicesCatalog";
import { getProducts } from "@/lib/content";
import { getPageHeroImages } from "@/lib/siteSettings";

export const dynamic = "force-dynamic";

export default function DevicesPage() {
  const products = getProducts();
  const heroImage = getPageHeroImages().devices;
  return <DevicesCatalog products={products} heroImage={heroImage} />;
}
