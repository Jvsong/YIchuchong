# Epet（易趣宠）

面向宠物安全与智能照护的多语言 Web 展示平台。项目围绕宠物定位器展开，并逐步连接智能设备、养宠建议、宠物百科、资讯内容、趣味互动、寄养、代溜、门店合作和内容管理后台。

> 当前仓库是可运行的产品展示与内容管理原型，不是完整的商业生产系统。真实订单、支付、设备通信、用户体系和 Spring Boot 后端尚未接入。

## 项目概览

- **品牌定位**：以宠物安全为入口，展示定位、设备、内容和服务生态。
- **前端框架**：Next.js 14 App Router + React 18 + TypeScript。
- **视觉主题**：Guardian Signal（守护信号），使用深森林绿与薄荷绿建立可靠、清晰的产品感。
- **内容规模**：48 个宠物百科条目、20 篇资讯、8 个产品条目、6 项服务和 73 条图片授权记录。
- **多语言**：英文、中文、西班牙文；默认英文，缺失翻译按“目标语言 → 英文 → 中文”回退。
- **内容后台**：提供资讯、百科、小科普、产品、服务、图片与站点设置管理。
- **智能建议**：可通过 DeepSeek 生成建议；未配置 API Key 或调用失败时自动使用本地规则引擎。
- **数据存储**：默认种子数据保存在 TypeScript/JSON 文件中；后台编辑结果写入本地 `storage/*.json`。

## 功能模块

### 1. 品牌首页

- 品牌 Hero 与核心行动入口；
- 产品与生态分类导航；
- 定位器、智能设备、内容和服务故事区；
- 推荐资讯与场景图片；
- 响应式桌面端和移动端布局。

### 2. 宠物定位器

- 定位器旗舰产品展示；
- 实时位置、历史轨迹、电子围栏、低电量提醒等能力说明；
- 使用场景、产品参数、FAQ 和咨询入口；
- 明确区分现有产品展示与未来规划能力。

### 3. 智能设备目录

- 按产品分类筛选；
- 产品状态、核心功能和适用场景展示；
- 产品详情画廊、功能说明、组合建议和维护边界；
- 当前包含定位器、自动出粮机、宠物监控器、远程喂猫、智能饮水机、寄养监控、智能项圈和活动报告。

### 4. 智能养宠建议

- 根据宠物类型、品种、年龄、体型、健康状态、天气、活动水平和主人时间生成建议；
- 输出日常、运动、饮食、健康、定位器使用和注意事项；
- DeepSeek 服务不可用时自动降级到本地规则；
- 明确提示建议不能替代兽医诊断。

### 5. 宠物百科

- 支持犬、猫和小宠分类；
- 支持名称、性格、标签和设备建议搜索；
- 每个条目包含性格、护理难度、活动需求、适合人群、运动、喂养、健康风险、预期寿命、环境需求和安全提醒；
- 48 个条目分别配置独立且与名称匹配的图片。

### 6. 宠物资讯

- 支持分类、标签和关键词筛选；
- 包含安全防丢、智能设备、新手养宠、宠物健康、宠物服务和行业趋势内容；
- 每篇资讯配置独立封面、正文、阅读时间、相关产品和相关服务；
- 后台编辑后前台读取持久化内容。

### 7. 趣味互动

- 每日任务与成长值；
- 徽章、连续打卡和城市探索概念；
- 排行榜演示数据；
- 为后续设备活动数据联动保留结构。

### 8. 宠物服务

- 宠物寄养；
- 寄养监控；
- 宠物代溜；
- 门店合作；
- 丢宠协寻；
- 宠物安全档案。

服务页面展示流程、所需资料、安全规则、服务亮点和关联设备。当前只提供内容展示和咨询线索，不包含真实下单与支付。

### 9. 内容管理后台

- 内容数据概览；
- 资讯、百科、小科普、产品和服务的通用记录编辑器；
- 多语言字段编辑；
- 图片上传与素材选择；
- 图片来源、作者、许可、品种身份和校验状态管理；
- 首页与站点设置；
- 使用 DeepSeek 辅助翻译内容；
- HttpOnly Cookie 演示登录态和后台路由保护。

## 页面路由

| 路由 | 功能 |
| --- | --- |
| `/` | 品牌首页 |
| `/locator` | 宠物定位器展示 |
| `/devices` | 智能设备目录与筛选 |
| `/devices/[slug]` | 产品详情 |
| `/ai-care` | 智能养宠建议 |
| `/advice` | 养宠建议兼容入口 |
| `/wiki` | 宠物百科列表与筛选 |
| `/wiki/[slug]` | 宠物百科详情 |
| `/news` | 资讯列表与筛选 |
| `/news/[id]` | 资讯详情 |
| `/fun` | 趣味任务与成长系统展示 |
| `/boarding` | 寄养服务 |
| `/walking` | 代溜服务 |
| `/partners` | 门店合作 |
| `/about` | 品牌与项目说明 |
| `/admin/login` | 后台登录 |
| `/admin` | 内容管理后台 |

## API 路由

| 方法与路径 | 说明 | 访问控制 |
| --- | --- | --- |
| `POST /api/pet-advice` | DeepSeek / 本地规则养宠建议 | 公开，服务端保护 API Key |
| `POST /api/admin/login` | 管理员登录并设置 HttpOnly Cookie | 公开登录入口 |
| `POST /api/admin/logout` | 清除后台登录 Cookie | 登录后使用 |
| `GET /api/admin/data/[type]` | 读取可编辑内容 | 管理员 |
| `PUT /api/admin/data/[type]` | 保存可编辑内容到 `storage` | 管理员 |
| `GET/PUT /api/admin/settings` | 读取或保存站点设置 | 管理员 |
| `POST /api/admin/upload` | 上传不超过 5 MB 的图片 | 管理员 |
| `POST /api/admin/translate` | 使用 DeepSeek 翻译内容字段 | 管理员 |

可编辑的 `type` 由 `src/config.ts` 中的 `DATA_TYPE_KEYS` 统一定义：

```text
news / breeds / facts / products / services / photos
```

## 技术栈

| 类型 | 技术 |
| --- | --- |
| 框架 | Next.js 14（App Router） |
| UI | React 18 |
| 语言 | TypeScript 5 |
| 图标 | Lucide React |
| 样式 | 全局 CSS + 响应式组件样式 |
| 测试 | Vitest |
| 图片处理 | Sharp |
| 内容存储 | TypeScript/JSON 种子 + 本地 JSON 持久化 |
| 智能服务 | DeepSeek Chat Completions API（可选） |
| 构建输出 | Next.js Standalone |

## 系统架构

```mermaid
flowchart TD
    U[浏览器用户] --> P[Next.js App Router 页面]
    A[后台管理员] --> M[Middleware 后台保护]
    M --> AP[后台页面与 Admin API]

    P --> CL[src/lib/content.ts<br/>服务端统一内容读取层]
    P --> SC[src/services/content.ts<br/>客户端安全静态访问器]

    CL --> DS[src/lib/dataStore.ts]
    DS --> ST[storage/*.json<br/>后台持久化数据]
    DS --> FB[src/data/*<br/>种子回退数据]

    AP --> DS
    AP --> PL[src/data/private/photo-library.json]
    P --> PA[public/assets/pets/*<br/>公开图片文件]

    P --> AI[/api/pet-advice]
    AI --> DK[DeepSeek API]
    AI --> LR[本地养宠规则引擎]
    DK -.失败或未配置.-> LR
```

### 核心架构原则

1. **公开服务端页面统一从 `src/lib/content.ts` 读取可编辑数据。**
2. **后台保存数据时写入 `storage/<type>.json`。**
3. **读取顺序为 storage 优先、`src/data` 种子回退。**
4. **客户端组件不能直接引用依赖 `fs` 的 server-only 内容层。**
5. **客户端需要可编辑数据时，由服务端父组件读取后通过 props 下传。**
6. **状态值使用稳定 ID，界面文字通过多语言标签表解析。**
7. **图片文件公开访问，但作者、来源和授权台账不放在 `public` 目录。**

## 数据流

### 公开页面读取

```text
Page（Server Component）
  → src/lib/content.ts
  → src/lib/dataStore.ts
  → storage/<type>.json（存在时）
  → src/data/*（否则回退）
  → props
  → Client Component
```

### 后台编辑

```text
Admin UI
  → /api/admin/data/<type>
  → Cookie 鉴权
  → writeData()
  → storage/<type>.json
  → 前台下次请求读取新内容
```

`storage/` 是运行时数据目录，默认被 Git 忽略。部署到无持久磁盘的平台时，后台修改可能在重新部署或实例重启后丢失；生产环境应迁移到数据库和对象存储。

## 多语言架构

支持语言：

- `en`：English，默认语言；
- `zh`：中文；
- `es`：Español。

核心文件：

- `src/i18n/index.ts`：语言类型、默认语言、Cookie、名称、旗帜和回退逻辑；
- `src/i18n/dictionaries.ts`：公共 UI 字典；
- `src/i18n/pageDictionaries.ts`：页面级文案；
- `src/i18n/enums.ts`：状态 ID 对应的多语言标签；
- `src/i18n/server.ts`：服务端从 Cookie 读取语言；
- `src/i18n/LocaleProvider.tsx`：客户端语言状态。

多语言内容结构：

```ts
type LocalizedText = {
  zh: string;
  en?: string;
  es?: string;
};
```

`pick()` 的回退顺序：

```text
目标语言 → English → 中文 → 空字符串
```

增加语言时，需要同步更新语言配置、字典、页面字典、枚举标签与对应测试。

## 内容数据

| 文件 | 职责 |
| --- | --- |
| `src/data/homepage.ts` | 首页配置、图片和生态模块 |
| `src/data/navigation.ts` | 导航数据 |
| `src/data/products.ts` | 产品与设备数据 |
| `src/data/services.ts` | 服务流程与安全规则 |
| `src/data/news.ts` | 资讯种子数据 |
| `src/data/breeds.ts` | 宠物百科数据 |
| `src/data/funFacts.ts` | 页面科普提示 |
| `src/data/gamification.ts` | 任务、徽章、探索与排行榜 |
| `src/data/aiRules.ts` | 本地养宠建议规则 |
| `src/data/types.ts` | 统一数据类型 |
| `src/data/private/photo-library.json` | 管理员图片授权台账 |

## 图片与授权管理

- 公开图片保存在 `public/assets/pets/`；
- 品种主图位于 `public/assets/pets/breeds/`；
- 授权台账位于 `src/data/private/photo-library.json`；
- 台账记录来源平台、作者、原始页面、许可、用途、文件哈希和核验状态；
- 公开页面只引用图片路径，不输出授权台账；
- `npm run validate:content` 会检查 48 个百科条目的图片存在性、路径唯一性、文件哈希、身份核验和许可核验。

正式商业上线前仍应复核素材平台最新许可条款和具体使用场景，必要时替换为品牌自有摄影或采购素材。

## 目录结构

```text
Epet/
├── public/
│   └── assets/
│       ├── brand/                 # 品牌素材
│       └── pets/                  # 页面宠物与场景图片
├── scripts/                       # 图片、内容迁移与校验脚本
├── src/
│   ├── __tests__/                 # Vitest 测试
│   ├── app/                       # 页面与 API 路由
│   ├── components/                # 公共、业务和后台组件
│   ├── data/                      # 种子数据、类型和私有授权台账
│   ├── i18n/                      # 多语言系统
│   ├── lib/                       # 鉴权、内容读取、存储与站点设置
│   └── services/                  # 客户端安全业务逻辑与规则引擎
├── storage/                       # 运行时后台数据（Git 忽略）
├── docs/                          # 架构、需求与后端接入文档
├── DESIGN.md                      # 视觉设计系统
├── PRODUCT.md                     # 产品说明
├── CLAUDE.md                      # 项目数据流和开发约定
├── next.config.mjs
├── vitest.config.ts
└── package.json
```

## 本地运行

### 环境要求

- Node.js 20 或更高版本；
- npm；
- 支持现代 CSS 的浏览器。

### 安装依赖

```bash
npm install
```

### 配置环境变量

```bash
cp .env.example .env.local
```

`.env.local` 示例：

```dotenv
# 可选：未配置时养宠建议使用本地规则
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_MODEL=deepseek-chat

# 生产环境必须设置
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SESSION_SECRET=your_random_secret_string_here
```

不要把 `.env.local`、真实密码、API Key 或 Session Secret 提交到 Git。

### 启动开发服务器

```bash
npm run dev
```

访问：

- 前台：<http://localhost:3000>
- 后台登录：<http://localhost:3000/admin/login>

本地开发未配置管理员环境变量时，会使用代码中的演示账号。演示凭证只用于本地开发，生产环境必须配置安全账号与随机 Session Secret。

## 常用命令

```bash
# 开发服务器
npm run dev

# ESLint
npm run lint

# 单元测试
npm test

# 内容和图片完整性校验
npm run validate:content

# 生产构建
npm run build

# 运行生产构建
npm start
```

建议提交前执行：

```bash
npm run validate:content
npm test
npm run lint
npm run build
```

## 测试范围

`src/__tests__/data.test.ts`：

- 百科数据生成与字段完整性；
- 新闻和状态 ID；
- 产品与服务枚举合法性；
- 本地养宠建议规则。

`src/__tests__/i18n.test.ts`：

- 多语言回退链；
- 枚举标签完整性；
- 三种语言字典结构一致性。

`scripts/validate-content.mjs`：

- 48 个百科条目是否齐全；
- 图片文件是否存在；
- 品种路径与文件哈希是否重复；
- 图片授权和身份是否已核验；
- 资讯、产品、服务和首页图片引用是否有效。

## 生产构建与部署

项目在 `next.config.mjs` 中启用了：

```js
output: "standalone"
```

标准构建：

```bash
npm run build
```

生产运行前必须配置管理员环境变量。当前后台数据和上传文件依赖本地磁盘：

- `storage/*.json` 保存后台编辑结果；
- `public/assets/uploads/` 保存后台上传图片。

如果部署到 Vercel、Serverless 或容器多副本环境，应把这两部分迁移到数据库和对象存储，否则数据无法可靠持久化和共享。

## 安全说明

当前后台是演示实现，正式上线前至少需要完成：

- 管理员账号数据库化；
- 密码使用 BCrypt/Argon2 哈希；
- Session 或 JWT 的签发、失效和轮换；
- CSRF、防暴力登录和速率限制；
- 角色与字段级权限；
- 上传文件扩展名、文件签名和病毒扫描；
- 审计日志；
- 数据库、对象存储和备份；
- 隐私政策与用户数据授权流程。

不要把当前默认演示凭证用于公网生产环境。

## 后续接入 Spring Boot + MySQL

推荐保持页面和组件的数据结构不变，只替换统一内容读取层：

```text
当前：src/lib/content.ts → dataStore → storage / seed data
未来：src/lib/content.ts → Spring Boot REST API → MySQL / Object Storage
```

建议迁移顺序：

1. 管理员、登录和权限；
2. 资讯、百科、产品、服务和图片表；
3. 文件上传迁移到对象存储；
4. 前台读取迁移到公开 API；
5. 后台 CRUD 和审核流程；
6. 用户、宠物档案和设备绑定；
7. 真实定位、订单、支付和服务调度。

详细建议见 [后端接入说明](docs/backend-integration.md)。

## 相关文档

- [视觉设计系统](DESIGN.md)
- [产品说明](PRODUCT.md)
- [项目开发约定](CLAUDE.md)
- [后端接入说明](docs/backend-integration.md)
- [需求分析](docs/requirements-analysis.md)

## 当前限制

- 没有真实 GPS、物联网设备或地图 SDK 接入；
- 没有用户注册、宠物账号和家庭成员体系；
- 没有真实订单、支付、排班和消息通知；
- 后台只使用本地 JSON 文件持久化；
- 上传文件只写入本地磁盘；
- 智能建议仅用于日常参考；
- 产品状态和未来能力以展示为主，不代表已经商业上线。

## License

本仓库当前未配置独立的开源代码许可证。除非仓库所有者另行添加 `LICENSE`，请勿默认将代码视为可自由复制、修改或分发。

图片素材遵循各自来源平台和授权记录中的许可，不随代码自动获得统一许可。
