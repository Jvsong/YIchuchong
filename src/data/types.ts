export type ImageCategory =
  | "hero"
  | "dogs"
  | "cats"
  | "small-pets"
  | "lifestyle"
  | "device-scenes"
  | "service-scenes";

export type PhotoAsset = {
  id: string;
  fileName: string;
  path: string;
  category: ImageCategory;
  species: string;
  breed: string;
  scene: string;
  usage: string;
  source: string;
  author: string;
  license: string;
  sourceUrl: string;
  notes: string;
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  content?: string;
  tags?: string[];
  sourceName?: string;
  sourceUrl?: string;
  date: string;
  readTime: string;
  image: string;
};

export type Breed = {
  slug: string;
  name: string;
  species: "dog" | "cat" | "small-pet";
  temperament: string;
  careLevel: string;
  activity: string;
  summary: string;
  suitablePeople?: string;
  feedingTips?: string;
  healthRisks?: string;
  deviceSuggestion?: string;
  image: string;
};

export type FunFact = {
  id: string;
  type: string;
  title: string;
  body: string;
  pageScope?: string;
  status?: "启用" | "停用";
};

export type Product = {
  id: string;
  name: string;
  slug?: string;
  category?: string;
  status: "核心产品" | "生态规划" | "即将接入" | "未来能力";
  summary: string;
  features: string[];
  image: string;
};

export type Service = {
  id: string;
  name: string;
  slug?: string;
  category?: string;
  status?: "展示中" | "生态规划" | "未来能力";
  summary: string;
  points: string[];
  image: string;
};

export type HomeConfig = {
  heroTitle: string;
  heroSubtitle: string;
  primaryAction: string;
  secondaryAction: string;
};
