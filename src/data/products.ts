import type { Product } from "./types";

const baseProducts: Product[] = [
  {
    id: "tracker",
    slug: "pet-tracker",
    name: { zh: "易趣宠宠物定位器", en: "Epet Pet Tracker" },
    category: "宠物安全",
    status: "core",
    summary: { zh: "围绕宠物安全设计的轻量硬件入口，适合日常遛宠、家庭看护和走失预防。", en: "A lightweight hardware entry built around pet safety — for daily walks, family care and loss prevention." },
    description: { zh: "定位器是易趣宠当前核心产品，重点解决外出位置确认、离开安全区域提醒、走失黄金时间协寻和多人共同守护问题。", en: "The tracker is Epet's core product, focused on confirming location on outings, alerting when a pet leaves the safe zone, searching within the golden window, and guarding together." },
    features: [
      { zh: "实时定位", en: "Real-time location" },
      { zh: "历史轨迹", en: "History tracks" },
      { zh: "电子围栏", en: "Geo-fence" },
      { zh: "低电量提醒", en: "Low-battery alert" },
      { zh: "丢宠协寻", en: "Lost-pet search" },
      { zh: "家庭共享", en: "Family sharing" },
      { zh: "活动报告", en: "Activity report" }
    ],
    scenarios: [
      { zh: "日常遛狗", en: "Daily dog walking" },
      { zh: "宠物寄养", en: "Pet boarding" },
      { zh: "走失协寻", en: "Lost-pet search" },
      { zh: "家庭共享", en: "Family sharing" }
    ],
    futureIntegrations: [
      { zh: "与代溜轨迹记录联动", en: "Link with walking-route records" },
      { zh: "与活动报告生成联动", en: "Link with activity-report generation" },
      { zh: "与丢宠协寻模板联动", en: "Link with lost-pet search templates" }
    ],
    coverImage: "/assets/pets/device-scenes/device-tracker-collar-001.jpg",
    image: "/assets/pets/device-scenes/device-tracker-collar-001.jpg",
    gallery: ["/assets/pets/hero/hero-dog-safety-walk-001.jpg", "/assets/pets/hero/hero-dog-safety-walk-001.jpg"],
    isCore: true,
    relatedServices: ["lost-pet-help", "walking", "boarding"]
  },
  {
    id: "feeder",
    slug: "auto-feeder",
    name: { zh: "自动出粮机", en: "Auto Feeder" },
    category: "智能喂养",
    status: "planned",
    summary: { zh: "计划接入远程出粮、定时喂养和食量记录。", en: "Planned to support remote dispensing, scheduled feeding and intake logs." },
    description: { zh: "面向短时离家、多宠家庭和规律喂养场景，后续与养宠建议、饮食记录和宠物档案联动。", en: "For short trips away, multi-pet families and regular feeding, later linking with care advice, diet logs and pet profiles." },
    features: [
      { zh: "定时计划", en: "Scheduled plans" },
      { zh: "余粮提醒", en: "Food-level alerts" },
      { zh: "多宠档案", en: "Multi-pet profiles" }
    ],
    scenarios: [
      { zh: "上班日自动喂养", en: "Auto feeding on workdays" },
      { zh: "短途出行", en: "Short trips" },
      { zh: "多宠食量记录", en: "Multi-pet intake logs" }
    ],
    futureIntegrations: [
      { zh: "喂养建议", en: "Feeding advice" },
      { zh: "异常食量提醒", en: "Abnormal-intake alerts" },
      { zh: "家庭成员协同", en: "Family collaboration" }
    ],
    coverImage: "/assets/pets/hero/hero-cat-smart-home-001.jpg",
    image: "/assets/pets/hero/hero-cat-smart-home-001.jpg",
    gallery: ["/assets/pets/hero/hero-cat-smart-home-001.jpg"],
    isCore: false,
    relatedServices: ["safety-profile"]
  },
  {
    id: "camera",
    slug: "pet-camera",
    name: { zh: "宠物监控器", en: "Pet Camera" },
    category: "远程看护",
    status: "coming-soon",
    summary: { zh: "为独自在家的宠物提供高清看护和异常提醒。", en: "HD monitoring and anomaly alerts for pets home alone." },
    description: { zh: "用于居家看护、寄养透明化和异常动静提醒，后续可接入服务日报。", en: "For home care, boarding transparency and motion alerts, later connecting to service daily reports." },
    features: [
      { zh: "实时看护", en: "Live monitoring" },
      { zh: "双向语音", en: "Two-way audio" },
      { zh: "异常动静提示", en: "Motion alerts" }
    ],
    scenarios: [
      { zh: "猫咪独自在家", en: "Cat home alone" },
      { zh: "幼宠看护", en: "Young-pet care" },
      { zh: "寄养画面同步", en: "Boarding video sync" }
    ],
    futureIntegrations: [
      { zh: "寄养日报", en: "Boarding daily report" },
      { zh: "异常片段留存", en: "Anomaly clip storage" },
      { zh: "家庭共享查看", en: "Family shared viewing" }
    ],
    coverImage: "/assets/pets/hero/hero-cat-smart-home-001.jpg",
    image: "/assets/pets/hero/hero-cat-smart-home-001.jpg",
    gallery: ["/assets/pets/hero/hero-family-pet-001.jpg"],
    isCore: false,
    relatedServices: ["boarding-monitor", "boarding"]
  },
  {
    id: "remote-cat",
    slug: "remote-cat-feeding",
    name: { zh: "远程喂猫", en: "Remote Cat Feeding" },
    category: "猫咪照护",
    status: "future",
    summary: { zh: "把猫咪喂养计划、饮水和体重趋势连接起来。", en: "Connects cat feeding plans, hydration and weight trends." },
    description: { zh: "面向城市养猫家庭，强调远程投喂、饮水观察和离家期间的状态确认。", en: "For urban cat families, emphasizing remote feeding, hydration tracking and status checks while away." },
    features: [
      { zh: "远程投喂", en: "Remote feeding" },
      { zh: "饮食建议", en: "Diet advice" },
      { zh: "家庭成员协同", en: "Family collaboration" }
    ],
    scenarios: [
      { zh: "加班晚归", en: "Late nights at work" },
      { zh: "短途出差", en: "Short business trips" },
      { zh: "多成员轮流照护", en: "Shared care among members" }
    ],
    futureIntegrations: [
      { zh: "智能饮水机", en: "Smart fountain" },
      { zh: "饮食建议", en: "Diet advice" },
      { zh: "宠物监控器", en: "Pet camera" }
    ],
    coverImage: "/assets/pets/cats/cat-play-home-001.jpg",
    image: "/assets/pets/cats/cat-play-home-001.jpg",
    gallery: ["/assets/pets/cats/cat-play-home-001.jpg"],
    isCore: false,
    relatedServices: ["safety-profile"]
  },
  {
    id: "fountain",
    slug: "smart-fountain",
    name: { zh: "智能饮水机", en: "Smart Fountain" },
    category: "健康观察",
    status: "planned",
    summary: { zh: "关注宠物饮水习惯、水质和滤芯状态。", en: "Tracks pets' drinking habits, water quality and filter status." },
    description: { zh: "通过饮水趋势和滤芯提醒帮助主人观察猫狗健康变化，适合与养宠建议联动。", en: "Helps owners watch health changes through hydration trends and filter reminders, pairing well with care advice." },
    features: [
      { zh: "水量提醒", en: "Water-level alerts" },
      { zh: "滤芯记录", en: "Filter log" },
      { zh: "饮水趋势", en: "Hydration trends" }
    ],
    scenarios: [
      { zh: "猫咪饮水观察", en: "Cat hydration tracking" },
      { zh: "夏季补水", en: "Summer hydration" },
      { zh: "多宠家庭", en: "Multi-pet families" }
    ],
    futureIntegrations: [
      { zh: "健康风险提醒", en: "Health-risk alerts" },
      { zh: "滤芯维护任务", en: "Filter-maintenance tasks" },
      { zh: "宠物档案", en: "Pet profiles" }
    ],
    coverImage: "/assets/pets/hero/hero-cat-smart-home-001.jpg",
    image: "/assets/pets/hero/hero-cat-smart-home-001.jpg",
    gallery: ["/assets/pets/cats/cat-british-home-001.jpg"],
    isCore: false,
    relatedServices: ["safety-profile"]
  },
  {
    id: "boarding-monitor",
    slug: "boarding-monitor",
    name: { zh: "寄养监控设备", en: "Boarding Monitor" },
    category: "服务设备",
    status: "future",
    summary: { zh: "为合作门店提供寄养画面、巡检和服务留痕。", en: "Provides partner stores with boarding video, patrols and service records." },
    description: { zh: "用于提升寄养透明度，配合门店巡检、日报和异常反馈形成服务记录。", en: "Improves boarding transparency, forming service records with store patrols, daily reports and exception feedback." },
    features: [
      { zh: "寄养看护", en: "Boarding care" },
      { zh: "门店巡检", en: "Store patrols" },
      { zh: "服务记录", en: "Service records" }
    ],
    scenarios: [
      { zh: "门店寄养", en: "Store boarding" },
      { zh: "夜间看护", en: "Night care" },
      { zh: "服务日报", en: "Service daily report" }
    ],
    futureIntegrations: [
      { zh: "寄养监控", en: "Boarding monitoring" },
      { zh: "门店合作", en: "Store partnership" },
      { zh: "家庭共享", en: "Family sharing" }
    ],
    coverImage: "/assets/pets/cats/cat-ragdoll-window-001.jpg",
    image: "/assets/pets/cats/cat-ragdoll-window-001.jpg",
    gallery: ["/assets/pets/hero/hero-family-pet-001.jpg"],
    isCore: false,
    relatedServices: ["boarding-monitor", "store-partner"]
  },
  {
    id: "smart-collar",
    slug: "smart-collar",
    name: { zh: "宠物智能项圈", en: "Smart Pet Collar" },
    category: "可穿戴设备",
    status: "future",
    summary: { zh: "计划承载活动、身份、安全档案和轻量提醒能力。", en: "Planned to carry activity, identity, safety profile and lightweight alerts." },
    description: { zh: "作为定位器生态延展，未来可承担身份识别、活动记录和门店服务核验。", en: "As an extension of the tracker ecosystem, it may later handle identity, activity logs and in-store service verification." },
    features: [
      { zh: "身份标识", en: "Identity tag" },
      { zh: "活动趋势", en: "Activity trends" },
      { zh: "安全档案", en: "Safety profile" }
    ],
    scenarios: [
      { zh: "门店核验", en: "Store verification" },
      { zh: "日常活动记录", en: "Daily activity logs" },
      { zh: "多宠识别", en: "Multi-pet identification" }
    ],
    futureIntegrations: [
      { zh: "安全档案", en: "Safety profile" },
      { zh: "门店合作", en: "Store partnership" },
      { zh: "成长值", en: "Growth points" }
    ],
    coverImage: "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
    image: "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
    gallery: ["/assets/pets/hero/hero-service-walking-001.jpg"],
    isCore: false,
    relatedServices: ["safety-profile"]
  },
  {
    id: "activity-report",
    slug: "activity-report",
    name: { zh: "宠物活动报告", en: "Pet Activity Report" },
    category: "数据服务",
    status: "planned",
    summary: { zh: "把运动时长、路线、任务完成和安全提醒汇总成周报。", en: "Summarizes exercise time, routes, task completion and safety alerts into a weekly report." },
    description: { zh: "当前为前端展示能力，后续由定位器、养宠建议和趣味任务数据共同生成。", en: "Currently a front-end demo, later generated from tracker, care-advice and fun-task data together." },
    features: [
      { zh: "运动趋势", en: "Exercise trends" },
      { zh: "路线复盘", en: "Route review" },
      { zh: "安全提醒", en: "Safety alerts" }
    ],
    scenarios: [
      { zh: "每周复盘", en: "Weekly review" },
      { zh: "代溜服务评价", en: "Walking-service reviews" },
      { zh: "健康观察", en: "Health observation" }
    ],
    futureIntegrations: [
      { zh: "养宠建议报告", en: "Care-advice reports" },
      { zh: "排行榜", en: "Leaderboard" },
      { zh: "服务评价", en: "Service reviews" }
    ],
    coverImage: "/assets/pets/lifestyle/pet-owner-phone-001.jpg",
    image: "/assets/pets/lifestyle/pet-owner-phone-001.jpg",
    gallery: ["/assets/pets/hero/hero-service-walking-001.jpg"],
    isCore: false,
    relatedServices: ["walking"]
  }
];

const productEnhancements: Record<string, { note: Product["description"]; feature: Product["features"][number] }> = {
  tracker: {
    note: { zh: "使用时应确认卡扣牢固、设备有电并完成出门前定位；定位结果会受网络、遮挡和环境影响，不能替代牵引绳与身份牌。", en: "Before outings, check the mount, battery and first location fix. Coverage and obstructions affect results, so tracking never replaces a leash and ID tag." },
    feature: { zh: "出门前设备自检", en: "Pre-walk device check" }
  },
  feeder: {
    note: { zh: "需要定期清洁粮仓和出粮通道，并通过现场称量校准每份重量；它适合维持计划，不替代主人观察食欲和身体状态。", en: "Clean the hopper and chute regularly and calibrate portions by weighing them. It supports a plan but cannot replace appetite and body-condition checks." },
    feature: { zh: "出粮记录与卡粮检查", en: "Dispense log and jam checks" }
  },
  camera: {
    note: { zh: "安装时避开宠物可啃咬的位置，并明确家庭和门店查看权限；影像提醒只提示变化，不能单独判断健康异常。", en: "Mount away from chewing reach and define family or store viewing permissions. Video alerts show changes but cannot diagnose health issues." },
    feature: { zh: "隐私权限与设备状态", en: "Privacy access and device status" }
  },
  "remote-cat": {
    note: { zh: "离家前必须准备备用食水和现场联系人；远程投喂仅适合短时辅助，不建议把连续多日照护完全交给设备。", en: "Prepare backup food, water and an on-site contact before leaving. Remote feeding is short-term support, not a replacement for multi-day human care." },
    feature: { zh: "备用照护提醒", en: "Backup-care reminder" }
  },
  fountain: {
    note: { zh: "根据水质、宠物数量和使用频率清洗泵体与更换滤芯；饮水数据突然变化时应先检查设备，再结合排尿和精神状态判断。", en: "Clean the pump and replace filters based on water, pet count and use. For sudden intake changes, check the device first, then compare urination and energy." },
    feature: { zh: "清洗与滤芯维护计划", en: "Cleaning and filter schedule" }
  },
  "boarding-monitor": {
    note: { zh: "画面范围应避开员工和客户隐私区域，并设置保存周期；监控用于提升透明度，不替代门店人员的现场巡检。", en: "Camera framing should avoid staff and customer privacy zones and use a retention limit. Monitoring improves transparency but never replaces in-person patrols." },
    feature: { zh: "授权画面与巡检对照", en: "Authorized video and patrol matching" }
  },
  "smart-collar": {
    note: { zh: "需根据颈围预留舒适余量并定期检查摩擦点；当前为生态规划展示，身份核验和门店联动尚未作为真实服务上线。", en: "Fit with comfortable clearance and inspect friction points. This is an ecosystem concept; identity and store integrations are not yet live services." },
    feature: { zh: "佩戴舒适度检查", en: "Fit and comfort check" }
  },
  "activity-report": {
    note: { zh: "报告更适合比较同一只宠物的长期变化，不应用不同品种的绝对数值直接排名；异常趋势需要结合现场观察。", en: "Reports are best for comparing one pet over time, not ranking unlike breeds by absolute values. Unusual trends still need direct observation." },
    feature: { zh: "个体基线对比", en: "Personal baseline comparison" }
  }
};

export const products: Product[] = baseProducts.map((product) => {
  const enhancement = productEnhancements[product.id];
  return {
    ...product,
    description: {
      zh: `${product.description.zh}${enhancement.note.zh}`,
      en: `${product.description.en}${enhancement.note.en}`
    },
    features: [...product.features, enhancement.feature]
  };
});
