import { planets } from "@/lib/planets-data";
import type { Lang } from "@/lib/i18n";

export interface SearchItem {
  id: string;
  title: { ru: string; en: string };
  subtitle: { ru: string; en: string };
  to: string;
  params?: Record<string, string>;
  keywords: string;
}

const sectionItems: Omit<SearchItem, "id">[] = [
  {
    title: { ru: "Планеты Солнечной системы", en: "Planets of the Solar System" },
    subtitle: { ru: "Восемь миров", en: "Eight worlds" },
    to: "/planets",
    keywords: "planets planet solar system planety planeti solnechnaya sistema",
  },
  {
    title: { ru: "Галактики", en: "Galaxies" },
    subtitle: { ru: "Млечный Путь, Андромеда и другие", en: "Milky Way, Andromeda and more" },
    to: "/galaxies",
    keywords: "galaxies galaxy milky way andromeda galaktiki mlechnyi put",
  },
  {
    title: { ru: "Звёзды", en: "Stars" },
    subtitle: { ru: "Спектральная классификация, жизненный цикл", en: "Spectral classes, life cycle" },
    to: "/stars",
    keywords: "stars star sun sirius zvezdy solnce spektr",
  },
  {
    title: { ru: "Чёрные дыры", en: "Black Holes" },
    subtitle: { ru: "Sagittarius A*, M87*, горизонт событий", en: "Sagittarius A*, M87*, event horizon" },
    to: "/black-holes",
    keywords: "black hole horizon sagittarius m87 chernaya dyra chyornaya",
  },
  {
    title: { ru: "Космические миссии", en: "Space Missions" },
    subtitle: { ru: "От Sputnik-1 до James Webb", en: "From Sputnik-1 to James Webb" },
    to: "/missions",
    keywords: "missions apollo voyager hubble webb sputnik missii kosmicheskie",
  },
  {
    title: { ru: "Хронология Вселенной", en: "Timeline of the Universe" },
    subtitle: { ru: "13.8 миллиардов лет", en: "13.8 billion years" },
    to: "/timeline",
    keywords: "timeline big bang universe hronologia vselennaya bolshoi vzryv",
  },
  {
    title: { ru: "3D-карта космоса", en: "3D Cosmos Map" },
    subtitle: { ru: "Интерактивная 3D-сцена", en: "Interactive 3D scene" },
    to: "/map",
    keywords: "map 3d webgl karta kosmosa scene",
  },
  {
    title: { ru: "О проекте", en: "About" },
    subtitle: { ru: "ccosmos.space", en: "ccosmos.space" },
    to: "/about",
    keywords: "about o proekte info",
  },
];

const planetItems: Omit<SearchItem, "id">[] = planets.map((p) => ({
  title: { ru: p.name.ru, en: p.name.en },
  subtitle: { ru: `Планета · ${p.type.ru}`, en: `Planet · ${p.type.en}` },
  to: "/planets/$slug",
  params: { slug: p.slug },
  keywords: `${p.slug} ${p.name.ru} ${p.name.en} ${p.type.ru} ${p.type.en} planet planeta`,
}));

export const allSearchItems: SearchItem[] = [...planetItems, ...sectionItems].map((it) => ({
  ...it,
  id: it.params?.slug ? `${it.to}:${it.params.slug}` : it.to,
}));

// --- smarter fuzzy scoring ---

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[*.,!?()[\]{}'"`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string): string[] {
  return normalize(s).split(" ").filter(Boolean);
}

// Levenshtein with early exit
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const dp = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) dp[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    let rowMin = dp[0];
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : Math.min(prev, dp[j], dp[j - 1]) + 1;
      prev = tmp;
      if (dp[j] < rowMin) rowMin = dp[j];
    }
    if (rowMin > max) return max + 1;
  }
  return dp[b.length];
}

function scoreToken(hay: string[], q: string): number {
  let best = 0;
  for (const t of hay) {
    if (t === q) return 1;
    if (t.startsWith(q)) best = Math.max(best, 0.85);
    else if (t.includes(q)) best = Math.max(best, 0.6);
    else if (q.length >= 4) {
      const max = q.length <= 5 ? 1 : 2;
      const d = editDistance(t.slice(0, q.length + max), q, max);
      if (d <= max) best = Math.max(best, 0.5 - d * 0.1);
    }
  }
  return best;
}

function scoreItem(item: SearchItem, qTokens: string[], lang: Lang): number {
  const titleTokens = tokens(`${item.title[lang]} ${item.title.ru} ${item.title.en}`);
  const bodyTokens = tokens(`${item.subtitle.ru} ${item.subtitle.en} ${item.keywords}`);
  let score = 0;
  for (const q of qTokens) {
    const t = scoreToken(titleTokens, q);
    const b = scoreToken(bodyTokens, q);
    const s = Math.max(t * 1.5, b);
    if (s === 0) return 0; // require every query token to hit somewhere
    score += s;
  }
  return score;
}

export function searchItems(query: string, lang: Lang, limit = 12): SearchItem[] {
  const q = normalize(query);
  if (!q) return allSearchItems.slice(0, limit);
  const qTokens = tokens(q);
  const scored = allSearchItems
    .map((it) => ({ it, s: scoreItem(it, qTokens, lang) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.it);
  return scored;
}
