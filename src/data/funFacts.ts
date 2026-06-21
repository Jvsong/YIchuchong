import type { FunFact, LocalizedText } from "./types";

const categories = ["定位器科普", "走失预防", "喂养知识", "品种知识", "寄养注意事项", "代溜安全", "智能设备知识", "新手养宠"];
const bodies: LocalizedText[] = [
  { zh: "电子围栏不是限制宠物自由，而是在宠物离开安全区域时第一时间提醒主人。", en: "A geo-fence isn't about limiting freedom — it alerts the owner the moment a pet leaves the safe zone." },
  { zh: "外出前确认定位器电量，可以把突发走失时的搜索范围缩小很多。", en: "Checking the tracker's battery before heading out greatly narrows the search area if a pet goes missing." },
  { zh: "突然换粮容易引起肠胃不适，建议用 7 天左右逐步过渡。", en: "Switching food abruptly can upset the stomach; transition gradually over about 7 days." },
  { zh: "短鼻犬在湿热天气更容易呼吸吃力，遛狗应避开正午。", en: "Flat-faced dogs struggle to breathe in hot, humid weather — avoid walking them at noon." },
  { zh: "寄养前同步疫苗、过敏和日常作息，比只看环境更重要。", en: "Sharing vaccines, allergies and routine before boarding matters more than just checking the environment." },
  { zh: "代溜路线应尽量固定，并避免第一次服务就去复杂陌生区域。", en: "Keep walking routes consistent and avoid complex, unfamiliar areas on the first service." },
  { zh: "智能饮水设备的价值不只在供水，也在提醒主人观察饮水变化。", en: "A smart fountain's value isn't only supplying water — it prompts owners to watch hydration changes." },
  { zh: "多宠家庭建议给每只宠物建立单独档案，避免设备和喂养记录混淆。", en: "Multi-pet families should keep a separate profile per pet to avoid mixing device and feeding records." },
  { zh: "走失协寻时要优先提供清晰近照、最后位置和联系方式。", en: "When searching for a lost pet, prioritize a clear recent photo, last location and contact details." },
  { zh: "猫咪饮水突然变化时，记录时间、饮食和尿团变化会更有帮助。", en: "When a cat's water intake changes suddenly, logging time, diet and litter-clump changes helps." }
];

const scopes = ["home", "locator", "devices", "ai-care", "wiki", "news", "fun", "boarding", "walking", "about"];

export const funFacts: FunFact[] = Array.from({ length: 60 }, (_, index) => {
  const category = categories[index % categories.length];
  const scope = scopes[index % scopes.length];
  return {
    id: `fact-${String(index + 1).padStart(2, "0")}`,
    category,
    type: category,
    title: { zh: "你知道吗？", en: "Did you know?" },
    body: bodies[index % bodies.length],
    pageScope: ["global", scope],
    priority: 100 - index,
    relatedLink: scope === "home" ? "/" : `/${scope === "ai-care" ? "ai-care" : scope}`,
    enabled: true
  };
});
