import type { AiCareRules } from "./types";

export const aiCareRules: AiCareRules = {
  dogBaseMinutes: {
    "小型": 35,
    "中型": 45,
    "中大型": 55
  },
  catBaseMinutes: {
    "小型": 15,
    "中型": 20,
    "中大型": 25
  },
  ageAdjustments: {
    "幼年": -8,
    "成年": 0,
    "老年": -15
  },
  healthAdjustments: {
    "健康": { delta: 0, note: "保留 5 分钟嗅闻、探索或放松时间。" },
    "轻微超重": { delta: 8, note: "保持低到中等强度，用更稳定的频次替代突然加量。" },
    "术后恢复": { delta: -20, note: "减少冲刺和跳跃，必要时遵医嘱暂停运动。" },
    "关节敏感": { delta: -15, note: "避免上下台阶和急停急转，观察步态变化。" }
  },
  weatherAdjustments: {
    "晴朗": { delta: 0, note: "可安排常规运动，注意补水。" },
    "炎热": { delta: -18, note: "避开正午，确认地面温度并补水。" },
    "小雨": { delta: -10, note: "缩短户外时长，回家擦干脚掌和腹部。" },
    "寒冷": { delta: -6, note: "做好保暖，老年宠物降低强度。" }
  },
  trackerTips: {
    "已佩戴": "出门前确认定位器在线、电量充足，建议开启电子围栏。",
    "未佩戴": "建议外出佩戴定位器，方便记录轨迹并降低走失风险。"
  },
  serviceTips: {
    "狗狗": "可联动代溜服务、城市探索和活动报告。",
    "猫咪": "可联动宠物监控器、智能饮水机和远程喂猫。",
    "小宠": "可联动安全档案、环境观察和监控提醒。"
  }
};
