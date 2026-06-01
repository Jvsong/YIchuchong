"use client";

import { useMemo, useState } from "react";
import { BreedCard } from "@/components/Cards";
import type { Breed } from "@/types";

const filters = [
  { value: "all", label: "全部" },
  { value: "dog", label: "狗狗" },
  { value: "cat", label: "猫咪" },
  { value: "small-pet", label: "小宠" }
] as const;

export function WikiExplorer({ breeds }: { breeds: Breed[] }) {
  const [active, setActive] = useState<(typeof filters)[number]["value"]>("all");
  const [keyword, setKeyword] = useState("");
  const [tag, setTag] = useState("全部");
  const tags = useMemo(() => ["全部", ...Array.from(new Set(breeds.flatMap((breed) => breed.tags))).slice(0, 12)], [breeds]);
  const visibleBreeds = useMemo(
    () => breeds.filter((breed) => {
      const matchSpecies = active === "all" || breed.species === active;
      const matchKeyword = !keyword || [breed.name, breed.englishName, breed.summary, breed.deviceSuggestion].join(" ").toLowerCase().includes(keyword.toLowerCase());
      const matchTag = tag === "全部" || breed.tags.includes(tag);
      return matchSpecies && matchKeyword && matchTag;
    }),
    [active, breeds, keyword, tag]
  );

  return (
    <div className="wiki-explorer">
      <div className="segmented" role="tablist" aria-label="宠物百科分类">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={active === filter.value ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={active === filter.value}
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="filter-row">
        <label className="search-field">
          <span>搜索品种</span>
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="输入品种、性格或设备建议" />
        </label>
        <div className="chip-row" aria-label="百科标签筛选">
          {tags.map((item) => (
            <button className={tag === item ? "active" : ""} key={item} type="button" onClick={() => setTag(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid cols-4">
        {visibleBreeds.map((breed) => <BreedCard key={breed.slug} breed={breed} />)}
      </div>
    </div>
  );
}
