import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import bhAsset from "@/assets/cosmos/blackhole.jpg.asset.json";

const TYPES = [
  { k: "stellar", ru: "Звёздной массы", en: "Stellar-mass", d_ru: "5–100 M☉ · остаток коллапса массивной звезды.", d_en: "5–100 M☉ · remnant of a massive star collapse." },
  { k: "intermediate", ru: "Промежуточной массы", en: "Intermediate-mass", d_ru: "100–100 000 M☉ · редкие, обнаруживаются в шаровых скоплениях.", d_en: "100–100 000 M☉ · rare, found in globular clusters." },
  { k: "smbh", ru: "Сверхмассивные (SMBH)", en: "Supermassive (SMBH)", d_ru: "Миллионы–миллиарды M☉ · в центрах галактик.", d_en: "Millions to billions of M☉ · in galactic centres." },
  { k: "primordial", ru: "Первичные", en: "Primordial", d_ru: "Гипотетические, образовавшиеся в ранней Вселенной.", d_en: "Hypothetical, formed in the early Universe." },
];

const FAMOUS = [
  { name: "Sagittarius A*", mass: "4.3M M☉", loc: { ru: "Центр Млечного Пути", en: "Milky Way core" } },
  { name: "M87*", mass: "6.5B M☉", loc: { ru: "Галактика M87 · первое фото 2019", en: "Galaxy M87 · first image 2019" } },
  { name: "TON 618", mass: "66B M☉", loc: { ru: "Один из крупнейших известных", en: "One of the largest known" } },
  { name: "Cygnus X-1", mass: "21 M☉", loc: { ru: "Звёздной массы, рентгеновский источник", en: "Stellar-mass, X-ray source" } },
];

export const Route = createFileRoute("/black-holes")({
  head: () => ({
    meta: [
      { title: "Чёрные дыры · ccosmos.space" },
      { name: "description", content: "Что такое чёрные дыры, горизонт событий, сингулярность, первое фото Sagittarius A* и M87*." },
      { property: "og:title", content: "Чёрные дыры" },
      { property: "og:image", content: bhAsset.url },
      { property: "og:url", content: "/black-holes" },
    ],
    links: [{ rel: "canonical", href: "/black-holes" }],
  }),
  component: BlackHoles,
});

function BlackHoles() {
  const { t, lang } = useI18n();
  return (
    <div className="py-16 sm:py-24 space-y-20">
      <header className="relative rounded-3xl overflow-hidden panel">
        <img src={bhAsset.url} alt="Black hole" width={1536} height={1024} className="w-full aspect-[16/10] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-14">
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            {lang === "ru" ? "Экстремальные объекты" : "Extreme objects"}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight max-w-3xl">
            {t("bh.title")}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">{t("bh.sub")}</p>
        </div>
      </header>

      <section>
        <div className="mb-10">
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            {lang === "ru" ? "Типы" : "Types"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {lang === "ru" ? "Четыре класса чёрных дыр" : "Four classes of black holes"}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {TYPES.map((x) => (
            <div key={x.k} className="panel rounded-2xl p-6">
              <div className="text-lg font-semibold tracking-tight">{lang === "ru" ? x.ru : x.en}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{lang === "ru" ? x.d_ru : x.d_en}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-10">
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            {lang === "ru" ? "Известные" : "Famous ones"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {lang === "ru" ? "Наблюдаемые чёрные дыры" : "Observed black holes"}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FAMOUS.map((f) => (
            <div key={f.name} className="panel rounded-2xl p-5">
              <div className="text-lg font-semibold tracking-tight">{f.name}</div>
              <div className="text-sm mt-2">{f.mass}</div>
              <div className="text-xs text-muted-foreground mt-1">{f.loc[lang]}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel rounded-3xl p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
          {lang === "ru" ? "Ключевые факты" : "Key facts"}
        </h2>
        <ul className="space-y-4">
          {(lang === "ru"
            ? [
                "Горизонт событий — граница, из-за которой не выходит даже свет.",
                "Первое изображение чёрной дыры (M87*) получено в 2019 году коллаборацией EHT.",
                "Sagittarius A* в центре Млечного Пути имеет массу 4.3 млн M☉.",
                "Хокинг предсказал, что чёрные дыры испаряются за счёт квантового излучения.",
                "Слияния чёрных дыр регистрируются по гравитационным волнам (LIGO/Virgo).",
              ]
            : [
                "Event horizon: boundary beyond which not even light escapes.",
                "First image of a black hole (M87*) was captured in 2019 by the EHT collaboration.",
                "Sagittarius A* at the Milky Way's centre has ~4.3M M☉.",
                "Hawking predicted black holes slowly evaporate via quantum radiation.",
                "Black hole mergers are detected as gravitational waves by LIGO/Virgo.",
              ]
          ).map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="hairline rounded-full h-7 w-7 grid place-items-center text-xs shrink-0 text-muted-foreground">{i + 1}</span>
              <span className="pt-0.5 text-foreground/90 leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
