import { mkdir, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const baseDir = join(root, "public/assets/pets");
const license = "Pexels License, free to use; attribution appreciated but not required";

const shared = {
  source: "Pexels",
  author: "Pexels contributor",
  license
};

const run = promisify(execFile);

const rows = [
  ["hero-pet-owner-dog-001.jpg", "hero", "dog", "Mixed Breed", "bright owner and pet lifestyle", "首页 Banner / 品牌首屏", 1643457],
  ["hero-dog-safety-walk-001.jpg", "hero", "dog", "Golden Retriever", "outdoor safety walk", "定位器页面 / 首页首屏", 1108099],
  ["hero-cat-smart-home-001.jpg", "hero", "cat", "Domestic Cat", "indoor smart feeding", "智能设备页面 / 内容卡片", 45201],
  ["hero-family-pet-001.jpg", "hero", "dog", "Family Pet", "family pet lifestyle", "关于我们 / 品牌故事", 4587998],
  ["hero-service-walking-001.jpg", "hero", "dog", "Mixed Breed", "city walking service", "宠物服务 / 代溜场景", 1254140],

  ["dog-golden-outdoor-001.jpg", "dogs", "dog", "Golden Retriever", "outdoor safety walk", "homepage hero, locator detail", 1108099],
  ["dog-corgi-park-001.jpg", "dogs", "dog", "Corgi", "park walk", "breed wiki", 58997],
  ["dog-shiba-city-001.jpg", "dogs", "dog", "Shiba Inu", "city walk", "breed wiki", 1805164],
  ["dog-border-collie-001.jpg", "dogs", "dog", "Border Collie", "grass activity", "breed wiki", 2023384],
  ["dog-poodle-home-001.jpg", "dogs", "dog", "Poodle", "indoor home", "breed wiki", 1851164],
  ["dog-labrador-yard-001.jpg", "dogs", "dog", "Labrador", "yard play", "breed wiki", 2253275],
  ["dog-samoyed-bright-001.jpg", "dogs", "dog", "Samoyed", "bright portrait", "breed wiki", 406014],
  ["dog-beagle-walk-001.jpg", "dogs", "dog", "Beagle", "daily walk", "breed wiki", 247522],
  ["dog-frenchie-home-001.jpg", "dogs", "dog", "French Bulldog", "home companion", "breed wiki", 733416],
  ["dog-husky-outdoor-001.jpg", "dogs", "dog", "Husky", "outdoor route", "breed wiki", 3715583],
  ["dog-walking-city-001.jpg", "dogs", "dog", "Mixed Breed", "urban walking", "fun and service pages", 1254140],
  ["dog-run-sunlight-001.jpg", "dogs", "dog", "Mixed Breed", "sunny activity", "news and cards", 1390784],

  ["cat-indoor-feeding-001.jpg", "cats", "cat", "Domestic Cat", "indoor feeding", "homepage hero", 45201],
  ["cat-british-home-001.jpg", "cats", "cat", "British Shorthair", "quiet home", "breed wiki", 1170986],
  ["cat-ragdoll-window-001.jpg", "cats", "cat", "Ragdoll", "window rest", "wiki hero", 1741205],
  ["cat-maine-coon-001.jpg", "cats", "cat", "Maine Coon", "soft portrait", "breed wiki", 2071873],
  ["cat-orange-sofa-001.jpg", "cats", "cat", "Orange Cat", "sofa rest", "breed wiki", 1543793],
  ["cat-siamese-home-001.jpg", "cats", "cat", "Siamese", "home portrait", "breed wiki", 127028],
  ["cat-american-short-001.jpg", "cats", "cat", "American Shorthair", "bright room", "breed wiki", 320014],
  ["cat-persian-soft-001.jpg", "cats", "cat", "Persian", "soft portrait", "breed wiki", 69932],
  ["cat-sphynx-home-001.jpg", "cats", "cat", "Sphynx", "indoor portrait", "breed wiki", 991831],
  ["cat-play-home-001.jpg", "cats", "cat", "Domestic Cat", "play at home", "news card", 416160],

  ["small-rabbit-home-001.jpg", "small-pets", "rabbit", "Rabbit", "home care", "small pet wiki", 326012],
  ["small-hamster-001.jpg", "small-pets", "hamster", "Hamster", "habitat", "small pet wiki", 452048],
  ["small-guinea-pig-001.jpg", "small-pets", "guinea pig", "Guinea Pig", "indoor care", "small pet wiki", 63853],
  ["small-chinchilla-001.jpg", "small-pets", "chinchilla", "Chinchilla", "soft portrait", "small pet wiki", 160846],
  ["small-parrot-001.jpg", "small-pets", "parrot", "Parrot", "companion bird", "small pet wiki", 97533],
  ["small-rabbit-bright-002.jpg", "small-pets", "rabbit", "Rabbit", "bright portrait", "content card", 4001296],
  ["small-hamster-home-002.jpg", "small-pets", "hamster", "Hamster", "warm indoor", "content card", 50577],
  ["small-pet-care-001.jpg", "small-pets", "small pet", "Small Pet", "owner care", "service content", 5255202],

  ["pet-lifestyle-home-001.jpg", "lifestyle", "dog and cat", "Mixed", "bright home lifestyle", "homepage hero", 1643457],
  ["pet-owner-phone-001.jpg", "lifestyle", "dog", "Mixed Breed", "owner checking app", "news hero", 406014],
  ["pet-family-bright-001.jpg", "lifestyle", "dog", "Family Pet", "family lifestyle", "about hero", 4587998],
  ["pet-couch-calm-001.jpg", "lifestyle", "cat", "Domestic Cat", "calm couch", "content background", 1741205],
  ["pet-window-soft-001.jpg", "lifestyle", "cat", "Domestic Cat", "window light", "content background", 20787],
  ["pet-park-owner-001.jpg", "lifestyle", "dog", "Mixed Breed", "park with owner", "service entry", 1254140],
  ["pet-home-play-001.jpg", "lifestyle", "dog", "Mixed Breed", "home play", "content card", 3361739],
  ["pet-clean-home-001.jpg", "lifestyle", "cat", "Domestic Cat", "clean home", "content card", 127028],

  ["device-tracker-collar-001.jpg", "device-scenes", "dog", "Mixed Breed", "collar tracker concept", "locator product", 1805164],
  ["device-feeder-home-001.jpg", "device-scenes", "cat", "Domestic Cat", "feeding device scene", "devices page", 45201],
  ["device-camera-home-001.jpg", "device-scenes", "dog", "Mixed Breed", "camera care scene", "product card", 1254140],
  ["device-cat-feeding-001.jpg", "device-scenes", "cat", "Domestic Cat", "remote feeding", "product card", 416160],
  ["device-fountain-001.jpg", "device-scenes", "cat", "Domestic Cat", "water care", "product card", 69932],
  ["device-home-monitor-001.jpg", "device-scenes", "dog", "Mixed Breed", "home monitoring", "admin library", 4587998],
  ["device-smart-home-001.jpg", "device-scenes", "cat", "Domestic Cat", "smart home ecosystem", "admin library", 1170986],
  ["device-wearable-walk-001.jpg", "device-scenes", "dog", "Mixed Breed", "wearable walk", "locator page", 1108099],

  ["service-boarding-room-001.jpg", "service-scenes", "dog", "Mixed Breed", "boarding room", "boarding page", 4587998],
  ["service-dog-walking-001.jpg", "service-scenes", "dog", "Mixed Breed", "dog walking", "walking page", 1254140],
  ["service-store-front-001.jpg", "service-scenes", "dog", "Mixed Breed", "store partner", "partners page", 2253275],
  ["service-boarding-monitor-001.jpg", "service-scenes", "cat", "Domestic Cat", "boarding monitor", "product card", 1741205],
  ["service-grooming-bright-001.jpg", "service-scenes", "dog", "Mixed Breed", "service scene", "admin library", 3361739],
  ["service-care-record-001.jpg", "service-scenes", "cat", "Domestic Cat", "care record", "admin library", 2071873],
  ["service-walker-route-001.jpg", "service-scenes", "dog", "Mixed Breed", "walker route", "admin library", 1390784],
  ["service-owner-handoff-001.jpg", "service-scenes", "dog", "Mixed Breed", "owner handoff", "admin library", 1851164]
];

function urlFor(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;
}

async function download(url, destination) {
  await run("curl", ["-L", "--fail", "--max-time", "24", url, "-o", destination]);
}

async function existsWithBytes(path) {
  try {
    const info = await stat(path);
    return info.size > 0;
  } catch {
    return false;
  }
}

await mkdir(baseDir, { recursive: true });

const library = [];
for (const [fileName, category, species, breed, scene, usage, photoId] of rows) {
  const dir = join(baseDir, category);
  await mkdir(dir, { recursive: true });
  const sourceUrl = `https://www.pexels.com/photo/${photoId}/`;
  const imageUrl = urlFor(photoId);
  const destination = join(dir, fileName);
  if (!(await existsWithBytes(destination))) {
    await download(imageUrl, destination);
  }
  library.push({
    id: fileName.replace(".jpg", ""),
    fileName,
    path: `/assets/pets/${category}/${fileName}`,
    category,
    species,
    breed,
    scene,
    usage,
    ...shared,
    sourceUrl,
    notes: "Downloaded for the Yiquchong first-version mock site. Verify final brand usage before production launch."
  });
}

await writeFile(join(baseDir, "photo-library.json"), `${JSON.stringify(library, null, 2)}\n`);
console.log(`Prepared ${library.length} pet assets in ${baseDir}`);
