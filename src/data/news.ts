import type { LocalizedText, NewsItem } from "./types";

type Topic = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  tags: string[];
};

const topicMeta: Record<string, { category: string; coverImage: string; products: string[]; services: string[] }> = {
  n01: { category: "宠物健康", coverImage: "/assets/pets/breeds/dogs/golden-retriever.jpg", products: ["tracker", "activity-report"], services: ["walking"] },
  n02: { category: "宠物安全", coverImage: "/assets/pets/breeds/dogs/shiba.jpg", products: ["tracker"], services: ["lost-pet-help"] },
  n03: { category: "智能设备", coverImage: "/assets/pets/breeds/cats/british-shorthair.jpg", products: ["camera", "feeder", "fountain"], services: ["safety-profile"] },
  n04: { category: "宠物服务", coverImage: "/assets/pets/breeds/dogs/labrador.jpg", products: ["tracker", "camera"], services: ["boarding"] },
  n05: { category: "智能设备", coverImage: "/assets/pets/breeds/dogs/german-shepherd.jpg", products: ["tracker", "smart-collar"], services: ["lost-pet-help"] },
  n06: { category: "宠物健康", coverImage: "/assets/pets/breeds/dogs/border-collie.jpg", products: ["activity-report"], services: ["walking"] },
  n07: { category: "宠物健康", coverImage: "/assets/pets/breeds/cats/russian-blue.jpg", products: ["fountain"], services: ["safety-profile"] },
  n08: { category: "宠物服务", coverImage: "/assets/pets/breeds/dogs/beagle.jpg", products: ["tracker", "activity-report"], services: ["walking"] },
  n09: { category: "新手养宠", coverImage: "/assets/pets/breeds/dogs/corgi.jpg", products: ["activity-report"], services: [] },
  n10: { category: "新手养宠", coverImage: "/assets/pets/breeds/cats/ragdoll.jpg", products: ["tracker", "feeder", "fountain"], services: ["safety-profile"] },
  n11: { category: "宠物安全", coverImage: "/assets/pets/breeds/dogs/husky.jpg", products: ["tracker"], services: ["lost-pet-help"] },
  n12: { category: "智能设备", coverImage: "/assets/pets/breeds/cats/maine-coon.jpg", products: ["fountain"], services: ["safety-profile"] },
  n13: { category: "宠物健康", coverImage: "/assets/pets/breeds/dogs/french-bulldog.jpg", products: ["activity-report"], services: ["walking"] },
  n14: { category: "新手养宠", coverImage: "/assets/pets/breeds/dogs/poodle.jpg", products: ["tracker", "smart-collar"], services: ["safety-profile"] },
  n15: { category: "智能设备", coverImage: "/assets/pets/breeds/cats/sphynx.jpg", products: ["camera"], services: ["boarding-monitor"] },
  n16: { category: "宠物服务", coverImage: "/assets/pets/breeds/dogs/samoyed.jpg", products: ["camera", "boarding-monitor"], services: ["boarding"] },
  n17: { category: "新手养宠", coverImage: "/assets/pets/breeds/cats/orange-cat.jpg", products: ["fountain", "remote-cat"], services: ["safety-profile"] },
  n18: { category: "宠物服务", coverImage: "/assets/pets/breeds/dogs/australian-shepherd.jpg", products: ["tracker", "activity-report"], services: ["walking"] },
  n19: { category: "行业趋势", coverImage: "/assets/pets/breeds/cats/norwegian-forest.jpg", products: ["tracker", "camera", "feeder"], services: ["safety-profile", "store-partner"] },
  n20: { category: "行业趋势", coverImage: "/assets/pets/breeds/cats/munchkin.jpg", products: [], services: [] }
};

const categoryGuides: Record<string, LocalizedText[]> = {
  宠物安全: [
    { zh: "先记录时间、地点、宠物状态和最后一次确认位置，不在信息不完整时盲目扩大范围。", en: "Record time, place, pet condition and the last confirmed location before expanding the search area." },
    { zh: "把清晰近照、明显特征、芯片或设备编号和有效联系方式整理在同一份安全档案中。", en: "Keep a clear recent photo, identifying features, chip or device ID and current contacts in one safety profile." }
  ],
  智能设备: [
    { zh: "先明确设备解决的是定位、喂养、饮水还是看护问题，再判断提醒是否真的可执行。", en: "Define whether the device solves location, feeding, hydration or monitoring before judging its alerts." },
    { zh: "定期检查网络、电量、耗材和时间计划；设备数据应与现场观察互相验证。", en: "Check network, battery, consumables and schedules; verify device data against direct observation." }
  ],
  新手养宠: [
    { zh: "先建立固定的饮食、饮水、活动、排便和休息记录，再逐步增加设备与服务。", en: "Build a steady log of food, water, activity, toileting and rest before adding devices or services." },
    { zh: "每次只调整一个变量并持续观察，避免同时换粮、改变作息和增加高强度活动。", en: "Change one variable at a time; avoid changing food, routine and exercise intensity together." }
  ],
  宠物健康: [
    { zh: "把变化与宠物平时基线比较，重点记录持续时间、频率、食欲、精神和排泄。", en: "Compare changes with the pet's normal baseline and record duration, frequency, appetite, energy and toileting." },
    { zh: "环境与设备数据只能辅助观察；持续异常、疼痛、呼吸困难或拒食应尽快就医。", en: "Environment and device data only support observation; persistent symptoms, pain, breathing trouble or refusal to eat need veterinary care." }
  ],
  宠物服务: [
    { zh: "服务开始前确认人员、时间、地点、牵引或笼具、饮食禁忌和紧急联系人。", en: "Before service, confirm people, time, place, leash or carrier, diet restrictions and emergency contacts." },
    { zh: "服务过程中保留签到、轨迹、照片和异常记录，结束后核对宠物状态与物品。", en: "Keep check-ins, routes, photos and incident notes, then verify the pet's condition and belongings at handoff." }
  ],
  行业趋势: [
    { zh: "判断一个功能是否有价值，要看它能否减少遗漏、缩短响应时间并帮助主人做出下一步行动。", en: "A feature matters when it reduces omissions, shortens response time and helps owners take a next action." },
    { zh: "对尚未上线的能力明确标注规划状态，不用概念演示代替真实服务承诺。", en: "Clearly label planned capabilities and never present a concept demo as a live service promise." }
  ]
};

const topics: Topic[] = [
  { id: "n01", title: { zh: "春夏遛狗如何避开高温时段", en: "How to avoid the heat when walking dogs in spring and summer" }, summary: { zh: "高温天气下，遛狗时间、补水和地面温度都需要提前判断。", en: "In hot weather, walk timing, hydration and ground temperature all need to be judged in advance." }, tags: ["高温", "遛狗", "安全"] },
  { id: "n02", title: { zh: "电子围栏适合哪些养宠场景", en: "Which pet scenarios suit a geo-fence" }, summary: { zh: "电子围栏不是限制自由，而是帮助主人及时发现宠物离开安全区域。", en: "A geo-fence isn't about limiting freedom — it helps owners notice promptly when a pet leaves the safe zone." }, tags: ["定位器", "电子围栏", "走失预防"] },
  { id: "n03", title: { zh: "城市养猫家庭的远程看护清单", en: "A remote-care checklist for urban cat families" }, summary: { zh: "监控、喂食和饮水设备可以降低短时离家带来的不确定性。", en: "Cameras, feeders and fountains reduce the uncertainty of short trips away from home." }, tags: ["猫咪", "远程看护", "智能设备"] },
  { id: "n04", title: { zh: "第一次寄养前要确认的 8 件事", en: "8 things to confirm before your first boarding" }, summary: { zh: "寄养环境、疫苗记录、饮食习惯和紧急联系人都应提前同步。", en: "Boarding environment, vaccine records, diet habits and emergency contacts should all be shared in advance." }, tags: ["寄养", "服务", "安全"] },
  { id: "n05", title: { zh: "宠物定位器与普通蓝牙防丢器有什么不同", en: "How a pet tracker differs from a plain Bluetooth tag" }, summary: { zh: "定位器更关注持续追踪、围栏提醒和户外场景。", en: "Trackers focus more on continuous tracking, fence alerts and outdoor scenarios." }, tags: ["定位器", "产品科普", "户外"] },
  { id: "n06", title: { zh: "狗狗运动量不足有哪些信号", en: "Signs your dog isn't getting enough exercise" }, summary: { zh: "拆家、焦虑和夜间精力过剩可能与运动量不足有关。", en: "Destructiveness, anxiety and night-time restlessness can signal too little exercise." }, tags: ["运动", "健康", "行为"] },
  { id: "n07", title: { zh: "猫咪突然饮水变多要注意什么", en: "What to watch if your cat suddenly drinks more" }, summary: { zh: "饮水变化可能和天气、饮食，也可能和健康风险有关。", en: "Changes in water intake can relate to weather and diet, or to health risks." }, tags: ["饮水", "健康", "猫咪"] },
  { id: "n08", title: { zh: "代溜服务如何保障宠物安全", en: "How dog-walking services keep pets safe" }, summary: { zh: "确认牵引方式、路线、服务记录和异常反馈机制。", en: "Confirm leashing, routes, service records and exception-reporting mechanisms." }, tags: ["代溜", "轨迹", "评价"] },
  { id: "n09", title: { zh: "宠物成长值能带来什么互动体验", en: "What interactive experience do pet growth points bring" }, summary: { zh: "任务和徽章让安全习惯更容易坚持。", en: "Tasks and badges make safety habits easier to keep up." }, tags: ["成长值", "打卡", "互动"] },
  { id: "n10", title: { zh: "多宠家庭如何管理设备与档案", en: "How multi-pet families manage devices and profiles" }, summary: { zh: "家庭共享、宠物档案和设备分组是多宠管理的基础。", en: "Family sharing, pet profiles and device groups are the basis of multi-pet management." }, tags: ["多宠", "家庭共享", "档案"] },
  { id: "n11", title: { zh: "走失黄金时间内该怎么做", en: "What to do within the golden window after a pet goes missing" }, summary: { zh: "先缩小范围，再组织协寻，并同步宠物照片与关键特征。", en: "First narrow the area, then organize the search and share the pet's photo and key features." }, tags: ["走失预防", "协寻", "定位器"] },
  { id: "n12", title: { zh: "智能饮水机的滤芯多久更换", en: "How often to replace a smart fountain's filter" }, summary: { zh: "更换周期要结合水质、宠物数量和使用频率判断。", en: "The replacement cycle depends on water quality, number of pets and usage frequency." }, tags: ["饮水机", "维护", "健康"] },
  { id: "n13", title: { zh: "短鼻犬夏季运动需要降低强度", en: "Brachycephalic dogs need lighter summer exercise" }, summary: { zh: "法斗、巴哥等短鼻犬在湿热环境中更容易呼吸吃力。", en: "Frenchies, pugs and other flat-faced dogs struggle to breathe more easily in hot, humid air." }, tags: ["短鼻犬", "夏季", "健康"] },
  { id: "n14", title: { zh: "如何给宠物建立安全档案", en: "How to build a safety profile for your pet" }, summary: { zh: "照片、芯片、疫苗、过敏、联系人和设备编号都值得整理。", en: "Photos, microchip, vaccines, allergies, contacts and device IDs are all worth organizing." }, tags: ["安全档案", "新手", "服务"] },
  { id: "n15", title: { zh: "宠物监控器不是只为看热闹", en: "A pet camera isn't just for watching the fun" }, summary: { zh: "真正有用的是异常提醒、服务留痕和家庭共享。", en: "What's truly useful is anomaly alerts, service records and family sharing." }, tags: ["监控器", "远程看护", "智能设备"] },
  { id: "n16", title: { zh: "寄养日报应该包含哪些信息", en: "What a boarding daily report should include" }, summary: { zh: "饮食、排便、活动、情绪和异常记录能降低主人焦虑。", en: "Diet, toileting, activity, mood and exception notes ease an owner's anxiety." }, tags: ["寄养", "日报", "门店"] },
  { id: "n17", title: { zh: "新手养猫家庭的饮水观察方法", en: "How new cat families can monitor water intake" }, summary: { zh: "水碗位置、饮水机清洁和尿团变化都能提供健康线索。", en: "Bowl placement, fountain cleanliness and litter-clump changes all offer health clues." }, tags: ["猫咪", "饮水", "新手养宠"] },
  { id: "n18", title: { zh: "为什么代溜路线要尽量固定", en: "Why dog-walking routes should stay consistent" }, summary: { zh: "固定路线更容易管理风险，也便于定位器轨迹复盘。", en: "Consistent routes make risk easier to manage and tracker history easier to review." }, tags: ["代溜", "路线", "定位器"] },
  { id: "n19", title: { zh: "宠物智能生态为何从安全开始", en: "Why a smart pet ecosystem starts with safety" }, summary: { zh: "安全是设备、内容、养宠建议和服务真正形成闭环的入口。", en: "Safety is the entry point where devices, content, advice and services truly form a loop." }, tags: ["行业趋势", "生态", "安全"] },
  { id: "n20", title: { zh: "如何判断一篇养宠科普是否可靠", en: "How to judge whether a pet-care article is reliable" }, summary: { zh: "优先看来源、适用场景、风险边界和是否建议必要时就医。", en: "Look first at the source, applicable scenarios, risk boundaries and whether it advises seeing a vet when needed." }, tags: ["科普", "内容", "新手养宠"] }
];

export const newsItems: NewsItem[] = topics.map((topic, index) => {
  const meta = topicMeta[topic.id];
  const guide = categoryGuides[meta.category];
  const day = `2026-05-${String(10 + index).padStart(2, "0")}`;
  const minutes = 3 + (index % 5);
  return {
    id: topic.id,
    title: topic.title,
    category: meta.category,
    summary: topic.summary,
    content: {
      zh: `${topic.summary.zh}\n\n第一步：${guide[0].zh}\n\n日常检查：${guide[1].zh}\n\n本文重点：${topic.tags.join("、")}。把观察结果写入宠物档案，下一次发生变化时才有可比较的基线。内容用于日常科普，不替代兽医诊断或线下专业服务。`,
      en: `${topic.summary.en}\n\nFirst step: ${guide[0].en}\n\nRoutine check: ${guide[1].en}\n\nFocus: ${topic.tags.join(", ")}. Add observations to the pet profile so future changes have a useful baseline. This article is educational and does not replace veterinary diagnosis or professional on-site service.`
    },
    tags: [...topic.tags],
    sourceName: { zh: "易趣宠原创内容", en: "Epet Original" },
    sourceUrl: "",
    publishDate: day,
    date: day,
    readTime: { zh: `${minutes} 分钟`, en: `${minutes} min read` },
    coverImage: meta.coverImage,
    image: meta.coverImage,
    relatedProductIds: meta.products,
    relatedServiceIds: meta.services,
    status: "published"
  };
});
