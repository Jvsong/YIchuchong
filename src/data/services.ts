import type { Service } from "./types";

const baseServices: Service[] = [
  {
    id: "boarding",
    slug: "boarding",
    name: { zh: "宠物寄养", en: "Pet Boarding" },
    category: "宠物服务",
    status: "available",
    summary: { zh: "面向合作门店的寄养展示、预约线索和服务记录方案。", en: "Boarding display, booking leads and service-record plans for partner stores." },
    description: { zh: "寄养服务强调环境透明、档案同步、日报反馈和定位器防走失预案，当前仅提供展示与线索表单雏形。", en: "Boarding emphasizes a transparent environment, profile sync, daily reports and tracker-based loss prevention — currently a display and lead-form prototype." },
    processSteps: [
      { zh: "提交宠物档案", en: "Submit pet profile" },
      { zh: "确认疫苗与过敏信息", en: "Confirm vaccine and allergy info" },
      { zh: "同步饮食作息", en: "Sync diet and routine" },
      { zh: "生成寄养日报", en: "Generate boarding daily report" },
      { zh: "异常情况及时反馈", en: "Report anomalies promptly" }
    ],
    safetyRules: [
      { zh: "入店前核验疫苗", en: "Verify vaccines before check-in" },
      { zh: "外出活动全程牵引", en: "Leash throughout outings" },
      { zh: "重要异常必须留痕", en: "Log all important anomalies" },
      { zh: "建议佩戴定位器", en: "Tracker recommended" }
    ],
    requiredInfo: [
      { zh: "宠物姓名", en: "Pet name" },
      { zh: "品种体型", en: "Breed & size" },
      { zh: "疫苗记录", en: "Vaccine records" },
      { zh: "过敏禁忌", en: "Allergies" },
      { zh: "紧急联系人", en: "Emergency contact" }
    ],
    points: [
      { zh: "寄养环境展示", en: "Environment display" },
      { zh: "宠物档案同步", en: "Profile sync" },
      { zh: "异常情况记录", en: "Anomaly logging" },
      { zh: "寄养监控规划", en: "Boarding-monitor plan" }
    ],
    coverImage: "/assets/pets/hero/hero-family-pet-001.jpg",
    image: "/assets/pets/hero/hero-family-pet-001.jpg",
    relatedProducts: ["tracker", "camera", "boarding-monitor"]
  },
  {
    id: "boarding-monitor",
    slug: "boarding-monitor",
    name: { zh: "寄养监控", en: "Boarding Monitoring" },
    category: "透明看护",
    status: "future",
    summary: { zh: "为寄养门店预留监控画面、巡检、日报和服务留痕能力。", en: "Reserves monitoring video, patrols, daily reports and service records for boarding stores." },
    description: { zh: "后续接入门店监控设备后，主人可查看授权画面片段和巡检记录。", en: "Once store cameras are connected, owners can view authorized clips and patrol records." },
    processSteps: [
      { zh: "门店设备绑定", en: "Bind store devices" },
      { zh: "设置查看权限", en: "Set viewing permissions" },
      { zh: "巡检时间打卡", en: "Patrol check-ins" },
      { zh: "日报同步给主人", en: "Sync daily report to owner" }
    ],
    safetyRules: [
      { zh: "仅展示授权画面", en: "Show only authorized video" },
      { zh: "异常片段留存", en: "Retain anomaly clips" },
      { zh: "门店巡检人员实名", en: "Real-name patrol staff" }
    ],
    requiredInfo: [
      { zh: "门店名称", en: "Store name" },
      { zh: "寄养房间", en: "Boarding room" },
      { zh: "授权范围", en: "Authorization scope" },
      { zh: "巡检人员", en: "Patrol staff" }
    ],
    points: [
      { zh: "画面留存", en: "Video retention" },
      { zh: "巡检记录", en: "Patrol records" },
      { zh: "设备状态", en: "Device status" },
      { zh: "家庭共享", en: "Family sharing" }
    ],
    coverImage: "/assets/pets/cats/cat-ragdoll-window-001.jpg",
    image: "/assets/pets/cats/cat-ragdoll-window-001.jpg",
    relatedProducts: ["camera", "boarding-monitor"]
  },
  {
    id: "walking",
    slug: "walking",
    name: { zh: "宠物代溜", en: "Dog Walking" },
    category: "上门服务",
    status: "available",
    summary: { zh: "围绕安全路线、牵引规范、服务打卡和轨迹记录设计。", en: "Designed around safe routes, leash standards, service check-ins and track records." },
    description: { zh: "代溜服务雏形强调实名认证、学生认证、全程轨迹、服务照片和评价，不做真实订单与支付。", en: "The walking prototype emphasizes real-name and student verification, full-route tracks, service photos and reviews — no real orders or payment." },
    processSteps: [
      { zh: "填写宠物信息", en: "Fill in pet info" },
      { zh: "选择服务时间", en: "Choose service time" },
      { zh: "确认牵引方式", en: "Confirm leashing" },
      { zh: "路线打卡", en: "Route check-ins" },
      { zh: "服务评价", en: "Service review" }
    ],
    safetyRules: [
      { zh: "服务者实名认证", en: "Real-name verified walkers" },
      { zh: "可选学生认证", en: "Optional student verification" },
      { zh: "全程牵引", en: "Leash throughout" },
      { zh: "轨迹记录", en: "Track recording" },
      { zh: "异常即时反馈", en: "Instant anomaly feedback" }
    ],
    requiredInfo: [
      { zh: "宠物体型", en: "Pet size" },
      { zh: "牵引习惯", en: "Leash habits" },
      { zh: "常走路线", en: "Usual routes" },
      { zh: "禁忌地点", en: "Off-limit spots" },
      { zh: "联系人", en: "Contact" }
    ],
    points: [
      { zh: "路线打卡", en: "Route check-ins" },
      { zh: "服务照片", en: "Service photos" },
      { zh: "异常提醒", en: "Anomaly alerts" },
      { zh: "安全牵引规范", en: "Safe-leash standards" }
    ],
    coverImage: "/assets/pets/hero/hero-service-walking-001.jpg",
    image: "/assets/pets/hero/hero-service-walking-001.jpg",
    relatedProducts: ["tracker", "activity-report"]
  },
  {
    id: "store-partner",
    slug: "store-partner",
    name: { zh: "门店合作", en: "Store Partnership" },
    category: "合作生态",
    status: "planned",
    summary: { zh: "为宠物门店提供轻量入驻展示与服务内容管理入口。", en: "A lightweight onboarding, display and content-management entry for pet stores." },
    description: { zh: "门店可展示服务项目、环境照片、设备方案和客户线索，后续接入后台审核与线索管理。", en: "Stores can showcase services, environment photos, device plans and customer leads, later adding admin review and lead management." },
    processSteps: [
      { zh: "提交门店资料", en: "Submit store details" },
      { zh: "完善服务项目", en: "Complete service items" },
      { zh: "上传环境素材", en: "Upload environment media" },
      { zh: "配置设备方案", en: "Configure device plan" },
      { zh: "接收客户线索", en: "Receive customer leads" }
    ],
    safetyRules: [
      { zh: "门店资质审核", en: "Store qualification review" },
      { zh: "素材授权确认", en: "Media authorization check" },
      { zh: "服务标准公开", en: "Public service standards" }
    ],
    requiredInfo: [
      { zh: "门店名称", en: "Store name" },
      { zh: "营业范围", en: "Business scope" },
      { zh: "联系人", en: "Contact" },
      { zh: "服务项目", en: "Service items" },
      { zh: "环境照片", en: "Environment photos" }
    ],
    points: [
      { zh: "门店资料", en: "Store details" },
      { zh: "服务项目", en: "Service items" },
      { zh: "素材管理", en: "Media management" },
      { zh: "客户线索", en: "Customer leads" }
    ],
    coverImage: "/assets/pets/service-scenes/service-store-front-001.jpg",
    image: "/assets/pets/service-scenes/service-store-front-001.jpg",
    relatedProducts: ["camera", "boarding-monitor"]
  },
  {
    id: "lost-pet-help",
    slug: "lost-pet-help",
    name: { zh: "丢宠协寻", en: "Lost-Pet Search" },
    category: "安全服务",
    status: "planned",
    summary: { zh: "围绕定位器最后位置、宠物照片和关键特征生成协寻信息。", en: "Generates search info from the tracker's last location, pet photos and key features." },
    description: { zh: "协寻服务不替代线下搜寻，但可以帮助主人快速整理信息、缩小范围并同步给家人。", en: "It doesn't replace on-the-ground search, but helps owners organize info fast, narrow the area and share with family." },
    processSteps: [
      { zh: "确认最后位置", en: "Confirm last location" },
      { zh: "选择清晰照片", en: "Pick a clear photo" },
      { zh: "填写特征", en: "Fill in features" },
      { zh: "生成协寻模板", en: "Generate search template" },
      { zh: "同步家庭成员", en: "Share with family" }
    ],
    safetyRules: [
      { zh: "保护联系方式", en: "Protect contact details" },
      { zh: "避免公开敏感住址", en: "Avoid exposing sensitive addresses" },
      { zh: "优先联系附近门店和物业", en: "Contact nearby stores and property first" }
    ],
    requiredInfo: [
      { zh: "最后位置", en: "Last location" },
      { zh: "宠物照片", en: "Pet photo" },
      { zh: "明显特征", en: "Distinct features" },
      { zh: "联系方式", en: "Contact" },
      { zh: "是否佩戴定位器", en: "Wearing a tracker?" }
    ],
    points: [
      { zh: "最后定位", en: "Last location" },
      { zh: "协寻海报", en: "Search poster" },
      { zh: "家庭共享", en: "Family sharing" },
      { zh: "附近门店线索", en: "Nearby store leads" }
    ],
    coverImage: "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
    image: "/assets/pets/hero/hero-dog-safety-walk-001.jpg",
    relatedProducts: ["tracker", "smart-collar"]
  },
  {
    id: "safety-profile",
    slug: "safety-profile",
    name: { zh: "宠物安全档案", en: "Pet Safety Profile" },
    category: "档案服务",
    status: "planned",
    summary: { zh: "集中管理宠物基础资料、疫苗、过敏、设备与紧急联系人。", en: "Centrally manages a pet's basics, vaccines, allergies, devices and emergency contacts." },
    description: { zh: "安全档案用于寄养、代溜、协寻和智能设备推荐，当前以前端展示和本地表单雏形为主。", en: "The safety profile supports boarding, walking, search and device recommendations — currently a front-end and local-form prototype." },
    processSteps: [
      { zh: "创建宠物档案", en: "Create pet profile" },
      { zh: "补充健康信息", en: "Add health info" },
      { zh: "绑定设备", en: "Bind devices" },
      { zh: "同步服务偏好", en: "Sync service preferences" }
    ],
    safetyRules: [
      { zh: "敏感信息最小化", en: "Minimize sensitive data" },
      { zh: "家庭成员权限控制", en: "Family access control" },
      { zh: "服务共享需授权", en: "Sharing requires authorization" }
    ],
    requiredInfo: [
      { zh: "宠物姓名", en: "Pet name" },
      { zh: "年龄体型", en: "Age & size" },
      { zh: "健康状态", en: "Health status" },
      { zh: "设备编号", en: "Device ID" },
      { zh: "联系人", en: "Contact" }
    ],
    points: [
      { zh: "宠物档案", en: "Pet profile" },
      { zh: "设备绑定", en: "Device binding" },
      { zh: "服务偏好", en: "Service preferences" },
      { zh: "紧急信息", en: "Emergency info" }
    ],
    coverImage: "/assets/pets/lifestyle/pet-owner-phone-001.jpg",
    image: "/assets/pets/lifestyle/pet-owner-phone-001.jpg",
    relatedProducts: ["tracker", "feeder", "fountain"]
  }
];

const serviceEnhancements: Record<string, { note: Service["description"]; rule: Service["safetyRules"][number] }> = {
  boarding: {
    note: { zh: "交接时应共同确认精神、食欲、皮肤和随身物品，并把喂药、分离管理和就医授权写入记录。", en: "At handoff, confirm energy, appetite, skin and belongings together, and document medication, separation and veterinary authorization." },
    rule: { zh: "交接前后共同确认宠物状态", en: "Confirm pet condition at both handoffs" }
  },
  "boarding-monitor": {
    note: { zh: "画面仅用于已授权的寄养区域，门店仍需按计划完成现场巡检、喂养和卫生记录。", en: "Video is limited to authorized boarding areas; stores must still complete scheduled patrol, feeding and hygiene records." },
    rule: { zh: "设置画面保存周期与访问日志", en: "Set video retention and access logs" }
  },
  walking: {
    note: { zh: "开始前应做短距离牵引测试并确认宠物对陌生人、车辆和其他动物的反应，天气异常时允许取消或缩短路线。", en: "Before starting, run a short leash test and confirm reactions to strangers, traffic and animals; cancel or shorten routes in unsafe weather." },
    rule: { zh: "出发前检查胸背、牵引绳与定位器", en: "Check harness, leash and tracker before departure" }
  },
  "store-partner": {
    note: { zh: "门店展示信息需区分已提供服务和规划能力，环境照片、资质与价格由门店更新并接受后台审核。", en: "Store listings must distinguish live services from planned capabilities; stores maintain environment photos, qualifications and prices subject to review." },
    rule: { zh: "规划能力不得标记为已上线服务", en: "Never label planned capabilities as live services" }
  },
  "lost-pet-help": {
    note: { zh: "协寻信息应优先在可信社区、物业和附近门店传播，并保留诈骗防范提示；平台不保证找回结果。", en: "Share search information first with trusted communities, property staff and nearby stores, include scam warnings, and never promise recovery." },
    rule: { zh: "对索要转账或验证码的信息保持警惕", en: "Treat requests for transfers or verification codes as suspicious" }
  },
  "safety-profile": {
    note: { zh: "档案只收集服务所需的最少信息，健康记录由主人维护并设置家庭或服务人员的访问范围。", en: "Collect only the minimum information needed for care; owners maintain health records and control family or provider access." },
    rule: { zh: "定期复核联系人、疫苗与过敏信息", en: "Review contacts, vaccines and allergies regularly" }
  }
};

export const services: Service[] = baseServices.map((service) => {
  const enhancement = serviceEnhancements[service.id];
  return {
    ...service,
    description: {
      zh: `${service.description.zh}${enhancement.note.zh}`,
      en: `${service.description.en}${enhancement.note.en}`
    },
    safetyRules: [...service.safetyRules, enhancement.rule]
  };
});
