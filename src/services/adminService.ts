import { getBreedList } from "./breedService";
import { getFunFacts } from "./funFactService";
import { getNewsList } from "./newsService";
import { getPhotoAssets } from "./photoService";
import { getProducts } from "./productService";
import { getServices } from "./serviceService";

export function getAdminDashboardStats() {
  return [
    ["资讯数量", getNewsList().length],
    ["百科数量", getBreedList().length],
    ["科普数量", getFunFacts().length],
    ["图片数量", getPhotoAssets().length],
    ["产品数量", getProducts().length],
    ["服务数量", getServices().length]
  ] as const;
}
