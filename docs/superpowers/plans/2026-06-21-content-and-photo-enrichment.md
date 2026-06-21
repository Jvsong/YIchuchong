# Content and Photo Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrich the public content across Yiquchong and give all 48 pet profiles an accurate, independently licensed photo whose source metadata is visible only to administrators.

**Architecture:** Keep public content in the existing typed modules under `src/data`, while treating `public/assets/pets/photo-library.json` as the private administrative asset manifest. Add a deterministic validation script that joins breed data to the manifest by `breedSlug`, checks files and hashes, and fails on identity, license, path, or duplicate errors. Public pages continue to receive only local image paths.

**Tech Stack:** Next.js 14, React 18, TypeScript, Node.js validation scripts, local raster assets, existing JSON-backed admin system.

---

## File Map

- Modify `src/data/types.ts`: add richer breed fields and verified photo metadata fields.
- Modify `src/data/breeds.ts`: enrich all 48 profiles and replace every incorrect image mapping.
- Modify `src/data/news.ts`: remove cyclic covers and expand article bodies with explicit image mapping.
- Modify `src/data/products.ts`: enrich product benefits, scenarios, maintenance, and gallery mapping.
- Modify `src/data/services.ts`: enrich service workflows, safeguards, and required information.
- Modify `src/data/homepage.ts`: align homepage text and image references with the enriched records.
- Modify `src/app/wiki/[slug]/page.tsx`: render new care, environment, and safety information.
- Modify `src/components/admin/RecordManager.tsx`: label verification and licensing fields clearly.
- Modify `public/assets/pets/photo-library.json`: register verified photo metadata.
- Create `public/assets/pets/breeds/{dogs,cats,small-pets}/`: store one independent primary photo per profile.
- Create `scripts/validate-content.mjs`: verify content/image integrity and duplicate hashes.
- Modify `package.json`: add `validate:content` and include it in release verification.

## Task 1: Establish the Content Validation Baseline

**Files:**
- Modify: `src/data/types.ts`
- Create: `scripts/validate-content.mjs`
- Modify: `package.json`

- [ ] **Step 1: Extend the asset and breed types**

Add the following optional fields to `PhotoAsset` so legacy records remain readable while newly sourced breed photos are fully auditable:

```ts
breedSlug?: string;
identityVerified?: boolean;
licenseVerified?: boolean;
adminOnlyAttribution?: boolean;
contentHash?: string;
verificationNote?: string;
```

Add the following required localized fields to `Breed`:

```ts
lifespan: LocalizedText;
groomingNeeds: LocalizedText;
environmentNeeds: LocalizedText;
safetyTips: LocalizedText;
```

- [ ] **Step 2: Add a failing content validation command**

Create `scripts/validate-content.mjs` to load the 48 breed slugs and image paths from `src/data/breeds.ts`, load `photo-library.json`, and verify:

```js
const requiredSlugs = [
  "golden-retriever", "corgi", "shiba", "border-collie", "poodle", "labrador",
  "samoyed", "beagle", "french-bulldog", "husky", "german-shepherd", "bichon",
  "akita", "mini-schnauzer", "alaskan-malamute", "yorkshire-terrier", "pomeranian",
  "chihuahua", "dachshund", "australian-shepherd", "british-shorthair", "ragdoll",
  "maine-coon", "orange-cat", "siamese", "american-shorthair", "persian", "sphynx",
  "norwegian-forest", "devon-rex", "bengal", "scottish-fold", "russian-blue",
  "exotic-shorthair", "abyssinian", "burmese", "oriental-shorthair", "birman",
  "singapura", "turkish-angora", "rabbit", "hamster", "guinea-pig", "chinchilla",
  "parrot", "ferret", "tortoise", "hedgehog"
];
```

The script must fail when a required slug is missing, a referenced file does not exist, `identityVerified` or `licenseVerified` is not `true`, two breed photos share a path or SHA-256 hash, or a required Chinese/English content field is blank.

- [ ] **Step 3: Register the command**

Add to `package.json`:

```json
"validate:content": "node scripts/validate-content.mjs"
```

- [ ] **Step 4: Run the baseline and confirm it fails for the current repeated mappings**

Run: `npm run validate:content`

Expected: non-zero exit with the affected breed slugs and repeated image paths listed.

## Task 2: Source and Register 48 Accurate Breed Photos

**Files:**
- Create: `public/assets/pets/breeds/dogs/*.jpg`
- Create: `public/assets/pets/breeds/cats/*.jpg`
- Create: `public/assets/pets/breeds/small-pets/*.jpg`
- Modify: `public/assets/pets/photo-library.json`
- Modify: `src/data/breeds.ts`

- [ ] **Step 1: Source dog photos for the 20 dog slugs**

Search Pexels, Unsplash, then Pixabay using the exact English breed name. Accept only an image whose source title, description, or category confirms the breed and whose license permits commercial use without mandatory public attribution. Store each image as `public/assets/pets/breeds/dogs/<slug>.jpg`.

- [ ] **Step 2: Source cat photos for the 20 cat slugs**

Use the same process and store each image as `public/assets/pets/breeds/cats/<slug>.jpg`. For `orange-cat`, confirm orange coat rather than a pedigree; document that distinction in `verificationNote`.

- [ ] **Step 3: Source small-pet photos for the 8 small-pet slugs**

Source rabbit, hamster, guinea pig, chinchilla, parrot, ferret, tortoise, and hedgehog images and store them as `public/assets/pets/breeds/small-pets/<slug>.jpg`.

- [ ] **Step 4: Normalize image files**

Use Sharp to auto-orient, resize to a maximum of 1800 px on the long edge, encode JPEG at quality 84, and strip embedded metadata. Keep the visual crop loose enough for both 4:3 cards and detail-page banners.

- [ ] **Step 5: Register every image in the private manifest**

For every new image, record:

```json
{
  "id": "breed-<slug>-primary",
  "fileName": "<slug>.jpg",
  "path": "/assets/pets/breeds/<species-folder>/<slug>.jpg",
  "category": "breed-covers",
  "species": "dog | cat | small-pet",
  "breed": "Exact English breed or animal name",
  "breedName": "Exact English breed or animal name",
  "breedSlug": "<slug>",
  "scene": "breed profile portrait",
  "usage": "宠物百科主图",
  "source": "Pexels | Unsplash | Pixabay | Public Domain",
  "author": "Source photographer or creator",
  "license": "Exact commercial-use license name",
  "sourceUrl": "Canonical source page URL",
  "identityVerified": true,
  "licenseVerified": true,
  "adminOnlyAttribution": true,
  "contentHash": "SHA-256 generated from the normalized file",
  "checkedAt": "2026-06-21",
  "notes": "Identity and commercial-use license checked against the source page."
}
```

- [ ] **Step 6: Replace all breed image paths**

Update each row in `src/data/breeds.ts` to reference its own `/assets/pets/breeds/.../<slug>.jpg` path. No two rows may share a path.

- [ ] **Step 7: Run image validation**

Run: `npm run validate:content`

Expected: image existence, path uniqueness, identity verification, license verification, and hash uniqueness checks pass; richer breed fields may still be reported until Task 3.

## Task 3: Enrich All 48 Breed Profiles

**Files:**
- Modify: `src/data/breeds.ts`
- Modify: `src/app/wiki/[slug]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add complete bilingual care information**

For each of the 48 profiles, add non-empty Chinese and English values for lifespan, grooming needs, environment needs, and safety tips. Keep advice practical and avoid diagnosis or guaranteed health claims.

- [ ] **Step 2: Strengthen existing summaries**

Ensure each profile has distinct temperament, suitable owner, exercise, feeding, health-risk, and device recommendation text. Remove generic sentences that could apply unchanged to unrelated species.

- [ ] **Step 3: Render the new fields on the breed detail page**

Add four labelled information blocks after the existing profile facts:

```tsx
[
  ["预期寿命", breed.lifespan],
  ["日常护理", breed.groomingNeeds],
  ["环境需求", breed.environmentNeeds],
  ["安全提醒", breed.safetyTips]
]
```

Use the active locale through the existing `pick` helper and preserve the current mint theme.

- [ ] **Step 4: Verify representative profiles visually**

Inspect one dog, one cat, one small pet, one long-title profile, and one mobile view. Confirm the name, photo, labels, and advice belong to the same animal.

## Task 4: Replace Cyclic News Covers and Enrich Articles

**Files:**
- Modify: `src/data/news.ts`
- Modify: `public/assets/pets/photo-library.json`
- Create or reuse: `public/assets/pets/news/*.jpg`

- [ ] **Step 1: Remove index-based cover selection**

Delete `covers[index % covers.length]`. Give every topic an explicit `coverImage` selected for its subject: loss prevention, nutrition, hydration, health observation, smart devices, boarding, walking, or beginner care.

- [ ] **Step 2: Expand each article**

Give every article a useful multi-paragraph Chinese and English body with a clear opening, three actionable points, a risk or limitation note, and a closing recommendation. Keep medical content educational and include a veterinary-care disclaimer where needed.

- [ ] **Step 3: Align related records**

Check `relatedProductIds` and `relatedServiceIds` against actual IDs and remove unrelated recommendations.

- [ ] **Step 4: Register any new news images**

Add the same source, author, license, URL, verification, hash, date, and admin-only fields to the private manifest.

## Task 5: Enrich Product, Service, and Homepage Content

**Files:**
- Modify: `src/data/products.ts`
- Modify: `src/data/services.ts`
- Modify: `src/data/homepage.ts`

- [ ] **Step 1: Expand all eight product records**

Ensure each product has a distinct summary and description, 3–5 concrete features, 3 practical scenarios, maintenance or limitation guidance in the description, 2–3 relevant future integrations, and a gallery whose images match the product category.

- [ ] **Step 2: Expand all six service records**

Ensure each service contains at least 4 process steps, 4 safety rules, 3 required information items, and 4 customer-facing value points. Do not imply that payment, insurance, identity verification, or dispatch capabilities are live unless the existing status says so.

- [ ] **Step 3: Align homepage content**

Update hero, ecosystem cards, collection cards, and story copy so they use the same terms and images as the enriched product and service records. Remove duplicate card text and keep calls to action routed to an existing page.

- [ ] **Step 4: Validate cross-links**

Run `npm run validate:content` and confirm all product/service IDs, image paths, and homepage links resolve.

## Task 6: Keep Source Metadata Administrator-Only

**Files:**
- Modify: `src/components/admin/RecordManager.tsx`
- Inspect: `src/app/api/admin/data/[type]/route.ts`
- Inspect: `src/services/photoService.ts`

- [ ] **Step 1: Add administrator-friendly field labels**

Add labels for `breedSlug`, `identityVerified`, `licenseVerified`, `adminOnlyAttribution`, `contentHash`, `verificationNote`, `source`, `author`, `license`, `sourceUrl`, and `checkedAt`.

- [ ] **Step 2: Verify access boundaries**

Confirm the photo manifest is only returned through authenticated admin data paths and is never embedded in public page props, client bundles, metadata, or public API responses. The local image files remain public, but source records do not.

- [ ] **Step 3: Verify admin presentation**

Open the image library as an authenticated administrator and confirm source, author, license, source URL, breed identity, and verification status are readable.

- [ ] **Step 4: Verify public presentation**

Search rendered HTML and client data for `sourceUrl`, photographer names, and license strings. Expected: none appear on public pages.

## Task 7: Final Content and Visual Verification

**Files:**
- Verify all modified files and new assets.

- [ ] **Step 1: Run content validation**

Run: `npm run validate:content`

Expected: all checks pass with 48 verified, unique breed images.

- [ ] **Step 2: Run static checks**

Run: `npm run lint && npx tsc --noEmit && git diff --check`

Expected: zero warnings, type errors, or whitespace errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: Next.js production build completes successfully.

- [ ] **Step 4: Perform browser checks**

Check `/`, `/wiki`, five representative `/wiki/<slug>` routes, `/news`, two `/news/<id>` routes, `/devices`, `/locator`, `/boarding`, `/walking`, and `/admin` at 1440 px and 390 px widths. Confirm correct subject-photo pairing, readable cropping, no broken images, no horizontal overflow, and no public attribution metadata.

- [ ] **Step 5: Review the final diff**

Confirm only content, approved image assets, validation tooling, breed-detail presentation, and admin metadata labels changed. Preserve unrelated user work and the current color theme.
