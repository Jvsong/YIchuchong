#!/usr/bin/env node
/**
 * 一次性迁移：把 storage/*.json 里历史的中文枚举值改写为稳定英文 ID，
 * 并删除已废弃的 statusLabel 字段。幂等，可重复执行。
 *
 *   node scripts/migrate-enums.mjs
 */
import fs from "node:fs";
import path from "node:path";

const STORAGE_DIR = path.join(process.cwd(), "storage");

const LEGACY = {
  "核心产品": "core", "生态规划": "planned", "即将接入": "coming-soon", "未来能力": "future",
  "展示中": "available",
  "已发布": "published", "草稿": "draft",
  "今日推荐": "recommended", "可完成": "available", "未来联动": "future",
  "基础": "basic", "进阶": "advanced", "稀有": "rare"
};

if (!fs.existsSync(STORAGE_DIR)) {
  console.log("没有 storage/ 目录，无需迁移。");
  process.exit(0);
}

let changed = 0;
for (const file of fs.readdirSync(STORAGE_DIR)) {
  if (!file.endsWith(".json")) continue;
  const full = path.join(STORAGE_DIR, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(full, "utf-8"));
  } catch {
    console.warn(`跳过无法解析的文件：${file}`);
    continue;
  }
  if (!Array.isArray(data)) continue;
  let fileChanged = false;
  const next = data.map((item) => {
    if (!item || typeof item !== "object") return item;
    const rec = { ...item };
    if (typeof rec.status === "string" && LEGACY[rec.status]) {
      rec.status = LEGACY[rec.status];
      fileChanged = true;
    }
    if ("statusLabel" in rec) {
      delete rec.statusLabel;
      fileChanged = true;
    }
    return rec;
  });
  if (fileChanged) {
    fs.writeFileSync(full, JSON.stringify(next, null, 2), "utf-8");
    changed++;
    console.log(`已迁移：${file}`);
  }
}
console.log(changed ? `完成，共更新 ${changed} 个文件。` : "无需更新（已是最新）。");
