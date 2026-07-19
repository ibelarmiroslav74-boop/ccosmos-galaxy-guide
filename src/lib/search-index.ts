import { planets } from "@/lib/planets-data";
import type { Lang } from "@/lib/i18n";

export interface SearchItem {
  title: { ru: string; en: string };
  subtitle: { ru: string; en: string };
  to: string;
  params?: Record<string, string>;
  keywords: string;
}

const sectionItems: SearchItem[] = [
  {
    title: { ru: "Планеты Солнечной системы", en: "Planets of the Solar System" },
    subtitle: { ru: "Восемь миров", en: "Eight worlds" },
    to: "/planets",
    keywords: "planets planet solar system planety planeti solnechnaya",
  },
  {
    title: { ru: "Галактики", en: "Galaxies" },
    subtitle: { ru: "Млечный Путь, Андромеда и другие", en: "Milky Way, Andromeda and more" },
    to: "/galaxies",
    keywords: "galaxies galaxy milky way andromeda galaktiki",
  },
  {
    title: { ru: "Звёзды", en: "Stars" },
    subtitle: { ru: "Спектральная классификация, жизненный цикл", en: "Spectral classes, life cycle" },
    to: "/stars",
    keywords: "stars star sun sirius zvezdy solnce",
  },
  {
    title: { ru: "Чёрные дыры", en: "Black Holes" },
    subtitle: { ru: "Sagittarius A*, M87*, горизонт событий", en: "Sagittarius A*, M87*, event horizon" },
    to: "/black-holes",
    keywords: "black hole horizon sagittarius m87 chernaya dyra",
  },
  {
    title: { ru: "Космические миссии", en: "Space Missions" },
    subtitle: { ru: "От Sputnik-1 до James Webb", en: "From Sputnik-1 to James Webb" },
    to: "/missions",
    keywords: "missions apollo voyager hubble webb sputnik missii",
  },
  {
    title: { ru: "Хронология Вселенной", en: "Timeline of the Universe" },
    subtitle: { ru: "13.8 миллиардов лет", en: "13.8 billion years" },
    to: "/timeline",
    keywords: "timeline big bang universe hronologia vselennaya",
  },
  {
    title: { ru: "3D-карта космоса", en: "3D Cosmos Map" },
    subtitle: { ru: "Интерактивная 3D-сцена", en: "Interactive 3D scene" },
    to: "/map",
    keywords: "map 3d webgl karta kosmosa",
  },
  {
    title: { ru: "О проекте", en: "About" },
    subtitle: { ru: "ccosmos.space", en: "ccosmos.space" },
    to: "/about",
    keywords: "about o proekte",
  },
];

const planetItems: SearchItem[] = planets.map((p) => ({
  title: { ru: p.name.ru, en: p.name.en },
  subtitle: { ru: `Планета · ${p.type.ru}`, en: `Planet · ${p.type.en}` },
  to: "/planets/$slug",
  params: { slug: p.slug },
  keywords: `${p.slug} ${p.name.ru} ${p.name.en} ${p.type.ru} ${p.type.en} planet planeta`,
}));

export const allSearchItems: SearchItem[] = [...planetItems, ...sectionItems];

export function searchItems(query: string, lang: Lang, limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return allSearchItems.slice(0, limit);
  return allSearchItems
    .filter((it) => {
      const hay = `${it.title.ru} ${it.title.en} ${it.subtitle.ru} ${it.subtitle.en} ${it.keywords}`.toLowerCase();
      return hay.includes(q);
    })
    .slice(0, limit);
}
