import type { FunFact } from "./types";

const categories = ["定位器科普", "走失预防", "喂养知识", "品种知识", "寄养注意事项", "代溜安全", "智能设备知识", "新手养宠"];
const bodies = [
  "电子围栏不是限制宠物自由，而是在宠物离开安全区域时第一时间提醒主人。",
  "外出前确认定位器电量，可以把突发走失时的搜索范围缩小很多。",
  "突然换粮容易引起肠胃不适，建议用 7 天左右逐步过渡。",
  "短鼻犬在湿热天气更容易呼吸吃力，遛狗应避开正午。",
  "寄养前同步疫苗、过敏和日常作息，比只看环境更重要。",
  "代溜路线应尽量固定，并避免第一次服务就去复杂陌生区域。",
  "智能饮水设备的价值不只在供水，也在提醒主人观察饮水变化。",
  "多宠家庭建议给每只宠物建立单独档案，避免设备和喂养记录混淆。",
  "走失协寻时要优先提供清晰近照、最后位置和联系方式。",
  "猫咪饮水突然变化时，记录时间、饮食和尿团变化会更有帮助。"
];

const scopes = ["home", "locator", "devices", "ai-care", "wiki", "news", "fun", "boarding", "walking", "about"];

export const funFacts: FunFact[] = Array.from({ length: 60 }, (_, index) => {
  const category = categories[index % categories.length];
  const scope = scopes[index % scopes.length];
  return {
    id: `fact-${String(index + 1).padStart(2, "0")}`,
    category,
    type: category,
    title: "你知道吗？",
    body: bodies[index % bodies.length],
    pageScope: ["global", scope],
    priority: 100 - index,
    relatedLink: scope === "home" ? "/" : `/${scope === "ai-care" ? "ai-care" : scope}`,
    enabled: true,
    status: "启用"
  };
});
