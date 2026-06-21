import type { NavigationItem } from "./types";

export const navItems: NavigationItem[] = [
  { href: "/", label: { zh: "首页", en: "Home" } },
  { href: "/locator", label: { zh: "定位器", en: "Tracker" } },
  { href: "/devices", label: { zh: "智能设备", en: "Devices" } },
  { href: "/ai-care", label: { zh: "养宠建议", en: "Care Advice" } },
  { href: "/wiki", label: { zh: "百科", en: "Encyclopedia" } },
  { href: "/news", label: { zh: "资讯", en: "News" } },
  { href: "/boarding", label: { zh: "服务", en: "Services" } },
  { href: "/about", label: { zh: "关于", en: "About" } }
];
