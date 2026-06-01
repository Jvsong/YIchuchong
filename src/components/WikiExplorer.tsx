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
  const visibleBreeds = useMemo(
    () => breeds.filter((breed) => active === "all" || breed.species === active),
    [active, breeds]
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
      <div className="grid cols-4">
        {visibleBreeds.map((breed) => <BreedCard key={breed.slug} breed={breed} />)}
      </div>
    </div>
  );
}
