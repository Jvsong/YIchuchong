import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifestPath = resolve(root, "src/data/private/photo-library.json");
const assets = JSON.parse(readFileSync(manifestPath, "utf8"));
const hashGroups = new Map();

for (const asset of assets) {
  const file = resolve(root, "public", asset.path.replace(/^\//, ""));
  if (!existsSync(file)) continue;
  const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
  asset.contentHash = hash;
  const group = hashGroups.get(hash) ?? [];
  group.push(asset);
  hashGroups.set(hash, group);
}

const replacements = new Map();
const removedIds = new Set();
for (const group of hashGroups.values()) {
  if (group.length < 2) continue;
  const canonical = group[0];
  for (const duplicate of group.slice(1)) {
    replacements.set(duplicate.path, canonical.path);
    removedIds.add(duplicate.id);
  }
}

function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

const contentFiles = [
  ...filesUnder(resolve(root, "src")).filter((file) => [".ts", ".tsx", ".json"].includes(extname(file))),
  ...filesUnder(resolve(root, "storage")).filter((file) => extname(file) === ".json")
];

for (const file of contentFiles) {
  let content = readFileSync(file, "utf8");
  let changed = false;
  for (const [duplicate, canonical] of replacements) {
    if (!content.includes(duplicate)) continue;
    content = content.replaceAll(duplicate, canonical);
    changed = true;
  }
  if (changed) writeFileSync(file, content);
}

for (const duplicate of replacements.keys()) {
  const file = resolve(root, "public", duplicate.replace(/^\//, ""));
  if (existsSync(file)) unlinkSync(file);
}

const deduped = assets.filter((asset) => !removedIds.has(asset.id));
writeFileSync(manifestPath, `${JSON.stringify(deduped, null, 2)}\n`);
console.log(`Removed ${removedIds.size} duplicate records and files; ${deduped.length} assets remain.`);
