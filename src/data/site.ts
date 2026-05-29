import type { Breed, FunFact, NewsItem, Product, Service } from "./types";

export const navItems = [
  { href: "/", label: "首页" },
  { href: "/locator", label: "宠物定位器" },
  { href: "/devices", label: "智能设备" },
  { href: "/ai-care", label: "AI养宠" },
  { href: "/wiki", label: "宠物百科" },
  { href: "/news", label: "宠物资讯" },
  { href: "/fun", label: "趣味互动" },
  { href: "/boarding", label: "宠物服务" },
  { href: "/about", label: "关于我们" }
];

export const heroImages = [
  "/assets/pets/lifestyle/pet-lifestyle-home-001.jpg",
  "/assets/pets/dogs/dog-golden-outdoor-001.jpg",
  "/assets/pets/cats/cat-indoor-feeding-001.jpg"
];

export const ecoCategories = [
  { title: "宠物安全", text: "定位、围栏、低电量、丢宠协寻与家庭共享。", icon: "Shield" },
  { title: "智能设备", text: "从定位器扩展到喂养、饮水、看护与寄养监控。", icon: "Cpu" },
  { title: "AI养宠", text: "根据宠物状态、天气和时间生成当天建议。", icon: "Sparkles" },
  { title: "宠物内容", text: "百科、资讯、新手指南和智能设备科普。", icon: "BookOpen" },
  { title: "趣味互动", text: "任务、成长值、徽章、城市探索和打卡。", icon: "Medal" },
  { title: "宠物服务", text: "寄养、代溜、门店合作与服务记录管理。", icon: "Store" }
];

export const products: Product[] = [
  {
    id: "tracker",
    name: "易趣宠宠物定位器",
    status: "核心产品",
    summary: "围绕宠物安全设计的轻量硬件入口，适合日常遛宠、家庭看护和走失预防。",
    features: ["实时定位", "历史轨迹", "电子围栏", "低电量提醒", "丢宠协寻", "家庭共享", "活动报告"],
    image: "/assets/pets/device-scenes/device-tracker-collar-001.jpg"
  },
  {
    id: "feeder",
    name: "自动出粮机",
    status: "生态规划",
    summary: "计划接入远程出粮、定时喂养和食量记录。",
    features: ["定时计划", "余粮提醒", "多宠档案"],
    image: "/assets/pets/device-scenes/device-feeder-home-001.jpg"
  },
  {
    id: "camera",
    name: "宠物监控器",
    status: "即将接入",
    summary: "为独自在家的宠物提供高清看护和异常提醒。",
    features: ["实时看护", "双向语音", "异常动静提示"],
    image: "/assets/pets/device-scenes/device-camera-home-001.jpg"
  },
  {
    id: "remote-cat",
    name: "远程喂猫",
    status: "未来能力",
    summary: "把猫咪喂养计划、饮水和体重趋势连接起来。",
    features: ["远程投喂", "饮食建议", "家庭成员协同"],
    image: "/assets/pets/device-scenes/device-cat-feeding-001.jpg"
  },
  {
    id: "fountain",
    name: "智能饮水机",
    status: "生态规划",
    summary: "关注宠物饮水习惯、水质和滤芯状态。",
    features: ["水量提醒", "滤芯记录", "饮水趋势"],
    image: "/assets/pets/device-scenes/device-fountain-001.jpg"
  },
  {
    id: "boarding-monitor",
    name: "寄养监控设备",
    status: "未来能力",
    summary: "为合作门店提供寄养画面、巡检和服务留痕。",
    features: ["寄养看护", "门店巡检", "服务记录"],
    image: "/assets/pets/service-scenes/service-boarding-monitor-001.jpg"
  }
];

export const newsItems: NewsItem[] = [
  ["n01", "春夏遛狗如何避开高温时段", "新手养宠", "高温天气下，遛狗时间、补水和地面温度都需要提前判断。"],
  ["n02", "电子围栏适合哪些养宠场景", "走失预防", "电子围栏不是限制自由，而是帮助主人及时发现宠物离开安全区域。"],
  ["n03", "城市养猫家庭的远程看护清单", "智能设备科普", "监控、喂食和饮水设备可以降低短时离家带来的不确定性。"],
  ["n04", "第一次寄养前要确认的 8 件事", "寄养注意", "寄养环境、疫苗记录、饮食习惯和紧急联系人都应提前同步。"],
  ["n05", "宠物定位器与普通蓝牙防丢器有什么不同", "产品科普", "定位器更关注持续追踪、围栏提醒和户外场景。"],
  ["n06", "狗狗运动量不足有哪些信号", "健康观察", "拆家、焦虑和夜间精力过剩可能与运动量不足有关。"],
  ["n07", "猫咪突然饮水变多要注意什么", "健康观察", "饮水变化可能和天气、饮食，也可能和健康风险有关。"],
  ["n08", "代溜服务如何保障宠物安全", "服务指南", "确认牵引方式、路线、服务记录和异常反馈机制。"],
  ["n09", "宠物成长值能带来什么互动体验", "趣味互动", "任务和徽章让安全习惯更容易坚持。"],
  ["n10", "多宠家庭如何管理设备与档案", "智能生态", "家庭共享、宠物档案和设备分组是多宠管理的基础。"],
  ["n11", "走失黄金时间内该怎么做", "走失预防", "先缩小范围，再组织协寻，并同步宠物照片与关键特征。"],
  ["n12", "智能饮水机的滤芯多久更换", "设备维护", "更换周期要结合水质、宠物数量和使用频率判断。"]
].map(([id, title, category, summary], index) => ({
  id,
  title,
  category,
  summary,
  date: `2026-05-${String(18 + index).padStart(2, "0")}`,
  readTime: `${3 + (index % 4)} 分钟`,
  image: index % 2 === 0 ? "/assets/pets/lifestyle/pet-lifestyle-home-001.jpg" : "/assets/pets/dogs/dog-walking-city-001.jpg"
}));

export const breeds: Breed[] = [
  ["golden-retriever", "金毛寻回犬", "dog", "友善稳定", "中等", "高", "适合家庭陪伴，需要规律运动和毛发护理。", "/assets/pets/dogs/dog-golden-outdoor-001.jpg"],
  ["corgi", "柯基", "dog", "活泼亲人", "中等", "中高", "短腿但精力充沛，注意体重和腰椎压力。", "/assets/pets/dogs/dog-corgi-park-001.jpg"],
  ["shiba", "柴犬", "dog", "独立警觉", "中等", "中", "性格有主见，训练需要稳定边界和正向反馈。", "/assets/pets/dogs/dog-shiba-city-001.jpg"],
  ["border-collie", "边境牧羊犬", "dog", "聪明敏捷", "较高", "高", "学习能力强，需要脑力游戏和充足户外活动。", "/assets/pets/dogs/dog-border-collie-001.jpg"],
  ["poodle", "贵宾犬", "dog", "聪明亲近", "中等", "中", "适合城市家庭，毛发需要定期修剪。", "/assets/pets/dogs/dog-poodle-home-001.jpg"],
  ["labrador", "拉布拉多", "dog", "开朗可靠", "中等", "高", "食欲旺盛，需要管理体重并保持运动。", "/assets/pets/dogs/dog-labrador-yard-001.jpg"],
  ["samoyed", "萨摩耶", "dog", "热情温和", "较高", "高", "毛量丰厚，夏季要避暑并注意梳毛。", "/assets/pets/dogs/dog-samoyed-bright-001.jpg"],
  ["beagle", "比格犬", "dog", "好奇外向", "中等", "中高", "嗅觉驱动强，外出建议全程牵引。", "/assets/pets/dogs/dog-beagle-walk-001.jpg"],
  ["french-bulldog", "法国斗牛犬", "dog", "安静粘人", "中等", "低中", "短鼻犬要避免高温剧烈运动。", "/assets/pets/dogs/dog-frenchie-home-001.jpg"],
  ["husky", "哈士奇", "dog", "外向精力旺", "较高", "高", "需要大量运动和防走失管理。", "/assets/pets/dogs/dog-husky-outdoor-001.jpg"],
  ["british-shorthair", "英短", "cat", "安静稳重", "中等", "中", "圆润亲人，注意体重控制和日常梳毛。", "/assets/pets/cats/cat-british-home-001.jpg"],
  ["ragdoll", "布偶猫", "cat", "温顺亲近", "中等", "低中", "毛发较长，需要规律梳理和环境稳定。", "/assets/pets/cats/cat-ragdoll-window-001.jpg"],
  ["maine-coon", "缅因猫", "cat", "温和大方", "较高", "中", "体型较大，需要更宽敞活动空间。", "/assets/pets/cats/cat-maine-coon-001.jpg"],
  ["orange-cat", "橘猫", "cat", "亲人贪吃", "较低", "中", "饮食管理是重点，适合建立喂养记录。", "/assets/pets/cats/cat-orange-sofa-001.jpg"],
  ["siamese", "暹罗猫", "cat", "聪明爱交流", "中等", "中高", "互动需求高，适合陪伴时间较多的家庭。", "/assets/pets/cats/cat-siamese-home-001.jpg"],
  ["american-shorthair", "美短", "cat", "活泼适应强", "较低", "中", "适应能力好，日常注意运动和牙齿护理。", "/assets/pets/cats/cat-american-short-001.jpg"],
  ["persian", "波斯猫", "cat", "安静优雅", "较高", "低", "脸部清洁和毛发护理要求较高。", "/assets/pets/cats/cat-persian-soft-001.jpg"],
  ["sphynx", "无毛猫", "cat", "亲人敏感", "较高", "中", "皮肤清洁和保暖需要特别关注。", "/assets/pets/cats/cat-sphynx-home-001.jpg"],
  ["rabbit", "兔子", "small-pet", "安静敏感", "中等", "中", "需要干草、磨牙和安静空间。", "/assets/pets/small-pets/small-rabbit-home-001.jpg"],
  ["hamster", "仓鼠", "small-pet", "夜行好奇", "中等", "中", "笼舍、跑轮和温度稳定很重要。", "/assets/pets/small-pets/small-hamster-001.jpg"],
  ["guinea-pig", "豚鼠", "small-pet", "温和群居", "中等", "低中", "需要维 C、干草和同伴社交。", "/assets/pets/small-pets/small-guinea-pig-001.jpg"],
  ["chinchilla", "龙猫", "small-pet", "敏感活泼", "较高", "中", "怕热，需要浴沙和稳定环境。", "/assets/pets/small-pets/small-chinchilla-001.jpg"],
  ["parrot", "鹦鹉", "small-pet", "聪明爱互动", "较高", "中高", "需要陪伴、玩具和安全飞行空间。", "/assets/pets/small-pets/small-parrot-001.jpg"]
].map(([slug, name, species, temperament, careLevel, activity, summary, image]) => ({
  slug,
  name,
  species: species as Breed["species"],
  temperament,
  careLevel,
  activity,
  summary,
  image
}));

export const funFacts: FunFact[] = Array.from({ length: 30 }, (_, index) => {
  const types = ["定位器科普", "走失预防", "喂养知识", "品种知识", "寄养注意事项", "代溜安全", "智能设备知识"];
  const bodies = [
    "电子围栏不是限制宠物自由，而是在宠物离开安全区域时第一时间提醒主人。",
    "外出前确认定位器电量，可以把突发走失时的搜索范围缩小很多。",
    "突然换粮容易引起肠胃不适，建议用 7 天左右逐步过渡。",
    "短鼻犬在湿热天气更容易呼吸吃力，遛狗应避开正午。",
    "寄养前同步疫苗、过敏和日常作息，比只看环境更重要。",
    "代溜路线应尽量固定，并避免第一次服务就去复杂陌生区域。",
    "智能饮水设备的价值不只在供水，也在提醒主人观察饮水变化。"
  ];
  return {
    id: `fact-${String(index + 1).padStart(2, "0")}`,
    type: types[index % types.length],
    title: "你知道吗？",
    body: bodies[index % bodies.length]
  };
});

export const funModules = [
  { title: "每日遛狗任务", value: "20-45 分钟", text: "按体型与天气生成今日任务。" },
  { title: "宠物成长值", value: "+128", text: "完成安全、运动和喂养任务累积成长值。" },
  { title: "安全守护勋章", value: "6 枚", text: "电子围栏、准时充电、连续打卡都可点亮。" },
  { title: "城市探索", value: "18 个点位", text: "把常去路线变成宠物友好地图。" },
  { title: "连续打卡", value: "14 天", text: "帮助主人建立稳定养宠节奏。" }
];

export const services: Service[] = [
  {
    id: "boarding",
    name: "宠物寄养",
    summary: "面向合作门店的寄养展示、预约线索和服务记录方案。",
    points: ["寄养环境展示", "宠物档案同步", "异常情况记录", "寄养监控规划"],
    image: "/assets/pets/service-scenes/service-boarding-room-001.jpg"
  },
  {
    id: "walking",
    name: "宠物代溜",
    summary: "围绕安全路线、牵引规范、服务打卡和轨迹记录设计。",
    points: ["路线打卡", "服务照片", "异常提醒", "安全牵引规范"],
    image: "/assets/pets/service-scenes/service-dog-walking-001.jpg"
  },
  {
    id: "store",
    name: "门店合作",
    summary: "为宠物门店提供轻量入驻展示与服务内容管理入口。",
    points: ["门店资料", "服务项目", "素材管理", "客户线索"],
    image: "/assets/pets/service-scenes/service-store-front-001.jpg"
  },
  {
    id: "monitor",
    name: "寄养监控方案",
    summary: "未来接入监控设备后，为主人提供透明、安心的寄养体验。",
    points: ["画面留存", "巡检记录", "设备状态", "家庭共享"],
    image: "/assets/pets/service-scenes/service-boarding-monitor-001.jpg"
  }
];
