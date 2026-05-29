export type ImageCategory =
  | "dogs"
  | "cats"
  | "small-pets"
  | "lifestyle"
  | "device-scenes"
  | "service-scenes";

export type PhotoAsset = {
  id: string;
  fileName: string;
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
  image: string;
};

export type FunFact = {
  id: string;
  type: string;
  title: string;
  body: string;
};

export type Product = {
  id: string;
  name: string;
  status: "核心产品" | "生态规划" | "即将接入" | "未来能力";
  summary: string;
  features: string[];
  image: string;
};

export type Service = {
  id: string;
  name: string;
  summary: string;
  points: string[];
  image: string;
};
