import type { HomeConfig } from "./types";

export const homeConfig: HomeConfig = {
  heroTitle: "让每一次外出，都安心可见",
  heroSubtitle: "从实时定位、电子围栏、历史轨迹，到智能设备与科学养宠建议，易趣宠让宠物安全与日常照护更简单。",
  primaryAction: "了解定位器",
  secondaryAction: "查看智能设备"
};

export const heroImages = [
  "/assets/pets/hero/hero-pet-owner-dog-001.jpg",
  "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
  "/assets/pets/hero/hero-cat-smart-home-001.jpg"
];

export const pageHeroImages = {
  home: "/assets/pets/hero/hero-pet-owner-dog-001.jpg",
  locator: "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
  devices: "/assets/pets/device-scenes/device-smart-home-001.jpg",
  aiCare: "/assets/pets/lifestyle/pet-owner-phone-001.jpg",
  wiki: "/assets/pets/lifestyle/pet-family-bright-001.jpg",
  news: "/assets/pets/lifestyle/pet-couch-calm-001.jpg",
  fun: "/assets/pets/dogs/dog-run-sunlight-001.jpg",
  boarding: "/assets/pets/service-scenes/service-boarding-room-001.jpg",
  walking: "/assets/pets/service-scenes/service-dog-walking-001.jpg",
  partners: "/assets/pets/service-scenes/service-store-front-001.jpg",
  about: "/assets/pets/hero/hero-family-pet-001.jpg"
};

export const ecoCategories = [
  { title: "宠物安全", text: "定位、围栏、低电量、丢宠协寻与家庭共享。", icon: "Shield", href: "/locator", image: "/assets/pets/hero/hero-dog-safety-walk-001.jpg" },
  { title: "智能设备", text: "从定位器扩展到喂养、饮水、看护与寄养监控。", icon: "Cpu", href: "/devices", image: "/assets/pets/device-scenes/device-feeder-home-001.jpg" },
  { title: "养宠建议", text: "根据宠物状态、天气和时间生成当天建议。", icon: "Sparkles", href: "/ai-care", image: "/assets/pets/lifestyle/pet-owner-phone-001.jpg" },
  { title: "宠物内容", text: "百科、资讯、新手指南和智能设备科普。", icon: "BookOpen", href: "/wiki", image: "/assets/pets/lifestyle/pet-couch-calm-001.jpg" },
  { title: "趣味互动", text: "任务、成长值、徽章、城市探索和打卡。", icon: "Medal", href: "/fun", image: "/assets/pets/dogs/dog-run-sunlight-001.jpg" },
  { title: "宠物服务", text: "寄养、代溜、门店合作与服务记录管理。", icon: "Store", href: "/boarding", image: "/assets/pets/service-scenes/service-owner-handoff-001.jpg" }
];

export const collectionCards = [
  { title: "定位安全", text: "定位器、围栏、轨迹与低电量提醒。", href: "/locator", image: "/assets/pets/device-scenes/device-tracker-collar-001.jpg" },
  { title: "智能喂养", text: "定时计划、余粮提醒与喂养记录规划。", href: "/devices", image: "/assets/pets/device-scenes/device-feeder-home-001.jpg" },
  { title: "智能饮水", text: "饮水趋势、水量提醒与滤芯维护。", href: "/devices", image: "/assets/pets/device-scenes/device-fountain-001.jpg" },
  { title: "远程看护", text: "宠物监控、寄养看护与家庭共享。", href: "/devices", image: "/assets/pets/device-scenes/device-camera-home-001.jpg" },
  { title: "养宠内容", text: "百科、资讯和日常照护知识。", href: "/wiki", image: "/assets/pets/lifestyle/pet-couch-calm-001.jpg" },
  { title: "生态服务", text: "寄养、代溜、合作与安全档案。", href: "/boarding", image: "/assets/pets/service-scenes/service-owner-handoff-001.jpg" }
];

export const smartEcosystem = [
  { title: "定位器", text: "实时位置、轨迹、电子围栏与低电量提醒", href: "/locator" },
  { title: "智能设备", text: "出粮机、监控器、饮水机与居家看护联动", href: "/devices" },
  { title: "建议助手", text: "运动、喂养、健康风险和任务建议", href: "/ai-care" },
  { title: "内容平台", text: "百科、资讯、科普和新手养宠指南", href: "/wiki" },
  { title: "宠物服务", text: "寄养、代溜、门店合作与安全档案", href: "/boarding" }
];
