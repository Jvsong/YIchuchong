# YIchuchong

易趣宠 Web 生态平台第二版。当前以 Next.js 前端品牌官网、内容展示、演示管理后台和 mock 数据服务层为主，后期后端方向预留为 Java Spring Boot + MySQL。

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

## 演示后台登录

- 路径：`/admin/login`
- 管理员账号：`admin`
- 管理员密码：`admin123`

当前只是本地演示登录，接口位于 `src/app/api/admin/login/route.ts`，使用 HttpOnly cookie 模拟登录态。生产环境必须替换为数据库账号、密码哈希、JWT 或 Session 认证、权限控制和环境变量配置。

前台 Header、Footer、首页和公开页面不提供后台入口，后台只能手动访问 `/admin/login`。

## 当前数据结构

数据集中在：

- `src/data/site.ts`：mock 内容数据
- `src/data/types.ts` 与 `src/types/index.ts`：统一类型定义
- `src/services/content.ts`：页面读取数据的服务层
- `public/assets/pets/photo-library.json`：图片素材授权台账

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

## 图片素材库

图片保存在 `public/assets/pets`，包含：

- `hero`
- `dogs`
- `cats`
- `small-pets`
- `lifestyle`
- `device-scenes`
- `service-scenes`

`photo-library.json` 为每张图记录 `id`、`fileName`、`path`、`category`、`species`、`breed`、`scene`、`usage`、`source`、`author`、`license`、`sourceUrl`、`notes`。当前素材主要来自 Pexels 免费授权图片，生产上线前建议逐张复核摄影师、授权页面和最终商用场景。

## Spring Boot + MySQL 预留

建议前端通过 `NEXT_PUBLIC_API_BASE_URL` 配置后端地址，不要把生产 API、数据库地址或密钥写死在前端代码中。

推荐 MySQL 表：

1. `admin_user`：`id`、`username`、`password_hash`、`role`、`status`、`created_at`、`updated_at`
2. `news`：`id`、`title`、`summary`、`content`、`cover_image`、`category`、`tags`、`source_name`、`source_url`、`published_at`、`status`、`created_at`、`updated_at`
3. `pet_breed`：`id`、`species`、`breed_name`、`english_name`、`size`、`personality`、`activity_level`、`suitable_people`、`feeding_tips`、`health_risks`、`device_suggestion`、`cover_image`、`created_at`、`updated_at`
4. `fun_fact`：`id`、`title`、`content`、`category`、`page_scope`、`status`、`sort_order`、`created_at`、`updated_at`
5. `product`：`id`、`name`、`slug`、`category`、`description`、`features`、`status_label`、`cover_image`、`is_core`、`created_at`、`updated_at`
6. `service`：`id`、`name`、`slug`、`category`、`description`、`features`、`cover_image`、`status_label`、`created_at`、`updated_at`
7. `photo_asset`：`id`、`file_name`、`path`、`category`、`species`、`breed`、`scene`、`usage_text`、`source`、`author`、`license`、`source_url`、`notes`、`created_at`、`updated_at`
8. `homepage_config`：`id`、`section_key`、`title`、`subtitle`、`content_json`、`enabled`、`sort_order`、`created_at`、`updated_at`

推荐 API：

- `GET /api/news`
- `GET /api/news/{id}`
- `GET /api/breeds`
- `GET /api/breeds/{id}`
- `GET /api/fun-facts`
- `GET /api/products`
- `GET /api/services`
- `GET /api/photo-assets`
- `POST /api/admin/login`
- `GET /api/admin/dashboard`
- `POST /api/admin/news`
- `PUT /api/admin/news/{id}`
- `DELETE /api/admin/news/{id}`

生产环境注意：

- Spring Boot 中必须使用 `password_hash`，不能明文存储密码。
- 数据库连接信息放在 `application-prod.yml`、环境变量或云平台密钥管理中。
- 前端只读取 `NEXT_PUBLIC_API_BASE_URL` 等公开变量。
- 后台接口需要鉴权、CSRF/同源策略、操作日志和上传文件大小限制。
- 图片建议迁移到对象存储或 CDN，数据库只保存路径和授权元数据。
