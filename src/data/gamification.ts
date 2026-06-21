import type { GamificationConfig } from "./types";

export const gamification: GamificationConfig = {
  modules: [
    { title: { zh: "每日遛狗任务", en: "Daily Walk Task" }, value: "20-45 分钟", text: { zh: "按体型、天气和定位器状态生成今日任务。", en: "Today's task generated from size, weather and tracker status." } },
    { title: { zh: "宠物成长值", en: "Pet Growth Points" }, value: "+128", text: { zh: "完成安全、运动、阅读和喂养任务累积成长值。", en: "Earn growth points by completing safety, exercise, reading and feeding tasks." } },
    { title: { zh: "安全守护勋章", en: "Safety Badges" }, value: "6 枚", text: { zh: "电子围栏、准时充电、连续打卡都可点亮。", en: "Light them up with geo-fences, on-time charging and streak check-ins." } },
    { title: { zh: "城市探索", en: "City Exploration" }, value: "18 个点位", text: { zh: "把常去路线变成宠物友好地图。", en: "Turn frequent routes into a pet-friendly map." } },
    { title: { zh: "连续打卡", en: "Check-in Streak" }, value: "14 天", text: { zh: "帮助主人建立稳定养宠节奏。", en: "Helps owners build a steady care rhythm." } },
    { title: { zh: "排行榜模拟", en: "Leaderboard Demo" }, value: "TOP 12", text: { zh: "后续可按家庭、门店或城市探索范围展示。", en: "Can later be shown by family, store or city-exploration scope." } }
  ],
  tasks: [
    { id: "walk-safe", title: { zh: "开启电子围栏并完成安全散步", en: "Enable the geo-fence and finish a safe walk" }, category: "定位器", points: 30, summary: { zh: "出门前确认设备在线，结束后生成路线复盘。", en: "Confirm the device is online before leaving; generate a route review after." }, linkedData: "定位器轨迹", status: "recommended" },
    { id: "read-fact", title: { zh: "阅读一条走失预防科普", en: "Read a loss-prevention tip" }, category: "内容", points: 8, summary: { zh: "用 2 分钟复习一次走失协寻要点。", en: "Spend 2 minutes reviewing lost-pet search essentials." }, linkedData: "funFacts", status: "available" },
    { id: "ai-plan", title: { zh: "生成今日养宠建议", en: "Generate today's care advice" }, category: "养宠建议", points: 12, summary: { zh: "根据天气、体型和健康状态调整运动强度。", en: "Adjust exercise intensity by weather, size and health." }, linkedData: "aiRules", status: "available" },
    { id: "water-check", title: { zh: "记录一次饮水观察", en: "Log a hydration observation" }, category: "健康", points: 10, summary: { zh: "为后续智能饮水机趋势分析预留数据。", en: "Reserve data for future smart-fountain trend analysis." }, linkedData: "智能饮水机", status: "future" }
  ],
  badges: [
    { id: "fence-keeper", name: { zh: "围栏守护者", en: "Fence Keeper" }, requirement: { zh: "连续 7 天开启电子围栏", en: "Enable the geo-fence 7 days in a row" }, level: "basic" },
    { id: "route-master", name: { zh: "路线规划师", en: "Route Planner" }, requirement: { zh: "完成 10 条安全路线打卡", en: "Complete 10 safe-route check-ins" }, level: "advanced" },
    { id: "care-streak", name: { zh: "稳定陪伴者", en: "Steady Companion" }, requirement: { zh: "连续 30 天完成养宠任务", en: "Complete care tasks 30 days in a row" }, level: "rare" }
  ],
  explorationSpots: [
    { id: "park", name: { zh: "晨间公园", en: "Morning Park" }, scene: { zh: "户外散步", en: "Outdoor walks" }, unlockRule: { zh: "完成 3 次公园路线打卡", en: "Complete 3 park-route check-ins" } },
    { id: "store", name: { zh: "友好门店", en: "Friendly Store" }, scene: { zh: "门店合作", en: "Store partnership" }, unlockRule: { zh: "收藏 1 家合作门店", en: "Save 1 partner store" } },
    { id: "home", name: { zh: "安心小窝", en: "Cozy Home" }, scene: { zh: "居家照护", en: "Home care" }, unlockRule: { zh: "完成 5 次饮水或喂养记录", en: "Log 5 hydration or feeding records" } }
  ],
  rankings: [
    { id: "u1", name: "林同学", petName: "布丁", score: 1280, streak: 14 },
    { id: "u2", name: "周小姐", petName: "栗子", score: 1160, streak: 11 },
    { id: "u3", name: "陈先生", petName: "小七", score: 980, streak: 8 }
  ],
  growthRules: [
    { zh: "完成安全类任务加 20-40 分", en: "Safety tasks add 20-40 points" },
    { zh: "阅读科普加 5-10 分", en: "Reading tips adds 5-10 points" },
    { zh: "养宠计划生成加 12 分", en: "Generating a care plan adds 12 points" },
    { zh: "连续打卡会触发倍率奖励", en: "Streak check-ins trigger multiplier rewards" }
  ]
};

export const funModules = gamification.modules;
