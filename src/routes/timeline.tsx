import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const ERAS = [
  { t: "0 s", ru: "Большой взрыв", en: "Big Bang", d_ru: "Начало пространства-времени.", d_en: "Start of spacetime." },
  { t: "10⁻³⁶ s", ru: "Инфляция", en: "Inflation", d_ru: "Экспоненциальное расширение Вселенной.", d_en: "Exponential expansion of the Universe." },
  { t: "3 мин / 3 min", ru: "Нуклеосинтез", en: "Nucleosynthesis", d_ru: "Формирование ядер водорода и гелия.", d_en: "Hydrogen and helium nuclei form." },
  { t: "380 000 лет / years", ru: "Рекомбинация", en: "Recombination", d_ru: "Свет отделяется от материи — реликтовое излучение.", d_en: "Light decouples from matter — CMB." },
  { t: "150 млн / M yrs", ru: "Первые звёзды", en: "First stars", d_ru: "Загораются звёзды Population III.", d_en: "Population III stars ignite." },
  { t: "1 млрд / 1 Byr", ru: "Первые галактики", en: "First galaxies", d_ru: "Собираются гравитационно связанные структуры.", d_en: "Gravitationally bound structures form." },
  { t: "9.2 млрд / 9.2 Byr", ru: "Рождение Солнца", en: "Sun forms", d_ru: "Образуется Солнечная система.", d_en: "The Solar System forms." },
  { t: "13.8 млрд / 13.8 Byr", ru: "Сегодня", en: "Today", d_ru: "Наблюдаемая Вселенная — 93 млрд световых лет.", d_en: "Observable Universe: 93 billion light-years across." },
];

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Хронология Вселенной · ccosmos.space" },
      { name: "description", content: "От Большого взрыва до сегодняшнего дня — 13.8 миллиардов лет истории Вселенной." },
      { property: "og:title", content: "Хронология Вселенной" },
      { property: "og:url", content: "/timeline" },
    ],
    links: [{ rel: "canonical", href: "/timeline" }],
  }),
  component: Timeline,
});

function Timeline() {
  const { t, lang } = useI18n();
  return (
    <div className="py-16 sm:py-24 space-y-16">
      <header className="max-w-3xl">
        <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
          {lang === "ru" ? "13.8 миллиардов лет" : "13.8 billion years"}
        </p>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">{t("timeline.title")}</h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">{t("timeline.sub")}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {ERAS.map((e, i) => (
          <div key={i} className="panel rounded-2xl p-7">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground tabular-nums">{e.t}</div>
            <h3 className="text-2xl font-semibold mt-2 tracking-tight">{lang === "ru" ? e.ru : e.en}</h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{lang === "ru" ? e.d_ru : e.d_en}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
