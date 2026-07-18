import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const GALAXIES = [
  { name: { ru: "Млечный Путь", en: "Milky Way" }, type: { ru: "Спиральная с перемычкой", en: "Barred spiral" }, dist: "0", stars: "~100–400 млрд / ~100–400B", color: "#a5b4fc" },
  { name: { ru: "Андромеда (M31)", en: "Andromeda (M31)" }, type: { ru: "Спиральная", en: "Spiral" }, dist: "2.537 Mly", stars: "~1T", color: "#f7c9ff" },
  { name: { ru: "Треугольник (M33)", en: "Triangulum (M33)" }, type: { ru: "Спиральная", en: "Spiral" }, dist: "2.73 Mly", stars: "~40B", color: "#d5b3ff" },
  { name: { ru: "БМО", en: "LMC" }, type: { ru: "Карликовая", en: "Dwarf irregular" }, dist: "163 kly", stars: "~30B", color: "#ffd1a1" },
  { name: { ru: "Сомбреро (M104)", en: "Sombrero (M104)" }, type: { ru: "Линзовидная", en: "Lenticular" }, dist: "29.3 Mly", stars: "~800B", color: "#ffb84d" },
  { name: { ru: "Водоворот (M51)", en: "Whirlpool (M51)" }, type: { ru: "Спиральная", en: "Spiral" }, dist: "23.16 Mly", stars: "~160B", color: "#7fd0ff" },
];

export const Route = createFileRoute("/galaxies")({
  head: () => ({
    meta: [
      { title: "Галактики · ccosmos.space" },
      { name: "description", content: "Обзор галактик: Млечный Путь, Андромеда, спиральные, эллиптические, карликовые." },
      { property: "og:title", content: "Галактики" },
      { property: "og:url", content: "/galaxies" },
    ],
    links: [{ rel: "canonical", href: "/galaxies" }],
  }),
  component: Galaxies,
});

function Galaxies() {
  const { t, lang } = useI18n();
  return (
    <div>
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gradient">{t("galaxies.title")}</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">{t("galaxies.sub")}</p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GALAXIES.map((g) => (
          <article key={g.name.en} className="glass rounded-2xl p-5 overflow-hidden relative">
            <div
              className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: g.color }}
            />
            <div className="relative">
              <div className="aspect-video rounded-xl mb-4 overflow-hidden relative"
                style={{ background: `radial-gradient(ellipse at center, ${g.color} 0%, transparent 60%), radial-gradient(circle at 50% 50%, #fff 0%, transparent 3%), #05070f` }}>
                <div className="absolute inset-0 animate-spin-slow" style={{
                  background: `conic-gradient(from 0deg, transparent 0deg, ${g.color}30 60deg, transparent 120deg, ${g.color}30 240deg, transparent 300deg)`,
                  animationDuration: "60s",
                }} />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{g.type[lang]}</div>
              <h3 className="font-display text-xl font-semibold mt-1">{g.name[lang]}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div><dt className="text-muted-foreground text-xs">{lang === "ru" ? "Расстояние" : "Distance"}</dt><dd>{g.dist}</dd></div>
                <div><dt className="text-muted-foreground text-xs">{lang === "ru" ? "Звёзд" : "Stars"}</dt><dd>{g.stars}</dd></div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
