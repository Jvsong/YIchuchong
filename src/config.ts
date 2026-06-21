/**
 * 集中配置（客户端安全：仅纯常量，不含 process.cwd / fs）。
 * 存储目录 STORAGE_DIR 是 server-only，留在 src/lib/dataStore.ts。
 */

/** 静态宠物素材根目录（public 下）。 */
export const ASSET_ROOT = "/assets/pets";
/** 后台上传图片的根目录（public 下）。 */
export const UPLOAD_ROOT = "/assets/uploads";

/** DeepSeek（AI 养宠建议 + 后台一键翻译）。 */
export const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
export const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";

/**
 * 后台可编辑、且经 storage/<type>.json 持久化的内容类型。
 * 单一真源：API 路由、统一读取层 lib/content、后台 tab 都从这里派生，
 * 新增一类内容只改这一处 + 在 lib/content 的 FALLBACKS 注册种子数据。
 */
export const DATA_TYPE_KEYS = ["news", "breeds", "facts", "products", "services", "photos"] as const;
export type EditableType = (typeof DATA_TYPE_KEYS)[number];
