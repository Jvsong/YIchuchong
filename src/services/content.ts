/**
 * 客户端安全的【静态】访问器 barrel（不含 fs，可被客户端组件 import）。
 *
 * 仅暴露非可编辑的静态内容（导航、首页静态卡片、互动配置）与纯函数（养宠建议规则引擎）。
 * 可编辑内容（news/breeds/facts/products/services/photos）的「存储感知」读取在
 * src/lib/content.ts（server-only），公开页面一律从那里取。
 */
export { generateAiCareAdvice } from "./aiCareService";
export { getGamificationConfig } from "./gamificationService";
export { getCollectionCards, getSmartEcosystem } from "./homepageService";
export { getNavigationItems } from "./navigationService";
