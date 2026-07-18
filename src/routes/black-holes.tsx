import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/black-holes")({
  head: () => ({
    meta: [
      { title: "Чёрные дыры · ccosmos.space" },
      { name: "description", content: "Что такое чёрные дыры, горизонт событий, сингулярность, первое фото Sagittarius A*." },
      { property: "og:title", content: "Чёрные дыры" },
      { property: "og:url", content: "/black-holes" },
    ],
    links: [{ rel: "canonical", href: "/black-holes" }],
  }),
  component: BlackHoles,
});

const TYPES = [
  { k: "stellar", ru: "Звёздной массы", en: "Stellar-mass", d_ru: "5–100 M☉ · остаток коллапса массивной звезды.", d_en: "5–100 M☉ · remnant of a massive star collapse." },
  { k: "intermediate", ru: "Промежуточной массы", en: "Intermediate-mass", d_ru: "100–100 000 M☉ · редкие, обнаруживаются в шаровых скоплениях.", d_en: "100–100 000 M☉ · rare, found in globular clusters." },
  { k: "smbh", ru: "Сверхмассивные (SMBH)", en: "Supermassive (SMBH)", d_ru: "Миллионы–миллиарды M☉ · в центрах галактик.", d_en: "Millions to billions of M☉ · in galactic centres." },
  { k: "primordial", ru: "Первичные", en: "Primordial", d_ru: "Гипотетические, образовавшиеся в ранней Вселенной.", d_en: "Hypothetical, formed in the early Universe." },
];

function BlackHoles() {
  const { t, lang } = useI18n();
  return (
    <div className="space-y-14">
      <header className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gradient">{t("bh.title")}</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">{t("bh.sub")}</p>
        </div>
        <div className="relative aspect-square max-w-sm w-full mx-auto">
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background: "conic-gradient(from 0deg, #ffb84d, #ff6a1a, #7a5cff, #ffb84d)",
              filter: "blur(20px)",
              opacity: 0.9,
            }}
          />
          <div className="absolute inset-[18%] rounded-full bg-black shadow-[inset_0_0_60px_rgba(255,180,80,0.4)]" />
        </div>
      </header>

      <section className="grid sm:grid-cols-2 gap-4">
        {TYPES.map((x) => (
          <div key={x.k} className="glass rounded-2xl p-5">
            <div className="font-display text-xl font-semibold">{lang === "ru" ? x.ru : x.en}</div>
            <p className="text-sm text-foreground/80 mt-2">{lang === "ru" ? x.d_ru : x.d_en}</p>
          </div>
        ))}
      </section>

      <section className="glass rounded-3xl p-8">
        <h2 className="font-display text-2xl font-semibold mb-4">{lang === "ru" ? "Ключевые факты" : "Key facts"}</h2>
        <ul className="space-y-2 text-foreground/90 list-disc pl-6">
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
          ).map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>
    </div>
  );
}
