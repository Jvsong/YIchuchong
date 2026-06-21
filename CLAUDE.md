# CLAUDE.md — 易趣宠 / Epet 项目维护指南（人 & AI 协作必读）

本文件是给后续维护者（含 AI 助手）的「地图 + 约定」。动代码前请先读完本文，避免踩到历史坑。

## 这是什么

宠物科技品牌站。品牌名：中文 **易趣宠**，其他语言 **Epet**（见 `src/i18n/index.ts` 的 `brandName/brandEmblem`）。
三语：英文为主（默认/保底）、中文、西班牙文。

## 架构（分层 Next.js 14 App Router 单体 + 文件存储 CMS）

```
表现层    src/app/**（页面/路由）, src/components/**（UI）
i18n     src/i18n/**（字典/术语/枚举标签/locale）
读取层    src/lib/content.ts（server，可编辑内容）, src/services/content.ts（client 安全静态）
数据层    src/data/**（静态种子）+ src/data/types.ts（类型）
持久化    src/lib/dataStore.ts + storage/*.json（后台编辑结果）
API      src/app/api/**（后台 CRUD / 登录 / 上传 / 翻译 / AI 建议）
```

技术栈：Next 14（`output: standalone`）、React 18、TypeScript 严格、lucide-react、sharp（仅 `scripts/`）、DeepSeek（AI 建议 + 一键翻译）。无 CSS 框架（单一 `src/app/globals.css`）、无状态库。

## 【最重要】数据流唯一规范

可编辑内容有 6 类，定义在 `src/config.ts` 的 `DATA_TYPE_KEYS`：
`news | breeds | facts | products | services | photos`。

- **server 组件 / API 读取可编辑内容 → 一律用 `src/lib/content.ts`**（`getNews/getBreeds/getProducts/getServices/getFunFacts/getPhotoAssets` 等）。它 storage 优先、回退种子，**后台编辑后前台立即可见**。`lib/content.ts` 含 `fs`，**禁止被客户端组件 import**。
- **client 组件需要可编辑内容 → 由 server 父组件读取后以 props 下传**。已有范例：`FunFactTicker`（facts 经 layout→SiteChrome 下传）、`DevicesCatalog`（products 由 `app/devices/page.tsx` 下传）。
- `src/services/content.ts` 只放**客户端安全的静态**访问器（导航、首页静态卡片、养宠建议规则引擎）。不要把可编辑内容 getter 放这里。
- 后台 `src/app/admin/page.tsx` 是 client，初始回退**直接 import `@/data/*` 种子**，挂载后用 `/api/admin/data/<type>` 拉 storage 真实数据覆盖。

> 历史坑：曾存在 `lib/serverData`（storage 感知）与 `services/content`（静态）两套同名 `getNewsList`，导致「后台改了产品/服务/科普前台不变」。现已统一到 `lib/content`。新增数据读取一律走它。

**新增一类可编辑内容**：① `src/config.ts` 的 `DATA_TYPE_KEYS` 加 key；② `lib/content.ts` 的 `FALLBACKS` 注册种子 + 加 getter；③ 后台 `admin/page.tsx` 加 tab。API 路由与校验自动覆盖（从 `DATA_TYPE_KEYS` 派生）。

## i18n 约定

- 文案数据用 `LocalizedText = { zh; en?; es? }`，渲染用 `pick(value, locale)`（回退：目标→en→zh，**英文保底**）。
- UI 框架文案在 `src/i18n/dictionaries.ts`，营销页文案在 `pageDictionaries.ts`，都是 `Record<Locale, Dict>` —— **加一种语言/一句文案，TS 会强制补全所有 locale 块**。
- 开放词表（分类/标签/活动量等中文内容）用 `terms.ts` 的 `tt(zh, locale)` 翻译。
- **枚举 = 稳定英文 ID + 标签表**（`src/i18n/enums.ts`）。逻辑/存储只用 ID（如 product.status `"core"`），显示用 `enumLabel(productStatusLabels, id, locale)`。**严禁再用中文串当类型/Record 键**（历史上 `"核心产品"`/`"已佩戴"` 这么用过，改文案就断逻辑，已全部 ID 化）。
- **加一种语言**：`i18n/index.ts` 的 `Locale`/`LOCALES`/`LOCALE_LABELS`/`LOCALE_FLAGS` 各加一项 → 补 `dictionaries`/`pageDictionaries`/`terms`/`enums` 的对应块（TS 报错会逐个指引）。`LocalizedText` 的 en/es 可选，**内容缺译不会编译报错、静默回退**，注意人工补。

## 后台 / 持久化 / 部署

- 后台 `/admin`，登录 `lib/admin-auth.ts`（cookie `yqc_admin_session` = `ADMIN_SESSION_SECRET`）。生产**必须**设 `ADMIN_USERNAME/ADMIN_PASSWORD/ADMIN_SESSION_SECRET`，否则运行时报错。
- 编辑写入 `storage/<type>.json`；上传写入 `public/assets/uploads/`。**部署到 standalone/容器时这两个目录必须是可写持久卷**，否则编辑/上传丢失。
- DeepSeek key 放 `.env.local`（已 gitignore）：`DEEPSEEK_API_KEY`。一键翻译 `/api/admin/translate`、AI 建议 `/api/pet-advice` 依赖它，缺失时分别 503 / 本地规则兜底。
- 枚举历史数据迁移：`node scripts/migrate-enums.mjs`（幂等，把旧中文枚举值改成新 ID）。`lib/content.ts` 读取也有容错，不迁移也能正常显示。

## 命令

```
npm run dev / build / start / lint
npm test                  # vitest 单元测试
npm run validate:content  # 校验数据完整性
node scripts/migrate-enums.mjs  # 迁移 storage 旧枚举
```
