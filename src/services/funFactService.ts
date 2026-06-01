import { funFacts } from "@/data/funFacts";

export function getFunFacts(scope = "global") {
  return funFacts
    .filter((item) => item.enabled && (item.pageScope.includes("global") || item.pageScope.includes(scope)))
    .sort((a, b) => b.priority - a.priority);
}
