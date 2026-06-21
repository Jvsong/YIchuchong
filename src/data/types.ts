import type { LocalizedText } from "@/i18n/index";
import type { BadgeLevel, NewsStatus, ProductStatus, ServiceStatus, TaskStatus } from "@/i18n/enums";

export type { LocalizedText } from "@/i18n/index";

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
  breedSlug?: string;
  identityVerified?: boolean;
  licenseVerified?: boolean;
  adminOnlyAttribution?: boolean;
  contentHash?: string;
  verificationNote?: string;
  notes: string;
};

export type NewsItem = {
  id: string;
  title: LocalizedText;
  category: string;
  summary: LocalizedText;
  content: LocalizedText;
  tags: string[];
  sourceName: LocalizedText;
  sourceUrl: string;
  publishDate: string;
  date: string;
  readTime: LocalizedText;
  coverImage: string;
  image: string;
  relatedProductIds: string[];
  relatedServiceIds: string[];
  status: NewsStatus;
};

export type Breed = {
  id: string;
  slug: string;
  name: LocalizedText;
  englishName: string;
  species: "dog" | "cat" | "small-pet";
  size: string;
  temperament: LocalizedText;
  careLevel: string;
  activityLevel: string;
  activity: string;
  summary: LocalizedText;
  suitablePeople: LocalizedText;
  dailyExercise: LocalizedText;
  feedingTips: LocalizedText;
  healthRisks: LocalizedText;
  deviceSuggestion: LocalizedText;
  lifespan: LocalizedText;
  groomingNeeds: LocalizedText;
  environmentNeeds: LocalizedText;
  safetyTips: LocalizedText;
  coverImage: string;
  image: string;
  tags: string[];
};

export type FunFact = {
  id: string;
  category: string;
  type: string;
  title: LocalizedText;
  body: LocalizedText;
  pageScope: string[];
  priority: number;
  relatedLink: string;
  enabled: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: LocalizedText;
  category: string;
  status: ProductStatus;
  summary: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
  scenarios: LocalizedText[];
  futureIntegrations: LocalizedText[];
  coverImage: string;
  image: string;
  gallery: string[];
  isCore: boolean;
  relatedServices: string[];
};

export type Service = {
  id: string;
  slug: string;
  name: LocalizedText;
  category: string;
  status: ServiceStatus;
  summary: LocalizedText;
  description: LocalizedText;
  processSteps: LocalizedText[];
  safetyRules: LocalizedText[];
  requiredInfo: LocalizedText[];
  points: LocalizedText[];
  coverImage: string;
  image: string;
  relatedProducts: string[];
};

export type HomeConfig = {
  heroTitle: LocalizedText;
  heroSubtitle: LocalizedText;
  primaryAction: LocalizedText;
  secondaryAction: LocalizedText;
};

export type NavigationItem = {
  href: string;
  label: LocalizedText;
};

export type GamificationTask = {
  id: string;
  title: LocalizedText;
  category: string;
  points: number;
  summary: LocalizedText;
  linkedData: string;
  status: TaskStatus;
};

export type Badge = {
  id: string;
  name: LocalizedText;
  requirement: LocalizedText;
  level: BadgeLevel;
};

export type ExplorationSpot = {
  id: string;
  name: LocalizedText;
  scene: LocalizedText;
  unlockRule: LocalizedText;
};

export type RankingUser = {
  id: string;
  name: string;
  petName: string;
  score: number;
  streak: number;
};

export type GamificationConfig = {
  modules: { title: LocalizedText; value: string; text: LocalizedText }[];
  tasks: GamificationTask[];
  badges: Badge[];
  explorationSpots: ExplorationSpot[];
  rankings: RankingUser[];
  growthRules: LocalizedText[];
};

export type PetType = "dog" | "cat" | "small";
export type PetAge = "puppy" | "adult" | "senior";
export type PetSize = "small" | "medium" | "large";
export type PetActivity = "low" | "medium" | "high";
export type PetHealth = "healthy" | "overweight" | "recovery" | "joint";
export type Weather = "clear" | "hot" | "rain" | "cold";
export type AvailableTime = "15" | "30" | "45" | "60";
export type TrackerState = "yes" | "no";
export type CareScenario = "walk" | "indoor" | "travel" | "boarding" | "recovery" | "home" | "outdoor";

export type AiCareInput = {
  petType: PetType;
  breed: string;
  age: PetAge;
  size: PetSize;
  weight?: string;
  activityLevel?: PetActivity;
  health: PetHealth;
  healthNote?: string;
  weather: Weather;
  time: AvailableTime;
  hasTracker: TrackerState;
  locationScenario?: CareScenario;
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
