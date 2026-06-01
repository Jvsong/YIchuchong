export type ImageCategory =
  | "hero"
  | "dogs"
  | "cats"
  | "small-pets"
  | "lifestyle"
  | "device-scenes"
  | "service-scenes"
  | "tracker"
  | "devices"
  | "ai-care"
  | "breeds"
  | "news"
  | "gamification"
  | "services"
  | "about"
  | "article-covers"
  | "breed-covers";

export type PhotoAsset = {
  id: string;
  fileName: string;
  filePath?: string;
  path: string;
  title?: string;
  category: ImageCategory;
  petType?: string;
  species: string;
  breedName?: string;
  breed: string;
  scene: string;
  usage: string;
  source: string;
  author: string;
  license: string;
  sourceUrl: string;
  pageUsage?: (string | { page: string; role: string; priority: number })[];
  checkedAt?: string;
  checkDate?: string;
  notes: string;
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  publishDate: string;
  date: string;
  readTime: string;
  coverImage: string;
  image: string;
  relatedProductIds: string[];
  relatedServiceIds: string[];
  status: "已发布" | "草稿";
};

export type Breed = {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  species: "dog" | "cat" | "small-pet";
  size: string;
  temperament: string;
  careLevel: string;
  activityLevel: string;
  activity: string;
  summary: string;
  suitablePeople: string;
  dailyExercise: string;
  feedingTips: string;
  healthRisks: string;
  deviceSuggestion: string;
  coverImage: string;
  image: string;
  tags: string[];
};

export type FunFact = {
  id: string;
  category: string;
  type: string;
  title: string;
  body: string;
  pageScope: string[];
  priority: number;
  relatedLink: string;
  enabled: boolean;
  status: "启用" | "停用";
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  statusLabel: "核心产品" | "生态规划" | "即将接入" | "未来能力";
  status: "核心产品" | "生态规划" | "即将接入" | "未来能力";
  summary: string;
  description: string;
  features: string[];
  scenarios: string[];
  futureIntegrations: string[];
  coverImage: string;
  image: string;
  gallery: string[];
  isCore: boolean;
  relatedServices: string[];
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: string;
  statusLabel: "展示中" | "生态规划" | "未来能力";
  status: "展示中" | "生态规划" | "未来能力";
  summary: string;
  description: string;
  processSteps: string[];
  safetyRules: string[];
  requiredInfo: string[];
  points: string[];
  coverImage: string;
  image: string;
  relatedProducts: string[];
};

export type HomeConfig = {
  heroTitle: string;
  heroSubtitle: string;
  primaryAction: string;
  secondaryAction: string;
};

export type NavigationItem = {
  href: string;
  label: string;
};

export type GamificationTask = {
  id: string;
  title: string;
  category: string;
  points: number;
  summary: string;
  linkedData: string;
  status: "今日推荐" | "可完成" | "未来联动";
};

export type Badge = {
  id: string;
  name: string;
  requirement: string;
  level: "基础" | "进阶" | "稀有";
};

export type ExplorationSpot = {
  id: string;
  name: string;
  scene: string;
  unlockRule: string;
};

export type RankingUser = {
  id: string;
  name: string;
  petName: string;
  score: number;
  streak: number;
};

export type GamificationConfig = {
  modules: { title: string; value: string; text: string }[];
  tasks: GamificationTask[];
  badges: Badge[];
  explorationSpots: ExplorationSpot[];
  rankings: RankingUser[];
  growthRules: string[];
};

export type AiCareInput = {
  petType: "狗狗" | "猫咪" | "小宠";
  breed: string;
  age: "幼年" | "成年" | "老年";
  size: "小型" | "中型" | "中大型";
  weight?: string;
  activityLevel?: "偏低" | "适中" | "较高";
  health: "健康" | "轻微超重" | "术后恢复" | "关节敏感";
  healthNote?: string;
  weather: "晴朗" | "炎热" | "小雨" | "寒冷";
  time: "15分钟" | "30分钟" | "45分钟" | "60分钟";
  hasTracker: "已佩戴" | "未佩戴";
  locationScenario?: "日常遛狗" | "室内陪伴" | "旅行" | "寄养" | "生病恢复期" | "居家" | "户外";
  userQuestion?: string;
};

export type AiCareAdvice = {
  minutes: number;
  times: number;
  intensity: string;
  notes: string;
  device: string;
  task: string;
  safety: string;
  dailyAdvice?: string;
  exerciseAdvice?: string;
  dietAdvice?: string;
  healthReminder?: string;
  trackerAdvice?: string;
  cautions?: string[];
  source?: "deepseek" | "local";
};

export type AiCareRules = {
  dogBaseMinutes: Record<string, number>;
  catBaseMinutes: Record<string, number>;
  ageAdjustments: Record<string, number>;
  healthAdjustments: Record<string, { delta: number; note: string }>;
  weatherAdjustments: Record<string, { delta: number; note: string }>;
  trackerTips: Record<string, string>;
  serviceTips: Record<string, string>;
};
