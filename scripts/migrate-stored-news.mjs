import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const storagePath = resolve(root, "storage/news.json");
if (!existsSync(storagePath)) process.exit(0);

const source = readFileSync(resolve(root, "src/data/news.ts"), "utf8");
const meta = new Map();
const pattern = /^\s*(n\d+): \{ category: "([^"]+)", coverImage: "([^"]+)", products: \[([^\]]*)\], services: \[([^\]]*)\] \},?$/gm;
for (const match of source.matchAll(pattern)) {
  const values = (raw) => [...raw.matchAll(/"([^"]+)"/g)].map((item) => item[1]);
  meta.set(match[1], { category: match[2], coverImage: match[3], products: values(match[4]), services: values(match[5]) });
}

const rows = JSON.parse(readFileSync(storagePath, "utf8"));
const migrated = rows.map((item) => {
  const record = meta.get(item.id);
  if (!record) return item;
  const tagsZh = item.tags.join("、");
  const tagsEn = item.tags.join(", ");
  return {
    ...item,
    category: record.category,
    content: {
      zh: `${item.summary.zh}\n\n行动步骤：先确认宠物当前状态、时间和环境，再围绕${tagsZh}逐项记录，不在信息不完整时仓促下结论。\n\n观察清单：记录食欲、饮水、活动、排泄和情绪变化；涉及设备或服务时，同时检查电量、网络、牵引、交接和异常反馈。\n\n风险边界：连续异常、疼痛、呼吸困难或拒食应尽快咨询兽医。设备提醒和科普内容只辅助日常判断。`,
      en: `${item.summary.en}\n\nAction: confirm the pet's current condition, time and environment, then record ${tagsEn} step by step instead of drawing conclusions from incomplete information.\n\nChecklist: track appetite, hydration, activity, toileting and mood. For devices or services, also check battery, network, leash, handoff and incident reporting.\n\nBoundary: persistent symptoms, pain, breathing trouble or refusal to eat need veterinary advice. Devices and educational content only support daily decisions.`
    },
    coverImage: record.coverImage,
    image: record.coverImage,
    relatedProductIds: record.products,
    relatedServiceIds: record.services
  };
});

writeFileSync(storagePath, `${JSON.stringify(migrated, null, 2)}\n`);
console.log(`Migrated ${migrated.length} stored news items.`);
