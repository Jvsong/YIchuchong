import type { Locale } from "./index";

type Dict = {
  common: { learnMore: string; viewAll: string; backToList: string; submit: string; readMore: string };
  locale: { switchTo: string };
  nav: { primaryCta: string; adminAria: string };
  a11y: {
    brandHome: string; openNav: string; closeNav: string; mainNav: string;
    wikiCategory: string; factRegion: string; factClose: string;
  };
  card: {
    enterEco: string; exploreSeries: string; viewDetail: string; readDetail: string;
    speciesDog: string; speciesCat: string; speciesSmall: string;
  };
  explorer: {
    all: string; featured: string; readFeature: string; noArticles: string;
    searchBreed: string; searchBreedPlaceholder: string; categoryAria: string; tagAria: string;
  };
  detail: {
    breedEyebrow: string; temperament: string; careLevel: string; activityLevel: string;
    suitablePeople: string; dailyExercise: string; deviceSuggestion: string; feedingTips: string;
    healthRisks: string; breedNote: string;
    relatedProducts: string; relatedServices: string; none: string; relatedReading: string; backToNews: string;
    scenarios: string; futureIntegrations: string;
  };
  home: {
    heroKicker: string; collectionLabel: string; collectionTitle: string; collectionText: string;
    story1Label: string; story1Title: string; story1Text: string; story1Cta: string;
    story2Label: string; story2Title: string; story2Text: string; story2Cta: string;
    story3Label: string; story3Title: string; story3Text: string; story3Cta: string;
    smartLabel: string; smartTitle: string; smartText: string; ecoNode: string;
    productLabel: string; productText: string; fullSpec: string;
    fenceTag: string; fenceTitle: string; fenceText: string;
    newsLabel: string; newsTitle: string; newsMore: string;
    signal: { location: string; locationText: string; fence: string; fenceText: string; share: string; shareText: string; online: string };
    specs: string[];
    features: { label: string; text: string }[];
  };
  footer: {
    brandTagline: string; newsletterTitle: string; newsletterText: string; emailLabel: string;
    emailPlaceholder: string; subscribe: string; subscribed: string;
    promises: { title: string; text: string }[];
    groups: { title: string; links: { label: string; href: string }[] }[];
    rights: string;
  };
  pageHero: { badge: string };
  lead: {
    kicker: string; title: string; name: string; namePh: string; pet: string; petPh: string;
    phone: string; phonePh: string; serviceType: string; services: string[];
    note: string; notePh: string; submit: string; submitting: string; saved: string;
  };
  aiCareForm: {
    formAria: string;
    fields: {
      petType: { label: string; options: string[] };
      breed: { label: string; options: string[] };
      age: { label: string; options: string[] };
      size: { label: string; options: string[] };
      activityLevel: { label: string; options: string[] };
      health: { label: string; options: string[] };
      weather: { label: string; options: string[] };
      time: { label: string; options: string[] };
      hasTracker: { label: string; options: string[] };
      locationScenario: { label: string; options: string[] };
    };
    weightLabel: string; weightPh: string;
    healthNoteLabel: string; healthNotePh: string;
    questionLabel: string; questionPh: string;
    generating: string; generate: string; clear: string; regenerate: string;
    resultEyebrow: string; planForPrefix: string; planForSuffix: string;
    minutes: string; times: string; intensity: string;
    cards: string[];
    fallbackDiet: string; fallbackHealth: string;
    recDevice: string; recTask: string; recSafety: string; recTime: string;
    disclaimer: string;
    status: { failed: string; ai: string; local: string; unavailable: string };
  };
};

/** UI 文案字典（界面框架、营销标题等）。内容数据（新闻/百科等）的多语在 src/data 里。
 *  每个 locale 必须保持完全相同的结构（TS 强制）。 */
const messages: Record<Locale, Dict> = {
  zh: {
    common: { learnMore: "了解更多", viewAll: "查看更多", backToList: "返回列表", submit: "提交", readMore: "阅读全文" },
    locale: { switchTo: "切换语言" },
    nav: { primaryCta: "了解定位器", adminAria: "进入内容管理" },
    a11y: {
      brandHome: "易趣宠首页", openNav: "打开导航", closeNav: "关闭导航", mainNav: "主导航",
      wikiCategory: "宠物百科分类", factRegion: "宠物科普提示", factClose: "关闭宠物科普提示"
    },
    card: { enterEco: "进入生态", exploreSeries: "探索系列", viewDetail: "查看详情", readDetail: "阅读详情", speciesDog: "狗狗", speciesCat: "猫咪", speciesSmall: "小宠" },
    explorer: { all: "全部", featured: "精选专题", readFeature: "阅读专题", noArticles: "没有找到匹配的文章，可以切换分类或标签。", searchBreed: "搜索品种", searchBreedPlaceholder: "输入品种、性格或设备建议", categoryAria: "资讯分类", tagAria: "标签筛选" },
    detail: {
      breedEyebrow: "品种详情", temperament: "性格", careLevel: "养护难度", activityLevel: "活动需求",
      suitablePeople: "适合人群", dailyExercise: "每日运动", deviceSuggestion: "设备建议", feedingTips: "喂养建议",
      healthRisks: "健康风险", breedNote: "建议结合宠物年龄、健康状态、家庭时间和居住环境制定日常养护计划。",
      relatedProducts: "关联产品", relatedServices: "关联服务", none: "暂无", relatedReading: "相关阅读", backToNews: "返回资讯列表",
      scenarios: "适用场景", futureIntegrations: "未来联动"
    },
    home: {
      heroKicker: "易趣宠 · 宠物安全生态",
      collectionLabel: "从安全出发，连接完整照护",
      collectionTitle: "每一个日常场景，都有清楚的解决方式",
      collectionText: "定位、喂养、饮水、看护与服务不再是分散的设备入口，而是一套围绕宠物生活建立的照护网络。",
      story1Label: "易趣宠定位器", story1Title: "把走失预防，放进每一次散步",
      story1Text: "实时定位、电子围栏、历史轨迹、低电量提醒和家庭共享，面向小区散步、公园活动、寄养和走失协寻等真实场景。", story1Cta: "查看定位器",
      story2Label: "智能设备生态", story2Title: "喂食、饮水、看护，连接成日常照护网络",
      story2Text: "自动出粮机、智能饮水机、宠物监控器与寄养监控设备以生态规划方式呈现，为后续真实设备接入预留结构。", story2Cta: "查看智能设备",
      story3Label: "智能养宠建议", story3Title: "用日常数据，生成更可靠的养宠计划",
      story3Text: "根据宠物类型、品种、年龄、体型、天气、健康状态和当前场景，生成运动、喂食饮水、健康观察和定位器使用建议。", story3Cta: "生成养宠建议",
      smartLabel: "Smart Pet Life", smartTitle: "易趣宠智能宠物生态",
      smartText: "以宠物定位器为核心，连接定位安全、智能喂养、远程看护、养宠建议、宠物内容与寄养代溜服务，让每一次外出、每一次喂养、每一次陪伴都被更好记录和守护。",
      ecoNode: "生态节点", productLabel: "核心产品",
      productText: "围绕实时定位、历史轨迹、电子围栏、低电量提醒、丢宠协寻、家庭共享与活动报告构建安全感。",
      fullSpec: "查看完整规格", fenceTag: "安全围栏", fenceTitle: "家附近 1.2 公里活动圈", fenceText: "模拟轨迹、低电量提醒与家庭共享入口，为后续真实设备数据预留。",
      newsLabel: "宠物内容", newsTitle: "热点、百科与安全科普", newsMore: "查看更多资讯",
      signal: { location: "实时位置", locationText: "随时确认宠物所在", fence: "电子围栏", fenceText: "越界立即提醒家人", share: "家庭共享", shareText: "多人共同守护", online: "安全服务在线" },
      specs: ["实时位置", "电子围栏", "历史轨迹", "家庭共享", "低电量提醒", "App 记录"],
      features: [
        { label: "实时定位", text: "外出、寄养和家庭共享场景都能快速确认位置。" },
        { label: "历史轨迹", text: "按时间回看行动路线，帮助复盘走失风险点。" },
        { label: "电子围栏", text: "离开安全区域时第一时间提醒主人。" },
        { label: "低电量提醒", text: "把设备维护变成日常安全习惯。" },
        { label: "丢宠协寻", text: "预留照片、地点和联系方式的协寻入口。" },
        { label: "家庭共享", text: "多人共同守护宠物，不靠单一主人记忆。" },
        { label: "活动报告", text: "用运动时长和趋势观察宠物状态。" }
      ]
    },
    footer: {
      brandTagline: "以宠物安全为核心的智能养宠生态，让每一次外出与陪伴更安心。",
      newsletterTitle: "订阅易趣宠更新", newsletterText: "获取新设备、安全科普与服务上线通知。",
      emailLabel: "邮箱", emailPlaceholder: "your@email.com", subscribe: "订阅更新", subscribed: "已订阅，谢谢关注！",
      promises: [
        { title: "安全守护", text: "定位、围栏与协寻能力" },
        { title: "贴心服务", text: "全程在线协助" },
        { title: "无忧退换", text: "购买后保障支持" },
        { title: "隐私保护", text: "数据安全与权限管理" }
      ],
      groups: [
        { title: "生态", links: [{ label: "宠物定位器", href: "/locator" }, { label: "智能设备", href: "/devices" }, { label: "养宠建议", href: "/ai-care" }] },
        { title: "内容", links: [{ label: "宠物资讯", href: "/news" }, { label: "宠物百科", href: "/wiki" }, { label: "趣味互动", href: "/fun" }] },
        { title: "服务", links: [{ label: "宠物寄养", href: "/boarding" }, { label: "宠物代溜", href: "/walking" }, { label: "门店合作", href: "/partners" }] },
        { title: "条款", links: [{ label: "关于我们", href: "/about" }, { label: "合作洽谈", href: "/partners" }, { label: "隐私政策", href: "/about#privacy" }, { label: "服务条款", href: "/about#terms" }] }
      ],
      rights: "易趣宠 · 宠物安全与智能养宠生态平台"
    },
    pageHero: { badge: "定位 · 看护 · 建议" },
    lead: {
      kicker: "服务咨询", title: "留下你的宠物服务需求", name: "联系人", namePh: "请输入姓名", pet: "宠物信息", petPh: "例如：柯基 / 2岁 / 中型",
      phone: "联系方式", phonePh: "请输入手机号", serviceType: "服务类型", services: ["宠物寄养", "宠物代溜", "门店合作", "丢宠协寻"],
      note: "需求备注", notePh: "例如：寄养 3 天、希望每天有照片日报、宠物已免疫", submit: "提交咨询需求", submitting: "提交中...", saved: "已记录咨询需求。当前为本地演示保存，生产环境将接入后台线索系统。"
    },
    aiCareForm: {
      formAria: "养宠建议表单",
      fields: {
        petType: { label: "宠物类型", options: ["狗狗", "猫咪", "小宠"] },
        breed: { label: "品种", options: ["金毛寻回犬", "英短", "边境牧羊犬", "布偶猫", "缅因猫", "兔子"] },
        age: { label: "年龄", options: ["幼年", "成年", "老年"] },
        size: { label: "体型", options: ["小型", "中型", "中大型"] },
        activityLevel: { label: "运动量", options: ["偏低", "适中", "较高"] },
        health: { label: "健康状态", options: ["健康", "轻微超重", "术后恢复", "关节敏感"] },
        weather: { label: "今日天气", options: ["晴朗", "炎热", "小雨", "寒冷"] },
        time: { label: "主人可用时间", options: ["15分钟", "30分钟", "45分钟", "60分钟"] },
        hasTracker: { label: "是否佩戴定位器", options: ["已佩戴", "未佩戴"] },
        locationScenario: { label: "当前场景", options: ["日常遛狗", "室内陪伴", "旅行", "寄养", "生病恢复期"] }
      },
      weightLabel: "体重", weightPh: "例如 18kg", healthNoteLabel: "健康备注", healthNotePh: "例如 最近有点挑食",
      questionLabel: "你想咨询的问题", questionPh: "例如 今天下雨，狗狗还需要出门运动吗？",
      generating: "生成中…", generate: "生成养宠建议", clear: "清空", regenerate: "重新生成",
      resultEyebrow: "今日养宠建议", planForPrefix: "为", planForSuffix: "生成的养宠计划",
      minutes: "分钟运动", times: "次安排", intensity: "强度",
      cards: ["今日建议", "运动建议", "饮食建议", "健康提醒", "定位器建议"],
      fallbackDiet: "保持原有主粮节奏，换粮和加餐都应循序渐进。", fallbackHealth: "观察精神、食欲、饮水和排便变化。",
      recDevice: "推荐设备：", recTask: "推荐任务：", recSafety: "安全提醒：", recTime: "可用时间：",
      disclaimer: "智能建议仅供参考，不能替代兽医诊断；如宠物持续异常，请及时咨询专业兽医。",
      status: { failed: "生成失败", ai: "已生成智能养宠建议。", local: "已使用本地规则生成建议。", unavailable: "智能服务暂时不可用，已使用本地规则生成建议。" }
    }
  },

  en: {
    common: { learnMore: "Learn more", viewAll: "View all", backToList: "Back to list", submit: "Submit", readMore: "Read more" },
    locale: { switchTo: "Switch language" },
    nav: { primaryCta: "Explore the tracker", adminAria: "Open content admin" },
    a11y: {
      brandHome: "Epet home", openNav: "Open navigation", closeNav: "Close navigation", mainNav: "Main navigation",
      wikiCategory: "Encyclopedia categories", factRegion: "Pet tips", factClose: "Close pet tips"
    },
    card: { enterEco: "Enter ecosystem", exploreSeries: "Explore series", viewDetail: "View details", readDetail: "Read article", speciesDog: "Dogs", speciesCat: "Cats", speciesSmall: "Small pets" },
    explorer: { all: "All", featured: "Featured", readFeature: "Read feature", noArticles: "No matching articles — try another category or tag.", searchBreed: "Search breeds", searchBreedPlaceholder: "Breed, temperament or device advice", categoryAria: "News categories", tagAria: "Tag filter" },
    detail: {
      breedEyebrow: "Breed details", temperament: "Temperament", careLevel: "Care level", activityLevel: "Activity need",
      suitablePeople: "Best for", dailyExercise: "Daily exercise", deviceSuggestion: "Device advice", feedingTips: "Feeding tips",
      healthRisks: "Health risks", breedNote: "Build a daily care plan based on the pet's age, health, family time and living environment.",
      relatedProducts: "Related products", relatedServices: "Related services", none: "None", relatedReading: "Related reading", backToNews: "Back to news",
      scenarios: "Scenarios", futureIntegrations: "Future integrations"
    },
    home: {
      heroKicker: "Epet · Pet Safety Ecosystem",
      collectionLabel: "Starting from safety, connecting complete care",
      collectionTitle: "Every everyday moment has a clear solution",
      collectionText: "Tracking, feeding, hydration, monitoring and services are no longer scattered devices, but one care network built around pet life.",
      story1Label: "Epet Tracker", story1Title: "Build loss prevention into every walk",
      story1Text: "Real-time location, geo-fence, history tracks, low-battery alerts and family sharing — built for neighborhood walks, park time, boarding and lost-pet search.", story1Cta: "View the tracker",
      story2Label: "Smart Device Ecosystem", story2Title: "Feeding, hydration and care woven into a daily network",
      story2Text: "Auto feeders, smart fountains, pet cameras and boarding monitors are presented as an ecosystem plan, leaving room for real devices to plug in later.", story2Cta: "View smart devices",
      story3Label: "Smart Pet-Care Advice", story3Title: "Turn daily data into a more reliable care plan",
      story3Text: "Based on pet type, breed, age, size, weather, health and current scenario, generate exercise, feeding, health and tracker-usage advice.", story3Cta: "Generate advice",
      smartLabel: "Smart Pet Life", smartTitle: "The Epet Smart Pet Ecosystem",
      smartText: "Centered on the pet tracker, it connects location safety, smart feeding, remote care, pet-care advice, content and boarding/walking services so every outing, feeding and moment is better recorded and protected.",
      ecoNode: "Eco node", productLabel: "Core Product",
      productText: "Built for confidence around real-time location, history tracks, geo-fence, low-battery alerts, lost-pet search, family sharing and activity reports.",
      fullSpec: "View full specs", fenceTag: "Safety fence", fenceTitle: "A 1.2 km activity circle near home", fenceText: "Simulated tracks, low-battery alerts and family-sharing entry, reserved for real device data later.",
      newsLabel: "Pet Content", newsTitle: "Trends, encyclopedia and safety know-how", newsMore: "More articles",
      signal: { location: "Live location", locationText: "Know where your pet is anytime", fence: "Geo-fence", fenceText: "Alert family the moment they cross", share: "Family sharing", shareText: "Guard together, not alone", online: "Safety service online" },
      specs: ["Live location", "Geo-fence", "History tracks", "Family sharing", "Low-battery alert", "App log"],
      features: [
        { label: "Live location", text: "Quickly confirm position during outings, boarding and family sharing." },
        { label: "History tracks", text: "Replay routes by time to review where loss risks occur." },
        { label: "Geo-fence", text: "Alert the owner the moment a pet leaves the safe zone." },
        { label: "Low-battery alert", text: "Turn device upkeep into a daily safety habit." },
        { label: "Lost-pet search", text: "A search entry pre-set with photo, location and contacts." },
        { label: "Family sharing", text: "Multiple people guard the pet, not one owner's memory." },
        { label: "Activity report", text: "Watch your pet's state through exercise time and trends." }
      ]
    },
    footer: {
      brandTagline: "A smart pet-care ecosystem centered on safety, making every outing and moment more reassuring.",
      newsletterTitle: "Subscribe to Epet updates", newsletterText: "Get notified about new devices, safety tips and service launches.",
      emailLabel: "Email", emailPlaceholder: "your@email.com", subscribe: "Subscribe", subscribed: "Subscribed — thank you!",
      promises: [
        { title: "Safety guard", text: "Locate, fence and search" },
        { title: "Caring service", text: "Online help throughout" },
        { title: "Easy returns", text: "Post-purchase support" },
        { title: "Privacy first", text: "Data security & access control" }
      ],
      groups: [
        { title: "Ecosystem", links: [{ label: "Pet tracker", href: "/locator" }, { label: "Smart devices", href: "/devices" }, { label: "Care advice", href: "/ai-care" }] },
        { title: "Content", links: [{ label: "Pet news", href: "/news" }, { label: "Encyclopedia", href: "/wiki" }, { label: "Fun & rewards", href: "/fun" }] },
        { title: "Services", links: [{ label: "Boarding", href: "/boarding" }, { label: "Dog walking", href: "/walking" }, { label: "Store partners", href: "/partners" }] },
        { title: "Legal", links: [{ label: "About us", href: "/about" }, { label: "Partnerships", href: "/partners" }, { label: "Privacy policy", href: "/about#privacy" }, { label: "Terms of service", href: "/about#terms" }] }
      ],
      rights: "Epet · Pet safety & smart-care ecosystem"
    },
    pageHero: { badge: "Locate · Care · Advise" },
    lead: {
      kicker: "Service inquiry", title: "Tell us your pet-service needs", name: "Contact name", namePh: "Your name", pet: "Pet info", petPh: "e.g. Corgi / 2 yrs / Medium",
      phone: "Contact", phonePh: "Your phone number", serviceType: "Service type", services: ["Pet boarding", "Dog walking", "Store partnership", "Lost-pet search"],
      note: "Notes", notePh: "e.g. 3-day boarding, daily photo report, pet vaccinated", submit: "Submit inquiry", submitting: "Submitting...", saved: "Inquiry recorded. This is a local demo save; production will connect to a backend lead system."
    },
    aiCareForm: {
      formAria: "Pet-care advice form",
      fields: {
        petType: { label: "Pet type", options: ["Dog", "Cat", "Small pet"] },
        breed: { label: "Breed", options: ["Golden Retriever", "British Shorthair", "Border Collie", "Ragdoll", "Maine Coon", "Rabbit"] },
        age: { label: "Age", options: ["Puppy / Kitten", "Adult", "Senior"] },
        size: { label: "Size", options: ["Small", "Medium", "Medium-large"] },
        activityLevel: { label: "Activity level", options: ["Low", "Moderate", "High"] },
        health: { label: "Health", options: ["Healthy", "Slightly overweight", "Post-surgery", "Joint-sensitive"] },
        weather: { label: "Today's weather", options: ["Clear", "Hot", "Light rain", "Cold"] },
        time: { label: "Available time", options: ["15 min", "30 min", "45 min", "60 min"] },
        hasTracker: { label: "Wearing a tracker", options: ["Yes", "No"] },
        locationScenario: { label: "Current scenario", options: ["Daily walk", "Indoor company", "Travel", "Boarding", "Recovery"] }
      },
      weightLabel: "Weight", weightPh: "e.g. 18kg", healthNoteLabel: "Health notes", healthNotePh: "e.g. a bit picky lately",
      questionLabel: "Your question", questionPh: "e.g. It's raining — should the dog still go out?",
      generating: "Generating…", generate: "Generate advice", clear: "Clear", regenerate: "Regenerate",
      resultEyebrow: "Today's care advice", planForPrefix: "Care plan for", planForSuffix: "",
      minutes: "min exercise", times: "sessions", intensity: "intensity",
      cards: ["Today's advice", "Exercise advice", "Diet advice", "Health reminder", "Tracker advice"],
      fallbackDiet: "Keep the current main-food rhythm; transition food and treats gradually.", fallbackHealth: "Watch for changes in energy, appetite, hydration and toileting.",
      recDevice: "Recommended device: ", recTask: "Recommended task: ", recSafety: "Safety reminder: ", recTime: "Available time: ",
      disclaimer: "Advice is for reference only and is not a vet diagnosis; if your pet stays abnormal, consult a vet promptly.",
      status: { failed: "Generation failed", ai: "Smart advice generated.", local: "Advice generated with local rules.", unavailable: "Smart service unavailable; advice generated with local rules." }
    }
  },

  es: {
    common: { learnMore: "Saber más", viewAll: "Ver todo", backToList: "Volver a la lista", submit: "Enviar", readMore: "Leer más" },
    locale: { switchTo: "Cambiar idioma" },
    nav: { primaryCta: "Explorar el localizador", adminAria: "Abrir administración" },
    a11y: {
      brandHome: "Inicio de Epet", openNav: "Abrir navegación", closeNav: "Cerrar navegación", mainNav: "Navegación principal",
      wikiCategory: "Categorías de la enciclopedia", factRegion: "Consejos para mascotas", factClose: "Cerrar consejos"
    },
    card: { enterEco: "Entrar al ecosistema", exploreSeries: "Explorar serie", viewDetail: "Ver detalles", readDetail: "Leer artículo", speciesDog: "Perros", speciesCat: "Gatos", speciesSmall: "Mascotas pequeñas" },
    explorer: { all: "Todos", featured: "Destacado", readFeature: "Leer reportaje", noArticles: "No hay artículos que coincidan: prueba otra categoría o etiqueta.", searchBreed: "Buscar razas", searchBreedPlaceholder: "Raza, temperamento o consejo de dispositivo", categoryAria: "Categorías de noticias", tagAria: "Filtro de etiquetas" },
    detail: {
      breedEyebrow: "Detalles de la raza", temperament: "Temperamento", careLevel: "Nivel de cuidado", activityLevel: "Necesidad de actividad",
      suitablePeople: "Ideal para", dailyExercise: "Ejercicio diario", deviceSuggestion: "Consejo de dispositivo", feedingTips: "Consejos de alimentación",
      healthRisks: "Riesgos de salud", breedNote: "Crea un plan de cuidado diario según la edad, la salud, el tiempo familiar y el entorno de la mascota.",
      relatedProducts: "Productos relacionados", relatedServices: "Servicios relacionados", none: "Ninguno", relatedReading: "Lecturas relacionadas", backToNews: "Volver a noticias",
      scenarios: "Escenarios", futureIntegrations: "Integraciones futuras"
    },
    home: {
      heroKicker: "Epet · Ecosistema de seguridad para mascotas",
      collectionLabel: "Desde la seguridad, conectando el cuidado completo",
      collectionTitle: "Cada momento cotidiano tiene una solución clara",
      collectionText: "Localización, alimentación, hidratación, cuidado y servicios dejan de ser dispositivos sueltos para formar una red de cuidado en torno a la vida de la mascota.",
      story1Label: "Localizador Epet", story1Title: "Lleva la prevención de pérdidas a cada paseo",
      story1Text: "Localización en tiempo real, geocerca, historial de rutas, alerta de batería baja y uso compartido en familia, para paseos, parques, hospedaje y búsqueda de mascotas perdidas.", story1Cta: "Ver el localizador",
      story2Label: "Ecosistema de dispositivos", story2Title: "Alimentación, hidratación y cuidado, en una red diaria",
      story2Text: "Comederos automáticos, fuentes inteligentes, cámaras y monitores de hospedaje se presentan como un plan de ecosistema, dejando espacio para dispositivos reales más adelante.", story2Cta: "Ver dispositivos",
      story3Label: "Consejos inteligentes de cuidado", story3Title: "Convierte los datos diarios en un plan de cuidado más fiable",
      story3Text: "Según el tipo de mascota, raza, edad, tamaño, clima, salud y escenario, genera consejos de ejercicio, alimentación, salud y uso del localizador.", story3Cta: "Generar consejos",
      smartLabel: "Smart Pet Life", smartTitle: "El ecosistema inteligente Epet",
      smartText: "Centrado en el localizador, conecta seguridad de ubicación, alimentación inteligente, cuidado remoto, consejos, contenido y servicios de hospedaje y paseo, para que cada salida, comida y momento queden mejor registrados y protegidos.",
      ecoNode: "Nodo del ecosistema", productLabel: "Producto principal",
      productText: "Diseñado para dar confianza con localización en tiempo real, historial de rutas, geocerca, alerta de batería, búsqueda de mascotas, uso en familia e informes de actividad.",
      fullSpec: "Ver especificaciones", fenceTag: "Geocerca segura", fenceTitle: "Un círculo de actividad de 1,2 km cerca de casa", fenceText: "Rutas simuladas, alerta de batería y acceso compartido, reservados para datos reales del dispositivo.",
      newsLabel: "Contenido para mascotas", newsTitle: "Tendencias, enciclopedia y consejos de seguridad", newsMore: "Más artículos",
      signal: { location: "Ubicación en vivo", locationText: "Sabe dónde está tu mascota en todo momento", fence: "Geocerca", fenceText: "Avisa a la familia al cruzar el límite", share: "Uso en familia", shareText: "Cuidar juntos, no en solitario", online: "Servicio de seguridad en línea" },
      specs: ["Ubicación en vivo", "Geocerca", "Historial de rutas", "Uso en familia", "Alerta de batería", "Registro en la app"],
      features: [
        { label: "Ubicación en vivo", text: "Confirma rápido la posición en paseos, hospedaje y uso compartido." },
        { label: "Historial de rutas", text: "Revisa las rutas por hora para detectar puntos de riesgo." },
        { label: "Geocerca", text: "Avisa al dueño en cuanto la mascota sale de la zona segura." },
        { label: "Alerta de batería", text: "Convierte el mantenimiento en un hábito de seguridad diario." },
        { label: "Búsqueda de mascotas", text: "Un acceso de búsqueda con foto, ubicación y contactos." },
        { label: "Uso en familia", text: "Varias personas cuidan a la mascota, no la memoria de una sola." },
        { label: "Informe de actividad", text: "Observa el estado de tu mascota por tiempo y tendencias de ejercicio." }
      ]
    },
    footer: {
      brandTagline: "Un ecosistema de cuidado centrado en la seguridad, para que cada salida y cada momento den más tranquilidad.",
      newsletterTitle: "Suscríbete a las novedades de Epet", newsletterText: "Recibe avisos de nuevos dispositivos, consejos de seguridad y lanzamientos.",
      emailLabel: "Correo", emailPlaceholder: "tu@correo.com", subscribe: "Suscribirse", subscribed: "¡Suscrito, gracias!",
      promises: [
        { title: "Protección", text: "Localización, geocerca y búsqueda" },
        { title: "Servicio atento", text: "Ayuda en línea en todo momento" },
        { title: "Devoluciones fáciles", text: "Soporte tras la compra" },
        { title: "Privacidad primero", text: "Seguridad de datos y control de acceso" }
      ],
      groups: [
        { title: "Ecosistema", links: [{ label: "Localizador", href: "/locator" }, { label: "Dispositivos", href: "/devices" }, { label: "Consejos", href: "/ai-care" }] },
        { title: "Contenido", links: [{ label: "Noticias", href: "/news" }, { label: "Enciclopedia", href: "/wiki" }, { label: "Diversión", href: "/fun" }] },
        { title: "Servicios", links: [{ label: "Hospedaje", href: "/boarding" }, { label: "Paseos", href: "/walking" }, { label: "Tiendas aliadas", href: "/partners" }] },
        { title: "Legal", links: [{ label: "Sobre nosotros", href: "/about" }, { label: "Alianzas", href: "/partners" }, { label: "Privacidad", href: "/about#privacy" }, { label: "Términos", href: "/about#terms" }] }
      ],
      rights: "Epet · Ecosistema de seguridad y cuidado para mascotas"
    },
    pageHero: { badge: "Localiza · Cuida · Aconseja" },
    lead: {
      kicker: "Consulta de servicio", title: "Cuéntanos lo que necesita tu mascota", name: "Nombre de contacto", namePh: "Tu nombre", pet: "Datos de la mascota", petPh: "p. ej. Corgi / 2 años / Mediano",
      phone: "Contacto", phonePh: "Tu número de teléfono", serviceType: "Tipo de servicio", services: ["Hospedaje", "Paseo de perros", "Alianza de tienda", "Búsqueda de mascota"],
      note: "Notas", notePh: "p. ej. hospedaje 3 días, informe diario con fotos, mascota vacunada", submit: "Enviar consulta", submitting: "Enviando...", saved: "Consulta registrada. Es un guardado local de demostración; en producción se conectará a un sistema de leads."
    },
    aiCareForm: {
      formAria: "Formulario de consejos de cuidado",
      fields: {
        petType: { label: "Tipo de mascota", options: ["Perro", "Gato", "Mascota pequeña"] },
        breed: { label: "Raza", options: ["Golden Retriever", "Británico de pelo corto", "Border Collie", "Ragdoll", "Maine Coon", "Conejo"] },
        age: { label: "Edad", options: ["Cachorro", "Adulto", "Senior"] },
        size: { label: "Tamaño", options: ["Pequeño", "Mediano", "Mediano-grande"] },
        activityLevel: { label: "Nivel de actividad", options: ["Bajo", "Moderado", "Alto"] },
        health: { label: "Salud", options: ["Saludable", "Algo de sobrepeso", "Posoperatorio", "Articulaciones sensibles"] },
        weather: { label: "Clima de hoy", options: ["Despejado", "Caluroso", "Lluvia ligera", "Frío"] },
        time: { label: "Tiempo disponible", options: ["15 min", "30 min", "45 min", "60 min"] },
        hasTracker: { label: "¿Lleva localizador?", options: ["Sí", "No"] },
        locationScenario: { label: "Escenario actual", options: ["Paseo diario", "Compañía en casa", "Viaje", "Hospedaje", "Recuperación"] }
      },
      weightLabel: "Peso", weightPh: "p. ej. 18kg", healthNoteLabel: "Notas de salud", healthNotePh: "p. ej. algo melindroso últimamente",
      questionLabel: "Tu pregunta", questionPh: "p. ej. Está lloviendo, ¿el perro debe salir igual?",
      generating: "Generando…", generate: "Generar consejos", clear: "Limpiar", regenerate: "Regenerar",
      resultEyebrow: "Consejos de hoy", planForPrefix: "Plan de cuidado para", planForSuffix: "",
      minutes: "min de ejercicio", times: "sesiones", intensity: "intensidad",
      cards: ["Consejo de hoy", "Consejo de ejercicio", "Consejo de dieta", "Recordatorio de salud", "Consejo del localizador"],
      fallbackDiet: "Mantén el ritmo del alimento principal; cambia la comida y los premios de forma gradual.", fallbackHealth: "Observa cambios en energía, apetito, hidratación y evacuaciones.",
      recDevice: "Dispositivo recomendado: ", recTask: "Tarea recomendada: ", recSafety: "Recordatorio de seguridad: ", recTime: "Tiempo disponible: ",
      disclaimer: "Los consejos son solo de referencia y no sustituyen un diagnóstico veterinario; si tu mascota sigue anormal, consulta a un veterinario.",
      status: { failed: "Error al generar", ai: "Consejos inteligentes generados.", local: "Consejos generados con reglas locales.", unavailable: "Servicio inteligente no disponible; consejos generados con reglas locales." }
    }
  }
};

export type Dictionary = Dict;

export function getDictionary(locale: Locale): Dictionary {
  return messages[locale];
}
