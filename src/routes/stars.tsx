import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const CLASSES = [
  { c: "O", color: "#9bb5ff", t: ">30 000 K", ex: { ru: "Голубые сверхгиганты", en: "Blue supergiants" } },
  { c: "B", color: "#aabfff", t: "10 000–30 000 K", ex: { ru: "Ригель", en: "Rigel" } },
  { c: "A", color: "#cad7ff", t: "7 500–10 000 K", ex: { ru: "Сириус", en: "Sirius" } },
  { c: "F", color: "#f8f7ff", t: "6 000–7 500 K", ex: { ru: "Процион", en: "Procyon" } },
  { c: "G", color: "#fff4e8", t: "5 200–6 000 K", ex: { ru: "Солнце", en: "The Sun" } },
  { c: "K", color: "#ffd2a1", t: "3 700–5 200 K", ex: { ru: "Арктур", en: "Arcturus" } },
  { c: "M", color: "#ffb56b", t: "<3 700 K", ex: { ru: "Бетельгейзе, Проксима", en: "Betelgeuse, Proxima" } },
];

export const Route = createFileRoute("/stars")({
  head: () => ({
    meta: [
      { title: "Звёзды · ccosmos.space" },
      { name: "description", content: "Классификация звёзд, жизненный цикл, сверхновые, нейтронные звёзды." },
      { property: "og:title", content: "Звёзды" },
      { property: "og:url", content: "/stars" },
    ],
    links: [{ rel: "canonical", href: "/stars" }],
  }),
  component: Stars,
});

function Stars() {
  const { t, lang } = useI18n();
  return (
    <div className="space-y-14">
      <header>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gradient">{t("stars.title")}</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">{t("stars.sub")}</p>
      </header>

      <section>
        <h2 className="font-display text-2xl font-semibold mb-6">{lang === "ru" ? "Спектральная классификация" : "Spectral classification"}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CLASSES.map((s) => (
            <div key={s.c} className="glass rounded-2xl p-4 text-center">
              <div
                className="mx-auto h-14 w-14 rounded-full mb-3"
                style={{ background: `radial-gradient(circle at 35% 35%, white, ${s.color} 60%, #000)`, boxShadow: `0 0 30px ${s.color}` }}
              />
              <div className="font-display text-2xl font-semibold">{s.c}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{s.t}</div>
              <div className="text-xs text-foreground/80 mt-2">{s.ex[lang]}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-3xl p-8">
        <h2 className="font-display text-2xl font-semibold mb-4">{lang === "ru" ? "Жизненный цикл звезды" : "Stellar life cycle"}</h2>
        <ol className="space-y-3 text-foreground/90">
          {(lang === "ru"
            ? [
                "Молекулярное облако — гравитационный коллапс.",
                "Протозвезда — аккреция, разогрев ядра.",
                "Главная последовательность — термоядерный синтез водорода.",
                "Красный гигант / супергигант.",
                "Финал: белый карлик, нейтронная звезда или чёрная дыра.",
              ]
            : [
                "Molecular cloud — gravitational collapse.",
                "Protostar — accretion, core heating.",
                "Main sequence — hydrogen fusion.",
                "Red giant / supergiant.",
                "Endgame: white dwarf, neutron star, or black hole.",
              ]
          ).map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="glass rounded-full h-8 w-8 grid place-items-center text-sm font-semibold shrink-0">{i + 1}</span>
              <span className="pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
