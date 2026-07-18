import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";

type Dict = Record<string, { ru: string; en: string }>;

export const dict = {
  "nav.home": { ru: "Главная", en: "Home" },
  "nav.planets": { ru: "Планеты", en: "Planets" },
  "nav.galaxies": { ru: "Галактики", en: "Galaxies" },
  "nav.stars": { ru: "Звёзды", en: "Stars" },
  "nav.blackholes": { ru: "Чёрные дыры", en: "Black Holes" },
  "nav.missions": { ru: "Миссии", en: "Missions" },
  "nav.timeline": { ru: "Хронология", en: "Timeline" },
  "nav.map": { ru: "3D-карта", en: "3D Map" },
  "nav.about": { ru: "О проекте", en: "About" },

  "hero.eyebrow": { ru: "Открытая энциклопедия космоса", en: "Open cosmos encyclopedia" },
  "hero.title": {
    ru: "Вся Вселенная\nв одном месте",
    en: "The entire Universe\nin one place",
  },
  "hero.sub": {
    ru: "3D-модели планет, интерактивная карта галактик и глубокие статьи обо всём, что находится за пределами Земли. Больше, чем Википедия — живая и заманчивая.",
    en: "3D planet models, interactive galaxy map and deep-dive articles about everything beyond Earth. More than Wikipedia — alive and immersive.",
  },
  "hero.cta.explore": { ru: "Исследовать", en: "Explore" },
  "hero.cta.map": { ru: "Открыть 3D-карту", en: "Open 3D map" },

  "sections.explore": { ru: "Разделы", en: "Sections" },
  "sections.explore.sub": {
    ru: "Начните путешествие с любой темы — все связаны между собой.",
    en: "Start your journey from any topic — everything is connected.",
  },

  "cta.readMore": { ru: "Читать", en: "Read" },
  "cta.viewAll": { ru: "Смотреть все", en: "View all" },

  "planets.title": { ru: "Планеты Солнечной системы", en: "Planets of the Solar System" },
  "planets.sub": {
    ru: "Восемь миров, каждый со своей историей, орбитой и характером.",
    en: "Eight worlds, each with its own story, orbit and character.",
  },

  "galaxies.title": { ru: "Галактики", en: "Galaxies" },
  "galaxies.sub": {
    ru: "От Млечного Пути до отдалённых квазаров на краю наблюдаемой Вселенной.",
    en: "From the Milky Way to distant quasars at the edge of the observable Universe.",
  },

  "stars.title": { ru: "Звёзды", en: "Stars" },
  "stars.sub": {
    ru: "Термоядерные печи, где рождаются все элементы.",
    en: "Thermonuclear furnaces where every element is forged.",
  },

  "bh.title": { ru: "Чёрные дыры", en: "Black Holes" },
  "bh.sub": {
    ru: "Область пространства, где гравитация побеждает всё, включая свет.",
    en: "Regions of space where gravity defeats everything, even light.",
  },

  "missions.title": { ru: "Космические миссии", en: "Space Missions" },
  "missions.sub": {
    ru: "От Sputnik-1 до James Webb и Artemis.",
    en: "From Sputnik-1 to James Webb and Artemis.",
  },

  "timeline.title": { ru: "Хронология Вселенной", en: "Timeline of the Universe" },
  "timeline.sub": {
    ru: "13.8 миллиардов лет за одну прокрутку.",
    en: "13.8 billion years in a single scroll.",
  },

  "map.title": { ru: "3D-карта космоса", en: "3D Cosmos Map" },
  "map.sub": {
    ru: "Крутите, приближайте, кликайте по объектам. Работает в браузере через WebGL.",
    en: "Rotate, zoom, click on objects. Runs in browser via WebGL.",
  },
  "map.hint": {
    ru: "Перетаскивайте, чтобы вращать. Колесо — масштаб. Клик по звезде — подробнее.",
    en: "Drag to rotate. Wheel to zoom. Click a star for details.",
  },

  "about.title": { ru: "О проекте", en: "About" },

  "planet.mass": { ru: "Масса", en: "Mass" },
  "planet.radius": { ru: "Радиус", en: "Radius" },
  "planet.day": { ru: "Сутки", en: "Day length" },
  "planet.year": { ru: "Год", en: "Year length" },
  "planet.moons": { ru: "Спутники", en: "Moons" },
  "planet.distance": { ru: "Расстояние от Солнца", en: "Distance from Sun" },
  "planet.temp": { ru: "Средняя температура", en: "Average temperature" },
  "planet.gravity": { ru: "Гравитация", en: "Gravity" },

  "footer.tag": {
    ru: "ccosmos.space — открытая энциклопедия космоса",
    en: "ccosmos.space — open cosmos encyclopedia",
  },
  "footer.contribute": { ru: "Внести вклад", en: "Contribute" },

  "notFound.title": { ru: "Потерялись в космосе", en: "Lost in space" },
  "notFound.sub": {
    ru: "Такой страницы не существует в наблюдаемой Вселенной.",
    en: "This page does not exist in the observable universe.",
  },
  "notFound.back": { ru: "На главную", en: "Go home" },
} as const satisfies Dict;

export type DictKey = keyof typeof dict;

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
}

const I18nContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "ccosmos.lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ru" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  const t = (k: DictKey) => dict[k][lang];

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="glass inline-flex items-center rounded-full p-1 text-xs font-medium">
      <button
        onClick={() => setLang("ru")}
        className={`px-3 py-1 rounded-full transition ${lang === "ru" ? "bg-white/15 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={lang === "ru"}
      >
        RU
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full transition ${lang === "en" ? "bg-white/15 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
