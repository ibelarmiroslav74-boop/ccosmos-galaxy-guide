import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import sunAsset from "@/assets/cosmos/sun.jpg.asset.json";

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
      { property: "og:image", content: sunAsset.url },
      { property: "og:url", content: "/stars" },
    ],
    links: [{ rel: "canonical", href: "/stars" }],
  }),
  component: Stars,
});

function Stars() {
  const { t, lang } = useI18n();
  return (
    <div className="py-16 sm:py-24 space-y-20">
      <header className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
        <div>
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            {lang === "ru" ? "Термоядерный синтез" : "Fusion"}
          </p>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">{t("stars.title")}</h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">{t("stars.sub")}</p>
        </div>
        <div className="aspect-square max-w-md w-full mx-auto rounded-full overflow-hidden panel shadow-[0_40px_120px_-20px_rgba(255,120,20,0.35)]">
          <img src={sunAsset.url} alt="The Sun" width={1536} height={1024} className="w-full h-full object-cover scale-110" />
        </div>
      </header>

      <section>
        <div className="mb-10">
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            {lang === "ru" ? "Классификация" : "Classification"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {lang === "ru" ? "Спектральные классы" : "Spectral classes"}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            {lang === "ru" ? "От горячих голубых до холодных красных карликов." : "From hot blue giants to cool red dwarfs."}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CLASSES.map((s) => (
            <div key={s.c} className="panel rounded-2xl p-5 text-center">
              <div
                className="mx-auto h-14 w-14 rounded-full mb-4"
                style={{ background: `radial-gradient(circle at 35% 35%, white, ${s.color} 55%, #000)`, boxShadow: `0 0 24px ${s.color}80` }}
              />
              <div className="text-2xl font-semibold tracking-tight">{s.c}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{s.t}</div>
              <div className="text-xs text-foreground/80 mt-2">{s.ex[lang]}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-10">
          <p className="text-[13px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            {lang === "ru" ? "Эволюция" : "Evolution"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {lang === "ru" ? "Жизненный цикл звезды" : "Stellar life cycle"}
          </h2>
        </div>
        <ol className="grid md:grid-cols-2 gap-4">
          {(lang === "ru"
            ? [
                ["Молекулярное облако", "Гравитационный коллапс запускает формирование звезды."],
                ["Протозвезда", "Аккреция вещества и разогрев ядра до миллионов градусов."],
                ["Главная последовательность", "Термоядерный синтез водорода в гелий — 90% жизни."],
                ["Красный гигант / супергигант", "Ядро сжимается, оболочка раздувается."],
                ["Финал", "Белый карлик, нейтронная звезда или чёрная дыра."],
              ]
            : [
                ["Molecular cloud", "Gravitational collapse triggers stellar birth."],
                ["Protostar", "Accretion of matter and heating of the core to millions of degrees."],
                ["Main sequence", "Hydrogen fusion into helium — 90% of a star's life."],
                ["Red giant / supergiant", "Core contracts, outer layers expand."],
                ["Endgame", "White dwarf, neutron star, or black hole."],
              ]
          ).map(([title, desc], i) => (
            <li key={i} className="panel rounded-2xl p-6 flex gap-5">
              <span className="hairline rounded-full h-9 w-9 grid place-items-center text-sm shrink-0 text-muted-foreground">{i + 1}</span>
              <div>
                <div className="font-semibold tracking-tight">{title}</div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
