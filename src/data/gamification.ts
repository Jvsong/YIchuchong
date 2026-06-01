import type { GamificationConfig } from "./types";

export const gamification: GamificationConfig = {
  modules: [
    { title: "每日遛狗任务", value: "20-45 分钟", text: "按体型、天气和定位器状态生成今日任务。" },
    { title: "宠物成长值", value: "+128", text: "完成安全、运动、阅读和喂养任务累积成长值。" },
    { title: "安全守护勋章", value: "6 枚", text: "电子围栏、准时充电、连续打卡都可点亮。" },
    { title: "城市探索", value: "18 个点位", text: "把常去路线变成宠物友好地图。" },
    { title: "连续打卡", value: "14 天", text: "帮助主人建立稳定养宠节奏。" },
    { title: "排行榜模拟", value: "TOP 12", text: "后续可按家庭、门店或城市探索范围展示。" }
  ],
  tasks: [
    { id: "walk-safe", title: "开启电子围栏并完成安全散步", category: "定位器", points: 30, summary: "出门前确认设备在线，结束后生成路线复盘。", linkedData: "定位器轨迹", status: "今日推荐" },
    { id: "read-fact", title: "阅读一条走失预防科普", category: "内容", points: 8, summary: "用 2 分钟复习一次走失协寻要点。", linkedData: "funFacts", status: "可完成" },
    { id: "ai-plan", title: "生成今日养宠建议", category: "养宠建议", points: 12, summary: "根据天气、体型和健康状态调整运动强度。", linkedData: "aiRules", status: "可完成" },
    { id: "water-check", title: "记录一次饮水观察", category: "健康", points: 10, summary: "为后续智能饮水机趋势分析预留数据。", linkedData: "智能饮水机", status: "未来联动" }
  ],
  badges: [
    { id: "fence-keeper", name: "围栏守护者", requirement: "连续 7 天开启电子围栏", level: "基础" },
    { id: "route-master", name: "路线规划师", requirement: "完成 10 条安全路线打卡", level: "进阶" },
    { id: "care-streak", name: "稳定陪伴者", requirement: "连续 30 天完成养宠任务", level: "稀有" }
  ],
  explorationSpots: [
    { id: "park", name: "晨间公园", scene: "户外散步", unlockRule: "完成 3 次公园路线打卡" },
    { id: "store", name: "友好门店", scene: "门店合作", unlockRule: "收藏 1 家合作门店" },
    { id: "home", name: "安心小窝", scene: "居家照护", unlockRule: "完成 5 次饮水或喂养记录" }
  ],
  rankings: [
    { id: "u1", name: "林同学", petName: "布丁", score: 1280, streak: 14 },
    { id: "u2", name: "周小姐", petName: "栗子", score: 1160, streak: 11 },
    { id: "u3", name: "陈先生", petName: "小七", score: 980, streak: 8 }
  ],
  growthRules: ["完成安全类任务加 20-40 分", "阅读科普加 5-10 分", "养宠计划生成加 12 分", "连续打卡会触发倍率奖励"]
};

export const funModules = gamification.modules;
