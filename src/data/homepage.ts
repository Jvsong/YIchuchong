import type { HomeConfig } from "./types";

export const homeConfig: HomeConfig = {
  heroTitle: {
    zh: "让每一次外出，都安心可见",
    en: "Make every outing safe and visible"
  },
  heroSubtitle: {
    zh: "从实时定位、电子围栏和历史轨迹，到 48 类宠物照护百科、智能喂养、饮水观察与服务记录，易趣宠把分散的信息整理成主人真正能执行的下一步。",
    en: "From live location, geo-fences and route history to 48 pet-care profiles, smart feeding, hydration observation and service records, Epet turns scattered information into clear next steps."
  },
  primaryAction: { zh: "了解定位器", en: "Explore the tracker" },
  secondaryAction: { zh: "查看智能设备", en: "View smart devices" }
};

export const heroImages = [
  "/assets/pets/hero/hero-pet-owner-dog-001.jpg",
  "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
  "/assets/pets/hero/hero-cat-smart-home-001.jpg"
];

export const pageHeroImages = {
  home: "/assets/pets/hero/hero-pet-owner-dog-001.jpg",
  locator: "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
  devices: "/assets/pets/cats/cat-british-home-001.jpg",
  aiCare: "/assets/pets/lifestyle/pet-owner-phone-001.jpg",
  wiki: "/assets/pets/hero/hero-family-pet-001.jpg",
  news: "/assets/pets/cats/cat-ragdoll-window-001.jpg",
  fun: "/assets/pets/dogs/dog-run-sunlight-001.jpg",
  boarding: "/assets/pets/hero/hero-family-pet-001.jpg",
  walking: "/assets/pets/hero/hero-service-walking-001.jpg",
  partners: "/assets/pets/service-scenes/service-store-front-001.jpg",
  about: "/assets/pets/hero/hero-family-pet-001.jpg"
};

export const homeStoryImages = {
  story1: "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
  story2: "/assets/pets/cats/cat-british-home-001.jpg",
  story3: "/assets/pets/lifestyle/pet-owner-phone-001.jpg",
  smartHomeBg: "/assets/pets/hero/hero-cat-smart-home-001.jpg",
  locatorShowcase: "/assets/pets/hero/hero-dog-safety-walk-001.jpg"
};

export const collectionCards = [
  { title: { zh: "定位安全", en: "Location Safety" }, text: { zh: "定位器、围栏、轨迹与低电量提醒。", en: "Tracker, geo-fence, tracks and low-battery alerts." }, href: "/locator", image: "/assets/pets/device-scenes/device-tracker-collar-001.jpg" },
  { title: { zh: "智能喂养", en: "Smart Feeding" }, text: { zh: "定时计划、余粮提醒与喂养记录规划。", en: "Scheduled plans, food-level alerts and feeding logs." }, href: "/devices", image: "/assets/pets/hero/hero-cat-smart-home-001.jpg" },
  { title: { zh: "智能饮水", en: "Smart Hydration" }, text: { zh: "饮水趋势、水量提醒与滤芯维护。", en: "Hydration trends, water-level alerts and filter upkeep." }, href: "/devices", image: "/assets/pets/hero/hero-cat-smart-home-001.jpg" },
  { title: { zh: "远程看护", en: "Remote Care" }, text: { zh: "宠物监控、寄养看护与家庭共享。", en: "Pet cameras, boarding care and family sharing." }, href: "/devices", image: "/assets/pets/hero/hero-cat-smart-home-001.jpg" },
  { title: { zh: "养宠内容", en: "Pet Content" }, text: { zh: "百科、资讯和日常照护知识。", en: "Encyclopedia, news and everyday care knowledge." }, href: "/wiki", image: "/assets/pets/cats/cat-ragdoll-window-001.jpg" },
  { title: { zh: "生态服务", en: "Ecosystem Services" }, text: { zh: "寄养、代溜、合作与安全档案。", en: "Boarding, walking, partnerships and safety profiles." }, href: "/boarding", image: "/assets/pets/service-scenes/service-owner-handoff-001.jpg" }
];

export const smartEcosystem = [
  { title: { zh: "定位器", en: "Tracker" }, text: { zh: "实时位置、轨迹、电子围栏与低电量提醒", en: "Live location, tracks, geo-fence and low-battery alerts" }, href: "/locator" },
  { title: { zh: "智能设备", en: "Smart Devices" }, text: { zh: "出粮机、监控器、饮水机与居家看护联动", en: "Feeders, cameras, fountains and home-care linkage" }, href: "/devices" },
  { title: { zh: "建议助手", en: "Advice Assistant" }, text: { zh: "运动、喂养、健康风险和任务建议", en: "Exercise, feeding, health-risk and task advice" }, href: "/ai-care" },
  { title: { zh: "内容平台", en: "Content Platform" }, text: { zh: "百科、资讯、科普和新手养宠指南", en: "Encyclopedia, news, know-how and beginner guides" }, href: "/wiki" },
  { title: { zh: "宠物服务", en: "Pet Services" }, text: { zh: "寄养、代溜、门店合作与安全档案", en: "Boarding, walking, store partners and safety profiles" }, href: "/boarding" }
];
