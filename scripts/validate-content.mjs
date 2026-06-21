import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const breedSource = readFileSync(resolve(root, "src/data/breeds.ts"), "utf8");
const photoLibrary = JSON.parse(readFileSync(resolve(root, "src/data/private/photo-library.json"), "utf8"));

const requiredSlugs = [
  "golden-retriever", "corgi", "shiba", "border-collie", "poodle", "labrador",
  "samoyed", "beagle", "french-bulldog", "husky", "german-shepherd", "bichon",
  "akita", "mini-schnauzer", "alaskan-malamute", "yorkshire-terrier", "pomeranian",
  "chihuahua", "dachshund", "australian-shepherd", "british-shorthair", "ragdoll",
  "maine-coon", "orange-cat", "siamese", "american-shorthair", "persian", "sphynx",
  "norwegian-forest", "devon-rex", "bengal", "scottish-fold", "russian-blue",
  "exotic-shorthair", "abyssinian", "burmese", "oriental-shorthair", "birman",
  "munchkin", "turkish-angora", "rabbit", "hamster", "guinea-pig", "chinchilla",
  "parrot", "ferret", "tortoise", "hedgehog"
];

const rowPattern = /^\s*\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"(dog|cat|small-pet)".*?"(\/assets\/pets\/[^"]+\.jpg)".*?\],?$/gm;
const breeds = [...breedSource.matchAll(rowPattern)].map((match) => ({
  slug: match[1],
  zhName: match[2],
  enName: match[3],
  species: match[4],
  image: match[5]
}));

const errors = [];
const fail = (message) => errors.push(message);

if (breeds.length !== requiredSlugs.length) {
  fail(`品种数量错误：读取到 ${breeds.length}，应为 ${requiredSlugs.length}`);
}

const breedBySlug = new Map(breeds.map((breed) => [breed.slug, breed]));
for (const slug of requiredSlugs) {
  if (!breedBySlug.has(slug)) fail(`缺少品种数据：${slug}`);
}

const pathOwners = new Map();
for (const breed of breeds) {
  if (!breed.zhName.trim() || !breed.enName.trim()) fail(`品种名称为空：${breed.slug}`);
  const owners = pathOwners.get(breed.image) ?? [];
  owners.push(breed.slug);
  pathOwners.set(breed.image, owners);

  const diskPath = resolve(root, "public", breed.image.replace(/^\//, ""));
  if (!existsSync(diskPath)) fail(`图片文件不存在：${breed.slug} -> ${breed.image}`);

  const records = photoLibrary.filter((asset) => asset.breedSlug === breed.slug);
  if (records.length !== 1) {
    fail(`图库记录数量错误：${breed.slug} -> ${records.length}`);
    continue;
  }
  const asset = records[0];
  if (asset.path !== breed.image) fail(`图库路径不一致：${breed.slug}`);
  if (asset.identityVerified !== true) fail(`未核验品种身份：${breed.slug}`);
  if (asset.licenseVerified !== true) fail(`未核验商用许可：${breed.slug}`);
  if (asset.adminOnlyAttribution !== true) fail(`来源信息未标记为仅管理员可见：${breed.slug}`);
  if (!asset.sourceUrl || !asset.license || !asset.author) fail(`授权信息不完整：${breed.slug}`);
  if (existsSync(diskPath)) {
    const hash = createHash("sha256").update(readFileSync(diskPath)).digest("hex");
    if (asset.contentHash !== hash) fail(`文件哈希不一致：${breed.slug}`);
  }
}

for (const [path, owners] of pathOwners) {
  if (owners.length > 1) fail(`品种主图路径重复：${path} -> ${owners.join(", ")}`);
}

const hashOwners = new Map();
for (const breed of breeds) {
  const diskPath = resolve(root, "public", breed.image.replace(/^\//, ""));
  if (!existsSync(diskPath)) continue;
  const hash = createHash("sha256").update(readFileSync(diskPath)).digest("hex");
  const owners = hashOwners.get(hash) ?? [];
  owners.push(breed.slug);
  hashOwners.set(hash, owners);
}
for (const owners of hashOwners.values()) {
  if (owners.length > 1) fail(`品种主图文件重复：${owners.join(", ")}`);
}

for (const file of ["news.ts", "products.ts", "services.ts", "homepage.ts"]) {
  const source = readFileSync(resolve(root, "src/data", file), "utf8");
  const paths = [...source.matchAll(/"(\/assets\/pets\/[^"]+\.(?:jpg|png|webp))"/g)].map((match) => match[1]);
  for (const path of new Set(paths)) {
    if (!existsSync(resolve(root, "public", path.replace(/^\//, "")))) {
      fail(`${file} 引用了不存在的图片：${path}`);
    }
  }
}

if (errors.length) {
  console.error(`内容校验失败（${errors.length} 项）：`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`内容校验通过：${breeds.length} 个品种，${pathOwners.size} 张独立主图。`);
