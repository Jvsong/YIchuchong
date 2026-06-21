import type { Locale } from "./index";

/** 页面级文案字典（各营销/服务页的标题与正文）。 */
type PageDict = {
  locator: {
    eyebrow: string; title: string; desc: string; liveBadge: string; fenceBadge: string;
    detailKicker: string; detailTitle: string; detailText: string; getAlerts: string; viewFaq: string;
    specs: { label: string; value: string }[];
    capabilityTag: string; capabilityNoteSuffix: string;
    routeTag: string; routeTitle: string; routeText: string;
    sceneTag: string; sceneNote: string; scenes: string[];
    faq: string[]; faqAnswer: string;
    leadKicker: string; leadTitle: string; leadText: string; contactCta: string;
    exploreFeatures: string; heroNote: string; connectedLabel: string; connectedTitle: string;
    demoCta: string; capabilityTitle: string; scenesTitle: string; faqTitle: string;
  };
  devices: {
    eyebrow: string; title: string; desc: string;
    lineupKicker: string; lineupTitle: string; lineupText: string; consultCta: string; categoryAria: string;
    compare: { title: string; combo: string; scene: string }[];
    linkKicker: string; linkTitle: string; linkText: string;
    browseAll: string; chooseCategory: string; chooseCategoryHint: string;
    allProducts: string; allDevices: string; countSuffix: string;
    recommendedLabel: string; recommendedTitle: string;
  };
  deviceDetail: {
    allDevices: string; viewWord: string; ask: string; viewDetails: string;
    trust1: string; trust2: string; coreLabel: string; coreTitle: string;
    scenarioTitle: string; futureTitle: string;
  };
  wiki: { eyebrow: string; title: string; desc: string };
  news: { eyebrow: string; title: string; desc: string };
  fun: {
    eyebrow: string; title: string; desc: string; rankPrefix: string;
    dailyTasks: string; badgeWall: string; leaderboard: string; pointsUnit: string; scoreUnit: string;
    and: string; streakPrefix: string; streakSuffix: string;
  };
  boarding: {
    eyebrow: string; title: string; desc: string;
    pricing: { title: string; sub: string; detail: string }[];
    checklist: string[]; processSuffix: string;
  };
  walking: {
    eyebrow: string; title: string; desc: string;
    pricing: { title: string; sub: string; detail: string }[];
    safetyKicker: string; safetyTitle: string; safetyText: string;
  };
  partners: {
    eyebrow: string; title: string; desc: string; partnerTag: string;
    partners: { title: string; text: string }[]; process: string[];
  };
  about: {
    eyebrow: string; title: string; desc: string;
    brandTitle: string; brandText: string; privacyTitle: string; privacyText: string;
    termsTitle: string; termsText: string; roadmap: string[]; roadmapNote: string;
  };
  aiCare: {
    eyebrow: string; title: string; desc: string; tag: string; cards: string[]; cardNote: string;
  };
};

const pages: Record<Locale, PageDict> = {
  zh: {
    locator: {
      eyebrow: "核心产品", title: "宠物定位器，把走失预防放在日常",
      desc: "实时定位、历史轨迹、电子围栏、低电量提醒、丢宠协寻和家庭共享，是易趣宠生态的第一块拼图。",
      liveBadge: "实时定位在线", fenceBadge: "电子围栏已开启", detailKicker: "Product Detail", detailTitle: "易趣宠定位器",
      detailText: "当前重点展示产品能力和预约咨询入口。真实售价、套餐和硬件参数以上线版本为准。",
      getAlerts: "获取上新提醒", viewFaq: "查看常见问题",
      specs: [
        { label: "适用场景", value: "日常遛狗、寄养、家庭共享" },
        { label: "核心能力", value: "定位、围栏、轨迹、提醒" },
        { label: "设备状态", value: "核心产品展示" },
        { label: "服务支持", value: "上新提醒与咨询入口" }
      ],
      capabilityTag: "定位器能力", capabilityNoteSuffix: "等场景都能通过定位器形成安全记录。",
      routeTag: "路线记录", routeTitle: "家附近 1.2 公里安全活动圈", routeText: "用简洁路线、安全区域和定位点表现外出守护体验；真实轨迹数据由后续硬件和 App 接入。",
      sceneTag: "场景", sceneNote: "通过家庭共享、轨迹复盘和协寻模板，把突发风险前置到日常管理里。", scenes: ["日常遛狗", "宠物寄养", "走失协寻"],
      faq: ["定位器适合猫还是狗？", "没电会提醒吗？", "可以看历史轨迹吗？", "家人能不能一起看？", "定位器是否替代牵引绳？", "电子围栏会限制宠物活动吗？"],
      faqAnswer: "不会替代线下安全措施。定位器提供提醒和记录，真正的安全仍来自牵引、训练和及时响应。",
      leadKicker: "上新提醒", leadTitle: "想了解定位器上线、套餐和试用计划？", leadText: "当前不展示虚构价格和库存。后续接入真实后端后，可在这里连接预约、库存、售后和门店咨询。", contactCta: "联系合作与咨询",
      exploreFeatures: "了解产品能力", heroNote: "围绕日常遛宠、寄养、家庭共享与走失黄金时间协寻设计。",
      connectedLabel: "时刻保持连接", connectedTitle: "看见真正重要的时刻，而不是多一个复杂面板", demoCta: "预约产品演示",
      capabilityTitle: "为日常生活准备的安全能力", scenesTitle: "适合宠物真正会去的地方", faqTitle: "选择之前，先了解这些"
    },
    devices: {
      eyebrow: "智能设备生态", title: "从定位器延展到喂养、饮水与看护",
      desc: "自动出粮机、宠物监控器、远程喂猫、智能饮水机和寄养监控设备都以生态规划方式呈现。",
      lineupKicker: "Product Lineup", lineupTitle: "按真实养宠场景组织设备，而不是堆规划",
      lineupText: "定位器是当前核心产品，喂食、饮水、看护和寄养监控作为智能生态目录展示。真实上线状态以后端产品数据为准。",
      consultCta: "咨询设备合作", categoryAria: "设备分类",
      compare: [
        { title: "外出安全", combo: "定位器 + 电子围栏 + 家庭共享", scene: "日常遛狗、寄养外出、走失预防" },
        { title: "居家照护", combo: "喂食器 + 饮水机 + 监控器", scene: "上班、短途出行、多宠家庭" },
        { title: "门店服务", combo: "寄养监控 + 安全档案 + 服务日报", scene: "寄养、代溜、门店合作" }
      ],
      linkKicker: "设备联动场景", linkTitle: "定位器 + 喂养 + 看护 + 养宠建议报告",
      linkText: "当前页面以产品目录和场景解释为主，不虚构已上线能力。后续接入真实设备后，可由设备状态、宠物档案和服务记录共同生成联动建议。",
      browseAll: "浏览全部产品", chooseCategory: "选择产品类别", chooseCategoryHint: "按真实养宠场景找到合适设备",
      allProducts: "全部产品", allDevices: "全部设备", countSuffix: "款产品", recommendedLabel: "推荐组合", recommendedTitle: "围绕真实照护场景组合设备"
    },
    deviceDetail: {
      allDevices: "全部设备", viewWord: "展示图", ask: "咨询这款产品", viewDetails: "查看详细能力",
      trust1: "围绕真实养宠日常设计", trust2: "产品图可随时在后台替换", coreLabel: "核心能力", coreTitle: "这款产品解决什么问题",
      scenarioTitle: "自然融入每天的养宠生活", futureTitle: "为后续生态联动预留空间"
    },
    wiki: { eyebrow: "宠物百科", title: "狗狗、猫咪与小宠的养护知识库", desc: "覆盖狗狗、猫咪和小宠的差异化养护信息，支持分类、搜索、标签筛选和详情页，方便后续接入真实宠物数据库。" },
    news: { eyebrow: "宠物资讯", title: "今日宠物热点与智能养宠科普", desc: "覆盖新手养宠、走失预防、智能设备、寄养注意和服务安全。" },
    fun: {
      eyebrow: "趣味互动", title: "任务、成长值与安全守护勋章", desc: "每日遛狗任务、城市探索、连续打卡和排行榜模拟数据，让安全习惯更容易坚持。",
      rankPrefix: "排名", dailyTasks: "每日任务", badgeWall: "勋章墙", leaderboard: "排行榜模拟", pointsUnit: "成长值", scoreUnit: "分", and: "和", streakPrefix: "连续", streakSuffix: "天"
    },
    boarding: {
      eyebrow: "宠物寄养", title: "让寄养服务更透明、更安心", desc: "展示寄养环境、服务记录与未来寄养监控方案，帮助主人建立信任。",
      pricing: [
        { title: "日间寄养", sub: "适合白天照护", detail: "环境展示 / 饮水喂食 / 图文反馈" },
        { title: "过夜寄养", sub: "适合短途出行", detail: "独立休息区 / 晚间巡检 / 次日报告" },
        { title: "透明看护", sub: "适合敏感宠物", detail: "监控规划 / 服务留痕 / 异常提醒" }
      ],
      checklist: ["疫苗记录", "过敏禁忌", "饮食作息", "紧急联系人", "牵引规范", "日报授权"], processSuffix: "流程"
    },
    walking: {
      eyebrow: "宠物代溜", title: "用路线、打卡和记录守住代溜安全", desc: "围绕服务前确认、服务中轨迹和服务后反馈，建立轻量但完整的代溜体验。",
      pricing: [
        { title: "30 分钟基础路线", sub: "小区周边日常活动", detail: "出发确认 / 路线打卡 / 服务照片" },
        { title: "60 分钟探索路线", sub: "公园或长距离散步", detail: "轨迹记录 / 饮水提醒 / 异常反馈" },
        { title: "家庭协作照护", sub: "多人共同查看服务", detail: "家庭共享 / 服务评价 / 周报沉淀" }
      ],
      safetyKicker: "安全保障", safetyTitle: "实名认证、学生认证、全程轨迹、服务评价", safetyText: "页面展示代溜服务应有的安全节点和后续定位器联动方向；真实下单、支付和服务者审核会在后端上线后接入。"
    },
    partners: {
      eyebrow: "合作入驻", title: "面向门店、寄养与代溜服务方的生态入口", desc: "提供合作展示、线索表单和内容管理能力，后续可扩展资质审核、服务排期和线索分发。",
      partnerTag: "合作对象",
      partners: [
        { title: "寄养门店", text: "展示环境、房型、日报与监控规划，提升主人信任。" },
        { title: "代溜服务者", text: "提交身份、服务范围和路线规范，沉淀评价记录。" },
        { title: "宠物用品/设备合作", text: "围绕定位器、喂养、饮水和监控形成组合方案。" }
      ],
      process: ["提交资料", "资质核验", "完善服务内容", "配置设备方案", "接收线索"]
    },
    about: {
      eyebrow: "关于易趣宠", title: "以宠物安全为起点，构建未来养宠生态", desc: "从宠物定位器出发，连接智能设备、养宠建议、内容与生态服务，为真实设备、服务和内容运营打基础。",
      brandTitle: "品牌定位", brandText: "智能宠物生态平台，以宠物定位器为核心入口，逐步连接设备、内容、养宠建议和服务。",
      privacyTitle: "隐私政策", privacyText: "当前版本不采集真实支付、真实定位和真实设备控制数据。",
      termsTitle: "用户协议", termsText: "当前内容为展示与本地 Demo，后续接入真实服务时再完善协议条款。",
      roadmap: ["第一阶段：宠物定位器", "第二阶段：内容与养宠建议", "第三阶段：智能设备生态", "第四阶段：寄养代溜服务", "第五阶段：宠物社区和服务闭环"],
      roadmapNote: "保持前端、数据和 service 边界清晰，便于后续接入 Java Spring Boot + MySQL。"
    },
    aiCare: {
      eyebrow: "养宠建议", title: "用日常数据生成更可靠的养宠计划",
      desc: "根据宠物类型、品种、年龄、体型、健康状态、天气、场景和主人可用时间，生成运动、喂养、健康与定位器使用建议。",
      tag: "养宠建议", cards: ["科学日常计划", "设备联动建议", "不能替代兽医诊断"],
      cardNote: "根据宠物档案、天气、场景和主人时间生成结构化建议；当宠物持续异常时，应及时咨询专业兽医。"
    }
  },

  en: {
    locator: {
      eyebrow: "Core Product", title: "The pet tracker — loss prevention, every day",
      desc: "Real-time location, history tracks, geo-fence, low-battery alerts, lost-pet search and family sharing — the first piece of the Epet ecosystem.",
      liveBadge: "Live tracking online", fenceBadge: "Geo-fence enabled", detailKicker: "Product Detail", detailTitle: "Epet Tracker",
      detailText: "This page focuses on capabilities and inquiry entry. Real pricing, plans and hardware specs follow the launch version.",
      getAlerts: "Get launch alerts", viewFaq: "View FAQ",
      specs: [
        { label: "Scenarios", value: "Walks, boarding, family sharing" },
        { label: "Core abilities", value: "Locate, fence, track, alert" },
        { label: "Device status", value: "Core-product showcase" },
        { label: "Support", value: "Launch alerts & inquiry" }
      ],
      capabilityTag: "Tracker ability", capabilityNoteSuffix: " and more — all form safety records through the tracker.",
      routeTag: "Route log", routeTitle: "A 1.2 km safe activity circle near home", routeText: "Clean routes, safe zones and pins show the outing-guard experience; real track data comes with later hardware and the app.",
      sceneTag: "Scenario", sceneNote: "With family sharing, track review and search templates, sudden risk is moved forward into daily management.", scenes: ["Daily walks", "Pet boarding", "Lost-pet search"],
      faq: ["Is the tracker for cats or dogs?", "Does it alert on low battery?", "Can I see history tracks?", "Can family view together?", "Does it replace a leash?", "Does the geo-fence limit activity?"],
      faqAnswer: "It doesn't replace on-the-ground safety. The tracker provides alerts and records; real safety still comes from leashing, training and timely response.",
      leadKicker: "Launch alerts", leadTitle: "Want to know about launch, plans and trials?", leadText: "We don't show fictional prices or stock. Once a real backend is connected, this can link booking, stock, after-sales and store inquiry.", contactCta: "Contact for partnership",
      exploreFeatures: "Explore features", heroNote: "Built around walks, boarding, family sharing and the critical first moments of a lost-pet search.",
      connectedLabel: "Always connected", connectedTitle: "See the moments that matter, not another dashboard", demoCta: "Discuss a product demo",
      capabilityTitle: "Safety capabilities for everyday life", scenesTitle: "Made for where pets really go", faqTitle: "Before you choose"
    },
    devices: {
      eyebrow: "Smart Device Ecosystem", title: "From the tracker to feeding, hydration and care",
      desc: "Auto feeders, pet cameras, remote cat feeding, smart fountains and boarding monitors are all presented as an ecosystem plan.",
      lineupKicker: "Product Lineup", lineupTitle: "Devices organized by real pet scenarios, not a pile of plans",
      lineupText: "The tracker is the current core product; feeding, hydration, care and boarding monitoring are shown as an ecosystem catalog. Real launch status follows backend product data.",
      consultCta: "Inquire about devices", categoryAria: "Device categories",
      compare: [
        { title: "Outdoor safety", combo: "Tracker + geo-fence + family sharing", scene: "Daily walks, boarding, loss prevention" },
        { title: "Home care", combo: "Feeder + fountain + camera", scene: "Work, short trips, multi-pet homes" },
        { title: "Store service", combo: "Boarding monitor + safety profile + daily report", scene: "Boarding, walking, store partners" }
      ],
      linkKicker: "Device-linkage scenario", linkTitle: "Tracker + feeding + care + care-advice report",
      linkText: "This page focuses on the catalog and scenarios without inventing live capabilities. Once real devices connect, linked advice can be generated from device status, pet profiles and service records.",
      browseAll: "Browse products", chooseCategory: "Choose a product category", chooseCategoryHint: "Find the right device for your pet's daily routine",
      allProducts: "All products", allDevices: "All devices", countSuffix: "products", recommendedLabel: "Recommended combinations", recommendedTitle: "Build around a real care scenario"
    },
    deviceDetail: {
      allDevices: "All devices", viewWord: "view", ask: "Ask about this product", viewDetails: "View details",
      trust1: "Built for daily pet care", trust2: "Product images can be replaced anytime", coreLabel: "Core capabilities", coreTitle: "What this product is designed to do",
      scenarioTitle: "Fits naturally into everyday life", futureTitle: "Designed to grow with the ecosystem"
    },
    wiki: { eyebrow: "Encyclopedia", title: "A care knowledge base for dogs, cats and small pets", desc: "Differentiated care info for dogs, cats and small pets, with categories, search, tag filters and detail pages — ready to connect to a real pet database later." },
    news: { eyebrow: "Pet News", title: "Today's pet trends and smart-care know-how", desc: "Covering new owners, loss prevention, smart devices, boarding notes and service safety." },
    fun: {
      eyebrow: "Fun & Rewards", title: "Tasks, growth points and safety badges", desc: "Daily walk tasks, city exploration, streak check-ins and demo leaderboard data make safety habits easier to keep.",
      rankPrefix: "Rank", dailyTasks: "Daily tasks", badgeWall: "Badge wall", leaderboard: "Leaderboard demo", pointsUnit: "pts", scoreUnit: "pts", and: "&", streakPrefix: "streak", streakSuffix: "days"
    },
    boarding: {
      eyebrow: "Pet Boarding", title: "Make boarding more transparent and reassuring", desc: "Show the boarding environment, service records and future monitoring plans to help owners build trust.",
      pricing: [
        { title: "Day boarding", sub: "For daytime care", detail: "Environment / feeding / photo updates" },
        { title: "Overnight boarding", sub: "For short trips", detail: "Private rest area / night patrol / next-day report" },
        { title: "Transparent care", sub: "For sensitive pets", detail: "Monitoring plan / service records / anomaly alerts" }
      ],
      checklist: ["Vaccine records", "Allergies", "Diet & routine", "Emergency contact", "Leash rules", "Report authorization"], processSuffix: " process"
    },
    walking: {
      eyebrow: "Dog Walking", title: "Keep walking safe with routes, check-ins and records", desc: "Built around pre-service confirmation, in-service tracks and post-service feedback for a light yet complete walking experience.",
      pricing: [
        { title: "30-min basic route", sub: "Daily activity near home", detail: "Start confirm / route check-in / service photos" },
        { title: "60-min explore route", sub: "Park or longer walks", detail: "Track log / hydration reminder / anomaly feedback" },
        { title: "Family co-care", sub: "Multiple viewers", detail: "Family sharing / service reviews / weekly summary" }
      ],
      safetyKicker: "Safety guarantee", safetyTitle: "Real-name & student verification, full tracks, service reviews", safetyText: "The page shows the safety checkpoints a walking service should have and the future tracker linkage; real orders, payment and walker review come once the backend launches."
    },
    partners: {
      eyebrow: "Partnerships", title: "An ecosystem entry for stores, boarding and walking providers", desc: "Offers partner display, lead forms and content management, later expanding to qualification review, scheduling and lead distribution.",
      partnerTag: "Partner type",
      partners: [
        { title: "Boarding stores", text: "Show environment, room types, reports and monitoring plans to build owner trust." },
        { title: "Dog walkers", text: "Submit identity, service scope and route standards; accumulate review records." },
        { title: "Supplies / device partners", text: "Form combined plans around the tracker, feeding, hydration and monitoring." }
      ],
      process: ["Submit details", "Qualification review", "Complete services", "Configure devices", "Receive leads"]
    },
    about: {
      eyebrow: "About Epet", title: "Starting from pet safety to build the future of pet care", desc: "From the pet tracker, connecting smart devices, care advice, content and ecosystem services — a foundation for real devices, services and content.",
      brandTitle: "Brand positioning", brandText: "A smart pet-care platform centered on the tracker, gradually connecting devices, content, care advice and services.",
      privacyTitle: "Privacy policy", privacyText: "The current version doesn't collect real payment, real location or real device-control data.",
      termsTitle: "Terms of service", termsText: "Current content is a display and local demo; terms will be completed when real services are connected.",
      roadmap: ["Phase 1: Pet tracker", "Phase 2: Content & care advice", "Phase 3: Smart device ecosystem", "Phase 4: Boarding & walking services", "Phase 5: Pet community & service loop"],
      roadmapNote: "Keep front-end, data and service boundaries clear to ease later integration with Java Spring Boot + MySQL."
    },
    aiCare: {
      eyebrow: "Care Advice", title: "Turn daily data into a more reliable care plan",
      desc: "Based on pet type, breed, age, size, health, weather, scenario and the owner's available time, generate exercise, feeding, health and tracker-usage advice.",
      tag: "Care advice", cards: ["Science-based daily plan", "Device-linkage advice", "Not a vet diagnosis"],
      cardNote: "Generates structured advice from the pet profile, weather, scenario and owner's time; if a pet stays abnormal, consult a vet promptly."
    }
  },

  es: {
    locator: {
      eyebrow: "Producto principal", title: "El localizador: prevención de pérdidas cada día",
      desc: "Ubicación en tiempo real, historial de rutas, geocerca, alerta de batería, búsqueda de mascotas y uso en familia: la primera pieza del ecosistema Epet.",
      liveBadge: "Localización en vivo", fenceBadge: "Geocerca activada", detailKicker: "Detalle del producto", detailTitle: "Localizador Epet",
      detailText: "Esta página muestra las capacidades y el acceso a consultas. El precio, los planes y las especificaciones reales seguirán a la versión de lanzamiento.",
      getAlerts: "Recibir avisos", viewFaq: "Ver preguntas frecuentes",
      specs: [
        { label: "Escenarios", value: "Paseos, hospedaje, uso en familia" },
        { label: "Capacidades", value: "Localizar, geocerca, rutas, alertas" },
        { label: "Estado", value: "Producto principal" },
        { label: "Soporte", value: "Avisos y consultas" }
      ],
      capabilityTag: "Capacidad del localizador", capabilityNoteSuffix: " y más: todo forma registros de seguridad mediante el localizador.",
      routeTag: "Registro de ruta", routeTitle: "Un círculo seguro de 1,2 km cerca de casa", routeText: "Rutas claras, zonas seguras y puntos muestran la experiencia de protección; los datos reales llegan con el hardware y la app.",
      sceneTag: "Escenario", sceneNote: "Con uso en familia, revisión de rutas y plantillas de búsqueda, el riesgo se gestiona desde el día a día.", scenes: ["Paseo diario", "Hospedaje", "Búsqueda de mascota"],
      faq: ["¿El localizador es para perros o gatos?", "¿Avisa cuando se queda sin batería?", "¿Puedo ver el historial de rutas?", "¿La familia puede verlo a la vez?", "¿Sustituye a la correa?", "¿La geocerca limita la actividad?"],
      faqAnswer: "No sustituye las medidas de seguridad físicas. El localizador da alertas y registros; la seguridad real viene de la correa, el entrenamiento y la respuesta a tiempo.",
      leadKicker: "Avisos de lanzamiento", leadTitle: "¿Quieres saber del lanzamiento, planes y pruebas?", leadText: "No mostramos precios ni stock ficticios. Con un backend real, esto podrá enlazar reservas, stock, posventa y consultas en tienda.", contactCta: "Contactar para alianzas",
      exploreFeatures: "Conocer capacidades", heroNote: "Diseñado para paseos, hospedaje, uso en familia y los momentos clave de una búsqueda.",
      connectedLabel: "Siempre conectado", connectedTitle: "Ve los momentos que importan, no otro panel complejo", demoCta: "Reservar una demo",
      capabilityTitle: "Capacidades de seguridad para el día a día", scenesTitle: "Hecho para los lugares a los que van las mascotas", faqTitle: "Antes de elegir"
    },
    devices: {
      eyebrow: "Ecosistema de dispositivos", title: "Del localizador a la alimentación, hidratación y cuidado",
      desc: "Comederos automáticos, cámaras, alimentación remota de gatos, fuentes inteligentes y monitores de hospedaje, todo como un plan de ecosistema.",
      lineupKicker: "Catálogo", lineupTitle: "Dispositivos organizados por escenarios reales, no por planes",
      lineupText: "El localizador es el producto principal; alimentación, hidratación, cuidado y monitoreo se muestran como catálogo. El estado real sigue los datos del backend.",
      consultCta: "Consultar sobre dispositivos", categoryAria: "Categorías de dispositivos",
      compare: [
        { title: "Seguridad exterior", combo: "Localizador + geocerca + uso en familia", scene: "Paseos, hospedaje, prevención de pérdidas" },
        { title: "Cuidado en casa", combo: "Comedero + fuente + cámara", scene: "Trabajo, viajes cortos, varias mascotas" },
        { title: "Servicio de tienda", combo: "Monitor de hospedaje + perfil + informe diario", scene: "Hospedaje, paseos, tiendas aliadas" }
      ],
      linkKicker: "Escenario de vinculación", linkTitle: "Localizador + alimentación + cuidado + informe de consejos",
      linkText: "Esta página se centra en el catálogo y los escenarios sin inventar capacidades. Con dispositivos reales, los consejos vinculados se generarán a partir del estado, los perfiles y los registros.",
      browseAll: "Ver todos los productos", chooseCategory: "Elige una categoría", chooseCategoryHint: "Encuentra el dispositivo ideal para la rutina de tu mascota",
      allProducts: "Todos los productos", allDevices: "Todos los dispositivos", countSuffix: "productos", recommendedLabel: "Combinaciones recomendadas", recommendedTitle: "Combina en torno a un escenario de cuidado real"
    },
    deviceDetail: {
      allDevices: "Todos los dispositivos", viewWord: "vista", ask: "Consultar este producto", viewDetails: "Ver detalles",
      trust1: "Diseñado para el cuidado diario", trust2: "Las imágenes se pueden cambiar cuando quieras", coreLabel: "Capacidades", coreTitle: "Qué resuelve este producto",
      scenarioTitle: "Encaja naturalmente en el día a día", futureTitle: "Pensado para crecer con el ecosistema"
    },
    wiki: { eyebrow: "Enciclopedia", title: "Una base de conocimientos para perros, gatos y mascotas pequeñas", desc: "Información de cuidado diferenciada para perros, gatos y mascotas pequeñas, con categorías, búsqueda, filtros y páginas de detalle, lista para conectarse a una base de datos real." },
    news: { eyebrow: "Noticias", title: "Tendencias de mascotas y consejos inteligentes de hoy", desc: "Cubre nuevos dueños, prevención de pérdidas, dispositivos, notas de hospedaje y seguridad del servicio." },
    fun: {
      eyebrow: "Diversión y recompensas", title: "Tareas, puntos de progreso e insignias de seguridad", desc: "Tareas de paseo, exploración urbana, registros y datos de tabla de posiciones hacen más fácil mantener los hábitos de seguridad.",
      rankPrefix: "Puesto", dailyTasks: "Tareas diarias", badgeWall: "Muro de insignias", leaderboard: "Tabla de posiciones", pointsUnit: "pts", scoreUnit: "pts", and: "y", streakPrefix: "racha", streakSuffix: "días"
    },
    boarding: {
      eyebrow: "Hospedaje", title: "Haz el hospedaje más transparente y tranquilo", desc: "Muestra el entorno, los registros de servicio y los planes de monitoreo para generar confianza.",
      pricing: [
        { title: "Hospedaje de día", sub: "Para cuidado diurno", detail: "Entorno / alimentación / fotos" },
        { title: "Hospedaje nocturno", sub: "Para viajes cortos", detail: "Zona de descanso / patrulla nocturna / informe al día siguiente" },
        { title: "Cuidado transparente", sub: "Para mascotas sensibles", detail: "Plan de monitoreo / registros / alertas" }
      ],
      checklist: ["Vacunas", "Alergias", "Dieta y rutina", "Contacto de emergencia", "Reglas de correa", "Permiso de informe"], processSuffix: " proceso"
    },
    walking: {
      eyebrow: "Paseo de perros", title: "Paseos seguros con rutas, registros y reseñas", desc: "En torno a la confirmación previa, las rutas durante el servicio y la retroalimentación posterior, para una experiencia ligera pero completa.",
      pricing: [
        { title: "Ruta básica de 30 min", sub: "Actividad cerca de casa", detail: "Confirmar inicio / registro de ruta / fotos" },
        { title: "Ruta de 60 min", sub: "Parque o paseos largos", detail: "Registro de ruta / recordatorio de hidratación / alertas" },
        { title: "Cuidado en familia", sub: "Varios pueden ver", detail: "Uso en familia / reseñas / resumen semanal" }
      ],
      safetyKicker: "Garantía de seguridad", safetyTitle: "Verificación, rutas completas y reseñas de servicio", safetyText: "La página muestra los puntos de seguridad de un servicio de paseo y la futura vinculación con el localizador; los pedidos, pagos y verificación reales llegan con el backend."
    },
    partners: {
      eyebrow: "Alianzas", title: "Un acceso al ecosistema para tiendas, hospedaje y paseos", desc: "Ofrece presentación, formularios de leads y gestión de contenido, ampliable a revisión, agenda y distribución de leads.",
      partnerTag: "Tipo de aliado",
      partners: [
        { title: "Tiendas de hospedaje", text: "Muestra entorno, tipos de habitación, informes y monitoreo para generar confianza." },
        { title: "Paseadores", text: "Envía identidad, alcance y estándares de ruta; acumula reseñas." },
        { title: "Aliados de productos / dispositivos", text: "Crea planes combinados en torno al localizador, alimentación, hidratación y monitoreo." }
      ],
      process: ["Enviar datos", "Revisión", "Completar servicios", "Configurar dispositivos", "Recibir leads"]
    },
    about: {
      eyebrow: "Sobre Epet", title: "Desde la seguridad, hacia el futuro del cuidado de mascotas", desc: "Desde el localizador, conectando dispositivos, consejos, contenido y servicios, como base para productos, servicios y contenido reales.",
      brandTitle: "Posicionamiento", brandText: "Una plataforma de cuidado inteligente centrada en el localizador, que conecta poco a poco dispositivos, contenido, consejos y servicios.",
      privacyTitle: "Privacidad", privacyText: "La versión actual no recopila pagos reales, ubicación real ni control real de dispositivos.",
      termsTitle: "Términos", termsText: "El contenido actual es una demostración local; los términos se completarán al conectar servicios reales.",
      roadmap: ["Fase 1: Localizador", "Fase 2: Contenido y consejos", "Fase 3: Ecosistema de dispositivos", "Fase 4: Hospedaje y paseos", "Fase 5: Comunidad y ciclo de servicio"],
      roadmapNote: "Mantén claras las fronteras de front-end, datos y servicios para integrar después Java Spring Boot + MySQL."
    },
    aiCare: {
      eyebrow: "Consejos", title: "Convierte los datos diarios en un plan de cuidado más fiable",
      desc: "Según el tipo, raza, edad, tamaño, salud, clima, escenario y tiempo disponible, genera consejos de ejercicio, alimentación, salud y uso del localizador.",
      tag: "Consejos", cards: ["Plan diario con base", "Consejos de dispositivos", "No sustituye al veterinario"],
      cardNote: "Genera consejos estructurados a partir del perfil, el clima, el escenario y el tiempo del dueño; si la mascota sigue anormal, consulta a un veterinario."
    }
  }
};

export type PageDictionary = PageDict;

export function getPageDictionary(locale: Locale): PageDict {
  return pages[locale];
}
