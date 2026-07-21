import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import heroAsset from "@/assets/cosmos/galaxy-hero.jpg.asset.json";
import milkyway from "@/assets/cosmos/gal-barred.jpg.asset.json";
import andromeda from "@/assets/cosmos/gal-andromeda.jpg.asset.json";
import triangulum from "@/assets/cosmos/gal-triangulum.jpg.asset.json";
import lmc from "@/assets/cosmos/gal-lmc.jpg.asset.json";
import sombrero from "@/assets/cosmos/gal-sombrero.jpg.asset.json";
import whirlpool from "@/assets/cosmos/gal-whirlpool.jpg.asset.json";

const GALAXIES = [
  { img: milkyway.url, name: { ru: "Млечный Путь", en: "Milky Way" }, type: { ru: "Спиральная с перемычкой", en: "Barred spiral" }, dist: { ru: "0 (мы внутри)", en: "0 (we're inside)" }, stars: "~100–400B", diam: "~100 000 ly" },
  { img: andromeda.url, name: { ru: "Андромеда (M31)", en: "Andromeda (M31)" }, type: { ru: "Спиральная", en: "Spiral" }, dist: "2.537 Mly", stars: "~1T", diam: "~152 000 ly" },
  { img: triangulum.url, name: { ru: "Треугольник (M33)", en: "Triangulum (M33)" }, type: { ru: "Спиральная", en: "Spiral" }, dist: "2.73 Mly", stars: "~40B", diam: "~60 000 ly" },
  { img: lmc.url, name: { ru: "Большое Магелланово Облако", en: "Large Magellanic Cloud" }, type: { ru: "Карликовая неправильная", en: "Dwarf irregular" }, dist: "163 kly", stars: "~30B", diam: "~14 000 ly" },
  { img: sombrero.url, name: { ru: "Сомбреро (M104)", en: "Sombrero (M104)" }, type: { ru: "Линзовидная", en: "Lenticular" }, dist: "29.3 Mly", stars: "~800B", diam: "~50 000 ly" },
  { img: whirlpool.url, name: { ru: "Водоворот (M51)", en: "Whirlpool (M51)" }, type: { ru: "Спиральная", en: "Spiral" }, dist: "23.16 Mly", stars: "~160B", diam: "~76 000 ly" },
];

export const Route = createFileRoute("/galaxies")({
  head: () => ({
    meta: [
      { title: "Галактики · ccosmos.space" },
      { name: "description", content: "Обзор галактик: Млечный Путь, Андромеда, спиральные, эллиптические, карликовые." },
      { property: "og:title", content: "Галактики" },
      { property: "og:image", content: heroAsset.url },
      { property: "og:url", content: "/galaxies" },
    ],
    links: [{ rel: "canonical", href: "/galaxies" }],
  }),
  component: Galaxies,
});

function Galaxies() {
  const { t, lang } = useI18n();
  return (
    <div className="py-16 sm:py-24 space-y-20">
      <header className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            {lang === "ru" ? "Мир галактик" : "The world of galaxies"}
          </p>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">{t("galaxies.title")}</h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">{t("galaxies.sub")}</p>
        </div>
        <div className="aspect-[4/3] rounded-3xl overflow-hidden panel">
          <img src={heroAsset.url} alt="Spiral galaxy" className="w-full h-full object-cover" width={1536} height={1024} />
        </div>
      </header>

      <section>
        <div className="mb-10">
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            {lang === "ru" ? "Каталог" : "Catalogue"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {lang === "ru" ? "Известные галактики" : "Notable galaxies"}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALAXIES.map((g) => (
            <article key={g.name.en} className="panel rounded-3xl overflow-hidden group">
              <div className="aspect-video overflow-hidden bg-black">
                <img
                  src={g.img}
                  alt={g.name.en}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{g.type[lang]}</div>
                <h3 className="text-xl font-semibold mt-1 tracking-tight">{g.name[lang]}</h3>
                <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{lang === "ru" ? "Расст." : "Dist."}</dt>
                    <dd className="mt-1">{typeof g.dist === "string" ? g.dist : g.dist[lang]}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{lang === "ru" ? "Звёзд" : "Stars"}</dt>
                    <dd className="mt-1">{g.stars}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{lang === "ru" ? "Диам." : "Diam."}</dt>
                    <dd className="mt-1">{g.diam}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel rounded-3xl p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
          {lang === "ru" ? "Классификация Хаббла" : "Hubble classification"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: "E", ru: "Эллиптические", en: "Elliptical", d_ru: "Старые звёзды, мало газа.", d_en: "Old stars, little gas." },
            { k: "S", ru: "Спиральные", en: "Spiral", d_ru: "Диск с рукавами, активное звёздообразование.", d_en: "Disc with arms, active star formation." },
            { k: "SB", ru: "С перемычкой", en: "Barred spiral", d_ru: "Спираль с ярким баром.", d_en: "Spiral with a central bar." },
            { k: "Irr", ru: "Неправильные", en: "Irregular", d_ru: "Без чёткой структуры.", d_en: "No defined shape." },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl hairline p-5">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{c.k}</div>
              <div className="text-lg font-medium mt-1">{lang === "ru" ? c.ru : c.en}</div>
              <p className="text-sm text-muted-foreground mt-2">{lang === "ru" ? c.d_ru : c.d_en}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
