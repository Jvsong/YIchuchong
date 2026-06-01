# 易趣宠第四版后端接入说明

本文档面向后期把当前 Next.js 前端从本地 mock 数据迁移到 Spring Boot + MySQL 后端的实施工作。当前仓库只包含前端、演示后台登录和静态数据，不包含完整 Java 后端实现。

## 当前前端数据目录

当前数据入口集中在以下位置：

- `src/data/navigation.ts`：前台导航配置。
- `src/data/homepage.ts`：首页配置、页面头图、生态分类、智能宠物生态链路。
- `src/data/products.ts`：定位器和智能设备产品数据。
- `src/data/news.ts`：宠物资讯数据。
- `src/data/breeds.ts`：宠物百科品种数据。
- `src/data/funFacts.ts`：顶部科普条和页面科普数据。
- `src/data/services.ts`：寄养、代溜、门店合作、丢宠协寻、安全档案等服务数据。
- `src/data/gamification.ts`：每日任务、成长值规则、勋章、探索点和排行榜模拟数据。
- `src/data/aiRules.ts`：养宠建议本地兜底规则。
- `src/data/site.ts`：兼容导出入口，不再作为大型数据承载文件。
- `src/data/types.ts`：当前数据结构类型，覆盖 `NewsItem`、`Breed`、`FunFact`、`Product`、`Service`、`HomeConfig`、`PhotoAsset`、`AiCareInput`、`GamificationConfig` 等。
- `src/types/index.ts`：对外导出的统一类型入口。
- `src/services/*Service.ts`：按模块拆分的数据服务层。
- `src/services/content.ts`：兼容聚合入口，页面可继续从这里取数。
- `public/assets/pets/photo-library.json`：图片素材授权台账，记录图片路径、用途、来源、作者、授权和备注。
- `public/assets/pets/**`：前端静态图片素材目录，按 `hero`、`dogs`、`cats`、`small-pets`、`lifestyle`、`device-scenes`、`service-scenes` 分类。

页面应继续优先通过 `src/services/content.ts` 获取内容，避免页面组件直接依赖后端接口细节。这样后期替换数据来源时，主要改 service 层即可。

## Service 层替换方式

当前 service 方法包括：

- `getNewsList()`
- `getNewsById(id)`
- `getBreedList()`
- `getBreedById(slug)`
- `getFunFacts()`
- `getProducts()`
- `getServices()`
- `getPhotoAssets()`
- `getHomeConfig()`
- `generateAiCareAdvice(input)`
- `getGamificationConfig()`

迁移到 Spring Boot API 时，建议保留这些方法名和返回结构，内部从本地数组改成 `fetch` 请求：

```ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getNewsList() {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news list");
  }

  return response.json();
}
```

建议步骤：

1. 先让 Spring Boot 返回与现有 TypeScript 类型兼容的 JSON，减少前端改动。
2. 在 `src/services/content.ts` 内统一处理 API 地址、错误、缓存策略和字段适配。
3. 如果后端字段使用下划线命名，例如 `cover_image`、`published_at`，在 service 层转换为前端使用的 `image`、`date`。
4. 列表接口支持分页、状态过滤和排序；前端展示页可先请求已发布内容。
5. 本地开发可继续保留 mock 数据作为降级方案，但生产构建不要依赖 mock 作为真实业务数据源。

## 推荐 MySQL 表

以下为第四版内容展示和后台管理的基础表建议，字段可按实际后台功能继续拆分。

### admin_user

用于真实管理员登录与权限控制。

- `id`
- `username`
- `password_hash`
- `display_name`
- `role`
- `status`
- `last_login_at`
- `created_at`
- `updated_at`

密码必须使用安全哈希保存，例如 BCrypt，不允许明文保存 `admin123`。

### news

用于宠物资讯、新手指南和产品科普。

- `id`
- `title`
- `summary`
- `content`
- `cover_image`
- `category`
- `tags_json`
- `source_name`
- `source_url`
- `read_time`
- `published_at`
- `status`
- `sort_order`
- `created_at`
- `updated_at`

### pet_breed

用于宠物百科。

- `id`
- `slug`
- `name`
- `species`
- `temperament`
- `care_level`
- `activity`
- `summary`
- `suitable_people`
- `feeding_tips`
- `health_risks`
- `device_suggestion`
- `cover_image`
- `status`
- `sort_order`
- `created_at`
- `updated_at`

### fun_fact

用于趣味知识、打卡提示和页面内轻内容。

- `id`
- `type`
- `title`
- `body`
- `page_scope`
- `status`
- `sort_order`
- `created_at`
- `updated_at`

### product

用于定位器、智能设备和后续生态产品展示。

- `id`
- `slug`
- `name`
- `category`
- `status_label`
- `summary`
- `features_json`
- `cover_image`
- `is_core`
- `sort_order`
- `created_at`
- `updated_at`

### service_item

用于寄养、代溜、门店合作和监控方案展示。

- `id`
- `slug`
- `name`
- `category`
- `status_label`
- `summary`
- `points_json`
- `cover_image`
- `sort_order`
- `created_at`
- `updated_at`

### photo_asset

用于图片素材库与授权台账。

- `id`
- `file_name`
- `path`
- `cdn_url`
- `category`
- `species`
- `breed`
- `scene`
- `usage_text`
- `source`
- `author`
- `license`
- `source_url`
- `license_checked_at`
- `notes`
- `created_at`
- `updated_at`

### homepage_config

用于首页首屏文案和核心配置。

- `id`
- `section_key`
- `title`
- `subtitle`
- `content_json`
- `enabled`
- `sort_order`
- `created_at`
- `updated_at`

## 推荐 API

公开展示接口：

- `GET /api/homepage`
- `GET /api/news`
- `GET /api/news/{id}`
- `GET /api/breeds`
- `GET /api/breeds/{slug}`
- `GET /api/fun-facts`
- `GET /api/products`
- `GET /api/services`
- `GET /api/photo-assets`
- `GET /api/gamification`
- `POST /api/pet-advice`

## DeepSeek 养宠建议接口

第四版先在 Next.js 服务端实现 `POST /api/pet-advice`，前端不直接请求 DeepSeek。接口读取环境变量 `DEEPSEEK_API_KEY`，调用 DeepSeek OpenAI-compatible Chat Completions API。未配置 Key、超时或接口失败时，返回本地规则兜底建议。

生产迁移到 Spring Boot 时建议：

- 新增 `PetAdviceController` 与 `PetAdviceService`
- 后端从环境变量或密钥管理读取 `DEEPSEEK_API_KEY`
- 前端继续请求自有后端 `/api/pet-advice`
- 记录请求摘要、耗时和降级状态，但不要记录完整隐私备注
- 所有智能建议保留“仅供参考，不能替代兽医诊断”的提示

后台接口：

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/me`
- `GET /api/admin/dashboard`
- `GET /api/admin/news`
- `POST /api/admin/news`
- `PUT /api/admin/news/{id}`
- `DELETE /api/admin/news/{id}`
- `GET /api/admin/breeds`
- `POST /api/admin/breeds`
- `PUT /api/admin/breeds/{id}`
- `DELETE /api/admin/breeds/{id}`
- `GET /api/admin/photo-assets`
- `POST /api/admin/photo-assets`
- `PUT /api/admin/photo-assets/{id}`

接口返回建议统一格式：

```json
{
  "code": 0,
  "message": "ok",
  "data": {}
}
```

分页列表建议返回：

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "items": [],
    "page": 1,
    "pageSize": 20,
    "total": 0
  }
}
```

## Admin 演示登录迁移

当前演示登录逻辑位于：

- `src/lib/admin-auth.ts`
- `src/app/api/admin/login/route.ts`
- `src/app/api/admin/logout/route.ts`
- `src/middleware.ts`

演示账号为 `admin/admin123`，当前仅用于本地体验后台页面，不是生产认证方案。

迁移建议：

1. Spring Boot 提供 `POST /api/admin/login`，从 `admin_user` 查询用户并校验 `password_hash`。
2. 登录成功后返回安全 Session 或 JWT。若使用 cookie，应设置 `HttpOnly`、`Secure`、`SameSite` 和合理过期时间。
3. 前端 `/admin/login` 提交到真实后端接口，不再调用本地硬编码校验。
4. 后台接口统一校验登录态和角色权限，前端只做展示控制，不承担安全边界。
5. 增加登录失败次数限制、操作日志、退出登录、密码修改和账号禁用能力。

## 图片迁移对象存储/CDN

当前图片位于 `public/assets/pets/**`，适合演示和前端开发。生产建议迁移到对象存储和 CDN：

1. 将图片上传到云对象存储，例如阿里云 OSS、腾讯云 COS、七牛云或 AWS S3。
2. 使用 CDN 域名对外访问，数据库保存 `cdn_url`、原始路径、用途和授权信息。
3. 前端图片字段逐步从 `/assets/pets/...` 改为 CDN URL，转换逻辑可先放在 service 层。
4. 保留 `photo_asset` 授权台账，生产上线前逐张复核来源、作者、授权页面和商用场景。
5. 上传后台需要限制文件类型、大小、尺寸，并对文件名做规范化，避免覆盖和路径穿越问题。

## 云服务器与前后端分离部署

推荐部署形态：

- 前端：Next.js 独立部署，可使用 Vercel、云服务器 Node 进程、Docker 或静态/SSR 托管平台。
- 后端：Spring Boot 独立部署在云服务器、容器服务或 Kubernetes。
- 数据库：MySQL 使用云数据库或独立内网实例，不向公网暴露。
- 图片：对象存储 + CDN，不建议长期从前端仓库 `public` 目录承载生产素材。
- 域名：前台、后台和 API 可使用不同子域名，例如 `www.example.com`、`admin.example.com`、`api.example.com`。

环境变量建议：

- 前端公开变量：`NEXT_PUBLIC_API_BASE_URL`
- 后端私密变量：数据库地址、数据库账号密码、JWT 密钥、对象存储密钥、短信/邮件服务密钥

部署注意：

1. 使用 HTTPS。
2. 配置 CORS 白名单，只允许正式前端域名访问后台 API。
3. 后端健康检查使用独立接口，例如 `GET /actuator/health`。
4. 前后端日志分开采集，接口错误需要包含 request id，便于排查。
5. 生产数据库定期备份，发布前先跑迁移脚本和回滚预案。

## 安全注意事项

- 不要把数据库密码、JWT 密钥、对象存储密钥写入前端代码或提交到 Git。
- 管理员密码必须哈希存储，禁止明文密码。
- 后台接口必须鉴权，不能只依赖前端隐藏入口。
- 对新增、编辑、删除接口做角色权限校验和操作日志。
- 对富文本内容做 XSS 防护，前端渲染 HTML 前需要可信清洗。
- 上传文件要校验 MIME、扩展名、大小和图片内容，避免脚本伪装成图片。
- 管理后台表单需要 CSRF 或同源策略保护，尤其是 cookie 登录方案。
- 登录接口需要限流，避免暴力破解。
- 后端返回错误时不要暴露数据库 SQL、堆栈、密钥或内部路径。
- 生产授权复核要覆盖图片、字体、第三方素材和引用内容。
