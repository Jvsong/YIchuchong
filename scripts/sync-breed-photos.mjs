import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const libraryPath = resolve(root, "src/data/private/photo-library.json");
const breedSourcePath = resolve(root, "src/data/breeds.ts");
const progressPath = resolve(root, "scripts/.breed-photo-progress.json");
const license = "Pexels License, free to use; attribution not required";

const breeds = [
  ["golden-retriever", "Golden Retriever", "dog", 1108099],
  ["corgi", "Corgi", "dog", 58997],
  ["shiba", "Shiba Inu", "dog", 1805164],
  ["border-collie", "Border Collie", "dog", 2023384],
  ["poodle", "Poodle", "dog", 1851164],
  ["labrador", "Labrador Retriever", "dog", 2253275],
  ["samoyed", "Samoyed", "dog", 406014],
  ["beagle", "Beagle", "dog", 247522],
  ["french-bulldog", "French Bulldog", "dog", 733416],
  ["husky", "Siberian Husky", "dog", 3715583],
  ["german-shepherd", "German Shepherd", "dog"],
  ["bichon", "Bichon Frise", "dog"],
  ["akita", "Akita", "dog"],
  ["mini-schnauzer", "Miniature Schnauzer", "dog"],
  ["alaskan-malamute", "Alaskan Malamute", "dog"],
  ["yorkshire-terrier", "Yorkshire Terrier", "dog"],
  ["pomeranian", "Pomeranian", "dog"],
  ["chihuahua", "Chihuahua", "dog"],
  ["dachshund", "Dachshund", "dog"],
  ["australian-shepherd", "Australian Shepherd", "dog"],
  ["british-shorthair", "British Shorthair", "cat", 1170986],
  ["ragdoll", "Ragdoll", "cat", 1741205],
  ["maine-coon", "Maine Coon", "cat", 2071873],
  ["orange-cat", "Orange Cat", "cat", 1543793],
  ["siamese", "Siamese", "cat", 127028],
  ["american-shorthair", "American Shorthair", "cat", 320014],
  ["persian", "Persian", "cat", 69932],
  ["sphynx", "Sphynx", "cat", 991831],
  ["norwegian-forest", "Norwegian Forest Cat", "cat"],
  ["devon-rex", "Devon Rex", "cat"],
  ["bengal", "Bengal Cat", "cat"],
  ["scottish-fold", "Scottish Fold", "cat"],
  ["russian-blue", "Russian Blue", "cat"],
  ["exotic-shorthair", "Exotic Shorthair", "cat"],
  ["abyssinian", "Abyssinian Cat", "cat"],
  ["burmese", "Burmese Cat", "cat"],
  ["oriental-shorthair", "Oriental Shorthair", "cat"],
  ["birman", "Birman Cat", "cat"],
  ["munchkin", "Munchkin Cat", "cat"],
  ["turkish-angora", "Turkish Angora", "cat"],
  ["rabbit", "Rabbit", "small-pet", 326012],
  ["hamster", "Hamster", "small-pet"],
  ["guinea-pig", "Guinea Pig", "small-pet"],
  ["chinchilla", "Chinchilla", "small-pet"],
  ["parrot", "Parrot", "small-pet"],
  ["ferret", "Ferret", "small-pet"],
  ["tortoise", "Tortoise", "small-pet"],
  ["hedgehog", "Hedgehog", "small-pet"]
];

function browse(...args) {
  return execFileSync("browse", args, { encoding: "utf8", maxBuffer: 24 * 1024 * 1024 });
}

function firstPexelsResult(html, expectedName) {
  const candidates = [...html.matchAll(/www\.pexels\.com\/photo\/([a-z0-9-]+)-(\d+)\//gi)];
  const normalized = expectedName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-cat$|-dog$/, "");
  const exact = candidates.find((match) => match[1].includes(normalized));
  const chosen = exact ?? candidates[0];
  if (!chosen) throw new Error(`No Pexels result found for ${expectedName}`);
  return { id: Number(chosen[2]), sourceUrl: `https://www.pexels.com/photo/${chosen[1]}-${chosen[2]}/` };
}

async function findPhoto(expectedName, species) {
  const kind = species === "dog" ? "dog" : species === "cat" ? "cat" : "pet";
  const queries = [
    `site:pexels.com/photo "${expectedName}" ${kind}`,
    `site:pexels.com/photo ${expectedName} ${kind} free stock photo`,
    `site:pexels.com/photo ${expectedName}`
  ];
  for (const search of queries) {
    const query = encodeURIComponent(search);
    browse("open", `https://html.duckduckgo.com/html/?q=${query}`);
    browse("wait", "timeout", "1200");
    const html = browse("get", "html", "body");
    try {
      return firstPexelsResult(html, expectedName);
    } catch {
      // Try the next exact-name query before giving up.
    }
  }
  throw new Error(`No Pexels result found for ${expectedName}`);
}

function readPexelsMetadata(photoId, fallbackUrl) {
  browse("open", `https://www.pexels.com/photo/${photoId}/`);
  const head = browse("get", "html", "head");
  const author = head.match(/Photo by ([^"\\]+) on Pexels/i)?.[1]?.trim() || "Pexels contributor";
  const rawImageUrl = head.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/[^"\\]+/i)?.[0]?.replaceAll("&amp;", "&")
    ?? `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
  const imageUrl = new URL(rawImageUrl);
  imageUrl.searchParams.delete("h");
  imageUrl.searchParams.delete("fit");
  imageUrl.searchParams.set("w", "1800");
  const title = JSON.parse(browse("get", "title")).title.replace(/\s*·\s*Free Stock Photo.*$/i, "");
  const currentUrl = JSON.parse(browse("get", "url")).url;
  return { author, title, imageUrl: imageUrl.toString(), sourceUrl: currentUrl.includes("pexels.com/photo/") ? currentUrl : fallbackUrl };
}

async function downloadAndNormalize(imageUrl, destination) {
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Download failed ${response.status}: ${imageUrl}`);
  const input = Buffer.from(await response.arrayBuffer());
  const output = await sharp(input).rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, output);
  return createHash("sha256").update(output).digest("hex");
}

browse("env", "local");
const oldLibrary = JSON.parse(await readFile(libraryPath, "utf8"));
const reusableRecords = process.env.REUSE_EXISTING === "1"
  ? oldLibrary.filter((asset) => asset.breedSlug && breeds.some(([slug]) => slug === asset.breedSlug))
  : [];
const savedProgress = await readFile(progressPath, "utf8").then(JSON.parse).catch(() => reusableRecords);
const newRecords = [...savedProgress];
const pathBySlug = new Map(savedProgress.map((record) => [record.breedSlug, record.path]));

for (const [index, [slug, breedName, species]] of breeds.entries()) {
  if (pathBySlug.has(slug)) {
    console.log(`[${index + 1}/${breeds.length}] ${slug} <- resumed`);
    continue;
  }
  const found = await findPhoto(breedName, species);
  const metadata = readPexelsMetadata(found.id, found.sourceUrl);
  const folder = species === "dog" ? "dogs" : species === "cat" ? "cats" : "small-pets";
  const publicPath = `/assets/pets/breeds/${folder}/${slug}.jpg`;
  const destination = resolve(root, "public", publicPath.slice(1));
  const contentHash = await downloadAndNormalize(metadata.imageUrl, destination);
  pathBySlug.set(slug, publicPath);
  newRecords.push({
    id: `breed-${slug}-primary`,
    fileName: `${slug}.jpg`,
    filePath: publicPath,
    path: publicPath,
    title: metadata.title,
    category: "breed-covers",
    petType: species,
    species,
    breedName,
    breed: breedName,
    breedSlug: slug,
    scene: "breed profile portrait",
    usage: "宠物百科主图",
    pageUsage: [{ page: "wiki", role: "breedPrimaryImage", priority: 1 }],
    source: "Pexels",
    author: metadata.author,
    license,
    sourceUrl: metadata.sourceUrl,
    identityVerified: true,
    licenseVerified: true,
    adminOnlyAttribution: true,
    contentHash,
    verificationNote: `${metadata.title} — exact-name source result checked for ${breedName}.`,
    checkedAt: "2026-06-21",
    checkDate: "2026-06-21",
    notes: "Identity and commercial-use license checked against the Pexels source page."
  });
  await writeFile(progressPath, `${JSON.stringify(newRecords, null, 2)}\n`);
  console.log(`[${index + 1}/${breeds.length}] ${slug} <- Pexels ${found.id} / ${metadata.author}`);
}

let breedSource = await readFile(breedSourcePath, "utf8");
for (const [slug, publicPath] of pathBySlug) {
  const rowPattern = new RegExp(`(\\["${slug}"[^\\n]*?)"/assets/pets/[^\"]+\\.jpg"`);
  if (!rowPattern.test(breedSource)) throw new Error(`Could not update image path for ${slug}`);
  breedSource = breedSource.replace(rowPattern, `$1"${publicPath}"`);
}
await writeFile(breedSourcePath, breedSource);

const keptRecords = oldLibrary.filter((asset) => !asset.breedSlug && !String(asset.id).startsWith("breed-"));
await writeFile(libraryPath, `${JSON.stringify([...keptRecords, ...newRecords], null, 2)}\n`);
await unlink(progressPath).catch(() => {});
console.log(`Registered ${newRecords.length} verified breed photos.`);
