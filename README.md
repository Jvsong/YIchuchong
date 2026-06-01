# YIchuchong

易趣宠 Web 生态平台第四版。当前仓库以 Next.js 前端品牌官网、内容展示、演示管理后台、模块化数据服务层和养宠建议接口为主，聚焦宠物定位器、智能设备、养宠建议、宠物百科、资讯、趣味互动和宠物服务等前台体验。

当前项目没有完整 Java 后端实现。后期真实业务数据、后台账号、图片管理和权限体系建议接入 Spring Boot + MySQL。

## 本地运行

```bash
npm install
npm run dev -- -H 127.0.0.1 -p 3000
```

访问：

- 前台：http://127.0.0.1:3000
- 后台登录：http://127.0.0.1:3000/admin/login

常用检查：

```bash
npm run lint
npm run build
```

## 环境变量

DeepSeek API Key 必须只放在本地环境变量中，不能写入代码、文档或 Git 提交：

```bash
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

可参考 `.env.example`。真实 `.env`、`.env.local` 和 `.env.*.local` 已加入 `.gitignore`。

## 演示后台登录

- 路径：`/admin/login`
- 演示管理员账号：`admin`
- 演示管理员密码：`admin123`

当前只是本地演示登录，账号校验位于 `src/lib/admin-auth.ts`，接口位于 `src/app/api/admin/login/route.ts`，使用 HttpOnly cookie 模拟登录态。生产环境必须替换为数据库账号、密码哈希、JWT 或 Session 认证、权限控制和环境变量配置。

前台 Header 和公开内容区不突出后台入口；当前第四版在导航右侧和页脚保留轻量内容管理入口，生产环境可按权限策略隐藏或移除。后台仍通过 `/admin/login` 访问。

## 第四版更新说明

- 继续沿用第四版数据结构与 DeepSeek 服务端转发接口，没有重建项目。
- 首页按商业品牌官网节奏重构：轻量导航、大图 Hero、Collection 产品入口、三段重点产品展示和更统一的卡片比例。
- 全站用户可见文案统一为“养宠建议 / 智能养宠建议”，不再使用“AI养宠”作为前台概念。
- 导航使用“易趣宠”中文品牌锁定样式，并保留用户提供 logo 方向的绿色宠物安全识别感。
- PageHero、产品卡片、资讯卡片、百科卡片、表单和筛选控件统一圆角、阴影、留白与图片裁切。
- 新增 `public/assets/brand/yiquchong-logo.svg` 作为品牌素材占位，后续可替换为正式设计源文件。

## 数据目录结构

数据已按第四版模块拆分：

- `src/data/navigation.ts`：前台导航配置
- `src/data/homepage.ts`：首页 Hero、页面头图、生态分类和智能生态链路
- `src/data/products.ts`：定位器和智能设备产品数据
- `src/data/news.ts`：宠物资讯数据
- `src/data/breeds.ts`：宠物百科品种数据
- `src/data/funFacts.ts`：顶部科普条和页面科普数据
- `src/data/services.ts`：寄养、代溜、门店合作等服务数据
- `src/data/gamification.ts`：任务、成长值、勋章、排行榜模拟数据
- `src/data/aiRules.ts`：养宠建议本地兜底规则
- `src/data/site.ts`：兼容导出入口，不再承载大型数据
- `src/data/types.ts` 与 `src/types/index.ts`：统一类型定义
- `src/services/*Service.ts` 与 `src/services/content.ts`：页面读取数据的 service 层
- `public/assets/pets/photo-library.json`：图片素材库与授权台账
- `public/assets/pets/**`：页面使用的本地图片素材

页面优先通过 service 方法取数，后期可把 service 内部替换为 Spring Boot API 请求。

主要 service 方法：

- `getNewsList()`
- `getNewsById()`
- `getBreedList()`
- `getBreedById()`
- `getFunFacts()`
- `getProducts()`
- `getServices()`
- `getPhotoAssets()`
- `getHomeConfig()`
- `generateAiCareAdvice()`
- `getGamificationConfig()`

第四版新增 `POST /api/pet-advice`，由 Next.js 服务端读取 `DEEPSEEK_API_KEY` 调用 DeepSeek；未配置或调用失败时自动返回本地规则建议。

## 图片素材库

图片保存在 `public/assets/pets`，包含：

- `hero`
- `dogs`
- `cats`
- `small-pets`
- `lifestyle`
- `device-scenes`
- `service-scenes`

`photo-library.json` 为每张图记录 `id`、`fileName`、`path`、`category`、`species`、`breed`、`scene`、`usage`、`pageUsage`、`source`、`author`、`license`、`sourceUrl`、`notes`、`checkedAt`。当前素材主要来自免费授权图片台账，生产上线前建议逐张复核摄影师、授权页面和最终商用场景。

生产使用前需要复核：

- 图片是否允许当前品牌和商用场景使用
- 来源页面和授权条款是否仍可追溯
- 是否需要署名或额外授权
- 是否要替换为自有拍摄、授权图库或设计素材

## 后期 Spring Boot + MySQL 接入

详细接入建议见 [docs/backend-integration.md](/Users/jvsong/Desktop/Yiquchong/docs/backend-integration.md)。

总体原则：

- 前端通过 `NEXT_PUBLIC_API_BASE_URL` 配置后端地址，不把生产 API、数据库地址或密钥写死在前端代码中。
- 继续让页面通过 `src/services/content.ts` 取数，把 API 请求、字段适配、缓存和错误处理集中在 service 层。
- 后台演示账号 `admin/admin123` 只用于本地展示，生产必须迁移到真实用户表、密码哈希、鉴权和权限控制。
- 图片建议迁移到对象存储或 CDN，数据库只保存访问地址和授权元数据。
