import type { AiCareRules } from "./types";

// 键为稳定英文 ID（与 AiCareInput 的枚举一致）；备注文案保持中文（本地规则的展示文案）。
export const aiCareRules: AiCareRules = {
  dogBaseMinutes: {
    small: 35,
    medium: 45,
    large: 55
  },
  catBaseMinutes: {
    small: 15,
    medium: 20,
    large: 25
  },
  ageAdjustments: {
    puppy: -8,
    adult: 0,
    senior: -15
  },
  healthAdjustments: {
    healthy: { delta: 0, note: "保留 5 分钟嗅闻、探索或放松时间。" },
    overweight: { delta: 8, note: "保持低到中等强度，用更稳定的频次替代突然加量。" },
    recovery: { delta: -20, note: "减少冲刺和跳跃，必要时遵医嘱暂停运动。" },
    joint: { delta: -15, note: "避免上下台阶和急停急转，观察步态变化。" }
  },
  weatherAdjustments: {
    clear: { delta: 0, note: "可安排常规运动，注意补水。" },
    hot: { delta: -18, note: "避开正午，确认地面温度并补水。" },
    rain: { delta: -10, note: "缩短户外时长，回家擦干脚掌和腹部。" },
    cold: { delta: -6, note: "做好保暖，老年宠物降低强度。" }
  },
  trackerTips: {
    yes: "出门前确认定位器在线、电量充足，建议开启电子围栏。",
    no: "建议外出佩戴定位器，方便记录轨迹并降低走失风险。"
  },
  serviceTips: {
    dog: "可联动代溜服务、城市探索和活动报告。",
    cat: "可联动宠物监控器、智能饮水机和远程喂猫。",
    small: "可联动安全档案、环境观察和监控提醒。"
  }
};
