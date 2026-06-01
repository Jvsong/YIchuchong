import photoLibrary from "../../public/assets/pets/photo-library.json";
import type { PhotoAsset } from "@/types";

export function getPhotoAssets() {
  return photoLibrary as unknown as PhotoAsset[];
}

export function getPhotosByPage(page: string) {
  return getPhotoAssets().filter((item) => item.pageUsage?.some((usage) => typeof usage === "string" ? usage === page : usage.page === page));
}
