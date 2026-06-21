"use client";

import { useMemo, useState } from "react";
import { BreedCard } from "@/components/Cards";
import type { Breed } from "@/data/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { pick } from "@/i18n/index";
import { tt } from "@/i18n/terms";

const ALL = "__all__";

export function WikiExplorer({ breeds }: { breeds: Breed[] }) {
  const { locale, dict } = useLocale();
  const filters = [
    { value: "all", label: dict.explorer.all },
    { value: "dog", label: dict.card.speciesDog },
    { value: "cat", label: dict.card.speciesCat },
    { value: "small-pet", label: dict.card.speciesSmall }
  ] as const;
  const [active, setActive] = useState<(typeof filters)[number]["value"]>("all");
  const [keyword, setKeyword] = useState("");
  const [tag, setTag] = useState(ALL);
  const tags = useMemo(() => [ALL, ...Array.from(new Set(breeds.flatMap((breed) => breed.tags))).slice(0, 12)], [breeds]);
  const visibleBreeds = useMemo(
    () => breeds.filter((breed) => {
      const matchSpecies = active === "all" || breed.species === active;
      const haystack = [breed.name.zh, breed.name.en, breed.englishName, breed.summary.zh, breed.summary.en, breed.deviceSuggestion.zh, breed.deviceSuggestion.en]
        .join(" ")
        .toLowerCase();
      const matchKeyword = !keyword || haystack.includes(keyword.toLowerCase());
      const matchTag = tag === ALL || breed.tags.includes(tag);
      return matchSpecies && matchKeyword && matchTag;
    }),
    [active, breeds, keyword, tag]
  );

  return (
    <div className="wiki-explorer">
      <div className="segmented" role="tablist" aria-label={dict.a11y.wikiCategory}>
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
          <span>{dict.explorer.searchBreed}</span>
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder={dict.explorer.searchBreedPlaceholder} />
        </label>
        <div className="chip-row" aria-label={dict.explorer.tagAria}>
          {tags.map((item) => (
            <button className={tag === item ? "active" : ""} key={item} type="button" onClick={() => setTag(item)}>
              {item === ALL ? dict.explorer.all : tt(item, locale)}
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
